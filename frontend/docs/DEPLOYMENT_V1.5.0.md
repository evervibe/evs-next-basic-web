# EVS Frontend v1.5.0 - Deployment Guide

## Pre-Deployment Checklist

### 1. PayPal Account Setup

#### Create PayPal App
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Create a new app (or use existing)
3. Copy **Client ID** and **Secret** for both Sandbox and Live

#### Sandbox Testing (Recommended First)
- Mode: `sandbox`
- Client ID: From sandbox app
- Secret: From sandbox app
- Create test accounts in PayPal sandbox

#### Production
- Mode: `live`
- Client ID: From live app
- Secret: From live app

### 2. Generate Secure License Salt

Generate a secure random string (minimum 32 characters):

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using Python
python -c "import secrets; print(secrets.token_hex(32))"
```

**Important**: Save this value securely - changing it will invalidate all existing licenses!

### 3. Verify SMTP Configuration

Ensure you have working SMTP credentials from previous versions (v1.3.5+):

```env
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=your_smtp_password
```

## Vercel Deployment

### Step 1: Add Environment Variables

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

#### Required Variables (Production)

```env
# PayPal Configuration
PAYPAL_CLIENT_ID=AYour_Live_Client_ID_Here
PAYPAL_CLIENT_SECRET=EYour_Live_Secret_Here
PAYPAL_MODE=live

# Frontend PayPal Client ID (public, can be same as above)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AYour_Live_Client_ID_Here

# License Configuration
LICENSE_SALT=your_secure_random_salt_from_step_2
LICENSE_EMAIL_SENDER=info@evervibestudios.com
LICENSE_SINGLE_PRICE=29.00
LICENSE_AGENCY_PRICE=79.00

# Base URL (optional, defaults to domain)
NEXT_PUBLIC_BASE_URL=https://basic.evervibestudios.com

