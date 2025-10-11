# EVS Template v1.6.0 - Deployment Guide

## 📋 Overview

Complete deployment guide for EVS Next.js Template v1.6.0, covering installation, configuration, building, and deployment to various platforms (Vercel, Render, VPS).

**Version**: 1.6.0  
**Released**: 2025-01-15  
**Target**: Production-ready deployment with SEO, GDPR, and security enhancements

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 18.0.0 (LTS recommended)
- **Package Manager**: npm, yarn, or pnpm
- **Git**: For version control
- **Domain**: Custom domain (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/evervibe/evs-next-basic-web.git
cd evs-next-basic-web/frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit environment variables
nano .env.local  # or your preferred editor
```

## 🔐 Environment Configuration

### Required Variables

All environment variables are validated at runtime using Zod (see `lib/env.ts`).

#### 1. Core Configuration

```bash
NODE_ENV=production
EVS_MODE=production
EVS_ENABLE_ADMIN=false
```

#### 2. SMTP Configuration

```bash
# Email service credentials
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@evervibestudios.com
SMTP_PASS=your_secure_smtp_password
```

**Supported SMTP Providers:**
- OVH: `ssl0.ovh.net:465` (SSL)
- Gmail: `smtp.gmail.com:587` (STARTTLS)
- Outlook: `smtp-mail.outlook.com:587`
- Custom SMTP server

#### 3. PayPal Configuration

```bash
# PayPal REST API credentials
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=live  # Use 'sandbox' for testing
```

Get credentials from: https://developer.paypal.com/dashboard

#### 4. License System

```bash
# License security
LICENSE_SALT=your_strong_random_salt_min_16_chars
LICENSE_EMAIL_SENDER=info@evervibestudios.com
LICENSE_JWT_SECRET=your_jwt_secret_min_16_chars

# Pricing (optional)
LICENSE_SINGLE_PRICE=29.00
LICENSE_AGENCY_PRICE=79.00
```

**Security Notes:**
- Use strong random strings (32+ characters recommended)
- Generate with: `openssl rand -base64 32`
- Never change LICENSE_SALT in production (invalidates existing licenses)

#### 5. Redis Configuration

```bash
# Upstash Redis (serverless)
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Sign up at: https://upstash.com

### Optional Variables

```bash
# Rate limiting (defaults shown)
CONTACT_RATE_LIMIT_WINDOW=5m
CONTACT_RATE_LIMIT_MAX=3
ENABLE_RATE_LIMIT=true

# Health monitoring webhooks
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxx
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx
```

## 🏗️ Building

### Development Build

```bash
# Start development server
npm run dev

# Access at http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Access at http://localhost:3000
```

### Build Output

```
Route (app)                              Size  First Load JS
┌ ○ /                                 21.3 kB         159 kB
├ ○ /agb                               170 B         105 kB
├ ○ /cookie                            170 B         105 kB
├ ○ /datenschutz                       170 B         105 kB
├ ○ /download                        1.75 kB         140 kB
├ ○ /impressum                         170 B         105 kB
└ ○ /sitemap.xml                       149 B         102 kB
```

## 🚢 Deployment

### Option 1: Vercel (Recommended)

**Why Vercel:**
- Optimized for Next.js
- Automatic deployments
- Global CDN
- Zero configuration
- Free SSL certificates

**Steps:**

1. **Connect Repository**
   ```bash
   # Via Vercel CLI
   npm i -g vercel
   vercel
   
   # Or via Vercel Dashboard
   # Import Git Repository → Select your repo
   ```

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Set different values for Preview and Production
   - Enable "Encrypt" for sensitive values

3. **Deploy**
   ```bash
   # Automatic deployment on git push
   git push origin main
   
   # Or manual deployment
   vercel --prod
   ```

4. **Configure Domain**
   - Go to Project Settings → Domains
   - Add custom domain
   - Update DNS records as instructed

### Option 2: Render

**Why Render:**
- Simple setup
- Free tier available
- Automatic SSL
- CDN included

**Steps:**

1. **Create New Web Service**
   - Dashboard → New → Web Service
   - Connect your GitHub repository

2. **Configure Build**
   ```yaml
   Build Command: npm install && npm run build
   Start Command: npm run start
   ```

3. **Environment Variables**
   - Add all required variables in Render dashboard
   - Use "Secret" type for sensitive values

4. **Deploy**
   - Render automatically deploys on push to main branch

### Option 3: VPS (DigitalOcean, Linode, AWS EC2)

**Why VPS:**
- Full control
- Custom server configuration
- Cost-effective at scale
- No vendor lock-in

**Requirements:**
- Ubuntu 22.04 LTS or newer
- 1GB RAM minimum (2GB recommended)
- Node.js 18+ installed
- Nginx or Apache for reverse proxy

**Setup:**

1. **Prepare Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install -y nginx
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/evervibe/evs-next-basic-web.git
   cd evs-next-basic-web/frontend
   
   # Install dependencies
   npm install
   
   # Create production environment file
   nano .env.production
   # Add all required variables
   
   # Build
   npm run build
   
   # Start with PM2
   pm2 start npm --name "evs-frontend" -- start
   pm2 save
   pm2 startup  # Follow instructions
   ```

3. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/evs-frontend
   ```
   
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
   
   ```bash
   # Enable site
   sudo ln -s /etc/nginx/sites-available/evs-frontend /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

5. **Configure Firewall**
   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw allow OpenSSH
   sudo ufw enable
   ```

## 🔒 Security Hardening

### 1. Security Headers

Already configured in `next.config.ts`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Content-Security-Policy: Configured
- Permissions-Policy: Restricted

### 2. Environment Security

```bash
# On VPS: Secure environment file
chmod 600 .env.production
chown www-data:www-data .env.production  # Or your app user

# Never commit:
# - .env.local
# - .env.production
# - Any file with actual secrets
```

### 3. Rate Limiting

Enabled by default. Configure in environment:
```bash
ENABLE_RATE_LIMIT=true
CONTACT_RATE_LIMIT_MAX=3
CONTACT_RATE_LIMIT_WINDOW=5m
```

### 4. SMTP Security

- Use app-specific passwords
- Enable 2FA on email account
- Rotate passwords quarterly
- Never log passwords

## 🧪 Testing

### Pre-Deployment Checklist

- [ ] All environment variables set and validated
- [ ] Build succeeds without errors: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] SMTP configuration tested (send test email)
- [ ] PayPal credentials validated (test payment)
- [ ] Redis connection successful
- [ ] License generation tested
- [ ] Consent banner appears and works
- [ ] Dark mode toggle works
- [ ] All pages accessible
- [ ] Contact form submits successfully
- [ ] Download portal validates licenses

