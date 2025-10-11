# EVS Basic Web - Landing Page Template v1.6.3

**EverVibe Studios** - Premium Next.js-Vorlage für deutsche Landing Pages, erstellt mit Next.js 15, React 19 und Tailwind CSS 4.

> **Neu in v1.6.3:** Lazy ENV Validation für Build-Stabilität, automatische Gesundheitsprüfung, PayPal-Integration und Lizenzsystem.

> **Hinweis:** Dieses Template enthält Platzhaltertexte für Impressum, Datenschutz, AGB und Cookie-Richtlinie. Bitte passen Sie diese an Ihre spezifischen Anforderungen an.

## 🚀 Features

- ✅ **Moderne Technologien**: Next.js 15 mit App Router, React 19, TypeScript 5
- ✅ **Vollständig auf Deutsch**: Alle Inhalte und rechtliche Seiten in deutscher Sprache
- ✅ **Responsives Design**: Mobile-First-Ansatz, funktioniert auf allen Geräten
- ✅ **SEO-optimiert**: Meta-Tags, Open Graph, Sitemap, robots.txt, PWA Manifest, JSON-LD Strukturdaten
- ✅ **GDPR-konform**: Consent-Banner mit granularen Einstellungen, 30-Tage-Ablauf, LocalStorage-basiert
- ✅ **Dark Mode Toggle**: Voll funktionsfähiger Hell/Dunkel-Modus mit System-Präferenz-Erkennung, localStorage-Persistenz & FOUC-Prevention
- ✅ **Framer Motion Animationen**: Sanfte Fade-Ins und Hover-Effekte
- ✅ **Typsicher**: TypeScript Strict Mode aktiviert
- ✅ **Zod Validierung**: Echtzeit-Formularvalidierung mit aussagekräftigen Fehlermeldungen
- ✅ **Umgebungsvariablen-Validierung**: Zod-basierte Runtime-Validierung für sichere Konfiguration
- ✅ **Security Headers**: Content-Security-Policy, X-Frame-Options, Referrer-Policy und mehr
- ✅ **Testimonials**: Social Proof mit Kundenbewertungen
- ✅ **Scroll-to-Top**: Eleganter Button für bessere Navigation
- ✅ **Rechtlich vollständig**: Impressum, Datenschutz, AGB, Cookie-Richtlinie
- ✅ **DSGVO-konform**: Consent-Banner + Kontaktformular mit Datenschutz-Checkbox & Vercel Analytics (cookieless)
- ✅ **Vercel Analytics**: DSGVO-konforme Web Analytics ohne Cookies integriert
- ✅ **Fehlerseiten**: Deutsche 404- und Fehlerseiten
- ✅ **Produktionsbereit**: Optimierter Build, bereit für Deployment
- ✅ **Payment Integration**: PayPal REST API für Lizenzen und digitale Produkte
- ✅ **License System**: Kryptographische Lizenzgenerierung mit Redis-Speicherung
- ✅ **Download Portal**: Sichere Downloads mit JWT-Token-Validierung

## 📦 Inhalt

### Sektionen
- **Header**: Responsive Navigation mit Mobile-Menü und Dark Mode Toggle
- **Hero**: Ansprechende Landing Section mit animierten CTAs
- **Über uns**: Unternehmensinformationen und Tech Stack
- **Funktionen**: 6 Haupt-Features mit Hover-Animationen
- **Testimonials**: 3 Kundenbewertungen mit 5-Sterne-System
- **Kontakt**: Validiertes Kontaktformular mit Echtzeit-Feedback
- **Footer**: Links zu rechtlichen Seiten und echte Social Media Links
- **Scroll-to-Top**: Erscheint ab 600px Scrollhöhe

### Rechtliche Seiten
- **Impressum** (`/impressum`): Anbieterkennzeichnung gemäß § 5 TMG
- **Datenschutz** (`/datenschutz`): Erweiterte Datenschutzerklärung mit Kontaktformular-Hinweisen
- **AGB** (`/agb`): Allgemeine Geschäftsbedingungen
- **Cookie-Richtlinie** (`/cookie`): Informationen zur Cookie-Verwendung

### Technische Features
- Statische Generierung für optimale Performance
- System-Schriftarten (keine externen Abhängigkeiten)
- Smooth-Scroll-Navigation
- Framer Motion Animationen (Hero, Features, Testimonials)
- Barrierefreie Komponenten
- Sauberer, wartbarer Code
- Deutsche 404- und Fehlerseiten
- Dark Mode mit localStorage-Persistenz
- Zod Schema-Validierung für Formulare

## 🛠️ Erste Schritte

### Voraussetzungen
- Node.js 18+ 
- npm, yarn oder pnpm

### Installation

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Für Produktion bauen
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Projektstruktur

