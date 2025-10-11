# Changelog

All notable changes to the EVS Frontend project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2025-01-15 - Template Modernization & GDPR Compliance

### Added - SEO Enhancement
- **SEO Utilities** (`lib/seo.ts`): Centralized SEO configuration and helpers
  - `generateMetadata()` - Page-specific metadata generation
  - `generateOrganizationSchema()` - JSON-LD for Organization
  - `generateWebsiteSchema()` - JSON-LD for Website
  - `generateBreadcrumbSchema()` - JSON-LD for breadcrumbs
  - `generateSlug()` - German-aware URL slug generator
  - Default SEO configuration with keywords, locale, language
- **PWA Manifest** (`public/manifest.json`): Progressive Web App metadata
  - Installability support
  - Theme colors and icons
  - German language support
- **Enhanced Sitemap** (`app/sitemap.ts`): Improved documentation and structure
  - Download portal included
  - Better priority management
  - Comprehensive comments
- **SEO Documentation** (`docs/SEO_SETUP.md`): Complete SEO implementation guide
  - Configuration instructions
  - Best practices checklist
  - Lighthouse targets (≥95 all categories)
  - Tools and testing procedures
  - Performance optimization techniques

### Added - GDPR Consent Layer
- **ConsentBanner Component** (`components/ConsentBanner.tsx`): Full GDPR consent management
  - Simple banner with Accept/Reject/Customize options
  - Detailed settings view with per-category controls
  - LocalStorage-based persistence (no server required)
  - 30-day consent expiry with automatic renewal
  - Version management for policy updates
  - Framer Motion animations
  - Full dark mode support
  - Mobile-responsive design
- **useConsent Hook**: Access consent state from any component
- **Consent Documentation** (`docs/CONSENT_LAYER_SETUP.md`): Complete GDPR implementation guide
  - Legal requirements checklist (GDPR Art. 7, 12-22)
  - ePrivacy Directive compliance
  - Customization guide
  - Testing procedures
  - Analytics integration details

### Added - Environment Validation
- **Environment Validation** (`lib/env.ts`): Zod-based runtime validation
  - Complete schema for all environment variables
  - Type-safe environment access
  - Detailed error messages on validation failure
  - Helper functions: `getEnv()`, `isProduction()`, `isDevelopment()`, `isTest()`
  - Cached validation for performance
  - Prevents app startup with invalid configuration
- **Enhanced .env.example**: Comprehensive documentation
  - Detailed comments for each variable
  - Security notes and best practices
  - Validation troubleshooting guide
  - Provider-specific configurations

### Added - Security Enhancements
- **Security Headers** (`next.config.ts`): Production-ready HTTP security headers
  - Content-Security-Policy with PayPal and Vercel Analytics support
  - X-Frame-Options: DENY (clickjacking protection)
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: Restricted camera, microphone, geolocation
- **Deployment Guide** (`docs/DEPLOYMENT_TEMPLATE_1.6.0.md`): Complete deployment documentation
  - Vercel, Render, and VPS deployment instructions
  - Security hardening guide
  - Pre/post-deployment checklists
  - Troubleshooting section
  - Monitoring and maintenance procedures

### Changed
- **Layout** (`app/layout.tsx`): 
  - Added ConsentBanner component
  - Added manifest.json link
  - Added theme-color meta tag
- **Sitemap** (`app/sitemap.ts`):
  - Added download portal route
  - Improved documentation and comments
  - Better change frequency management
- **Version**: Bumped to 1.6.0

### Documentation
- `docs/SEO_SETUP.md` - Complete SEO implementation guide
- `docs/CONSENT_LAYER_SETUP.md` - GDPR consent layer documentation
- `docs/DEPLOYMENT_TEMPLATE_1.6.0.md` - Production deployment guide
- `.env.example` - Enhanced with comprehensive comments and validation notes

### Technical Improvements
- Runtime environment validation with Zod
- Type-safe configuration access
- Improved error messages for misconfiguration
- Better documentation structure
- Production-ready security headers

