# Audit senior IA du projet `wafia-website`

Date d'audit: 13 avril 2026

## Contexte inféré

- Projet: `wafia-website`
- Stack principale: Next.js 16 App Router, React 19, Tailwind CSS 4, Prisma/PostgreSQL, NextAuth
- Sous-projets embarqués: `wiki/` (Vite + React), `wafia-questionnaire-brands/` (Vite + React), `wafia-questionnaire-brands/platform/` (Next.js + Prisma)
- Repo audité: `/Users/sasha/Desktop/wafia - website`
- Etat réel observé: pré-lancement / dev avancé, non prêt pour une mise en production propre
- Objectif observé: site marketing Wafia + wiki éditorial + diagnostics/questionnaires + back-office/admin

## Méthode

Contrôles exécutés le 13 avril 2026:

- `npm run lint`
- `npm run type-check`
- `npm run test -- --runInBand`
- `npm run build`
- `npx knip`
- `npx madge --circular --extensions ts,tsx src`
- `npm audit --json`
- `npm outdated --json`
- `npm run build` et `npm run lint` dans `wiki/`
- `npm run build`, `npm run lint` et `npm audit --omit=dev --json` dans `wafia-questionnaire-brands/platform/`
- `npm run build`, `npm run lint`, `npm run type-check` et `npm audit --omit=dev --json` dans `wafia-questionnaire-brands/`
- recherches ciblées `rg` sur logs, TODO/FIXME, `@ts-ignore`, `dangerouslySetInnerHTML`, `any`, assets non référencés, dossiers vides et fichiers dupliqués

## Constats rapides

- Le coeur du site Next.js est globalement plus propre que le reste: build OK, tests OK, SEO de base en place.
- Le repo au sens large est très pollué par du code IA dupliqué, des artefacts générés et des sous-projets cassés.
- Le vrai point bloquant avant prod n'est pas cosmétique: c'est l'isolation multi-tenant incomplète et la dette structurelle qui fait passer la CI alors que des sous-projets sont déjà cassés.

---

## 1. Nettoyage & code mort

### 🔴 CRITIQUE — Fichiers dupliqués versionnés qui cassent le build et brouillent la source de vérité

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/platform/src/app/api 2/v1/dashboard/leads/route.ts:2`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/platform/src/app/api 3/v1/dashboard/leads/route.ts`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/platform/src/lib/apiAuth 2.ts`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/platform/src/lib/authSession 2.ts`
   - `/Users/sasha/Desktop/wafia - website/prisma/schema 2.prisma`
   - `/Users/sasha/Desktop/wafia - website/.gitignore 2`
   - `/Users/sasha/Desktop/wafia - website/.env 2.example`
   - et des dizaines d'autres variantes ` 2`, ` 3`, ` 4`, ` 5`
2. Description:
   Le dépôt contient massivement des copies suffixées, y compris dans des chemins compilés par Next.js. Le build de `platform` échoue précisément sur un faux endpoint dupliqué: `src/app/api 2/v1/dashboard/leads/route.ts:2`.
3. Impact:
   Build cassé, dette énorme, régressions silencieuses, revues impossibles, très forte odeur de copier-coller IA.
4. Fix recommandé:
   Supprimer toutes les variantes suffixées, définir un owner par source de vérité, ajouter un script CI qui bloque aussi ` 3`, ` 4`, ` 5`, pas seulement ` 2`.

