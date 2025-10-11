# Changelog

All notable changes to the EVS Frontend project will be documented in this file.

## [1.6.3] - 2025-01-10

### 🔧 Build Stability - Lazy ENV Validation

**Major Changes:**

#### Added
- ✨ **Lazy ENV Validation** - Build succeeds regardless of missing environment variables
- ✨ **Runtime Validation Helpers** - `requirePayPalConfig()`, `requireSMTPConfig()`, `requireRedisConfig()`, `requireLicenseConfig()`
- ✨ **Configuration Checks** - Non-throwing check functions for all integrations
- ✨ **Graceful Degradation** - APIs return 503 Service Unavailable when services not configured
- ✨ **ENV Documentation** - Comprehensive ENV_VALIDATION_REPORT.md with variable matrix
- ✨ **Build Test Report** - BUILD_STABILITY_TEST.md with platform-specific test results

#### Changed
- 🔄 **lib/env.ts** - All critical variables now optional for build with safe defaults
- 🔄 **config/paypal.config.ts** - Lazy loading with getter-based configuration
- 🔄 **config/mail.config.ts** - Lazy loading with runtime validation
- 🔄 **config/license.config.ts** - Lazy loading with runtime validation
- 🔄 **lib/db.ts** - Lazy Redis client initialization
- 🔄 **API Routes** - Runtime checks for configuration availability
  - `/api/contact` - Returns 503 if SMTP not configured
  - `/api/mail/relay` - Returns 503 if SMTP not configured
  - `/api/paypal/create-order` - Returns 503 if PayPal not configured
  - `/api/paypal/capture-order` - Returns 503 if PayPal not configured
  - `/api/license/issue` - Returns 503 if license system or SMTP not configured
- 🔄 **.env.example** - Updated with clear dummy values and optional markers

#### Benefits
- ✅ **Vercel Builds** - Succeed without environment configuration
- ✅ **Render Builds** - No configuration errors during build
- ✅ **Local Development** - Quick setup without credentials
- ✅ **CI/CD** - No secrets needed for build phase
- ✅ **Security** - Credentials only needed at runtime, not build time
- ✅ **Backward Compatible** - Existing production setups work unchanged

#### Technical Details
- No `throw` statements during module initialization
- Validation only occurs when features are actually used
- Clear error messages with 503 status codes
- Type-safe configuration with getter properties
- Zero bundle size overhead

#### Documentation
- 📝 **ENV_VALIDATION_REPORT.md** - Complete variable reference with defaults
- 📝 **BUILD_STABILITY_TEST.md** - Platform test results (Vercel, Render, Local)
- 📝 **.env.example** - Updated with build stability notes

---

## [1.5.0] - 2025-10-08

### 💰 Monetization Core - PayPal Integration & License System

**Major Changes:**

#### Added
- ✨ **PayPal Integration** - Complete PayPal REST API integration (sandbox + live)
- ✨ **License System** - Cryptographic license generation with SHA-256 validation
- ✨ **License API** - Automated license issuance endpoint `/api/license/issue`
- ✨ **Payment Endpoints** - PayPal order creation and capture (`/api/paypal/*`)
- ✨ **Email Templates** - Professional license delivery emails (HTML + plain text)
- ✨ **Pricing Module** - Complete frontend checkout flow with React components
- ✨ **License Cards** - Responsive pricing cards with dark mode support
- ✨ **Payment Handler** - PayPal SDK integration wrapper
- ✨ **Security** - Rate limiting and tamper detection for all payment endpoints
- ✨ **Test Suite** - Comprehensive license system tests (`npm run test:license`)

#### License Features
- 🔑 **License Types** - Single License (€29) and Agency License (€79)
- 🔑 **License Format** - `EVS-XXXX-XXXX-XXXX` with UUID generation
- 🔑 **Validation** - SHA-256 hash with tamper detection
- 🔑 **Email Delivery** - Automatic sending via SMTP after purchase
- 🔑 **Download Links** - Embedded in license emails
- 🔑 **Support** - 6 months included with all licenses