### Lighthouse Targets (v1.6.0)
- **Performance**: ≥ 95
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 95
- **SEO**: ≥ 95

### Migration Notes
- No breaking changes from v1.5.2
- Environment validation now enforced (add all required variables)
- ConsentBanner auto-integrates (no action needed)
- Security headers auto-apply (review CSP if using additional scripts)

### GDPR Compliance
- ✅ Cookie consent banner with granular controls
- ✅ 30-day consent expiry
- ✅ Clear information about data processing
- ✅ Easy consent withdrawal
- ✅ Cookieless analytics (Vercel)
- ✅ LocalStorage-only storage (no server tracking)

### SEO Features
- ✅ Complete meta tags (Open Graph, Twitter Cards)
- ✅ Structured data (JSON-LD)
- ✅ XML sitemap with priorities
- ✅ PWA manifest
- ✅ Robots.txt configured
- ✅ Mobile-first responsive design
- ✅ Semantic HTML with ARIA labels

---

## [1.5.2] - 2025-10-09 - Complete Digital Distribution System

### Added - v1.5.1 (Download Portal & License Validation)
- **Upstash Redis Integration**: Serverless Redis for license storage and validation
  - `@upstash/redis` library for database connectivity
  - License storage with metadata (email, type, issuedAt, validUntil, downloadCount)
  - Download logging with IP tracking and timestamps
- **JWT Download Tokens**: Secure 5-minute download links
  - Token generation and verification utilities
  - `LICENSE_JWT_SECRET` environment variable
- **License Validation API**: POST `/api/license/validate`
  - Rate limiting (3 requests per 5 minutes per IP)
  - Email and license key verification
  - Download token generation
- **Secure Download API**: GET `/api/download?token=...`
  - JWT token validation
  - Download logging to Redis
  - Rate limiting protection
- **Download Portal UI**: `/download` page
  - Modern, responsive design with dark mode
  - License key and email validation form
  - Animated DownloadCard component with Framer Motion
  - User-friendly error messages and instructions

### Added - v1.5.2 (Customer Mail & Invoice System)
- **PDF Invoice Generation**: Professional A4 invoices using PDFKit
  - `pdfkit` library for PDF creation
  - Automatic invoice ID generation (EVS-YYYY-NNNN format)
  - EVS branding (colors, logo, company info)
  - License key inclusion in invoice
  - Sequential invoice numbering via counter file
- **Multi-Language Email Support**: German and English templates
  - Language auto-detection from email domain (.de, .at, .ch → German)
  - Unified branding configuration
  - Gradient header design with EVS colors
- **Enhanced License Email**: Improved HTML templates
  - Professional gradient design
  - Responsive layout for mobile devices
  - Prominent download button
  - Enhanced license info display
- **Receipt Email with Invoice**: Separate email with PDF attachment
  - Invoice details display
  - PDF invoice attachment
  - Multi-language support
  - Consistent branding
- **Mail Template Configuration**: Centralized branding and translations
  - Unified color scheme and styling
  - Reusable CSS styles for all emails
  - Language translation management

### Changed
- **License Issue Endpoint**: Enhanced to generate invoices and send receipts
  - Now generates PDF invoice for each license
  - Sends two emails: license email + receipt email with PDF
  - Stores licenses in Redis for validation
- **Mail Templates**: Refactored for better maintainability
  - Legacy mailTemplate.ts now re-exports from new mail modules
  - Backward compatibility maintained
- **Version**: Bumped to 1.5.2
- **Dependencies**: Added `@upstash/redis`, `pdfkit`, `@types/pdfkit`

### Environment Variables
- `UPSTASH_REDIS_REST_URL` - Upstash Redis connection URL
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis authentication token
- `LICENSE_JWT_SECRET` - Secret for JWT download token signing

