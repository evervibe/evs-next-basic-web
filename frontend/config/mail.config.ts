/**
 * EverVibe Studios - Mail Configuration
 * 
 * SMTP configuration loaded from environment variables.
 * Uses lazy loading to prevent build-time failures.
 * 
 * @version 1.6.3
 */

import { requireSMTPConfig } from "@/lib/env";

export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

/**
 * Get mail configuration
 * This function should be called at runtime, not at module level
 * 
 * @throws {Error} If SMTP configuration is not available
 */
export function getMailConfig(): MailConfig {
  return requireSMTPConfig();
}

/**
 * Check if SMTP is configured (non-throwing)
 */
export function isSMTPConfigured(): boolean {
  try {
    requireSMTPConfig();
    return true;
  } catch {
    return false;
  }
}

/**
 * Legacy export for backward compatibility
 * @deprecated Use getMailConfig() instead
 */
export const mailConfig = {
  get host() {
    return getMailConfig().host;
  },
  get port() {
    return getMailConfig().port;
  },
  get secure() {
    return getMailConfig().secure;
  },
  get user() {
    return getMailConfig().user;
  },
  get pass() {
    return getMailConfig().pass;
  },
};
