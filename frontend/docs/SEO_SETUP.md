# EVS Template v1.6.0 - SEO Setup Guide

## 📋 Overview

This guide documents the complete SEO setup for the EVS Next.js template, including metadata configuration, structured data, sitemaps, and optimization best practices.

## 🎯 SEO Features

### ✅ Implemented Features

- **Meta Tags**: Complete HTML meta tags with Open Graph and Twitter Card support
- **Sitemap**: Automatic XML sitemap generation with priority and change frequency
- **Robots.txt**: Search engine crawling instructions
- **Manifest.json**: Progressive Web App metadata
- **Structured Data**: JSON-LD schemas for Organization and Website
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Performance**: Optimized Core Web Vitals
- **Mobile-First**: Responsive design with mobile optimization
- **Accessibility**: ARIA labels and semantic markup

## 📁 File Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root metadata and global SEO config
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── opengraph-image.tsx  # OG image generation
├── lib/
│   └── seo.ts               # SEO utilities and helpers
├── public/
│   ├── robots.txt           # Search engine crawling rules
│   ├── manifest.json        # PWA manifest
│   └── og.png              # Open Graph default image
└── docs/
    └── SEO_SETUP.md         # This file
```

## 🔧 Configuration

### 1. Default Metadata (`app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://basic.evervibestudios.com"),
  title: "EverVibe Studios – Premium Next.js Templates",
  description: "Professionelle Weblösungen mit Next.js, React und Tailwind CSS von EverVibe Studios.",
  openGraph: {
    title: "EverVibe Studios",
    description: "Moderne Weblösungen für dein Business",
    type: "website",
    url: "https://basic.evervibestudios.com",
    siteName: "EverVibe Studios",
    images: [{
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "EverVibe Studios OG Banner",
    }],
  },
};
```

### 2. SEO Utilities (`lib/seo.ts`)

Centralized SEO configuration with reusable utilities:

```typescript
import { generateMetadata, defaultSEO } from "@/lib/seo";

// Use in any page
export const metadata = generateMetadata({
  title: "Custom Page Title",
  description: "Custom description",
  keywords: ["keyword1", "keyword2"],
});
```

**Available Functions:**
- `generateMetadata()` - Generate page metadata
- `generateOrganizationSchema()` - JSON-LD for organization
- `generateWebsiteSchema()` - JSON-LD for website
- `generateBreadcrumbSchema()` - JSON-LD for breadcrumbs
- `generateSlug()` - Convert text to URL-safe slug

### 3. Sitemap Configuration (`app/sitemap.ts`)

Automatically generates `/sitemap.xml` with all public pages:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://basic.evervibestudios.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- More URLs... -->
</urlset>
```

**Priority Levels:**
- `1.0` - Homepage (highest priority)
- `0.8` - Main sections (about, features)
- `0.7` - Secondary content (testimonials, contact)
- `0.6` - Tools and resources (download portal)
- `0.3` - Legal pages (impressum, datenschutz, etc.)

### 4. Robots.txt (`public/robots.txt`)

```txt
User-agent: *
Allow: /

Sitemap: https://basic.evervibestudios.com/sitemap.xml
```

### 5. PWA Manifest (`public/manifest.json`)

Progressive Web App metadata for installability:

```json
{
  "name": "EverVibe Studios - Premium Next.js Templates",
  "short_name": "EverVibe Studios",
  "description": "Professionelle Weblösungen mit Next.js, React und Tailwind CSS",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3b82f6"
}
```

## 🎨 Open Graph Images

### Default OG Image
- Location: `/public/og.png`
- Size: 1200 x 630 px (Facebook/LinkedIn recommended)
- Format: PNG or JPG
- Content: Brand name, tagline, visual identity

### Dynamic OG Images
The template supports dynamic OG image generation via `app/opengraph-image.tsx`.

## 📊 Structured Data (JSON-LD)

### Organization Schema

```typescript
import { generateOrganizationSchema } from "@/lib/seo";

// Add to page or component
<script type="application/ld+json">
  {JSON.stringify(generateOrganizationSchema())}
</script>
```

Output:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EverVibe Studios",
  "url": "https://basic.evervibestudios.com",
  "logo": "https://basic.evervibestudios.com/og.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@evervibestudios.com",
    "contactType": "customer service",
    "areaServed": "DE"
  }
}
```

### Website Schema

```typescript
import { generateWebsiteSchema } from "@/lib/seo";

