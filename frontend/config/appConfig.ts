/**
 * EverVibe Studios - Centralized Application Configuration
 * 
 * This file contains all application-wide configuration parameters.
 * Environment variables are accessed here and exposed through typed config objects.
 */

import { siteConfig } from "./site.config";

export const appConfig = {
  site: {
    name: siteConfig.name,
    url: siteConfig.url,
    location: siteConfig.contact.location,
    contactEmail: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
  },
  contact: {
    rateLimit: {
      window: process.env.CONTACT_RATE_LIMIT_WINDOW || "5m",
      max: Number(process.env.CONTACT_RATE_LIMIT_MAX || 3),
      minMessageLength: Number(process.env.CONTACT_MIN_MESSAGE_LENGTH || 5),
    },
  },
  debug: {
    enableSMTPLogs: process.env.ENABLE_SMTP_LOGGING === "true",
  },
  security: {
    enableRateLimit: process.env.ENABLE_RATE_LIMIT !== "false", // enabled by default
  },
  mode: {
    env: process.env.NODE_ENV || "development",
    evsMode: process.env.EVS_MODE || "development",
    adminEnabled: process.env.EVS_ENABLE_ADMIN === "true",
  },
} as const;

export type AppConfig = typeof appConfig;