### Post-Deployment Checklist

- [ ] Site accessible via HTTPS
- [ ] SSL certificate valid
- [ ] All pages load correctly
- [ ] Contact form sends emails
- [ ] PayPal checkout works
- [ ] License download works
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Manifest accessible: `/manifest.json`
- [ ] Health check passes: `/api/health`
- [ ] Analytics tracking (if enabled)

### Performance Testing

```bash
# Run Lighthouse audit
npx lighthouse https://yourdomain.com --view

# Target scores (v1.6.0):
# - Performance: ≥ 95
# - Accessibility: ≥ 95
# - Best Practices: ≥ 95
# - SEO: ≥ 95
```

## 📊 Monitoring

### Health Check Endpoint

```bash
GET /api/health

Response:
{
  "status": "healthy",
  "timestamp": "2025-01-15T12:00:00.000Z",
  "version": "1.6.0",
  "checks": {
    "smtp": "ok",
    "redis": "ok",
    "paypal": "ok"
  }
}
```

### Automated Health Monitoring

The template includes a GitHub Actions workflow for automated health checks:

```yaml
# .github/workflows/health-check.yml
- Runs every 12 hours
- Sends alerts on failure (Discord/Slack)
- Retries 3 times before alerting
```

### Application Logs

**Vercel:**
- View in Vercel Dashboard → Logs
- Real-time streaming available

**PM2 (VPS):**
```bash
pm2 logs evs-frontend
pm2 monit
```

### Error Tracking

Consider integrating:
- Sentry (error tracking)
- LogRocket (session replay)
- Google Search Console (SEO monitoring)

## 🔄 Updates & Maintenance

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest

# Test after updates
npm run build
npm run test  # If tests exist
```

### Version Updates

1. Update `package.json` version
2. Update `CHANGELOG.md`
3. Update `README.md`
4. Commit and tag:
   ```bash
   git add .
   git commit -m "chore: bump version to x.x.x"
   git tag vx.x.x
   git push origin main --tags
   ```

### Backup Strategy

**What to Backup:**
- Database (Redis exports)
- Environment variables
- Uploaded files (if any)
- Configuration files
- SSL certificates (VPS only)

**Frequency:**
- Daily: Database
- Weekly: Full system backup
- Before updates: Complete backup

## 🆘 Troubleshooting

### Build Failures

**Error: Environment validation failed**
```
Solution:
1. Check .env.local file exists
2. Verify all required variables are set
3. Check variable formats (email, numbers, booleans)
4. See lib/env.ts for validation rules
```

**Error: Module not found**
```
Solution:
1. Delete node_modules and package-lock.json
2. Run npm install
3. Rebuild: npm run build
```

### Runtime Errors

**Error: SMTP connection failed**
```
Solution:
1. Verify SMTP credentials
2. Check SMTP_HOST and SMTP_PORT
3. Ensure firewall allows outbound SMTP
4. Test with telnet: telnet smtp.host.com 465
```

**Error: PayPal API error**
```
Solution:
1. Verify PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET
2. Check PAYPAL_MODE matches credentials (sandbox vs live)
3. Ensure account is approved for live transactions
```

**Error: Redis connection timeout**
```
Solution:
1. Verify UPSTASH_REDIS_REST_URL and token
2. Check Upstash dashboard for database status
3. Verify IP whitelist (if configured)
```

### Performance Issues

**Slow page loads**
```
Solutions:
1. Enable CDN caching
2. Optimize images (use WebP)
3. Enable compression (Gzip/Brotli)
4. Check database query performance
```

**High memory usage**
```
Solutions:
1. Increase server RAM (min 2GB recommended)
2. Enable swap memory
3. Optimize build output
4. Review memory leaks in custom code
```

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Configuration](https://nginx.org/en/docs/)

## 🆘 Support

For deployment assistance:
- **Email**: info@evervibestudios.com
- **Repository Issues**: https://github.com/evervibe/evs-next-basic-web/issues
- **Documentation**: https://basic.evervibestudios.com

---

**Version**: 1.6.0  
**Last Updated**: 2025-01-15  
**Author**: EverVibe Studios

**Note**: This template is production-ready but should be customized to your specific needs. Always test thoroughly before deploying to production.
