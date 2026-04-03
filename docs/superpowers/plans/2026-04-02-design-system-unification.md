# Design System Unification Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify Wafia's design system under a single "dark premium editorial" direction by creating centralized tokens, removing incoherent sections, and migrating ~40 files to standardized values.

**Architecture:** Tokens-first approach. A single `design-tokens.ts` file defines all visual rules. Migrations proceed in 4 phases: foundation (tokens + config), structural (page-level removals/merges), systematic (cross-file find-replace), atmosphere (BackgroundFlow expansion).

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, TypeScript

---

## Chunk 1: Foundation

### Task 1: Create design-tokens.ts

**Files:**
- Create: `src/lib/design-tokens.ts`

- [ ] **Step 1: Create the design tokens file**

```ts
/**
 * Wafia Design Tokens — Single source of truth
 *
 * Rules:
 * - All components import visual constants from here
 * - No hardcoded colors, radius, shadows, or springs in components
 * - easing.ts remains canonical for EASING/DURATION (re-exported here)
 */

// Re-export animation tokens from canonical source
export { EASING, DURATION } from "./easing"

export const COLORS = {
  neutral: "slate",
  dark: {
    bg: "#0b111a",
    surface: "slate-900",
    border: "white/10",
  },
  brands: {
    accent: "orange-500",
    accentHover: "orange-600",
    gradient: "from-orange-500 to-red-500",
    gradientHover: "from-orange-600 to-red-600",
  },
  talents: {
    accent: "violet-600",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-500",
  },
  feedback: {
    success: "emerald-500",
    danger: "rose-500",
  },
} as const

export const RADIUS = {
  card: "rounded-xl",
  prominent: "rounded-2xl",
  pill: "rounded-full",
} as const

export const SHADOW = {
  soft: "shadow-lg",
  elevated: "shadow-2xl",
} as const

export const SPRING = {
  responsive: { stiffness: 300, damping: 25 },
  gentle: { stiffness: 120, damping: 28 },
} as const

export const TYPOGRAPHY = {
  heading: "font-heading",
  body: "font-sans",
} as const

export const SECTION = {
  compact: "py-16 md:py-20",
  standard: "py-20 md:py-28",
  generous: "py-24 md:py-32",
} as const

export const HEADER_MARGIN = {
  sm: "mb-12",
  md: "mb-16",
  lg: "mb-20",
} as const

export const CARD = {
  dark: "rounded-xl bg-slate-900/80 backdrop-blur-xl border border-white/10",
  light: "rounded-xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10",
} as const
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/lib/design-tokens.ts
git commit -m "feat: add centralized design tokens file"
```

---

### Task 2: Extend Tailwind config with border-radius

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add borderRadius extension**

In `tailwind.config.ts`, add `borderRadius` to `theme.extend`:

```ts
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: ["col-span-2", "fixed", "inset-0", "overflow-hidden"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.75rem',
      },
    },
  },
};

export default config;
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: extend tailwind border-radius to 20px/28px"
```

---

### Task 3: Remove Syne font

**Files:**
- Modify: `src/app/layout.tsx` (lines 3, 27-33, 110)
- Modify: `src/components/for-talents/distribution/SmartDistributionDashboard.tsx`
- Modify: `src/components/for-talents/distribution/PlatformTable.tsx`

- [ ] **Step 1: Remove Syne import and config from layout.tsx**

In `src/app/layout.tsx`:
- Line 3: Change `import { Plus_Jakarta_Sans, Outfit, Syne } from "next/font/google"` to `import { Plus_Jakarta_Sans, Outfit } from "next/font/google"`
- Lines 27-33: Delete the entire `const syne = Syne({...})` block
- Line 110: Change `${plusJakarta.variable} ${outfit.variable} ${syne.variable}` to `${plusJakarta.variable} ${outfit.variable}`

- [ ] **Step 2: Grep and replace all font-syne occurrences**

Run: `grep -rn "font-syne\|font-display" src/components/ --include="*.tsx" --include="*.ts"`

Replace every `font-syne` with `font-heading` in the results. Known files:
- `src/components/for-talents/distribution/SmartDistributionDashboard.tsx`
- `src/components/for-talents/distribution/PlatformTable.tsx`

