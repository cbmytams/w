# CLAUDE.md — Wafia website

Site marketing + dashboard admin + questionnaires (talents & brands).
Production : https://wafia.fr — déployé sur VPS OVH (`ssh wafia`).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript strict**
- **Tailwind CSS 4** (PostCSS) + `tailwind-merge` + `cva`
- **Prisma 6** sur **PostgreSQL** (multi-tenant, slug-based)
- **NextAuth 4** (credentials provider, RBAC : viewer / manager / admin)
- **Sentry** (`@sentry/nextjs`) + Upstash Redis (rate-limit)
- **Framer Motion**, `tsparticles` (animations marketing)
- **Docker** multi-stage (`node:22-alpine`) + **Caddy** sur le VPS
- Deux SPAs **Vite** statiques embarquées dans `public/questionnaire/`
  (talents) et `public/questionnaire-brands/` (brands)

## Architecture

```
src/
├── app/                      # Routes Next.js App Router
│   ├── page.tsx              # Landing
│   ├── for-talents/, for-brands/, services/, contact/, equipe/, legal/, studio/, wiki/
│   ├── questionnaire/        # Routes Next côté admin (les SPAs Vite sont dans public/)
│   ├── platform/             # Pages dashboard (RBAC viewer+)
│   ├── admin/                # Login admin (admin/login non protégé)
│   └── api/
│       ├── contact/          # POST public — same-origin + rate-limit + webhook forward
│       └── v1/[...path]/     # Proxy interne (Bearer token timing-safe vers la plateforme)
├── lib/
│   ├── proxy → ../proxy.ts   # Middleware CSP (nonce + strict-dynamic)
│   ├── auth*.ts, rbac.ts     # NextAuth + rôles (viewer < manager < admin)
│   ├── requestSecurity.ts    # enforceSameOrigin (allowlist via ALLOWED_ORIGINS)
│   ├── rate-limit*.ts        # Upstash limiter (kind: "auth" | "public")
│   ├── env.server.ts         # Schéma typed pour les env vars côté server
│   ├── structured-data.ts    # JSON-LD + serializeJsonLd anti-XSS
│   ├── questionnaire*.ts     # Schéma in-memory du questionnaire (~26 KB)
│   └── wiki.ts, authors.ts, site.ts
├── components/               # UI (cva-based, Tailwind)
└── proxy.ts                  # Middleware Edge — CSP / HSTS / X-Frame / RBAC gate
public/
├── questionnaire/            # SPA Vite "talents" buildée (assets + index.html)
└── questionnaire-brands/     # SPA Vite "brands" buildée
prisma/
└── schema.prisma             # Modèles multi-tenant
```

## Routes critiques

| Route                                                                     | Auth                        | Notes                                                            |
| ------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------- |
| `/`, `/for-talents`, `/for-brands`, `/services`, `/equipe/*`, `/wiki/*`   | publique                    | SSR + JSON-LD                                                    |
| `/contact` + `POST /api/contact`                                          | publique                    | same-origin + Upstash rate-limit + forward `CONTACT_WEBHOOK_URL` |
| `/admin/login`                                                            | publique                    | NextAuth credentials                                             |
| `/admin/*`, `/platform/*`                                                 | RBAC viewer+                | gate dans `src/proxy.ts`                                         |
| `/api/v1/admin/*`, `/api/v1/dashboard/*`, `/api/v1/questionnaires/*`      | RBAC viewer+                | sauf `current` / `submit` qui restent publiques                  |
| `/api/v1/[...path]`                                                       | Bearer `INTERNAL_JOB_TOKEN` | comparaison **timing-safe** (`crypto.timingSafeEqual`)           |
| `/questionnaire/*`, `/questionnaire-brands/*`, `/questionnaire-talents/*` | publique                    | SPAs Vite — CSP statique séparée + `X-Frame-Options: SAMEORIGIN` |

## Sécurité

- **CSP** : nonce + `strict-dynamic` pour `script-src`. `style-src` garde
  `'unsafe-inline'` en fallback (Next/Tailwind émettent encore des inline `<style>`) —
  les navigateurs modernes l'ignorent quand un nonce est présent. À retirer une fois
  toutes les inline styles nonce-tagged.
- **HSTS** : `max-age=31536000; includeSubDomains; preload`
- **Same-origin** : toutes les routes `POST` publiques passent par `enforceSameOrigin`
  (allowlist via `ALLOWED_ORIGINS`).
- **Rate-limit** : Upstash Redis (`kind: "auth"` pour endpoints sensibles).
- **JSON-LD** : `serializeJsonLd()` échappe `<` pour éviter `</script>` injection.
- **Tokens internes** : comparaison `timingSafeEqual`.
- **Mots de passe admin** : bcrypt (cost=12) — env `ADMIN_PASSWORD_HASH` /
  `MANAGER_PASSWORD_HASH` / `VIEWER_PASSWORD_HASH`. Générer avec
  `node scripts/hash-password.mjs '<plaintext>'`. Les vars legacy
  `*_PASSWORD` (plaintext) restent acceptées en fallback pendant la migration.

## Build & deploy

### Local

```bash
bun run dev                  # Next dev sur :3000
bun run lint && bun run type-check
bun run build                # Build prod (sans standalone)
bun run build:standalone     # Build + prepare-standalone (artefacts pour Docker)
bun run test                 # Jest
```

### Production VPS (OVH)

```bash
ssh wafia
cd /srv/wafia-website
git pull
docker compose up -d --build
```

Le `Dockerfile` utilise `npm install --no-audit --no-fund --ignore-scripts` (et **pas**
`npm ci`) à cause d'un drift de version npm entre Mac et Alpine (lockfile non strictement
identique). Image de base : `node:22-alpine`.

Caddy fait le TLS + reverse proxy → container Next standalone sur :3000.

## Dépendances externes

- **Postgres** : `DATABASE_URL` (Prisma)
- **Upstash Redis** : `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
- **Sentry** : `NEXT_PUBLIC_SENTRY_DSN` + `SENTRY_AUTH_TOKEN` (build)
- **Webhook contact** : `CONTACT_WEBHOOK_URL` (+ `CONTACT_INTAKE_TOKEN`)
- **Resend** (email) : `RESEND_API_KEY`

Variables complètes documentées dans `.env.example`.

## Pour naviguer le code rapidement (IA / nouveaux contributeurs)

- **Auth & rôles** : `src/lib/rbac.ts`, `src/lib/authOptions.ts`, `src/proxy.ts`
- **Sécurité requêtes** : `src/lib/requestSecurity.ts`, `src/lib/rate-limit-middleware.ts`
- **Schéma questionnaire** : `src/lib/questionnaireData.ts` (gros fichier, source de vérité)
- **JSON-LD / SEO** : `src/lib/structured-data.ts`
- **Env vars typés** : `src/lib/env.server.ts`
- **Middleware CSP** : `src/proxy.ts` (la branche `isQuestionnaireStaticPath` gère les SPAs Vite)

Le projet a un **knowledge graph code-review-graph** (voir `~/CLAUDE.md`) — utiliser
`semantic_search_nodes` / `query_graph` / `get_impact_radius` avant Grep/Read.

## Audits

`docs/audits/` contient les audits historiques (sécurité, design, lisibilité IA).
Le rapport `docs/knip-report.txt` liste les exports non utilisés (à trier manuellement —
beaucoup de faux positifs sur Tailwind 4 / Next 16).
