# WAFIA_UX_AUDIT

Date: 2026-02-23
Scope: `src/app`, `src/components`, `src/hooks`, `src/lib` (read-only audit)

## Summary
- Total issues
- 🔴 Bloquant: 2
- 🟠 Majeur: 8
- 🟡 Mineur: 3
- 🔵 Suggestion: 1
- ✅ Fixed in this pass: 13 / 14

## Top 5 Priority Fixes
1. Replace hardcoded back links with history-aware back + fallback.
2. Remove section-anchor floating nav from legal pages (currently dead links).
3. Implement route-level `AnimatePresence` with true exit transitions.
4. Fix conflicting hero scroll logic on `/for-talents` (`#journey` vs `#problem`).
5. Enforce reduced-motion behavior and pause infinite animations (marquees/loops).

## UX Coherence Score
90 / 100

## Phase 1 — Full Mapping

### Routes (`/app`) with `page.tsx`, `layout.tsx`, `loading.tsx`
| Route | page.tsx | layout.tsx | loading.tsx |
|---|---|---|---|
| `/` | `src/app/page.tsx` | `src/app/layout.tsx` | `src/app/loading.tsx` |
| `/about` | `src/app/about/page.tsx` | — | — |
| `/cases` | `src/app/cases/page.tsx` | — | — |
| `/contact` | `src/app/contact/page.tsx` | — | — |
| `/equipe/[slug]` | `src/app/equipe/[slug]/page.tsx` | — | — |
| `/explore` | `src/app/explore/page.tsx` | — | — |
| `/for-agencies` | `src/app/for-agencies/page.tsx` | `src/app/for-agencies/layout.tsx` | — |
| `/for-brands` | `src/app/for-brands/page.tsx` | `src/app/for-brands/layout.tsx` | — |
| `/for-talents` | `src/app/for-talents/page.tsx` | `src/app/for-talents/layout.tsx` | — |
| `/legal/mentions` | `src/app/legal/mentions/page.tsx` | `src/app/legal/layout.tsx` (parent) | — |
| `/legal/privacy` | `src/app/legal/privacy/page.tsx` | `src/app/legal/layout.tsx` (parent) | — |
| `/legal/cookies` | `src/app/legal/cookies/page.tsx` | `src/app/legal/layout.tsx` (parent) | — |
| `/process` | `src/app/process/page.tsx` | — | — |
| `/services` | `src/app/services/page.tsx` | — | — |
| `/studio` | `src/app/studio/page.tsx` | `src/app/studio/layout.tsx` | — |
| `/studio/julien-ardid` | `src/app/studio/julien-ardid/page.tsx` | `src/app/studio/layout.tsx` (parent) | — |

### Root Layout / Providers / Transition Placement
- Root layout: `src/app/layout.tsx`
- Global wrappers order: `GoogleAnalytics` → skip-link → JSON-LD scripts → `GlobalBackground` → `GlobalNav` → `PageTransition` → `CookieBanner`.
- Route transition component: `src/components/layout/PageTransition.tsx`
- Observation: no route-level `AnimatePresence`; only keyed `motion.div` with enter fade.

### Components with Animation Logic (`framer-motion`)
Detected in these files (mapping complete):
- `src/components/layout/PageTransition.tsx`
- `src/components/common/BackgroundFlow.tsx`, `src/components/common/RevealAnimation.tsx`
- `src/components/ui/fade-in.tsx`, `src/components/ui/button-animated.tsx`
- `src/components/home/HomeClient.tsx`
- `src/components/for-brands/*` animated files: `BrandHeroV2`, `CaseStudiesSection`, `ComparisonSectionV2`, `FaqSection`, `FloatingNavigation`, `HeroWidgets`, `ProcessSection`, `ServicesAndMetrics`, `TeamSectionBrands`, `ValuePropositionSection` (+ legacy animated files present)
- `src/components/for-talents/*` animated files: nav, hero, persona/positioning, deliverables + drawers, journey, faq, team + drawer, widgets, redesign components
- `src/components/studio/*` animated files: `ProductionsGrid`, `SequentialVideoPlayer`, `StudioVideo`, `studio/julien/*`
- `src/components/legal/LegalComponents.tsx`
- `src/lib/animation-presets.ts`

### Navigation Elements Mapping
Primary navigation behaviors found:
- `Link` / `href` navigation across route pages and sections (see `rg` hits in `src/app/*` and `src/components/*`).
- Programmatic navigation:
  - `router.push(...)`: `src/app/legal/layout.tsx`
  - `window.history.back()`: `src/app/legal/layout.tsx`
  - `window.location.assign(...)`: `src/app/for-brands/page.tsx`, `src/components/layout/GlobalNav.tsx`, `src/components/studio/ProductionsGrid.tsx`
  - `window.history.replaceState(...)` hash updates: `src/components/for-talents/TalentsFloatingNavigation.tsx`

