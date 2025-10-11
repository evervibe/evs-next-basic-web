/**
 * EverVibe Studios - License Validation
 * 
 * Validates license keys and checks their cryptographic integrity.
 */

import { generateLicenseHash } from "./generateLicense";
import { licenseConfig, type License } from "@/config/license.config";

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Validate license key format
 * Expected format: EVS-XXXX-XXXX-XXXX
 */
export function validateLicenseKeyFormat(key: string): boolean {
  const pattern = new RegExp(`^${licenseConfig.licensePrefix}[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$`);
  return pattern.test(key);
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * Validate complete license object
 */
export function validateLicense(license: License): ValidationResult {
  // Check key format
  if (!validateLicenseKeyFormat(license.key)) {
    return {
      valid: false,
      reason: "Invalid license key format",
    };
  }

  // Check email format
  if (!validateEmail(license.email)) {
    return {
      valid: false,
      reason: "Invalid email format",
    };
  }

  // Check license type
  if (license.type !== "single" && license.type !== "agency") {
    return {
      valid: false,
      reason: "Invalid license type",
    };
  }

  // Validate hash
  const expectedHash = generateLicenseHash(
    license.key,
    license.type,
    license.email,
    license.purchaseDate
  );

  if (license.hash !== expectedHash) {
    return {
      valid: false,
      reason: "License hash mismatch - possible tampering detected",
    };
  }

  // Check purchase date is valid
  const purchaseDate = new Date(license.purchaseDate);
  if (isNaN(purchaseDate.getTime())) {
    return {
      valid: false,
      reason: "Invalid purchase date",
    };
  }

  // Check if purchase date is not in the future
  if (purchaseDate > new Date()) {
    return {
      valid: false,
      reason: "Purchase date cannot be in the future",
    };
  }

  return { valid: true };
}

/**
 * Check if license is expired (if expiration logic is needed)
 * Currently licenses don't expire, but this can be extended
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function isLicenseExpired(_license: License): boolean {
  // For now, EVS licenses don't expire
  // This can be extended to implement expiration logic if needed
  return false;
}
