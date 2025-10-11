/**
 * EverVibe Studios - Download Token Management
 * 
 * JWT-based secure download tokens with 5-minute expiration.
 */

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.LICENSE_JWT_SECRET || "evs-2025-secret";
const TOKEN_EXPIRATION = "5m"; // 5 minutes

export interface DownloadTokenPayload {
  licenseKey: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for secure downloads
 */
export function generateDownloadToken(
  licenseKey: string,
  email: string
): string {
  const payload: DownloadTokenPayload = {
    licenseKey,
    email,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
}

/**
 * Verify and decode a download token
 */
export function verifyDownloadToken(
  token: string
): DownloadTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DownloadTokenPayload;
    return decoded;
  } catch (error) {
    // Token expired or invalid
    console.error("Token verification failed:", error);
    return null;
  }
}
