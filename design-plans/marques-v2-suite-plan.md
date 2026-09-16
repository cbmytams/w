# Page Marques V2 - Suite apres hero, livre et cas clients

Written against: 567ccac8141fbe3a67a8287e58a3fb4522e50667

## Validation par section - accord du 14 septembre 2026

Le plan global est valide. Cette validation autorise le developpement de la
premiere section, pas une execution en bloc. Apres chaque section, le travail
s'arrete pour que Sasha puisse valider le rendu ou reorienter la proposition.
Une verification technique reussie ne vaut jamais validation design du client.

Cycle obligatoire pour chaque lot :

1. Developper uniquement le lot autorise.
2. Verifier dans le navigateur a 375, 768 et 1280 px : mise en page, lisibilite,
   animations en mouvement, ancres et version sans mouvement.
3. Corriger les problemes observes, puis refaire les captures concernees.
4. Presenter des captures ordinateur/mobile, un lien direct vers la section,
   un apercu anime si necessaire et un court compte rendu des controles.
5. Attendre la validation explicite ou les corrections de Sasha. En cas de
   reorientation, reprendre ce meme lot et le representer avant tout autre lot.

| Lot | Livraison et point de controle                                                                                     | Etat                               | Validation Sasha    |
| --- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ------------------- |
| 1   | Notre methode : cinq etapes, rythme, textes, apparition au scroll                                                  | Developpe et controle visuellement | En attente de Sasha |
| 2   | Nos expertises : bande noire, hierarchie et transition depuis la methode                                           | Attend la validation du lot 1      | Non demandee        |
| 3   | Toutes les marques : deux defilements continus, taille des logos, pause, mouvement reduit                          | Attend la validation du lot 2      | Non demandee        |
| 4   | Experts de terrain : vrais profils, cadrages, roles, rythme des portraits ; retrait du bloc campagnes responsables | Attend la validation du lot 3      | Non demandee        |
| 5   | Questions / reponses : liste, ouverture/fermeture, lecture mobile                                                  | Attend la validation du lot 4      | Non demandee        |
| 6   | Parlons de votre prochaine campagne : photo, texte, contact et raccord au footer                                   | Attend la validation du lot 5      | Non demandee        |
| 7   | Parcours complet : raccords, suppression des anciens blocs remplaces, navigation et fluidite du livre au footer    | Attend la validation du lot 6      | Non demandee        |

### Revision demandee du lot 1 - roulement continu

Le premier rendu statique n'est pas valide en production. Sasha demande un
systeme en mouvement permanent qui rende visibles la succession et la rapidite
des cinq etapes. La direction proposee pour validation est un rail de campagne :

- un point vermillon circule en continu sur un filet horizontal ;
- l'etape active se verrouille brievement au centre, nette et plus presente ;
- les etapes voisines restent lisibles avec un contraste legerement reduit ;
- les cinq etapes bouclent sans saut visible, dans l'ordre Audit, Strategie,
  Casting, Production, Diffusion & reporting ;
- les titres Audit, Strategie, Casting, Production, Diffusion & reporting
  restent visibles pendant tout le cycle ;
- le mouvement reduit affiche les cinq etapes fixes et totalement lisibles.

Storyboard de validation :
`/Users/sasha/.codex/generated_images/01a09b48-f370-7e83-90d5-c1dacaea95a3/exec-fa6640e8-304f-42a9-8ca8-6bd3cc7d650c.png`.

Etat : concept valide par Sasha ; rail integre et controle visuellement.
Le lot 2 reste bloque jusqu'a validation explicite du rendu du lot 1 revise.

### Correction obligatoire de l'identite Wafia

Source officielle unique : `public/wafia.svg`, mot-symbole serif en bas de casse.
Le nom ecrit dans une phrase ou un titre editorial peut rester du texte. Toute
apparition de marque faisant fonction de logo doit utiliser cet asset, sans
retaper « WAFIA », sans substitution typographique et sans monogramme « W ».

Points deja identifies sur la page Marques :

- barre de navigation desktop : remplacer le texte-logo actuel par l'asset ;
- menu mobile : remplacer le texte-logo actuel par l'asset ;
- couverture du livre 3D : remplacer le faux « W » par une texture issue du
  vrai logo, avec une version ton sur ton adaptee au cuir noir ;
- pages et mentions signees du livre : employer le vrai mot-symbole lorsque la
  marque joue le role d'une signature ;
