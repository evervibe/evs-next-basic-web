/**
 * EverVibe Studios - PayPal Capture Order Endpoint
 * 
 * Captures a PayPal order after user approval and triggers license issuance.
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import { getPayPalConfig, getPayPalBaseURL, isPayPalConfigured } from "@/config/paypal.config";

const CaptureOrderSchema = z.object({
  orderId: z.string().min(1),
});

// Rate limiting (in-memory, per instance)
const captureRateLimit = new Map<string, { count: number; timestamp: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 10;

  const record = captureRateLimit.get(ip) || { count: 0, timestamp: now };
  
  if (now - record.timestamp > window) {
    record.count = 0;
    record.timestamp = now;
  }

  record.count++;
  captureRateLimit.set(ip, record);

  return record.count > maxRequests;
}

/**
 * Get PayPal access token
 */
async function getPayPalAccessToken(): Promise<string> {
  const config = getPayPalConfig();
  const auth = Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString("base64");

  const response = await fetch(`${getPayPalBaseURL()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get PayPal access token: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
}

interface PayPalCaptureResponse {
  id: string;
  status: string;
  purchase_units: Array<{ custom_id?: string }>;
  payer?: {
    email_address?: string;
  };
}

/**
 * Capture PayPal order
 */
async function capturePayPalOrder(
  orderId: string,
  accessToken: string
): Promise<PayPalCaptureResponse> {
  const response = await fetch(
    `${getPayPalBaseURL()}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to capture PayPal order: ${error}`);
  }

  return await response.json();
}

export async function POST(req: NextRequest) {
  try {
    // Check if PayPal is configured
    if (!isPayPalConfigured()) {
      return Response.json(
        { success: false, error: "Payment system temporarily unavailable. Please try again later." },
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
    const parsed = CaptureOrderSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { success: false, error: "Invalid request data", details: parsed.error },
        { status: 400 }
      );
    }

    const { orderId } = parsed.data;

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Capture the order
    const captureData = await capturePayPalOrder(orderId, accessToken);

    // Extract custom data (licenseType and email)
    const customId = captureData.purchase_units[0]?.custom_id;
    let licenseType: "single" | "agency" = "single";
    let customerEmail = "";

    if (customId) {
      try {
        const customData = JSON.parse(customId);
        licenseType = customData.licenseType;
        customerEmail = customData.email;
      } catch (e) {
        console.warn("Failed to parse custom_id:", e);
      }
    }

    // If we couldn't get email from custom_id, try to get it from payer info
    if (!customerEmail && captureData.payer?.email_address) {
      customerEmail = captureData.payer.email_address;
    }

    // Check if capture was successful
    if (captureData.status !== "COMPLETED") {
      return Response.json(
        {
          success: false,
          error: "Payment not completed",
          status: captureData.status,
        },
        { status: 400 }
      );
    }

    // Issue license automatically (call license API)
    try {
      const licenseResponse = await fetch(
        `${req.nextUrl.origin}/api/license/issue`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            licenseType,
            email: customerEmail,
            orderId: captureData.id,
          }),
        }
      );

      if (!licenseResponse.ok) {
        console.error("Failed to issue license:", await licenseResponse.text());
        // Don't fail the capture if license issuance fails - we can retry later
      }
    } catch (error) {
      console.error("Error issuing license:", error);
      // Don't fail the capture if license issuance fails - we can retry later
    }

    return Response.json({
      success: true,
      orderId: captureData.id,
      status: captureData.status,
      email: customerEmail,
      licenseType,
    });
  } catch (error) {
    console.error("PayPal capture-order error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to capture PayPal order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
