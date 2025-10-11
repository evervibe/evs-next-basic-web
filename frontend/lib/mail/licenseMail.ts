/**
 * EverVibe Studios - Enhanced License Email Templates
 * 
 * Multi-language email templates for license delivery with branding.
 */

import { type License } from "@/config/license.config";
import { getLicenseTypeName, getLicensePrice } from "@/lib/license/generateLicense";
import {
  detectLanguage,
  mailTranslations,
  getMailStyles,
  type Language,
} from "@/config/mailTemplate.config";

/**
 * Generate enhanced HTML email template for license delivery
 */
export function generateLicenseEmailHTML(
  license: License,
  lang?: Language
): string {
  const language = lang || detectLanguage(license.email);
  const t = mailTranslations[language];
  const typeName = getLicenseTypeName(license.type);
  const price = getLicensePrice(license.type);
  const purchaseDate = new Date(license.purchaseDate).toLocaleDateString(
    language === "de" ? "de-DE" : "en-US"
  );

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.licenseSubject}</title>
  <style>
    ${getMailStyles()}
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🎉 ${t.thankYou}</h1>
    </div>
    
    <!-- Content -->
    <div class="content">
      <h2 style="color: #1f2937; margin-top: 0;">${t.licenseSubject}</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
        ${t.licenseIntro}
      </p>
      
      <!-- License Info Box -->
      <div class="info-box">
        <h3 style="margin-top: 0; color: #2563eb;">📄 ${language === "de" ? "Lizenzdetails" : "License Details"}</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "Lizenzschlüssel:" : "License Key:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937; font-family: monospace; font-size: 14px;">
              <strong>${license.key}</strong>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "Lizenztyp:" : "License Type:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937;">
              ${typeName}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "Preis:" : "Price:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937;">
              €${price}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "Kaufdatum:" : "Purchase Date:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937;">
              ${purchaseDate}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "E-Mail:" : "Email:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937;">
              ${license.email}
            </td>
          </tr>
        </table>
      </div>
      
      <!-- Download Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://basic.evervibestudios.com/download?key=${encodeURIComponent(
          license.key
        )}&email=${encodeURIComponent(license.email)}" 
           class="button">
          ${t.downloadButton}
        </a>
      </div>
      
      <!-- Support Info -->
      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 4px;">
        <strong style="color: #92400e;">${t.supportTitle}</strong><br>
        <span style="color: #78350f; font-size: 14px; line-height: 1.6;">
          ${t.supportText}
        </span>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p style="margin: 0 0 10px 0;">
        <a href="mailto:info@evervibestudios.com">info@evervibestudios.com</a>
      </p>
      <p style="margin: 0; font-size: 12px;">
        ${t.footer}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email template for license delivery
 */
export function generateLicenseEmailText(
  license: License,
  lang?: Language
): string {
  const language = lang || detectLanguage(license.email);
  const t = mailTranslations[language];
  const typeName = getLicenseTypeName(license.type);
  const price = getLicensePrice(license.type);
  const purchaseDate = new Date(license.purchaseDate).toLocaleDateString(
    language === "de" ? "de-DE" : "en-US"
  );

  return `
${t.thankYou}

${t.licenseIntro}

${language === "de" ? "LIZENZDETAILS" : "LICENSE DETAILS"}
----------------------------------------

${language === "de" ? "Lizenzschlüssel:" : "License Key:"} ${license.key}
${language === "de" ? "Lizenztyp:" : "License Type:"} ${typeName}
${language === "de" ? "Preis:" : "Price:"} €${price}
${language === "de" ? "Kaufdatum:" : "Purchase Date:"} ${purchaseDate}
${language === "de" ? "E-Mail:" : "Email:"} ${license.email}

${language === "de" ? "DOWNLOAD" : "DOWNLOAD"}
----------------------------------------
${t.downloadButton}
https://basic.evervibestudios.com/download?key=${encodeURIComponent(
    license.key
  )}&email=${encodeURIComponent(license.email)}

${t.supportTitle}
${t.supportText}

----------------------------------------
EverVibe Studios
info@evervibestudios.com
www.evervibestudios.com

${t.footer}
  `.trim();
}

/**
 * Generate email subject line
 */
export function generateLicenseEmailSubject(
  license: License,
  lang?: Language
): string {
  const language = lang || detectLanguage(license.email);
  const t = mailTranslations[language];
  return `${t.licenseSubject} (${license.key})`;
}