- fallback de chargement du livre : remplacer le mot retape par l'asset ;
- verifier ensuite tous les autres rendus de logo de `/for-brands` a 375, 768 et
  1280 px, sur fonds clair et sombre.

Cette correction sera traitee dans le meme cycle que le lot 1 revise, puis fera
l'objet de captures distinctes pour validation avant le lot 2.

### Checkup du lot 1 revise - 14 septembre 2026

- Logo officiel `public/wafia.svg` integre a la navigation, au menu mobile,
  a la couverture, aux pages et au fallback du livre. Les mentions editoriales
  Wafia restent du texte.
- Rail en boucle de 15 secondes, actif uniquement lorsque la methode est dans
  le viewport ; animation horizontale sur ordinateur, verticale sous 1100px.
  Survol/focus en pause ; mouvement reduit sans animation.
- Textures du livre a densite reduite sur telephone, DPR et ombres plafonnes,
  rendu WebGL a la demande lorsque le livre est visible.
- Controle navigateur du build de production a 1280 et 375px : hero, livre
  ouvert et methode examines ; controles additionnels a 768 et 320px. Aucun
  debordement horizontal. Mouvement observe par comparaison des transforms.
- Menu mobile et logo sur fond clair/sombre verifies. TypeScript, ESLint cible
  et build production passent. Suite de tests : 11 suites passent, une suite
  hors lot echoue sur une ponctuation du titre Talent, une suite est ignoree.
- Avertissements CSP existants sur les styles inline, presents dans le build
  de production ; ils n'ont pas empeche le rendu et le rail constates ici.
- Captures finales : `output/playwright/brands-lot1-final-desktop-hero.png`,
  `output/playwright/brands-lot1-final-desktop-book.png`,
  `output/playwright/brands-lot1-final-desktop-method.png`,
  `output/playwright/brands-lot1-final-mobile-hero.png`,
  `output/playwright/brands-lot1-final-mobile-book.png`,
  `output/playwright/brands-lot1-final-mobile-method.png`.
- Decision attendue : validation ou corrections de Sasha sur ce rendu du lot 1.
  Aucune section suivante n'a ete developpee dans ce cycle.

### Correction du lot 1 demandee le 14 septembre 2026

Cette correction remplace le rythme de 15 secondes et la pause au survol
consignes dans le checkup precedent ; elle ne valide pas encore le lot 2.

- Rail accelere a 7,5 secondes, avec trainee vermillon et halo attache au point.
  Il continue au survol, s'arrete hors du viewport et au focus. Le mode
  mouvement reduit retire completement le point et garde le filet fixe.
- Le titre mobile se rapproche de la navigation : ecart mesure de 56px a 31px
  a 504px de large. Logo et titre partagent la meme gouttiere de 7%.
- Sous 720px de hauteur, texte et livre sont recalés pour eviter leur collision.
  Captures controlees a 320x667, 375x667, 375x812, 504x860, 768x1024 et
  1280x800, sans debordement horizontal. Livre, titres et CTAs restent distincts.
- Build production et TypeScript reussis. Capture du mouvement complet :
  `output/playwright/brands-lot1-revision-rail.gif` ; sequences de trois
  captures fraiches : `output/playwright/brands-revision-final-504-rail-0.png`
  a `-2.png` et `output/playwright/brands-revision-final-1280-rail-0.png` a
  `-2.png`. Hero de la largeur montree par Sasha :
  `output/playwright/brands-revision-final-504-hero.png`.
- Decision attendue : validation ou reorientation de Sasha sur cette correction.
  Ne pas lancer la section Expertises avant son accord explicite.

La reference visuelle reste la proposition 1 :
`/Users/sasha/.codex/generated_images/01a09b48-f370-7e83-90d5-c1dacaea95a3/exec-a7bc91c7-6d6d-4f6a-ba1d-0fed7ab3569f.png`.
Les intitules de methode suivent le plan valide ci-dessous. Les autres sections
existantes restent provisoirement en place jusqu'au lot qui les remplace.
Le hero, le livre et les cas clients ne sont pas redessines pendant ces lots.

### Checkup du lot 1 - 14 septembre 2026

- Livraison : `BrandMethodSection` remplace l'ancien `ProcessSection` et se place
  apres les trois cas clients. Ancre conservee : `/for-brands#process`.
- Verification visuelle : captures fraiches examinees a 1280, 768 et 375 px.
  Colonnes ordinateur, lignes tablette et liste mobile sans texte coupe ni
  debordement horizontal. Cinq etapes visibles ; une seule ancre `process`.
