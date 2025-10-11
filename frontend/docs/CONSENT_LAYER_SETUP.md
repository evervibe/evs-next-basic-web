# EVS Template v1.6.0 - GDPR Consent Layer Setup

## 📋 Overview

This guide documents the GDPR-compliant consent management system implemented in the EVS Next.js template. The consent layer provides transparent cookie and data processing information while maintaining compliance with EU data protection regulations.

## 🎯 Features

### ✅ Implemented Features

- **Cookie Consent Banner**: Customizable consent UI with dark mode support
- **LocalStorage-Based**: No server-side dependencies or databases required
- **Granular Controls**: Users can accept/reject individual cookie categories
- **Cookieless Analytics**: Vercel Analytics integration (GDPR-compliant, no cookies)
- **30-Day Expiry**: Consent expires after 30 days, prompting renewal
- **Version Management**: Consent version tracking for policy updates
- **Animated UI**: Smooth Framer Motion transitions
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Accessibility**: Keyboard navigation and screen reader support

## 📁 File Structure

```
frontend/
├── components/
│   └── ConsentBanner.tsx       # Main consent component
├── app/
│   ├── layout.tsx              # ConsentBanner integration
│   ├── datenschutz/page.tsx    # Privacy policy
│   └── cookie/page.tsx         # Cookie policy
└── docs/
    └── CONSENT_LAYER_SETUP.md  # This file
```

## 🔧 Implementation

### 1. ConsentBanner Component

**Location**: `components/ConsentBanner.tsx`

The ConsentBanner component provides a complete GDPR consent management solution:

```typescript
import ConsentBanner from "@/components/ConsentBanner";

// In your layout
<ConsentBanner />
```

**Features:**
- Simple banner view with "Accept All" / "Reject Optional" / "Customize"
- Detailed settings view with per-category toggles
- LocalStorage persistence
- Automatic expiry after 30 days
- Version management for policy updates

### 2. Integration in Layout

**Location**: `app/layout.tsx`

```typescript
import ConsentBanner from "@/components/ConsentBanner";

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
```

The banner appears at the bottom of every page until consent is given.

### 3. Cookie Categories

#### Notwendige Cookies (Required)
- **Purpose**: Essential for website functionality
- **Control**: Always active, cannot be disabled
- **Examples**: Session management, theme preferences, consent state
- **Storage**: LocalStorage only
- **Expiry**: Varies by function

#### Analytics Cookies (Optional)
- **Purpose**: Understand how users interact with the site
- **Control**: User can opt-in or opt-out
- **Implementation**: Vercel Analytics (cookieless)
- **Data Collected**: Page views, referrers, anonymous usage patterns
- **No Personal Data**: No IP addresses, no user identification
- **GDPR Compliant**: No cookies stored

## 🗄️ Consent Storage

### LocalStorage Schema

```typescript
interface ConsentState {
  analytics: boolean;        // Analytics opt-in
  functional: boolean;       // Always true (required)
  timestamp: number;         // Unix timestamp
  version: string;           // Consent version (e.g., "1.0")
}
```

**Storage Key**: `evs-consent`

**Example**:
```json
{
  "analytics": true,
  "functional": true,
  "timestamp": 1705315200000,
  "version": "1.0"
}
```

### Consent Lifecycle

1. **First Visit**: Banner appears after 1 second delay
2. **User Choice**: User accepts/rejects/customizes
3. **Stored**: Consent saved to LocalStorage
4. **Applied**: Preferences applied immediately
5. **Expires**: After 30 days, banner reappears
6. **Version Update**: Banner reappears if consent version changes

## 🎨 UI Components

### Simple Banner View

- **Header**: "🍪 Cookie-Einstellungen"
- **Description**: Brief explanation with emphasis on cookieless analytics
- **Actions**: 
  - "Anpassen" (Customize)
  - "Nur Notwendige" (Required only)
  - "Alle akzeptieren" (Accept all)

### Detailed Settings View

- **Header**: "Cookie-Einstellungen anpassen" with close button
- **Necessary Cookies**: Always active indicator
- **Analytics Cookies**: Toggle switch with description
- **Links**: Privacy policy and cookie policy
- **Actions**:
  - "Nur Notwendige" (Required only)
  - "Auswahl speichern" (Save selection)

### Styling

- **Colors**: Matches site theme (blue/purple gradient)
- **Dark Mode**: Full support with automatic switching
- **Animation**: Slide-up from bottom with fade
- **Position**: Fixed bottom, full width
- **Shadow**: Elevated appearance with border

## 🔌 Analytics Integration

### Vercel Analytics (Cookieless)

**Location**: `app/layout.tsx`

```typescript
import { Analytics } from "@vercel/analytics/react";

{process.env.NODE_ENV === "production" && <Analytics />}
```

**GDPR Compliance:**
- ✅ No cookies stored
- ✅ No personal data collected
- ✅ Anonymous aggregated data only
- ✅ EU-based data storage
- ✅ GDPR-compliant by design

**What's Tracked:**
- Page views
- Page load times
- Referrer information
- Browser and device type (aggregated)

**What's NOT Tracked:**
- Personal information
- IP addresses
- User identification
- Cross-site tracking
- Third-party data sharing

## 🔒 Privacy & Security

### Data Minimization

- **No Server Storage**: All consent data stored client-side only
- **No Cookies**: Uses LocalStorage instead of cookies
- **No External Services**: Self-contained, no third-party consent SDKs
- **No Personal Data**: Analytics are completely anonymous

### User Rights (GDPR Articles 7, 12-22)