- [ ] **Step 3: Verify no font-syne references remain**

Run: `grep -rn "font-syne\|font-display" src/ --include="*.tsx" --include="*.ts" --include="*.css"`
Expected: No matches (or only CSS variable definition comments)

- [ ] **Step 4: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/components/for-talents/distribution/
git commit -m "feat: remove Syne font, standardize on Outfit + Plus Jakarta"
```

---

## Chunk 2: Structural Changes

### Task 4: Remove ServicesAndMetrics from /for-brands

**Files:**
- Modify: `src/app/for-brands/page.tsx` (lines 7, 25)
- Modify: `src/constants/brand-additions.ts` (lines 3-8)

- [ ] **Step 1: Remove ServicesAndMetrics from page**

In `src/app/for-brands/page.tsx`:
- Delete line 7: `import { ServicesAndMetrics } from "@/components/for-brands/ServicesAndMetrics"`
- Delete line 25: `<ServicesAndMetrics />`

- [ ] **Step 2: Update BRAND_NAVIGATION to remove #services anchor**

In `src/constants/brand-additions.ts`, replace lines 3-8:

```ts
export const BRAND_NAVIGATION = [
    { href: "#case-studies", label: "Réalisations" },
    { href: "#process", label: "Méthode" },
    { href: "#faq", label: "FAQ" }
] as const;
```

- [ ] **Step 3: Verify /for-brands loads and floating nav works**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/app/for-brands/page.tsx src/constants/brand-additions.ts
git commit -m "feat: remove ServicesAndMetrics section from brands page"
```

---

### Task 5: Remove Studio from navigation + add redirect

**Files:**
- Modify: `src/constants/navigation.ts` (line 10)
- Modify: `next.config.ts` (after line 107)

- [ ] **Step 1: Remove Studio from MAIN_NAVIGATION**

In `src/constants/navigation.ts`, remove the Studio entry (line 10):
```ts
{ name: "Studio", href: "/studio" },
```

Result should be:
```ts
export const MAIN_NAVIGATION = [
    { name: "Services", href: "/services" },
    { name: "Réalisations", href: "/for-brands#case-studies" }
] as const;
```

- [ ] **Step 2: Add /studio redirect in next.config.ts**

In `next.config.ts`, add after the last wiki redirect (after line 107):
```ts
      {
        source: "/studio",
        destination: "/for-brands#case-studies",
        statusCode: 301,
      },
```

- [ ] **Step 3: Verify build and redirect**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add src/constants/navigation.ts next.config.ts
git commit -m "feat: remove Studio from nav, add redirect to case studies"
```

---

### Task 6: Remove AuthenticitySection from /for-brands

**Files:**
- Modify: `src/app/for-brands/page.tsx` (lines 6, 31)

- [ ] **Step 1: Remove AuthenticitySection from page**

In `src/app/for-brands/page.tsx`:
- Delete the import: `import { AuthenticitySection } from "@/components/for-brands/AuthenticitySection"`
- Delete the render: `<AuthenticitySection />`

Resulting section order (10 sections):
```tsx
<PageShell>
    <BrandHeroV2 />
    <ClientsSection />
    <ValuePropositionSection />
    <CaseStudiesSection />
    <ProcessSection />
    <ComparisonSectionV2 />
    <ComplianceSection />
    <TeamSectionBrands />
    <FaqSection />
    <CtaSection estimateHref="/questionnaire/brands" />
</PageShell>
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/app/for-brands/page.tsx
git commit -m "feat: remove AuthenticitySection, reduce brands page to 10 sections"
```

---

### Task 7: Simplify BrandHeroV2

**Files:**
- Modify: `src/components/for-brands/BrandHeroV2.tsx`

- [ ] **Step 1: Identify and remove ROI performance widget**

In `src/components/for-brands/BrandHeroV2.tsx`, find the floating ROI/performance card (the element showing `+127% ROI` or `2.4M +24%`) and remove it. Keep: badge, H1, subtitle, 3 stat pills, 2 CTA buttons.

Search for elements containing ROI-related content or floating performance cards positioned absolutely.

- [ ] **Step 2: Verify hero renders cleanly with 5 elements**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/components/for-brands/BrandHeroV2.tsx
git commit -m "feat: simplify brand hero, remove ROI widget"
```

