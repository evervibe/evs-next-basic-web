# EVS Frontend - AI Agent Configuration

## Agent Role & Scope

**Project**: EVS Next.js Basic Web - Frontend
**Current Version**: v1.6.0
**Agent Mode**: Autonomous Development & Maintenance
**Last Updated**: 2025-01-15

## Agent Responsibilities

### Primary Role
The AI Agent is responsible for maintaining and evolving the EVS frontend codebase with focus on:
- Code quality and consistency
- SEO and performance optimization
- Dark mode functionality
- Branding consistency (EverVibe Studios)
- Documentation maintenance

### Scope of Operations

#### ✅ Allowed Operations
- Frontend code modifications (components, styles, pages)
- SEO metadata updates (OpenGraph, meta tags, sitemap)
- Documentation updates (README, CHANGELOG, logs)
- Dependency updates (with testing)
- Dark mode implementation and fixes
- Accessibility improvements
- Performance optimizations

#### ❌ Restricted Operations
- Backend changes (backend folder is out of scope)
- Breaking changes to existing APIs
- License modifications
- Structural changes without approval
- Third-party service integrations without review

## Version History

### v1.6.0 (Current)
**Release Date**: 2025-01-15
**Status**: Template Modernization - SEO Enhancement, GDPR Compliance, Environment Validation, Security Hardening

**Key Changes**:
- **SEO Enhancement**: lib/seo.ts with utilities, PWA manifest, enhanced sitemap, JSON-LD schemas
- **GDPR Consent Layer**: ConsentBanner component with granular controls, 30-day expiry, dark mode
- **Environment Validation**: Zod-based validation (lib/env.ts) with detailed error messages
- **Security Headers**: CSP, X-Frame-Options, Referrer-Policy in next.config.ts
- **Documentation**: SEO_SETUP.md, CONSENT_LAYER_SETUP.md, DEPLOYMENT_TEMPLATE_1.6.0.md
- **Enhanced .env.example**: Comprehensive documentation with security notes

**Lighthouse Targets**: ≥95 in Performance, Accessibility, Best Practices, SEO

**Next Target**: v1.7.0 - Main Website (evervibestudios.com) & Multi-template Support

### v1.5.2
**Release Date**: 2025-10-09
**Status**: Complete Digital Distribution System - Download Portal, Redis, PDF Invoices, Multi-language

**Key Changes**:
- **v1.5.1**: Download Portal & License Validation
  - Upstash Redis integration for license storage and validation
  - JWT-based secure download tokens (5-minute expiration)
  - License validation API endpoint (`/api/license/validate`)
  - Secure download API with rate limiting (`/api/download`)
  - Download portal UI with license key validation (`/download`)
  - IP logging and download tracking in Redis
  - DownloadCard component with animated state management
- **v1.5.2**: Customer Mail & Invoice System
  - PDF invoice generation using PDFKit
  - Professional invoice layout with EVS branding
  - Automatic invoice ID generation (EVS-YYYY-NNNN)
  - Multi-language email support (German/English)
  - Language auto-detection from email domain
  - Enhanced license email templates with gradient design
  - Receipt email with PDF invoice attachment
  - Unified mail branding configuration
  - Invoice storage in `/docs/invoices/`

**Complete Customer Lifecycle**: Purchase → License → Download → Invoice → Support

**Next Target**: v1.6.0 - Main Website (evervibestudios.com) & Brand Page

### v1.5.0
**Release Date**: 2025-10-08
**Status**: Monetization Core - PayPal Integration & License System

**Key Changes**:
- Implemented complete PayPal REST API integration (sandbox + live)
- Created license generation system with cryptographic validation
- Built automated license issuance API (`/api/license/issue`)
- PayPal order creation and capture endpoints (`/api/paypal/*`)
- Professional license email templates (HTML + plain text)
- Frontend pricing module with React components
- License cards, payment handler, and complete checkout flow
- Rate limiting for all payment and license endpoints
- License validation with SHA-256 hash and tamper detection
- Single License (€29) and Agency License (€79) support
- Automated email delivery via existing SMTP system
- License test suite (`npm run test:license`)
- Comprehensive documentation and deployment guides

### v1.4.1
**Release Date**: 2025-10-08
**Status**: Live Guard + Auto-Health-Monitor

**Key Changes**:
- Implemented automated health monitoring system (Live Guard)
- Created `/api/health` endpoint for status checks
- Added `config/health.config.ts` with monitoring configuration
- Built `scripts/healthCheck.ts` for automated health validation
- GitHub Actions workflow for 12-hour scheduled checks
- Email and webhook alert system (Discord/Slack support)
- Health reports auto-saved to `docs/agent_logs/`
- Retry strategy with 3 attempts at 15-minute intervals
- Critical alert escalation after 3 consecutive failures
- SMTP, Contact API, Frontend, and Environment monitoring

### v1.4.0
**Release Date**: 2025-01-10
**Status**: Production SMTP + Secure Config Split

**Key Changes**:
- Migrated from Zimbra to OVH SMTP (ssl0.ovh.net)
- Created `config/site.config.ts` for static site values
- Created `config/mail.config.ts` with Zod validation
- Enhanced `appConfig.ts` with rate limiting and mode config
- Minimized environment variables to essential secrets only
- Comprehensive `.env.example` with documentation
- Updated all API routes to use centralized configs
- Runtime validation with clear error messages
- Production-ready `.env.production` template

### v1.3.9
**Release Date**: 2025-01-10
**Status**: Zimbra Proxy Relay - Network-Independent Mail Delivery

