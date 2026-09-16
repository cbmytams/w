# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

La page Marque s'adresse aux responsables marketing, communication et influence qui doivent lancer une campagne créateur, expliquer leurs choix en interne et conserver des contenus exploitables après la diffusion.

## Product Purpose

Wafia réunit stratégie, casting, création, production, droits, diffusion paid et reporting dans un même dispositif. La page doit donner envie de confier une campagne à l'agence, tout en rendant sa méthode et son niveau d'exécution immédiatement crédibles.

## Positioning

Une campagne créateur n'est pas une activation isolée : Wafia la structure comme un actif de marque, du premier brief aux apprentissages du cycle suivant.

## Operating Context

Le visiteur évalue l'agence à travers ses expertises, sa méthode, ses cas clients, ses preuves de résultats, son cadre légal et brand safety, son équipe et sa capacité à répondre aux objections avant une prise de contact.

## Capabilities and Constraints

- Expertises : influence, création, production et ads.
- Méthode : audit et cadrage, concept et casting, production, pilotage, reporting et roadmap.
- Les usages, droits, territoires, mentions et validations sont cadrés avant diffusion.
- La nouvelle page Marque doit être fluide sur ordinateur, tablette et mobile, respecter la réduction des animations et rester lisible sans WebGL.
- Les contenus et preuves existants doivent être conservés ; aucune marque, statistique ou certification ne doit être inventée.

## Brand Commitments

Wafia reste directe, précise, commerciale et accessible. La V2 assume une direction éditoriale premium autour du dossier et du livre noir 3D, avec une palette minérale, noir charbon, ivoire et accent vermillon. Le livre ouvre la page et tourne réellement ses pages au fil du défilement.

## Evidence on Hand

- Clients et logos dans `src/constants/clients.ts` et `public/logos/`.
- Cas Basic Fit, CJ Group / Korea House et Equip Auto dans `src/components/for-brands/CaseStudiesSection.tsx`, avec visuels dans `public/`.
- Méthode détaillée dans `src/constants/process-steps.ts`.
- Objections et réponses dans `src/constants/faq.ts`.
- Équipe et profils dans `src/constants/team.ts`.
- Aucun témoignage client vérifié n'est actuellement disponible ; ne pas en fabriquer.

## Product Principles

- Montrer le raisonnement derrière la création, pas seulement le résultat.
- Faire de chaque preuve un élément commercial lisible et vérifiable.
- Donner un rôle à chaque animation : révéler, orienter ou expliquer.
- Préserver une sensation premium sans ralentir l'accès à l'information.
- Mener naturellement du dossier de campagne vers la prise de contact.

## Accessibility & Inclusion

Navigation clavier, focus visible, contenu HTML indépendant des décors 3D, contraste suffisant et alternative `prefers-reduced-motion` sont requis.
