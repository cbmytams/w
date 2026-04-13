# Design System Finalization + i18n Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finalize the last 5 design system issues (3 critical, 1 important, 1 cleanup) and implement full i18n internationalization with next-intl (FR/EN/ES via subdomains).

**Architecture:** Two phases — Phase A closes out the design system unification (5 tasks), Phase B adds i18n infrastructure then migrates all content (12 tasks). Phase A must complete before Phase B starts because i18n will touch the same files.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, TypeScript, next-intl

---

## Phase A: Design System Finalization

### Task 1: Remove Studio from navigation + add redirect

**Files:**
- Modify: `src/constants/navigation.ts:10`
- Modify: `next.config.ts:86-108`

- [ ] **Step 1: Remove Studio entry from MAIN_NAVIGATION**

In `src/constants/navigation.ts`, replace lines 8-12:

```ts
export const MAIN_NAVIGATION: NavItem[] = [
    { name: "Services", href: "/services" },
    { name: "Réalisations", href: "/for-brands#case-studies" },
]
```

- [ ] **Step 2: Add /studio redirect in next.config.ts**

In `next.config.ts`, add a new redirect entry at the end of the `redirects()` array (after line 107):

```ts
      {
        source: "/studio",
        destination: "/for-brands#case-studies",
        statusCode: 301,
      },
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/constants/navigation.ts next.config.ts
git commit -m "feat: remove Studio from nav, add 301 redirect to case-studies"
```

---

### Task 2: Fix homepage dark background (#050510 → #0b111a)

**Files:**
- Modify: `src/components/home/HomeClient.tsx:22,92`

- [ ] **Step 1: Replace both #050510 occurrences**

In `src/components/home/HomeClient.tsx`:

Line 22 — replace:
```tsx
<div className="absolute inset-0 z-0 bg-[#050510]">
```
with:
```tsx
<div className="absolute inset-0 z-0 bg-[#0b111a]">
```

Line 23 — update the radial gradient endpoint to match:
```tsx
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08)_0%,rgba(236,72,153,0.06)_35%,rgba(11,17,26,1)_70%)]" />
```

Line 92 — replace:
```tsx
<div id="home-root" className="min-h-screen w-full bg-[#050510] flex flex-col relative overflow-hidden selection:bg-brand-primary/30">
```
with:
```tsx
<div id="home-root" className="min-h-screen w-full bg-[#0b111a] flex flex-col relative overflow-hidden selection:bg-brand-primary/30">
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/components/home/HomeClient.tsx
git commit -m "fix: unify homepage background to #0b111a"
```

---

### Task 3: Replace ClientsSection marquee with static grid

**Files:**
- Modify: `src/components/for-brands/ClientsSection.tsx`

- [ ] **Step 1: Rewrite ClientsSection as static grid**

Replace the entire content of `src/components/for-brands/ClientsSection.tsx`:

```tsx
"use client"

import Image from "next/image"
import { CLIENTS } from "@/constants/clients"

function LogoCard({ name, logoLight }: { name: string; logoLight: string }) {
    return (
        <div className="flex items-center justify-center p-4">
            <Image
                src={logoLight}
                alt={name}
                width={120}
                height={40}
                sizes="120px"
                className="h-8 w-auto object-contain opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            />
        </div>
    )
}

export function ClientsSection() {
    return (
        <section id="clients" className="py-12 md:py-16 relative z-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-8 items-center">
                    {CLIENTS.map((client) => (
                        <LogoCard key={client.name} name={client.name} logoLight={client.logoLight} />
                    ))}
                </div>
            </div>
        </section>
    )
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/components/for-brands/ClientsSection.tsx
git commit -m "feat: replace client marquee with static logo grid"
```

---

### Task 4: Fix hardcoded spring in TalentJourneySection

**Files:**
- Modify: `src/components/for-talents/TalentJourneySection.tsx:91`

- [ ] **Step 1: Add SPRING import**

At the top of `src/components/for-talents/TalentJourneySection.tsx`, add:

```ts
import { SPRING } from "@/lib/design-tokens"
```

- [ ] **Step 2: Replace hardcoded spring values**

