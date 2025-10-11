/**
 * EverVibe Studios - Secure Download Endpoint
 * 
 * Delivers template files with JWT validation and download logging.
 */

import { NextRequest } from "next/server";
import { verifyDownloadToken } from "@/lib/license/downloadToken";
import { logDownload } from "@/lib/db";

// Rate limiting for downloads
const downloadRateLimit = new Map<string, { count: number; timestamp: number }>();

function isDownloadRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 3;

  const record = downloadRateLimit.get(ip) || { count: 0, timestamp: now };
  
  if (now - record.timestamp > window) {
    record.count = 0;
    record.timestamp = now;
  }

  record.count++;
  downloadRateLimit.set(ip, record);

  return record.count > maxRequests;
}

export async function GET(req: NextRequest) {
  try {
    // Get IP for rate limiting and logging
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "0.0.0.0";
    const userAgent = req.headers.get("user-agent") || undefined;

    // Rate limiting
    if (isDownloadRateLimited(ip)) {
      return Response.json(
        { 
          success: false, 
          error: "Zu viele Download-Anfragen. Bitte versuchen Sie es in 5 Minuten erneut." 
        },
        { status: 429 }
      );
    }

    // Get token from query params
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return Response.json(
        { 
          success: false, 
          error: "Download-Token fehlt" 
        },
        { status: 400 }
      );
    }

    // Verify token
    const tokenData = verifyDownloadToken(token);

    if (!tokenData) {
      return Response.json(
        { 
          success: false, 
          error: "Ungültiger oder abgelaufener Download-Token. Bitte fordern Sie einen neuen Link an." 
        },
        { status: 403 }
      );
    }

    // Log download
    await logDownload(tokenData.licenseKey, {
      ip,
      timestamp: new Date().toISOString(),
      userAgent,
    });

    // In a real implementation, you would read the actual template file
    // For now, we'll create a placeholder response
    // TODO: Replace with actual file delivery
    const downloadUrl = `https://github.com/evervibe/evs-next-basic-web/archive/refs/heads/main.zip`;
    
    // Return redirect to download or stream file
    return Response.json({
      success: true,
      message: "Download bereit",
      downloadUrl,
      licenseKey: tokenData.licenseKey,
      note: "Download wird gestartet...",
    });

  } catch (error) {
    console.error("Download error:", error);
    return Response.json(
      { 
        success: false, 
        error: "Serverfehler beim Download",
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}


