# Environment Variables Validation Report

**Version:** 1.6.3  
**Last Updated:** 2025-01-10  
**Build Strategy:** Lazy Validation for Build Stability

---

## 🎯 Overview

This document provides a comprehensive overview of all environment variables used in the EVS Next.js Basic Web template. As of version 1.6.3, the application uses **lazy validation** strategy to ensure builds succeed regardless of missing environment variables. Critical integrations are validated at runtime, not during build time.

---

## 📊 Environment Variables Matrix

### Core Configuration

| Variable | Required for Build | Required at Runtime | Default | Description | Used By |
|----------|-------------------|---------------------|---------|-------------|---------|
| `NODE_ENV` | ✅ | ✅ | `development` | Application environment mode | All modules |
| `EVS_MODE` | ❌ | ❌ | `development` | EVS-specific mode | App config |
| `EVS_ENABLE_ADMIN` | ❌ | ❌ | `false` | Enable admin features | Admin features |

### SMTP Configuration

| Variable | Required for Build | Required at Runtime | Default | Description | Used By |
|----------|-------------------|---------------------|---------|-------------|---------|
| `SMTP_HOST` | ❌ | ✅ (for email) | `undefined` | SMTP server hostname | Contact form, License emails |
| `SMTP_PORT` | ❌ | ✅ (for email) | `undefined` | SMTP server port | Contact form, License emails |
| `SMTP_SECURE` | ❌ | ✅ (for email) | `undefined` | Use TLS/SSL | Contact form, License emails |
| `SMTP_USER` | ❌ | ✅ (for email) | `undefined` | SMTP authentication username | Contact form, License emails |
| `SMTP_PASS` | ❌ | ✅ (for email) | `undefined` | SMTP authentication password | Contact form, License emails |
| `MAIL_TO` | ❌ | ❌ | `undefined` | Override recipient email | Contact form |
| `MAIL_FROM` | ❌ | ❌ | `undefined` | Override sender email | Contact form |

**Runtime Behavior:**
- If SMTP not configured → APIs return `503 Service Unavailable`
- Contact form: `/api/contact` and `/api/mail/relay`
- License emails: `/api/license/issue`

### PayPal Configuration

| Variable | Required for Build | Required at Runtime | Default | Description | Used By |
|----------|-------------------|---------------------|---------|-------------|---------|
| `PAYPAL_CLIENT_ID` | ❌ | ✅ (for payments) | `undefined` | PayPal REST API Client ID | Payment endpoints |
| `PAYPAL_CLIENT_SECRET` | ❌ | ✅ (for payments) | `undefined` | PayPal REST API Client Secret | Payment endpoints |
| `PAYPAL_MODE` | ❌ | ❌ | `sandbox` | PayPal environment mode | Payment endpoints |

**Runtime Behavior:**
- If PayPal not configured → APIs return `503 Service Unavailable`
- Create order: `/api/paypal/create-order`
- Capture order: `/api/paypal/capture-order`

### License System Configuration

| Variable | Required for Build | Required at Runtime | Default | Description | Used By |
|----------|-------------------|---------------------|---------|-------------|---------|
| `LICENSE_SALT` | ❌ | ✅ (for licenses) | `undefined` | Cryptographic salt for license hashing | License generation |
| `LICENSE_EMAIL_SENDER` | ❌ | ❌ | `info@evervibestudios.com` | Email sender for license emails | License emails |
| `LICENSE_SINGLE_PRICE` | ❌ | ❌ | `29.00` | Single license price (EUR) | Pricing |
| `LICENSE_AGENCY_PRICE` | ❌ | ❌ | `79.00` | Agency license price (EUR) | Pricing |
| `LICENSE_JWT_SECRET` | ❌ | ❌ | `undefined` | JWT secret for download tokens | Download tokens |

**Runtime Behavior:**
- If license system not configured → APIs return `503 Service Unavailable`
- License issuance: `/api/license/issue`
- License validation: `/api/license/validate`

### Redis Configuration

| Variable | Required for Build | Required at Runtime | Default | Description | Used By |
|----------|-------------------|---------------------|---------|-------------|---------|
| `UPSTASH_REDIS_REST_URL` | ❌ | ✅ (for storage) | `undefined` | Upstash Redis REST API URL | License storage |
| `UPSTASH_REDIS_REST_TOKEN` | ❌ | ✅ (for storage) | `undefined` | Upstash Redis REST API Token | License storage |

**Runtime Behavior:**
- If Redis not configured → License storage operations fail
- Used by: `/api/license/issue`, `/api/license/validate`

### Security & Rate Limiting