Line 91 — replace:
```tsx
transition={{ type: "spring", stiffness: 400, damping: 30 }}
```
with:
```tsx
transition={{ type: "spring", ...SPRING.responsive }}
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/components/for-talents/TalentJourneySection.tsx
git commit -m "fix: use SPRING.responsive token in TalentJourneySection"
```

---

### Task 5: Clean up dead code + minor issues

**Files:**
- Modify: `src/constants/brand-additions.ts:34-68`
- Modify: `src/constants/index.ts:43`
- Modify: `src/constants/legacy.ts` (remove AUTHENTICITY_CARDS re-export)

- [ ] **Step 1: Verify AuthenticitySection is not rendered anywhere**

Run: `grep -rn "AuthenticitySection" src/app/ --include="*.tsx"`
Expected: No matches (already confirmed — the component file exists but is not imported in any page)

- [ ] **Step 2: Remove AUTHENTICITY_CARDS from brand-additions.ts**

In `src/constants/brand-additions.ts`, delete lines 34-68 (the entire `AUTHENTICITY_CARDS` export).

- [ ] **Step 3: Remove AUTHENTICITY_CARDS from barrel exports**

In `src/constants/index.ts`, remove `AUTHENTICITY_CARDS` from the legacy re-export (line 43).

In `src/constants/legacy.ts`, find and remove the `AUTHENTICITY_CARDS` re-export line.

- [ ] **Step 4: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add src/constants/brand-additions.ts src/constants/index.ts src/constants/legacy.ts
git commit -m "chore: remove AUTHENTICITY_CARDS dead code"
```

---

## Phase B: i18n Internationalization

### Task 6: Install next-intl + create i18n infrastructure

**Files:**
- Modify: `package.json`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Install next-intl**

Run: `cd ~/Desktop/"wafia - website" && npm install next-intl`

- [ ] **Step 2: Create routing configuration**

Create `src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["fr", "en", "es"],
  defaultLocale: "fr",
  localeDetection: false,
  domains: [
    { domain: "wafia.co", defaultLocale: "fr" },
    { domain: "en.wafia.co", defaultLocale: "en" },
    { domain: "es.wafia.co", defaultLocale: "es" },
  ],
})

export type Locale = (typeof routing.locales)[number]
```

- [ ] **Step 3: Create request configuration**

Create `src/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as "fr" | "en" | "es")) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: "Europe/Paris",
    formats: {
      dateTime: {
        short: { day: "numeric", month: "short", year: "numeric" },
      },
      number: {
        currency: { style: "currency", currency: "EUR" },
      },
    },
  }
})
```

- [ ] **Step 4: Create middleware**

Create `src/middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  matcher: ["/((?!api|admin|questionnaire|_next|.*\\..*).*)"],
}
```

- [ ] **Step 5: Wrap next.config.ts with next-intl plugin**

Replace `next.config.ts` — change the top and bottom:

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProd = process.env.NODE_ENV === "production";

// ... (keep all existing securityHeaders, nextConfig unchanged) ...

export default withNextIntl(nextConfig);
```

Specifically:
- Line 1: keep `import type { NextConfig } from "next";`
- After line 1: add `import createNextIntlPlugin from "next-intl/plugin";`
- After that: add `const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");`
- Last line: change `export default nextConfig;` to `export default withNextIntl(nextConfig);`

- [ ] **Step 6: Verify build**