### 🟠 IMPORTANT — Composants/fichiers morts confirmés par `knip`

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/components/common/InlineCallout.tsx`
   - `/Users/sasha/Desktop/wafia - website/src/components/common/index.ts`
   - `/Users/sasha/Desktop/wafia - website/src/components/layout/header.tsx`
   - `/Users/sasha/Desktop/wafia - website/src/components/layout/index.ts`
   - `/Users/sasha/Desktop/wafia - website/src/components/questionnaire/MissingFieldsBadge.tsx`
   - `/Users/sasha/Desktop/wafia - website/src/components/team/TeamCard.tsx`
   - `/Users/sasha/Desktop/wafia - website/src/components/team/TeamSection.tsx`
   - `/Users/sasha/Desktop/wafia - website/src/components/ui/button-animated.tsx`
   - `/Users/sasha/Desktop/wafia - website/src/components/ui/card.tsx`
   - `/Users/sasha/Desktop/wafia - website/src/hooks/useBodyScrollLock.ts`
   - `/Users/sasha/Desktop/wafia - website/src/styles/glass.ts`
2. Description:
   `npx knip` a remonté 65 fichiers inutilisés. Une partie correspond à des redesigns abandonnés ou des barrels morts.
3. Impact:
   Repo plus lourd, confusion produit, surface de maintenance inutile.
4. Fix recommandé:
   Supprimer par lots, en commençant par les barrels morts et les composants jamais importés.

### 🟠 IMPORTANT — Artefacts générés et bundles obsolètes committés

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/coverage/coverage-final.json`
   - `/Users/sasha/Desktop/wafia - website/coverage/lcov-report/index.html`
   - `/Users/sasha/Desktop/wafia - website/coverage/coverage-final 2.json`
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire-brands/assets/index-6N_z9hW6.js`
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire-brands/assets/vendor-core-DGQrCaVP.js`
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire-brands/assets/vendor-motion-DuX56ldt.js`
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire-brands/assets/vendor-charts-CMM7D_YI.js`
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire-brands/assets/index-DSPakoth.css`
2. Description:
   Des artefacts de coverage et d'anciens bundles Vite sont versionnés alors qu'ils ne sont plus référencés par les HTML actuels.
3. Impact:
   Repo gonflé, risque de déployer un mauvais bundle, forte ambiguïté pour l'équipe.
4. Fix recommandé:
   Nettoyer le versionné, régénérer une seule sortie par app, et empêcher le commit des artefacts dérivés.

### 🟡 MINEUR — Imports inutilisés dans le code actif

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/components/for-talents/ConstatSection.tsx:9`
   - `/Users/sasha/Desktop/wafia - website/src/components/for-talents/ConstatSection.tsx:12`
   - `/Users/sasha/Desktop/wafia - website/src/components/for-talents/CreatorTrajectoryWidget.tsx:4`
   - `/Users/sasha/Desktop/wafia - website/src/components/for-talents/CreatorTrajectoryWidget.tsx:6`
   - `/Users/sasha/Desktop/wafia - website/src/components/for-talents/CreatorTrajectoryWidget.tsx:58`
2. Description:
   Le lint root ne remonte plus que 5 warnings, tous liés à des imports/variables inutilisés.
3. Impact:
   Bruit faible, mais symptôme d'itérations inachevées.
4. Fix recommandé:
   Corriger ces warnings et faire passer le lint en zéro warning sur le coeur du projet.

### 🟡 MINEUR — Dossiers vides

1. Dossiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/components/for-agencies/`
   - `/Users/sasha/Desktop/wafia - website/src/components/for-brands/north-star/`
   - `/Users/sasha/Desktop/wafia - website/src/components/talents/`
2. Description:
   Dossiers présents sans contenu exploitable.
3. Impact:
   Confusion de structure.
4. Fix recommandé:
   Supprimer ou documenter la roadmap correspondante.

### 🟠 IMPORTANT — Dépendances confirmées inutilisées ou ambiguës

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/package.json:48`
   - `/Users/sasha/Desktop/wafia - website/package.json:63`
   - `/Users/sasha/Desktop/wafia - website/package.json:64`
2. Description:
   `parse5` n'est importé nulle part dans le code source. `@testing-library/jest-dom` et `@testing-library/react` sont installés mais inutilisés dans la suite Jest root.
3. Impact:
   Dette de dépendances, surface de vulnérabilité élargie inutilement.
4. Fix recommandé:
   Supprimer ces paquets ou brancher réellement les tests UI qui les justifient.

---

## 2. Erreurs classiques IA

### 🟠 IMPORTANT — Logs de debug/erreur encore présents dans le code applicatif

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/app/error.tsx:17`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/contact/route.ts:95`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/current/route.ts:49`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/submit/route.ts:103`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/health/route.ts:92`
   - `/Users/sasha/Desktop/wafia - website/wiki/src/lib/blog.ts:20`
   - `/Users/sasha/Desktop/wafia - website/wiki/src/lib/blog.ts:54`
   - `/Users/sasha/Desktop/wafia - website/wiki/src/lib/blog.ts:112`
   - `/Users/sasha/Desktop/wafia - website/wiki/src/pages/ArticleListPage.tsx:34`
2. Description:
   Le projet contient encore des `console.log`, `console.warn` et `console.error` utilisés comme mécanisme de run-time.
3. Impact:
   Bruit en prod, fuite d'informations techniques, pas de logging structuré.
4. Fix recommandé:
   Remplacer par une couche de logging structurée et réduire les logs clients au strict minimum.

### 🟠 IMPORTANT — Fallback silencieux qui masque une panne de DB/config

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/current/route.ts:37-56`
2. Description:
   En cas d'erreur DB, l'API renvoie un questionnaire local de fallback au lieu d'échouer proprement.
