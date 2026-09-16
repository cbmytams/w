# Salon Auto Editorial Panorama Gate Review

recommendation: APPROVE
verdict: PASS
confidence: high
blockers: []

## Original Intent

Replace only the artificial square Salon de l'Auto case-study image on `/for-brands` with a polished, authentic editorial panorama at the quality level of the approved Basic-Fit and CJ Group cases. Preserve the case copy, dimensions, metrics, reveal animation, and the two approved cases across desktop, tablet, and mobile.

## Desired Outcome

The third case reads as a credible live automotive-event photograph rather than an isolated square asset, integrates with the established dark editorial band, retains the existing text and proof metrics, remains responsive without horizontal overflow, and preserves the one-shot reveal behavior.

## User Outcome Review

PASS. The replacement source is a genuine 3:1 panorama (`2172 x 724`), matching the pixel dimensions of the Basic-Fit and CJ panorama assets. It shows a live vehicle reveal with a crowd, raised phones, press activity, venue lighting, and recognizable event signage. This creates the requested editorial-documentary character and is materially more authentic than the rejected centered square.

The supplied desktop, tablet, and mobile section captures were inspected at native resolution. The crop remains effective at all three breakpoints: the reveal stage and vehicle stay central, surrounding spectators remain visible, and the left copy and right/bottom metrics remain legible. The third card measures `1440 x 252`, `768 x 246`, and `390 x 373`; no capture shows clipping, incoherent overlap, or horizontal overflow. The fresh section captures also show Basic-Fit and CJ retaining their established imagery, copy, metrics, and layout.

The rejected issue screenshot was treated only as evidence of the former square treatment. Compared with it, the new image fills the visual field and eliminates the pasted-poster effect without using decorative filler. The source preserves the Salon copy and proof values (`23`, `+100`, `4 jours`) and points the third case to `/images/cases/salon-auto-editorial-v2.webp` with `imageTreatment: "panorama"`.

Reveal evidence is consistent with the source: the card begins at opacity 0 and `translateY(16px)`, then settles at opacity 1 and no transform. The implementation includes a reduced-motion path that reveals immediately and omits transition setup.

## Criteria Review

- `C1-IMAGE-REPLACEMENT`: PASS. The third case uses `public/images/cases/salon-auto-editorial-v2.webp`, a `2172 x 724` editorial event panorama; direct source inspection and all three captures support the result.
- `C2-PRESERVE-COPY-METRICS`: PASS. The third-case title, description, detail, scope, and proof values remain present in `CaseStudiesSection.tsx`; the captures show the same visible copy and metrics as the issue reference.
- `C3-PRESERVE-DIMENSIONS-RESPONSIVE`: PASS. Supplied DOM evidence records `1440 x 252`, `768 x 246`, and `390 x 373`, with `scrollWidth === clientWidth` at every viewport; captures visually corroborate this.
- `C4-PRESERVE-MOTION`: PASS. Supplied computed-style evidence records opacity/translate initial state and opacity 1/no-transform settled state. Source inspection confirms the one-shot observer and reduced-motion branch.
- `C5-PRESERVE-APPROVED-CASES`: PASS. Fresh section captures show Basic-Fit and CJ intact and coherent with the replacement. No requested copy or metrics are missing from source.
- `C6-BUILD-LINT`: PASS. Independently rerun on 2026-09-15: `npm run lint -- --no-cache` exit 0; `npm run build` exit 0, including TypeScript and `/for-brands` generation.
- `C7-NO-AI-SLOP`: PASS. Direct `remove-ai-slops` and `programming` review found no excessive/deletion-only/tautological/implementation-mirroring tests, unnecessary test additions, speculative extraction, parsing or normalization, dead code, debug output, unsafe TypeScript escape hatch, or oversized TSX module. The component is 158 pure LOC. No tests target this replacement, so there is no artificial test coverage to credit or reject.

## What Is Good

The selected frame has strong real-event specificity: audience behavior, presenters, haze, stage screens, and workshop-brand context all communicate coverage rather than generic automotive advertising. The wide source lets the same focal event survive desktop, tablet, and mobile crops. Contrast remains restrained, and the orange metrics keep the established visual rhythm across all three cases.

## Checked Artifact Paths

- `/var/folders/7_/63m6ktjd49x7fyx1sfzghtjh0000gn/T/TemporaryItems/NSIRD_screencaptureui_9QXmCC/Capture d’écran 2026-09-15 à 18.08.30.png`
- `/Users/sasha/Desktop/wafia - website/src/components/for-brands/CaseStudiesSection.tsx`
- `/Users/sasha/Desktop/wafia - website/src/components/for-brands/CaseStudiesSection.module.css`
- `/Users/sasha/Desktop/wafia - website/public/images/cases/salon-auto-editorial-v2.webp`
- `/Users/sasha/Desktop/wafia - website/public/images/cases/basic-fit-editorial.webp`
- `/Users/sasha/Desktop/wafia - website/public/images/cases/korea-house-editorial-v2.webp`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/desktop-section.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/tablet-section.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/mobile-section.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/desktop-settled.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/desktop-mid.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/desktop.json`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/tablet.json`
- `/Users/sasha/Desktop/wafia - website/output/playwright/salon-auto-v2c/mobile.json`
- `/Users/sasha/Desktop/wafia - website/.omo/evidence/case-studies-visual-fidelity-gate-review.md`
- Current git status and scoped source comparison

## Exact Evidence Gaps

- No ULW plan exists, so the mandated fallback report location is used.
- No dedicated executor evidence file, code-review report, manual QA matrix, or notepad path was supplied or found for this narrow Salon iteration. The earlier case-study gate report includes a direct slop/programming pass but predates this image replacement. This review independently covers those perspectives and reproduces the applicable build, lint, source, image, and visual checks.
- No clean commit or task-specific patch was supplied that isolates this replacement from the broader dirty working tree. Preservation is therefore established from the provided issue reference, fresh captures, current source, and measurements rather than commit-level provenance. This is a NOTE because no success criterion requires a clean commit artifact and the observed product outcome satisfies the stated preservation requirements.
- The production build emits pre-existing workspace-root and Node deprecation warnings. Compilation, TypeScript, static generation, and lint pass; neither warning is tied to the reviewed criterion.
