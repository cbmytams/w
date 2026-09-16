# Wafia Brand Book

Scope: the opening scroll sequence on `/for-brands`. The user-approved generated open-book image is the material and composition reference; existing commercial chapter copy remains live content.

## Visual Contract

An actual bound black book, not two rectangular panels: rounded leather boards, recessed spine joints, layered dark paper, continuous curved pages at the gutter, dark debossed cover mark, woven elastic closure, directional studio light and soft contact shadows. The open spread occupies the left two thirds; commercial copy occupies the right quarter. Reference photography is illustrative.

## Palette And Type

Mineral stage `#e8e9e6`, open stage `#151716`, neutral charcoal leather `#18191a`, dark paper `#252625`, ivory print `#f4f2e8`, vermilion `#f45a32`. Outfit headings and Plus Jakarta body inherit the site. Normal letter spacing and upright headings. Mobile uses the book above the HTML argument, which remains readable independently of its small printed pages.

## Model And Motion

Three.js physically based materials with microrelief, rounded extruded covers, parametric curved leaves, a rounded spine and elastic band. Cover and paper groups share an articulated opening driven by section-local scroll progress. Four chapter states use the same model. A lightweight curl accompanies chapter transitions. Reduced motion uses discrete opening and chapter states. Render only on scroll, resize, asset completion or context restoration.

## Verification

Inspect closed, opening and all four open chapters at desktop and mobile sizes. Inspect responsive 375, 768 and 1280 widths. Verify nonblank canvas pixels, all four chapter buttons, keyboard access, no overlap, no horizontal overflow, and reduced-motion behavior. Compare silhouette, gutter, leaf edges, material and shadows directly to the supplied image.