Run: `npm run build 2>&1 | tail -10`
Expected: `Compiled successfully` (no messages loaded yet = French fallback)

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/i18n/ src/middleware.ts next.config.ts
git commit -m "feat: add next-intl infrastructure (routing, middleware, request config)"
```

---

### Task 7: Create French translation file (source of truth)

**Files:**
- Create: `messages/fr.json`

- [ ] **Step 1: Create messages directory**

Run: `mkdir -p ~/Desktop/"wafia - website"/messages`

- [ ] **Step 2: Create fr.json with all French content**

Create `messages/fr.json` by extracting all hardcoded French strings from constants and components. This is the source of truth.

```json
{
  "navigation": {
    "services": "Services",
    "achievements": "Réalisations",
    "forBrands": "Pour les Marques",
    "forTalents": "Pour les Talents",
    "skipToContent": "Aller au contenu"
  },
  "footer": {
    "legal": "Mentions légales",
    "privacy": "Politique de confidentialité",
    "cookies": "Cookies",
    "copyright": "© 2026 Wafia"
  },
  "home": {
    "meta": {
      "title": "Wafia | Influence & Creative Studio",
      "description": "Wafia, agence d'influence marketing et studio créatif. Campagnes traçables, production brand-ready."
    },
    "hero": {
      "h1": "Agence d'influence marketing – Studio créatif",
      "tagline": "Agence hybride : Influence, Talents, Studio Créatif et Stratégie. Campagnes traçables, production brand-ready.",
      "ctaBrands": "Je suis une Marque",
      "ctaTalents": "Je suis un Talent"
    },
    "options": {
      "talents": "Talents",
      "studio": "Studio",
      "brands": "Marques"
    }
  },
  "forBrands": {
    "meta": {
      "title": "Pour les Marques",
      "description": "L'influence marketing qui performe vraiment. Les bons créateurs, le bon contenu, les vrais résultats."
    },
    "hero": {
      "badge": "Creative Studio & Talent Powerhouse",
      "titleLine1": "L'influence marketing",
      "titleHighlight": "qui performe vraiment.",
      "subtitle": "Les bons créateurs. Le bon contenu. Les vrais résultats.",
      "antiMarket1": "Pas de casting au hasard : sélection cohérente, justifiée, traçable.",
      "antiMarket2": "Pas de contenu générique : co-création + prod premium, social-first.",
      "antiMarket3": "Pas d'opacité : pilotage, feedbacks, reporting clair et actionnable.",
      "stat1Value": "15+",
      "stat1Label": "Marques accompagnées",
      "stat2Value": "200+",
      "stat2Label": "Contenus produits",
      "stat3Value": "Top 3%",
      "stat3Label": "Des talents audités retenus",
      "ctaPrimary": "Voir nos réalisations",
      "ctaSecondary": "Cadrer ma campagne",
      "timing": "⏱️ 1-2 semaines pour une campagne complète."
    },
    "nav": {
      "achievements": "Réalisations",
      "method": "Méthode",
      "faq": "FAQ"
    },
    "cta": {
      "title": "Prêt à lancer votre campagne ?",
      "button": "Cadrer ma campagne"
    }
  },
  "forTalents": {
    "meta": {
      "title": "Pour les Talents",
      "description": "Votre talent. Notre infrastructure. On construit l'architecture autour de vous."
    },
    "hero": {
      "badge": "Pour les créateurs qui visent juste",
      "title": "Votre talent.",
      "titleHighlight": "Notre infrastructure.",
      "subtitle": "On construit l'architecture autour de vous — positionnement, production, business — pour que chaque contenu ait un impact, chaque deal soit juste, et chaque décision soit stratégique.",
      "ctaPrimary": "Se référencer",
      "ctaSecondary": "Notre approche",
      "proofIdentity": "Identité",
      "proofIdentityLabel": "Positionnement & image",
      "proofProduction": "Production",
      "proofProductionLabel": "Studio & pipeline",
      "proofDeals": "Deals",
      "proofDealsLabel": "Business & protection"
    },
    "problem": {
      "title": "Le talent démarre tout. Le système décide de la suite.",
      "description": "Chaque année, des milliers de créateurs émergent. La plupart plafonnent — pas par manque de talent, mais parce qu'ils n'ont aucune infrastructure derrière.",
      "tag1": "Direction floue",
      "tag2": "Production instable",
      "tag3": "Deals mal négociés",
      "tag4": "Partenariats hors-sujet",
      "conclusion": "On ne vous ajoute pas à une liste. On construit un système autour de vous."
    },
    "nav": {
      "services": "Services",
      "method": "Méthode",
      "who": "Pour qui",
      "faq": "FAQ"
    },
    "cta": {
      "title": "Prêt à passer un cap ?",
      "button": "Se référencer"
    }
  },
  "services": {
    "meta": {
      "title": "Services",
      "description": "Nos services : influence marketing, talent management, studio créatif et stratégie."
    }
  },
  "team": {
    "meta": {
      "title": "L'équipe",
      "description": "Découvrez l'équipe Wafia."
    }
  },
  "legal": {
    "privacy": {
      "title": "Politique de confidentialité"
    },
    "mentions": {
      "title": "Mentions légales"
    },
    "cookies": {
      "title": "Cookies"
    }
  },
  "common": {
    "cta": {
      "contact": "Nous contacter",
      "learnMore": "En savoir plus"
    },
    "errors": {
      "notFound": "Page non trouvée",
      "notFoundDescription": "La page que vous cherchez n'existe pas.",
      "serverError": "Erreur serveur",
      "backHome": "Retour à l'accueil"
    },
    "cookieBanner": {
      "message": "Ce site utilise des cookies pour améliorer votre expérience.",
      "accept": "Accepter",
      "decline": "Refuser"
    }
  }
}
```

**Note:** This is the initial extraction. Additional keys will be added as components are migrated in subsequent tasks. The team will fill `en.json` and `es.json` with translations.

- [ ] **Step 3: Create empty en.json and es.json skeletons**

Create `messages/en.json` and `messages/es.json` with the same structure but empty string values `""`. The team will fill these in manually.

For `messages/en.json`, copy `fr.json` and replace every French string value with `""`. Same for `messages/es.json`.

- [ ] **Step 4: Commit**

```bash
git add messages/
git commit -m "feat: add translation files (fr source of truth, en/es empty skeletons)"
```

---

### Task 8: Integrate NextIntlClientProvider into root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Make layout async and add next-intl provider**

In `src/app/layout.tsx`, add imports at the top (after existing imports):

```ts
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
```

- [ ] **Step 2: Make RootLayout async and wrap with provider**

Replace the `RootLayout` function (lines 96-130):

```tsx
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${outfit.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <BfCacheScrollRecovery />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
        >
          Aller au contenu
        </a>
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}><GlobalBackground /></Suspense>
          <GlobalNav />
          <PageTransition>{children}</PageTransition>
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Key changes:
- `export default function` → `export default async function`
- `lang="fr"` → `lang={locale}` (dynamic)
- Added `NextIntlClientProvider` wrapping all interactive content

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -10`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: integrate NextIntlClientProvider in root layout"
```