#### PayPal Integration
- 💳 **Create Order** - `/api/paypal/create-order` endpoint
- 💳 **Capture Order** - `/api/paypal/capture-order` endpoint
- 💳 **Currency** - EUR support
- 💳 **Digital Goods** - Proper categorization for templates
- 💳 **Custom Data** - License type and email in order metadata
- 💳 **Environment** - Sandbox and live mode support

#### Frontend Components
- 🎨 **PricingSection** - Main pricing page with complete UX flow
- 🎨 **LicenseCard** - Individual license card component
- 🎨 **PaymentHandler** - PayPal SDK integration
- 🎨 **Animations** - Framer Motion for smooth transitions
- 🎨 **Dark Mode** - Full dark mode support
- 🎨 **Responsive** - Mobile-first responsive design

#### Configuration
- ⚙️ **license.config.ts** - License system configuration
- ⚙️ **paypal.config.ts** - PayPal API configuration
- ⚙️ **Environment Variables** - New PayPal and license variables in `.env.example`

#### Security
- 🔒 **Rate Limiting** - All payment endpoints protected
- 🔒 **Hash Validation** - SHA-256 with salt for license integrity
- 🔒 **Input Validation** - Zod schemas for all API inputs
- 🔒 **Email Validation** - Format and structure checks
- 🔒 **Tamper Detection** - Automatic hash mismatch detection

#### Documentation
- 📝 **Comprehensive Guide** - `docs/agent_logs/2025-10-08/FRONTEND_V1.5.0_MONETIZATION.md`
- 📝 **API Examples** - Request/response examples for all endpoints
- 📝 **Email Previews** - License email format documentation
- 📝 **Deployment Guide** - Step-by-step Vercel setup
- 📝 **Testing Guide** - How to use sandbox mode

### Configuration

**New Environment Variables:**
```env
# PayPal Configuration
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_MODE=sandbox|live
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id

# License Configuration
LICENSE_SALT=your_secure_random_salt
LICENSE_EMAIL_SENDER=info@evervibestudios.com
LICENSE_SINGLE_PRICE=29.00
LICENSE_AGENCY_PRICE=79.00
```

### Dependencies

**Added:**
- `@paypal/paypal-server-sdk` - PayPal REST API client
- `jsonwebtoken` - JWT token signing
- `uuid` - Unique ID generation
- `@types/jsonwebtoken` - TypeScript types
- `@types/uuid` - TypeScript types

### Testing

```bash
# Run license system tests
npm run test:license

# Build with new features
npm run build

# Lint check
npm run lint
```

**Results:** ✅ All tests passed

---

## [1.4.1] - 2025-10-08

### 🔍 Live Guard + Auto-Health-Monitor

**Major Changes:**

#### Added
- ✨ **Health Monitoring System** - Automated health checks for SMTP, APIs, and environment
- ✨ **Health API Endpoint** - New `/api/health` endpoint for status monitoring
- ✨ **Health Configuration** - Created `config/health.config.ts` with monitoring settings
- ✨ **Health Check Script** - Automated script `scripts/healthCheck.ts` for Live Guard
- ✨ **GitHub Actions Workflow** - Scheduled health checks every 12 hours
- ✨ **Alert System** - Email and webhook alerts (Discord/Slack) on failures
- ✨ **Health Reports** - Markdown logs saved to `docs/agent_logs/`
- ✨ **Retry Strategy** - Automatic retry on failures (3 attempts, 15-minute intervals)
- ✨ **Critical Alerts** - Escalation after 3 consecutive failures

#### Health Check Features
- 🔍 **SMTP Monitoring** - Verifies mail server authentication
- 🔍 **Contact API Check** - Tests `/api/contact` endpoint availability
- 🔍 **Frontend Reachability** - Pings `/api/health` endpoint
- 🔍 **Environment Validation** - Checks required environment variables
- 🔍 **Performance Metrics** - Response times for all checks

#### Alert Capabilities
- 📧 **Email Alerts** - Sent to `info@evervibestudios.com` on failures
- 🔔 **Discord Webhook** - Optional Discord notifications
- 🔔 **Slack Webhook** - Optional Slack notifications
- 📊 **Detailed Reports** - Health status with timestamps and durations

