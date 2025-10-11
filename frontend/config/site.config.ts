/**
 * EverVibe Studios - Site Configuration
 * 
 * Central configuration for all static site values.
 * This file contains no secrets - only public/static configuration.
 */

export const siteConfig = {
  name: "EverVibe Studios",
  url: "https://basic.evervibestudios.com",
  contact: {
    email: "info@evervibestudios.com",
    phone: "+49 (0) 123 456789",
    location: "Hamburg, Deutschland",
  },
  meta: {
    title: "EverVibe Studios – Premium Next.js Templates",
    description: "Modernes, performantes Template für Kreative, Studios & Freelancer.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