- **Right to Information**: Clear explanation of what data is collected
- **Right to Consent**: Explicit opt-in required for optional cookies
- **Right to Withdraw**: Easy to change preferences at any time
- **Right to Access**: Users can view stored consent via browser DevTools
- **Right to Deletion**: Clearing browser data removes all consent

### Consent Requirements

✅ **Freely Given**: User can reject optional cookies without consequences  
✅ **Specific**: Separate consent for different categories  
✅ **Informed**: Clear description of each category  
✅ **Unambiguous**: Explicit accept/reject actions required  
✅ **Revocable**: Users can change preferences anytime  

## 🛠️ Customization

### Adding New Cookie Categories

1. Update ConsentState interface:
```typescript
interface ConsentState {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;  // New category
  timestamp: number;
}
```

2. Add toggle in ConsentBanner:
```tsx
<div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
  <h4>Marketing Cookies</h4>
  <input
    type="checkbox"
    checked={consent.marketing}
    onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
  />
</div>
```

3. Update consent logic:
```typescript
const applyConsent = (consentState: ConsentState) => {
  if (consentState.marketing) {
    // Enable marketing scripts
  }
};
```

### Changing Consent Expiry

Edit the expiry check in `ConsentBanner.tsx`:

```typescript
// Change from 30 days to 90 days
const ninetyDaysInMs = 90 * 24 * 60 * 60 * 1000;
const isExpired = Date.now() - parsed.timestamp > ninetyDaysInMs;
```

### Updating Consent Version

When privacy policy changes require new consent:

1. Update version in `ConsentBanner.tsx`:
```typescript
const CONSENT_VERSION = "2.0";  // Changed from "1.0"
```

2. All users will see the banner again on next visit

### Styling Customization

The ConsentBanner uses Tailwind CSS classes. Customize colors:

```tsx
// Change gradient colors
className="bg-gradient-to-r from-green-600 to-teal-600"

// Change background
className="bg-white dark:bg-gray-800"
```

## 🔌 useConsent Hook

Access consent state from any component:

```typescript
import { useConsent } from "@/components/ConsentBanner";

function MyComponent() {
  const consent = useConsent();
  
  if (consent?.analytics) {
    // User has opted into analytics
  }
}
```

## 📋 Legal Requirements Checklist

### GDPR Compliance (EU)

- [x] **Art. 7**: Valid consent obtained
- [x] **Art. 12**: Transparent information provided
- [x] **Art. 13**: Purpose of processing explained
- [x] **Art. 21**: Right to object honored
- [x] **Recital 32**: Consent freely given, specific, informed

### ePrivacy Directive (Cookie Law)

- [x] **Prior Consent**: Obtained before non-essential cookies
- [x] **Clear Information**: Purpose explained in plain language
- [x] **Easy Withdrawal**: Can change settings anytime
- [x] **No Pre-Ticked Boxes**: Explicit opt-in required

### Documentation Requirements

- [x] **Privacy Policy**: Updated with consent mechanism (`/datenschutz`)
- [x] **Cookie Policy**: Detailed cookie information (`/cookie`)
- [x] **Consent Records**: Stored in LocalStorage (user-accessible)

## 🧪 Testing

### Manual Testing

1. **First Visit**:
   - Clear browser storage
   - Reload page
   - Verify banner appears after 1 second

2. **Accept All**:
   - Click "Alle akzeptieren"
   - Verify banner disappears
   - Check LocalStorage for consent record

3. **Reject Optional**:
   - Click "Nur Notwendige"
   - Verify analytics: false in storage

4. **Customize**:
   - Click "Anpassen"
   - Toggle switches
   - Click "Auswahl speichern"
   - Verify preferences saved

5. **Expiry**:
   - Modify timestamp in LocalStorage (set to 31 days ago)
   - Reload page
   - Verify banner reappears

6. **Version Change**:
   - Modify version in LocalStorage
   - Reload page
   - Verify banner reappears

7. **Dark Mode**:
   - Toggle dark mode
   - Verify banner styling adapts

### Development Testing

```bash
# Check LocalStorage in browser console
localStorage.getItem('evs-consent')

# Clear consent to test again
localStorage.removeItem('evs-consent')

# Check analytics loading
console.log(window.va)  // Vercel Analytics object
```

## 📊 Monitoring & Analytics

### Consent Metrics

Track consent acceptance rates (if analytics enabled):

- Banner shown
- Accept all clicks
- Reject optional clicks
- Customize clicks
- Category-specific opt-ins

Note: This requires implementing your own analytics events.

## 🔄 Updates & Maintenance

### When to Update Consent Version

- Privacy policy changes
- New cookie categories added
- Changes to data processing
- New third-party services
- Changes to data retention

### Updating Privacy Policy

1. Update `/app/datenschutz/page.tsx`
2. Increment consent version
3. Users will see banner on next visit

### Updating Cookie Policy

1. Update `/app/cookie/page.tsx`
2. Ensure all cookies are documented
3. Include purpose, expiry, category

## 📚 Resources

- [GDPR Full Text](https://gdpr-info.eu/)
- [ePrivacy Directive](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32002L0058)
- [Vercel Analytics GDPR](https://vercel.com/docs/analytics/privacy-policy)
- [Cookie Consent Best Practices](https://www.cookiebot.com/en/gdpr-cookies/)

## 🆘 Support

For consent layer questions or issues:
- **Email**: info@evervibestudios.com
- **Repository**: https://github.com/evervibe/evs-next-basic-web
- **Legal Advice**: Consult with a qualified legal professional for specific compliance requirements

---

**Version**: 1.6.0  
**Last Updated**: 2025-01-15  
**Author**: EverVibe Studios

**Disclaimer**: This documentation provides technical implementation guidance. For legal compliance advice, please consult with a qualified attorney specializing in data protection law.