#### Documentation
- 📝 **Updated Scripts README** - Added health check documentation
- 📝 **Environment Variables** - Added optional webhook configurations
- 📝 **Health Reports** - Auto-generated logs in `docs/agent_logs/`

### Configuration

**New Config Files:**

**`config/health.config.ts`:**
```typescript
export const healthConfig = {
  schedule: "0 */12 * * *", // Every 12 hours
  endpoints: {
    api: "https://basic.evervibestudios.com/api/health",
    contact: "https://basic.evervibestudios.com/api/contact",
  },
  email: "info@evervibestudios.com",
  retry: {
    maxAttempts: 3,
    intervalMinutes: 15,
  },
  alerts: {
    consecutiveFailuresForCritical: 3,
  },
};
```

**New Environment Variables (Optional):**
- `DISCORD_WEBHOOK_URL` - Discord webhook for health alerts
- `SLACK_WEBHOOK_URL` - Slack webhook for health alerts

### Usage

**Run Health Check Manually:**
```bash
cd frontend
npx tsx scripts/healthCheck.ts
```

**Automated via GitHub Actions:**
- Runs every 12 hours (00:00 and 12:00 UTC)
- Manual trigger available via GitHub Actions UI
- Auto-commits health reports to repository

### Health Report Example

```markdown
# EVS Live Health Report – 2025-10-08

✅ SMTP Connection: Connected to ssl0.ovh.net:465 (0.85 s)
✅ Contact API: Responded 200 (0.73 s)
✅ Frontend Health: Online (evs-frontend) (0.42 s)
✅ Env Consistency: 100%

**Overall Status**: HEALTHY
**Last run**: 2025-10-08 09:00:00 CET
**Next run**: 2025-10-08 21:00:00 CET
```

### Technical Details
- **Scheduling**: Cron-based via GitHub Actions
- **Logging**: Markdown reports in `docs/agent_logs/`
- **Error Handling**: Graceful degradation with detailed error messages
- **Retry Logic**: Exponential backoff for transient failures
- **Alert Threshold**: Critical after 3 consecutive failures

---

## [1.4.0] - 2025-01-10

### 🎯 Production SMTP + Secure Config Split

**Major Changes:**

#### Added
- ✨ **New Config Architecture** - Created `config/site.config.ts` for static site values
- ✨ **Validated Mail Config** - Created `config/mail.config.ts` with Zod schema validation
- ✨ **Production Environment** - Added `.env.production` for OVH SMTP configuration
- ✨ **Comprehensive Documentation** - Enhanced `.env.example` with detailed comments
- ✨ **Runtime Validation** - SMTP configuration validated at startup with clear error messages
- ✨ **Security Configuration** - New env vars for rate limiting and debug settings

#### Changed
- 🔧 **SMTP Provider** - Migrated from Zimbra (`mail.zimbra.de`) to OVH (`ssl0.ovh.net`)
- 🔧 **Config Structure** - All API routes now use centralized `mailConfig` and `siteConfig`
- 🔧 **Environment Variables** - Minimized to essential secrets only
- 🔧 **App Config** - Enhanced with mode, security, and rate limiting options
- 🔧 **Test Mailer** - Updated to use validated config with better error messages
- 🔧 **Env Variable Naming** - `ENABLE_SMTP_LOGS` → `ENABLE_SMTP_LOGGING`

#### Improved
- 🎨 **Type Safety** - Full TypeScript support with inferred types from configs
- 🐛 **Error Handling** - Zod validation provides clear, actionable error messages
- 🔒 **Security** - No secrets in code, all via validated environment variables
- 🔍 **Maintainability** - Single source of truth for all configuration

#### Technical Details
- **Site Config**: Static values (name, URL, contact info, metadata)
- **Mail Config**: Validated SMTP settings with Zod schema
- **App Config**: Runtime configuration with environment overrides
- **Validation**: Email format, port range, required fields
- **Default SMTP**: OVH ssl0.ovh.net, port 465, TLS/SSL