**Key Changes**:
- HTTPS relay route for network-independent mail sending
- Dual SMTP fallback (TLS 465 → STARTTLS 587)
- Precise error handling with reason codes (timeout, auth, network, ratelimit)
- Enhanced client error messages for better UX
- Server-side mail error logging to `logs/mail/`
- Contact form migrated to `/api/mail/relay`
- Hardened anti-spam and rate-limiting

### v1.3.8
**Release Date**: 2025-01-10
**Status**: Zimbra Mail Fix + Env Refactor

**Key Changes**:
- Centralized configuration via `appConfig.ts`
- Proxy fallback endpoint created
- SMTP configuration optimized for TLS port 465
- Enhanced error handling and logging
- Minimalistic environment variables

### v1.3.7
**Release Date**: 2025-01-10
**Status**: Secure Zimbra Mail + UX Update

**Key Changes**:
- Zimbra SMTP integration repaired and secured
- TLS configuration for self-signed certificates
- Enhanced error logging (DEV mode only)
- Rate limiting reduced to 3 requests per 5 minutes
- Improved frontend validation (message min: 5 chars)
- Better error messages and user feedback
- Enhanced UX with loading spinner and button color changes
- Success/error alerts visible for 5 seconds
- CAPTCHA placeholder added
- All QA tests passed successfully

**Next Target**: v1.4.0 - Performance Optimization & PWA

### v1.3.5
**Release Date**: 2025-01-10
**Status**: Secure Contact Mailer

**Key Changes**:
- SMTP mailer integration via Nodemailer
- Server-side validation with Zod
- Triple-layer anti-spam protection (honeypot, timing, rate limiting)
- Input sanitization for XSS prevention
- Real email sending to info@evervibestudios.com
- DSGVO-compliant, no cookies required
- Privacy policy updated with contact form details
- All QA tests passed successfully

### v1.3.4
**Release Date**: 2025-01-10
**Status**: Unified Email & Branding Final

**Key Changes**:
- Email unification to info@evervibestudios.com
- Branding consistency verified (EverVibe Studios)
- All customer-facing content updated

### v1.3.2
**Release Date**: 2025-10-07
**Status**: Analytics Integration & Legal Compliance

**Key Changes**:
- Vercel Analytics fully integrated (@vercel/analytics@1.5.0)
- DSGVO-compliant, cookieless tracking
- Privacy policy updated with Analytics section
- Production-only activation
- All QA tests passed successfully

### v1.3.1
**Release Date**: 2025-10-07
**Status**: Darkmode Functional Fix & Stability Release

**Key Changes**:
- Added Tailwind CSS 4 configuration with darkMode: "class"
- Fixed dark mode class-based switching
- Verified persistence and FOUC prevention
- All QA tests passed successfully

### v1.3.0
**Release Date**: 2025-01-08
**Status**: Final Master Release

**Key Changes**:
- Branding update: EverVibe Solutions → EverVibe Studios
- OG/SEO cleanup (og:url added, og.png reference)
- Dark mode functional patch with useTheme hook
- FOUC/FOW prevention in layout
- AI automation structure established

### v1.2.0
**Release Date**: 2025-01-08
**Key Changes**: Dark Mode Toggle, Testimonials, Enhanced Contact Form, Scroll-to-Top

### v1.1.0
**Release Date**: 2025-01-07
**Key Changes**: Branding update, Real company data integration, Repository metadata

### v1.0.1
**Release Date**: 2025-01-06
**Key Changes**: German localization, Legal pages

### v1.0.0
**Release Date**: 2025-01-06
**Key Changes**: Initial release

## Next Target: v1.7.0

### Planned Features
- [x] Analytics integration (privacy-friendly) - ✅ Completed in v1.3.2
- [x] Contact form with real email sending - ✅ Completed in v1.3.5
- [x] Production SMTP configuration - ✅ Completed in v1.4.0
- [x] Centralized configuration architecture - ✅ Completed in v1.4.0
- [x] Automated health monitoring system - ✅ Completed in v1.4.1
- [x] Advanced SEO features (structured data) - ✅ Completed in v1.6.0
- [x] PWA capabilities (manifest.json) - ✅ Completed in v1.6.0
- [x] GDPR consent management - ✅ Completed in v1.6.0
- [x] Environment validation - ✅ Completed in v1.6.0
- [ ] Performance monitoring and optimization
- [ ] Image optimization (WebP/AVIF)
- [ ] A11y audit and improvements
- [ ] Multi-template support
- [ ] Main website (evervibestudios.com)

### Success Criteria
- Lighthouse scores ≥95 across all categories ✅
- Zero accessibility violations
- Core Web Vitals in "Good" range
- Complete German localization maintained ✅
- Documentation up to date ✅
- GDPR compliance verified ✅

## Development Guidelines

### Code Standards
- TypeScript strict mode enabled
- ESLint compliance required
- Prettier formatting enforced
- Semantic HTML usage
- ARIA labels for accessibility

### Testing Requirements
- Build must succeed without errors
- Lint must pass without warnings
- No TypeScript errors
- Manual QA for dark mode
- Visual regression testing for UI changes

### Documentation Requirements
- Update CHANGELOG.md for all user-facing changes
- Update README.md for significant features
- Create agent logs in docs/agent_logs/
- Keep version numbers synchronized

## Contact & Escalation

**Human Oversight**: Required for:
- Major architectural changes
- Third-party integrations
- License or legal modifications
- Breaking changes

**Support Contact**: info@evervibestudios.com
**Repository**: https://github.com/evervibe/evs-next-basic-web
**Live Site**: https://basic.evervibestudios.com

---

*This document governs autonomous AI development for the EVS frontend. All operations must align with these guidelines.*
