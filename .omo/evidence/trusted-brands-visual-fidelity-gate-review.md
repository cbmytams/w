# Trusted Brands Visual Fidelity Gate Review

recommendation: APPROVE

blockers: []

originalIntent: Review only `/for-brands#trusted-brands` against the supplied screenshot as a stylistic reference. The expected direction is editorial paper, a strong “Ils nous font confiance” heading, every real Wafia client logo in a continuous premium loop, an independently moving vermilion light, a handwritten annotation, responsive desktop/tablet/mobile behavior, and a reduced-motion fallback.

desiredOutcome: A polished full-width trust strip that preserves the reference's editorial hierarchy and writing style without requiring pixel identity, keeps all 18 client marks in a seamless continuous sequence, remains balanced and unclipped across the supplied viewport states, and exposes a legible static/scrollable reduced-motion state.

userOutcomeReview: PASS. The shipped section clearly reads as the requested editorial trust strip. Across the supplied captures, the title remains the dominant element, the paper/rule system and chapter index preserve the reference direction, the logo corridor is optically coherent, the vermilion scanner is visible at different positions in motion frames, and the handwritten note remains legible without colliding with adjacent content. Mobile deliberately reduces ancillary header copy while preserving hierarchy. The reduced-motion capture removes the scanner and presents the first sequence as a static horizontally scrollable corridor. Edge logo truncation occurs only inside the intentional masked/faded corridor and is not content clipping.

## Evidence Trace

- Reference — `Capture d’écran 2026-09-15 à 11.52.50.png` (1438x328): directly opened. Establishes inspiration: ivory paper, marginal chapter number, heavy black heading, gray full-width logo corridor, orange handwritten note, thin rules, and restrained uppercase side copy. It is not a pixel target; its different height is not treated as a defect.
- Desktop frame 0 — `output/playwright/brands-trust-approved-desktop-0.png` (1440x387): directly opened. Full section is visible. Heading has strong scale and ample breathing room; chapter rail, right-side microcopy, rules, annotation, and footer action align cleanly. Seven distinct marks are visible with consistent cell rhythm. Scanner glow is visible near Asics. No section overlap or incoherent clipping.
- Desktop frame 1 — `output/playwright/brands-trust-approved-desktop-1.png` (1440x387): directly opened. Same stable geometry at a later marquee/scanner phase; Carrefour through the leading edge of L’Oréal remain evenly spaced. Scanner has advanced to the right, corroborating independent motion. The first/last logo fragments sit within the designed fade zone.
- Tablet — `output/playwright/brands-trust-approved-tablet.png` (768x399): directly opened. Header simplifies successfully, title remains dominant at a readable two-column scale, and four logos occupy the corridor without optical crowding. Annotation and footer action remain separated and legible. No overlap; the lower cookie surface belongs to the surrounding page and does not cover the reviewed section.
- Mobile — `output/playwright/brands-trust-approved-mobile.png` (375x375): directly opened. The heading wraps cleanly to three lines beside the chapter index. Two logos are comfortably readable, scanner glow is visible, and the annotation/footer action divide the narrow footer without collision. No horizontal page overflow is visible in the capture.
- Mobile reduced motion — `output/playwright/brands-trust-approved-mobile-reduced.png` (375x375): directly opened. Static Adidas and Asics marks are clear, Alibaba enters at the corridor edge, and no scanner is rendered. Source confirms the animated duplicate is hidden and the corridor becomes horizontally scrollable, so all first-sequence brands remain reachable without motion.

## Source Verification

- `src/components/for-brands/ClientsSection.tsx:18-35, 64-75`: maps all `CLIENTS` into each of two identical sequences; the duplicate is aria-hidden. The section includes the requested heading and handwritten annotation.
- `src/constants/clients.ts:13-32`: contains 18 client entries. Every referenced logo asset exists under `public/logos/`.
- `src/components/for-brands/ClientsSection.module.css:1-18, 21-48`: scoped ivory paper, ink, vermilion, rule, chapter, and heading system.
- `src/components/for-brands/ClientsSection.module.css:76-190, 219-240`: stable logo corridor, 28-second `translateX(-50%)` marquee over equal sequences, faded edges, and independent 6.8-second scanner using transform/opacity/filter.
- `src/components/for-brands/ClientsSection.module.css:242-337`: responsive tablet/mobile dimensions and typography.
- `src/components/for-brands/ClientsSection.module.css:339-353`: reduced-motion marquee disabled, scanner hidden, horizontal overflow enabled, duplicate sequence hidden.
- `DESIGN.md:54-60`: current governing contract for this section.
- All five actual PNGs are newer than the scoped TSX/CSS source, have valid PNG signatures, expected dimensions, and no blank compositor regions. `git diff --check` passed for the scoped paths.

## Findings

- [product] No visual defect was found that violates a stated criterion. The unusually large source-specific scaling for Adidas and L’Oréal is visibly doing optical normalization, not producing overflow in the supplied frames.
- [evidence] Static frames corroborate different marquee/scanner positions but cannot independently measure exact 28s/6.8s durations or prove every animation frame. The source expresses those timings directly.
- [evidence] The tablet and mobile captures are 399px/375px-high section clips rather than full-page viewport captures. They are sufficient for overlap/clipping inside `#trusted-brands`; unrelated surrounding sections were intentionally excluded.
- [evidence] No current scoped executor report, dedicated code-review report, manual QA matrix, or notepad path was supplied or found. Existing `.omo/evidence` reports concern other `/for-brands` work. The missing report therefore cannot demonstrate its own remove-ai-slops/programming coverage, but the direct gate pass below supplies the relevant coverage and no stated success criterion requires those files.

## Remove-AI-Slops / Programming Pass

Directly inspected the scoped diff, production code, constants, and available tests. No new test targets this section, so there are no deletion-only, removal-only, tautological, or implementation-mirroring tests creating false confidence. No unnecessary parsing, normalization, compatibility layer, broad exception handling, dead branch, or speculative dependency was introduced. `LogoSequence` is a small justified extraction that guarantees the two required identical marquee groups. The two per-logo scale overrides are bounded optical corrections corroborated by the captures. The CSS module is comparatively long but cohesive around one visual component; this is a maintenance note, not a violation of any visual success criterion. No scope drift affecting unrelated sections was reviewed or inferred.

## Checked Artifact Paths

- `/var/folders/7_/63m6ktjd49x7fyx1sfzghtjh0000gn/T/TemporaryItems/NSIRD_screencaptureui_0MNhgS/Capture d’écran 2026-09-15 à 11.52.50.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/brands-trust-approved-desktop-0.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/brands-trust-approved-desktop-1.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/brands-trust-approved-tablet.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/brands-trust-approved-mobile.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/brands-trust-approved-mobile-reduced.png`
- `/Users/sasha/Desktop/wafia - website/src/components/for-brands/ClientsSection.tsx`
- `/Users/sasha/Desktop/wafia - website/src/components/for-brands/ClientsSection.module.css`
- `/Users/sasha/Desktop/wafia - website/src/constants/clients.ts`
- `/Users/sasha/Desktop/wafia - website/DESIGN.md`
- `/Users/sasha/Desktop/wafia - website/.omo/evidence/`

exactEvidenceGaps: Exact animation duration and seamlessness across a complete 28-second cycle were not recorded as video or traced over a full cycle; build and targeted ESLint success were supplied but not rerun because this gate is read-only; no scoped code-review report, manual QA matrix, executor evidence file, or notepad path exists. None of these gaps proves failure of a stated visual criterion, and the fresh rendered captures plus direct source inspection support completion.
