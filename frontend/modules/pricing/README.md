# EVS Pricing Module

Complete pricing and checkout system for EverVibe Studios template monetization.

## Components

### PricingSection
Main pricing page with complete purchase flow.

**Usage:**
```typescript
import { PricingSection } from "@/modules/pricing";

export default function PricingPage() {
  return <PricingSection />;
}
```

### LicenseCard
Individual license card component.

**Props:**
```typescript
{
  type: "single" | "agency"
  price: number
  features: string[]
  isPopular?: boolean
  onPurchase: (type: LicenseType) => void
  isLoading?: boolean
}
```

### PaymentHandler
PayPal SDK integration wrapper.

**Props:**
```typescript
{
  licenseType: LicenseType | null
  email: string
  onSuccess: (licenseKey: string) => void
  onError: (error: string) => void
  onCancel: () => void
}
```

## Features

- 💳 PayPal checkout integration
- 📧 Automatic email delivery
- 🔐 Secure payment processing
- 🎨 Dark mode support
- 📱 Responsive design
- ✨ Smooth animations
- ⚡ Fast loading

## License Types

### Single License - €29
- One project usage
- 6 months support
- Lifetime updates

### Agency License - €79
- Unlimited client projects
- Priority support
- Lifetime updates
- Whitelabel rights

## Environment Variables

```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
```

## Integration

1. Import PricingSection component
2. Add to your page
3. Configure PayPal environment variables
4. Test with sandbox mode first

## Testing

```bash
npm run test:license
```

## Documentation

See [FRONTEND_V1.5.0_MONETIZATION.md](../../docs/agent_logs/2025-10-08/FRONTEND_V1.5.0_MONETIZATION.md) for complete documentation.