- Animation : apparition echelonnee observee en navigateur et capturee en video.
  Le mode mouvement reduit donne `animation: none` et `opacity: 1` sur les cinq etapes.
- Navigation : clic reel sur « Notre methode » ; section a 100px du haut pour une
  barre de navigation de 81px. Le titre reste visible.
- Verification technique : TypeScript, ESLint cible et build production reussis.
- Relecture visuelle independante : PASS, aucun blocage pour cette section.
  Ce verdict technique ne remplace pas la validation de Sasha.
- Observations hors lot : avertissements CSP sur des styles inline deja presents
  ailleurs dans la page ; diagnostic LSP indisponible (Biome absent), controle
  effectue avec les outils TypeScript/ESLint du projet. Pas de revendication de
  validation performance ou de livraison de la page complete.
- Captures : `output/playwright/method-step1-1280.png`,
  `output/playwright/method-step1-768.png`,
  `output/playwright/method-step1-375.png`,
  `output/playwright/method-step1-reduced-375.png`.
- Mouvement : `output/playwright/method-step1-animation.webm` ; image intermediaire
  `output/playwright/method-step1-motion-early.png` et etat final
  `output/playwright/method-step1-motion-final.png`.
- Decision attendue : valider cette section ou indiquer les ajustements de
  typographie, de textes, d'espacement ou de mouvement. Lot 2 non commence.

### Checkup du bloc marques - 15 septembre 2026

- La grille statique est remplacée par un chapitre éditorial « Ils nous font confiance ».
- Les 18 logos réels de `CLIENTS` défilent en boucle continue, avec balayage et halo vermillon indépendants.
- L'identité visuelle reprend le papier minéral, l'encre, les filets fins et l'annotation manuscrite de la référence validée.
- Les proportions sont contrôlées à 1440, 768 et 375 px, sans débordement horizontal. Deux captures desktop distinctes prouvent le mouvement.
- Le mode mouvement réduit coupe le rail et le scanner, retire la copie décorative et laisse la liste complète disponible en défilement horizontal natif.
- Build de production, TypeScript et ESLint ciblé passent.
- Captures de validation : `output/playwright/brands-trust-final2-desktop-0.png`, `brands-trust-final2-desktop-1.png`, `brands-trust-final2-tablet.png`, `brands-trust-final2-mobile.png` et `brands-trust-final2-mobile-reduced.png`.
- Décision attendue : validation ou réorientation de Sasha avant de commencer « Experts du terrain ».

## Evidence chain

- Surface: `/for-brands`, rendered through `src/app/for-brands/page.tsx`.
- User direction: keep the validated direction from visual proposal 1, animate the brand logos, remove the "campagnes responsables pour longtemps" block, then sequence "experts du terrain", "questions / reponses", and "Parlons de votre prochaine campagne".
- Design evidence: `DESIGN.md` defines the V2 as a campaign dossier: tactile black book, real proof bands, mineral paper, anthracite, vermilion accent, restrained motion, no decorative cards.
- Content evidence:
  - Current route still includes old below-fold sections: `ClientsSection`, `ValuePropositionSection`, `ProcessSection`, `ComparisonSectionV2`, `ComplianceSection`, `TeamSectionBrands`, `FaqSection`, `CtaSection`.
  - Method content exists in `src/constants/process-steps.ts`.
  - FAQ content exists in `src/constants/faq.ts`.
  - Case studies already carry Basic-Fit, CJ Group / Korea House, and Salon de l'Auto content in `src/components/for-brands/CaseStudiesSection.tsx`.
  - Current brand logos are displayed by `src/components/for-brands/ClientsSection.tsx` from `src/constants/clients`.
- Owner: page composition in `src/app/for-brands/page.tsx`; section implementation under `src/components/for-brands/`.
- Scope and affected surfaces: `/for-brands` only; global navigation and Talent page are excluded.
- Confirmed: case studies stay immediately after the book, followed by the new method/brands/team sequence.

## Design decision

Use visual proposal 1 as the structure for the below-fold V2, but tighten the content into a commercial story:

1. Hero + 3D book remain the entry experience.
2. Cas clients remain as the proof section, unless the user asks to move them later.
3. A compact "Notre methode" strip explains how Wafia takes a campaign from diagnosis to impact.
4. A black expertise rail names the service territories without overexplaining them.
5. An animated brand marquee shows all logos in a premium, quiet rhythm.
6. Remove the "campagnes responsables" block entirely.
7. "Experts du terrain" introduces the human team with actual Wafia profiles.
8. "Questions / reponses" handles objections cleanly.
9. The final CTA closes on campaign studio language: "Parlons de votre prochaine campagne."

