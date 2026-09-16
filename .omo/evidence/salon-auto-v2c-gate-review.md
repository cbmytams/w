# Salon Auto V2C Gate Review

recommendation: APPROVE
verdict: PASS
confidence: HIGH
blockers: []

## Original Intent

Assess, read-only, whether the newly integrated authentic Salon de l'Auto panorama is as polished and integrated as the unchanged Basic-Fit and CJ Group strips. The changed third strip must show no AI-like imagery, awkward crop, text collision, clipping, horizontal overflow, motion regression, or responsive regression at 1440, 768, and 390 px.

## Desired Outcome

The third strip should preserve the established dark/light/dark editorial rhythm and the same content anatomy as the first two rows while using recognizable documentary event photography. At the three supplied viewports it should retain readable copy and metrics, a coherent automotive focal point, exact card heights of 252/246/373 px, zero horizontal overflow, and a stable revealed state after the entrance motion.

## User Outcome Review

PASS. Every supplied screenshot was opened directly at original detail, including the rejected reference, all three full-section captures, and all three settled third-row captures. The source panorama was also opened directly.

The rejected image presents a conspicuously pristine, synthetic-looking launch scene with implausibly uniform lighting and crowd staging. The replacement is visibly documentary event photography: mixed trade-show lighting, real booth signage, uneven crowd occlusion, phones raised toward the reveal, smoke, and a central vehicle presentation. Nothing in the source or rendered crops exhibits obvious AI morphology, invented lettering, duplicated people, or compositing seams.

The replacement integrates with the existing strips. Desktop preserves the wide panorama and centers the reveal vehicle between the left copy and right proof rail. Tablet retains the central stage, vehicle, audience, and press line without squeezing the copy. Mobile narrows to the stage and car while preserving enough crowd and venue context to remain recognizably a live auto event. The darkest left portion supports the white text rather than obscuring a required subject. Across all three settled frames, the title, subtitle, CTA, and proof metrics remain inside their regions with no collision or clipping.

The full-section captures show continuity against Basic-Fit and CJ Group: identical row anatomy, consistent type scale and proof treatment, aligned dividers, and an intentional dark/light/dark cadence. The third row is visually denser than the first two because the authentic event photograph contains more people and signage, but the overlay and focal placement keep the hierarchy controlled; this is not an awkward crop or a polish regression.

## Criteria And Evidence Trace

- `VF1-AUTHENTIC-NON-AI`: PASS. `public/images/cases/salon-auto-editorial-v2.webp` and all third-row captures show documentary event detail without visible generative artifacts. The TSX references this asset directly at `CaseStudiesSection.tsx:60`.
- `VF2-CONTINUITY-POLISH`: PASS. `desktop-section.png`, `tablet-section.png`, and `mobile-section.png` show the third strip using the same visual/copy/proof structure and dark/light/dark rhythm as rows one and two.
- `VF3-CROP-RESPONSIVE`: PASS. `desktop-settled.png`, `tablet-settled.png`, and `mobile-settled.png` retain the stage vehicle as the primary focal point and preserve event context. CSS uses the shared panorama treatment and bounded `object-position` rules rather than a third-image-specific workaround.
- `VF4-NO-COLLISION-CLIPPING`: PASS for the changed third strip. Direct pixel inspection finds no overlap or clipping among the third strip's title, subtitle, CTA, imagery, and metrics at any supplied viewport.
- `VF5-NO-HORIZONTAL-OVERFLOW`: PASS. JSON records `scrollWidth === clientWidth` at 1440, 768, and 390 px.
- `VF6-EXACT-HEIGHTS`: PASS. JSON bounds are 252 px desktop, 246 px tablet, and 373 px mobile.
- `VF7-MOTION`: PASS. Desktop records hidden/translated initial and mid states followed by `opacity: 1; transform: none`; tablet records a genuine intermediate frame; mobile is already settled by the sampled mid point and remains stable. All three settled screenshots are fully composed.

## Concrete Findings

- [product] NOTE: `mobile-section.png` captures the fixed Wafia navigation across part of the first Basic-Fit strip, obscuring some first-row text. It does not overlap the changed Salon de l'Auto row, is absent from the isolated third-row capture, and cannot be tied to this image-only change. It is therefore outside the blocking scope of the stated third-image criteria.
- [evidence] NOTE: No same-size pixel diff is meaningful against the rejected reference because the requested outcome intentionally replaces that image and the reference is 1738 x 584 rather than one of the target viewports. Direct semantic and compositional comparison was used instead.
- [evidence] NOTE: The desktop `mid` sample still equals the hidden start state and the mobile `mid` sample already equals settled; only tablet captures a visible interpolation. The supplied computed-state JSON nevertheless proves start and settled states at every viewport, which satisfies the stated motion verification claim but does not document animation smoothness frame by frame.

## Remove-AI-Slops And Programming Pass

Direct pass completed over the scoped TSX, CSS, current diff, available tests/reports, and the production image. No new tests target this image-only revision, so there are no deletion-only/removal-only, tautological, implementation-mirroring, or excessive tests to credit or reject. The image change introduces no parser, normalizer, helper, production extraction, defensive branch, type escape, dead code, or scope drift. The common panorama pipeline is reused by all three rows; no client-specific CSS selector or unnecessary abstraction was added for Salon de l'Auto.

The existing case-study reports explicitly discuss `remove-ai-slops`, `programming`, overfit-test classes, unnecessary extraction/parsing/normalization, module size, motion, and responsive behavior. They predate this exact Salon image revision, so they are corroborating coverage rather than final proof. This direct pass supplies current-revision coverage.

## Checked Artifact Paths

- `/var/folders/7_/63m6ktjd49x7fyx1sfzghtjh0000gn/T/TemporaryItems/NSIRD_screencaptureui_9QXmCC/Capture d’écran 2026-09-15 à 18.08.30.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/desktop-section.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/tablet-section.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/mobile-section.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/desktop-settled.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/tablet-settled.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/mobile-settled.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/desktop.json`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/tablet.json`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/mobile.json`
- `/Users/sasha/Desktop/wafia - website/public/images/cases/salon-auto-editorial-v2.webp`
- `/Users/sasha/Desktop/wafia - website/src/components/for-brands/CaseStudiesSection.tsx`
- `/Users/sasha/Desktop/wafia - website/src/components/for-brands/CaseStudiesSection.module.css`
- `/Users/sasha/Desktop/wafia - website/.omo/evidence/case-studies-visual-fidelity-gate-review.md`
- `/Users/sasha/Desktop/wafia - website/.omo/evidence/case-studies-for-brands-gate-review.md`
- Current git diff and status

## Exact Evidence Gaps

- No ULW loop plan exists, so the required fallback report path under `.omo/evidence/` is used.
- No executor evidence file, current-revision independent code-review report, standalone manual QA matrix, or notepad path was supplied or found for this narrow image revision.
- Asset provenance, licensing, and client approval are not established by the repository artifacts. The direct visual review can establish absence of visible AI-like defects, not legal provenance.
- No frame-by-frame video or evenly sampled motion sequence was supplied. Start/settled behavior and one tablet interpolation are evidenced; animation smoothness is not independently measured.

None of these gaps is tied to a stated required artifact or proves failure of a supplied visual success criterion.