---

### Task 9: Migrate navigation constants to translation keys

**Files:**
- Modify: `src/constants/navigation.ts`
- Modify: `src/components/layout/GlobalNav.tsx` (or wherever nav is rendered)

- [ ] **Step 1: Read GlobalNav to understand current rendering**

Read `src/components/layout/GlobalNav.tsx` to see how MAIN_NAVIGATION and FOOTER_NAVIGATION are consumed.

- [ ] **Step 2: Update navigation constants to use translation keys**

In `src/constants/navigation.ts`, replace the hardcoded labels with translation key identifiers:

```ts
import type { NavItem } from "@/types"
import { Instagram, Linkedin, Music, type LucideIcon } from "lucide-react"

export const MAIN_NAVIGATION = [
    { key: "services", href: "/services" },
    { key: "achievements", href: "/for-brands#case-studies" },
] as const

export const FOOTER_NAVIGATION = [
    { key: "legal", href: "/legal/mentions" },
    { key: "privacy", href: "/legal/privacy" },
    { key: "cookies", href: "/legal/cookies" },
] as const

export interface SocialLink {
    name: string
    href: string
    icon: LucideIcon
}

export const SOCIAL_LINKS: SocialLink[] = [
    { name: "Instagram", href: "https://www.instagram.com/wafia.agency", icon: Instagram },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/wafia-agency", icon: Linkedin },
    { name: "TikTok", href: "https://www.tiktok.com/@wafia.agency", icon: Music },
]
```

- [ ] **Step 3: Update GlobalNav to use useTranslations**

In the GlobalNav component (or wherever the nav items are rendered), add:

```tsx
import { useTranslations } from "next-intl"

// Inside the component:
const t = useTranslations("navigation")

// Render nav items:
{MAIN_NAVIGATION.map((item) => (
    <Link key={item.key} href={item.href}>
        {t(item.key)}
    </Link>
))}
```

Do the same for footer navigation using `t = useTranslations("footer")`.

- [ ] **Step 4: Update the NavItem type if needed**

If the `NavItem` type in `src/types` requires a `name` field, update it to support both `name` and `key` patterns, or change the type to use `key` as the label source.

