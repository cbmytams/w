# Wiki de l'Influence (Vite + React)

Sous-projet wiki éditorial embarqué dans le monorepo Wafia.

## Prérequis

- Node.js 20+
- npm 10+

## Lancer en local

```bash
npm ci
npm run dev
```

Serveur local: `http://localhost:3000`

## Vérifications

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Build production

Le build génère les pages statiques + assets dans `dist/` et lance le post-traitement SEO:

```bash
npm run build
```

Script SEO exécuté automatiquement: `scripts/postbuild-seo.mjs`
