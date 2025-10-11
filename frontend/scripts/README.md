# EVS Scripts

This directory contains utility scripts for testing, monitoring, and debugging.

## 📧 Test Mailer Script

**File:** `testMailer.ts`

### Purpose
Test your SMTP configuration before deploying to production. This script verifies that your Zimbra SMTP credentials are working correctly.

### Prerequisites

1. Create `.env.local` file in the `frontend` directory:
   ```bash
   cd frontend
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your actual SMTP credentials:
   ```env
   SMTP_HOST=mail.zimbra.de
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=info@evervibestudios.com
   SMTP_PASS=your_actual_password_here
   ```

### Usage

```bash
# From the frontend directory
npx tsx scripts/testMailer.ts
```

### What It Tests

1. ✅ Checks all required environment variables exist
2. ✅ Verifies SMTP server connection
3. ✅ Sends a test email to the configured address
4. ✅ Displays detailed connection information
5. ✅ Provides troubleshooting tips on error

### Expected Output (Success)

```
╔═══════════════════════════════════════════════╗
║   EverVibe Studios - SMTP Configuration Test ║
╚═══════════════════════════════════════════════╝

📋 Checking environment variables...
✅ All required environment variables found

🔧 SMTP Configuration:
   Host:     mail.zimbra.de
   Port:     465
   Secure:   true
   User:     info@evervibestudios.com
   Password: ************

📧 Creating SMTP transporter...
✅ Transporter created

🔌 Verifying SMTP connection...
✅ SMTP connection verified successfully!

📨 Sending test email...
✅ Test email sent successfully!
   Message ID: <1234567890.abc@mail.zimbra.de>
   Response: 250 OK

╔═══════════════════════════════════════════════╗
║             🎉 ALL TESTS PASSED! 🎉           ║
╚═══════════════════════════════════════════════╝
```

### Common Errors and Solutions

#### EAUTH - Authentication Failed
```
❌ SMTP Test Failed:
   Code: EAUTH

💡 Troubleshooting:
   - Check your SMTP username and password
   - Ensure you're using an app-specific password if 2FA is enabled
```

**Solution:** Verify your `SMTP_USER` and `SMTP_PASS` in `.env.local`

#### ETIMEDOUT - Connection Timeout
```
❌ SMTP Test Failed:
   Code: ETIMEDOUT

💡 Troubleshooting:
   - Check if the SMTP port is correct (465 for TLS)
   - Verify firewall/network settings
   - Try SMTP_SECURE=true for port 465
```

**Solution:** 
- Ensure `SMTP_PORT=465` and `SMTP_SECURE=true`
- Check if your network/firewall blocks outgoing connections on port 465

#### ECONNECTION - Connection Refused
```
❌ SMTP Test Failed:
   Code: ECONNECTION

💡 Troubleshooting:
   - Check if SMTP_HOST is correct
   - Verify network connectivity
```

**Solution:** Verify `SMTP_HOST=mail.zimbra.de` is correct

### Debug Mode

To enable detailed SMTP logs:

```bash
# Add to .env.local
ENABLE_SMTP_LOGS=true
```

Then run the test script again. You'll see detailed protocol-level communication with the SMTP server.

### Testing on Different Configurations

#### Port 587 (STARTTLS)
```env
SMTP_PORT=587
SMTP_SECURE=false
```

#### Port 465 (TLS) - Recommended
```env
SMTP_PORT=465
SMTP_SECURE=true
```

### Security Notes

⚠️ **IMPORTANT:** 
- Never commit `.env.local` to git (it's in `.gitignore`)
- Use app-specific passwords when 2FA is enabled
- Test on localhost before deploying to production

### After Successful Test

Once the test passes:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/#contact

3. Submit a test form and verify email delivery

4. Deploy to production:
   ```bash
   npm run build
   vercel --prod
   ```

### Vercel Production Setup

After local testing succeeds, configure the same variables in Vercel:

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each variable:
   - `SMTP_HOST=mail.zimbra.de`
   - `SMTP_PORT=465`
   - `SMTP_SECURE=true`
   - `SMTP_USER=info@evervibestudios.com`
   - `SMTP_PASS=<your_password>`
   - `NEXT_PUBLIC_SITE_URL=https://basic.evervibestudios.com`
   - `NEXT_PUBLIC_CONTACT_EMAIL=info@evervibestudios.com`

5. Ensure all variables are enabled for **Production** environment
6. Redeploy the application

---

## 📝 Additional Scripts

You can add more testing scripts here as needed, such as:

- `testRateLimit.ts` - Test rate limiting functionality
- `testValidation.ts` - Test form validation
- `loadTest.ts` - Load testing for contact form

---

---

## 🔍 Health Check Script

**File:** `healthCheck.ts`

### Purpose
Automated health monitoring for the EVS frontend, SMTP, and API endpoints. Part of the Live Guard system (v1.4.1).

### Prerequisites

1. Ensure environment variables are configured:
   ```bash
   # Required
   SMTP_HOST=ssl0.ovh.net
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=info@evervibestudios.com
   SMTP_PASS=your_actual_password_here
   
   # Optional webhooks
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxx
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx
   ```

### Usage

```bash
# From the frontend directory
npx tsx scripts/healthCheck.ts
```

### What It Checks

1. ✅ SMTP Connection - Verifies mail server authentication
2. ✅ Contact API - Tests `/api/contact` endpoint
3. ✅ Frontend Health - Pings `/api/health` endpoint
4. ✅ Environment Consistency - Checks required env vars

### Output

The script generates:
- Console output with health check results
- Markdown report in `docs/agent_logs/YYYY-MM-DD_LIVE_GUARD.md`
- Email alerts to `info@evervibestudios.com` on failures
- Optional Discord/Slack webhook notifications

### Expected Output (Success)

```
╔═══════════════════════════════════════════════╗
║    EVS Live Guard - Health Check Starting    ║
╚═══════════════════════════════════════════════╝

🔍 Running health checks...

📧 Checking SMTP connection...
🌐 Checking Contact API...
💚 Checking Frontend Health...
⚙️  Checking Environment Consistency...

╔═══════════════════════════════════════════════╗
║            Health Check Results               ║
╚═══════════════════════════════════════════════╝

✅ SMTP Connection: Connected to ssl0.ovh.net:465 (0.85s)
✅ Contact API: Responded 200 (0.73s)
✅ Frontend Health: Online (evs-frontend) (0.42s)
✅ Env Consistency: 100%

**Overall Status**: HEALTHY
**Next run**: 2025-10-08 21:00:00 CET

╔═══════════════════════════════════════════════╗
║        🎉 ALL CHECKS PASSED! 🎉               ║
╚═══════════════════════════════════════════════╝
```

### Automated Scheduling

The health check runs automatically via GitHub Actions:
- **Schedule:** Every 12 hours (00:00 and 12:00 UTC)
- **Workflow:** `.github/workflows/health-check.yml`
- **Manual trigger:** Available via GitHub Actions UI

### Alert System

When failures are detected:
1. Email sent to `info@evervibestudios.com`
2. Discord webhook (if configured)
3. Slack webhook (if configured)
4. Auto-retry after 15 minutes (up to 3 attempts)
5. Critical alert after 3 consecutive failures

---

**Version:** 1.4.1  
**Last Updated:** 2025-10-08  
**Documentation:** See `/docs/agent_logs/`
