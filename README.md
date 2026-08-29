# Wafia website

Site marketing Wafia — https://wafia.fr.
Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · framer-motion.

## Quick start

```bash
cp .env.example .env.local   # renseigner au besoin (GA, Sentry, webhook contact…)
npm install
npm run dev                  # http://localhost:3000
```

## Scripts

| Commande              |                     |
| --------------------- | ------------------- |
| `npm run dev`         | Serveur dev Next    |
| `npm run build`       | Build de production |
| `npm run start`       | Serve le build      |
| `npm run lint`        | ESLint              |
| `npm run type-check`  | `tsc --noEmit`      |
| `npm test`            | Jest                |
| `npm run wiki:verify` | Vérifs SEO du wiki  |

## Structure

- `src/app` — pages (home orbes, for-brands, for-talents, services, studio, wiki, legal, contact)
- `src/components` — composants (orbes, navs, sections, UI kit)
- `src/lib` — utilitaires (moteur d'arrière-plan, animations de route, validation, sécurité)
- `wiki/src/content/blog` — source de contenu du wiki (lue au build par `src/lib/wiki.ts`)
- `public/` — assets statiques (médias studio non versionnés : voir `.gitignore`)

## Formulaires de contact

`/contact/brands` et `/contact/talents` — design du site, au-dessus des orbes.
Les soumissions sont simulées (succès local) ; le branchement de `/api/contact`
(webhook `CONTACT_WEBHOOK_URL`) se fait côté serveur sans changement front.

## Déploiement

VPS OVH (`ssh wafia`) — Docker (`wafia-site:latest`, port 3004, Caddy en front).

```bash
# sur le VPS
cd /var/www/wafia-site && git pull origin main
docker build -t wafia-site:latest .
cd /opt/wafia-site && docker compose up -d
```

## Conventions

- CSP par nonce (pas d'inline) — animations via framer-motion `initial`/`animate`, jamais de styles inline bruts
- `prefers-reduced-motion` respecté partout (orbes, transitions, carrousels)
- Hovers tactiles protégés (`@media (hover: hover)`, `pointer: coarse`)
