/**
 * EverVibe Studios - License Email Templates (Legacy)
 * 
 * This file re-exports from the new mail module for backward compatibility.
 * New implementations should use /lib/mail/licenseMail.ts directly.
 */

export {
  generateLicenseEmailHTML,
  generateLicenseEmailText,
  generateLicenseEmailSubject,
} from "@/lib/mail/licenseMail";
