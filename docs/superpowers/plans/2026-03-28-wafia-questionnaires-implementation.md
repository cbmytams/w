# WAFIA Questionnaires Canonical Content Migration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Talent and Brand questionnaire content, flow, scoring, and admin/reporting readers to the approved canonical sources without changing UI layouts.

**Architecture:** Introduce one canonical content path per questionnaire, then derive runtime maps, admin labels, and API fallbacks from those sources instead of from duplicated inline structures. Brand keeps stable `id` keys where the product intent survives, but removes budget/package signals, adds the two approved replacement questions, and rewires scoring/results/admin consumers in dependency order.

**Tech Stack:** Next.js 16 + TypeScript + Prisma + Jest (root) + Vite/React + Vitest (brand app)

---

## Execution Guardrails

- Run this plan in a fresh git worktree. The current workspace is dirty.
- Do not touch duplicated snapshot trees in `wafia-questionnaire-brands/src/* 2`, `* 3`, or `* 4`.
- Do not treat `src/lib/questionnaireData.ts` as a live editorial source. Leave it untouched unless a compatibility shim is strictly required.
- Respect the workstream dependency gate:
  1. Canonical content
  2. Conditions + flow
  3. Scoring migration
  4. Admin/reporting cleanup
- Workstream 1 must land before workstreams 3 and 4 start.
- UI layout stays unchanged. Only question content, section labels, result wording, and data/scoring/admin wiring may change.

## File Structure Map

### Canonical Content Layer

- Create: `src/lib/questionnaireTalentContent.ts`
  - Canonical Talent questions and conditions.
- Create: `src/lib/questionnaireContent.ts`
  - Shared root-side registry for canonical questionnaire metadata.
  - Exposes `getCanonicalQuestions(type)`, `getCanonicalQuestionsById(type)`, and `buildQuestionnaireMap(type)`.
- Modify: `src/lib/questionnaireMap.ts`
  - Replace inline duplicated maps with values derived from canonical content.
- Modify: `src/lib/questionnaireConditions.ts`
  - Stop importing `Condition` from `questionnaireData.ts`; use the shared canonical type.
- Modify: `wafia-questionnaire-brands/src/constants/questions.ts`
  - Brand canonical source aligned to approved spec.
- Modify: `wafia-questionnaire-brands/src/types/index.ts`
  - Update Brand section unions and result model to match the canonical Brand flow.

### Brand Runtime / Flow Layer

- Modify: `wafia-questionnaire-brands/src/constants/pillars.ts`
  - Update `SECTION_LABELS` to the 5 approved Brand blocks.
- Modify: `wafia-questionnaire-brands/src/hooks/useDiagnostic.ts`
  - Flow ordering, calibration/result derivation, local result persistence, and final submit wiring must reflect the new Brand content.
- Modify: `wafia-questionnaire-brands/src/App.tsx`
  - Runtime phase transitions must still work with the new `CALIBRATION_QUESTIONS` / `MAIN_QUESTIONS`.
- Modify: `wafia-questionnaire-brands/src/components/InterstitialScreen.tsx`
  - Section transition copy must match the new categories.
- Modify: `wafia-questionnaire-brands/src/components/DiagnosticLanding.tsx`
  - Remove package/pricing-adjacent copy.
- Modify: `wafia-questionnaire-brands/src/components/BrandResultsSummary.tsx`
  - Remove budget/package outputs while preserving layout.
- Modify: `wafia-questionnaire-brands/src/lib/leadInsights.ts`
  - Completion/progress labels must use the new Brand sections cleanly.
- Modify: `wafia-questionnaire-brands/src/components/Inspector.tsx`
  - Category selector and color handling must reflect the new Brand section union if this admin/editor surface is still used.

### Next API / Admin / Reporting Layer

- Modify: `src/app/api/v1/questionnaires/current/route.ts`
  - Fallback questions must come from canonical content by type.
- Modify: `src/app/api/v1/questionnaires/submit/route.ts`
  - Use canonical maps for completion and labels.
- Modify: `src/app/api/v1/questionnaires/exports/route.ts`
  - Prefer canonical labels as fallback when `sectionsJson` lacks labels.
