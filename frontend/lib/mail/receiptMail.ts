/**
 * EverVibe Studios - Receipt Email Templates
 * 
 * Email templates for receipt/invoice delivery with PDF attachment.
 */

import {
  detectLanguage,
  mailTranslations,
  getMailStyles,
  type Language,
} from "@/config/mailTemplate.config";
import { type InvoiceData } from "@/lib/pdf/generateInvoice";

/**
 * Generate HTML email template for receipt with invoice attachment
 */
export function generateReceiptEmailHTML(
  invoiceData: InvoiceData,
  lang?: Language
): string {
  const language = lang || detectLanguage(invoiceData.customer);
  const t = mailTranslations[language];
  const date = new Date(invoiceData.date).toLocaleDateString(
    language === "de" ? "de-DE" : "en-US"
  );

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.invoiceSubject}</title>
  <style>
    ${getMailStyles()}
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>📄 ${t.thankYou}</h1>
    </div>
    
    <!-- Content -->
    <div class="content">
      <h2 style="color: #1f2937; margin-top: 0;">${t.invoiceSubject}</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
        ${t.invoiceIntro}
      </p>
      
      <!-- Invoice Info Box -->
      <div class="info-box">
        <h3 style="margin-top: 0; color: #2563eb;">📋 ${language === "de" ? "Rechnungsdetails" : "Invoice Details"}</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "Rechnungsnummer:" : "Invoice Number:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937; font-family: monospace;">
              <strong>${invoiceData.invoiceId}</strong>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "Datum:" : "Date:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937;">
              ${date}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "Produkt:" : "Product:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937;">
              ${invoiceData.product}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "Lizenztyp:" : "License Type:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937;">
              ${invoiceData.licenseType === "single" ? "Single License" : "Agency License"}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">
              ${language === "de" ? "Betrag:" : "Amount:"}
            </td>
            <td style="padding: 8px 0; color: #1f2937; font-size: 18px; font-weight: bold;">
              ${invoiceData.amount} ${invoiceData.currency}
            </td>
          </tr>
        </table>
      </div>
      
      <!-- PDF Attachment Notice -->
      <div style="background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 20px; margin: 20px 0; border-radius: 4px;">
        <strong style="color: #1e40af;">📎 ${language === "de" ? "PDF-Rechnung" : "PDF Invoice"}</strong><br>
        <span style="color: #1e3a8a; font-size: 14px; line-height: 1.6;">
          ${t.invoiceAttached}
        </span>
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
 * Generate plain text email template for receipt
 */
export function generateReceiptEmailText(
  invoiceData: InvoiceData,
  lang?: Language
): string {
  const language = lang || detectLanguage(invoiceData.customer);
  const t = mailTranslations[language];
  const date = new Date(invoiceData.date).toLocaleDateString(
    language === "de" ? "de-DE" : "en-US"
  );

  return `
${t.thankYou}

${t.invoiceIntro}

${language === "de" ? "RECHNUNGSDETAILS" : "INVOICE DETAILS"}
----------------------------------------

${language === "de" ? "Rechnungsnummer:" : "Invoice Number:"} ${invoiceData.invoiceId}
${language === "de" ? "Datum:" : "Date:"} ${date}
${language === "de" ? "Produkt:" : "Product:"} ${invoiceData.product}
${language === "de" ? "Lizenztyp:" : "License Type:"} ${invoiceData.licenseType === "single" ? "Single License" : "Agency License"}
${language === "de" ? "Betrag:" : "Amount:"} ${invoiceData.amount} ${invoiceData.currency}

${language === "de" ? "PDF-RECHNUNG" : "PDF INVOICE"}
${t.invoiceAttached}

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
export function generateReceiptEmailSubject(
  invoiceData: InvoiceData,
  lang?: Language
): string {
  const language = lang || detectLanguage(invoiceData.customer);
  const t = mailTranslations[language];
  return `${t.invoiceSubject} (${invoiceData.invoiceId})`;
}
