# Case Studies For Brands Gate Review

recommendation: APPROVE
verdict: PASS
blockers: []

## Original Intent

Finaliser uniquement les trois case studies de `/for-brands`: trois bandes compactes, cinematiques, fluides au scroll, responsive et sans AI slop. Pour CJ / Korea House, conserver le panorama exterieur nettoye sans faux logo rasterise et superposer le logo officiel `public/logos/cj-logo.svg` dans le DOM. Ne modifier aucun fichier produit pendant la revue.

## Desired Outcome

- Trois bandes lisibles et coherentes aux largeurs 1280, 768 et 375 px, sans overflow horizontal.
- Hauteur desktop de 238 px a 1280 px et hauteur mobile de 373 px a 375 px.
- Revelation IntersectionObserver utile et legere: etat initial invisible/decale/zoome, puis etat revele stable; aucun mouvement en reduced motion.
- Dialogue de cas client fonctionnel, avec verrouillage et restauration du scroll body.
- CJ utilise le panorama nettoye et un logo officiel rendu separement par le DOM.
- Build de production et ESLint verts.

## User Outcome Review

PASS. Les trois captures fournies ont ete inspectees a leur resolution native. Les compositions sont compactes, les contenus restent lisibles, les colonnes de preuves sont stables et aucun chevauchement incoherent ou debordement horizontal n'est visible. Le passage sombre / clair / sombre donne une variation editoriale maitrisee sans palette monotone ni empilement de cartes. Les images servent directement chaque cas; il n'y a pas de decoration generique, de pills superflues, de hero marketing, ni d'autre motif visuel caracteristique d'AI slop.

La capture Korea House 375 px montre un panorama exterieur nettoye avec une banniere blanche sans faux logo integre. Le DOM reel contient une image distincte `src="/logos/cj-logo.svg"`, sous un conteneur accessible `Logo officiel CJ`; le SVG inspecte correspond a l'asset public officiel demande. Le logo est visuellement superpose en bas a droite sur mobile et au-dessus de l'entree sur desktop/tablette.

La page locale a ete mesuree directement. A 1280 px, les trois articles font 238 px; a 768 px, 246 px; a 375 px, 373 px. Pour chaque viewport, `documentElement.scrollWidth === clientWidth` et `#case-studies.scrollWidth === clientWidth`. A 1280 px avant intersection, chaque article avait `data-revealed=false`, `opacity: 0` et `transform: matrix(1,0,0,1,0,16)`; apres navigation vers la section et attente de la transition, les trois avaient `data-revealed=true`, `opacity: 1`, `transform: none`, et l'image stage `transform: none`. La source applique bien le zoom initial `scale(1.025)` a l'image stage.

Le chemin reduced-motion est correct par construction observable: lorsque `prefers-reduced-motion: reduce` matche, le code marque immediatement chaque article revele et retourne avant d'ajouter `data-motion-ready`; les styles de transition ne peuvent donc pas s'appliquer. Les styles media suppriment en plus les transitions si l'attribut existe. Le resultat calcule attendu est ainsi `opacity: 1`, `transform: none`, transition nulle. L'environnement navigateur courant ne proposait pas d'emulation media, donc ce point est confirme par le DOM/CSS source plutot que par une seconde session emulee.

Le dialogue CJ a ete exerce dans le vrai DOM a 375 px. Il est passe a `open=true`, `display:block`, titre `CJ GROUP KOREA HOUSE`, focus sur le bouton de fermeture et body `overflow:hidden`; apres fermeture il est passe a `open=false`, `display:none`, le body est revenu exactement a `overflow:unset`, et `scrollY` est reste a 3587.5.

## Criteria Evidence