- Modify: `src/lib/completion.ts`
  - Use canonical question lookups, not `questionnaireData.ts`.
- Modify: `src/components/questionnaire/FieldDisplay.tsx`
  - Keep API lookup path, but verify rendering still resolves canonical option labels after content migration.
- Modify: `wafia-questionnaire-brands/src/context/DiagnosticContext.tsx`
  - Append `?type=BRANDS` on all questionnaire admin API calls.

### Tests

- Create: `src/__tests__/lib/questionnaireContent.test.ts`
- Modify: `src/__tests__/api/questionnaires-current-route.test.ts`
- Modify: `src/__tests__/api/questionnaires-exports-route.test.ts`
- Modify: `src/__tests__/lib/completion.test.ts`
- Modify: `wafia-questionnaire-brands/src/constants/questions.integrity.test.ts`
- Create: `wafia-questionnaire-brands/src/constants/questions.structure.test.ts`
- Modify: `wafia-questionnaire-brands/src/utils/scoring.test.ts`
- Create: `wafia-questionnaire-brands/src/components/BrandResultsSummary.test.tsx`
- Create: `wafia-questionnaire-brands/src/context/DiagnosticContext.test.tsx`

## Chunk 0: Preflight and Isolation

### Task 0: Create an isolated worktree and capture the baseline

**Files:**
- Create: none
- Modify: none
- Test: none

- [ ] **Step 1: Create the implementation worktree**

Run:

```bash
mkdir -p /Users/sasha/Desktop/worktrees
git -C "/Users/sasha/Desktop/wafia - website" worktree add -b codex/questionnaires-canonical-migration /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical HEAD
```

Expected: new worktree created without modifying the dirty main workspace.

- [ ] **Step 2: Confirm only live source trees will be edited**

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical
find wafia-questionnaire-brands/src -maxdepth 1 -type d | sort
```

Expected: note `* 2`, `* 3`, `* 4` directories and mark them out of scope for this branch.

- [ ] **Step 3: Record the exact spec dependency**

Run:

```bash
git show --stat 96a58bb1 -- docs/superpowers/specs/2026-03-27-wafia-questionnaires-editorial-revision-design.md
```

Expected: the approved spec commit is visible and will be referenced during implementation.

## Chunk 1: Canonical Content

### Task 1: Add failing root tests for canonical content access

**Files:**
- Create: `src/__tests__/lib/questionnaireContent.test.ts`
- Modify: `src/__tests__/api/questionnaires-current-route.test.ts`
- Modify: `src/__tests__/lib/completion.test.ts`

- [ ] **Step 1: Write the failing canonical content registry tests**

Add tests that assert:

- `getCanonicalQuestions("TALENTS")` returns the approved Talent ids in the final canonical order.
- `getCanonicalQuestions("BRANDS")` resolves from the non-suffixed Brand source tree only.
- `buildQuestionnaireMap("BRANDS")` groups Brand questions into exactly 5 block labels.
- `current` route fallback returns Brand canonical questions when `?type=BRANDS`.

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical
npm test -- --runInBand src/__tests__/lib/questionnaireContent.test.ts src/__tests__/api/questionnaires-current-route.test.ts src/__tests__/lib/completion.test.ts
```

Expected: FAIL because `questionnaireContent.ts` and `questionnaireTalentContent.ts` do not exist yet.

### Task 2: Implement the root canonical content registry

**Files:**
- Create: `src/lib/questionnaireTalentContent.ts`
- Create: `src/lib/questionnaireContent.ts`
- Modify: `src/lib/questionnaireMap.ts`
- Modify: `src/lib/questionnaireConditions.ts`

- [ ] **Step 1: Create the Talent canonical source**

Implement `src/lib/questionnaireTalentContent.ts` with:

- the approved 26 Talent questions
- approved condition keys/values
- no editorial dependence on `questionnaireData.ts`
- a shared question metadata shape usable by root APIs and admin pages

- [ ] **Step 2: Create the shared canonical registry**

Implement `src/lib/questionnaireContent.ts` with:

