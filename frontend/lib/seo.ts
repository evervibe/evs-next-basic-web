/**
 * EVS SEO Utilities
 * 
 * Centralized SEO configuration and utilities for consistent
 * metadata across all pages.
 * 
 * @module lib/seo
 * @version 1.6.0
 */

import { Metadata } from "next";

/**
 * Default SEO configuration
 */
export const defaultSEO = {
  siteName: "EverVibe Studios",
  title: "EverVibe Studios – Premium Next.js Templates",
  description: "Professionelle Weblösungen mit Next.js, React und Tailwind CSS von EverVibe Studios.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Web Development",
    "Landing Page",
    "Template",
    "DSGVO",
    "SEO",
  ],
  locale: "de_DE",
  language: "de",
  url: "https://basic.evervibestudios.com",
  ogImage: {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: "EverVibe Studios OG Banner",
  },
} as const;

/**
 * Generate metadata for a page
 * 
 * @param options - Page-specific metadata options
 * @returns Metadata object for Next.js
 */
export function generateMetadata(options?: {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const title = options?.title 
    ? `${options.title} | ${defaultSEO.siteName}`
    : defaultSEO.title;
    
  const description = options?.description || defaultSEO.description;
  const keywords = options?.keywords || defaultSEO.keywords;
  const ogImageUrl = options?.ogImage || defaultSEO.ogImage.url;

  return {
    metadataBase: new URL(defaultSEO.url),
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: defaultSEO.siteName }],
    creator: defaultSEO.siteName,
    publisher: defaultSEO.siteName,
    robots: options?.noIndex 
      ? "noindex, nofollow" 
      : "index, follow",
    openGraph: {
      type: "website",
      locale: defaultSEO.locale,
      url: defaultSEO.url,
      siteName: defaultSEO.siteName,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: defaultSEO.ogImage.width,
          height: defaultSEO.ogImage.height,
          alt: defaultSEO.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: defaultSEO.siteName,
    url: defaultSEO.url,
    logo: `${defaultSEO.url}/og.png`,
    description: defaultSEO.description,
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@evervibestudios.com",
      contactType: "customer service",
      areaServed: "DE",
      availableLanguage: ["German", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
      addressLocality: "Hamburg",
    },
  };
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: defaultSEO.siteName,
    url: defaultSEO.url,
    description: defaultSEO.description,
    inLanguage: defaultSEO.language,
  };
}

/**
 * Generate breadcrumb JSON-LD
 * 
 * @param items - Breadcrumb items
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${defaultSEO.url}${item.url}`,
    })),
  };
}

/**
 * SEO-friendly URL slug generator
 * 
 * @param text - Text to convert to slug
 * @returns URL-safe slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