### File Structure
- `/lib/db.ts` - Redis connection and license storage
- `/lib/license/downloadToken.ts` - JWT token utilities
- `/lib/pdf/generateInvoice.ts` - PDF invoice generation
- `/lib/mail/licenseMail.ts` - Enhanced license email templates
- `/lib/mail/receiptMail.ts` - Receipt email templates
- `/config/mailTemplate.config.ts` - Mail branding and translations
- `/app/download/page.tsx` - Download portal page
- `/app/api/license/validate/route.ts` - License validation endpoint
- `/app/api/download/route.ts` - Secure download endpoint
- `/components/DownloadCard.tsx` - Download form component
- `/docs/invoices/` - Invoice storage directory

### Security
- JWT tokens with 5-minute expiration for downloads
- Rate limiting on validation and download endpoints
- IP logging for all download attempts
- License-email binding enforcement
- PDF invoices stored locally, not in Git
- No automatic Redis eviction (persistent storage)

### Notes
- Complete customer lifecycle now implemented: Purchase → License → Download → Invoice → Support
- Redis configuration required for production (Upstash recommended)
- Invoice PDFs are gitignored and sent only via email
- File delivery currently redirects to GitHub (needs production implementation)

## [1.5.0] - 2025-10-08 - Monetization Core

### Added
- PayPal REST API integration for payment processing
- License generation system with cryptographic validation
- Automated license issuance API
- Professional license email templates
- Pricing section with payment flow
- Rate limiting for payment endpoints

## [1.3.7] - 2025-01-10 - Secure Zimbra Mail + UX Update

### Fixed
- **SMTP Integration**: Repaired and secured Zimbra SMTP connection
  - Added TLS configuration with `rejectUnauthorized: false` for self-signed certificates
  - Enhanced error logging (DEV mode only) with SMTP response details
  - Updated SMTP configuration for Zimbra (mail.zimbra.de)
  - Proper error messages returned to frontend

### Changed
- **Rate Limiting**: Reduced from 5 to 3 requests per IP per 5 minutes
- **Frontend Validation**: Reduced message minimum length from 10 to 5 characters
- **Error Messages**: Improved user-friendly error messages
  - "Bitte geben Sie Ihren Namen ein."
  - "Bitte geben Sie eine gültige E-Mail-Adresse an."
  - "Ihre Nachricht ist zu kurz."
- **Success Message**: Updated to "Ihre Nachricht wurde erfolgreich versendet. Vielen Dank!"

### Added
- **Enhanced UX**: Improved contact form user experience
  - Loading spinner animation during submission
  - Button color changes: Green on success, Red on error
  - Success/Error alerts visible for 5 seconds
  - Better visual feedback for all states
- **CAPTCHA Placeholder**: Added `ENABLE_CAPTCHA=false` environment variable
- **Environment Configuration**: Updated `.env.example` with Zimbra settings

### Security
- Fallback error handling with user-friendly messages
- Enhanced logging for debugging without exposing sensitive data in production
- Server errors provide helpful guidance to contact support directly

### Notes
- Compatible with Zimbra SMTP (mail.zimbra.de)
- Requires `.env.local` with proper SMTP credentials for production
- All environment variables must be configured in Vercel Dashboard

## [1.3.5] - 2025-01-10 - Secure Contact Mailer

### Added
- **SMTP Mailer Integration**: Implemented real email sending using Nodemailer
  - Server-side validation with Zod schema (name, email, message)
  - Input sanitization to prevent injection attacks
  - Configurable SMTP settings via environment variables
  - Email sent to info@evervibestudios.com
- **Anti-Spam Protection**:
  - Honeypot field to catch bots (hidden "company" field)
  - Minimum fill-time protection (3 seconds) to prevent automated submissions
  - Best-effort rate limiting (5 requests per 5 minutes per IP)
  - All bot detection methods silently succeed to avoid revealing protection
- **API Route**: New `/api/contact` endpoint
  - POST request handling with error management
  - Environment-based SMTP configuration
  - Proper HTTP status codes and responses
- **Environment Configuration**:
  - `.env.example` file with SMTP configuration placeholders
  - Secure environment variables (no NEXT_PUBLIC_* usage)