- shared `CanonicalQuestion`, `CanonicalOption`, and `CanonicalCondition` types
- a root-side import of `wafia-questionnaire-brands/src/constants/questions.ts`
- `getCanonicalQuestions(type)`
- `getCanonicalQuestionsById(type)`
- `buildQuestionnaireMap(type)` that derives section labels from question categories instead of duplicating labels manually

- [ ] **Step 3: Rewire root helpers to the canonical types**

Update:

- `src/lib/questionnaireMap.ts` to derive `TALENTS_QUESTIONNAIRE_MAP` and `BRANDS_QUESTIONNAIRE_MAP`
- `src/lib/questionnaireConditions.ts` to import the condition type from `questionnaireContent.ts`

- [ ] **Step 4: Run the root canonical tests**

Run:

```bash
npm test -- --runInBand src/__tests__/lib/questionnaireContent.test.ts src/__tests__/api/questionnaires-current-route.test.ts src/__tests__/lib/completion.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/questionnaireTalentContent.ts src/lib/questionnaireContent.ts src/lib/questionnaireMap.ts src/lib/questionnaireConditions.ts src/__tests__/lib/questionnaireContent.test.ts src/__tests__/api/questionnaires-current-route.test.ts src/__tests__/lib/completion.test.ts
git commit -m "feat: add canonical questionnaire content registry"
```

### Task 3: Rewrite the Brand canonical source to the approved structure

**Files:**
- Modify: `wafia-questionnaire-brands/src/constants/questions.ts`
- Modify: `wafia-questionnaire-brands/src/types/index.ts`
- Modify: `wafia-questionnaire-brands/src/constants/questions.integrity.test.ts`
- Create: `wafia-questionnaire-brands/src/constants/questions.structure.test.ts`

- [ ] **Step 1: Add failing Brand content structure tests**

Add tests that assert:

- removed ids are absent: `ql_budget`, `f_budget_global`, `c_roas`, `d1_kpis`, `d1_ambassadors`, `d2_volume`, `d2_levers`, `d3_cac_target`, `d3_roas_target`, `d3_formats`, `d4_loyalty_devices`, `d4_interests`, `i_discovery`
- replacement ids are present: `c_acquisition_structure`, `c_piloting_quality`
- Brand categories collapse to the approved 5-block set
- each North Star path exposes at most 2 objective-specific questions

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical/wafia-questionnaire-brands
npm run test -- --run src/constants/questions.integrity.test.ts src/constants/questions.structure.test.ts
```

Expected: FAIL against the old Brand source.

- [ ] **Step 2: Rewrite `questions.ts` against the approved spec**

Implement in `wafia-questionnaire-brands/src/constants/questions.ts`:

- short `Contact` calibration block
- `Context`, `Priority`, `Marketing maturity`, `Accompaniment expected` main blocks
- no budget/price/package wording anywhere
- explicit presence of `c_acquisition_structure` and `c_piloting_quality`
- `g_competitors` kept as optional context
- `g_tone` and `g_creative_codes` merged into one creative-direction signal without leaving an orphan id strategy
- no more than 2 conditional questions per objective path

- [ ] **Step 3: Update the Brand type unions**

Update `wafia-questionnaire-brands/src/types/index.ts` so:

- `BrandSection` matches the 5-block runtime categories
- no legacy section union remains in the live tree
- result types no longer require budget/package outputs that the canonical content removed

- [ ] **Step 4: Run Brand canonical content tests**

Run:

```bash
npm run test -- --run src/constants/questions.integrity.test.ts src/constants/questions.structure.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add wafia-questionnaire-brands/src/constants/questions.ts wafia-questionnaire-brands/src/types/index.ts wafia-questionnaire-brands/src/constants/questions.integrity.test.ts wafia-questionnaire-brands/src/constants/questions.structure.test.ts
git commit -m "feat: align brand canonical questionnaire content"
```

## Chunk 2: Conditions and Flow

### Task 4: Add failing flow tests for the new Brand section model

**Files:**
- Modify: `wafia-questionnaire-brands/src/utils/conditions.test.ts`
- Create: `wafia-questionnaire-brands/src/hooks/useDiagnostic.flow.test.tsx`

- [ ] **Step 1: Extend condition tests for the two new Brand scoring questions**

Add assertions that:

- `c_acquisition_structure` is visible only when `b_north_star === "conversion"`
- `c_piloting_quality` is visible only when `b_north_star === "conversion"`
- awareness/traffic/retention paths stay within the 2-question branch cap

- [ ] **Step 2: Add flow tests for phase transitions**

Create `useDiagnostic.flow.test.tsx` to assert:

- quick lead still transitions into deep qualification
- deep qualification still reaches results
- section interstitials step through the new 5-block categories instead of the legacy section list

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical/wafia-questionnaire-brands
npm run test -- --run src/utils/conditions.test.ts src/hooks/useDiagnostic.flow.test.tsx
```

