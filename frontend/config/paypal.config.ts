/**
 * EverVibe Studios - PayPal Configuration
 * 
 * PayPal REST API configuration for payment processing.
 * Supports both sandbox and live environments.
 * Uses lazy loading to prevent build-time failures.
 * 
 * @version 1.6.3
 */

import { requirePayPalConfig, getEnv } from "@/lib/env";

export type PayPalConfig = {
  clientId: string;
  clientSecret: string;
  mode: "sandbox" | "live";
};

/**
 * Get PayPal configuration
 * This function should be called at runtime, not at module level
 * 
 * @throws {Error} If PayPal configuration is not available
 */
export function getPayPalConfig(): PayPalConfig {
  return requirePayPalConfig();
}

/**
 * Check if PayPal is configured (non-throwing)
 */
export function isPayPalConfigured(): boolean {
  try {
    requirePayPalConfig();
    return true;
  } catch {
    return false;
  }
}

/**
 * Get PayPal API base URL based on environment mode
 */
export function getPayPalBaseURL(mode?: "sandbox" | "live"): string {
  const actualMode = mode || getEnv().PAYPAL_MODE || "sandbox";
  return actualMode === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

/**
 * Legacy export for backward compatibility
 * @deprecated Use getPayPalConfig() instead
 */
export const paypalConfig = {
  get clientId() {
    return getPayPalConfig().clientId;
  },
  get clientSecret() {
    return getPayPalConfig().clientSecret;
  },
  get mode() {
    return getPayPalConfig().mode;
  },
};
