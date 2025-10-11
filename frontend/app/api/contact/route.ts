import nodemailer from "nodemailer";
import { z } from "zod";
import { appConfig } from "@/config/appConfig";
import { getMailConfig, isSMTPConfigured } from "@/config/mail.config";

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

export async function POST(req: Request) {
  try {
    // Check if SMTP is configured
    if (!isSMTPConfigured()) {
      return Response.json(
        { success: false, error: "Email system temporarily unavailable." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ success: false, error: "invalid" }, { status: 400 });
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
      return Response.json({ success: true }); // silently succeed
    }

    const mailCfg = getMailConfig();

    // SMTP Configuration with validated mail config
    const transporter = nodemailer.createTransport({
      host: mailCfg.host,
      port: mailCfg.port,
      secure: mailCfg.secure,
      auth: {
        user: mailCfg.user,
        pass: mailCfg.pass,
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
      logger: appConfig.debug.enableSMTPLogs,
      debug: appConfig.debug.enableSMTPLogs,
    });

    const html = `
      <h2>Neue Kontaktanfrage</h2>
      <p><b>Name:</b> ${sanitize(name)}</p>
      <p><b>E-Mail:</b> ${sanitize(email)}</p>
      <p><b>Nachricht:</b><br/>${sanitize(message)}</p>
    `;

    const mailOptions = {
      from: mailCfg.user, // Use validated SMTP user as sender
      to: appConfig.site.contactEmail,
      replyTo: email, // Set reply-to as submitter's email
      subject: `EVS Kontakt – ${sanitize(name)}`,
      text: `Von: ${name} <${email}>\n\n${message}`,
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
      return Response.json({ success: true });
    } catch (smtpError: unknown) {
      // Try proxy fallback if direct SMTP fails
      if (appConfig.debug.enableSMTPLogs) {
        console.log("Attempting proxy fallback...");
      }
      
      try {
        const proxyRes = await fetch(`${appConfig.site.url}/api/mail/relay`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mailOptions),
        });
        
        if (proxyRes.ok) {
          return Response.json({ success: true, fallback: true });
        }
      } catch (proxyError) {
        // Proxy fallback also failed, rethrow original error
        if (appConfig.debug.enableSMTPLogs) {
          console.error("Proxy fallback failed:", proxyError);
        }
      }
      
      throw smtpError; // Re-throw original SMTP error
    }
  } catch (e) {
    // Enhanced error logging for debugging
    if (appConfig.mode.env === "development" || appConfig.debug.enableSMTPLogs) {
      console.error("=== SMTP Error Details ===");
      console.error("Error:", e);
      if (e && typeof e === "object" && "response" in e) {
        console.error("SMTP Response:", (e as { response: unknown }).response);
      }
      if (e && typeof e === "object" && "code" in e) {
        console.error("Error Code:", (e as { code: unknown }).code);
      }
    } else {
      console.error("/api/contact error");
    }

    // Determine error type for better user feedback
    let errorType = "UNKNOWN";
    let userMessage = `Leider konnte Ihre Nachricht nicht versendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie direkt an ${appConfig.site.contactEmail}.`;

    if (e && typeof e === "object") {
      const error = e as { code?: string; response?: string; message?: string };
      
      if (error.code === "ETIMEDOUT" || error.code === "ESOCKET") {
        errorType = "TIMEOUT";
        userMessage = "Die Verbindung zum E-Mail-Server wurde unterbrochen. Bitte versuchen Sie es erneut.";
      } else if (error.code === "EAUTH") {
        errorType = "AUTH_FAILED";
      } else if (error.response && error.response.includes("550")) {
        errorType = "RATE_LIMIT";
        userMessage = "Zu viele Anfragen. Bitte warten Sie einige Minuten und versuchen Sie es erneut.";
      }
    }

    return Response.json(
      { 
        success: false, 
        error: userMessage,
        errorType: appConfig.mode.env === "development" ? errorType : undefined,
      }, 
      { status: 500 }
    );
  }
}
