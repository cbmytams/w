# Brand Book Verification

Date: 2026-09-13. Scope: opening book sequence on `/for-brands`, not the remaining page or talent page.

## Visual Evidence

Current captures: `output/playwright/book-qa-{desktop,375,768}-{closed,opening,influence,creation,production,ads}.png`.

- 18 states at 1280x900, 375x844 and 768x1024.
- Nonblank WebGL pixels in all states; no horizontal overflow.
- Real curved leaves, layered edges, rounded cover, spine, contact shadows and generated inset photography.
- Independent visual reviewer: PASS, no blocking clipping or collisions in the 18 captures.
- Small printed captions are decorative on mobile; separate HTML carries the readable commercial argument.
- Reference comparison informed earlier iterations. The original temporary reference file was no longer available to the final independent reviewer, whose verdict concerns the rendered captures.

## Browser Checks

- Opening button and keyboard Enter open chapter 0.
- Four chapter buttons select canvas states 0, 1, 2 and 3.
- Final chapter's exit button leaves the sticky sequence.
- Reduced-motion preference tested from page load: Production selects chapter 2.
- Simulated WebGL context loss and restoration resumes the scene at progress 0.340.

## Code Checks And Limits

- ESLint on the four book TypeScript modules: passed.
- Existing hero widget regression test: passed; this is not unit coverage of the new Three.js scene.
- `git diff --check`: passed.
- Production compilation succeeds, but the build fails during type checking at the existing `CaseStudiesSection.tsx:92` access to `study.link`. Unrelated source left unchanged.
- Standalone type checking also reports duplicate generated `.next/types/* 2.ts` definitions.
- Existing CSP nonce and hydration console errors remain outside the book. Security policy was not weakened.
- Dev preview: http://localhost:3000/for-brands.
