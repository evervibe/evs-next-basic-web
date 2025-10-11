/**
 * EverVibe Studios - License Generation
 * 
 * Generates unique license keys with cryptographic hash validation.
 * Format: EVS-XXXX-XXXX-XXXX
 */

import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { licenseConfig, type LicenseType, type License } from "@/config/license.config";

/**
 * Generate a formatted license key from UUID
 * Format: EVS-XXXX-XXXX-XXXX
 */
function formatLicenseKey(uuid: string): string {
  // Take first 12 characters of UUID (remove hyphens)
  const clean = uuid.replace(/-/g, "").toUpperCase();
  const parts = [
    clean.substring(0, 4),
    clean.substring(4, 8),
    clean.substring(8, 12),
  ];
  
  return `${licenseConfig.licensePrefix}${parts.join("-")}`;
}

/**
 * Generate cryptographic hash for license validation
 * Hash includes: license key, type, email, purchase date, and salt
 */
export function generateLicenseHash(
  key: string,
  type: LicenseType,
  email: string,
  purchaseDate: string
): string {
  const data = `${key}|${type}|${email}|${purchaseDate}|${licenseConfig.hashSalt}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Generate a complete license object
 */
export function generateLicense(
  type: LicenseType,
  email: string
): License {
  const uuid = uuidv4();
  const key = formatLicenseKey(uuid);
  const purchaseDate = new Date().toISOString();
  const hash = generateLicenseHash(key, type, email, purchaseDate);

  return {
    key,
    type,
    email,
    purchaseDate,
    hash,
  };
}

/**
 * Get license price based on type
 */
export function getLicensePrice(type: LicenseType): number {
  return type === "single" 
    ? licenseConfig.singlePrice 
    : licenseConfig.agencyPrice;
}

/**
 * Get license type name
 */
export function getLicenseTypeName(type: LicenseType): string {
  return type === "single" ? "Single License" : "Agency License";
}
