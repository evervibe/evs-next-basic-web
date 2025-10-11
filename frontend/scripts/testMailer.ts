#!/usr/bin/env tsx
/**
 * EVS Mail Configuration Test Script
 * 
 * Tests SMTP configuration by sending a test email using the validated mail config.
 * Usage: npx tsx scripts/testMailer.ts
 */

import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log("╔═══════════════════════════════════════════════╗");
console.log("║   EverVibe Studios - SMTP Configuration Test ║");
console.log("╚═══════════════════════════════════════════════╝\n");

// Import mail config with validation
console.log("📋 Loading and validating mail configuration...");
let mailConfig: { host: string; port: number; secure: boolean; user: string; pass: string };
try {
  // Dynamic import to ensure env vars are loaded first
  const { mailConfig: config } = await import("../config/mail.config.js");
  mailConfig = config;
  console.log("✅ Mail configuration validated successfully\n");
} catch (error) {
  console.error("❌ Failed to load mail configuration:");
  console.error(error);
  process.exit(1);
}

// Display configuration (masked)
console.log("🔧 SMTP Configuration:");
console.log(`   Host:     ${mailConfig.host}`);
console.log(`   Port:     ${mailConfig.port}`);
console.log(`   Secure:   ${mailConfig.secure}`);
console.log(`   User:     ${mailConfig.user}`);
console.log(`   Password: ${"*".repeat(12)}`);
console.log();

async function testSMTP() {
  try {
    console.log("📧 Creating SMTP transporter with validated config...");
    
    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
      logger: true,
      debug: true,
    });

    console.log("✅ Transporter created\n");
    
    console.log("🔌 Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully!\n");

    console.log("📨 Sending test email...");
    const info = await transporter.sendMail({
      from: mailConfig.user,
      to: mailConfig.user,
      subject: "EVS SMTP Test - " + new Date().toISOString(),
      text: "This is a test email from the EVS mail configuration test script.",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4F46E5;">EVS SMTP Test</h2>
          <p>This is a test email from the EverVibe Studios mail configuration.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Configuration:</strong></p>
          <ul>
            <li>Host: ${mailConfig.host}</li>
            <li>Port: ${mailConfig.port}</li>
            <li>Secure: ${mailConfig.secure}</li>
          </ul>
          <p style="color: #10B981; font-weight: bold;">✅ If you receive this email, your SMTP configuration is working correctly!</p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}\n`);

    console.log("╔═══════════════════════════════════════════════╗");
    console.log("║             🎉 ALL TESTS PASSED! 🎉           ║");
    console.log("╚═══════════════════════════════════════════════╝");
    
    process.exit(0);
  } catch (error) {
    console.error("\n❌ SMTP Test Failed:");
    console.error(error);
    
    if (error && typeof error === "object") {
      const err = error as { code?: string; response?: string; command?: string };
      
      console.error("\n🔍 Error Details:");
      if (err.code) console.error(`   Code: ${err.code}`);
      if (err.command) console.error(`   Command: ${err.command}`);
      if (err.response) console.error(`   Response: ${err.response}`);
      
      console.error("\n💡 Troubleshooting:");
      if (err.code === "EAUTH") {
        console.error("   - Check your SMTP username and password");
        console.error("   - Ensure you're using an app-specific password if 2FA is enabled");
      } else if (err.code === "ETIMEDOUT" || err.code === "ESOCKET") {
        console.error("   - Check if the SMTP port is correct (465 for TLS, 587 for STARTTLS)");
        console.error("   - Verify firewall/network settings");
        console.error("   - Try SMTP_SECURE=true for port 465 or false for port 587");
      } else if (err.code === "ECONNECTION") {
        console.error("   - Check if SMTP_HOST is correct");
        console.error("   - Verify network connectivity");
      }
    }
    
    process.exit(1);
  }
}

// Run the test
testSMTP();
