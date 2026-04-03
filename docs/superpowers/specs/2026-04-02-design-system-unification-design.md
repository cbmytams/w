# Design System Unification — Wafia.fr

**Date:** 2026-04-02
**Scope:** P0 + P1 (14 items)
**Approach:** Tokens first, migrations by page
**Files impacted:** ~40

---

## 1. Problem Statement

The Wafia site has 4-5 competing visual identities with no shared design DNA. The audit identified: 12+ border-radius values, 2 gray palettes (gray vs slate), 4 dark backgrounds, neo-brutalist shadows mixed with Apple-style glows, 3 fonts with no usage rules, unstandardized animation timings despite a well-defined easing system, perpetual marquees causing visual fatigue, and a ServicesAndMetrics section that uses a completely different design language from every other component.

The goal is to unify the design system under a single "dark premium editorial" direction without breaking existing functionality.

## 2. Design Decisions (Validated)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Gray palette | `slate-*` only | More contemporary, better dark contrast, already used in newest components |
| Dark background | `#0b111a` only | Already the CSS variable `--background` in dark mode |
| ServicesAndMetrics | Remove entirely | Neo-brutalist style incompatible with rest of site; content redundant with ValueProp |
| Font system | 2 fonts: Outfit (headings) + Plus Jakarta (body) | Syne only appeared in ServicesAndMetrics (removed) |
| Border-radius | 3 values: `rounded-xl` / `rounded-2xl` / `rounded-full` | Eliminates 12+ ad-hoc values |
| Shadows | 2 types: `shadow-lg` (standard) / `shadow-2xl` (elevated) | Eliminates neo-brutalist + hardcoded shadows |
| Springs | 2 configs: responsive (300/25) + gentle (120/28) | Replaces 6+ ad-hoc spring definitions |
| Marquees | Replace with static grids | Eliminates perpetual motion fatigue |

## 3. Design Tokens File

**File:** `src/lib/design-tokens.ts`

Exports typed constants that components import directly. This is the single source of truth for visual rules.

### 3.1 Colors

```ts
export const COLORS = {
  neutral: "slate", // sole gray palette — all gray-* replaced by slate-*
  dark: {
    bg: "#0b111a",       // sole dark background — replaces #050510, #0A0A0A, #07080c, bg-black
    surface: "slate-900", // elevated surfaces
    border: "white/10",   // default borders
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
```

### 3.2 Radius

```ts
export const RADIUS = {
  card: "rounded-xl",       // standard cards
  prominent: "rounded-2xl", // elevated cards, sections
  pill: "rounded-full",     // buttons, badges, pills
} as const
```

### 3.3 Shadows

```ts
export const SHADOW = {
  soft: "shadow-lg",       // standard elevation
  elevated: "shadow-2xl",  // prominent elements
} as const
```

### 3.4 Springs

```ts
export const SPRING = {
  responsive: { stiffness: 300, damping: 25 },  // nav, buttons, toggles
  gentle: { stiffness: 120, damping: 28 },       // cards, sections, reveals
} as const
```

### 3.5 Typography

```ts
export const TYPOGRAPHY = {
  heading: "font-heading", // Outfit — all headings
  body: "font-sans",       // Plus Jakarta — all body text
  // Syne (font-display) removed from system
} as const
```

### 3.6 Section Spacing

```ts
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
```

### 3.7 Card Patterns

```ts
export const CARD = {
  dark: "bg-slate-900/80 backdrop-blur-xl border border-white/10",
  light: "bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10",
} as const
```

## 4. P0 Migrations (Critical)

### P0-1. Unified gray palette (slate-*)

**Action:** Find-and-replace `gray-` → `slate-` in all component files under `src/components/for-brands/`.

**Files:**
- `ValuePropositionSection.tsx`
- `CaseStudiesSection.tsx`
- `ProcessSection.tsx`
- `ComparisonSectionV2.tsx`
- `AuthenticitySection.tsx`
- `ComplianceSection.tsx`
- `TeamSectionBrands.tsx`
- `FaqSection.tsx` (brands)
- `BrandHeroV2.tsx`
- `ClientsSection.tsx`

**Exceptions:** CSS gradient class names like `from-gray-900` that are part of text gradients need manual review — some may need to become `from-slate-900`.

**Verification:** Visual diff on /for-brands — no visible color shift expected since gray and slate are perceptually close. Check dark mode contrast.

### P0-2. Unified dark background (#0b111a)

**Action:** Replace hardcoded dark backgrounds with CSS variable reference.

| File | Current | New |
|------|---------|-----|
| `HomeClient.tsx` | `bg-[#050510]` | `bg-[var(--background)]` or `bg-background` |
| `BackgroundFlow.tsx` | `#07080c` / `#050508` | `#0b111a` |
| Studio components | `bg-[#0A0A0A]` / `#0A0A0A` | `#0b111a` / `bg-background` |
| Any `bg-black` | `bg-black` | `bg-[#0b111a]` |

