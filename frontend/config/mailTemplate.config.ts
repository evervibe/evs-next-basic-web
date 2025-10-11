/**
 * EverVibe Studios - Mail Template Configuration
 * 
 * Unified mail branding and templates for customer communication.
 */

export type Language = "de" | "en";

export interface MailBranding {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  footerBackground: string;
}

export const mailBranding: MailBranding = {
  logo: "EverVibe Studios",
  primaryColor: "#2563eb",
  secondaryColor: "#7c3aed",
  backgroundColor: "#111827",
  textColor: "#ffffff",
  footerBackground: "#1f2937",
};

export interface MailTranslations {
  de: {
    thankYou: string;
    licenseSubject: string;
    licenseIntro: string;
    downloadButton: string;
    supportTitle: string;
    supportText: string;
    invoiceSubject: string;
    invoiceIntro: string;
    invoiceAttached: string;
    footer: string;
  };
  en: {
    thankYou: string;
    licenseSubject: string;
    licenseIntro: string;
    downloadButton: string;
    supportTitle: string;
    supportText: string;
    invoiceSubject: string;
    invoiceIntro: string;
    invoiceAttached: string;
    footer: string;
  };
}

export const mailTranslations: MailTranslations = {
  de: {
    thankYou: "Vielen Dank für Ihren Kauf bei EverVibe Studios",
    licenseSubject: "Ihre Lizenz von EverVibe Studios",
    licenseIntro:
      "Vielen Dank für Ihren Kauf! Hier sind Ihre Lizenzinformationen und der Download-Link für Ihr Template.",
    downloadButton: "📦 Projekt jetzt herunterladen",
    supportTitle: "💡 Support & Dokumentation",
    supportText:
      "Bei Fragen oder Problemen kontaktieren Sie uns gerne unter info@evervibestudios.com",
    invoiceSubject: "Ihre Rechnung von EverVibe Studios",
    invoiceIntro: "Vielen Dank für Ihren Kauf! Ihre Rechnung finden Sie im Anhang.",
    invoiceAttached: "Ihre Rechnung ist als PDF im Anhang dieser E-Mail.",
    footer: "© EverVibe Studios. Alle Rechte vorbehalten.",
  },
  en: {
    thankYou: "Thank you for your purchase at EverVibe Studios",
    licenseSubject: "Your License from EverVibe Studios",
    licenseIntro:
      "Thank you for your purchase! Here are your license details and the download link for your template.",
    downloadButton: "📦 Download Project Now",
    supportTitle: "💡 Support & Documentation",
    supportText:
      "If you have any questions or issues, please contact us at info@evervibestudios.com",
    invoiceSubject: "Your Invoice from EverVibe Studios",
    invoiceIntro: "Thank you for your purchase! Your invoice is attached to this email.",
    invoiceAttached: "Your invoice is attached as a PDF to this email.",
    footer: "© EverVibe Studios. All rights reserved.",
  },
};

/**
 * Detect language from email domain
 */
export function detectLanguage(email: string): Language {
  const domain = email.split("@")[1]?.toLowerCase() || "";
  
  // German domains
  const germanDomains = [".de", ".at", ".ch"];
  if (germanDomains.some((d) => domain.endsWith(d))) {
    return "de";
  }
  
  // Default to German for now (EVS is German-based)
  return "de";
}

/**
 * Get mail CSS styles
 */
export function getMailStyles(): string {
  return `
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f3f4f6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, ${mailBranding.primaryColor} 0%, ${mailBranding.secondaryColor} 100%);
      padding: 40px 20px;
      text-align: center;
      color: ${mailBranding.textColor};
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      padding: 40px 30px;
      color: #374151;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(135deg, ${mailBranding.primaryColor} 0%, ${mailBranding.secondaryColor} 100%);
      color: ${mailBranding.textColor} !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .info-box {
      background-color: #f9fafb;
      border-left: 4px solid ${mailBranding.primaryColor};
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      background-color: ${mailBranding.footerBackground};
      padding: 30px 20px;
      text-align: center;
      color: #9ca3af;
      font-size: 14px;
    }
    .footer a {
      color: ${mailBranding.primaryColor};
      text-decoration: none;
    }
  `;
}