### Configuration Files

**`config/site.config.ts`:**
```typescript
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
};
```

**`config/mail.config.ts`:**
```typescript
const mailSchema = z.object({
  host: z.string().min(1, "SMTP_HOST is required"),
  port: z.coerce.number().int().positive(),
  secure: z.boolean(),
  user: z.string().email("SMTP_USER must be a valid email"),
  pass: z.string().min(4, "SMTP_PASS must be at least 4 characters"),
});

export const mailConfig = loadMailConfig(); // Validated at import
```

### Environment Variables

**New Variables:**
- `EVS_MODE` - Application mode (development, staging, production)
- `EVS_ENABLE_ADMIN` - Enable admin features (default: false)
- `CONTACT_RATE_LIMIT_WINDOW` - Rate limit time window (default: 5m)
- `CONTACT_RATE_LIMIT_MAX` - Max requests per window (default: 3)
- `CONTACT_MIN_MESSAGE_LENGTH` - Min message length (default: 5)
- `ENABLE_RATE_LIMIT` - Enable/disable rate limiting (default: true)
- `ENABLE_SMTP_LOGGING` - Enable SMTP debug logs (default: false)

**Renamed Variables:**
- `ENABLE_SMTP_LOGS` → `ENABLE_SMTP_LOGGING`

**Removed from Code:**
- `NEXT_PUBLIC_SITE_URL` - Now in `site.config.ts`
- `NEXT_PUBLIC_CONTACT_EMAIL` - Now in `site.config.ts`

### Migration Guide

1. Update `.env.local` or `.env.production`:
   ```env
   SMTP_HOST=ssl0.ovh.net  # Changed from mail.zimbra.de
   ENABLE_SMTP_LOGGING=false  # Renamed from ENABLE_SMTP_LOGS
   ```

2. Add new optional variables:
   ```env
   CONTACT_RATE_LIMIT_WINDOW=5m
   CONTACT_RATE_LIMIT_MAX=3
   ENABLE_RATE_LIMIT=true
   ```

3. Update Vercel environment variables with OVH credentials

4. Test with: `npx tsx scripts/testMailer.ts`

---

## [1.3.9] - 2025-01-10

### 🎯 Zimbra Proxy Relay

**Major Changes:**

#### Added
- ✨ **HTTPS Relay for Network-Independent Mail Delivery** - Enhanced `/app/api/mail/relay/route.ts` with full contact form functionality
- ✨ **Dual SMTP Fallback** - Primary TLS 465 with automatic STARTTLS 587 fallback
- ✨ **Precise Error Handling** - Reason codes: `timeout`, `network`, `auth`, `ratelimit`
- ✨ **Mail Error Logging** - Server-side logging to `logs/mail/<ISODate>.json` (excluded from git)
- ✨ **Enhanced Client Feedback** - User-friendly error messages based on failure reason

#### Changed
- 🔧 **Contact Form Endpoint** - Changed from `/api/contact` to `/api/mail/relay`
- 🔧 **Error Messages** - Specific messages for timeout/network, auth, and rate-limit scenarios
- 🔧 **Anti-Spam Integration** - Moved honeypot, min-time, and rate-limiting to relay route

#### Improved
- 🎨 **User Experience** - Clear, actionable error messages for different failure scenarios
- 🐛 **Network Reliability** - Automatic fallback ensures delivery even on unstable networks (mobile, hotspot)
- 🔍 **Debug Capability** - Enhanced logging for troubleshooting production issues

#### Technical Details
- **Primary Transport**: Zimbra TLS on port 465 (10s timeout)
- **Fallback Transport**: Zimbra STARTTLS on port 587 (10s timeout)
- **Rate Limiting**: 3 requests per IP per 5 minutes (in-memory)
- **Anti-Spam**: Honeypot field + 3s minimum fill time
- **Error Logging**: JSON format, date-based files in `logs/mail/`

### Error Message Examples

**Network/Timeout:**
> "Netzwerkfehler – bitte später erneut versuchen oder direkt an info@evervibestudios.com schreiben."