### Changed
- **Contact Form Component**: Enhanced with real API integration
  - Timestamp tracking on form mount
  - Hidden honeypot field with proper accessibility attributes
  - Async form submission with loading state
  - Better error handling and user feedback
  - "Wird gesendet..." state during submission
- **Privacy Policy**: Updated Kontaktformular section
  - Clarified that data is sent via email to info@evervibestudios.com
  - Emphasized no additional storage or tracking
  - Confirmed no cookie usage in contact form

### Dependencies
- **Added**: `nodemailer@^6.9.x` - SMTP email sending
- **Added**: `@types/nodemailer@^6.4.x` - TypeScript types for Nodemailer

### Security
- Server-side validation prevents malformed submissions
- Input sanitization protects against XSS attacks
- Rate limiting prevents abuse
- Honeypot and timing checks block automated bots
- Environment variables keep credentials secure

### QA Results
- ✅ Build successful with no errors
- ✅ Lint passes without warnings
- ✅ TypeScript type checks passed
- ✅ API route properly configured
- ✅ Contact form integrates with API
- ✅ Anti-spam measures in place
- ✅ Privacy policy updated

### Notes
- Requires `.env.local` file with SMTP credentials for production
- Contact form now sends real emails when SMTP is configured
- Silent bot detection ensures attackers cannot identify protection measures
- DSGVO-compliant: no cookies, no tracking, transparent data usage

## [1.3.4] - 2025-01-10 - Unified Email & Branding Final

### Changed
- **Email Unification**: Replaced all remaining instances of old email addresses with unified contact address
  - Updated Contact.tsx: contact@evs-solutions.com → info@evervibestudios.com
  - Updated app/cookie/page.tsx: contact@evs-solutions.com → info@evervibestudios.com
- **Branding Verification**: Confirmed complete removal of "Solutions" references from all code files
  - Only "EverVibe Studios" branding remains in production code
  - Historical references preserved in documentation and changelogs only

### QA Results
- ✅ No instances of contact@evs-solutions.com in source code
- ✅ No instances of contact@evervibestudios.com in source code
- ✅ Only unified email info@evervibestudios.com throughout
- ✅ Branding consistent: "EverVibe Studios" across all files
- ✅ Footer displays correct email with mailto link
- ✅ Legal pages (Impressum) have correct contact information
- ✅ OpenGraph and metadata verified in layout.tsx

### Notes
- This release finalizes the email and branding unification strategy
- Single contact point: info@evervibestudios.com
- All customer-facing content now uses consistent branding

## [1.3.2] - 2025-01-10 - Analytics Integration & Legal Compliance

### Added
- **Vercel Analytics Integration**: Fully integrated @vercel/analytics package
  - Added Analytics component to root layout
  - Production-only activation via environment check
  - DSGVO-compliant, cookieless tracking
  - Zero-config setup for immediate data collection
- **Legal Compliance**: Updated privacy policy (Datenschutzerklärung)
  - Added comprehensive Vercel Analytics section
  - Documented cookieless, GDPR-compliant data collection
  - Included link to Vercel's privacy policy documentation

### Changed
- **Dependencies**: Added @vercel/analytics@1.5.0
- **Privacy Page**: Enhanced with new "Web Analytics (Vercel)" section
  - Explains cookieless tracking mechanism
  - Clarifies no personal data storage
  - Links to official Vercel Analytics privacy documentation

### Technical Details
- Analytics component only loads in production environment
- No cookies required - fully DSGVO/GDPR compliant
- No configuration needed - auto-detects Vercel deployment
- Zero performance impact on development builds
- Build size impact: minimal (Analytics loads asynchronously)

### QA Results
- ✅ Build successful with no errors
- ✅ Lint passes without warnings
- ✅ TypeScript type checks passed
- ✅ Analytics component conditionally rendered
- ✅ Privacy policy updated and accessible
- ✅ No breaking changes to existing functionality

