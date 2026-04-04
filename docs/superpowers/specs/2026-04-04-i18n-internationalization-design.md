# Wafia — Internationalization (i18n) Design Spec

## Overview

Add multi-language support to the Wafia website using `next-intl` with a subdomain-based routing strategy. French remains the default language; English and Spanish are added. Translations will be provided manually by the team.

## Languages & Routing

| Language | Domain | Locale |
|----------|--------|--------|
| Francais (defaut) | `wafia.co` | `fr` |
| English | `en.wafia.co` | `en` |
| Espanol | `es.wafia.co` | `es` |

URLs remain identical across subdomains (`/services`, `/studio`, etc.). No path-based locale prefix.

## Library

**`next-intl`** — chosen for native Next.js App Router support, subdomain routing, SSR compatibility, and typed translation keys.

### Dependencies to add

- `next-intl` (runtime)
- `next-intl/plugin` (build-time, via `next.config.ts`)

## File Structure

```
/messages
  ├── fr.json          # Source of truth — all French text
  ├── en.json          # Same keys, empty values for team to fill
  └── es.json          # Same keys, empty values for team to fill

/src
  ├── /i18n
  │   └── request.ts   # next-intl request config (locale resolution, message loading)
  ├── middleware.ts     # Subdomain-based locale detection
  └── ...existing
```

## Translation File Structure (Namespaces)

Each JSON file follows this namespace structure:

```json
{
  "navigation": {
    "services": "...",
    "studio": "...",
    "achievements": "...",
    "forBrands": "...",
    "forTalents": "..."
  },
  "home": {
    "hero": {},
    "blocks": {}
  },
  "forBrands": {
    "meta": { "title": "...", "description": "..." },
    "hero": { "badge": "...", "titleLine1": "...", "titleHighlight": "...", "subtitle": "..." },
    "stats": {},
    "valueProposition": {},
    "caseStudies": {},
    "process": {},
    "comparison": {},
    "compliance": {},
    "faq": {},
    "cta": {}
  },
  "forTalents": {
    "meta": {},
    "hero": {},
    "core": {},
    "services": {},
    "timeline": {},
    "method": {},
    "proof": {},
    "persona": {},
    "faq": {},
    "deliverables": {},
    "os": {},
    "pillars": {}
  },
  "services": {
    "meta": {},
    "hero": {},
    "items": {},
    "faq": {}
  },
  "studio": {
    "meta": {},
    "hero": {},
    "productions": {}
  },
  "team": {
    "meta": {},
    "title": "...",
    "members": {}
  },
  "legal": {
    "privacy": {},
    "mentions": {},
    "cookies": {}
  },
  "common": {
    "cta": { "contact": "...", "learnMore": "..." },
    "footer": {},
    "errors": { "notFound": "...", "serverError": "..." },
    "cookieBanner": {}
  }
}
```

## Middleware Configuration

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  localeDetection: false,
  domains: [
    { domain: 'wafia.co', defaultLocale: 'fr' },
    { domain: 'en.wafia.co', defaultLocale: 'en' },
    { domain: 'es.wafia.co', defaultLocale: 'es' }
  ]
});

export const config = {
  matcher: ['/((?!api|admin|questionnaire|_next|.*\\..*).*)']
};
```

**Excluded from i18n**: `/api/*`, `/admin/*`, `/questionnaire/*`, static files, `_next`.

## next-intl Request Config

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'fr';
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Europe/Paris',
    formats: {
      dateTime: {
        short: { day: 'numeric', month: 'short', year: 'numeric' }
      },
      number: {
        currency: { style: 'currency', currency: 'EUR' }
      }
    }
  };
});
```

## Next.js Config Integration

```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl({
  // ... existing config preserved
});
```

## Root Layout Integration

```typescript
// src/app/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## Component Translation Pattern

### Client Components

```typescript
import { useTranslations } from 'next-intl';

export function BrandHero() {
  const t = useTranslations('forBrands.hero');
  return <h1>{t('titleLine1')} <em>{t('titleHighlight')}</em></h1>;
}
```

### Server Components

```typescript
import { getTranslations } from 'next-intl/server';

export default async function ServicesPage() {
  const t = await getTranslations('services');
  return <h1>{t('hero.title')}</h1>;
}
```

## Metadata (SEO)

Every public page generates metadata dynamically with `hreflang` alternates:

```typescript
export async function generateMetadata() {
  const t = await getTranslations('services.meta');
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://wafia.co/services',
      languages: {
        fr: 'https://wafia.co/services',
        en: 'https://en.wafia.co/services',
        es: 'https://es.wafia.co/services',
      }
    }
  };
}
```

## Constants Migration Strategy

Existing constants in `/src/constants/` are transformed from hardcoded text to translation keys:

**Before:**
```typescript
export const BRAND_HERO_CONTENT = {
  badge: "Creative Studio & Talent Powerhouse",
  title: { line1: "L'influence marketing", highlight: "qui performe vraiment." },
};
```

**After:**
```typescript
export const BRAND_HERO_KEYS = {
  badge: 'forBrands.hero.badge',
  title: { line1: 'forBrands.hero.titleLine1', highlight: 'forBrands.hero.titleHighlight' },
} as const;
```

Components then use `t(BRAND_HERO_KEYS.badge)` to resolve the translated value.

## Language Switcher Component

A `LanguageSwitcher` component in the global navigation (excluded from admin):

- Displays: FR / EN / ES
- Each link points to the same path on the target subdomain
- Example: on `en.wafia.co/services`, clicking FR navigates to `wafia.co/services`
- Preserves current page path on language switch

## Scope

### Translated

- Homepage (home hero, blocks, CTA)
- Services page
- Studio page
- For Brands page (all sections)
- For Talents page (all sections)
- Team page (`/equipe`)
- Legal pages (privacy, mentions, cookies)
- Navigation (main nav + footer)
- Metadata SEO (title, description, OG tags) for all public pages
- Error pages (404, 500)
- Cookie banner
- Language switcher component

### Not Translated (excluded)

- Admin dashboard (`/admin/*`)
- API routes (`/api/*`)
- Questionnaires (`/questionnaire/*`)
- Wiki content (structure ready, content stays FR-only for now)

## Translation Workflow

1. `fr.json` is the source of truth — all keys defined here first
2. `en.json` and `es.json` have identical keys with empty string values `""`
3. Team fills in translations manually
4. Missing translations fall back to French (next-intl default behavior)

## Structured Data & SEO

- `robots.ts` and `sitemap.ts` updated to include all subdomain URLs
- `hreflang` tags on every public page
- `manifest.ts` locale-aware
- Structured data in `structured-data.ts` uses translated values

## Development & Testing

- Local development: use `localhost:3000` for FR, configure `/etc/hosts` for subdomain testing
- Type safety: `next-intl` provides typed keys via namespace inference
- Fallback: missing keys fall back to French text (no broken UI)