The page should feel like a dossier turning into a commercial deck: useful, sharp, sober, not like a generic agency landing page.

## Reuse

- Existing tokens and direction from `DESIGN.md`.
- Existing motion stack: `framer-motion` in `package.json`.
- Existing marquee primitive: `src/components/ui/marquee.tsx`, adapted or replaced only if it cannot support the desired logo flow and reduced-motion behavior.
- Existing content constants:
  - `PROCESS_STEPS`
  - `FAQ_ITEMS`
  - `CLIENTS`
  - team data from the existing team section/constants.
- Existing visual language:
  - mineral paper background,
  - anthracite bands,
  - vermilion accent used as progress and emphasis only,
  - no cards inside cards,
  - compact editorial typography.

If a new primitive is required, it should be a page-local primitive under `src/components/for-brands/`, not a global design-system component, unless the same pattern is needed on Talent later.

## Target page order

1. `BrandHeroV2`
   - Keep: current headline, CTAs, and 3D book scroll behavior.
   - Refine only if visual QA shows overlap or scroll timing issues.

2. `CaseStudiesSection`
   - Keep as already built and corrected.
   - Purpose: proof before explanation.
   - Stop condition: if user wants the three cases after method instead, move only the order, not the design.

3. New `BrandMethodSection`
   - Replace the old `ValuePropositionSection`, `ProcessSection`, `ComparisonSectionV2`, and `ComplianceSection` with one coherent editorial block.
   - Top row: "Notre methode" with five horizontal steps:
     - 01 Audit
     - 02 Strategie
     - 03 Casting
     - 04 Production
     - 05 Diffusion & reporting
   - Copy style: short verbs, practical benefits, no generic agency language.
   - Animation:
     - a thin vermilion progress line grows left to right as the row enters;
     - each step reveals in sequence with opacity + y translation;
     - arrows or divider strokes draw after labels;
     - reduced motion shows the final row immediately.

4. New `ExpertiseRailSection`
   - Black band, one row of outlined expertise labels:
     - Strategie
     - Influence
     - Concept & creation
     - Production
     - Social media
     - Paid social
     - Brand content
     - Evenementiel
     - Reporting
   - Animation:
     - rail slides subtly into place;
     - active/hover states use underline or border intensity, not bouncing badges.

5. Reworked `ClientsSection`
   - Full-width white/mineral band.
   - Label: "Ils nous font confiance".
   - Show all brands, not only `CLIENTS.slice(0, 12)`.
   - Use two horizontal logo marquees:
     - row 1 moves left;
     - row 2 moves right;
     - grayscale, low opacity by default;
     - pause on hover/focus;
     - reduced motion becomes a responsive logo grid.
   - Animation must be calm and continuous, not flashy.

6. New or reworked `TeamSectionBrands`
   - Title: "Des experts de terrain. Et de culture."
   - Use real team people/assets, not generated placeholder portraits.
   - Layout:
     - left editorial statement;
     - right compact row/grid of portraits with role labels;
     - optional handwritten side note: "Des humains pour des marques plus vivantes."
   - Copy direction:
     - "Strategie, creation, production, influence, social, data : une equipe complementaire, animee par la meme exigence."
   - Animation:
     - portraits reveal in staggered sequence;
     - role labels fade after portrait lock-in;
     - no parallax on faces.

7. Reworked `FaqSection`
   - Title: "Vos questions. Nos reponses."
   - Use current `FAQ_ITEMS`, no invented objections.
   - Layout:
     - left headline;
     - right accordion list with numbered questions;
     - right-side note: "Une idee peut tout changer. Autant bien la construire."
   - Interaction:
     - accordion height morph using `framer-motion`;
     - plus icon rotates to close;
     - focus visible;
     - reduced motion disables height animation.

8. Reworked `CtaSection`
   - Black photographic/editorial final band.
   - Headline: "Parlons de votre prochaine campagne."
   - Supporting copy: "Une idee, un enjeu, une marque ? Discutons de la meilleure facon de la faire vivre avec les bons createurs."
   - CTA: "Nous contacter".
   - Footer stays sober.
   - Animation:
     - image/copy fade in as the user reaches the section;
     - CTA uses a small arrow slide on hover;
     - no looping background animation.