- [ ] **Step 5: Verify build**

Run: `npm run build 2>&1 | tail -10`
Expected: `Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add src/constants/navigation.ts src/components/layout/ src/types/
git commit -m "feat: migrate navigation to i18n translation keys"
```

---

### Task 10: Migrate HomeClient to i18n

**Files:**
- Modify: `src/components/home/HomeClient.tsx`
- Modify: `src/constants/home-blocks.ts` (if labels are there)

- [ ] **Step 1: Add useTranslations to HomeClient**

In `src/components/home/HomeClient.tsx`, add:

```tsx
import { useTranslations } from "next-intl"
```

Inside the `HomeClient` function, add:

```tsx
const t = useTranslations("home")
```

- [ ] **Step 2: Replace hardcoded strings**

Replace:
- Line 106: `<h1 className="sr-only">Agence d&apos;influence marketing – Studio cr&eacute;atif</h1>` → `<h1 className="sr-only">{t("hero.h1")}</h1>`
- Any French labels in HOME_OPTIONS should reference `t("options.talents")`, `t("options.studio")`, `t("options.brands")`

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/components/home/HomeClient.tsx src/constants/home-blocks.ts
git commit -m "feat: migrate HomeClient to i18n"
```

---

### Task 11: Migrate BrandHeroV2 + brand constants to i18n

**Files:**
- Modify: `src/components/for-brands/BrandHeroV2.tsx`
- Modify: `src/constants/brand-additions.ts`

- [ ] **Step 1: Read BrandHeroV2 to understand rendering**

Read `src/components/for-brands/BrandHeroV2.tsx` to see how `BRAND_HERO_CONTENT` is consumed.

- [ ] **Step 2: Add useTranslations to BrandHeroV2**

```tsx
import { useTranslations } from "next-intl"

// Inside component:
const t = useTranslations("forBrands.hero")
```

- [ ] **Step 3: Replace BRAND_HERO_CONTENT references with t() calls**

Replace each hardcoded constant reference:
- `BRAND_HERO_CONTENT.badge` → `t("badge")`
- `BRAND_HERO_CONTENT.title.line1` → `t("titleLine1")`
- `BRAND_HERO_CONTENT.title.highlight` → `t("titleHighlight")`
- `BRAND_HERO_CONTENT.subtitle` → `t("subtitle")`
- `BRAND_HERO_CONTENT.stats[0].value` → `t("stat1Value")` etc.
- `BRAND_HERO_CONTENT.cta.primary.text` → `t("ctaPrimary")`
- `BRAND_HERO_CONTENT.cta.secondary.text` → `t("ctaSecondary")`

Keep non-text values (colors, hrefs, delays) in constants — only extract user-visible strings.

- [ ] **Step 4: Do the same for BRAND_NAVIGATION**

In the FloatingNavigation or wherever BRAND_NAVIGATION is rendered:

```tsx
const t = useTranslations("forBrands.nav")
// Use t("achievements"), t("method"), t("faq")
```

- [ ] **Step 5: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add src/components/for-brands/ src/constants/brand-additions.ts
git commit -m "feat: migrate brand hero and nav to i18n"
```

---

### Task 12: Migrate talent constants + hero to i18n

**Files:**
- Modify: `src/components/for-talents/HeroSection.tsx`
- Modify: `src/constants/talent-blocks/core.ts`
- Modify: Other talent components that render text from constants

- [ ] **Step 1: Read HeroSection and identify all French text sources**

Read `src/components/for-talents/HeroSection.tsx` and trace which constants it uses.

- [ ] **Step 2: Add useTranslations to HeroSection**

```tsx
import { useTranslations } from "next-intl"

// Inside component:
const t = useTranslations("forTalents.hero")
```

- [ ] **Step 3: Replace TALENT_HERO references with t() calls**

Replace all hardcoded text from TALENT_HERO constant with translation calls:
- `TALENT_HERO.badge` → `t("badge")`
- `TALENT_HERO.title` → `t("title")`
- `TALENT_HERO.titleHighlight` → `t("titleHighlight")`
- etc.

- [ ] **Step 4: Migrate other talent section components**

For each talent component that renders user-visible text (FAQ, problem statement, CTA, persona, etc.), add `useTranslations` and replace hardcoded French strings with `t()` calls.

