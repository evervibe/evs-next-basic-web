/**
 * EverVibe Studios - Health Monitoring Configuration
 * 
 * Configuration for automated health checks and monitoring system.
 * Used by the Live Guard agent to perform regular system health validation.
 */

export const healthConfig = {
  // Cron schedule: Run every 12 hours
  schedule: "0 */12 * * *",
  
  // Endpoints to monitor
  endpoints: {
    api: "https://basic.evervibestudios.com/api/health",
    contact: "https://basic.evervibestudios.com/api/contact",
  },
  
  // Email configuration for alerts
  email: "info@evervibestudios.com",
  
  // Retry configuration
  retry: {
    maxAttempts: 3,
    intervalMinutes: 15,
  },
  
  // Alert thresholds
  alerts: {
    consecutiveFailuresForCritical: 3,
  },
} as const;

export type HealthConfig = typeof healthConfig;