### Notes
- No cookie banner required (cookieless tracking)
- Analytics data visible in Vercel Dashboard post-deployment
- Legal compliance maintained for German market (DSGVO)
- Ready for production deployment

## [1.3.1] - 2025-10-07 - Darkmode Functional Fix & Stability Release

### Fixed
- **Tailwind CSS 4 Dark Mode Configuration**: Added explicit `tailwind.config.ts` with `darkMode: "class"` setting
  - Ensures class-based dark mode works correctly with Tailwind CSS 4.1.14
  - Referenced config in `globals.css` via `@config` directive
- **Dark Mode Persistence**: Verified localStorage persistence across page reloads
- **FOUC Prevention**: Confirmed inline script in layout.tsx prevents flash of unstyled content

### Technical Details
- Created `tailwind.config.ts` with proper Tailwind CSS 4 configuration
- Updated `app/globals.css` to reference the config file
- All existing dark mode functionality (useTheme hook, DarkModeToggle component, layout script) working correctly
- No breaking changes to existing codebase
- Build passes successfully with no TypeScript errors or lint warnings

### QA Results
- ✅ Dark mode toggle switches theme correctly (🌙 ↔ ☀️)
- ✅ Theme persists across page reloads via localStorage
- ✅ FOUC prevention script works correctly
- ✅ All components render correctly in both light and dark themes
- ✅ No hydration mismatches
- ✅ Build successful, no errors

### Notes
- This is a stability and configuration fix release
- All v1.3.0 features remain unchanged
- Tailwind CSS 4 requires explicit darkMode configuration in config file
- Next target: v1.4.0 (Performance & Analytics)

## [1.3.0] - 2025-01-08 - Final Master Release

### Added
- **Global Theme Hook**: Created `hooks/useTheme.ts` for centralized dark mode management
  - localStorage persistence with "theme" key
  - System preference detection with `prefers-color-scheme`
  - Automatic system theme change listener
  - Returns mounted state to prevent hydration mismatches
- **FOUC/FOW Prevention**: Inline script in `layout.tsx` to prevent flash of unstyled content
  - Runs before React hydration
  - Checks localStorage and system preference
  - Applies dark class immediately
- **AI Automation Infrastructure**:
  - `AGENTS.md` - Agent role, scope, version history, and development guidelines
  - `COPILOT-INSTRUCTIONS.md` - Operational instructions for GitHub Copilot
  - `docs/agent_logs/2025-01-08/FRONTEND_V1.3.0_FINAL.md` - Complete release documentation

### Changed
- **Branding Consistency**: Final sweep to ensure all "EverVibe Solutions" → "EverVibe Studios"
  - Updated About section tagline
  - Updated OpenGraph image content and alt text
  - Subtitle now reads "Premium Next.js Landing Page Template"
- **SEO Metadata Enhancements**:
  - Added `og:url` to OpenGraph metadata
  - Changed OG image reference from `/og-v1-2.png` to `/og.png`
  - Verified `metadataBase` and `lang="de"` settings
- **Dark Mode Refactor**:
  - `DarkModeToggle.tsx` now uses centralized `useTheme` hook
  - Reduced component complexity (50 → 25 lines)
  - Eliminated duplicate theme logic
  - Storage key unified to "theme" (was "darkMode")
- **Layout Improvements**:
  - Added semantic color classes to body: `bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`
  - Improved dark mode color consistency across components
- **Package Version**: Updated from 1.2.0 to 1.3.0

### Technical Details
- **New Dependencies**: None (all features implemented with existing stack)
- **Performance**: No performance regression, build size unchanged
- **Compatibility**: 
  - Dark mode now uses "theme" localStorage key for better semantics
  - Previous "darkMode" key users will default to system preference (one-time reset)
  - All other features maintain backward compatibility
- **Build Status**: ✅ All builds pass, no TypeScript errors, lint clean

### Notes
- This is the "Final Master" release - production-ready for public deployment
- OG image file (`/public/og.png`) should be created with design tools
- AI automation structure enables autonomous development for future versions
- Next target: v1.4.0 (Performance & Analytics)