---

### Task 8: Replace ClientsSection marquee with static grid

**Files:**
- Modify: `src/components/for-brands/ClientsSection.tsx`

- [ ] **Step 1: Rewrite ClientsSection as static grid**

Replace the entire content of `src/components/for-brands/ClientsSection.tsx`:

```tsx
"use client"

import Image from "next/image"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { CLIENTS } from "@/constants/clients"

function LogoCard({ name, logoLight }: { name: string; logoLight: string }) {
    return (
        <div className="flex items-center justify-center p-4">
            <Image
                src={logoLight}
                alt={name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            />
        </div>
    )
}

export function ClientsSection() {
    return (
        <section className="py-16 md:py-20 px-4 relative z-10">
            <Container>
                <RevealAnimation>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-8 items-center max-w-6xl mx-auto">
                        {CLIENTS.map((client) => (
                            <LogoCard key={client.name} name={client.name} logoLight={client.logoLight} />
                        ))}
                    </div>
                </RevealAnimation>
            </Container>
        </section>
    )
}
```

- [ ] **Step 2: Verify build and visual**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/components/for-brands/ClientsSection.tsx
git commit -m "feat: replace client marquee with static logo grid"
```

---

### Task 9: Add content to homepage

**Files:**
- Modify: `src/components/home/HomeClient.tsx`

- [ ] **Step 1: Add content overlay to HomeClient**

In `src/components/home/HomeClient.tsx`, add a content layer between the background and the existing navigation pills. The content should include:

1. A visible H1 (replace or supplement the sr-only one): "Agence d'influence marketing & studio creatif"
2. A tagline paragraph: 1-2 lines describing Wafia
3. A static grid of 8-12 client logos (import CLIENTS, show subset, `opacity-40` styling)
4. Double CTA buttons: "Je suis une Marque" (orange gradient → /questionnaire/brands) and "Je suis un Talent" (violet gradient → /questionnaire/talents)

Position the content centered vertically above the existing navigation pills. Use `max-w-4xl mx-auto text-center` for the content block. All text white on the dark particle background.

Keep the existing navigation pills (Talents, Studio, Brands) and Wiki CTA as secondary elements below.

- [ ] **Step 2: Verify build and homepage shows content**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/components/home/HomeClient.tsx
git commit -m "feat: add content overlay to homepage (H1, tagline, logos, CTAs)"
```

---

## Chunk 3: Systematic Migrations

### Task 10: Migrate gray-* to slate-* site-wide

**Files:**
- Modify: All files in `src/components/` containing `gray-` (~49 files)

- [ ] **Step 1: Count current gray- occurrences**

Run: `grep -rn "gray-" src/components/ --include="*.tsx" --include="*.ts" -l | wc -l`
Note the count for verification.

- [ ] **Step 2: Perform bulk replacement**

Run: `find src/components -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/gray-/slate-/g'`

- [ ] **Step 3: Also replace in page files and lib**

Run: `find src/app -name "*.tsx" | xargs sed -i '' 's/gray-/slate-/g'`

- [ ] **Step 4: Verify zero gray- occurrences remain in components**

Run: `grep -rn "gray-" src/components/ --include="*.tsx" --include="*.ts" | grep -v "node_modules" | head -20`
Expected: No matches

- [ ] **Step 5: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: migrate entire site from gray-* to slate-* palette"
```

---

### Task 11: Unify dark backgrounds to #0b111a

**Files:**
- Modify: `src/components/home/HomeClient.tsx`
- Modify: `src/components/common/BackgroundFlow.tsx`
- Modify: Studio components (if any contain hardcoded dark bgs)
- Modify: Any file with `bg-black`, `#050510`, `#0A0A0A`, `#07080c`, `#050508`

- [ ] **Step 1: Find all hardcoded dark backgrounds**

Run: `grep -rn "#050510\|#0A0A0A\|#0a0a0a\|#07080c\|#050508\|bg-black" src/ --include="*.tsx" --include="*.ts" --include="*.css" -l`