```
frontend/
├── app/
│   ├── layout.tsx          # Root-Layout mit Metadaten
│   ├── page.tsx            # Haupt-Landing-Page
│   ├── globals.css         # Globale Styles
│   ├── sitemap.ts          # SEO Sitemap
│   ├── opengraph-image.tsx # OG-Image-Generierung
│   ├── not-found.tsx       # 404-Seite
│   ├── error.tsx           # Fehlerseite
│   ├── impressum/          # Impressum
│   ├── datenschutz/        # Datenschutzerklärung
│   ├── agb/                # AGB
│   └── cookie/             # Cookie-Richtlinie
├── components/
│   ├── Header.tsx          # Navigation
│   ├── Hero.tsx            # Hero-Sektion
│   ├── About.tsx           # Über-uns-Sektion
│   ├── Features.tsx        # Funktionen-Sektion
│   ├── Contact.tsx         # Kontaktformular
│   └── Footer.tsx          # Footer
├── public/
│   └── robots.txt          # SEO-Konfiguration
├── docs/
│   ├── CHANGELOG.md        # Versionsverlauf
│   └── agent_logs/         # Entwicklungslogs
└── LICENSE                 # EVS Custom License
```

## 🎨 Anpassung

### Branding
Bearbeiten Sie folgende Dateien zur Anpassung:
- `app/layout.tsx` - Metadaten aktualisieren (Titel, Beschreibung)
- `components/Header.tsx` - Logo und Navigation aktualisieren
- `components/Footer.tsx` - Firmeninfo und Links aktualisieren

### Styling
- Tailwind CSS-Klassen durchgehend verwendet
- Globale Styles in `app/globals.css`
- Farbschema verwendet Blau-Lila-Verläufe

### Inhalt
Alle Inhalte befinden sich in den Komponentendateien. Text direkt bearbeiten in:
- `components/Hero.tsx` - Hero-Inhalte
- `components/About.tsx` - Über-uns-Inhalte
- `components/Features.tsx` - Funktionsliste
- `components/Contact.tsx` - Kontaktinformationen

### Rechtliche Seiten
Passen Sie die Platzhaltertexte in folgenden Dateien an:
- `app/impressum/page.tsx` - Ihre Firmendaten eintragen
- `app/datenschutz/page.tsx` - An Ihre Datenschutzpraktiken anpassen
- `app/agb/page.tsx` - Ihre spezifischen AGB eintragen
- `app/cookie/page.tsx` - Cookie-Verwendung dokumentieren

## 🚀 Deployment

### Vercel (Empfohlen)

**Wichtig:** Bei Vercel-Deployment setzen Sie das **Root Directory** auf `frontend`.

```bash
# Vercel CLI installieren
npm i -g vercel

# Im frontend-Ordner deployen
cd frontend
vercel --prod
```

Oder über Vercel Dashboard:
1. Neues Projekt erstellen
2. GitHub Repository verbinden
3. **Root Directory** auf `frontend` setzen
4. Deploy starten

### Andere Plattformen
1. Projekt bauen: `npm run build`
2. Den `.next`-Ordner zu Ihrem Hosting-Anbieter deployen
3. Sicherstellen, dass Node.js 18+ auf dem Server verfügbar ist

### Domain-Konfiguration
Die Website ist für die Domain `https://basic.evervibestudios.com` konfiguriert.
Bei Änderung der Domain aktualisieren Sie:
- `app/layout.tsx` - `metadataBase`
- `app/sitemap.ts` - `baseUrl`
- `public/robots.txt` - Sitemap-URL

## 📄 Lizenz & Nutzung

Dieses Projekt ist unter der **EVS Proprietary License** (EVS Custom License v1.0) lizenziert - siehe [LICENSE](LICENSE) für Details.

**Wichtig:** 
- Die Lizenz erlaubt die Nutzung und Anpassung für eigene Projekte
- Attribution zu EverVibe Studios ist erforderlich
- Weiterverkauf als eigenständiges Produkt ist nicht gestattet
- Für kommerzielle Nutzung lesen Sie bitte die vollständige Lizenz

## 🤝 Beitragen

Dies ist ein proprietäres Template von EverVibe Studios. Für Fragen oder Support:
- E-Mail: info@evervibestudios.com
- Website: https://basic.evervibestudios.com

## 📚 Dokumentation

### Template-spezifisch (v1.6.3)
- [SEO Setup Guide](docs/SEO_SETUP.md) - Komplette SEO-Implementierung
- [GDPR Consent Layer](docs/CONSENT_LAYER_SETUP.md) - DSGVO-Consent-Management
- [Deployment Guide](docs/DEPLOYMENT_TEMPLATE_1.6.0.md) - Vercel, Render & VPS
- [Environment Variables](ENV_VALIDATION_REPORT.md) - Umgebungsvariablen-Dokumentation
- [Build Stability](BUILD_STABILITY_TEST.md) - Build-Stabilitätstests
- [Changelog](docs/CHANGELOG.md) - Versionsverlauf

### Framework-Dokumentation
- [Next.js Dokumentation](https://nextjs.org/docs)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [TypeScript Dokumentation](https://www.typescriptlang.org/docs/)

## 📊 Versionsverlauf

**Aktuell**: v1.6.3 (2025-01-10) - Build Stability & Monetization

**Highlights v1.6.3:**
- 🔧 Lazy ENV validation for build stability
- 💰 PayPal integration for license sales
- 🔑 Cryptographic license system with Redis storage
- 🔍 Automated health monitoring (Live Guard)
- ✅ Zero breaking changes, backward compatible
- 📚 Comprehensive documentation and test reports

Siehe [CHANGELOG.md](docs/CHANGELOG.md) für den vollständigen Versionsverlauf.

---

**Entwickelt mit ❤️ von EverVibe Studios**
- Inhaber: Nenad Trujanovic
- Hamburg, Deutschland
