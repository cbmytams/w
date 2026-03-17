# Mobile Drawer Performance Guardrails

This project uses an explicit low-cost rendering mode to keep mobile drawer interactions stable on iOS/WebKit.

## Why this exists

On mobile browsers (especially WebKit), `filter: blur(...)` + animated overlays can trigger expensive repaint/compositing work during drawer open/close transitions. This previously caused delayed opening and dropped frames.

## Current strategy

`src/components/common/BackgroundFlow.tsx` uses a constrained runtime flag:

- `isConstrainedRuntime = isMobile || saveData || lowMemory`

When constrained runtime is enabled:

- Glow layers use small, non-blurred shapes
- `gpu-accelerated`/forced transform hints are avoided for glow layers
- `willChange` is set to `auto` for glows
- Glow fill uses flat soft colors instead of radial gradients
- Ambient/parallax/pulse animations are disabled

Drawer components are also tuned:

- Detail content rendering is deferred until after sheet animation (`DETAILS_DEFER_MS > SHEET_ANIMATION_MS`)
- Scroll lock is applied on mobile and desktop via `src/hooks/useBodyScrollLock.ts`
- Drawer transition includes both transform and opacity

## Non-goal

In constrained runtime mode, visual richness is intentionally reduced. Stability and responsiveness are prioritized over background animation fidelity.
