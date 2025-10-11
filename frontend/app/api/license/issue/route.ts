/**
 * EverVibe Studios - License Issue Endpoint
 * 
 * Issues a new license and sends email with license key and download link.
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { getMailConfig, isSMTPConfigured } from "@/config/mail.config";
import { getLicenseConfig, isLicenseConfigured } from "@/config/license.config";
import {
  generateLicense,
  getLicensePrice,
  getLicenseTypeName,
  type LicenseType,
} from "@/lib/license";
import { storeLicense, type StoredLicense } from "@/lib/db";
import {
  generateLicenseEmailHTML,
  generateLicenseEmailText,
  generateLicenseEmailSubject,
} from "@/lib/mail/licenseMail";
import {
  generateReceiptEmailHTML,
  generateReceiptEmailText,
  generateReceiptEmailSubject,
} from "@/lib/mail/receiptMail";
import {
  generateInvoice,
  generateInvoiceId,
  getInvoiceBuffer,
  type InvoiceData,
} from "@/lib/pdf/generateInvoice";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const IssueLicenseSchema = z.object({
  licenseType: z.enum(["single", "agency"]),
  email: z.string().email(),
  orderId: z.string().optional(),
});

// Rate limiting (in-memory, per instance)
const issueRateLimit = new Map<string, { count: number; timestamp: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 5;

  const record = issueRateLimit.get(ip) || { count: 0, timestamp: now };
  
  if (now - record.timestamp > window) {
    record.count = 0;
    record.timestamp = now;
  }

  record.count++;
  issueRateLimit.set(ip, record);

  return record.count > maxRequests;
}

/**
 * Send license email
 */
async function sendLicenseEmail(
  email: string,
  licenseType: LicenseType,
  licenseKey: string,
  licenseHash: string
): Promise<void> {
  const license = {
    key: licenseKey,
    type: licenseType,
    email,
    purchaseDate: new Date().toISOString(),
    hash: licenseHash,
  };

  const mailCfg = getMailConfig();
  const licenseCfg = getLicenseConfig();

  const transporter = nodemailer.createTransport({
    host: mailCfg.host,
    port: mailCfg.port,
    secure: mailCfg.secure,
    auth: {
      user: mailCfg.user,
      pass: mailCfg.pass,
    },
  });

  const mailOptions = {
    from: `"EverVibe Studios" <${licenseCfg.sender}>`,
    to: email,
    subject: generateLicenseEmailSubject(license),
    text: generateLicenseEmailText(license),
    html: generateLicenseEmailHTML(license),
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Send receipt email with invoice PDF
 */
async function sendReceiptEmail(
  email: string,
  invoiceData: InvoiceData,
  invoicePath: string
): Promise<void> {
  const mailCfg = getMailConfig();
  const licenseCfg = getLicenseConfig();

  const transporter = nodemailer.createTransport({
    host: mailCfg.host,
    port: mailCfg.port,
    secure: mailCfg.secure,
    auth: {
      user: mailCfg.user,
      pass: mailCfg.pass,
    },
  });

  const invoiceBuffer = await getInvoiceBuffer(invoicePath);

  const mailOptions = {
    from: `"EverVibe Studios" <${licenseCfg.sender}>`,
    to: email,
    subject: generateReceiptEmailSubject(invoiceData),
    text: generateReceiptEmailText(invoiceData),
    html: generateReceiptEmailHTML(invoiceData),
    attachments: [
      {
        filename: `invoice_${invoiceData.invoiceId}.pdf`,
        content: invoiceBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Log license issuance
 */
async function logLicenseIssuance(
  licenseKey: string,
  licenseType: LicenseType,
  email: string,
  orderId?: string
) {
  try {
    const logsDir = join(process.cwd(), "logs", "licenses");
    await mkdir(logsDir, { recursive: true });

    const timestamp = new Date().toISOString();
    const logFile = join(logsDir, `${timestamp.split("T")[0]}.json`);

    const logEntry = {
      timestamp,
      licenseKey,
      licenseType,
      email,
      orderId: orderId || "manual",
    };

    await writeFile(logFile, JSON.stringify(logEntry, null, 2) + "\n", { flag: "a" });
  } catch (error) {
    console.error("Failed to log license issuance:", error);
    // Don't fail if logging doesn't work
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check if license system is configured
    if (!isLicenseConfigured()) {
      return Response.json(
        { success: false, error: "License system temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    // Check if SMTP is configured
    if (!isSMTPConfigured()) {
      return Response.json(
        { success: false, error: "Email system temporarily unavailable. License cannot be issued at this time." },
        { status: 503 }
      );
    }

    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";
    if (isRateLimited(ip)) {
      return Response.json(
        { success: false, error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // Validate request body
    const body = await req.json();
    const parsed = IssueLicenseSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { success: false, error: "Invalid request data", details: parsed.error },
        { status: 400 }
      );
    }

    const { licenseType, email, orderId } = parsed.data;

    // Generate license
    const license = generateLicense(licenseType, email);

    // Store license in Redis
    try {
      const storedLicense: StoredLicense = {
        email: license.email,
        type: license.type,
        issuedAt: license.purchaseDate,
        validUntil: null, // No expiration for EVS licenses
        downloadCount: 0,
      };
      await storeLicense(license.key, storedLicense);
    } catch (error) {
      console.error("Failed to store license in Redis:", error);
      // Continue even if Redis storage fails - license is still in email
    }

    // Generate invoice
    let invoicePath: string | null = null;
    try {
      const invoiceId = await generateInvoiceId();
      const invoiceData: InvoiceData = {
        invoiceId,
        customer: email,
        customerName: email.split("@")[0], // Use email prefix as name
        product: `EVS Basic Template – ${getLicenseTypeName(licenseType)}`,
        amount: getLicensePrice(licenseType).toFixed(2),
        currency: "EUR",
        date: new Date().toISOString().split("T")[0],
        licenseKey: license.key,
        licenseType,
        orderId,
      };

      invoicePath = await generateInvoice(invoiceData);

      // Send receipt email with invoice PDF
      await sendReceiptEmail(email, invoiceData, invoicePath);
    } catch (error) {
      console.error("Failed to generate/send invoice:", error);
      // Continue - invoice is optional
    }

    // Send license email
    try {
      await sendLicenseEmail(email, licenseType, license.key, license.hash);
    } catch (error) {
      console.error("Failed to send license email:", error);
      return Response.json(
        {
          success: false,
          error: "Failed to send license email",
          details: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }

    // Log the license issuance
    await logLicenseIssuance(license.key, licenseType, email, orderId);

    return Response.json({
      success: true,
      message: "License issued successfully",
      licenseKey: license.key,
      email,
    });
  } catch (error) {
    console.error("License issue error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to issue license",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
