/**
 * EverVibe Studios - License Configuration
 * 
 * Centralized license management configuration for EVS template monetization.
 * Supports Single License and Agency License tiers.
 * Uses lazy loading to prevent build-time failures.
 * 
 * @version 1.6.3
 */

import { requireLicenseConfig } from "@/lib/env";

export type LicenseConfig = {
  singlePrice: number;
  agencyPrice: number;
  currency: string;
  supportDuration: string;
  sender: string;
  licensePrefix: string;
  hashSalt: string;
};

export type LicenseType = "single" | "agency";

export interface License {
  key: string;
  type: LicenseType;
  email: string;
  purchaseDate: string;
  hash: string;
}

/**
 * Get license configuration
 * This function should be called at runtime, not at module level
 * 
 * @throws {Error} If license configuration is not available
 */
export function getLicenseConfig(): LicenseConfig {
  const config = requireLicenseConfig();
  return {
    singlePrice: config.singlePrice,
    agencyPrice: config.agencyPrice,
    currency: "EUR",
    supportDuration: "6 months",
    sender: config.emailSender,
    licensePrefix: "EVS-",
    hashSalt: config.salt,
  };
}

/**
 * Check if license system is configured (non-throwing)
 */
export function isLicenseConfigured(): boolean {
  try {
    requireLicenseConfig();
    return true;
  } catch {
    return false;
  }
}

/**
 * Legacy export for backward compatibility
 * @deprecated Use getLicenseConfig() instead
 */
export const licenseConfig = {
  get singlePrice() {
    return getLicenseConfig().singlePrice;
  },
  get agencyPrice() {
    return getLicenseConfig().agencyPrice;
  },
  get currency() {
    return getLicenseConfig().currency;
  },
  get supportDuration() {
    return getLicenseConfig().supportDuration;
  },
  get sender() {
    return getLicenseConfig().sender;
  },
  get licensePrefix() {
    return getLicenseConfig().licensePrefix;
  },
  get hashSalt() {
    return getLicenseConfig().hashSalt;
  },
};