**Important:** Add missing translation keys to `messages/fr.json` as you discover them. The initial extraction in Task 7 covers the main sections, but there will be additional keys in subsections (FAQ questions/answers, method steps, etc.).

- [ ] **Step 5: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add src/components/for-talents/ src/constants/talent-blocks/ messages/fr.json
git commit -m "feat: migrate talent pages to i18n"
```

---

### Task 13: Migrate remaining pages (services, team, legal, errors)

**Files:**
- Modify: `src/app/services/page.tsx` and service components
- Modify: `src/app/equipe/page.tsx` and team components
- Modify: `src/app/legal/` pages
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/error.tsx`

- [ ] **Step 1: Migrate services page**

Read `src/app/services/page.tsx` and its components. Add `getTranslations` (server) or `useTranslations` (client) as appropriate. Replace hardcoded French text with `t()` calls.

- [ ] **Step 2: Migrate team page**

Same pattern for `src/app/equipe/page.tsx`.

- [ ] **Step 3: Migrate legal pages**

For `src/app/legal/privacy/page.tsx`, `mentions/page.tsx`, `cookies/page.tsx` — these may have long legal text. Use translation keys for titles and short UI strings. Keep legal body content in separate files or in the translation JSON under deep keys.

- [ ] **Step 4: Migrate error pages**

`src/app/not-found.tsx`:
```tsx
import { getTranslations } from "next-intl/server"

export default async function NotFound() {
  const t = await getTranslations("common.errors")
  return <div>{t("notFound")}</div>
}
```

Same for `src/app/error.tsx`.

- [ ] **Step 5: Update fr.json with any new keys**

Add all discovered keys to `messages/fr.json`.

- [ ] **Step 6: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 7: Commit**

```bash
git add src/app/ src/components/ messages/fr.json
git commit -m "feat: migrate services, team, legal, and error pages to i18n"
```

---

### Task 14: Migrate common components (CookieBanner, skip link, footer)

**Files:**
- Modify: `src/components/compliance/CookieBanner.tsx`
- Modify: `src/app/layout.tsx` (skip link text)
- Modify: Footer component

- [ ] **Step 1: Migrate CookieBanner**

Read `src/components/compliance/CookieBanner.tsx`, add `useTranslations("common.cookieBanner")`, replace hardcoded text.

- [ ] **Step 2: Migrate skip link in layout**

In `src/app/layout.tsx`, the skip link "Aller au contenu" on line 121 needs to use a server translation. Since layout is now async:

```tsx
const tNav = await getTranslations("navigation")
// ...
<a href="#main-content" ...>{tNav("skipToContent")}</a>
```

Add `import { getTranslations } from "next-intl/server"` alongside existing next-intl imports.

- [ ] **Step 3: Migrate footer**

Find the footer component, add translations for copyright and any other text.

- [ ] **Step 4: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add src/components/compliance/ src/components/layout/ src/app/layout.tsx
git commit -m "feat: migrate common components (cookie banner, skip link, footer) to i18n"
```

---

### Task 15: Add LanguageSwitcher component

**Files:**
- Create: `src/components/layout/LanguageSwitcher.tsx`
- Modify: GlobalNav component (to include the switcher)

- [ ] **Step 1: Create LanguageSwitcher component**

Create `src/components/layout/LanguageSwitcher.tsx`:

```tsx
"use client"

import { useLocale } from "next-intl"
import { routing, type Locale } from "@/i18n/routing"

const DOMAIN_MAP: Record<Locale, string> = {
  fr: "wafia.co",
  en: "en.wafia.co",
  es: "es.wafia.co",
}

