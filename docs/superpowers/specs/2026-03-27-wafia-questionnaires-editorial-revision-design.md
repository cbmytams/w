---
status: APPROVED
scope: editorial + structural (UI unchanged)
compatibility: controlled (ids frozen, values mappable)
canonical sources:
  brand: wafia-questionnaire-brands/src/constants/questions.ts
  talent: a creer (src/lib/questionnaireTalentContent.ts - suggested)
do-not-edit: questionnaireData.ts (deprecated as editorial source)
---

# WAFIA Questionnaires Editorial Revision Design

## Goal

Define the approved editorial and structural target for the two Wafia questionnaires before any code implementation.

The outcome of this design is not "better copy" in isolation. It is a migration-safe specification that lets product, ops, and dev converge on one clean qualification system for:

- `Talent`: creator diagnosis and qualification
- `Brand`: brand lead qualification and first-contact preparation

The UI and visual experience are out of scope. This design covers questionnaire content, conditional logic shape, canonical source discipline, scoring continuity, persistence safety, and admin/reporting coherence.

## Non-goals

- No UI redesign
- No bundle/runtime rebuild decisions
- No pricing, packaging, or offer design
- No commercial script writing
- No code implementation in this document

## Locked Decisions

### Product frame

- These questionnaires are qualification tools, not sales configurators.
- Every question must have a clear role:
  - `qualify`
  - `score`
  - `orient AM`
- If a question does none of the above, it must be removed.

### Compatibility frame

- Product intent comes from the approved brief.
- Runtime `id` keys and existing conditional skeletons remain the technical base when possible.
- Compatibility is `controlled`, not `strict` and not `freeform`:
  - `id` keys should stay frozen when the underlying product intent survives.
  - option values may be corrected when they are incoherent, but only with an explicit mapping.
  - new `id` keys should only be introduced when a removed question is replaced by a genuinely new concept that cannot safely reuse an old key.

### Canonical source frame

- `Brand` canonical editorial source must converge to `wafia-questionnaire-brands/src/constants/questions.ts`.
- `Talent` must get a dedicated canonical source file, suggested target:
  - `src/lib/questionnaireTalentContent.ts`
- `src/lib/questionnaireData.ts` is deprecated as an editorial source and must not be treated as the future source of truth.

### Structural frame

- `Talent` keeps a 6-block diagnosis structure with light rationalization only.
- `Brand` is restructured into 5 blocks, with a shorter and more strategic qualification flow.
- `Brand` target completion time is approximately 4 minutes, with a hard ceiling of 6 minutes.

## Reading Order for This Spec

1. Brand suppressions and replacements
2. Target questionnaire structures
3. Editorial rewrite rules
4. Deliverable format
5. Source, mapping, and scoring continuity
6. Implementation decomposition guidance

## Brand Suppressions and Replacements

This section appears first by design. When dev opens the spec, the first thing they should see is what disappears, why it disappears, and what replaces the signal.

### Pure removals

These questions are removed because they push the form toward pricing, quoting, or tactical media qualification instead of first-contact qualification:

| Question          | Decision |
| ----------------- | -------- |
| `ql_budget`       | Remove   |
| `f_budget_global` | Remove   |
| `d3_cac_target`   | Remove   |

### Simplification removals

These questions are removed because they over-detail the flow for an entry questionnaire or create tactical friction without improving first-call qualification enough:

| Question             | Decision |
| -------------------- | -------- |
| `c_roas`             | Remove   |
| `d1_kpis`            | Remove   |
| `d1_ambassadors`     | Remove   |
| `d2_volume`          | Remove   |
| `d2_levers`          | Remove   |
| `d3_roas_target`     | Remove   |
| `d3_formats`         | Remove   |
| `d4_loyalty_devices` | Remove   |
| `d4_interests`       | Remove   |
| `i_discovery`        | Remove   |

### Kept but repurposed

These questions remain useful, but their wording or block placement must change:

| Question                      | New role                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| `a_budget_validator`          | Decision circuit / launch validation, without budget framing                          |
| `f_start`                     | Timing                                                                                |
| `f_duration`                  | Nature of engagement horizon                                                          |
| `f_deadline`                  | Deadline or business milestone                                                        |
| `i_constraints`               | Final open expectations / specific expectations vis-a-vis Wafia                       |
| `e_*` block                   | Accompaniment expected, phrased neutrally and non-commercially                        |
| `g_competitors`               | Optional competitor context for AM orientation, non-scoring by default                |
| `g_tone` + `g_creative_codes` | Merge into one creative direction / guardrails signal inside `Accompaniment expected` |

