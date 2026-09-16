# For Brands Gate Review

recommendation: APPROVE
verdict: PASS
blockers: []

## Original Intent And Desired Outcome

Preserve the realistic 3D book on `/for-brands`, show a visible leaf turn at each of three chapter transitions, replace fixed photography on service pages with four refined marks, and follow it with Basic Fit, CJ Group / Korea House, and Equip Auto as cinematic stacked case bands. The 568x434 reference is conceptual, not a pixel target. The site remains read-only in this audit.

## User Outcome Review

All 27 final captures were inspected in three 9-state contact sheets, with the original captures retained at `output/playwright/final-{1280,768,375}-{closed,influence,turn-one,turn-two,turn-three,ads,case-1,case-2,case-3}.png`. Closed and open book compositions read clearly at all three widths. The three intermediate captures show a raised/turning leaf, and the four right pages have distinct drawn marks. The three case bands are in order, with a full image area and separate results column on desktop, then stacked image and results on tablet/mobile. No visible clipping or horizontal overflow was found in these captures. Reference image inspected at `/var/folders/7_/63m6ktjd49x7fyx1sfzghtjh0000gn/T/codex-clipboard-e27ff627-e446-4834-83e4-34ea97cb03bd.png`; composition is aligned conceptually, and pixel diff is not meaningful across sizes.

The live page at `http://localhost:3000/for-brands` returned 200 with the nonce CSP. Browser AX state confirmed semantic headings, chapter opener, case image alt text, three proof lists, and contact/studio links. Activating `Ouvrir le dossier` yielded scrollY 930, canvas progress 0.340, chapter 0 and four chapter buttons in the DOM. Source review confirmed chapter boundaries 0.525/0.730/0.935, a rotating two-sided curved leaf at each, IntersectionObserver-gated rendering, and a reduced-motion branch with discrete page state. CSS provides responsive 375/768/1280 layouts and focus styles. Page route places the case section immediately after the book and leaves lower sections in place.

## Checked Artifacts

- `DESIGN.md`; `PRODUCT.md`; `docs/brand-book-design.md`; `docs/brand-book-audit.md` (older and narrower than this final edit)
- `src/components/for-brands/BrandBookScene.tsx`, `BrandBook.module.css`, `BrandHeroV2.tsx`, `brand-book-content.ts`, `brand-book-model.ts`, `CaseStudiesSection.tsx`, `CaseStudiesSection.module.css`
- `src/app/for-brands/page.tsx`; `src/proxy.ts`; `src/__tests__/components/for-brands/hero-widgets.test.ts`
- All 27 `output/playwright/final-*.png` captures and the conceptual reference path above
- Live DOM, canvas data attributes, response headers, and browser error log at localhost:3000

## Notes And Evidence Gaps

- [evidence] No final-edit code-review report, manual QA matrix, executor evidence file, or notepad path was supplied or located. `docs/brand-book-audit.md` covers an earlier 18-state book pass and contains stale build/type-check statements; it does not explicitly cover the `remove-ai-slops`/`programming` perspective or final 27 states. This direct gate pass supplies that perspective, but does not verify an independent report.
- [evidence] The case images in `public/` are 640x640 existing illustrative assets. Their origin and client approval are not established by repository artifacts. Metrics and client names existed in the pre-change case data, but no primary project documentation independently certifies their accuracy. Do not describe the illustrations as documentary campaign photographs or cite the numbers as independently verified.
- [evidence] Live development console reports React's expected CSP `eval()` debugging error and a nonce hydration mismatch in the root layout. The response CSP is unchanged by the reviewed files; this does not demonstrate a production CSP failure. A clean production-browser CSP run was not provided.
- [product] The Basic Fit case CTA points to `/studio`, a broad portfolio route, rather than a dedicated Basic Fit page. The requested link flow still reaches an existing route; no criterion requires a case-detail page.
- [programming/slop] No new tests were added for this narrow visual change. The old `hero-widgets.test.ts` checks legacy image markup and does not prove the new book; it should not be counted as relevant coverage. No deletion-only, removal-only, tautological, or implementation-mirroring new tests were found. `BrandBookScene.tsx` is a large combined rendering/texture module and contains `getContext('2d')!` plus a swallowed WebGL initialization catch, which are maintenance concerns, but neither is shown to fail a stated criterion. The model/content split is justified by geometry and chapter data; no extra parsing/normalization layer or speculative production extraction was found in the reviewed scope.

## Must Remain

Preserve the existing realistic bound-book silhouette, three separate physical leaf turns, four distinct service marks with accessible HTML chapter copy, reduced-motion state changes, and the Basic Fit / CJ Group-Korea House / Equip Auto order with responsive photographic-style bands and separated results.