## [1.2.0] - 2025-01-08 - Feature Expansion & UX Upgrade

### Added
- **Dark Mode Toggle**: 
  - System preference detection with manual override
  - Persistent state via localStorage
  - Integrated in Header for desktop and mobile
  - Smooth transition between light and dark themes
- **Testimonials Component**:
  - 3 neutral German customer testimonials
  - Animated with Framer Motion fade-ins
  - 5-star rating display
  - Positioned between Features and Contact sections
- **Enhanced Contact Form**:
  - Real-time validation with Zod schema
  - Field-specific error messages
  - DSGVO-compliant checkbox with link to privacy policy
  - Success and error state displays
  - Improved user feedback
- **Scroll-to-Top Button**:
  - Appears after 600px scroll
  - Smooth scroll animation
  - Gradient styling with hover effects
  - Fixed position in bottom-right corner
- **Framer Motion Animations**:
  - Hero section: Staggered fade-in animations for headings and CTAs
  - Features section: Grid animations with hover effects
  - Testimonials section: Staggered card animations
  - Improved overall visual polish
- **Updated Documentation**:
  - Expanded Datenschutz with contact form data processing details
  - Added data types, purposes, storage duration, and withdrawal rights

### Changed
- **Footer Social Links**: Updated to actual EverVibe Studios social media profiles
  - Instagram: https://www.instagram.com/evervibestudios
  - LinkedIn: https://www.linkedin.com/company/evervibe-studios
  - GitHub: https://github.com/evervibe
  - Added hover animations with gradient effects
- **SEO Metadata**:
  - Updated title: "EVS - Premium Next.js Landing Page Template"
  - Enhanced description emphasizing premium features and German market
  - Added new OG image reference (og-v1-2.png)
- **Sitemap**: Added testimonials section reference
- **Button States**: Improved hover and active states across all CTAs
  - Added scale effects (hover: 1.05, active: 0.95)
  - Better visual feedback on interactions
- **Package Version**: Updated from 1.1.0 to 1.2.0

### Technical Details
- **New Dependencies**:
  - framer-motion: ^11.x - Animation library
  - zod: ^3.x - TypeScript-first schema validation
- **Performance**: 
  - Build size increased slightly (55.6 kB main bundle) due to animations
  - No breaking changes to existing functionality
  - All TypeScript checks pass
  - Lint passes without warnings
- **Compatibility**: 
  - Maintains backward compatibility with v1.1.0
  - Dark mode respects system preferences as default
  - Works on all modern browsers

### Notes
- OG image (og-v1-2.png) needs to be created with design tools
- Contact form still uses dummy submission (no backend)
- All animations respect reduced motion preferences
- Dark mode state persists across sessions
- Template remains production-ready for German market

## [1.1.0] - 2025-01-07

### Added
- **Repository Metadata**: Complete package.json with repository, homepage, bugs, author, license, and engines fields
- **Enhanced Documentation**: 
  - Updated README with EVS Basic Web branding and comprehensive deployment guide
  - Added Vercel deployment instructions with root directory configuration
  - Added legal disclaimer about placeholder content
  - Expanded license & usage section with EVS Proprietary License details
- **Accessibility Improvements**:
  - Added `aria-label="Hauptnavigation"` to main navigation element in Header
  - Verified semantic HTML structure with proper `<main>` tag usage
- **Real Company Data Integration**:
  - Updated all legal pages (Impressum, Datenschutz, AGB, Cookie) with real EVS Studios data
  - Company: EverVibe Studios (Einzelunternehmen)
  - Owner: Nenad Trujanovic
  - Address: Stresemannstraße 131, 22769 Hamburg, Deutschland
  - Contact: info@evervibestudios.com