- [ ] **Step 2: Replace each occurrence**

For each file found:
- `#050510` → `#0b111a`
- `#0A0A0A` / `#0a0a0a` → `#0b111a`
- `#07080c` → `#0b111a`
- `#050508` → `#0b111a`
- `bg-black` → `bg-[#0b111a]` (only in dark mode / page backgrounds, NOT in text colors or small UI elements)

**Important:** Do NOT replace `bg-black` in contexts where it's used for text overlays, badges, or small UI elements. Only replace page-level backgrounds.

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: unify all dark backgrounds to #0b111a"
```

---

### Task 12: Standardize border-radius

**Files:**
- Modify: All files containing `rounded-[` custom values

- [ ] **Step 1: Find all custom border-radius**

Run: `grep -rn "rounded-\[" src/components/ --include="*.tsx" -l`

- [ ] **Step 2: Replace per the mapping**

For each file:
- `rounded-[20px]` → `rounded-xl`
- `rounded-[28px]` → `rounded-2xl`
- `rounded-[2rem]` → `rounded-2xl`
- `rounded-[2.5rem]` → `rounded-2xl`
- `rounded-[3rem]` → `rounded-2xl`
- `rounded-[36px]` → `rounded-2xl`
- `rounded-3xl` → `rounded-2xl`

- [ ] **Step 3: Verify no custom rounded-[ remain**

Run: `grep -rn "rounded-\[" src/components/ --include="*.tsx" | grep -v "rounded-full" | head -20`
Expected: No matches (except possibly `rounded-t-[` or other directional variants which need individual review)

- [ ] **Step 4: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: standardize border-radius to xl/2xl/full (3 values)"
```

---

### Task 13: Standardize shadows

**Files:**
- Modify: All files containing `shadow-[` custom values

- [ ] **Step 1: Find all custom shadows**

Run: `grep -rn "shadow-\[" src/components/ --include="*.tsx" -l`

- [ ] **Step 2: Replace per the mapping**

For each file:
- `shadow-[0_30px_80px_rgba(15,23,42,0.08)]` → `shadow-2xl`
- `shadow-[0_20px_60px_rgba(15,23,42,0.08)]` → `shadow-2xl`
- `shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)]` → `shadow-lg`
- `shadow-[0_8px_32px_rgba(0,0,0,0.08)]` → `shadow-lg`
- `shadow-[0_0_14px_rgba(249,115,22,0.38)]` → `shadow-lg shadow-orange-500/30`
- `shadow-[4px_4px_*` and `shadow-[8px_8px_*` → remove (ServicesAndMetrics already removed)
- `shadow-[0_8px_20px_rgba(0,0,0,0.2)]` → `shadow-lg`
- `shadow-[0_8px_30px_rgba(0,0,0,0.3)]` → `shadow-lg`
- `shadow-[0_10px_30px_rgba(0,0,0,0.2)]` → `shadow-lg`

**Note:** Leave `shadow-[0_0_*` glow effects on team cards and ProcessSection spine — these are contextual glows, not elevation shadows.

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: standardize shadows to shadow-lg/shadow-2xl"
```

---

### Task 14: Standardize spring physics

**Files:**
- Modify: `src/components/for-brands/ProcessSection.tsx`
- Modify: `src/components/for-brands/FloatingNavigation.tsx`
- Modify: `src/components/common/BackgroundFlow.tsx`
- Modify: Studio components with spring configs

- [ ] **Step 1: Add SPRING import to each file**

At the top of each file, add:
```ts
import { SPRING } from "@/lib/design-tokens"
```

- [ ] **Step 2: Replace inline spring values**

In each file, find `stiffness:` and `damping:` values and replace:
- Navigation/button contexts → `...SPRING.responsive`
- Card/section/scroll contexts → `...SPRING.gentle`

Example: `{ type: "spring", stiffness: 300, damping: 24 }` becomes `{ type: "spring", ...SPRING.responsive }`

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: standardize spring physics to responsive/gentle tokens"
```

---

### Task 15: Standardize animation timings

**Files:**
- Modify: All files with hardcoded easing arrays or duration values

- [ ] **Step 1: Find hardcoded easing arrays**

Run: `grep -rn "\[0\.\|ease:" src/components/ --include="*.tsx" | grep -v "EASING\|import\|node_modules" | head -30`

- [ ] **Step 2: Replace hardcoded easings with EASING imports**

For each file found:
- Add `import { EASING, DURATION } from "@/lib/design-tokens"` (or from `@/lib/easing`)
- `[0.21, 0.47, 0.32, 0.98]` → `EASING.smooth`
- `[0.22, 1, 0.36, 1]` (literal) → `EASING.smooth`
- `[0.32, 0.72, 0, 1]` → `EASING.premium`
- `"easeOut"` (string literal in framer-motion) → `EASING.easeOut`
- `"easeInOut"` (string literal) → `EASING.easeInOut`

- [ ] **Step 3: Replace hardcoded durations**

- `duration: 0.42` → `duration: DURATION.normal`
- `duration: 0.44` → `duration: DURATION.normal`
- `duration: 0.46` → `duration: DURATION.normal`
- `duration: 0.52` → `duration: DURATION.slow`
- `duration: 0.7` → `duration: DURATION.slower`

**Note:** Keep `duration: 0.3` (already matches DURATION.fast) and `duration: 0.6` (already matches DURATION.slow). Only replace values that don't match any token.

- [ ] **Step 4: Verify no hardcoded arrays remain**

Run: `grep -rn "\[0\.21\|0\.32, 0\.72\|0\.22, 1, 0\.36" src/components/ --include="*.tsx" | head -10`
Expected: No matches

- [ ] **Step 5: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: standardize all animation timings to EASING/DURATION tokens"
```

---

## Chunk 4: Atmosphere

### Task 16: Add BackgroundFlow to /services and /wiki

**Files:**
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/wiki/page.tsx`

- [ ] **Step 1: Check BackgroundFlow component API**

Read `src/components/common/BackgroundFlow.tsx` to understand props (variant, colors, etc.).

- [ ] **Step 2: Add BackgroundFlow to services page**

In `src/app/services/page.tsx`, wrap content with BackgroundFlow using a neutral variant. Import the component and add it as a background layer, same pattern as /for-brands and /for-talents.

- [ ] **Step 3: Add BackgroundFlow to wiki page**

In `src/app/wiki/page.tsx`, same approach — add BackgroundFlow with neutral variant.

- [ ] **Step 4: Verify build and visual**

Run: `npm run build 2>&1 | tail -5`
Expected: `Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add src/app/services/page.tsx src/app/wiki/page.tsx
git commit -m "feat: add BackgroundFlow atmosphere to services and wiki pages"
```

---

## Final Verification

### Task 17: Full verification pass

- [ ] **Step 1: Build passes**

Run: `npm run build 2>&1 | tail -10`
Expected: `Compiled successfully`, no errors

- [ ] **Step 2: No gray- in components**

Run: `grep -rn "gray-" src/components/ --include="*.tsx" | wc -l`
Expected: 0

- [ ] **Step 3: No font-syne references**

Run: `grep -rn "font-syne\|font-display" src/ --include="*.tsx" --include="*.ts" | wc -l`
Expected: 0

- [ ] **Step 4: No custom rounded-[ values**

Run: `grep -rn "rounded-\[" src/components/ --include="*.tsx" | grep -v "node_modules" | wc -l`
Expected: 0 (or near-zero with justified exceptions)

- [ ] **Step 5: No hardcoded dark backgrounds**

Run: `grep -rn "#050510\|#0A0A0A\|#0a0a0a\|#07080c\|#050508" src/components/ --include="*.tsx" | wc -l`
Expected: 0

- [ ] **Step 6: ServicesAndMetrics not rendered**

Run: `grep -rn "ServicesAndMetrics" src/app/ --include="*.tsx"`
Expected: No import or render (file still exists in components/ but unused)

- [ ] **Step 7: Studio not in navigation**

Run: `grep -n "Studio" src/constants/navigation.ts`
Expected: No match

- [ ] **Step 8: Final commit with all verification passing**

```bash
git add -A
git commit -m "chore: design system unification complete (P0+P1)"
```
