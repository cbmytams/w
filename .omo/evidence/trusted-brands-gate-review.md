# Trusted Brands Gate Review

recommendation: APPROVE

blockers: []

originalIntent: Review only `/for-brands` section `#trusted-brands` for a stylistic translation of the approved editorial-paper reference: a strong “Ils nous font confiance” heading, every real Wafia client logo in a continuous premium loop, an independent moving vermilion light, a handwritten annotation, responsive desktop/tablet/mobile behavior, and a reduced-motion fallback.

desiredOutcome: A real, token-aligned DOM section whose visual direction matches the approved reference without requiring pixel identity, whose complete client roster loops continuously at normal motion settings, and whose content remains available and readable when motion is reduced.

userOutcomeReview: PASS. All six supplied images were opened directly. The desktop motion frames show different roster positions and scanner positions; tablet and mobile preserve hierarchy without overlap; the reduced-motion mobile capture shows a stable horizontally scrollable roster. The result clearly retains the approved paper/editorial direction, prominent heading, vermilion handwritten note, monochrome logo corridor, and restrained moving light. Source and live runtime inspection establish that this is a real DOM implementation, not a raster stand-in. `CLIENTS` contains 18 entries, all 18 asset paths exist, the first sequence exposes all 18 named images, and the identical second sequence is `aria-hidden`. The two equal-width flex sequences and `translateX(-50%)` form a structurally seamless loop. Under `prefers-reduced-motion`, the marquee animation is removed, the scanner is hidden, the duplicate sequence is removed, and the corridor becomes natively horizontally scrollable so no brand depends on animation.

## Findings

- [evidence] LOW: No dedicated final-edit code-review report, manual QA matrix, executor evidence file, or notepad path for this section was supplied or located. Existing gate reports cover broader or earlier `/for-brands` work, not this final `#trusted-brands` change. Concrete fix: retain this direct gate report with the release evidence, or add a scoped executor/code-review packet on the next revision. This does not violate a stated product criterion.
- [evidence] NOTE: A first local command used `pnpm` against this npm-managed checkout and failed during dependency-manager reconciliation before lint/build ran. After restoring the npm lockfile-consistent dependency tree, targeted ESLint and `npm run build` both passed. This was a review-environment issue, not a product finding.
- [product] NOTE: No product defect survived the proof gate. The apparent narrow vertical bars in the supplied normal-motion captures are the browser page scrollbar, not a corridor overflow defect; live runtime reported page `scrollWidth` equal to viewport width and corridor `overflow-x: hidden`.

## What Is Good

- The component is semantic server-rendered React/Next DOM with a labelled section and `h2`; logo alt text is exposed once and the duplicate is excluded from accessibility output.
- The local CSS variables and resolved values align with `DESIGN.md`: ivory/mineral paper, `#19201e` ink, `#f45a32` vermilion, Outfit headings, Plus Jakarta body text, Caveat annotation, 6% desktop and 7% compact gutters, 28s marquee, and 6.8s scanner.
- Responsive captures at 1440, 768, and 375 pixels show stable corridor heights, readable annotation and footer label, and no incoherent overlap or horizontal page overflow.
- Motion is purposeful and independently layered. The roster and scanner animate with transforms/opacity; reduced motion removes both and preserves the complete primary roster through native scrolling.
- Direct remove-ai-slops/programming pass: no added deletion-only, removal-only, tautological, or implementation-mirroring tests; no unnecessary parser/normalizer; no dead or speculative production layer. `LogoSequence` is a justified small extraction for the two identical loop groups. Scoped TSX is 86 pure LOC and the client registry is 26 pure LOC.

## Checked Artifact Paths

- `/var/folders/7_/63m6ktjd49x7fyx1sfzghtjh0000gn/T/TemporaryItems/NSIRD_screencaptureui_0MNhgS/Capture d’écran 2026-09-15 à 11.52.50.png`
- `output/playwright/brands-trust-approved-desktop-0.png`
- `output/playwright/brands-trust-approved-desktop-1.png`
- `output/playwright/brands-trust-approved-tablet.png`
- `output/playwright/brands-trust-approved-mobile.png`
- `output/playwright/brands-trust-approved-mobile-reduced.png`
- `src/components/for-brands/ClientsSection.tsx`
- `src/components/for-brands/ClientsSection.module.css`
- `src/constants/clients.ts`
- `src/app/for-brands/page.tsx`
- `DESIGN.md`
- All 18 logo asset paths referenced by `CLIENTS`
- `.omo/evidence/for-brands-design-functional-integrity-gate-review.md`
- `.omo/evidence/for-brands-visual-fidelity-gate-review.md`
- `.omo/evidence/for-brands-sync-gate-review.md`
- Live `http://localhost:3000/for-brands` DOM/accessibility tree and computed styles
- Fresh `npm exec -- eslint src/components/for-brands/ClientsSection.tsx src/constants/clients.ts` result: PASS
- Fresh `npm run build` result: PASS; compilation, TypeScript, and generation of 63 static pages completed

## Exact Evidence Gaps

- No scoped independent code-review report explicitly covering `omo:programming`, `omo:remove-ai-slops`, and overfit-test criteria for this exact section revision. The direct pass above supplies the required coverage but is not independent executor evidence.
- No dedicated manual QA matrix or notepad path was supplied or found.
- The supplied reduced-motion computed-style observations were not independently queried from the live browser in this gate; the supplied reduced-motion capture plus the exact `@media (prefers-reduced-motion: reduce)` source prove the fallback structure.
- No video or frame captured at the exact marquee seam was supplied. The two desktop frames prove motion and stable framing, while the equal duplicate sequences, fixed flex geometry, linear timing, and `translateX(-50%)` source establish the continuous join. No stated criterion is shown to fail.

## Verification

- Targeted ESLint: PASS with zero output.
- Production build: PASS; Next.js compiled successfully, TypeScript completed, and all 63 static pages generated.
- `git diff --check` on tracked scoped files: PASS.
- Capture freshness and signatures: PASS; every supplied actual capture is newer than the scoped component/style source and identifies as a valid PNG.
- All 18 `CLIENTS` logo asset paths exist.
