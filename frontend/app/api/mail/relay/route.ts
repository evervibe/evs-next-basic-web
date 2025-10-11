import nodemailer from "nodemailer";
import { z } from "zod";
import { appConfig } from "@/config/appConfig";
import { getMailConfig, isSMTPConfigured } from "@/config/mail.config";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

/**
 * HTTPS Relay Endpoint - Network-independent mail sending for contact form
 * 
 * This endpoint provides a robust relay for the contact form with:
 * - Primary path: Zimbra SMTP via TLS (port 465)
 * - Fallback: STARTTLS (port 587) if primary fails
 * - Anti-spam: Honeypot, min-time, rate-limiting
 * - Precise error handling with reason codes
 */

const ContactSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email().max(120),
  message: z.string().min(appConfig.contact.rateLimit.minMessageLength).max(2000),
  hp: z.string().optional(), // Honeypot
  ts: z.number().optional(), // Timestamp
});

function sanitize(s: string) {
  return s.replace(/[\r\n]/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Best-effort rate limiting (in-memory, per Lambda instance)
const hits = new Map<string, { c: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const w = 5 * 60 * 1000; // 5 minutes window
  const rec = hits.get(ip) || { c: 0, t: now };
  if (now - rec.t > w) {
    rec.c = 0;
    rec.t = now;
  }
  rec.c++;
  hits.set(ip, rec);
  return rec.c > appConfig.contact.rateLimit.max;
}

// Log mail errors to file (server-side only)
async function logMailError(error: unknown, context: Record<string, unknown>) {
  try {
    const logsDir = join(process.cwd(), "logs", "mail");
    await mkdir(logsDir, { recursive: true });
    
    const timestamp = new Date().toISOString();
    const logFile = join(logsDir, `${timestamp.split("T")[0]}.json`);
    
    const logEntry = {
      timestamp,
      error: error instanceof Error ? error.message : String(error),
      context,
    };
    
    await writeFile(logFile, JSON.stringify(logEntry, null, 2) + "\n", { flag: "a" });
  } catch (logError) {
    // Silently fail if logging doesn't work (e.g., read-only filesystem)
    if (appConfig.mode.env === "development") {
      console.error("Failed to write mail error log:", logError);
    }
  }
}

export async function POST(req: Request) {
  try {
    // Check if SMTP is configured
    if (!isSMTPConfigured()) {
      return Response.json(
        { success: false, reason: "unavailable", error: "Email system temporarily unavailable." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ success: false, reason: "invalid" }, { status: 400 });
    }
    const { name, email, message, hp, ts } = parsed.data;

    // Anti-bot 1: Honeypot
    if (hp && hp.trim() !== "") {
      return Response.json({ success: true }); // silently succeed
    }

    // Anti-bot 2: Min. fill time 3s
    if (typeof ts === "number") {
      const now = Date.now();
      if (now - ts < 3000) {
        return Response.json({ success: true }); // silently
      }
    }

    // Rate limiting (best-effort)
    const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";
    if (limited(ip)) {
      return Response.json({ success: false, reason: "ratelimit" }, { status: 429 });
    }

    const mailCfg = getMailConfig();

    const html = `
      <h2>Neue Kontaktanfrage</h2>
      <p><b>Name:</b> ${sanitize(name)}</p>
      <p><b>E-Mail:</b> ${sanitize(email)}</p>
      <p><b>Nachricht:</b><br/>${sanitize(message)}</p>
    `;

    const mailOptions = {
      from: mailCfg.user,
      to: appConfig.site.contactEmail,
      replyTo: email,
      subject: `EVS Kontakt – ${sanitize(name)}`,
      text: `Von: ${name} <${email}>\n\n${message}`,
      html,
    };

    // Primary: TLS with validated config
    try {
      const transporter = nodemailer.createTransport({
        host: mailCfg.host,
        port: mailCfg.port,
        secure: mailCfg.secure,
        auth: {
          user: mailCfg.user,
          pass: mailCfg.pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000,
        logger: appConfig.debug.enableSMTPLogs,
        debug: appConfig.debug.enableSMTPLogs,
      });

      await transporter.sendMail(mailOptions);
      return Response.json({ success: true });
    } catch (primaryError: unknown) {
      // Fallback: STARTTLS on port 587
      if (appConfig.debug.enableSMTPLogs) {
        console.log("Primary TLS 465 failed, trying STARTTLS 587...");
      }

      try {
        const fallbackTransporter = nodemailer.createTransport({
          host: mailCfg.host,
          port: 587,
          secure: false,
          auth: {
            user: mailCfg.user,
            pass: mailCfg.pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
          connectionTimeout: 10000,
          logger: appConfig.debug.enableSMTPLogs,
          debug: appConfig.debug.enableSMTPLogs,
        });

        await fallbackTransporter.sendMail(mailOptions);
        return Response.json({ success: true, fallback: true });
      } catch (fallbackError: unknown) {
        // Both failed, determine error type
        const error = fallbackError || primaryError;
        let reason = "network";

        if (error && typeof error === "object") {
          const err = error as { code?: string; response?: string };
          
          if (err.code === "ETIMEDOUT" || err.code === "ESOCKET") {
            reason = "timeout";
          } else if (err.code === "EAUTH") {
            reason = "auth";
          } else if (err.response && err.response.includes("550")) {
            reason = "ratelimit";
          }
        }

        // Log error for debugging
        await logMailError(error, { name, email, ip, reason });

        if (appConfig.mode.env === "development" || appConfig.debug.enableSMTPLogs) {
          console.error("=== Mail Relay Error ===");
          console.error("Reason:", reason);
          console.error("Error:", error);
        }

        return Response.json({ success: false, reason }, { status: 500 });
      }
    }
  } catch (e) {
    // Unexpected error
    if (appConfig.mode.env === "development" || appConfig.debug.enableSMTPLogs) {
      console.error("=== Unexpected Relay Error ===");
      console.error("Error:", e);
    }

    await logMailError(e, { type: "unexpected" });
    
    return Response.json(
      { success: false, reason: "network" },
      { status: 500 }
    );
  }
}