# Existing SMTP Variables (should already be set)
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=your_smtp_password
```

#### For Sandbox Testing

Change only these variables:
```env
PAYPAL_CLIENT_ID=Your_Sandbox_Client_ID
PAYPAL_CLIENT_SECRET=Your_Sandbox_Secret
PAYPAL_MODE=sandbox
NEXT_PUBLIC_PAYPAL_CLIENT_ID=Your_Sandbox_Client_ID
```

### Step 2: Deploy

#### Automatic Deployment
Push to main branch:
```bash
git push origin main
```

#### Manual Deployment
1. Go to Vercel Dashboard
2. Click **Deploy**
3. Wait for build to complete

### Step 3: Verify Deployment

1. **Check Build Logs**: Ensure no errors
2. **Test Health Endpoint**: Visit `/api/health`
3. **Test Pricing Page**: Navigate to pricing section
4. **Verify PayPal Loads**: Check browser console for errors

## Testing Checklist

### Sandbox Testing

1. **PayPal SDK Loads**
   - [ ] Visit pricing page
   - [ ] PayPal buttons render
   - [ ] No console errors

2. **Create Order**
   - [ ] Select license type
   - [ ] Enter email address
   - [ ] Click "Jetzt kaufen"
   - [ ] PayPal popup opens

3. **Complete Payment**
   - [ ] Login with PayPal sandbox test account
   - [ ] Complete payment
   - [ ] Success message displays
   - [ ] License key shown

4. **Email Delivery**
   - [ ] Check inbox for license email
   - [ ] Verify license key matches
   - [ ] Test download link
   - [ ] Verify all email content

### Production Testing

⚠️ **Only after sandbox testing is successful**

1. Switch to live mode in environment variables
2. Redeploy
3. Test with small amount (€29 single license)
4. Verify real payment processing
5. Check real email delivery
6. Test PayPal dashboard for transaction

## Monitoring

### Check Logs

#### Vercel Logs
```
Vercel Dashboard → Project → Logs
```

Filter for:
- `/api/paypal/*` - Payment processing
- `/api/license/issue` - License issuance
- Errors and warnings

#### License Issuance Logs
Stored in: `logs/licenses/YYYY-MM-DD.json` (server-side)

### Health Monitoring

Existing health check system (v1.4.1) runs every 12 hours.

#### Extend Health Checks (Optional)

Add to `scripts/healthCheck.ts`:
```typescript
// Check PayPal API connectivity
async function checkPayPalAPI() {
  try {
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      // ... auth
    });
    return response.ok;
  } catch {
    return false;
  }
}
```

### Rate Limiting Monitoring

Current limits (per 5 minutes per IP):
- PayPal Create Order: 10 requests
- PayPal Capture Order: 10 requests
- License Issue: 5 requests

Monitor for:
- 429 responses (rate limit exceeded)
- Unusual traffic patterns
- Failed payment attempts

## Troubleshooting

### PayPal Buttons Not Showing

**Symptoms**: Empty PayPal container, no buttons

**Solutions**:
1. Check `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set
2. Verify browser console for errors
3. Check Content Security Policy allows PayPal
4. Try different browser
5. Clear browser cache

### Payments Failing

**Symptoms**: Error after PayPal approval

**Solutions**:
1. Check Vercel logs for errors
2. Verify `PAYPAL_MODE` matches credentials
3. Test with sandbox first
4. Check PayPal account status
5. Verify webhook URLs if using webhooks

### Emails Not Arriving

**Symptoms**: Payment succeeds but no email

**Solutions**:
1. Check SMTP credentials still valid
2. Test with `/api/license/issue` directly
3. Check spam folder
4. Verify email server logs
5. Test SMTP connection manually

### License Validation Fails

**Symptoms**: Valid license shows as invalid

**Solutions**:
1. Check `LICENSE_SALT` hasn't changed
2. Verify license format (EVS-XXXX-XXXX-XXXX)
3. Check hash generation
4. Test with `npm run test:license`

## Security Recommendations

### Production Security

1. **Unique License Salt**
   - Generate secure random value
   - Never commit to repository
   - Store in Vercel env vars only

2. **PayPal Credentials**
   - Use live mode only in production
   - Keep CLIENT_SECRET secure
   - Rotate regularly

3. **Rate Limiting**
   - Monitor for abuse
   - Consider Redis for distributed rate limiting
   - Adjust limits based on traffic

4. **HTTPS Only**
   - Ensure all endpoints use HTTPS
   - Check Vercel SSL certificate

5. **Email Validation**
   - Current: Format validation
   - Consider: MX record validation
   - Consider: Disposable email detection

### Monitoring Alerts

Set up alerts for:
- High rate of failed payments
- Unusual traffic patterns
- SMTP delivery failures
- API endpoint errors

## Rollback Plan

If issues occur in production:

### Quick Rollback

1. Go to Vercel Dashboard
2. Deployments → Previous deployment
3. Click **Promote to Production**

### Disable Payments Temporarily

Set in Vercel env vars:
```env
PAYPAL_MODE=sandbox
```
This will route all payments to sandbox, effectively disabling real charges.

## Post-Deployment

### Day 1 Checklist
- [ ] Monitor first 10 transactions
- [ ] Check all emails delivered
- [ ] Verify PayPal dashboard shows payments
- [ ] Check license logs
- [ ] Review Vercel error logs

### Week 1 Checklist
- [ ] Review payment success rate
- [ ] Check customer feedback
- [ ] Monitor support emails
- [ ] Analyze conversion rate
- [ ] Review rate limiting logs

### Monthly Checklist
- [ ] Review revenue analytics
- [ ] Check license usage patterns
- [ ] Update documentation
- [ ] Plan feature enhancements

## Support

### Customer Support

For license issues:
1. Check license in logs: `logs/licenses/`
2. Verify email was sent
3. Can manually re-issue via `/api/license/issue`

### Technical Support

**Repository**: https://github.com/evervibe/evs-next-basic-web  
**Documentation**: `docs/agent_logs/2025-10-08/FRONTEND_V1.5.0_MONETIZATION.md`  
**Email**: info@evervibestudios.com

## Next Steps

After successful deployment:

1. **Analytics** (v1.6.0)
   - Track conversion rates
   - Monitor payment funnel
   - Analyze drop-off points

2. **Download Portal** (v1.6.0)
   - License verification page
   - Secure download links
   - Version management

3. **Admin Dashboard** (v1.7.0)
   - License management
   - Customer lookup
   - Revenue reporting

## Resources

- [PayPal REST API Docs](https://developer.paypal.com/docs/api/overview/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Env Vars](https://vercel.com/docs/concepts/projects/environment-variables)
- [EVS AGENTS.md](../AGENTS.md)

---

**Version**: 1.5.0  
**Last Updated**: 2025-10-08  
**Status**: Production Ready ✅
