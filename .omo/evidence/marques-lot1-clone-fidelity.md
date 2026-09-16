# Marques lot 1 correction: clone-fidelity QA (fresh-evidence re-evaluation)

recommendation: APPROVE (QA verdict: PASS)

## Scope and evidence inspected

- Scope: only the final Marques lot 1 correction: reduced mobile nav-to-hero spacing and the bright, continuous method rail.
- Before-state spacing reference inspected with `view_image`: `/private/var/folders/7_/63m6ktjd49x7fyx1sfzghtjh0000gn/T/TemporaryItems/NSIRD_screencaptureui_gRd9WU/Capture d’écran 2026-09-14 à 13.12.05.png`.
- Directional rail reference inspected with `view_image`: `/Users/sasha/.codex/generated_images/01a09b48-f370-7e83-90d5-c1dacaea95a3/exec-fa6640e8-304f-42a9-8ca8-6bd3cc7d650c.png`.
- Final production PNGs inspected with `view_image`: `output/playwright/brands-revision-final-504-hero.png`; `brands-revision-final-504-rail-0.png`, `-1.png`, `-2.png`; `brands-revision-final-1280-rail-0.png`, `-1.png`, `-2.png`; `brands-revision-final-375-short-hero.png`; and `brands-revision-final-375-method.png`.
- Motion artifact inspected for metadata: `output/playwright/brands-lot1-revision-rail.webm` (1280x800, 25fps, 63.8s). Supplied current-build transform evidence: 504px `-479,-361,-244` and 1280px `-1025,-732,-447` over about three seconds, with `playState: running` while hovered.
- Freshness validated: final hero PNGs (13:29:12 and 13:30:11) postdate `BrandBook.module.css` (13:17:53); final rail PNGs (13:29:13-13:29:41) and WebM (13:26:35) postdate `BrandMethodSection.module.css` (13:20:07).
- Source inspected: `src/components/for-brands/BrandHeroV2.tsx`, `src/components/for-brands/BrandBook.module.css`, `src/components/for-brands/BrandMethodSection.tsx`, `src/components/for-brands/BrandMethodSection.module.css`, `src/components/for-brands/BrandBookScene.tsx`, `DESIGN.md`, and `src/lib/design-tokens.ts`.

## Findings

### CRITICAL

None. The method is a live semantic ordered list (`src/components/for-brands/BrandMethodSection.tsx:52-67`), and the hero book is a runtime Three.js scene (`src/components/for-brands/BrandBookScene.tsx:229-259`), not a screenshot or background-image stand-in.

### HIGH

None. The final captures are fresh, and the three-frame sequences substantiate the runner's progression in both orientations. The 504px frames show the vertical point progressing from Audit through Strategie to Casting; the 1280px frames show the horizontal point progressing from the first through third columns. No crop, text collision, or artificial-looking halo was found in those frames.

### MEDIUM

None. At 504px and 375x667px, the hero headline starts roughly 31-40px below the 72px header divider and retains the same mobile gutter as the logo. The shorter mobile hero keeps the book, notes, and bottom action separated.

### LOW

None.

## Token-scope decision

Not a blocker in this lot. `DESIGN.md:30-40` is the current Marques V2 design authority and explicitly specifies the mineral, ink, muted, vermilion, rule, gutter, typography, and 7.5-second rail system. The scoped `--method-*` variables in `src/components/for-brands/BrandMethodSection.module.css:1-8` faithfully encode that authority. The older `src/lib/design-tokens.ts` contains a different Tailwind/slate/orange system and is not an appropriate source for this V2 primitive. The local hardcoded values outside those variables are implementation constants, not evidence that the visual system is faked.

## Blocking issues before approval

None.
