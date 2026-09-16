# Case Studies Visual Fidelity Gate Review

recommendation: APPROVE
verdict: PASS
blockers: []

## Original Intent

Finaliser uniquement les trois case studies de `/for-brands`. CJ doit utiliser le panorama extérieur initial nettoyé, sans faux logo généré, avec le logo officiel `public/logos/cj-logo.svg` superposé par le DOM. Les trois bandes doivent être compactes, cinématographiques, fluides au scroll, responsive et sans AI slop.

## Desired Outcome

Trois bandes visuellement continues et lisibles aux largeurs 1280, 768 et 375 px, avec des recadrages convaincants, une hiérarchie typographique nette, des résultats sans clipping, aucun débordement horizontal, une révélation discrète respectant `prefers-reduced-motion`, et un dialogue utilisable qui restaure le scroll à la fermeture.

## User Outcome Review

Les trois captures demandées ont été ouvertes et inspectées directement. À 1280 px, les bandes de 238 px forment un triptyque compact et régulier: photographie, copie et colonne de résultats sont clairement séparées, sans rupture visuelle. À 768 px, les bandes de 246 px conservent la même hiérarchie et les sujets importants restent correctement cadrés. À 375 px, la bande CJ mesure 373 px; le texte, l'entrée, la foule, le logo et les trois preuves restent lisibles sans collision.

Le panorama CJ source a également été ouvert directement. Sa grande bannière est vierge et ne contient aucun faux logo. Le composant référence `/images/cases/korea-house-editorial-v2.webp` comme photographie et `/logos/cj-logo.svg` dans un élément DOM séparé rendu par `next/image`. Sur desktop et tablette, le logo est placé sur la bannière; sur mobile il devient un petit cartouche contrasté en bas à droite, sans masquer le titre ni les personnes principales.

Les recadrages sont équilibrés: Basic-Fit maintient le visage et l'effort comme point focal; CJ conserve l'architecture, l'entrée et la foule; Salon de l'Auto utilise une image contenue nette sur fond sombre. Le contraste clair/sombre alterne proprement, les métriques orange restent immédiatement scannables et aucun texte n'est coupé. La composition reste volontairement dense et cinématographique sans cartes décoratives, badges superflus, effets en boucle ou ornements AI-slop.

## Objective Evidence

- Capture `case-studies-final-1280.png`: 1280 x 746; trois bandes observées à 238 px dans le navigateur live.
- Capture `case-studies-final-768.png`: 768 x 770; trois bandes observées à 246 px dans le navigateur live.
- Capture `korea-house-final-375.png`: 375 x 373; les trois bandes mesurent chacune 373 px dans le navigateur live.
- Débordement: `documentElement.scrollWidth === clientWidth` à 1280, 768 et 375.
- État initial à 1280: `opacity: 0`, `translateY(16px)` sur chaque article, `scale(1.025)` sur l'image, transitions 0.78 s / 1 s.
- État révélé après intersection: `data-revealed=true`, `opacity: 1`, transform de l'article `none`, transform de l'image `none`.
- Reduced motion: la branche source marque immédiatement chaque article révélé avant d'ajouter `data-motion-ready`; les styles calculés restent donc à `opacity: 1`, `transform: none`, sans transition d'apparition. La règle média annule aussi les transitions si l'attribut existe.
- Dialogue live: ouverture confirmée avec attribut `open` et `body.style.overflow="hidden"`; fermeture confirmée sans attribut `open` et restauration de la valeur initiale `"unset"`.
- `npm run build`: exit 0, compilation et TypeScript réussis.
- `npm run lint`: exit 0, aucune erreur ESLint.

## Slop And Programming Pass

Pass direct effectué sur le diff, les deux fichiers produit et les tests existants. Aucun test nouveau ne cible cette section; il n'y a donc ni test de suppression, ni test tautologique, ni test miroir, ni sur-couverture artificielle à créditer. Aucun helper mono-usage, parsing/normalisation superflu, abstraction spéculative, commentaire évident, branche défensive inutile, log de debug, échappatoire `any`/`@ts-ignore`, ou dérive de périmètre n'a été trouvé dans les fichiers examinés. `CaseStudiesSection.tsx` mesure 158 lignes de code pures, sous le seuil de 250 lignes. Les données, le rendu, l'observation et le dialogue restent regroupés dans un composant de section unique sans extraction de production injustifiée.

Les rapports existants ne présentent pas une matrice explicite `remove-ai-slops`/`programming` propre à cette itération des case studies. Ils mentionnent toutefois l'absence de tests artificiels et de parsing/extraction spéculatifs sur le périmètre antérieur. Cette revue directe fournit la couverture requise pour le diff actuel; l'absence de doublon dans un rapport indépendant est une lacune documentaire, pas un échec d'un critère produit.

## Checked Artifact Paths

- `src/components/for-brands/CaseStudiesSection.tsx`
- `src/components/for-brands/CaseStudiesSection.module.css`
- `public/images/cases/korea-house-editorial-v2.webp`
- `public/logos/cj-logo.svg`
- `output/playwright/case-studies-final-1280.png`
- `output/playwright/case-studies-final-768.png`
- `output/playwright/korea-house-final-375.png`
- `.omo/evidence/for-brands-visual-fidelity-gate-review.md`
- `.omo/evidence/for-brands-design-functional-integrity-gate-review.md`
- Current git diff and status
- Live route `http://localhost:3107/for-brands`

## Evidence Gaps

- Aucun executor evidence, code review report dédié à cette dernière itération, manual QA matrix ou chemin de notepad n'a été fourni ou trouvé. Les preuves ont donc été reproduites directement depuis les captures, les sources, le navigateur live, le build et ESLint.
- Aucune capture reduced-motion dédiée à ces trois fichiers finaux n'a été fournie. Le comportement est établi par la branche exécutée dans le composant et la cascade CSS, mais pas par une capture visuelle distincte de la série demandée.
- La capture mobile fournie isole uniquement CJ; les hauteurs et l'absence d'overflow des trois bandes à 375 px ont été reproduites dans le DOM live, mais Basic-Fit et Salon de l'Auto n'ont pas de capture finale mobile dédiée dans le paquet demandé.

## What Is Good

La direction est précise et retenue: trois bandes courtes, trois traitements d'image adaptés, une typographie condensée qui donne du rythme sans devenir décorative, et des métriques alignées sur une grille stable. CJ est particulièrement réussi: le panorama propre respire, le blanc du bâtiment soutient la bande claire, et le vrai logo reste identifiable comme superposition éditoriale plutôt que comme élément fabriqué dans l'image.