Expected: FAIL until runtime flow files are updated.

### Task 5: Rewire the Brand runtime flow to the 5-block structure

**Files:**
- Modify: `wafia-questionnaire-brands/src/constants/pillars.ts`
- Modify: `wafia-questionnaire-brands/src/hooks/useDiagnostic.ts`
- Modify: `wafia-questionnaire-brands/src/App.tsx`
- Modify: `wafia-questionnaire-brands/src/components/InterstitialScreen.tsx`
- Modify: `wafia-questionnaire-brands/src/lib/leadInsights.ts`
- Modify: `wafia-questionnaire-brands/src/components/Inspector.tsx`

- [ ] **Step 1: Update Brand section labels and interstitial metadata**

Change `SECTION_LABELS` in `constants/pillars.ts` to the approved 5-block labels and descriptions.

- [ ] **Step 2: Update the diagnostic hook and app flow**

Make `useDiagnostic.ts` and `App.tsx` rely on the new category ordering so:

- `CALIBRATION_QUESTIONS` stays short
- `MAIN_QUESTIONS` respects the new block order
- interstitial transitions trigger only on the new block boundaries

- [ ] **Step 3: Update downstream category consumers**

Update:

- `InterstitialScreen.tsx`
- `leadInsights.ts`
- `Inspector.tsx`

so they do not assume legacy section names such as `BUDGET`, `COMPETITIVE`, or `NEEDS_CONVERSION`.

- [ ] **Step 4: Run Brand flow tests**

Run:

```bash
npm run test -- --run src/utils/conditions.test.ts src/hooks/useDiagnostic.flow.test.tsx src/constants/questions.integrity.test.ts src/constants/questions.structure.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add wafia-questionnaire-brands/src/constants/pillars.ts wafia-questionnaire-brands/src/hooks/useDiagnostic.ts wafia-questionnaire-brands/src/App.tsx wafia-questionnaire-brands/src/components/InterstitialScreen.tsx wafia-questionnaire-brands/src/lib/leadInsights.ts wafia-questionnaire-brands/src/components/Inspector.tsx wafia-questionnaire-brands/src/utils/conditions.test.ts wafia-questionnaire-brands/src/hooks/useDiagnostic.flow.test.tsx
git commit -m "feat: migrate brand questionnaire flow to five-block structure"
```

## Chunk 3: Scoring Migration

### Task 6: Add failing scoring tests for the post-budget Brand model

**Files:**
- Modify: `wafia-questionnaire-brands/src/utils/scoring.test.ts`
- Create: `wafia-questionnaire-brands/src/components/BrandResultsSummary.test.tsx`

- [ ] **Step 1: Add failing lead-score assertions**

Add tests that assert:

- `calculateLeadScore` no longer reads `ql_budget` or `f_budget_global`
- `c_acquisition_structure` contributes the inherited `DATA` signal
- `c_piloting_quality` contributes the inherited `ACTIVATION + DATA` signals
- the former `d1_kpis` `DATA` signal is inherited by the surviving awareness-specialized question

- [ ] **Step 2: Add failing result-model / UI assertions**

Add tests that assert:

