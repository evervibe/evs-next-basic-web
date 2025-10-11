# GitHub Workflows

This directory contains automated workflows for the EVS project.

## 📋 Available Workflows

### EVS Live Guard (`health-check.yml`)

**Purpose**: Automated health monitoring for the frontend application.

**Schedule**: Every 12 hours (00:00 and 12:00 UTC)

**What it checks**:
- ✅ SMTP connection (ssl0.ovh.net:465)
- ✅ Contact API endpoint (/api/contact)
- ✅ Frontend health endpoint (/api/health)
- ✅ Environment variable consistency

**Manual Trigger**:
1. Go to the "Actions" tab in GitHub
2. Select "EVS Live Guard" workflow
3. Click "Run workflow" button

**Outputs**:
- Health reports saved to `frontend/docs/agent_logs/YYYY-MM-DD_LIVE_GUARD.md`
- Email alerts sent to info@evervibestudios.com on failures
- Optional Discord/Slack webhook notifications

**Required Secrets**:
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_SECURE` - Use TLS/SSL (true/false)
- `SMTP_USER` - SMTP authentication username
- `SMTP_PASS` - SMTP authentication password

**Optional Secrets**:
- `DISCORD_WEBHOOK_URL` - Discord webhook for alerts
- `SLACK_WEBHOOK_URL` - Slack webhook for alerts

---

## 🔧 Configuration

To add or update secrets:

1. Go to repository Settings
2. Navigate to Secrets and variables → Actions
3. Add or update the required secrets

---

## 📊 Monitoring

View workflow runs:
- Go to the "Actions" tab in GitHub
- Click on "EVS Live Guard" to see run history
- Each run shows detailed logs and results

---

## 🚀 Version

**Current Version**: v1.4.1  
**Last Updated**: 2025-10-08  
**Documentation**: See `frontend/docs/agent_logs/`
