/**
 * EverVibe Studios - Invoice PDF Generation
 * 
 * Generates professional PDF invoices using PDFKit.
 */

import PDFDocument from "pdfkit";
import { writeFile, mkdir, readFile } from "fs/promises";
import { join } from "path";
import { type LicenseType } from "@/config/license.config";

export interface InvoiceData {
  invoiceId: string;
  customer: string;
  customerName?: string;
  product: string;
  amount: string;
  currency: string;
  date: string;
  licenseKey: string;
  licenseType: LicenseType;
  orderId?: string;
}

/**
 * Generate next invoice ID
 * Format: EVS-YYYY-NNNN
 */
export async function generateInvoiceId(): Promise<string> {
  const year = new Date().getFullYear();
  const counterFile = join(process.cwd(), "docs", "invoices", "counter.txt");
  
  try {
    // Try to read existing counter
    const counterData = await readFile(counterFile, "utf-8");
    const counter = parseInt(counterData.trim(), 10) || 0;
    const nextCounter = counter + 1;
    
    // Update counter
    await writeFile(counterFile, nextCounter.toString());
    
    return `EVS-${year}-${nextCounter.toString().padStart(4, "0")}`;
  } catch {
    // First invoice - create counter file
    await mkdir(join(process.cwd(), "docs", "invoices"), { recursive: true });
    await writeFile(counterFile, "1");
    return `EVS-${year}-0001`;
  }
}

/**
 * Generate PDF invoice
 * Returns the file path of the generated invoice
 */
export async function generateInvoice(data: InvoiceData): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const invoicesDir = join(process.cwd(), "docs", "invoices");
      await mkdir(invoicesDir, { recursive: true });
      
      const fileName = `invoice_${data.invoiceId}.pdf`;
      const filePath = join(invoicesDir, fileName);
      const fs = await import("fs");
      const stream = fs.createWriteStream(filePath);
      
      doc.pipe(stream);

      // Header with logo placeholder and company info
      doc
        .fontSize(20)
        .fillColor("#2563eb")
        .text("EverVibe Studios", 50, 50)
        .fontSize(10)
        .fillColor("#000000")
        .text("info@evervibestudios.com", 50, 75)
        .text("www.evervibestudios.com", 50, 90);

      // Invoice title
      doc
        .fontSize(24)
        .fillColor("#1f2937")
        .text("RECHNUNG", 350, 50, { align: "right" });

      // Invoice details (right side)
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .text(`Rechnungsnummer:`, 350, 90, { align: "right" })
        .fillColor("#000000")
        .text(data.invoiceId, 350, 105, { align: "right" })
        .fillColor("#6b7280")
        .text(`Datum:`, 350, 125, { align: "right" })
        .fillColor("#000000")
        .text(data.date, 350, 140, { align: "right" });

      // Customer information
      doc
        .fontSize(12)
        .fillColor("#1f2937")
        .text("Kunde:", 50, 150)
        .fontSize(10)
        .fillColor("#000000")
        .text(data.customerName || data.customer, 50, 170)
        .text(data.customer, 50, 185);

      // Horizontal line
      doc
        .moveTo(50, 230)
        .lineTo(550, 230)
        .strokeColor("#e5e7eb")
        .stroke();

      // Table header
      const tableTop = 250;
      doc
        .fontSize(11)
        .fillColor("#6b7280")
        .text("Artikel", 50, tableTop)
        .text("Lizenztyp", 300, tableTop)
        .text("Betrag", 450, tableTop, { align: "right", width: 100 });

      // Table content
      const itemTop = tableTop + 25;
      doc
        .fontSize(10)
        .fillColor("#000000")
        .text(data.product, 50, itemTop, { width: 240 })
        .text(
          data.licenseType === "single" ? "Single License" : "Agency License",
          300,
          itemTop
        )
        .text(`${data.amount} ${data.currency}`, 450, itemTop, {
          align: "right",
          width: 100,
        });

      // License key information
      doc
        .fontSize(9)
        .fillColor("#6b7280")
        .text(`Lizenzschlüssel: ${data.licenseKey}`, 50, itemTop + 20);

      // Horizontal line before total
      const totalLineY = itemTop + 60;
      doc
        .moveTo(350, totalLineY)
        .lineTo(550, totalLineY)
        .strokeColor("#e5e7eb")
        .stroke();

      // Total
      const totalY = totalLineY + 15;
      doc
        .fontSize(12)
        .fillColor("#1f2937")
        .text("Gesamtbetrag:", 350, totalY)
        .fontSize(14)
        .fillColor("#2563eb")
        .text(`${data.amount} ${data.currency}`, 450, totalY, {
          align: "right",
          width: 100,
        });

      // Footer
      const footerY = 700;
      doc
        .fontSize(8)
        .fillColor("#6b7280")
        .text(
          "Diese Rechnung wurde automatisch erstellt und ist ohne Unterschrift gültig.",
          50,
          footerY,
          { align: "center", width: 500 }
        );

      // Payment info
      doc
        .fontSize(9)
        .fillColor("#000000")
        .text("Zahlungsinformationen:", 50, footerY + 30)
        .fontSize(8)
        .fillColor("#6b7280")
        .text("Zahlung über PayPal", 50, footerY + 45);

      if (data.orderId) {
        doc.text(`PayPal Order ID: ${data.orderId}`, 50, footerY + 60);
      }

      // Company footer
      doc
        .fontSize(7)
        .fillColor("#9ca3af")
        .text(
          "EverVibe Studios | info@evervibestudios.com | www.evervibestudios.com",
          50,
          footerY + 90,
          { align: "center", width: 500 }
        );

      // Finalize PDF
      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get invoice file as buffer
 */
export async function getInvoiceBuffer(filePath: string): Promise<Buffer> {
  return await readFile(filePath);
}
