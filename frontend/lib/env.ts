/**
 * EVS Environment Validation with Zod
 * 
 * This module provides lazy runtime validation of environment variables
 * ensuring stable builds regardless of missing ENV variables.
 * Critical integrations are validated at runtime, not during build.
 * 
 * @module lib/env
 * @version 1.6.3
 */

import { z } from "zod";

/**
 * Environment validation schema with lazy validation
 * All critical variables are optional with safe defaults for build stability
 */
const envSchema = z.object({
  // ============ CORE CONFIG ============
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  EVS_MODE: z.enum(["development", "staging", "production"]).default("development"),
  EVS_ENABLE_ADMIN: z.string().optional().transform(val => val === "true"),

  // ============ SMTP CONFIG (OPTIONAL FOR BUILD) ============
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_SECURE: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // ============ MAIL CONFIG ============
  MAIL_TO: z.string().email().optional(),
  MAIL_FROM: z.string().email().optional(),

  // ============ SECURITY & RATE LIMIT ============
  CONTACT_RATE_LIMIT_WINDOW: z.string().default("5m"),
  CONTACT_RATE_LIMIT_MAX: z.string().default("3"),
  CONTACT_MIN_MESSAGE_LENGTH: z.string().default("5"),
  ENABLE_RATE_LIMIT: z.string().default("true"),
  ENABLE_SMTP_LOGGING: z.string().default("false"),

  // ============ PAYMENT CONFIG (OPTIONAL FOR BUILD) ============
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  PAYPAL_MODE: z.enum(["sandbox", "live"]).default("sandbox"),

  // ============ LICENSE CONFIG (OPTIONAL FOR BUILD) ============
  LICENSE_SALT: z.string().optional(),
  LICENSE_EMAIL_SENDER: z.string().optional(),
  LICENSE_SINGLE_PRICE: z.string().optional(),
  LICENSE_AGENCY_PRICE: z.string().optional(),
  
  // ============ REDIS CONFIG (OPTIONAL FOR BUILD) ============
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  
  // ============ JWT CONFIG (OPTIONAL FOR BUILD) ============
  LICENSE_JWT_SECRET: z.string().optional(),

  // ============ OPTIONAL MONITORING ============
  DISCORD_WEBHOOK_URL: z.string().url().optional(),
  SLACK_WEBHOOK_URL: z.string().url().optional(),
});

/**
 * Type inference from the schema
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Cached environment variables
 */
let cachedEnv: Env | null = null;

/**
 * Get environment variables with lazy validation and safe fallbacks
 * This function never throws during build - only warns about missing values
 * 
 * @returns {object} Environment variables with safe defaults
 */
