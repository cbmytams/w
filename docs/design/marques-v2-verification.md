# Marques V2: header, case studies and book checks

## Implemented

- Single symmetric header with centered navigation and matching desktop/mobile menus.
- Compact dark/light/dark case studies, real HTML text and metrics, illustrative photography.
- Auto case corrected against the original site content: Salon de l'Auto, 50e edition, Paris Expo; 23 creators/journalists, 100+ contents, four live days. Original `/equip_auto_paris.png` restored; workshop photo no longer used.
- Book visibility checks use current canvas geometry, preventing a stale IntersectionObserver result from freezing rendering after viewport changes. Temporary debug attributes removed.

## Verified

- Production build and TypeScript passed; scoped ESLint passed.
- Existing hero widget test passed (one test).
- Browser tested at 375, 768 and 1280px. Header navigation center measured 639.984px in a 1280px viewport.
- Case dialogs and navigation menus open/close; Escape works; body overflow restored; no horizontal page overflow on tested mobile viewport.
- Three repeated mobile/tablet/desktop resize cycles, four book progress states each: all 12 within 0.005 of target. Canvas pixel checks nonblank and distinct across turning states.
- Screenshots in `output/playwright/v2-corrected-auto-*`, `v2-final-*`, `v2-verified-book-*`.

## Limits

- Existing global CSP inline-style warnings and unrelated later-section animation warnings remain. Global security policy was not weakened.
- Independent visual reviewer passed initial desktop/mobile presentation; its reference-image path had expired. A second independent code reviewer could not finish because of its usage limit. Final auto correction was inspected directly in the browser.
- Site figures are preserved, not independently certified. Illustrative assets remain labeled.

## Next, awaiting selection

`marques-suite-propositions.png` presents two conceptual directions for the brands/method transition. Neither is integrated. Header and typography in generated concepts are exploratory; the validated live header remains unchanged. All five existing method stages should be retained in either implementation.