<script type="application/ld+json">
  {JSON.stringify(generateWebsiteSchema())}
</script>
```

## 🔍 SEO Best Practices

### On-Page SEO Checklist

- [x] **Title Tags**: Unique, descriptive, 50-60 characters
- [x] **Meta Descriptions**: Compelling, 150-160 characters
- [x] **Headings**: Proper H1-H6 hierarchy
- [x] **Alt Text**: Descriptive image alt attributes
- [x] **Internal Links**: Logical site navigation
- [x] **Canonical URLs**: Prevent duplicate content
- [x] **Language Tags**: `lang="de"` on `<html>`
- [x] **Mobile-Friendly**: Responsive design
- [x] **Page Speed**: Optimized assets and code
- [x] **HTTPS**: Secure connection required

### Technical SEO Checklist

- [x] **XML Sitemap**: Auto-generated and submitted
- [x] **Robots.txt**: Proper crawl instructions
- [x] **Structured Data**: Valid JSON-LD schemas
- [x] **Open Graph**: Social media preview cards
- [x] **Twitter Cards**: Twitter-specific metadata
- [x] **Favicon**: All sizes and formats
- [x] **PWA Manifest**: Installable app metadata
- [x] **404 Page**: Custom error page
- [x] **301 Redirects**: If applicable

### Content SEO Checklist

- [x] **Keyword Research**: Target relevant keywords
- [x] **Content Quality**: Valuable, original content
- [x] **Content Length**: Sufficient depth (300+ words)
- [x] **Readability**: Clear, scannable text
- [x] **Multimedia**: Images, videos when appropriate
- [x] **Internal Linking**: Connect related content
- [x] **External Links**: Reputable sources
- [x] **Social Sharing**: Easy to share content

## 📈 Performance Optimization

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Techniques

1. **Image Optimization**
   - Use Next.js `<Image>` component
   - WebP format with fallbacks
   - Lazy loading enabled
   - Proper sizing attributes

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting (automatic)
   - Tree shaking unused code

3. **Caching**
   - Static generation where possible
   - Browser caching headers
   - CDN for static assets

4. **Font Optimization**
   - System fonts (no external requests)
   - Font display: swap
   - Subset fonts if custom

5. **CSS Optimization**
   - Tailwind CSS purging
   - Critical CSS inline
   - Remove unused styles

## 🛠️ Tools & Testing

### SEO Analysis Tools

- **Google Search Console**: Monitor search performance
- **Google PageSpeed Insights**: Test Core Web Vitals
- **Lighthouse**: Comprehensive audits (target ≥95)
- **Schema Markup Validator**: Test structured data
- **Mobile-Friendly Test**: Check mobile usability
- **Rich Results Test**: Test rich snippets

### Development Tools

```bash
# Test sitemap generation
npm run build
curl http://localhost:3000/sitemap.xml

# Test robots.txt
curl http://localhost:3000/robots.txt

# Test manifest
curl http://localhost:3000/manifest.json

# Run Lighthouse
npx lighthouse http://localhost:3000 --view
```

## 🎯 Lighthouse Targets (v1.6.0)

- **Performance**: ≥ 95
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 95
- **SEO**: ≥ 95

## 🔄 Maintenance

### Regular Tasks

- **Monthly**: Review Search Console for errors
- **Quarterly**: Update sitemap priorities if content changes
- **Yearly**: Audit and update meta descriptions
- **As Needed**: Add new structured data types
- **After Major Updates**: Re-run Lighthouse audits

### Content Updates

When adding new pages:
1. Add to `app/sitemap.ts`
2. Set appropriate priority and change frequency
3. Add meta tags using `generateMetadata()`
4. Test with SEO analysis tools
5. Submit sitemap to Search Console

## 📚 Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Core Web Vitals](https://web.dev/vitals/)

## 🆘 Support

For SEO-related questions or issues:
- **Email**: info@evervibestudios.com
- **Repository**: https://github.com/evervibe/evs-next-basic-web
- **Documentation**: https://basic.evervibestudios.com

---

**Version**: 1.6.0  
**Last Updated**: 2025-01-15  
**Author**: EverVibe Studios