**Verification:** All pages should have the same base dark tone in dark mode.

### P0-3. Remove ServicesAndMetrics from /for-brands

**Action:**
1. In `/src/app/for-brands/page.tsx` (or its client component): remove import and render of `ServicesAndMetrics`
2. Keep the file in codebase (not deleted, just not rendered)

**Side effects:**
- The `/for-brands` page loses the 11-service showcase and the neo-brutalist section
- Page length drops by ~2000px
- The "NOS SERVICES" anchor in the floating nav needs to be removed or repointed
- The Syne font is no longer rendered anywhere on the site

**Verification:** /for-brands loads without the section. FloatingNavigation anchors still work for remaining sections.

### P0-4. Homepage — add content overlay

**Action:** Modify `HomeClient.tsx` to add a content layer over the particle background:

1. Keep `RefinedParticlesBackground` as the background
2. Add a centered content block:
   - H1 (visible, not sr-only): "Agence d'influence marketing & studio creatif"
   - Tagline: 1-2 lines describing Wafia
   - Client logos grid (static, 8-12 logos from CLIENTS constant)
   - Double CTA: "Je suis une Marque" → /questionnaire/brands, "Je suis un Talent" → /questionnaire/talents
3. Keep the existing navigation pills (Talents, Studio, Brands) but make them secondary
4. Keep the Wiki CTA

**Design:** Content centered vertically, `max-w-4xl`, text white on dark particle background. Logos in a subtle `opacity-60` grid. CTAs use the brand gradient (orange) and talent gradient (violet).

**Verification:** Homepage now communicates what Wafia is within 5 seconds.

### P0-5. Studio — remove from navigation

**Action:**
1. In `src/constants/navigation.ts`: remove Studio from MAIN_NAVIGATION
2. In header component: Studio link no longer rendered
3. Add a redirect in `next.config.js`: `/studio` → `/for-brands#case-studies` (301)
4. Keep the Studio page files intact (future rebuild)

**Verification:** Header no longer shows Studio. Direct URL /studio redirects properly.

### P0-6. Remove Syne font

**Action:**
1. In `globals.css`: remove `--font-syne` variable definition and the `@font-face` or import for Syne
2. In `tailwind.config.ts`: remove `fontFamily.display` or `fontFamily.syne` if defined
3. Grep for `font-syne` / `font-display` — replace any remaining occurrences with `font-heading`
4. Since ServicesAndMetrics (the only consumer) is removed from render (P0-3), this should have zero visible impact

**Verification:** `npm run build` passes. No font loading errors in console.

## 5. P1 Migrations (Important)

### P1-1. Border-radius standardization

**Mapping:**

| Current | New | Rationale |
|---------|-----|-----------|
| `rounded-[20px]` | `rounded-xl` | 20px ≈ 0.75rem = xl |
| `rounded-[28px]` | `rounded-2xl` | 28px ≈ 1rem = 2xl |
| `rounded-[2rem]` | `rounded-2xl` | 2rem = 32px ≈ 2xl |
| `rounded-[2.5rem]` | `rounded-2xl` | Closest standard |
| `rounded-[3rem]` | `rounded-2xl` | Demote to 2xl (no jumbo radius) |
| `rounded-[36px]` | `rounded-2xl` | Closest standard |
| `rounded-3xl` | `rounded-2xl` | Consolidate to 2 tiers |

**Files:** CaseStudiesSection, ComparisonSectionV2, AuthenticitySection, ComplianceSection, FloatingNavigation, Studio components (ProductionsGrid, SequentialVideoPlayer).

### P1-2. Shadow standardization

**Action:** Replace all hardcoded box-shadow values with `shadow-lg` or `shadow-2xl`.

| Current | New |
|---------|-----|
| `shadow-[0_30px_80px_rgba(15,23,42,0.08)]` | `shadow-2xl` |
| `shadow-[0_20px_60px_rgba(15,23,42,0.08)]` | `shadow-2xl` |
| `shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)]` | `shadow-lg shadow-orange-500/10` |
| `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` | N/A (ServicesAndMetrics removed) |
| `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]` | N/A (ServicesAndMetrics removed) |
| `shadow-[0_8px_32px_rgba(0,0,0,0.08)]` | `shadow-lg` |
| `shadow-[0_0_14px_rgba(249,115,22,0.38)]` | `shadow-lg shadow-orange-500/30` |

**Files:** AuthenticitySection, ComparisonSectionV2, ProcessSection, FloatingNavigation.

### P1-3. Spring standardization

**Action:** Import `SPRING` from design-tokens and replace inline spring configs.

