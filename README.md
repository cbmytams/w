# Wafia Website

Site principal Wafia basé sur Next.js (App Router), TypeScript et Tailwind CSS.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript strict
- Tailwind CSS 4
- Framer Motion
- Node.js (API route contact)

## Démarrage rapide

### Prérequis

- Node.js 20+
- npm 10+

### Installation

```bash
npm ci
```

### Développement

```bash
npm run dev
```

Application: `http://localhost:3000`

### Qualité / vérification

```bash
npm run lint
npm run type-check
```

### Build production

```bash
npm run build
npm run start
```

## Déploiement

### Docker

Le projet contient un [Dockerfile](Dockerfile) multi-stage avec sortie Next standalone.

```bash
docker build -t wafia-website .
docker run --rm -p 3000:3000 wafia-website
```

### Reverse proxy (Caddy)

Le [Caddyfile](Caddyfile) configure:

- reverse proxy vers `127.0.0.1:3000`
- headers de sécurité
- cache agressif des assets statiques (`/_next/static`, `/questionnaire*`, `/logos`, etc.)

## Structure du repository

```text
.
├── src/                         # App Next.js (routes, composants, hooks, libs)
│   ├── app/                     # Routes App Router
│   ├── components/              # Composants UI et sections métiers
│   ├── constants/               # Données statiques de pages
│   ├── content/                 # Contenus MDX (blog)
│   └── lib/                     # Helpers, SEO, utilitaires
├── public/                      # Assets servis en statique
│   ├── questionnaire/           # Bundle statique questionnaire talents
│   ├── questionnaire-brands/    # Bundle statique questionnaire brands
│   └── wiki/                    # Bundle statique wiki
├── wiki/                        # Source Vite du wiki
├── wafia - questionnaire brands/# Source Vite du questionnaire brands (+ platform)
├── docs/                        # Documentation interne
├── next.config.ts               # Config Next (headers, rewrites, redirects)
├── tsconfig.json                # Config TypeScript
├── tailwind.config.ts           # Config Tailwind
└── eslint.config.mjs            # Config ESLint
```

## URLs des sous-projets

Servies par le site principal:

- Wiki: `/wiki` et `/wiki/index.html`
- Questionnaire talents: `/questionnaire/index.html`
- Questionnaire brands: `/questionnaire-brands/index.html`

Sources embarquées dans ce repo:

- Source wiki (Vite): [`wiki/`](wiki)
- Source questionnaire brands (Vite): [`wafia - questionnaire brands/`](wafia%20-%20questionnaire%20brands)

## Variables d'environnement

Voir [.env.example](.env.example). Principales variables utilisées:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `CONTACT_WEBHOOK_URL`
- `CONTACT_WEBHOOK_TOKEN`
