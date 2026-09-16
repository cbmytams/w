# For Brands Visual Fidelity Gate Review

recommendation: REJECT (user-facing verdict: REVISE)

originalIntent: Preserve the approved realistic 3D book on `/for-brands`; make each of three chapter transitions show a physical page turn; replace the fixed photo with four refined service marks; follow with cinematic, stacked Basic Fit, CJ Group/Korea House, and Equip Auto case bands. The supplied 568x434 reference is conceptual, not a pixel target.

desiredOutcome: A coherent, responsive scroll story where the book and its HTML chapter text advance together, followed by three legible photographic case bands with separated results, as specified in `DESIGN.md`.

userOutcomeReview: All 27 final captures were opened and directly inspected at 1280, 768, and 375 pixels. The closed book, four distinct marks, curved mid-turn leaves, and three case bands render without visible clipping or incoherent overlap. The case photography is illustrative, as disclosed in the input, and its layout broadly follows the conceptual reference. The desktop mid-turn frames expose a repeated mismatch between the next mark on the right page and the previous chapter in the HTML panel. This interrupts the intended synchronized story.

blockers:

- violatedCriterion: DESIGN.md / Mouvement / "Les textes changent au même jalon."
  observation: At each 1280px mid-turn capture, the visible right page names the next service while the chapter panel and counter still name the prior service.
  evidencePointer: `output/playwright/final-1280-turn-one.png` (CRÉATION page, Influence panel), `output/playwright/final-1280-turn-two.png` (PRODUCTION page, Création panel), `output/playwright/final-1280-turn-three.png` (ADS page, Production panel). The mismatch also appears in `final-375-turn-one.png`. `BrandHeroV2.tsx` derives panel state from raw scroll progress while `BrandBookScene.tsx` renders smoothed progress and chooses the next right-page map throughout a turn.

checkedArtifactPaths:

- `DESIGN.md`; `docs/brand-book-design.md`; `docs/brand-book-audit.md`
- `/var/folders/7_/63m6ktjd49x7fyx1sfzghtjh0000gn/T/codex-clipboard-e27ff627-e446-4834-83e4-34ea97cb03bd.png`
- `output/playwright/final-{1280,768,375}-{closed,influence,turn-one,turn-two,turn-three,ads,case-1,case-2,case-3}.png` (all 27 opened individually)
- `src/app/for-brands/page.tsx`; `src/components/for-brands/{BrandHeroV2.tsx,BrandBookScene.tsx,BrandBook.module.css,CaseStudiesSection.tsx,CaseStudiesSection.module.css,brand-book-content.ts,brand-book-model.ts}`; `src/__tests__/components/for-brands/hero-widgets.test.ts`; current git diff and status

evidenceGaps:

- No current final-edit code review report, manual QA matrix, or notepad path was supplied or found. `docs/brand-book-audit.md` is dated 2026-09-13 and documents earlier `book-qa-*` captures, so it does not verify the 27 final screens.
- Build, standalone typecheck, route interaction, pixel-nonblank, overflow, and exact page-turn progress claims in the task packet were not independently rerun in this read-only visual audit. Captures corroborate nonblank visuals and visible turns, but cannot prove navigation, keyboard, reduced-motion, or performance behavior.
- The conceptual-reference diff score is not a meaningful fidelity score because dimensions differ; composition was inspected directly.

Direct remove-ai-slops/programming pass: Inspected the relevant production modules, current diff, and the only found test. The `hero-widgets.test.ts` test targets the old widget and mirrors asset/removal details (`basic_fit_campaign.png`, absence of `Cadre validé` and SVG), so it offers no regression confidence for the new book or case bands. The WebGL scene creates many high-resolution canvas textures and layered meshes; this may carry memory cost, but no supplied performance criterion or measurement proves failure. `BrandBookScene.tsx` uses non-null canvas context assertions and a silent renderer catch; these are maintenance notes, not visual blockers. No unnecessary extraction or parsing/normalization was found that fails a stated criterion. The earlier audit does not explicitly cover this skill perspective or overfit/slop criteria; this direct pass provides that coverage. `git diff --check` passed. No code or product files were edited.

whatMustRemain: Realistic black book and cover composition; three visible leaf rotations; four distinct service seals; accessible HTML commercial copy; stacked, edge-to-edge case imagery and separated three-result bands at desktop/tablet/mobile.
