# EVS Frontend v1.4.0 - Deployment Guide

## 🚀 Quick Start

### Local Development

```bash
cd frontend

# 1. Copy environment template
cp .env.example .env.local

# 2. Edit .env.local with your SMTP credentials
nano .env.local  # or use your preferred editor

# Required changes:
# - SMTP_PASS=your_actual_password

# 3. Test SMTP configuration
npx tsx scripts/testMailer.ts

# 4. If test passes, start dev server
npm run dev

# 5. Visit http://localhost:3000/#contact and test the form
```

---

## 🌐 Vercel Production Deployment

### Step 1: Configure Environment Variables

Go to: **Vercel Dashboard → Project → Settings → Environment Variables**

Add these variables for **Production**:

```env
# SMTP Configuration (Required)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=your_actual_ovh_password

# Optional: Customize Rate Limiting
CONTACT_RATE_LIMIT_WINDOW=5m
CONTACT_RATE_LIMIT_MAX=3
CONTACT_MIN_MESSAGE_LENGTH=5
ENABLE_RATE_LIMIT=true

# Optional: EVS Mode Settings
EVS_MODE=production
EVS_ENABLE_ADMIN=false

# Debug (only for troubleshooting)
ENABLE_SMTP_LOGGING=false  # Set to true only for debugging
```

### Step 2: Deploy

**Option A - Git Push (Recommended):**
```bash
git push origin main
# Vercel will auto-deploy
```

**Option B - Manual Deploy:**
```bash
cd frontend
npm run build  # Verify build works
vercel --prod
```

### Step 3: Verify Deployment

1. Visit: https://basic.evervibestudios.com/#contact
2. Fill out the contact form
3. Check that email arrives at info@evervibestudios.com
4. Verify reply-to header is correct

---

## 🔧 Configuration Reference

### Core Config Files

1. **`config/site.config.ts`** - Static site values (no secrets)
   - Site name, URL, contact info
   - No environment variables
   - Safe to commit to git

2. **`config/mail.config.ts`** - Validated SMTP config
   - Loads from environment variables
   - Validates with Zod schema
   - Fails fast with clear errors

3. **`config/appConfig.ts`** - Runtime configuration
   - Combines site config + env vars
   - Rate limiting settings
   - Debug and security options

### Environment Files

1. **`.env.example`** ✅ Committed
   - Template with documentation
   - Copy to `.env.local` for development

2. **`.env.production`** ❌ Not committed
   - Production values (kept local)
   - Used as reference
   - Add to Vercel manually

3. **`.env.local`** ❌ Not committed
   - Local development overrides
   - Copy from `.env.example`
   - Add your credentials

---

## 🛠️ Troubleshooting

### Mail Config Validation Fails

**Error:** "Invalid mail configuration"

**Solution:**
```bash
# Check all required variables are set
echo $SMTP_HOST
echo $SMTP_PORT
echo $SMTP_SECURE
echo $SMTP_USER
echo $SMTP_PASS

# Verify they match expected format
# SMTP_PORT must be a number
# SMTP_USER must be a valid email
# SMTP_PASS must be at least 4 characters
```

### Build Fails in Vercel

**Error:** Build fails with config errors

**Solution:**
1. Verify all SMTP variables are set in Vercel
2. Check variable names match exactly (case-sensitive)
3. Verify SMTP_PORT is set to `465` (not `"465"`)
4. Check SMTP_SECURE is set to `true` (not `"true"`)

### Emails Not Sending

**Error:** Contact form submits but no email arrives

**Solution:**
```bash
# 1. Check SMTP credentials are correct
# 2. Verify OVH account is active
# 3. Check spam folder
# 4. Enable debug logging temporarily:
#    Set ENABLE_SMTP_LOGGING=true in Vercel
# 5. Check Vercel function logs
vercel logs --follow
```

### Rate Limiting Issues

**Error:** "Too many requests"

**Solution:**
```env
# Adjust rate limiting in Vercel:
CONTACT_RATE_LIMIT_WINDOW=10m  # Increase window
CONTACT_RATE_LIMIT_MAX=5       # Increase max requests

# Or disable for testing:
ENABLE_RATE_LIMIT=false
```

---

## 📊 Testing Checklist

Before marking deployment as complete:

- [ ] Build succeeds locally: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Test mailer works: `npx tsx scripts/testMailer.ts`
- [ ] Dev server runs: `npm run dev`
- [ ] Contact form loads on localhost
- [ ] Contact form submission works locally
- [ ] Vercel environment variables configured
- [ ] Deployment successful to Vercel
- [ ] Contact form loads on production
- [ ] Contact form submission works on production
- [ ] Email received at info@evervibestudios.com
- [ ] Reply-to header is correct
- [ ] Rate limiting works (submit multiple times)
- [ ] Error messages are user-friendly

---

## 🔐 Security Notes

### What's Safe to Commit
✅ `.env.example` - Template only, no secrets
✅ `config/site.config.ts` - Static values, no secrets
✅ `config/mail.config.ts` - Code only, loads from env
✅ `config/appConfig.ts` - Code only, loads from env

### What's Not Safe to Commit
❌ `.env.production` - Contains SMTP password
❌ `.env.local` - Contains SMTP password
❌ `.env` - Contains SMTP password
❌ Any file with actual SMTP_PASS value

### Best Practices
1. Never commit files with actual passwords
2. Use different passwords for dev and production
3. Rotate SMTP passwords regularly
4. Use OVH app-specific passwords if available
5. Keep `ENABLE_SMTP_LOGGING=false` in production
6. Monitor Vercel logs for suspicious activity

---

## 📞 Support

**Issues?** Check these resources:

1. **Agent Log**: `docs/agent_logs/2025-01-10/FRONTEND_V1.4.0_SMTP_CONFIG_SPLIT.md`
2. **Changelog**: `CHANGELOG.md`
3. **Email**: info@evervibestudios.com
4. **Repository**: https://github.com/evervibe/evs-next-basic-web

---

*Last Updated: 2025-01-10*
*Version: 1.4.0*
