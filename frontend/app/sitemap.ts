/**
 * EVS Sitemap Configuration
 * 
 * Generates a sitemap.xml for search engines with all public pages
 * and their metadata (priority, change frequency, last modified).
 * 
 * @module app/sitemap
 * @version 1.6.0
 */

import { MetadataRoute } from "next";
import { appConfig } from "@/config/appConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.site.url;
  const now = new Date();

  return [
    // Main page - highest priority
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    // Main sections - high priority
    {
      url: `${baseUrl}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#features`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#testimonials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Download portal - medium priority
    {
      url: `${baseUrl}/download`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Legal pages - low priority, rarely change
    {
      url: `${baseUrl}/impressum`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/agb`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
