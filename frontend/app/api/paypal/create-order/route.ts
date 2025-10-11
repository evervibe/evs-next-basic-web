/**
 * EverVibe Studios - PayPal Create Order Endpoint
 * 
 * Creates a PayPal order for license purchases.
 * Supports Single License (€29) and Agency License (€79).
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import { getPayPalConfig, getPayPalBaseURL, isPayPalConfigured } from "@/config/paypal.config";
import { getLicensePrice } from "@/lib/license";

const CreateOrderSchema = z.object({
  licenseType: z.enum(["single", "agency"]),
  email: z.string().email(),
});

// Rate limiting (in-memory, per instance)
const orderRateLimit = new Map<string, { count: number; timestamp: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 10;

  const record = orderRateLimit.get(ip) || { count: 0, timestamp: now };
  
  if (now - record.timestamp > window) {
    record.count = 0;
    record.timestamp = now;
  }

  record.count++;
  orderRateLimit.set(ip, record);

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

/**
 * Create PayPal order
 */
async function createPayPalOrder(
  licenseType: "single" | "agency",
  email: string,
  accessToken: string
): Promise<{ id: string; status: string }> {
  const price = getLicensePrice(licenseType);
  const licenseName = licenseType === "single" ? "Single License" : "Agency License";

  const orderData = {
    intent: "CAPTURE",
    purchase_units: [
      {
        description: `EVS Basic Template - ${licenseName}`,
        amount: {
          currency_code: "EUR",
          value: price.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "EUR",
              value: price.toFixed(2),
            },
          },
        },
        items: [
          {
            name: `EVS Basic Template - ${licenseName}`,
            description: `Professional Next.js template with ${licenseType === "agency" ? "unlimited client projects" : "single project"} usage`,
            unit_amount: {
              currency_code: "EUR",
              value: price.toFixed(2),
            },
            quantity: "1",
            category: "DIGITAL_GOODS",
          },
        ],
        custom_id: JSON.stringify({ licenseType, email }),
      },
    ],
    application_context: {
      brand_name: "EverVibe Studios",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://basic.evervibestudios.com"}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://basic.evervibestudios.com"}/payment/cancel`,
    },
  };

  const response = await fetch(`${getPayPalBaseURL()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create PayPal order: ${error}`);
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
    const parsed = CreateOrderSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { success: false, error: "Invalid request data", details: parsed.error },
        { status: 400 }
      );
    }

    const { licenseType, email } = parsed.data;

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Create PayPal order
    const order = await createPayPalOrder(licenseType, email, accessToken);

    return Response.json({
      success: true,
      orderId: order.id,
      status: order.status,
    });
  } catch (error) {
    console.error("PayPal create-order error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to create PayPal order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