- `C1-CJ-AUTHENTICITY`: PASS. `CaseStudiesSection.tsx:37-41,141-145`; `public/logos/cj-logo.svg`; captures 1280/768/375.
- `C2-COMPACT-RESPONSIVE`: PASS. Mesures DOM 238/246/373 px et captures fournies.
- `C3-NO-HORIZONTAL-OVERFLOW`: PASS. Mesures DOM clientWidth/scrollWidth egales a 1280, 768 et 375 px.
- `C4-SCROLL-MOTION`: PASS. Etat initial et revele reproduits; source reduced-motion inspectee dans `CaseStudiesSection.tsx:86-108` et `CaseStudiesSection.module.css:13-19,99`.
- `C5-DIALOG-INTEGRITY`: PASS. Cycle ouverture/fermeture et restauration du body reproduits dans le DOM reel.
- `C6-BUILD-LINT`: PASS. `npm run lint -- --no-cache` et `npm run build` termines avec code 0 le 2026-09-15.
- `C7-NO-AI-SLOP`: PASS. Passage direct `remove-ai-slops` et `programming` sur production, diff et tests.

## Slop And Programming Review

Le composant TSX mesure 158 lignes pures et la feuille CSS 100; aucun module ne depasse le seuil de 250 lignes pures. Aucun commentaire evident, code mort, catch large, parsing/normalisation ad hoc, abstraction speculative, helper mono-usage, parametre excessif, mutation douteuse ou duplication couteuse n'a ete trouve dans ce scope. L'IntersectionObserver est deconnecte au cleanup et chaque cible revelee est desobservee, ce qui borne le travail. Les transitions portent uniquement sur `opacity` et `transform`, donc sur des proprietes adaptees a l'animation.

Aucun test nouveau visant ces fichiers n'a ete trouve. Il n'y a donc aucun test de suppression, tautologique, miroir de l'implementation ou excessif a bloquer. L'absence de test automatise specifique est compensee ici par les mesures DOM directes et n'enfreint aucun critere explicite. Le rapport precedent `.omo/evidence/for-brands-design-functional-integrity-gate-review.md` mentionne une passe slop/programming, mais couvre un ensemble plus large et signale lui-meme l'absence de rapport final independant; il ne remplace pas cette passe directe.

## Checked Artifact Paths

- `/Users/sasha/Desktop/wafia - website/src/components/for-brands/CaseStudiesSection.tsx`
- `/Users/sasha/Desktop/wafia - website/src/components/for-brands/CaseStudiesSection.module.css`
- `/Users/sasha/Desktop/wafia - website/public/logos/cj-logo.svg`
- `/Users/sasha/Desktop/wafia - website/public/images/cases/korea-house-editorial-v2.webp`
- `/Users/sasha/Desktop/wafia - website/output/playwright/case-studies-final-1280.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/case-studies-final-768.png`
- `/Users/sasha/Desktop/wafia - website/output/playwright/korea-house-final-375.png`
- `/Users/sasha/Desktop/wafia - website/.omo/evidence/for-brands-design-functional-integrity-gate-review.md`
- Live DOM at `http://127.0.0.1:3000/for-brands`

## Exact Evidence Gaps

- No executor evidence file, dedicated code-review report, manual QA matrix, original brief artifact, success-criteria artifact, or notepad path was supplied or found for this narrow case-study pass. This is a NOTE, not a blocker: the stated criteria were independently checked against source, captures, live DOM, lint and build.
- Reduced motion was not emulated in the live browser because its available viewport capability does not expose media emulation. The exact branch and cascade were inspected directly and establish the requested final state; no contradictory artifact exists.
- Repository artifacts do not establish the provenance or client approval of the illustrative photographs or campaign metrics. The UI explicitly labels them as illustration/presentation data to validate. This does not violate the requested authenticity criterion, which specifically concerns the absence of a fake CJ logo and use of the official SVG overlay.
- Production build emits a non-blocking workspace-root warning caused by multiple lockfiles and a Node deprecation warning. Compilation, TypeScript, static generation and route production all completed successfully; neither warning is tied to the reviewed scope or a stated criterion.

## Must Not Regress

- Keep the CJ logo out of the Korea House raster and render `/logos/cj-logo.svg` as a separate DOM image.
- Preserve the cleaned exterior panorama, the three-case order, the 238 px desktop and 373 px mobile heights, and zero horizontal overflow at 1280/768/375.
- Preserve the one-shot IntersectionObserver reveal and the immediate static reduced-motion path.
- Preserve native dialog semantics, keyboard focus, body scroll locking and exact overflow restoration on close.
- Preserve the restrained dark/light/dark rhythm, readable proof metrics, responsive crops and absence of decorative AI-slop patterns.