- `generateDiagnosticResult()` does not return a `package`
- `BrandResultsSummary` renders no price range, `€`, or “Package recommandé”
- lead score breakdown labels reflect the new non-budget dimensions

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical/wafia-questionnaire-brands
npm run test -- --run src/utils/scoring.test.ts src/components/BrandResultsSummary.test.tsx
```

Expected: FAIL against the old scoring model.

### Task 7: Implement the new Brand scoring and result model

**Files:**
- Modify: `wafia-questionnaire-brands/src/utils/scoring.ts`
- Modify: `wafia-questionnaire-brands/src/types/index.ts`
- Modify: `wafia-questionnaire-brands/src/components/BrandResultsSummary.tsx`
- Modify: `wafia-questionnaire-brands/src/components/DiagnosticLanding.tsx`
- Modify: `wafia-questionnaire-brands/src/hooks/useDiagnostic.ts`

- [ ] **Step 1: Remove budget/package-driven lead scoring**

Refactor `scoring.ts` so:

- there is no `scoreBudget()`
- `LeadScoreBreakdown` is renamed to non-commercial dimensions such as `priority`, `timing`, `maturity`, `fit`, `decision`
- legacy budget ids are not referenced anywhere in the live scoring file

- [ ] **Step 2: Wire the replacement scoring signals**

Implement explicit mappings for:

- `c_acquisition_structure` -> inherited `DATA` conversion signal from `c_roas`
- `c_piloting_quality` -> inherited `ACTIVATION + DATA` signals from `d3_cac_target` and `d3_roas_target`
- awareness branch replacement for the former `d1_kpis` `DATA` signal

- [ ] **Step 3: Replace the commercial result payload**

Replace `PackageSuggestion` with a non-commercial result object that preserves the existing card slot in `BrandResultsSummary`, for example:

- `headline`
- `summary`
- `focusAreas`
- `engagementHint`

The card may remain visually in place, but it must not expose pricing, pack tiers, or offer labels.

- [ ] **Step 4: Update user-facing copy that still sounds commercial**

Remove package/pricing language from:

- `DiagnosticLanding.tsx`
- `BrandResultsSummary.tsx`
- `useDiagnostic.ts` local result persistence payload

- [ ] **Step 5: Run Brand scoring tests**

Run:

```bash
npm run test -- --run src/utils/scoring.test.ts src/components/BrandResultsSummary.test.tsx src/constants/questions.integrity.test.ts src/constants/questions.structure.test.ts
npm run type-check
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add wafia-questionnaire-brands/src/utils/scoring.ts wafia-questionnaire-brands/src/types/index.ts wafia-questionnaire-brands/src/components/BrandResultsSummary.tsx wafia-questionnaire-brands/src/components/DiagnosticLanding.tsx wafia-questionnaire-brands/src/hooks/useDiagnostic.ts wafia-questionnaire-brands/src/utils/scoring.test.ts wafia-questionnaire-brands/src/components/BrandResultsSummary.test.tsx
git commit -m "feat: migrate brand scoring away from budget and packages"
```

## Chunk 4: Admin and Reporting Cleanup

### Task 8: Add failing tests for canonical admin/reporting readers

**Files:**
- Modify: `src/__tests__/api/questionnaires-exports-route.test.ts`
- Modify: `src/__tests__/lib/completion.test.ts`
- Create: `wafia-questionnaire-brands/src/context/DiagnosticContext.test.tsx`

- [ ] **Step 1: Add root tests for canonical label fallbacks**

Extend root tests to assert:

- `computeCompletion()` resolves conditions from canonical question lookups, not `questionnaireData.ts`
- export headers use canonical labels when `sectionsJson` is flat or label-poor

- [ ] **Step 2: Add Brand admin API typing tests**

Create `DiagnosticContext.test.tsx` to assert that Brand admin requests append `?type=BRANDS` on:

- `/api/v1/questionnaires/current`
- `/api/v1/questionnaires/questions`
- `/api/v1/questionnaires/questions/:id`
- `/api/v1/questionnaires/reorder`

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical
npm test -- --runInBand src/__tests__/api/questionnaires-exports-route.test.ts src/__tests__/lib/completion.test.ts
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical/wafia-questionnaire-brands
npm run test -- --run src/context/DiagnosticContext.test.tsx
```

Expected: FAIL until readers and Brand admin API calls are rewired.

### Task 9: Rewire admin/reporting consumers to canonical content

