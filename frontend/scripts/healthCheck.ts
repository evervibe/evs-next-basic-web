#!/usr/bin/env tsx
/**
 * EVS Live Guard - Automated Health Check System
 * 
 * Monitors SMTP, API endpoints, and environment consistency.
 * Sends alerts via email and optional webhooks on failures.
 * 
 * Usage: npx tsx scripts/healthCheck.ts
 */

import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import { healthConfig } from "../config/health.config.js";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.production") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

interface HealthCheckResult {
  name: string;
  status: "OK" | "FAILED";
  message: string;
  duration?: number;
  details?: string;
}

interface HealthReport {
  timestamp: string;
  results: HealthCheckResult[];
  overallStatus: "HEALTHY" | "DEGRADED" | "CRITICAL";
  nextRun?: string;
}

let mailConfig: { host: string; port: number; secure: boolean; user: string; pass: string };

/**
 * Load and validate mail configuration
 */
async function loadMailConfig() {
  try {
    const { mailConfig: config } = await import("../config/mail.config.js");
    mailConfig = config;
    return true;
  } catch (error) {
    console.error("❌ Failed to load mail configuration:", error);
    return false;
  }
}

/**
 * Check SMTP connection
 */
async function checkSMTPConnection(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    if (!mailConfig) {
      throw new Error("Mail configuration not loaded");
    }

    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();
    const duration = Date.now() - startTime;

    return {
      name: "SMTP Connection",
      status: "OK",
      message: `Connected to ${mailConfig.host}:${mailConfig.port}`,
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      name: "SMTP Connection",
      status: "FAILED",
      message: "SMTP authentication failed",
      duration,
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Check Contact API endpoint
 */
async function checkContactAPI(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    // Send a test payload with honeypot to trigger silent success
    const response = await fetch(healthConfig.endpoints.contact, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Health Check Test",
        email: "test@evervibestudios.com",
        message: "Automated health check - this should be silently rejected by honeypot",
        hp: "bot_test", // Honeypot field - will cause silent success
        ts: Date.now(),
      }),
    });

    const duration = Date.now() - startTime;

    if (response.ok) {
      return {
        name: "Contact API",
        status: "OK",
        message: `Responded ${response.status}`,
        duration: duration / 1000,
      };
    } else {
      return {
        name: "Contact API",
        status: "FAILED",
        message: `Responded ${response.status}`,
        duration: duration / 1000,
        details: await response.text(),
      };
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      name: "Contact API",
      status: "FAILED",
      message: "Request failed",
      duration: duration / 1000,
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Check Frontend Health endpoint
 */
async function checkFrontendHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(healthConfig.endpoints.api, {
      method: "GET",
    });

    const duration = Date.now() - startTime;

    if (response.ok) {
      const data = await response.json();
      return {
        name: "Frontend Health",
        status: "OK",
        message: `Online (${data.service || "unknown"})`,
        duration: duration / 1000,
      };
    } else {
      return {
        name: "Frontend Health",
        status: "FAILED",
        message: `Responded ${response.status}`,
        duration: duration / 1000,
      };
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      name: "Frontend Health",
      status: "FAILED",
      message: "Request failed",
      duration: duration / 1000,
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Check Environment Consistency (basic check)
 */
async function checkEnvConsistency(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    const requiredVars = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_SECURE",
      "SMTP_USER",
      "SMTP_PASS",
    ];

    const missing = requiredVars.filter((v) => !process.env[v]);
    const duration = Date.now() - startTime;

    if (missing.length === 0) {
      return {
        name: "Env Consistency",
        status: "OK",
        message: "100%",
        duration,
      };
    } else {
      return {
        name: "Env Consistency",
        status: "FAILED",
        message: `Missing ${missing.length} variable(s)`,
        duration,
        details: `Missing: ${missing.join(", ")}`,
      };
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      name: "Env Consistency",
      status: "FAILED",
      message: "Check failed",
      duration,
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Generate markdown health report
 */
function generateMarkdownReport(report: HealthReport): string {
  const date = new Date().toISOString().split("T")[0];
  const time = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
  
  let markdown = `# EVS Live Health Report – ${date}\n\n`;
  
  report.results.forEach((result) => {
    const icon = result.status === "OK" ? "✅" : "❌";
    const duration = result.duration ? ` (${result.duration.toFixed(2)} s)` : "";
    markdown += `${icon} ${result.name}: ${result.message}${duration}\n`;
    if (result.details) {
      markdown += `   Details: ${result.details}\n`;
    }
  });
  
  markdown += `\n**Overall Status**: ${report.overallStatus}\n`;
  markdown += `**Last run**: ${time} CET\n`;
  
  if (report.nextRun) {
    markdown += `**Next run**: ${report.nextRun}\n`;
  }
  
  return markdown;
}

/**
 * Send alert email
 */
async function sendAlertEmail(report: HealthReport): Promise<void> {
  if (!mailConfig) {
    console.error("❌ Cannot send alert: Mail configuration not loaded");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const failedChecks = report.results.filter((r) => r.status === "FAILED");
    const subject = `⚠️ EVS Health Alert – ${failedChecks.length} Check(s) Failed`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
        <h2 style="color: #DC2626;">⚠️ EVS Health Alert</h2>
        <p><strong>Overall Status:</strong> ${report.overallStatus}</p>
        <p><strong>Timestamp:</strong> ${report.timestamp}</p>
        
        <h3>Failed Checks:</h3>
        <ul>
          ${failedChecks.map((check) => `
            <li>
              <strong>${check.name}:</strong> ${check.message}
              ${check.details ? `<br/><small style="color: #666;">Details: ${check.details}</small>` : ""}
            </li>
          `).join("")}
        </ul>
        
        <h3>All Results:</h3>
        <ul>
          ${report.results.map((check) => `
            <li style="color: ${check.status === "OK" ? "#10B981" : "#DC2626"};">
              ${check.status === "OK" ? "✅" : "❌"} ${check.name}: ${check.message}
            </li>
          `).join("")}
        </ul>
        
        <p style="margin-top: 20px; color: #666; font-size: 12px;">
          <strong>Action:</strong> Auto-retry in ${healthConfig.retry.intervalMinutes} minutes
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: mailConfig.user,
      to: healthConfig.email,
      subject,
      html: htmlContent,
      text: generateMarkdownReport(report),
    });

    console.log("✅ Alert email sent successfully");
  } catch (error) {
    console.error("❌ Failed to send alert email:", error);
  }
}

/**
 * Send webhook alert (Discord/Slack)
 */
async function sendWebhookAlert(report: HealthReport): Promise<void> {
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  const slackWebhook = process.env.SLACK_WEBHOOK_URL;

  const failedChecks = report.results.filter((r) => r.status === "FAILED");
  
  if (discordWebhook) {
    try {
      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "⚠️ EVS Health Alert",
            description: `**Status:** ${report.overallStatus}\n**Failed Checks:** ${failedChecks.length}`,
            color: report.overallStatus === "CRITICAL" ? 0xDC2626 : 0xF59E0B,
            fields: report.results.map((r) => ({
              name: `${r.status === "OK" ? "✅" : "❌"} ${r.name}`,
              value: r.message,
              inline: true,
            })),
            timestamp: report.timestamp,
          }],
        }),
      });
      console.log("✅ Discord webhook sent successfully");
    } catch (error) {
      console.error("❌ Failed to send Discord webhook:", error);
    }
  }

  if (slackWebhook) {
    try {
      await fetch(slackWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `⚠️ *EVS Health Alert*\n*Status:* ${report.overallStatus}\n*Failed Checks:* ${failedChecks.length}`,
          attachments: report.results.map((r) => ({
            color: r.status === "OK" ? "good" : "danger",
            text: `${r.status === "OK" ? "✅" : "❌"} ${r.name}: ${r.message}`,
          })),
        }),
      });
      console.log("✅ Slack webhook sent successfully");
    } catch (error) {
      console.error("❌ Failed to send Slack webhook:", error);
    }
  }
}

