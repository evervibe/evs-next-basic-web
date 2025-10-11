# EVS v1.5.0 - Quick Start Guide

## What's New in v1.5.0

💰 **Monetization System**: Complete PayPal integration for template sales  
🔑 **License Management**: Automated license generation and delivery  
📧 **Email Automation**: Professional license emails with download links  
🎨 **Pricing UI**: Beautiful React pricing components with dark mode  
🔒 **Security**: Rate limiting, hash validation, and tamper detection

## Quick Setup (3 Steps)

### 1. Get PayPal Credentials

Visit: https://developer.paypal.com/dashboard/

- Create app (or use existing)
- Copy Client ID and Secret
- Start with Sandbox mode for testing

### 2. Generate License Salt

```bash
openssl rand -base64 32
```

Save this somewhere secure!

### 3. Set Environment Variables

Create `.env.local`:

```env
# PayPal
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_secret
PAYPAL_MODE=sandbox
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_sandbox_client_id

# License
LICENSE_SALT=your_generated_salt_from_step_2
LICENSE_EMAIL_SENDER=info@evervibestudios.com
LICENSE_SINGLE_PRICE=29.00
LICENSE_AGENCY_PRICE=79.00

# SMTP (existing)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=your_smtp_password
```

## Test Locally

```bash
cd frontend
npm install
npm run build
npm run dev
```

Visit: http://localhost:3000/#pricing

## Test License System

```bash
npm run test:license
```

Expected output: ✅ All tests passed

## API Endpoints

### Create Order
```bash
POST /api/paypal/create-order
{
  "licenseType": "single",
  "email": "customer@example.com"
}
```

### Capture Order
```bash
POST /api/paypal/capture-order
{
  "orderId": "7YH85735LH189831Y"
}
```

### Issue License (Manual)
```bash
POST /api/license/issue
{
  "licenseType": "single",
  "email": "customer@example.com"
}
```

## Using Pricing Components

```typescript
import { PricingSection } from "@/modules/pricing";

export default function PricingPage() {
  return <PricingSection />;
}
```

## License Types

| Type | Price | Usage | Support |
|------|-------|-------|---------|
| Single | €29 | 1 project | 6 months |
| Agency | €79 | Unlimited | Priority 6 months |

## Project Structure

```
frontend/
├── app/api/
│   ├── paypal/
│   │   ├── create-order/route.ts
│   │   └── capture-order/route.ts
│   └── license/
│       └── issue/route.ts
├── lib/license/
│   ├── generateLicense.ts
│   ├── validateLicense.ts
│   └── mailTemplate.ts
├── modules/pricing/
│   ├── PricingSection.tsx
│   ├── LicenseCard.tsx
│   └── PaymentHandler.tsx
└── config/
    ├── license.config.ts
    └── paypal.config.ts
```

## Common Tasks

### Test Email Template
```bash
npm run test:license
```

### Check Build
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

### Manual License Issuance
```typescript
import { generateLicense } from "@/lib/license";

const license = generateLicense("single", "customer@example.com");
console.log(license.key); // EVS-XXXX-XXXX-XXXX
```

### Validate License
```typescript
import { validateLicense } from "@/lib/license";

const result = validateLicense(license);
if (result.valid) {
  console.log("✅ Valid license");
} else {
  console.log("❌ Invalid:", result.reason);
}
```

## Troubleshooting

### PayPal Buttons Not Showing
- Check `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set
- Check browser console for errors
- Verify Content Security Policy

### Build Fails
- Ensure all env vars are set (even with dummy values)
- Check for TypeScript errors
- Run `npm run lint`

### Email Not Sending
- Verify SMTP credentials
- Check spam folder
- Test with existing `/api/contact` endpoint

### License Validation Fails
- Check `LICENSE_SALT` is set correctly
- Verify license format
- Run `npm run test:license`

## Production Deployment

### Vercel

1. Add all environment variables to Vercel
2. Change `PAYPAL_MODE=live` (after testing!)
3. Use live PayPal credentials
4. Generate unique `LICENSE_SALT`
5. Push to main branch

### Testing Checklist

- [ ] Build succeeds
- [ ] Lint passes
- [ ] License tests pass
- [ ] PayPal SDK loads
- [ ] Payment flow works (sandbox)
- [ ] Email delivers
- [ ] License key displays

## Resources

### Documentation
- Full Guide: `docs/agent_logs/2025-10-08/FRONTEND_V1.5.0_MONETIZATION.md`
- Deployment: `docs/DEPLOYMENT_V1.5.0.md`
- Changelog: `CHANGELOG.md`
- Version History: `AGENTS.md`

### External
- PayPal Docs: https://developer.paypal.com/docs/api/overview/
- PayPal Sandbox: https://developer.paypal.com/dashboard/
- Next.js: https://nextjs.org/docs

## Support

**Email**: info@evervibestudios.com  
**Repository**: https://github.com/evervibe/evs-next-basic-web  
**Website**: https://basic.evervibestudios.com

## Next Steps

1. ✅ Complete local testing
2. ✅ Deploy to Vercel (sandbox mode)
3. ✅ Test end-to-end in sandbox
4. ✅ Switch to live mode
5. ✅ Monitor first transactions
6. 🚀 Launch!

---

**Version**: 1.5.0  
**Status**: Production Ready ✅  
**Date**: 2025-10-08