3. Impact:
   Panne masquée, écarts de contenu entre admin et public, debugging très difficile.
4. Fix recommandé:
   Retourner une erreur explicite, monitorée, et ne fallbacker que derrière un feature flag de maintenance.

### 🟠 IMPORTANT — Logique dupliquée copiée-collée dans les routes questionnaire

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/current/route.ts:11-35`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/questions/route.ts:10-31`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/questions/[id]/route.ts:14-35`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/reorder/route.ts:11-32`
2. Description:
   `getCurrentQuestionnaire` / `getOrCreateCurrentQuestionnaire` et `ensureTenantId` sont recopiées dans plusieurs handlers.
3. Impact:
   Risque élevé de divergence fonctionnelle et de bug partiel lors des corrections.
4. Fix recommandé:
   Extraire une couche `questionnaireService` ou `questionnaireRepository`.

### 🟡 MINEUR — Dépendances React volontairement masquées

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/components/dashboard/QuestionnaireHealthPanel.tsx:39-42`
2. Description:
   Un `eslint-disable-next-line react-hooks/exhaustive-deps` contourne la vérification du hook.
3. Impact:
   Risque de logique fragile et d'effet qui dérive à la prochaine évolution.
4. Fix recommandé:
   Mémoriser `refreshHealth` proprement ou passer à une forme `async` stable.

### 🟡 MINEUR — Usage de `any` dans le wiki source

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/wiki/src/pages/BlogPage.tsx:59`
   - `/Users/sasha/Desktop/wafia - website/wiki/src/pages/TestPage.tsx:5`
2. Description:
   Le code source wiki contient encore des `as any` et `useState<any[]>`.
3. Impact:
   Typage lâche, bugs de données plus faciles à introduire.
4. Fix recommandé:
   Remplacer par des types explicites de tabs et d'articles.

### 🟡 MINEUR — Fichiers très longs

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/components/common/BackgroundFlow.tsx` (609 lignes)
   - `/Users/sasha/Desktop/wafia - website/src/components/for-talents/MethodSection.tsx` (505 lignes)
2. Description:
   Deux composants dépassent déjà le seuil raisonnable de maintenance.
3. Impact:
   Revue difficile, faible lisibilité, tests ciblés plus coûteux.
4. Fix recommandé:
   Découper par sous-sections visuelles et logique de hooks.

---

## 3. Sécurité

### 🔴 CRITIQUE — Isolation multi-tenant incomplète voire contournable

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/prisma/schema.prisma:70-131`
   - `/Users/sasha/Desktop/wafia - website/src/lib/authOptions.ts:96-100`
   - `/Users/sasha/Desktop/wafia - website/src/lib/authOptions.ts:120-136`
   - `/Users/sasha/Desktop/wafia - website/src/lib/apiAuth.ts:6-10`
   - `/Users/sasha/Desktop/wafia - website/src/lib/apiAuth.ts:20-47`
   - `/Users/sasha/Desktop/wafia - website/src/lib/dashboard/queries/leads.ts:35-56`
   - `/Users/sasha/Desktop/wafia - website/src/lib/dashboard/queries/kpi-data.ts:18-99`
   - `/Users/sasha/Desktop/wafia - website/src/lib/dashboard/queries/audit.ts:10-28`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/talents/route.ts:19-31`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/dashboard/leads/route.ts:88-100`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/submit/route.ts:42-47`
2. Description:
   Le schéma Prisma prévoit des tenants, mais la session auth n'embarque aucun `tenantId` et les requêtes dashboard/API ne filtrent pas par tenant. En plus, les soumissions questionnaire sont affectées au tenant par défaut ou au plus ancien tenant trouvé.
3. Impact:
   Fuite inter-tenant, accès à des leads non autorisés, écriture de données dans le mauvais tenant.
4. Fix recommandé:
   Mettre `tenantId` dans la session, l'imposer dans tous les repositories Prisma, et interdire toute lecture/écriture sans scope tenant explicite.

### 🟠 IMPORTANT — Rate limiting local mémoire non fiable en prod

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/lib/requestSecurity.ts:19-49`
   - `/Users/sasha/Desktop/wafia - website/src/lib/requestSecurity.ts:60-79`
   - `/Users/sasha/Desktop/wafia - website/src/lib/requestSecurity.ts:126-142`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/contact/route.ts:7-35`
2. Description:
   Le rate limit repose sur des `Map` en mémoire process et il existe même une seconde implémentation spécifique pour `/api/contact`.
3. Impact:
   Inefficace derrière plusieurs instances, réinitialisé à chaque restart, contournable en horizontal scale.
4. Fix recommandé:
   Centraliser sur Redis/Upstash ou au niveau reverse-proxy/WAF.

### 🟠 IMPORTANT — Identifiants admin de dev hardcodés

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/lib/authOptions.ts:41-46`
2. Description:
   En non-prod, le projet injecte automatiquement `admin` / `admin` si aucune variable n'est fournie.
