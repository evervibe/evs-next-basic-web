# EverVibe Studios v1.5.2 - Deployment Guide

**Version**: 1.5.2  
**Release Date**: 2025-10-09  
**Features**: Download Portal, Redis License Storage, PDF Invoices, Multi-language Emails

---

## 📋 Prerequisites

Before deploying v1.5.2, ensure you have:

1. ✅ Upstash Redis database (free tier available)
2. ✅ All v1.5.0 environment variables configured (PayPal, SMTP, License)
3. ✅ Access to Vercel deployment dashboard
4. ✅ SMTP server for email delivery
5. ✅ Test license keys for validation

---

## 🔧 Environment Setup

### Step 1: Create Upstash Redis Database

1. Visit [upstash.com](https://upstash.com) and create an account
2. Create a new Redis database:
   - **Name**: `evs-license-db`
   - **Region**: `eu-central-1` (Europe - for GDPR compliance)
   - **Type**: Free tier (25k commands/day)
3. Navigate to **REST API** section
4. Copy the following values:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 2: Configure Eviction Policy

⚠️ **Important**: Disable automatic eviction to preserve license data

1. In Upstash dashboard, go to **Settings**
2. Set **Eviction Policy** to `noeviction`
3. This ensures licenses are never automatically deleted

### Step 3: Generate JWT Secret

Generate a strong random secret for JWT tokens:

```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Copy the output as your `LICENSE_JWT_SECRET`.

---

## 🌐 Vercel Deployment

### Step 1: Add Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables, add:

```bash
# Redis Configuration (NEW in v1.5.2)
UPSTASH_REDIS_REST_URL=https://eu1-xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXXxxxxxxxxxxxx

# JWT Secret for Download Tokens (NEW in v1.5.2)
LICENSE_JWT_SECRET=your_generated_secret_here

# Existing v1.5.0 Variables
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_secret
PAYPAL_MODE=live
LICENSE_SALT=your_license_salt
LICENSE_EMAIL_SENDER=info@evervibestudios.com
LICENSE_SINGLE_PRICE=29.00
LICENSE_AGENCY_PRICE=79.00

# SMTP Configuration
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=your_smtp_password
```

### Step 2: Deploy to Production

```bash
# From frontend directory
cd frontend

# Deploy to production
vercel --prod

# Or let Vercel auto-deploy from Git push
git push origin main
```

### Step 3: Verify Deployment

After deployment, verify:

1. ✅ Build succeeds without errors
2. ✅ Download page loads: `https://basic.evervibestudios.com/download`
3. ✅ License validation endpoint works: `/api/license/validate`
4. ✅ Download endpoint accessible: `/api/download`

---

## 🧪 Testing Checklist

### 1. License Issuance (with Invoice)

Test the complete flow:

```bash
# Issue a test license via API or PayPal sandbox
# This should:
# - Generate license key
# - Store license in Redis
# - Generate PDF invoice
# - Send receipt email with PDF attachment
# - Send license email with download link
```

**Expected Results**:
- ✅ Two emails received (license + receipt)
- ✅ Receipt email contains PDF invoice attachment
- ✅ License email contains download link
- ✅ PDF invoice is properly formatted with EVS branding
- ✅ Invoice ID follows format: EVS-2025-XXXX

### 2. License Validation

Visit: `https://basic.evervibestudios.com/download`

**Test Cases**:

1. **Valid License**:
   - Enter valid license key
   - Enter matching email
   - Should receive download token
   - Should see license information

2. **Invalid License**:
   - Enter non-existent license key
   - Should show "Lizenzschlüssel nicht gefunden"

3. **Wrong Email**:
   - Enter valid license key
   - Enter wrong email
   - Should show "E-Mail-Adresse stimmt nicht überein"

4. **Rate Limiting**:
   - Try validating 4 times in quick succession
   - 4th attempt should be rate limited

### 3. Download Flow

After successful validation:

1. Click "Jetzt herunterladen" button
2. Should redirect to download (currently GitHub)
3. Check Redis for download log entry
4. Verify download count incremented

### 4. Redis Data Verification

Check Redis data using Upstash CLI or dashboard:

```bash
# Check license exists
GET LICENSE:EVS-XXXX-XXXX-XXXX

# Check download logs
GET DOWNLOAD:LOG:EVS-XXXX-XXXX-XXXX
```

**Expected Data**:
```json
{
  "email": "customer@example.com",
  "type": "single",
  "issuedAt": "2025-10-09T12:00:00.000Z",
  "validUntil": null,
  "downloadCount": 1
}
```

### 5. Multi-Language Email Testing

Test language detection:

1. **German Email** (customer@example.de):
   - Should receive German emails
   - Subject: "Ihre Lizenz von EverVibe Studios"

2. **English Email** (customer@example.com):
   - Should receive English emails (if domain-based detection works)
   - Subject: "Your License from EverVibe Studios"

### 6. PDF Invoice Testing

Verify invoice generation:

1. Check local `/docs/invoices/` directory (not in Git)
2. Verify invoice PDF format and content
3. Confirm counter file increments: `/docs/invoices/counter.txt`
4. Open PDF and verify:
   - ✅ EVS branding (logo, colors)
   - ✅ Customer information
   - ✅ License key
   - ✅ Product details
   - ✅ Price and date
   - ✅ PayPal Order ID

---

## 🔍 Monitoring & Debugging

### Redis Monitoring

Monitor Redis usage in Upstash dashboard:
- **Commands**: Track API calls (should be under 25k/day on free tier)
- **Memory**: Monitor database size
- **Keys**: View stored licenses

### Log Files

Check server logs for errors:

**License Issuance Logs**:
```
/logs/licenses/YYYY-MM-DD.json
```

**Download Logs** (in Redis):
```
DOWNLOAD:LOG:EVS-XXXX-XXXX-XXXX
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Redis connection fails | Verify `UPSTASH_REDIS_REST_URL` and token |
| JWT token expired | Normal - tokens expire after 5 minutes |
| Invoice not generated | Check write permissions for `/docs/invoices/` |
| Email not sent | Verify SMTP credentials |
| Rate limiting too aggressive | Adjust in endpoint code (default: 3 req/5min) |

---

## 🔐 Security Checklist

Before going live:

- [ ] Strong `LICENSE_JWT_SECRET` (32+ characters)
- [ ] Upstash Redis eviction policy set to `noeviction`
- [ ] SMTP credentials secure and not exposed
- [ ] PayPal in **live** mode (not sandbox)
- [ ] Rate limiting enabled on all endpoints
- [ ] `.env` files not committed to Git
- [ ] Invoice PDFs not committed to Git
- [ ] Redis connection uses HTTPS (REST API)
- [ ] All environment variables set in Vercel

---

## 📊 Performance Considerations

### Redis Usage

**Free Tier Limits**:
- 25,000 commands per day
- 256 MB storage

**Estimated Usage**:
- License storage: ~1 KB per license
- Download log: ~200 bytes per download
- ~10 Redis commands per license issuance
- ~5 Redis commands per download

**Capacity**:
- Free tier can handle ~2,500 license operations/day
- Or ~100,000 licenses stored (if under 256 MB)

### Invoice Storage

**Considerations**:
- Each PDF: ~50-100 KB
- 1,000 licenses = ~50-100 MB
- Consider cloud storage for scale:
  - Vercel Blob Storage
  - AWS S3
  - Google Cloud Storage

---

## 🚀 Production Recommendations

### 1. File Delivery

Currently, downloads redirect to GitHub. For production:

**Option A: Vercel Blob Storage**
```typescript
import { put } from '@vercel/blob';

// Upload template
const blob = await put('template.zip', file, { access: 'public' });

// Stream download
const response = await fetch(blob.url);
return new Response(response.body);
```

**Option B: AWS S3 with Signed URLs**
```typescript
import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const signedUrl = s3.getSignedUrl('getObject', {
  Bucket: 'evs-templates',
  Key: 'basic-template.zip',
  Expires: 300 // 5 minutes
});
```

### 2. Redis Scaling

For higher traffic:
- Upgrade to **Pro** plan (~$10/month)
- Increase to 100,000 commands/day
- 1 GB storage

### 3. Invoice Backup

Set up automatic backup:
```bash
# Cron job to backup invoices
0 0 * * * tar -czf invoices-backup-$(date +%Y%m%d).tar.gz /docs/invoices/*.pdf
```

### 4. Monitoring

Implement monitoring:
- Uptime monitoring (e.g., UptimeRobot)
- Error tracking (e.g., Sentry)
- Redis metrics dashboard
- Email delivery success rate

---

## 📝 Maintenance

### Weekly Tasks

- [ ] Check Upstash Redis usage metrics
- [ ] Review download logs for anomalies
- [ ] Verify email delivery success rate
- [ ] Check invoice generation success

### Monthly Tasks

- [ ] Backup invoice PDFs to cloud storage
- [ ] Review and clean up old download logs
- [ ] Update Redis if approaching limits
- [ ] Test full customer flow end-to-end

---

## 🆘 Support & Troubleshooting

### Getting Help

If you encounter issues:

1. Check this deployment guide
2. Review agent log: `/docs/agent_logs/2025-10-09/FRONTEND_V1.5.1_V1.5.2_FULL_IMPLEMENTATION.md`
3. Check Vercel deployment logs
4. Review Upstash Redis logs
5. Contact: info@evervibestudios.com

### Rollback Procedure

If needed, rollback to v1.5.0:

```bash
# In Vercel dashboard
git revert HEAD
git push origin main

# Or redeploy previous version
vercel --prod --force
```

---

## ✅ Go-Live Checklist

Final checks before going live:

- [ ] All environment variables configured in Vercel
- [ ] Upstash Redis database created and connected
- [ ] Eviction policy set to `noeviction`
- [ ] JWT secret generated and set
- [ ] PayPal in live mode
- [ ] SMTP working and tested
- [ ] Download page accessible
- [ ] License validation tested
- [ ] PDF invoice generation tested
- [ ] Both email types (license + receipt) tested
- [ ] Multi-language emails tested
- [ ] Rate limiting verified
- [ ] Redis data persistence verified
- [ ] Security checklist completed
- [ ] Backup strategy in place
- [ ] Monitoring enabled

---

**Deployment Status**: Ready for Production 🚀

**Version**: 1.5.2  
**Last Updated**: 2025-10-09  
**Next Version**: v1.6.0 - Main Website & Brand Page