**Auth Failure:**
> "Mailserver-Anmeldung fehlgeschlagen – bitte später erneut versuchen."

**Rate Limit:**
> "Zu viele Anfragen – bitte in ein paar Minuten erneut versuchen."

---

## [1.3.8] - 2025-01-10

### 🎯 Zimbra Mail Fix + Env Refactor

**Major Changes:**

#### Added
- ✨ **Centralized Configuration** - `/config/appConfig.ts` for all app-wide settings
- ✨ **Proxy Fallback Endpoint** - `/app/api/mail/relay/route.ts` for SMTP redundancy
- ✨ **Test Mailer Script** - `scripts/testMailer.ts` for local SMTP testing
- 📝 **Scripts Documentation** - `scripts/README.md` with testing instructions
- 📝 **Deployment Log** - Comprehensive documentation in `docs/agent_logs/`

#### Changed
- 🔧 **SMTP Configuration** - Port 465 with TLS (was 587 with STARTTLS)
- 🔧 **Environment Variables** - Minimalistic `.env` with only 6 vars (down from 8)
- 🔧 **Error Handling** - Enhanced with specific error types (TIMEOUT, AUTH_FAILED, RATE_LIMIT)
- 🔧 **Rate Limiting** - Now uses `appConfig` (3 requests per 5 minutes)
- 🔧 **Components** - All now use `appConfig` instead of hardcoded values
  - `components/Contact.tsx`
  - `components/Footer.tsx`
  - `app/sitemap.ts`

#### Improved
- 🎨 **Mail Options** - Added `replyTo` header for better UX
- 🐛 **Error Messages** - User-friendly messages based on error type
- 🔍 **Debug Logging** - Controlled via `ENABLE_SMTP_LOGS` env variable
- 📦 **Bundle Size** - Minimal impact: 56.7 kB (from 56.4 kB)

#### Dependencies
- Added `dotenv` (dev) - For test script
- Added `tsx` (dev) - For running TypeScript directly

### Environment Variables Changes

**Before (v1.3.7):**
```env
SMTP_HOST=mail.zimbra.de
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@evervibestudios.com
SMTP_PASS=password
MAIL_TO=info@evervibestudios.com
MAIL_FROM=info@evervibestudios.com
ENABLE_CAPTCHA=false
```

**After (v1.3.8):**
```env
SMTP_HOST=mail.zimbra.de
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=password
NEXT_PUBLIC_SITE_URL=https://basic.evervibestudios.com
NEXT_PUBLIC_CONTACT_EMAIL=info@evervibestudios.com
```

### Migration Guide

If upgrading from v1.3.7:

1. Update `.env.local`:
   ```bash
   SMTP_PORT=465  # Was 587
   SMTP_SECURE=true  # Was false
   # Remove MAIL_TO, MAIL_FROM, ENABLE_CAPTCHA
   # Add NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CONTACT_EMAIL
   ```

2. Update Vercel environment variables (same changes as above)

3. Test locally:
   ```bash
   npx tsx scripts/testMailer.ts
   ```

4. Deploy to production

### Testing

**Local SMTP Test:**
```bash
cd frontend
npx tsx scripts/testMailer.ts
```

**Expected Result:**
- ✅ SMTP connection verified
- ✅ Test email sent successfully
- ✅ Email received at configured address

### Documentation

See full documentation at:
- `docs/agent_logs/2025-01-10/FRONTEND_V1.3.8_ZIMBRA_FIX_ENV_REFACTOR.md`
- `scripts/README.md`

---

## [1.3.7] - 2025-01-10

### Secure Zimbra Mail + UX Update

- Fixed Zimbra SMTP integration with TLS configuration
- Enhanced error logging for DEV mode
- Updated rate limiting from 5 to 3 requests per 5 minutes
- Reduced minimum message length from 10 to 5 characters

---

## [1.3.6] - Previous Versions

See git history for earlier changes.

---

**Version Format:** [MAJOR.MINOR.PATCH]
- **MAJOR:** Breaking changes
- **MINOR:** New features, backwards compatible
- **PATCH:** Bug fixes and minor improvements
