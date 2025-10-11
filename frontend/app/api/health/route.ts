/**
 * EverVibe Studios - Health Check API Endpoint
 * 
 * Simple health check endpoint that returns the status of the application.
 * Used by the Live Guard monitoring system.
 */

import { appConfig } from "@/config/appConfig";

export async function GET() {
  try {
    return Response.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: appConfig.mode.evsMode,
      service: "evs-frontend",
      version: "1.4.1",
    });
  } catch (error) {
    return Response.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