3. Impact:
   Habitude dangereuse, risque d'exposition accidentelle sur un mauvais environnement.
4. Fix recommandé:
   Supprimer ce fallback et faire échouer explicitement l'auth si les secrets ne sont pas présents.

### 🟠 IMPORTANT — Dépendances avec vulnérabilités connues

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/package.json:24`
   - `/Users/sasha/Desktop/wafia - website/package.json:46`
   - `/Users/sasha/Desktop/wafia - website/package.json:73`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/package.json:22`
2. Description:
   Le 13 avril 2026, `npm audit` remonte 11 vulnérabilités sur le root, dont 1 critique. `next@16.1.6` est directement touché par plusieurs advisories corrigés en `16.2.3`. `prisma@6.19.2` est également exposé. Le diagnostic marques embarque `dompurify@3.3.1` avec une faille modérée connue.
3. Impact:
   Surface d'attaque inutilement ouverte, surtout si exposition publique.
4. Fix recommandé:
   Mettre à jour `next` au moins en `16.2.3`, patcher `prisma`, et monter `dompurify` au-delà de `3.3.1`.

### ⚪ SUGGESTION — Le proxy `/platform/*` ne protège pas en amont

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/app/platform/[...path]/route.ts:68-103`
2. Description:
   Le proxy frontal relaie toutes les méthodes vers la plateforme sans garde-fou local. Toute la sécurité est déléguée à l'upstream.
3. Impact:
   Si l'upstream diverge, la gateway n'offre aucun filet.
4. Fix recommandé:
   Au minimum, ajouter des protections de base sur les sous-chemins `/platform/api/*`.

Note: je n'ai pas trouvé d'injection SQL brute, pas de `dangerouslySetInnerHTML` non maîtrisé hors JSON-LD et contenu wiki sanitizé, pas de wildcard CORS en prod, et aucun `.env` sensible versionné. `.gitignore` protège correctement `.env` et `.env.local` dans le root (`/Users/sasha/Desktop/wafia - website/.gitignore:4-5`).

---

## 4. Performance

### 🟠 IMPORTANT — Bundle JS trop lourd pour le diagnostic marques

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire-brands/assets/vendor-core-Dmgf2PWn.js`
2. Description:
   Le build Vite du diagnostic marques a produit un chunk `vendor-core` à 501.80 kB minifié. Vite a remonté l'avertissement pendant le build.
3. Impact:
   LCP et interactivité dégradés sur mobile, surtout sur réseaux moyens.
4. Fix recommandé:
   Découper les routes, extraire charts/admin hors bundle public, lazy-load des parties non critiques.

### 🟠 IMPORTANT — Pages marketing très riches en animation côté client

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/components/common/BackgroundFlow.tsx`
   - `/Users/sasha/Desktop/wafia - website/src/components/ui/RefinedParticlesBackground.tsx`
   - `/Users/sasha/Desktop/wafia - website/src/components/studio/SequentialVideoPlayer.tsx`
2. Description:
   Le site s'appuie sur des fonds animés, particules et composants média complexes en client-side.
3. Impact:
   LCP/INP plus fragiles sur mobile, chauffe CPU, risque de jank.
4. Fix recommandé:
   Dégrader sur mobile, conditionner à `prefers-reduced-motion`, réduire les presets tsParticles, et vérifier les pages les plus lourdes avec un profiler réel.

### 🟡 MINEUR — Polling toutes les 500 ms dans l'iframe questionnaire

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/components/questionnaire/QuestionnaireIframe.tsx:16-32`
2. Description:
   L'état de l'UI admin est piloté par `setInterval` lisant le hash de l'iframe 2 fois par seconde.
3. Impact:
   Travail CPU inutile, pattern fragile.
4. Fix recommandé:
   Utiliser `postMessage` depuis la SPA embarquée, ou des événements dédiés.

### ⚪ SUGGESTION — Pas d'outil de budget bundle dans la repo principale

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/package.json:9-21`
2. Description:
   Aucun script d'analyse bundle n'est prévu côté Next.js.
3. Impact:
   Les dérives de poids restent invisibles jusqu'au ressenti utilisateur.
4. Fix recommandé:
   Ajouter `@next/bundle-analyzer` et un visualizer côté Vite.

### Estimation Web Vitals

- Site principal marketing:
  - LCP estimé: 2.8s à 4.0s sur mobile milieu de gamme
  - CLS estimé: plutôt bon, sous réserve des médias dynamiques
  - INP/FID estimé: moyen, pénalisé par animations et composants client
- Diagnostic marques:
  - LCP estimé: > 4s sur mobile moyen
  - INP: fragile à cause du bundle initial

---

## 5. Architecture & structure

### 🔴 CRITIQUE — La qualité du repo est segmentée de façon artificielle

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/tsconfig.json:38-42`
   - `/Users/sasha/Desktop/wafia - website/eslint.config.mjs:15-20`
   - `/Users/sasha/Desktop/wafia - website/.github/workflows/ci.yml:16-29`
2. Description:
   Le root exclut `wiki/**` et `wafia-questionnaire-brands/**` du type-check, ignore `wafia-questionnaire-brands/**` côté ESLint, et la CI ne vérifie réellement que l'app Next root.
3. Impact:
   La CI est verte alors qu'une partie du repo est déjà cassée.
4. Fix recommandé:
   Traiter le repo comme un vrai monorepo, avec jobs séparés par package/app et contrats explicites.

### 🟠 IMPORTANT — Modèle de livraison hybride difficile à maintenir

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/next.config.ts:110-119`
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire/`
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire-brands/`
   - `/Users/sasha/Desktop/wafia - website/wiki/`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/`
2. Description:
   Le projet conserve simultanément les sources Vite et leurs bundles statiques copiés sous `public/`, tandis que le site principal Next sert aussi des pages dynamiques autour.
3. Impact:
   Drift entre source et artefact, chemins cassés, débogage de déploiement pénible.
4. Fix recommandé:
   Choisir: soit vraies apps séparées avec pipeline propre, soit intégration complète dans Next.

### 🟠 IMPORTANT — Les conventions de nommage sont cassées par les copies suffixées

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/.env 2.example`
   - `/Users/sasha/Desktop/wafia - website/.nvmrc 5`
   - `/Users/sasha/Desktop/wafia - website/docs/WAFIA_UX_AUDIT 3.md`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/platform/src/app/layout 2.tsx`
2. Description:
   On retrouve des fichiers configurants et des routes avec des suffixes numériques, ce qui détruit toute convention stable.
3. Impact:
   Forte baisse de confiance dans la structure du repo.
4. Fix recommandé:
   Purge immédiate et ajout d'une règle CI plus stricte.

### ⚪ SUGGESTION — Pas de dépendances circulaires détectées

`madge` n'a trouvé aucune dépendance circulaire dans `src/`. C'est un bon point, mais il est masqué par la dette structurelle autour.

---

## 6. Tests & qualité

### 🟠 IMPORTANT — Les tests existent, mais la couverture exploitable n'existe pas

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/jest.config.js:7-14`
   - `/Users/sasha/Desktop/wafia - website/coverage/lcov-report/index.html:24-48`
2. Description:
   Le root exécute 90 tests sur 20 suites, mais aucune vraie métrique de couverture ou seuil n'est configuré. Le report committé affiche `Unknown% 0/0`.
3. Impact:
   Impossible d'évaluer objectivement la protection contre les régressions.
4. Fix recommandé:
   Activer `collectCoverage`, définir des seuils minimums, et arrêter de versionner les rapports générés.

### 🟠 IMPORTANT — Les sous-projets cassés ne sont pas protégés par la CI

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/.github/workflows/ci.yml:22`
   - `/Users/sasha/Desktop/wafia - website/scripts/wiki-verify.sh:122-141`
   - `/Users/sasha/Desktop/wafia - website/wiki/package.json:6-12`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/platform/package.json:5-17`
2. Description:
   La CI root lance `WIKI_VERIFY_SKIP_BUILD=1 npm run wiki:verify`, ce qui vérifie seulement la version Next servie, pas le build source Vite du wiki. Elle ne lance pas les checks du diagnostic marques ni de `platform`.
3. Impact:
   Les sous-apps peuvent pourrir sans que le pipeline central ne le voie.
4. Fix recommandé:
   Ajouter des jobs dédiés `wiki`, `questionnaire-brands`, `platform`.

### 🟠 IMPORTANT — Etat de build réel des sous-projets: cassé

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/wiki/package.json:8`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/platform/src/app/api 2/v1/dashboard/leads/route.ts:2`
2. Description:
   Constat du 13 avril 2026:
   - `wiki`: build KO (`ERR_MODULE_NOT_FOUND` sur `vite/module-runner`)
   - `wiki`: lint/type-check KO (`Cannot find type definition file for 'vite/client'`)
   - `platform`: build KO à cause d'un fichier dupliqué compilé
   - `platform`: lint KO (`Cannot find module '../package.json'` dans le binaire eslint)
3. Impact:
   Plusieurs morceaux du projet ne sont pas industrialisables dans leur état actuel.
4. Fix recommandé:
   Réparer ces sous-projets avant toute extension fonctionnelle.

### 🟠 IMPORTANT — Le package `platform` n'a pas de vraie suite de tests

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/platform/package.json:11`
2. Description:
   Le script `test` du back-office ne fait qu'exécuter `npm run type-check`.
3. Impact:
   Zéro validation comportementale du back-office.
4. Fix recommandé:
   Ajouter des tests API/repository et au moins quelques tests d'intégration Prisma.

### 🟡 MINEUR — Pas de hooks qualité à la racine

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/.husky/pre-commit`
2. Description:
   Un hook Husky existe pour le sous-projet questionnaire, mais rien d'équivalent au niveau du repo principal.
3. Impact:
   Qualité inégale entre packages.
4. Fix recommandé:
   Mutualiser les hooks ou imposer les checks via CI stricte.

### 🟡 MINEUR — Pas de configuration Prettier versionnée

1. Fichiers concernés:
   - repo entier
2. Description:
   Aucune config Prettier détectée.
3. Impact:
   Formatage potentiellement divergent entre contributeurs et agents IA.
4. Fix recommandé:
   Ajouter une config et l'appliquer en pré-commit/CI.

### 🟡 MINEUR — Strict mode absent du wiki source

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/wiki/tsconfig.json`
2. Description:
   Le wiki ne définit pas `strict: true`, contrairement au root, au diagnostic marques et à `platform`.
3. Impact:
   Le sous-projet le plus éditorial est aussi le moins protégé par TypeScript.
4. Fix recommandé:
   Activer `strict` et corriger progressivement les types.

---

## 7. SEO & accessibilité

### 🟠 IMPORTANT — Les deux questionnaires embarqués sont mal localisés et sous-optimisés SEO

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire/index.html:2`
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire-brands/index.html:2`
2. Description:
   Les deux HTML statiques déclarent `lang="en"` alors que leur contenu est en français.
3. Impact:
   Mauvaise signalisation SEO et accessibilité pour lecteurs d'écran.
4. Fix recommandé:
   Passer en `lang="fr"` et aligner toute la métadonnée locale.

### 🟠 IMPORTANT — Les SPAs statiques questionnaire n'ont pas les métadonnées SEO de base attendues

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire/index.html:4-18`
   - `/Users/sasha/Desktop/wafia - website/public/questionnaire-brands/index.html:4-18`
2. Description:
   Elles n'ont ni canonical, ni Open Graph, ni Twitter cards, ni robots explicite. Le site principal Next, lui, est beaucoup mieux servi.
3. Impact:
   Mauvais partage social, faible contrôle du canonical, SEO dégradé sur des pages pourtant publiques.
4. Fix recommandé:
   Ajouter les meta tags essentiels ou intégrer ces flows dans Next.

### ⚪ SUGGESTION — Le site principal est plutôt propre en SEO de base

Points validés côté coeur Next:

- `lang="fr"` défini dans `/Users/sasha/Desktop/wafia - website/src/app/layout.tsx:102`
- sitemap et robots présents
- 404 custom présente
- metadata/canonical présentes sur les pages majeures

Le point faible SEO n'est donc pas le site principal, mais les microsites statiques embarqués.

---

## 8. Dépendances & config

### 🟠 IMPORTANT — La guard CI anti-duplication est insuffisante

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/.github/workflows/ci.yml:30-35`
2. Description:
   La CI ne bloque que les fichiers `* 2.*`. Or le dépôt contient aussi des `* 3.*`, `* 4.*`, `* 5.*` et des dossiers suffixés.
3. Impact:
   Le garde-fou existe, mais il arrive trop tard et trop faiblement.
4. Fix recommandé:
   Étendre la règle à tous les suffixes numériques et aux répertoires.

### 🟠 IMPORTANT — README wiki inutile / boilerplate

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/wiki/README.md`
2. Description:
   Le README du wiki est encore le boilerplate "AI Studio app" et ne décrit pas le vrai fonctionnement du sous-projet.
3. Impact:
   Mauvaise onboarding, perte de temps, documentation trompeuse.
4. Fix recommandé:
   Réécrire le README avec stack, scripts, build, SEO postbuild et relation avec le site principal.

### 🟡 MINEUR — Duplications de fichiers de config

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/.env 2.example`
   - `/Users/sasha/Desktop/wafia - website/.env 3.example`
   - `/Users/sasha/Desktop/wafia - website/.nvmrc 2`
   - `/Users/sasha/Desktop/wafia - website/.nvmrc 3`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/.env 2.example`
   - `/Users/sasha/Desktop/wafia - website/wafia-questionnaire-brands/platform/package 5.json`
2. Description:
   Les configs elles-mêmes sont copiées-collées.
3. Impact:
   Confusion forte sur la bonne version des conventions projet.
4. Fix recommandé:
   Garder un seul exemplaire par config et documenter les variables d'environnement par sous-app.

Note: les lock files sont bien présents et la version Node est bien spécifiée au root (`/Users/sasha/Desktop/wafia - website/package.json:5-8`).

---

## 9. Base de données & API

### 🟠 IMPORTANT — `Questionnaire` et plusieurs routes restent globales au lieu d'être scoppées tenant

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/prisma/schema.prisma:234-246`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/current/route.ts:11-27`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/submit/route.ts:55-62`
2. Description:
   Le modèle `Questionnaire` n'embarque pas de `tenantId`, et les handlers récupèrent "le questionnaire actif le plus récent" globalement.
3. Impact:
   Fort risque de servir le mauvais questionnaire si la plateforme devient réellement multi-tenant.
4. Fix recommandé:
   Introduire `tenantId` dans `Questionnaire` ou une stratégie explicite de partitionnement.

### 🟠 IMPORTANT — Validation d'entrée inconstante selon les endpoints

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/app/api/contact/route.ts:76-79`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/submit/route.ts:25-28`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/dashboard/leads/route.ts:53-61`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/current/route.ts:73-80`
2. Description:
   Certaines routes passent par Zod/`validateBody`, d'autres parsèment un `request.json()` puis des checks manuels.
3. Impact:
   Contrats API hétérogènes, validation incomplète, surface de bug plus large.
4. Fix recommandé:
   Uniformiser sur des schémas Zod par endpoint.

### 🟠 IMPORTANT — Contrat de réponse API incohérent

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/app/api/contact/route.ts:102`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/submit/route.ts:100`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/dashboard/leads/route.ts:36`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/dashboard/leads/route.ts:100`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/health/route.ts:45-50`
2. Description:
   On trouve selon les routes `{ ok: true }`, `{ success: true }`, `{ success: true, data }`, ou des structures métier ad hoc.
3. Impact:
   Front plus fragile, documentation implicite, erreurs plus coûteuses à standardiser.
4. Fix recommandé:
   Définir un contrat commun `ApiSuccess<T>` / `ApiError`.

### 🟠 IMPORTANT — Opération de purge non transactionnelle

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/health/route.ts:63-87`
2. Description:
   La purge supprime d'abord les réponses, puis les talents archivés, hors transaction, avec un commentaire "simplified: just delete them".
3. Impact:
   Etat partiellement supprimé possible en cas d'échec au milieu.
4. Fix recommandé:
   Mettre l'ensemble dans une transaction et revoir le critère de suppression.

Note: les migrations Prisma existent bien. Le problème BDD n'est pas l'absence de migration, mais la cohérence multi-tenant et la qualité contractuelle des APIs.

---

## 10. Production readiness

### 🟠 IMPORTANT — Pas de logging structuré

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/src/app/api/contact/route.ts:95`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/questionnaires/submit/route.ts:103`
   - `/Users/sasha/Desktop/wafia - website/src/app/api/v1/dashboard/leads/route.ts:106`
2. Description:
   Le run-time repose encore sur `console.error` / `console.warn`.
3. Impact:
   Exploitabilité prod faible, corrélation d'incidents difficile.
4. Fix recommandé:
   Introduire un logger structuré avec niveau, contexte et corrélation de requête.

### 🟠 IMPORTANT — Aucun monitoring applicatif observable

1. Fichiers concernés:
   - repo entier
2. Description:
   Aucune intégration Sentry, LogRocket, Honeycomb, OpenTelemetry ou équivalent n'a été détectée.
3. Impact:
   Les erreurs prod seront vues tard, souvent via utilisateur final.
4. Fix recommandé:
   Instrumenter au minimum erreurs front, erreurs API et health checks de service.

### 🟡 MINEUR — Pas de feature flags détectés

1. Fichiers concernés:
   - repo entier
2. Description:
   Aucun système de rollout progressif ou de gating de fonctionnalités n'est visible.
3. Impact:
   Déploiements plus risqués, pas de kill-switch propre.
4. Fix recommandé:
   Ajouter un mécanisme minimal de flags pour les features sensibles et les fallbacks.

### ⚪ SUGGESTION — HTTPS et headers proxy sont mieux gérés que le reste

1. Fichiers concernés:
   - `/Users/sasha/Desktop/wafia - website/Caddyfile:9-33`
   - `/Users/sasha/Desktop/wafia - website/next.config.ts:5-56`
2. Description:
   Le forcing HTTPS et plusieurs headers de sécurité sont déjà présents.
3. Impact:
   Bon socle infra, mais il ne compense pas les défauts applicatifs listés plus haut.
4. Fix recommandé:
   Conserver cette base et concentrer l'effort sur l'applicatif.

---

## Score global

**52 / 100**

### Pourquoi 52

- `+` coeur Next.js principal relativement propre, build OK, tests OK, SEO de base bien géré
- `-` dette structurelle massive et visible
- `-` sous-projets cassés alors que la CI centrale reste verte
- `-` isolation multi-tenant insuffisante, qui est un vrai risque de prod
- `-` dépendances vulnérables non patchées

---

## Top 5 des actions prioritaires

1. **Bloquer immédiatement toute mise en prod multi-tenant** tant que le `tenantId` n'est pas propagé dans la session et dans toutes les requêtes Prisma dashboard/API.
2. **Nettoyer le repo des duplications IA** (` 2`, ` 3`, ` 4`, ` 5`) et rétablir une source de vérité unique par fichier.
3. **Réparer la CI pour qu'elle teste réellement toutes les apps**: root, `wiki`, `wafia-questionnaire-brands`, `platform`.
4. **Mettre à jour les dépendances vulnérables** au minimum `next`, `prisma` et `dompurify`.
5. **Retirer les fallbacks dangereux et logs bruts**: `admin/admin`, fallback questionnaire silencieux, `console.*` en prod.

---

## Estimation du temps de nettoyage

- **Nettoyage structurel minimal pour rendre le repo crédible**: 12 à 18 heures
- **Mise à niveau sécurité/qualité avant pré-prod sérieuse**: 20 à 30 heures
- **Remise au propre complète monorepo + pipelines + docs**: 35 à 50 heures

### Découpage réaliste

- purge des duplicats et artefacts: 6 à 10 h
- réparation des builds/lints sous-projets: 6 à 10 h
- refonte multi-tenant/auth/repositories: 8 à 14 h
- CI/tests/coverage/doc: 8 à 16 h