### Changed
- **Branding Update**: Changed from "EverVibe Solutions" to "EverVibe Studios" across all files
- **Email Update**: Updated contact email from contact@evs-solutions.com to info@evervibestudios.com
- **Version Bump**: Package version from 1.0.1 to 1.1.0
- **Legal Pages**: Streamlined legal pages with real data, removed placeholder registry and VAT information
- **Footer**: Added direct mailto link for contact in footer
- **LICENSE**: Updated with real EVS Studios contact information

### Technical Details
- No breaking changes
- All changes maintain backward compatibility
- SEO and metadata remain optimized
- Build and deployment processes unchanged
- Node.js requirement: >=18 (now explicitly specified in package.json)

### Notes
- This is the official public release version
- Legal pages still contain some template text that should be customized for specific use cases
- Template is production-ready for German market
- Ready for Vercel deployment with root directory set to `frontend`

## [1.0.1] - 2025-01-06

### Added
- **German Localization**: Complete translation of all UI components and content to German
  - Hero section with German CTAs and feature pills
  - Header navigation in German
  - About section with German content
  - Features section with German descriptions
  - Contact form with German labels and messages
  - Footer with German text and navigation
- **Legal Pages** (all in German with placeholder content):
  - `/impressum` - Imprint page compliant with § 5 TMG
  - `/datenschutz` - Privacy policy compliant with GDPR/DSGVO
  - `/agb` - Terms of Service (Allgemeine Geschäftsbedingungen)
  - `/cookie` - Cookie policy with detailed information
- **Error Pages**:
  - Custom German 404 page (`not-found.tsx`)
  - Custom German error page (`error.tsx`) with retry functionality
- **Domain Update**: Changed metadataBase to `https://basic.evervibestudios.com`
- Updated sitemap to include all legal pages
- Updated robots.txt with new domain

### Changed
- Language attribute in HTML changed from `en` to `de`
- All metadata and Open Graph descriptions translated to German
- Contact phone number updated to German format (+49)
- Footer copyright and tech stack text in German
- Navigation labels translated (Home → Start, About → Über uns, Features → Funktionen, Contact → Kontakt)
- README.md fully translated to German with expanded legal pages documentation
- Package version bumped to 1.0.1

### Technical Details
- No breaking changes to code structure or dependencies
- All legal pages follow same design system as main site
- Error pages include proper error handling and logging
- Legal pages are fully responsive and accessible
- Sitemap includes all new routes with appropriate priorities

### Notes
- Legal page content contains placeholder text that should be customized
- Website is production-ready for German market
- All internal links updated to prevent 404 errors
- Domain can be easily changed by updating 3 files (layout.tsx, sitemap.ts, robots.txt)

## [1.0.0] - 2025-01-06

### Added
- Initial release of EVS Frontend Landing Page
- Next.js 15 with App Router architecture
- React 19 with TypeScript strict mode
- Tailwind CSS 4 for styling
- Complete landing page with sections:
  - Responsive Header with mobile menu
  - Hero section with animated gradients and CTAs
  - About section showcasing company values
  - Features section with 6 key features
  - Contact form with dummy submission handler
  - Footer with legal placeholders and social links
- SEO optimization:
  - Meta tags for title and description
  - Open Graph tags for social sharing
  - Dynamic OG image generation
  - Sitemap.xml generation
  - robots.txt configuration
- ESLint configuration with Next.js best practices
- Prettier code formatting setup
- EVS Custom License v1.0
- Production-ready build configuration
- Full responsive design (mobile, tablet, desktop)
- Smooth scroll navigation
- Dark mode support
- Animations and transitions throughout

### Technical Details
- Framework: Next.js 15.5.4
- React: 19.1.0
- TypeScript: 5.x with strict mode enabled
- Tailwind CSS: 4.x
- Build target: Static export ready
- No external dependencies for fonts (using system fonts)

### Development
- Development server: `npm run dev`
- Production build: `npm run build`
- Linting: `npm run lint`
- Formatting: `npm run format`

### Notes
- Backend folder exists but is ignored per project requirements
- All features are frontend-only with no backend integration
- Contact form is dummy implementation for demonstration
- Ready for deployment to Vercel or similar platforms