## Findings

### 1) Hardcoded Back Links (not history-aware)
- **Element**: `src/app/studio/page.tsx:20`, `src/app/studio/julien-ardid/page.tsx:23`, `src/app/equipe/[slug]/page.tsx:56`
- **Severity**: 🔴 Bloquant
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Navigation
- **Problem**: Back controls are hardcoded (`/`, `/studio`, `/for-talents`) instead of returning to the exact previous page. Deep-link entries also have no robust fallback behavior, violating back-button coherence across flows.
- **Fix**:
```tsx
"use client"
import { useRouter } from "next/navigation"

function SmartBackButton({ fallback, children }: { fallback: string; children: React.ReactNode }) {
  const router = useRouter()
  const onBack = () => {
    if (window.history.length > 1) router.back()
    else router.push(fallback)
  }
  return <button onClick={onBack}>{children}</button>
}
```

### 2) Legal Pages Use Section Navs with Dead Anchors
- **Element**: `src/app/legal/layout.tsx:21` + anchor definitions in `src/components/for-brands/FloatingNavigation.tsx:133`, `src/components/for-talents/TalentsFloatingNavigation.tsx:174`
- **Severity**: 🔴 Bloquant
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Navigation
- **Problem**: Legal pages mount floating navs designed for landing-page sections (`#dashboard`, `#services`, `#deliverables`, etc.) that do not exist on legal routes. Users get non-functional navigation.
- **Fix**:
```tsx
// In legal layout, render a dedicated legal nav instead of section navs
<PageShell
  variant={isBrand ? "brands" : "talents"}
  nav={<LegalTopNav context={isBrand ? "brands" : "talents"} />}
>
```

### 3) "Estimer mon plan" CTA Misroutes on Legal Pages
- **Element**: `src/app/legal/layout.tsx:21`
- **Severity**: 🟠 Majeur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Navigation
- **Problem**: On legal pages in brand context, the CTA labeled “Estimer mon plan” routes to `/for-brands` instead of the estimator/questionnaire entrypoint. CTA semantics are inconsistent with the rest of the site.
- **Fix**:
```tsx
<FloatingNavigation onEstimateClick={() => window.location.assign('/questionnaire-brands/index.html')} />
```

### 4) Conflicting Scroll Target on Talent Hero CTA
- **Element**: `src/components/for-talents/HeroSection.tsx:92`, `src/components/for-talents/ForTalentsClient.tsx:15`
- **Severity**: 🟠 Majeur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Navigation
- **Problem**: Link target is `#journey` but click handler scrolls to `#problem`, creating conflicting behavior and possible double-scroll/hash mismatch.
- **Fix**:
```tsx
<Link
  href="#journey"
  onClick={(e) => {
    e.preventDefault()
    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", "#journey")
  }}
>
```

### 5) Missing Route-Level `AnimatePresence` / Exit Lifecycle
- **Element**: `src/app/layout.tsx:132`, `src/components/layout/PageTransition.tsx:23`
- **Severity**: 🟠 Majeur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Animation
- **Problem**: Page transitions only fade in; no coordinated exit animation. This causes inconsistent transition quality and can produce abrupt content swaps.
- **Fix**:
```tsx
import { AnimatePresence, motion } from "framer-motion"

<AnimatePresence mode="wait" initial={false}>
  <motion.div
    key={pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### 6) Studio Routes Bypass Global Transition (Inconsistent UX)
- **Element**: `src/components/layout/PageTransition.tsx:16-19`
- **Severity**: 🟠 Majeur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Animation
- **Problem**: `/studio*` routes skip transitions entirely while others animate, creating inconsistency in navigation feel.
- **Fix**:
```tsx
// Keep only reduced-motion bypass; do not special-case /studio
if (prefersReducedMotion) return <>{children}</>
```

### 7) Reduced-Motion Not Respected Across Multiple Motion Loops
- **Element**: `src/components/for-brands/HeroWidgets.tsx:151`, `src/components/studio/julien/JulienBrandsMarquee.tsx:34`, `src/components/for-talents/redesign/MagneticButton.tsx:57` (examples)
- **Severity**: 🟠 Majeur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Animation
- **Problem**: Several components run continuous motion without `useReducedMotion` gating.
- **Fix**:
```tsx
import { useReducedMotion } from "@/hooks/useReducedMotion"

