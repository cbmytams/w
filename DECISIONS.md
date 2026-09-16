# Décisions — Passage Impeccable Talents & Marques

## Périmètre

Passage ciblé sur `/for-talents` et `/for-brands`, en conservant le site de base, la stack Next.js existante, les routes, les contenus factuels et l'identité Wafia déjà en place.

## Direction éditoriale

- Marques : la page parle de cadrage opérationnel. Le message principal devient `Campagnes créateurs sans zone floue.` pour mettre l'accent sur ce que Wafia rend lisible : casting, production, droits, reporting et arbitrage.
- Talents : la page parle de structure autour de la personne. Le message principal devient `Votre talent mérite une structure.` pour éviter la promesse vague et ramener la page vers l'image, les projets, les revenus et les droits.
- Les CTA mènent vers le contact qualifié, avec des formulations sobres : `Structurer ma campagne`, `Nous contacter`, `Voir les réalisations`.
- Les textes trop génériques ou trop promotionnels ont été remplacés par des phrases vérifiables : objectifs, contraintes, risques, droits, KPIs utiles, actifs réutilisables.

## Direction design

- Réduction des signes "AI slop" : moins de gradients dans les titres, suppression des badges décoratifs, suppression de halos/orbes non nécessaires, remplacement des emojis par des icônes lucide cohérentes.
- Les héros restent dans l'identité claire et premium du site de base, mais avec une hiérarchie plus directe : H1, paragraphe court, preuves/contextes, CTA.
- Les sections équipe n'utilisent plus d'images distantes fragiles sur ces deux pages. Elles passent sur des monogrammes propres, stables, et cohérents avec la direction éditoriale.
- Les blocs Marques ont été rapprochés d'un langage de pilotage : shortlist justifiable, droits cadrés, KPIs utiles, campagne explicable.
- Les blocs Talents ont été rapprochés d'un langage de carrière : positionnement, production, négociation, droits, revenus, autonomie.

## Vérifications

- `npm run type-check`
- `npm run lint`
- `npm run build`
- Captures desktop/mobile pour `/for-brands` et `/for-talents` dans `.impeccable/review/`
- Contrôle Playwright : aucun overflow horizontal sur desktop ou mobile pour les deux routes.
- Détecteur Impeccable lancé une fois, puis corrections appliquées sur les findings mécaniques.

## Points volontairement non traités

- Les avertissements CSP liés aux styles inline/Framer et `unsafe-eval` existent dans le socle de développement et ne sont pas spécifiques à ce passage.
- Pas de refonte globale, pas de changement de navigation, pas de nouvelle identité visuelle complète.
