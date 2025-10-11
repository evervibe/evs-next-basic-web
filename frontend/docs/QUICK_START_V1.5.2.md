# EVS v1.5.2 - Quick Start Guide

**For Developers**: Get the download portal and invoice system running locally in 5 minutes.

---

## 🚀 Quick Setup

### 1. Clone & Install

```bash
cd frontend
npm install
```

**New Dependencies in v1.5.2**:
- `@upstash/redis` - Redis database client
- `pdfkit` - PDF invoice generation
- `@types/pdfkit` - TypeScript types

---

### 2. Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

**Edit `.env.local`** with your credentials:

```bash
# Core
NODE_ENV=development
EVS_MODE=development

# SMTP (required for emails)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=your_smtp_password

# Redis (NEW in v1.5.2)
UPSTASH_REDIS_REST_URL=https://eu1-xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxxxxxxxx

# JWT Secret (NEW in v1.5.2)
LICENSE_JWT_SECRET=evs-2025-secret-change-in-production

# License
LICENSE_SALT=your_license_salt
LICENSE_EMAIL_SENDER=info@evervibestudios.com
LICENSE_SINGLE_PRICE=29.00
LICENSE_AGENCY_PRICE=79.00

# PayPal
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_secret
PAYPAL_MODE=sandbox
```

---

### 3. Setup Upstash Redis (Free)

1. Go to [upstash.com](https://upstash.com) and sign up
2. Create a new Redis database
3. Copy **REST API** credentials:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Paste into `.env.local`

**Note**: Free tier includes 25k commands/day - more than enough for development!

---

### 4. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🧪 Test the Features

### Test 1: Issue a License

Use the existing pricing page or API:

```bash
curl -X POST http://localhost:3000/api/license/issue \
  -H "Content-Type: application/json" \
  -d '{
    "licenseType": "single",
    "email": "test@example.com",
    "orderId": "TEST-001"
  }'
```

**Expected**:
- ✅ License generated (e.g., `EVS-A1B2-C3D4-E5F6`)
- ✅ Stored in Redis
- ✅ PDF invoice generated in `/docs/invoices/`
- ✅ Two emails sent (license + receipt with PDF)

---

### Test 2: Validate License

Visit: `http://localhost:3000/download`

1. Enter license key from Test 1
2. Enter `test@example.com`
3. Click "Lizenz validieren"

**Expected**:
- ✅ Validation succeeds
- ✅ Download token generated (5-min expiry)
- ✅ License info displayed

---

### Test 3: Download

After validation:

1. Click "Jetzt herunterladen"
2. Should redirect to download

**Expected**:
- ✅ Download logged in Redis
- ✅ Download count incremented

---

### Test 4: Check Redis Data

Using Upstash dashboard or CLI:

```bash
# View license
GET LICENSE:EVS-XXXX-XXXX-XXXX

# View download logs
GET DOWNLOAD:LOG:EVS-XXXX-XXXX-XXXX
```

---

## 📁 Key Files

### Frontend
- `/app/download/page.tsx` - Download portal UI
- `/components/DownloadCard.tsx` - Download form

### API Endpoints
- `/app/api/license/validate/route.ts` - License validation
- `/app/api/download/route.ts` - Secure download
- `/app/api/license/issue/route.ts` - Issue license (enhanced)

### Backend Logic
- `/lib/db.ts` - Redis connection
- `/lib/license/downloadToken.ts` - JWT tokens
- `/lib/pdf/generateInvoice.ts` - PDF generation
- `/lib/mail/licenseMail.ts` - License emails
- `/lib/mail/receiptMail.ts` - Receipt emails

### Configuration
- `/config/mailTemplate.config.ts` - Email branding

---

## 🐛 Troubleshooting

### Issue: Redis Connection Failed

**Error**: `Missing Upstash Redis configuration`

**Solution**: 
1. Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in `.env.local`
2. Make sure Redis database is created in Upstash
3. Restart dev server

---

### Issue: License Not Found

**Error**: `Lizenzschlüssel nicht gefunden`

**Solution**:
1. Make sure license was issued first (Test 1)
2. Check Redis contains the license
3. Verify license key format: `EVS-XXXX-XXXX-XXXX`

---

### Issue: PDF Not Generated

**Error**: Invoice PDF not created

**Solution**:
1. Check `/docs/invoices/` directory exists
2. Verify write permissions
3. Check console for errors

---

### Issue: Emails Not Sent

**Error**: Failed to send license/receipt email

**Solution**:
1. Verify SMTP credentials in `.env.local`
2. Check SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
3. Test with a real email provider (not fake)

---

## 🔧 Development Tips

### Hot Module Reload

Next.js automatically reloads on file changes:
- API routes: Restart required
- Frontend components: Hot reload
- Config files: Restart required

### View Logs

```bash
# In development, all logs print to console
# Check terminal for:
# - Redis operations
# - Email sending
# - PDF generation
# - API requests
```

### Debug Mode

Enable verbose logging:

```typescript
// In any file
console.log("Debug:", data);
```

### Test Different Languages

Test multi-language emails:

```bash
# German email (ends with .de)
curl -X POST http://localhost:3000/api/license/issue \
  -d '{"email": "test@example.de", "licenseType": "single"}'

# English email
curl -X POST http://localhost:3000/api/license/issue \
  -d '{"email": "test@example.com", "licenseType": "single"}'
```

---

## 📚 Next Steps

1. **Customize Branding**: Edit `/config/mailTemplate.config.ts`
2. **Update Invoice Template**: Modify `/lib/pdf/generateInvoice.ts`
3. **Change Rate Limits**: Update endpoint rate limiting
4. **Add File Delivery**: Replace GitHub redirect in `/app/api/download/route.ts`
5. **Extend Languages**: Add more languages to mail config

---

## 🔗 Useful Links

- [Upstash Console](https://console.upstash.com)
- [Next.js Docs](https://nextjs.org/docs)
- [PDFKit Docs](https://pdfkit.org)
- [Upstash Redis Docs](https://docs.upstash.com/redis)
- [Full Deployment Guide](./DEPLOYMENT_V1.5.2.md)
- [Agent Log](./agent_logs/2025-10-09/FRONTEND_V1.5.1_V1.5.2_FULL_IMPLEMENTATION.md)

---

## ✅ Quick Checklist

Before committing your changes:

- [ ] `.env.local` configured (never commit this!)
- [ ] Redis connected and tested
- [ ] License issuance works
- [ ] Download portal loads
- [ ] License validation works
- [ ] PDF invoices generate
- [ ] Emails send successfully
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] No lint errors: `npm run lint`

---

**Happy Coding!** 🚀

For questions: info@evervibestudios.com
