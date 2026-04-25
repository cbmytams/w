# Wafia website

Site marketing + dashboard admin + questionnaires (talents & brands).
Production : https://wafia.fr.

## Quick start

```bash
cp .env.example .env.local      # Renseigner les vars (cf. CLAUDE.md)
bun install
bun run dev                     # http://localhost:3000
```

## Scripts

| Commande                   |                               |
| -------------------------- | ----------------------------- |
| `bun run dev`              | Next dev server               |
| `bun run lint`             | ESLint                        |
| `bun run type-check`       | `tsc --noEmit`                |
| `bun run test`             | Jest                          |
| `bun run build`            | Build production              |
| `bun run build:standalone` | Build + artefacts pour Docker |

## Deploy (VPS OVH)

```bash
ssh wafia
cd /srv/wafia-website
git pull && docker compose up -d --build
```

## Plus loin

- [`CLAUDE.md`](./CLAUDE.md) — guide complet du repo (stack, routes, sécurité, navigation)
- [`docs/architecture.md`](./docs/architecture.md) — diagramme d'architecture
- [`.env.example`](./.env.example) — toutes les variables d'environnement documentées
- [`docs/audits/`](./docs/audits/) — audits historiques