## Changes

1. `src/app/for-brands/page.tsx`
   - Change: replace the old below-fold stack with the approved V2 sequence.
   - Preserve: `BrandHeroV2`, `CaseStudiesSection`, dynamic imports where they still help initial load.
   - Verify: route order matches the approved storyboard.

2. `src/components/for-brands/ClientsSection.tsx` and CSS/module if extracted
   - Change: show all brands with a premium animated marquee and reduced-motion grid fallback.
   - Preserve: logo sources, alt text, no fabricated clients.
   - Verify: all logos pass through; no horizontal overflow at 375, 768, 1280 px.

3. `src/components/for-brands/BrandMethodSection.tsx` plus module CSS
   - Change: create the method + expertise rail as a single coherent section or two tightly paired sections.
   - Preserve: copy from `PROCESS_STEPS`, condensed into short commercial labels.
   - Verify: progress animation aligns with scroll and remains readable without JS motion.

4. `src/components/for-brands/TeamSectionBrands.tsx` and module CSS
   - Change: restyle into the "experts du terrain" editorial band.
   - Preserve: real people, roles, links or existing accessibility.
   - Verify: portraits do not crop badly; labels fit on mobile.

5. `src/components/for-brands/FaqSection.tsx` and module CSS
   - Change: restyle and animate the FAQ accordion in the V2 language.
   - Preserve: `FAQ_ITEMS`, schema in layout, keyboard accessibility.
   - Verify: open/close works by click and keyboard; reduced-motion path is stable.

6. `src/components/for-brands/CtaSection.tsx` and module CSS
   - Change: align final CTA with the dark editorial V2 footer.
   - Preserve: `/contact/brands` destination and existing contact intent.
   - Verify: CTA visible and readable at all tested widths.

7. `DESIGN.md`
   - Change after acceptance: update the documented scope from "book + three cases only" to include method, brand marquee, team, FAQ, and CTA.
   - Preserve: existing V2 tokens and signature.
   - Verify: every new color, motion rule, and section primitive is documented before code relies on it.

## Scope

- Inherit: `/for-brands` only.
- Verify: global brand nav theme switching, because new black and white bands will affect `data-nav-tone`.
- Exclude:
  - `/for-talents`
  - home page
  - contact form behavior
  - SEO metadata except existing FAQ schema preservation
  - new image generation, unless user asks for new mockups before implementation

## Animation plan

- Brand logos: CSS transform marquee for low cost, paused outside viewport, reduced-motion grid fallback.
- Method: scroll entry with staged opacity/transform and a progress line. No sticky hijacking.
- Expertise rail: subtle reveal and hover/focus emphasis.
- Team: portrait sequence with modest stagger.
- FAQ: height/opacity morph tied to accordion state, not scroll.
- CTA: one entrance reveal and CTA hover arrow.
- Performance rule: animate only `transform`, `opacity`, or `filter`; do not animate layout properties.

## Validation

- Product: open `http://localhost:3000/for-brands`, scroll from hero to footer, confirm the story reads in order:
  - book,
  - proof,
  - method,
  - expertise,
  - brands,
  - experts,
  - FAQ,
  - CTA.
- Interface:
  - viewports: 375, 768, 1280 px;
  - states: marquee running and reduced motion, FAQ open/closed, CTA hover/focus, mobile nav over the new bands;
  - inspect for no text overlap, no horizontal overflow, no cropped critical logos or faces.
- System:
  - confirm no old "campagnes responsables pour longtemps" section remains;
  - confirm all clients are included in the brand animation;
  - confirm no duplicate old sections remain in page order.
- Repository:
  - `npm run type-check` -> expected pass.
  - `npm run build` -> expected pass.
  - scoped visual QA screenshots at 375, 768, 1280 -> expected pass after iteration.

## Stop conditions

- Stop if the user decides the three case studies should be moved after method instead of directly after the book.
- Stop if current client logos are too inconsistent visually and require a logo cleanup pass before animation.
- Stop if actual team image assets are missing or unsuitable; ask whether to use silhouettes, generated editorial placeholders, or a text-first team layout.
- Stop if implementing the desired page-turn/scroll animation requires replacing the current book mechanics rather than extending them.

## Design documentation

- After user acceptance and implementation validation, update `DESIGN.md`:
  - page order,
  - logo marquee behavior,
  - method/expertise section primitives,
  - team/FAQ/CTA motion,
  - reduced-motion rules.