/**
 * Save health report to file
 */
async function saveHealthReport(report: HealthReport): Promise<void> {
  try {
    const logsDir = path.join(process.cwd(), "docs", "agent_logs");
    await mkdir(logsDir, { recursive: true });
    
    const date = new Date().toISOString().split("T")[0];
    const logFile = path.join(logsDir, `${date}_LIVE_GUARD.md`);
    
    const markdown = generateMarkdownReport(report);
    await writeFile(logFile, markdown);
    
    console.log(`✅ Health report saved to: ${logFile}`);
  } catch (error) {
    console.error("❌ Failed to save health report:", error);
  }
}

/**
 * Main health check execution
 */
async function runHealthCheck(): Promise<void> {
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║    EVS Live Guard - Health Check Starting    ║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  // Load mail configuration first
  const mailConfigLoaded = await loadMailConfig();
  if (!mailConfigLoaded) {
    console.error("❌ Cannot proceed without mail configuration");
    process.exit(1);
  }

  // Run all health checks
  console.log("🔍 Running health checks...\n");
  
  const results: HealthCheckResult[] = [];
  
  console.log("📧 Checking SMTP connection...");
  results.push(await checkSMTPConnection());
  
  console.log("🌐 Checking Contact API...");
  results.push(await checkContactAPI());
  
  console.log("💚 Checking Frontend Health...");
  results.push(await checkFrontendHealth());
  
  console.log("⚙️  Checking Environment Consistency...");
  results.push(await checkEnvConsistency());
  
  // Determine overall status
  const failedCount = results.filter((r) => r.status === "FAILED").length;
  let overallStatus: "HEALTHY" | "DEGRADED" | "CRITICAL";
  
  if (failedCount === 0) {
    overallStatus = "HEALTHY";
  } else if (failedCount >= healthConfig.alerts.consecutiveFailuresForCritical) {
    overallStatus = "CRITICAL";
  } else {
    overallStatus = "DEGRADED";
  }
  
  // Calculate next run time (12 hours from now)
  const nextRunDate = new Date(Date.now() + 12 * 60 * 60 * 1000);
  const nextRun = nextRunDate.toLocaleString("de-DE", { timeZone: "Europe/Berlin" }) + " CET";
  
  const report: HealthReport = {
    timestamp: new Date().toISOString(),
    results,
    overallStatus,
    nextRun,
  };
  
  // Display results
  console.log("\n╔═══════════════════════════════════════════════╗");
  console.log("║            Health Check Results               ║");
  console.log("╚═══════════════════════════════════════════════╝\n");
  
  results.forEach((result) => {
    const icon = result.status === "OK" ? "✅" : "❌";
    const duration = result.duration ? ` (${result.duration.toFixed(2)}s)` : "";
    console.log(`${icon} ${result.name}: ${result.message}${duration}`);
    if (result.details) {
      console.log(`   └─ Details: ${result.details}`);
    }
  });
  
  console.log(`\n**Overall Status**: ${overallStatus}`);
  console.log(`**Next run**: ${nextRun}\n`);
  
  // Save report
  await saveHealthReport(report);
  
  // Send alerts if there are failures
  if (failedCount > 0) {
    console.log("\n⚠️  Failures detected, sending alerts...\n");
    await sendAlertEmail(report);
    await sendWebhookAlert(report);
  }
  
  console.log("╔═══════════════════════════════════════════════╗");
  console.log(`║        ${overallStatus === "HEALTHY" ? "🎉 ALL CHECKS PASSED! 🎉" : "⚠️  ISSUES DETECTED!"}         ║`);
  console.log("╚═══════════════════════════════════════════════╝");
  
  // Exit with appropriate code
  process.exit(failedCount > 0 ? 1 : 0);
}

// Run the health check
runHealthCheck();