### Scoring continuity constraints

No Brand suppression may create an orphan scoring signal. Every removed signal must be reassigned explicitly in the future scoring migration.

Mandatory scoring continuity rules:

| Removed input                      | Previous signal       | Replacement signal owner                              |
| ---------------------------------- | --------------------- | ----------------------------------------------------- |
| `c_roas`                           | `DATA` (conversion)   | New question about acquisition structuring            |
| `d3_cac_target` + `d3_roas_target` | `ACTIVATION` + `DATA` | New question about current marketing steering quality |
| `d1_kpis`                          | `DATA` (awareness)    | Remaining awareness-specialized question              |

Additional mapping constraint:

- `i_discovery` and `i_constraints` must both appear in the final mapping appendix, even if one is removed, so dev can clean `scoring.ts` and related admin/reporting code without inference.

### Pending editorial decisions (blocking for scoring migration)

These two replacement questions must exist in the spec before implementation planning because scoring migration cannot wire placeholders safely.

| Placeholder                  | Suggested id              | Target block         | Role    | Signal inherited                                              |
| ---------------------------- | ------------------------- | -------------------- | ------- | ------------------------------------------------------------- |
| "acquisition structuring"    | `c_acquisition_structure` | `Marketing maturity` | `score` | `DATA` (conversion) from `c_roas`                             |
| "marketing steering quality" | `c_piloting_quality`      | `Marketing maturity` | `score` | `ACTIVATION` + `DATA` from `d3_cac_target` + `d3_roas_target` |

Provisional target definitions:

- `c_acquisition_structure`
  - target editorial intent: understand whether acquisition is ad hoc, partially structured, or already piloted with an explicit framework
  - provisional label: `Comment votre acquisition est-elle structuree aujourd'hui ?`
  - provisional answer direction:
    - no structured setup
    - scattered tests
    - active setup but partially structured
    - structured and regularly piloted
- `c_piloting_quality`
  - target editorial intent: measure the reliability and maturity of current marketing steering without asking for CAC or ROAS targets directly
  - provisional label: `A quel point pilotez-vous votre marketing avec des donnees fiables ?`
  - provisional answer direction:
    - very limited visibility
    - partial visibility
    - reliable steering on key metrics
    - advanced multi-channel steering

## Target Structure

## Talent Target Structure

`Talent` remains a diagnostic tool. It should feel precise, human, and operational.

Approved block structure:

1. `Calibration`
   - current stage
   - main objective
   - availability
   - support / operating environment
2. `Vision`
   - positioning clarity
   - identity / brand clarity
   - medium-term direction
3. `Production`
   - organization
   - batching / workflow
   - production capacity
   - publishing cadence
4. `Business`
   - monetization state
   - revenue sources
   - commercial structuring
   - brand partnership experience
5. `Reach`
   - channel presence
   - performance reading habits
   - algorithm understanding
   - creator collaboration exposure
6. `Health`
   - resilience to feedback
   - stress
   - burnout history
   - legal / contractual hygiene

Rules for Talent rationalization:

- Keep the current 6-block skeleton.
- Allow only light rationalization:
  - remove or merge at most 2 to 4 clearly redundant questions.
- Prefer concrete self-assessment over abstract personal branding language.
- Health and legal questions must stay direct but non-judgmental.

Primary reading objective for Wafia:

- where the creator is today
- where the blockage sits
- where Wafia can help first

## Brand Target Structure

`Brand` becomes a short, strategic qualification form. It must not feel like a quote configurator or mini-audit.

Approved 5-block structure:

1. `Contact`
   - company
   - person
   - function
   - contact details
   - website
2. `Context`
   - sector
   - size
   - business model
   - decision circuit
   - internal resources
3. `Priority`
   - business objective
   - urgency
   - launch window
   - engagement horizon
   - milestone / deadline
4. `Marketing maturity`
   - active channels
   - measurement maturity
   - main friction
   - current team / process readiness
   - limited objective-specific branch questions
5. `Accompaniment expected`
   - type of help expected from Wafia
   - production or execution needs
   - external support expectations
   - final open question on specific expectations

Rules for Brand branching:

- Keep objective-driven adaptation.
- Limit specialization to a maximum of 2 objective-specific questions per path.
- Do not preserve the current "four mini-questionnaires" effect.
- Each objective path must remain short and clearly diagnostic.

What the account manager must know in 30 seconds from the answers:

1. who the brand is
2. what it wants to achieve
3. how mature its current marketing setup is
4. whether timing is real
5. what kind of accompaniment Wafia may need to discuss first

## Editorial Rewrite Rules

## Common Rules

- One question = one decision variable
- Use active, concise wording
- Remove decorative jargon
- Keep only subtitles that clarify meaning or reduce ambiguity
- Keep open text only where structured options would flatten useful context
- Order answer choices by real-life situation, not by desirability
- Avoid options that sound ashamed, confused, or self-deprecating

## Talent Rules

- Use `tu`
- Tone must be direct, human, lightly supportive
- Never infantilize the creator
- Prefer operational truth over vague self-perception
- Keep emotional weight only where it serves honesty, especially in health/legal topics

## Brand Rules

- Use `vous`
- Tone must be sober, senior, and expert
- Never sound commercial or package-driven
- Avoid tactical media jargon unless it changes qualification quality materially
- Keep the quick lead section very short

## Deliverables to Produce After This Design

Livrable numbering is intentionally non-sequential in reading order. `Deliverable 4` appears before `Deliverable 2` and `Deliverable 3` on purpose so removal logic is seen before the revised questionnaires. Do not "fix" this numbering by reflex.

## Deliverable 1 - Audit Table

For every question across both questionnaires:

- `id`
- problem detected
- severity
- suggested correction

Useful tags may be included in the problem field:

- redundant
- poor wording
- weak signal
- bad placement
- branch too long
- admin/scoring risk

## Deliverable 4 - Brand Removal Summary

This deliverable must appear before the full revised questionnaires in the final read order.

For each removed Brand question:

- removed question
- why it was removed
- what replaces it
- which scoring signal inherits its function
- or explicit note that the signal is intentionally abandoned

## Deliverable 2 - Revised Talent Questionnaire

For each final Talent question:

- `id`
- revised label
- revised options
- change note
- status:
  - kept
  - merged
  - moved
  - removed
- technical mapping note when a value changes

## Deliverable 3 - Restructured Brand Questionnaire

For each final Brand question:

- `id`
- target block
- revised label
- revised options
- final condition if any
- role:
  - qualify
  - score
  - orient AM
- change note

## Source and Mapping Discipline

Three mappings are required in the final implementation-ready material.

### 1. Editorial mapping

- old wording -> new wording

### 2. Technical mapping

- old option values -> new option values
- old question ids -> new question ids only if reuse is impossible

### 3. Scoring mapping

- old scoring signal -> new scoring signal owner

This is mandatory for:

- `scoring.ts`
- conditional logic
- admin display / label rendering
- persistence safety
- exports / reporting consistency

## Canonical Source Convergence Recommendation

Target convergence path:

1. `Brand`
   - keep `wafia-questionnaire-brands/src/constants/questions.ts` as the canonical editorial structure
   - downstream code should consume this definition instead of maintaining parallel editorial copies
2. `Talent`
   - create `src/lib/questionnaireTalentContent.ts`
   - make it the single explicit content source
3. `questionnaireData.ts`
   - stop using it as an editorial authoring surface
   - either convert it into a temporary adapter, or remove it once consumers are migrated

Desired end state:

- questionnaire content
- conditions
- scoring references
- admin display labels
- exports

...all derive from one canonical definition per questionnaire type.

## Implementation Decomposition Guidance

This design should later split cleanly into four implementation workstreams:

1. Canonical content source work
2. Conditional logic and flow updates
3. Scoring and mapping migration
4. Admin/reporting cleanup

This separation matters because the editorial rewrite is not enough by itself. The backend and admin layer must consume the same truth, or the product will drift again.

## Acceptance Criteria for the Future Implementation

- UI remains visually unchanged
- Brand no longer contains pricing, budget-envelope, or package-style language
- Brand path length is materially reduced
- Talent remains a full diagnosis with light rationalization only
- scoring migration documents every removed Brand signal explicitly
- admin labels and exports stay aligned with the canonical source
- `questionnaireData.ts` is no longer treated as the editorial source of truth

## Final Design Status

This design is approved and ready to be used as the source document for implementation planning.