| Variable | Required for Build | Required at Runtime | Default | Description | Used By |
|----------|-------------------|---------------------|---------|-------------|---------|
| `CONTACT_RATE_LIMIT_WINDOW` | ❌ | ❌ | `5m` | Rate limit window duration | Contact form |
| `CONTACT_RATE_LIMIT_MAX` | ❌ | ❌ | `3` | Max requests per window | Contact form |
| `CONTACT_MIN_MESSAGE_LENGTH` | ❌ | ❌ | `5` | Minimum message length | Contact form |
| `ENABLE_RATE_LIMIT` | ❌ | ❌ | `true` | Enable/disable rate limiting | Contact form |
| `ENABLE_SMTP_LOGGING` | ❌ | ❌ | `false` | Enable SMTP debug logs | Email operations |

### Optional Monitoring

| Variable | Required for Build | Required at Runtime | Default | Description | Used By |
|----------|-------------------|---------------------|---------|-------------|---------|
| `DISCORD_WEBHOOK_URL` | ❌ | ❌ | `undefined` | Discord webhook for alerts | Health monitoring |
| `SLACK_WEBHOOK_URL` | ❌ | ❌ | `undefined` | Slack webhook for alerts | Health monitoring |

---

## 🔧 Validation Strategy

### Build Time
- **All variables are optional** for build success
- Schema validation uses `.optional()` for critical integrations
- Warnings logged for missing values, but build continues
- No `throw` statements at module initialization

### Runtime
- **Critical variables validated on-demand** when features are used
- Helper functions enforce requirements:
  - `requirePayPalConfig()` - Validates PayPal credentials
  - `requireSMTPConfig()` - Validates SMTP settings
  - `requireRedisConfig()` - Validates Redis connection
  - `requireLicenseConfig()` - Validates license salt
- Check functions for graceful handling:
  - `isPayPalConfigured()` - Non-throwing check
  - `isSMTPConfigured()` - Non-throwing check
  - `isRedisConfigured()` - Non-throwing check
  - `isLicenseConfigured()` - Non-throwing check

### API Error Responses

When configuration is missing at runtime:

```json
{
  "success": false,
  "error": "Service temporarily unavailable. Please try again later."
}
```

**HTTP Status:** `503 Service Unavailable`

---

## 📝 Usage Examples

### Development Setup

**Minimal .env.local for development:**
```env
NODE_ENV=development
EVS_MODE=development
```

**Build succeeds:** ✅  
**Features available:** Homepage, static pages  
**Features unavailable:** Contact form, payments, licenses

### Production Setup

**Complete .env.production for production:**
```env
NODE_ENV=production
EVS_MODE=production

# SMTP
SMTP_HOST=mail.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@example.com
SMTP_PASS=secret_password

# PayPal
PAYPAL_CLIENT_ID=live_client_id
PAYPAL_CLIENT_SECRET=live_client_secret
PAYPAL_MODE=live

# License
LICENSE_SALT=secure_random_salt_32_chars
LICENSE_EMAIL_SENDER=info@example.com
LICENSE_JWT_SECRET=secure_jwt_secret_32_chars

# Redis
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

**Build succeeds:** ✅  
**All features available:** ✅

---

## 🚀 Deployment Platforms

### Vercel

1. Go to Project Settings → Environment Variables
2. Add only the variables needed for your features
3. Build will succeed even with empty configuration
4. Features check at runtime and return 503 if needed

### Render

1. Configure environment variables in service settings
2. Build succeeds with minimal configuration
3. Add credentials as features are enabled

### Docker / VPS

1. Create `.env.production` with required values
2. Build image without credentials (safe for CI/CD)
3. Inject secrets at runtime via environment

---

## 🔒 Security Notes

1. **Never commit real credentials** to version control
2. **Use different secrets** for dev/staging/production
3. **Rotate secrets regularly** (quarterly recommended)
4. **Keep LICENSE_SALT immutable** in production (invalidates licenses if changed)
5. **Dummy values in .env.example** are safe and won't expose secrets
6. **503 responses hide implementation details** from potential attackers

---

## ✅ Benefits of Lazy Validation

1. **Build Stability** - Vercel/Render builds succeed without full configuration
2. **Flexible Deployment** - Enable features incrementally
3. **Security** - No credentials needed in CI/CD build environments
4. **Developer Experience** - Quick setup for frontend development
5. **Graceful Degradation** - Clear error messages at runtime
6. **BC Compatible** - Existing production setups work unchanged

---

## 📚 Related Documentation

- `.env.example` - Complete example with descriptions
- `lib/env.ts` - Environment validation implementation
- `BUILD_STABILITY_TEST.md` - Build test results
- `CHANGELOG.md` - Version 1.6.3 release notes

---

**Document Version:** 1.0  
**Template Version:** 1.6.3  
**Maintained By:** EverVibe Studios
