/**
 * EverVibe Studios - License Module Entry Point
 * 
 * Exports all license-related functionality.
 */

export {
  generateLicense,
  generateLicenseHash,
  getLicensePrice,
  getLicenseTypeName,
} from "./generateLicense";

export {
  validateLicense,
  validateLicenseKeyFormat,
  validateEmail,
  isLicenseExpired,
  type ValidationResult,
} from "./validateLicense";

export {
  generateLicenseEmailHTML,
  generateLicenseEmailText,
  generateLicenseEmailSubject,
} from "./mailTemplate";

export type { License, LicenseType } from "@/config/license.config";
export { licenseConfig } from "@/config/license.config";