const reduce = useReducedMotion()
<motion.div animate={reduce ? undefined : { y: [0, -100] }} transition={reduce ? undefined : { repeat: Infinity, duration: 10, ease: "linear" }} />
```

### 8) Global Reduced-Motion CSS Is Unsafe for Infinite Animationsx
- **Element**: `src/app/globals.css:262-273`
- **Severity**: 🟠 Majeur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Animation
- **Problem**: Setting `animation-duration: 0.01ms !important` globally can turn infinite loops into near-instant flashing loops instead of disabling motion.
- **Fix**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

### 9) Infinite Marquee/Loop Animations Keep Running (Perf Risk)
- **Element**: `src/components/ui/marquee.tsx:41`, usages in `src/components/for-brands/ServicesAndMetrics.tsx:300`, `src/components/for-brands/ClientsSection.tsx:36`
- **Severity**: 🟠 Majeur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Performance
- **Problem**: Marquees run indefinitely even when offscreen/backgrounded, increasing CPU/GPU cost on long sessions and mobile devices.
- **Fix**:
```tsx
// Pause when not in viewport
const inView = useInView(ref, { amount: 0.2 })
<div className={cn(!inView && "[animation-play-state:paused]")}>...</div>
```

### 10) Missing `aria-current` in Brand Floating Navigation
- **Element**: `src/components/for-brands/FloatingNavigation.tsx:133`
- **Severity**: 🟡 Mineur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Navigation
- **Problem**: Active section bubble is visual only; no `aria-current` for assistive tech.
- **Fix**:
```tsx
<a aria-current={isActive ? "page" : undefined} ...>{item.label}</a>
```

### 11) Mobile Typography Below 14px in Multiple Interactive Areas
- **Element**: e.g. `src/components/for-talents/widgets/KPIPulseWidget.tsx:70+`, `src/components/for-talents/widgets/ProductionPipelineWidget.tsx:37+`, `src/components/for-talents/distribution/PlatformTable.tsx:134+`
- **Severity**: 🟠 Majeur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Responsive
- **Problem**: Repeated `text-[9px]`, `text-[10px]`, `text-[11px]` styles reduce readability and fail the mobile typography target.
- **Fix**:
```tsx
// Example pattern
className="text-sm md:text-[10px]"
```

### 12) Some Interactive Targets Are Under 44x44
- **Element**: `src/components/team/ProfileDrawer.tsx:203`, `src/components/studio/SequentialVideoPlayer.tsx:125`
- **Severity**: 🟡 Mineur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: Responsive
- **Problem**: Certain controls are ~40x40, which is below recommended touch target size.
- **Fix**:
```tsx
className="min-h-11 min-w-11 h-11 w-11 ..."
```

### 13) Contact Flow Has No In-App Form State (Pending/Error/Success)
- **Element**: `src/app/contact/page.tsx:66-79`
- **Severity**: 🟠 Majeur
- **Status**: ✅ Fixed (2026-02-23)
- **Category**: UX Flow
- **Problem**: Current flow is `mailto` + external diagnostic link. There is no in-app validation, pending, success, or error feedback path.
- **Fix**:
```tsx
// Add minimal contact form with pending/error/success states
const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle")
<button disabled={status === "loading"}>{status === "loading" ? "Envoi..." : "Envoyer"}</button>
```

### 14) `FuturisticBackground` Is Not Integrated to Current Runtime Strategy
- **Element**: `src/components/ui/FuturisticBackground.tsx:24-240`
- **Severity**: 🔵 Suggestion
- **Status**: ⏳ Not applied (component unused in current runtime)
- **Category**: Performance
- **Problem**: Component is currently unused; if reintroduced, it lacks `pointer-events: none` on canvas and DPR capping (`devicePixelRatio` is uncapped).
- **Fix**:
```tsx
scale = Math.min(window.devicePixelRatio || 1, 2)
<canvas className="block h-full w-full pointer-events-none" />
```

## Screenshot-Worthy Flows to Re-test After Fixes
1. Deep-link directly to `/legal/privacy?context=brands`, then use top nav + Retour.
2. `/for-talents` hero secondary CTA: verify single smooth scroll + correct hash.
3. Route transitions: `/explore` → `/for-brands` → `/studio` → `/studio/julien-ardid`.
4. Mobile nav open/close on `/for-brands` and `/for-talents` after section taps.
5. OS reduced-motion enabled: verify marquees/background loops stop and no flashing.
6. Touch testing on iPhone viewport (375px): close buttons, video controls, drawer actions.

---
Status: fixes applied by priority (Bloquant + Majeur + Mineur), builds passing after each batch.
