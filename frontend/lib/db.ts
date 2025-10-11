/**
 * EverVibe Studios - Redis Database Connection
 * 
 * Upstash Redis connection for license storage and validation.
 * Uses lazy initialization to prevent build-time failures.
 * 
 * @version 1.6.3
 */

import { Redis } from "@upstash/redis";
import { requireRedisConfig } from "@/lib/env";

// Lazy initialization of Redis client
let redisClient: Redis | null = null;

/**
 * Get Redis client instance
 * Uses Upstash Redis REST API for serverless compatibility
 * 
 * @throws {Error} If Redis configuration is not available
 */
export function getRedisClient(): Redis {
  if (!redisClient) {
    const config = requireRedisConfig();
    redisClient = new Redis({
      url: config.url,
      token: config.token,
    });
  }

  return redisClient;
}

/**
 * Check if Redis is configured (non-throwing)
 */
export function isRedisConfigured(): boolean {
  try {
    requireRedisConfig();
    return true;
  } catch {
    return false;
  }
}

/**
 * License data structure stored in Redis
 */
export interface StoredLicense {
  email: string;
  type: "single" | "agency";
  issuedAt: string;
  validUntil: string | null; // null means no expiration
  downloadCount: number;
}

/**
 * Download log entry
 */
export interface DownloadLogEntry {
  ip: string;
  timestamp: string;
  userAgent?: string;
}

/**
 * Store license in Redis
 */
export async function storeLicense(
  licenseKey: string,
  licenseData: StoredLicense
): Promise<void> {
  const redis = getRedisClient();
  const key = `LICENSE:${licenseKey}`;
  
  // Store license data (no expiration as per requirements)
  await redis.set(key, JSON.stringify(licenseData));
}

/**
 * Get license from Redis
 */
export async function getLicense(
  licenseKey: string
): Promise<StoredLicense | null> {
  const redis = getRedisClient();
  const key = `LICENSE:${licenseKey}`;
  
  const data = await redis.get<string>(key);
  
  if (!data) {
    return null;
  }
  
  return typeof data === "string" ? JSON.parse(data) : data;
}

/**
 * Log download attempt
 */
export async function logDownload(
  licenseKey: string,
  logEntry: DownloadLogEntry
): Promise<void> {
  const redis = getRedisClient();
  const key = `DOWNLOAD:LOG:${licenseKey}`;
  
  // Get existing logs
  const existingLogs = await redis.get<string>(key);
  const logs: DownloadLogEntry[] = existingLogs 
    ? (typeof existingLogs === "string" ? JSON.parse(existingLogs) : existingLogs)
    : [];
  
  // Add new log entry
  logs.push(logEntry);
  
  // Store updated logs
  await redis.set(key, JSON.stringify(logs));
  
  // Increment download count
  const licenseData = await getLicense(licenseKey);
  if (licenseData) {
    licenseData.downloadCount += 1;
    await storeLicense(licenseKey, licenseData);
  }
}

/**
 * Get download logs for a license
 */
export async function getDownloadLogs(
  licenseKey: string
): Promise<DownloadLogEntry[]> {
  const redis = getRedisClient();
  const key = `DOWNLOAD:LOG:${licenseKey}`;
  
  const data = await redis.get<string>(key);
  
  if (!data) {
    return [];
  }
  
  return typeof data === "string" ? JSON.parse(data) : data;
}