| File | Current | New |
|------|---------|-----|
| ProcessSection | `stiffness: 120, damping: 28, mass: 0.32` | `SPRING.gentle` (drop mass) |
| FloatingNavigation | `damping: 25, stiffness: 300` | `SPRING.responsive` |
| FloatingNavigation | `stiffness: 300, damping: 24` | `SPRING.responsive` |
| FloatingNavigation | `damping: 20, stiffness: 400` | `SPRING.responsive` |
| BackgroundFlow | `stiffness: 70, damping: 24, mass: 0.7` | `SPRING.gentle` (adjusted) |
| Studio | `stiffness: 400, damping: 40, mass: 1.2` | `SPRING.responsive` |

### P1-4. Replace marquees with static grids

**ClientsSection.tsx:**
- Remove `<Marquee>` wrapper
- Replace with `grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-8 items-center`
- Each logo: `opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all`
- If 18 logos is too many for static grid, show 9-12 most recognizable

### P1-5. Reduce /for-brands page length

**Action:** After removing ServicesAndMetrics (P0-3), also merge AuthenticitySection into ValuePropositionSection.

The "authenticity" message ("Vos createurs doivent parler de vous naturellement") is a reinforcement of the "verified creators" pillar. Integrate the 3 authenticity points (audience qualifiee, affinite sincere, campagnes organiques) as sub-points under the first ValueProp card.

**Resulting section order (10 sections):**
1. BrandHeroV2
2. ClientsSection (static grid)
3. ValuePropositionSection (with authenticity merged)
4. CaseStudiesSection
5. ProcessSection
6. ComparisonSectionV2
7. ComplianceSection
8. TeamSectionBrands
9. FaqSection
10. CtaSection

### P1-6. Simplify hero brands

**Action in BrandHeroV2.tsx:**
- Remove the ROI performance widget (the floating `+127% ROI / 2.4M` card)
- Keep: badge + H1 + subtitle + 3 stat pills + 2 CTA buttons
- That's 5 elements in the viewport — clean and sufficient

### P1-7. BackgroundFlow on /services and /wiki

**Action:**
- Import `BackgroundFlow` in `/src/app/services/page.tsx` and `/src/app/wiki/page.tsx`
- Use a neutral variant (not warm/cool) — soft violet/slate ambient
- This gives /services and /wiki the same atmospheric quality as the other pages

### P1-8. Standardize animation timings

**Action:** Grep for hardcoded easing arrays and durations. Replace with imports from `easing.ts`.

| Pattern to find | Replace with |
|-----------------|-------------|
| `[0.21, 0.47, 0.32, 0.98]` | `EASING.smooth` |
| `[0.22, 1, 0.36, 1]` (hardcoded) | `EASING.smooth` |
| `[0.32, 0.72, 0, 1]` | `EASING.premium` |
| `"easeOut"` (string) | `EASING.easeOut` |
| `"easeInOut"` (string) | `EASING.easeInOut` |
| `duration: 0.42` | `duration: DURATION.normal` (0.4) |
| `duration: 0.52` | `duration: DURATION.slow` (0.6) |
| `duration: 0.7` | `duration: DURATION.slower` (0.8) |

**Files:** ComparisonSectionV2, FloatingNavigation, FaqSection (brands + talents), CaseStudiesSection, ProcessSection, Studio components.

## 6. Execution Order

The migrations must follow this dependency order:

```
Phase 1 (Foundation — no visual changes):
  1. Create design-tokens.ts
  2. Clean globals.css (remove Syne, standardize variables)

Phase 2 (Structural — page-level changes):
  3. Remove ServicesAndMetrics from /for-brands render
  4. Remove Studio from navigation + add redirect
  5. Merge AuthenticitySection into ValuePropositionSection
  6. Simplify BrandHeroV2 (remove ROI widget)
  7. Replace ClientsSection marquee with static grid
  8. Add content to homepage

Phase 3 (Systematic — cross-file migrations):
  9. gray-* → slate-* across all brand components
  10. Dark backgrounds → unified #0b111a
  11. Border-radius standardization
  12. Shadow standardization
  13. Spring standardization
  14. Animation timing standardization

Phase 4 (Atmosphere):
  15. Add BackgroundFlow to /services and /wiki
```

Each phase can be verified independently before moving to the next.

## 7. Verification Criteria

- `npm run build` passes after each phase
- No console errors on any page
- /for-brands renders 10 sections (down from 12)
- No `gray-` classes remain in brand components
- No `font-syne` / `font-display` references remain
- No hardcoded dark backgrounds other than `#0b111a`
- No `rounded-[Npx]` or `rounded-[Nrem]` values remain
- No hardcoded box-shadow values remain (except standard Tailwind utilities)
- No hardcoded easing arrays remain in components
- Homepage displays content (H1, tagline, logos, CTAs)
- Studio not in navigation header
- All floating nav anchors work on /for-brands

## 8. Out of Scope

- P2/P3 items (favicon, footer redesign, wiki styling, etc.)
- Responsive audit (mobile-specific issues)
- Content/copy changes (editorial pass)
- New pages (about, case-studies hub, roster)
- Light mode polish (dark-first approach maintained)
- Performance optimization
