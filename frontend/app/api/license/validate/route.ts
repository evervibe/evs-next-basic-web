/**
 * EverVibe Studios - License Validation Endpoint
 * 
 * Validates license keys against Redis database and generates download tokens.
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import { getLicense } from "@/lib/db";
import { validateLicenseKeyFormat, validateEmail } from "@/lib/license/validateLicense";
import { generateDownloadToken } from "@/lib/license/downloadToken";

const ValidateLicenseSchema = z.object({
  licenseKey: z.string().min(1),
  email: z.string().email(),
});

// Rate limiting (in-memory, per instance)
const validateRateLimit = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 3;

  const record = validateRateLimit.get(ip) || { count: 0, timestamp: now };
  
  if (now - record.timestamp > window) {
    record.count = 0;
    record.timestamp = now;
  }

  record.count++;
  validateRateLimit.set(ip, record);

  return record.count > maxRequests;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "0.0.0.0";
    if (isRateLimited(ip)) {
      return Response.json(
        { 
          success: false, 
          error: "Zu viele Anfragen. Bitte versuchen Sie es in 5 Minuten erneut." 
        },
        { status: 429 }
      );
    }

    // Validate request body
    const body = await req.json();
    const parsed = ValidateLicenseSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { 
          success: false, 
          error: "Ungültige Anfragedaten",
          details: parsed.error 
        },
        { status: 400 }
      );
    }

    const { licenseKey, email } = parsed.data;

    // Validate format
    if (!validateLicenseKeyFormat(licenseKey)) {
      return Response.json(
        { 
          success: false, 
          error: "Ungültiges Lizenzschlüssel-Format" 
        },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return Response.json(
        { 
          success: false, 
          error: "Ungültige E-Mail-Adresse" 
        },
        { status: 400 }
      );
    }

    // Check license in Redis
    const licenseData = await getLicense(licenseKey);

    if (!licenseData) {
      return Response.json(
        { 
          success: false, 
          error: "Lizenzschlüssel nicht gefunden" 
        },
        { status: 404 }
      );
    }

    // Verify email matches
    if (licenseData.email.toLowerCase() !== email.toLowerCase()) {
      return Response.json(
        { 
          success: false, 
          error: "E-Mail-Adresse stimmt nicht mit der Lizenz überein" 
        },
        { status: 403 }
      );
    }

    // Check if license is expired (if validUntil is set)
    if (licenseData.validUntil) {
      const expiryDate = new Date(licenseData.validUntil);
      if (expiryDate < new Date()) {
        return Response.json(
          { 
            success: false, 
            error: "Lizenz ist abgelaufen" 
          },
          { status: 403 }
        );
      }
    }

    // Generate download token (5-minute validity)
    const downloadToken = generateDownloadToken(licenseKey, email);

    return Response.json({
      success: true,
      message: "Lizenz erfolgreich validiert",
      token: downloadToken,
      licenseType: licenseData.type,
      downloadCount: licenseData.downloadCount || 0,
    });

  } catch (error) {
    console.error("License validation error:", error);
    return Response.json(
      { 
        success: false, 
        error: "Serverfehler bei der Lizenzvalidierung",
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