**Files:**
- Modify: `src/app/api/v1/questionnaires/current/route.ts`
- Modify: `src/app/api/v1/questionnaires/submit/route.ts`
- Modify: `src/app/api/v1/questionnaires/exports/route.ts`
- Modify: `src/lib/completion.ts`
- Modify: `src/components/questionnaire/FieldDisplay.tsx`
- Modify: `wafia-questionnaire-brands/src/context/DiagnosticContext.tsx`

- [ ] **Step 1: Update root API readers**

Change root API files so:

- `current/route.ts` falls back to canonical questions by requested type
- `submit/route.ts` uses canonical maps derived from `questionnaireContent.ts`
- `exports/route.ts` resolves missing labels from canonical content by question id

- [ ] **Step 2: Update completion**

Refactor `src/lib/completion.ts` to use:

- `getCanonicalQuestionsById(type)` from `questionnaireContent.ts`
- `evaluateConditions()` with canonical condition types

No root runtime path should import question metadata from `questionnaireData.ts` after this step.

- [ ] **Step 3: Update Brand admin API calls**

Patch `wafia-questionnaire-brands/src/context/DiagnosticContext.tsx` so all questionnaire admin requests send `?type=BRANDS`.

- [ ] **Step 4: Re-verify option-label rendering**

Confirm `FieldDisplay.tsx` still resolves option labels through `/api/v1/questionnaires/current?type=` and does not need any static fallback imports.

- [ ] **Step 5: Run admin/reporting tests**

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical
npm test -- --runInBand src/__tests__/api/questionnaires-current-route.test.ts src/__tests__/api/questionnaires-exports-route.test.ts src/__tests__/lib/completion.test.ts
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical/wafia-questionnaire-brands
npm run test -- --run src/context/DiagnosticContext.test.tsx src/hooks/useDiagnostic.submit.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/api/v1/questionnaires/current/route.ts src/app/api/v1/questionnaires/submit/route.ts src/app/api/v1/questionnaires/exports/route.ts src/lib/completion.ts src/components/questionnaire/FieldDisplay.tsx wafia-questionnaire-brands/src/context/DiagnosticContext.tsx src/__tests__/api/questionnaires-current-route.test.ts src/__tests__/api/questionnaires-exports-route.test.ts src/__tests__/lib/completion.test.ts wafia-questionnaire-brands/src/context/DiagnosticContext.test.tsx
git commit -m "feat: rewire questionnaire admin and reporting to canonical content"
```

## Chunk 5: Final Verification

### Task 10: Run the full targeted verification suite

**Files:**
- Create: none
- Modify: none
- Test: existing suites only

- [ ] **Step 1: Run root targeted verification**

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical
npm test -- --runInBand src/__tests__/lib/questionnaireContent.test.ts src/__tests__/api/questionnaires-current-route.test.ts src/__tests__/api/questionnaires-exports-route.test.ts src/__tests__/lib/completion.test.ts
```

Expected: PASS.

- [ ] **Step 2: Run Brand targeted verification**

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical/wafia-questionnaire-brands
npm run test -- --run src/constants/questions.integrity.test.ts src/constants/questions.structure.test.ts src/utils/conditions.test.ts src/hooks/useDiagnostic.flow.test.tsx src/utils/scoring.test.ts src/components/BrandResultsSummary.test.tsx src/context/DiagnosticContext.test.tsx src/hooks/useDiagnostic.submit.test.ts
npm run type-check
```

Expected: PASS.

- [ ] **Step 3: Run root type-check only if the baseline is clean**

Run:

```bash
cd /Users/sasha/Desktop/worktrees/wafia-questionnaires-canonical
npm run type-check
```

Expected: PASS if `.next/dev/types` is not already failing in the fresh worktree. If it still fails for unrelated generated-type reasons, record that failure as pre-existing and do not block the questionnaire branch on it.

- [ ] **Step 4: Produce the execution summary**

Document:

- files changed
- removed Brand ids
- new Brand ids
- new lead-score dimensions
- confirmation that no live runtime path imports questionnaire content from `src/lib/questionnaireData.ts`

