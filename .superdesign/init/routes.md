# Routes Map (Next.js App Router)

## App Router Root
- Root layout: `src/app/layout.tsx`
- Global styles: `src/app/globals.css`

## Pages
- `/` → `src/app/page.tsx` (uses root layout)
  - Summary: Space-themed landing page with animated logo and three navigation pills.
- `/about` → `src/app/about/page.tsx` (root layout)
- `/cases` → `src/app/cases/page.tsx` (segment layout `src/app/cases/layout.tsx`)
- `/contact` → `src/app/contact/page.tsx` (segment layout `src/app/contact/layout.tsx`)
- `/equipe/[slug]` → `src/app/equipe/[slug]/page.tsx` (root layout)
- `/explore` → `src/app/explore/page.tsx` (root layout)
- `/for-agencies` → `src/app/for-agencies/page.tsx` (segment layout `src/app/for-agencies/layout.tsx`)
- `/for-brands` → `src/app/for-brands/page.tsx` (segment layout `src/app/for-brands/layout.tsx`)
- `/for-talents` → `src/app/for-talents/page.tsx` (segment layout `src/app/for-talents/layout.tsx`)
  - Summary: Long-form marketing page with hero, proof strip, persona section, identity, platforms, OS, business, levels, FAQ, CTA.
- `/legal/cookies` → `src/app/legal/cookies/page.tsx` (root layout)
- `/legal/mentions` → `src/app/legal/mentions/page.tsx` (root layout)
- `/legal/privacy` → `src/app/legal/privacy/page.tsx` (root layout)
- `/process` → `src/app/process/page.tsx` (root layout)
- `/services` → `src/app/services/page.tsx` (root layout)
- `/studio` → `src/app/studio/page.tsx` (segment layout `src/app/studio/layout.tsx`)
- `/talents` → `src/app/talents/page.tsx` (segment layout `src/app/talents/layout.tsx`)

## Special Routes / Metadata
- `src/app/error.tsx` → global error UI
- `src/app/not-found.tsx` → 404 UI
- `src/app/manifest.ts` → `/.webmanifest`
- `src/app/robots.ts` → `/robots.txt`
- `src/app/sitemap.ts` → `/sitemap.xml`
- `src/app/opengraph-image.tsx` → `/_next/og` (Open Graph image)
- `src/app/twitter-image.tsx` → Twitter image

## Segment Layouts
- `src/app/cases/layout.tsx`
- `src/app/contact/layout.tsx`
- `src/app/for-agencies/layout.tsx`
- `src/app/for-brands/layout.tsx`
- `src/app/for-talents/layout.tsx`
- `src/app/studio/layout.tsx`
- `src/app/talents/layout.tsx`