const LABELS: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
}

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/"

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((locale) => {
        const isActive = locale === currentLocale
        const href = `https://${DOMAIN_MAP[locale]}${currentPath}`

        return (
          <a
            key={locale}
            href={href}
            className={`px-2 py-1 rounded-md transition-colors ${
              isActive
                ? "text-white bg-white/10 font-medium"
                : "text-white/50 hover:text-white/80"
            }`}
            aria-current={isActive ? "true" : undefined}
          >
            {LABELS[locale]}
          </a>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Add LanguageSwitcher to GlobalNav**

Read `src/components/layout/GlobalNav.tsx` and add the `LanguageSwitcher` component next to the navigation items (right side of header, before any mobile menu toggle).

```tsx
import { LanguageSwitcher } from "./LanguageSwitcher"
// Inside the nav bar:
<LanguageSwitcher />
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/LanguageSwitcher.tsx src/components/layout/GlobalNav.tsx
git commit -m "feat: add language switcher (FR/EN/ES) to global navigation"
```

---

### Task 16: Update SEO metadata for all pages

**Files:**
- Modify: `src/app/page.tsx` (homepage metadata)
- Modify: `src/app/for-brands/page.tsx`
- Modify: `src/app/for-talents/page.tsx`
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/equipe/page.tsx`
- Modify: `src/lib/site.ts`
- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.xml/route.ts` (or equivalent)

- [ ] **Step 1: Add generateMetadata with hreflang to each page**

For each public page, replace static `metadata` exports with dynamic `generateMetadata`:

```tsx
import { getTranslations } from "next-intl/server"

export async function generateMetadata() {
  const t = await getTranslations("forBrands.meta")
  const path = "/for-brands"
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://wafia.co${path}`,
      languages: {
        fr: `https://wafia.co${path}`,
        en: `https://en.wafia.co${path}`,
        es: `https://es.wafia.co${path}`,
      },
    },
  }
}
```

Apply this pattern to each page with the appropriate namespace and path.

- [ ] **Step 2: Update sitemap to include all locale URLs**

In the sitemap generator, add entries for each locale subdomain:

```ts
const locales = [
  { domain: "https://wafia.co", locale: "fr" },
  { domain: "https://en.wafia.co", locale: "en" },
  { domain: "https://es.wafia.co", locale: "es" },
]

// For each route, generate entries for all locales
```

- [ ] **Step 3: Update robots.ts with sitemap URLs**

Add sitemap references for all subdomains.

- [ ] **Step 4: Update siteConfig in site.ts**

Make `siteConfig.locale` dynamic or add locale-aware helpers.

- [ ] **Step 5: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add src/app/ src/lib/site.ts
git commit -m "feat: add hreflang alternates and locale-aware metadata to all pages"
```

---

### Task 17: Full verification pass

- [ ] **Step 1: Build passes**

Run: `npm run build 2>&1 | tail -10`
Expected: `Compiled successfully`, no errors

- [ ] **Step 2: Studio not in navigation**

Run: `grep -n "Studio" src/constants/navigation.ts`
Expected: No match

- [ ] **Step 3: No #050510 on homepage**

Run: `grep -rn "#050510" src/components/home/ --include="*.tsx"`
Expected: No matches

- [ ] **Step 4: No Marquee in ClientsSection**

Run: `grep -n "Marquee\|marquee" src/components/for-brands/ClientsSection.tsx`
Expected: No matches

- [ ] **Step 5: No hardcoded springs outside design-tokens**

Run: `grep -rn "stiffness:" src/components/ --include="*.tsx" | grep -v "SPRING\|design-tokens\|import"`
Expected: No matches

- [ ] **Step 6: AUTHENTICITY_CARDS removed**

Run: `grep -rn "AUTHENTICITY_CARDS" src/constants/ --include="*.ts"`
Expected: No matches

- [ ] **Step 7: next-intl infrastructure working**

Run: `grep -n "NextIntlClientProvider" src/app/layout.tsx`
Expected: 1 match

- [ ] **Step 8: Translation files exist**

Run: `ls -la messages/`
Expected: `fr.json`, `en.json`, `es.json` all present

- [ ] **Step 9: Middleware configured**

Run: `head -10 src/middleware.ts`
Expected: Shows next-intl middleware setup

- [ ] **Step 10: LanguageSwitcher in nav**

Run: `grep -n "LanguageSwitcher" src/components/layout/GlobalNav.tsx`
Expected: 1 match (import + render)

- [ ] **Step 11: Dynamic lang attribute**

Run: `grep -n 'lang={locale}' src/app/layout.tsx`
Expected: 1 match (replaces hardcoded `lang="fr"`)

- [ ] **Step 12: Final commit**

```bash
git add -A
git commit -m "chore: design finalization + i18n implementation complete"
```