export function getEnv() {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse(process.env);
  
  if (!parsed.success) {
    console.warn("⚠️  Missing ENV values detected. Using safe fallbacks for build stability.");
    if (process.env.NODE_ENV === "development") {
      console.warn("ℹ️  Check .env.example for required environment variables.");
    }
  }

  // Use parsed data if valid, otherwise use process.env directly
  const env = parsed.success ? parsed.data : process.env;

  // Return with safe fallbacks for all critical integrations
  cachedEnv = {
    // Core config
    NODE_ENV: (env.NODE_ENV as "development" | "production" | "test") || "development",
    EVS_MODE: (env.EVS_MODE as "development" | "staging" | "production") || "development",
    EVS_ENABLE_ADMIN: env.EVS_ENABLE_ADMIN === "true" || false,

    // SMTP config with fallbacks
    SMTP_HOST: env.SMTP_HOST || undefined,
    SMTP_PORT: env.SMTP_PORT || undefined,
    SMTP_SECURE: env.SMTP_SECURE || undefined,
    SMTP_USER: env.SMTP_USER || undefined,
    SMTP_PASS: env.SMTP_PASS || undefined,

    // Mail config
    MAIL_TO: env.MAIL_TO || undefined,
    MAIL_FROM: env.MAIL_FROM || undefined,

    // Security & rate limit
    CONTACT_RATE_LIMIT_WINDOW: env.CONTACT_RATE_LIMIT_WINDOW || "5m",
    CONTACT_RATE_LIMIT_MAX: env.CONTACT_RATE_LIMIT_MAX || "3",
    CONTACT_MIN_MESSAGE_LENGTH: env.CONTACT_MIN_MESSAGE_LENGTH || "5",
    ENABLE_RATE_LIMIT: env.ENABLE_RATE_LIMIT || "true",
    ENABLE_SMTP_LOGGING: env.ENABLE_SMTP_LOGGING || "false",

    // PayPal config with sandbox defaults
    PAYPAL_CLIENT_ID: env.PAYPAL_CLIENT_ID || undefined,
    PAYPAL_CLIENT_SECRET: env.PAYPAL_CLIENT_SECRET || undefined,
    PAYPAL_MODE: (env.PAYPAL_MODE as "sandbox" | "live") || "sandbox",

    // License config with fallbacks
    LICENSE_SALT: env.LICENSE_SALT || undefined,
    LICENSE_EMAIL_SENDER: env.LICENSE_EMAIL_SENDER || undefined,
    LICENSE_SINGLE_PRICE: env.LICENSE_SINGLE_PRICE || undefined,
    LICENSE_AGENCY_PRICE: env.LICENSE_AGENCY_PRICE || undefined,

    // Redis config
    UPSTASH_REDIS_REST_URL: env.UPSTASH_REDIS_REST_URL || undefined,
    UPSTASH_REDIS_REST_TOKEN: env.UPSTASH_REDIS_REST_TOKEN || undefined,

    // JWT config
    LICENSE_JWT_SECRET: env.LICENSE_JWT_SECRET || undefined,

    // Optional monitoring
    DISCORD_WEBHOOK_URL: env.DISCORD_WEBHOOK_URL || undefined,
    SLACK_WEBHOOK_URL: env.SLACK_WEBHOOK_URL || undefined,
  };

  return cachedEnv;
}

/**
 * Validate that PayPal configuration is available
 * Call this at runtime when PayPal is actually needed
 */
export function requirePayPalConfig() {
  const env = getEnv();
  if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal configuration is not available. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.");
  }
  return {
    clientId: env.PAYPAL_CLIENT_ID,
    clientSecret: env.PAYPAL_CLIENT_SECRET,
    mode: env.PAYPAL_MODE,
  };
}

/**
 * Validate that SMTP configuration is available
 * Call this at runtime when email sending is actually needed
 */
export function requireSMTPConfig() {
  const env = getEnv();
  if (!env.SMTP_HOST || !env.SMTP_PORT || !env.SMTP_USER || !env.SMTP_PASS) {
    throw new Error("SMTP configuration is not available. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.");
  }
  return {
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT, 10),
    secure: env.SMTP_SECURE === "true",
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  };
}

/**
 * Validate that Redis configuration is available
 * Call this at runtime when Redis is actually needed
 */
export function requireRedisConfig() {
  const env = getEnv();
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Redis configuration is not available. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.");
  }
  return {
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  };
}

/**
 * Validate that License configuration is available
 * Call this at runtime when license operations are needed
 */
export function requireLicenseConfig() {
  const env = getEnv();
  if (!env.LICENSE_SALT) {
    throw new Error("License configuration is not available. Set LICENSE_SALT.");
  }
  return {
    salt: env.LICENSE_SALT,
    emailSender: env.LICENSE_EMAIL_SENDER || "info@evervibestudios.com",
    singlePrice: env.LICENSE_SINGLE_PRICE ? parseFloat(env.LICENSE_SINGLE_PRICE) : 29.0,
    agencyPrice: env.LICENSE_AGENCY_PRICE ? parseFloat(env.LICENSE_AGENCY_PRICE) : 79.0,
    jwtSecret: env.LICENSE_JWT_SECRET,
  };
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  const env = getEnv();
  return env.NODE_ENV === "production";
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  const env = getEnv();
  return env.NODE_ENV === "development";
}

/**
 * Check if running in test mode
 */
export function isTest(): boolean {
  const env = getEnv();
  return env.NODE_ENV === "test";
}

/**
 * Export schema for testing
 */
export const EnvSchema = envSchema;
