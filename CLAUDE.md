# CLAUDE.md — Wafia website

Site marketing Wafia. Production : https://wafia.fr — VPS OVH (`ssh wafia`), Docker + Caddy.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript strict**
- **Tailwind CSS 4** (PostCSS) + `tailwind-merge` + `cva`
- **framer-motion** pour toutes les animations
- **Jest** (ts-jest) pour les tests — `src/__tests__`
- **Sentry** + **Upstash** (rate-limit `/api/contact`)
- Pas de base de données, pas d'auth, pas de back-office — site vitrine + wiki + formulaires de contact

## Pages

`/` (home orbes) · `/for-brands` · `/for-talents` · `/services` · `/studio` · `/wiki/*` · `/legal/*` · `/contact` + `/contact/brands` + `/contact/talents`

## Architecture clé

- **Orbes persistants** : `OrbTransitionProvider` + `BackgroundFlow` + `GlobalBackground` — champ d'orbes unique qui morphe entre variantes (home/brands/talents) à la navigation
- **Transitions de route** : `PageTransition` (racine) + `lib/route-motion` — timings par cluster × device
- **Moteur d'arrière-plan** : `lib/background-flow` (variantes, profils runtime, reduced-motion, mobile-lite)
- **Middleware** : `src/proxy.ts` — CSP par nonce + headers de sécurité uniquement
- **Wiki** : contenu source dans `wiki/src/content/blog`, lu au build par `src/lib/wiki.ts`
- **Contact** : formulaires factices (succès local) ; `/api/contact` prêt pour un webhook (`CONTACT_WEBHOOK_URL`)

## Règles impératives

1. **CSP stricte** : nonce uniquement, pas d'`'unsafe-inline'` pour les scripts → jamais de `style={{}}` brut ; utiliser framer-motion `initial`/`animate`
2. **`prefers-reduced-motion`** respecté partout — tester chaque animation
3. **Mobile** : hovers dans `@media (hover: hover)` ; flèche visible sur `pointer: coarse`
4. **Tests** : `npm test` doit rester vert ; les suites vivent dans `src/__tests__`
5. **Vérifs avant commit** : `npm run lint && npm run type-check && npm test`

## Déploiement (VPS)

```bash
ssh wafia
cd /var/www/wafia-site && git pull origin main
docker build -t wafia-site:latest .
cd /opt/wafia-site && docker compose up -d
curl -sI https://wafia.fr/   # vérif 200
```

Rollback : `docker tag wafia-site:backup-20260828-171916 wafia-site:latest && cd /opt/wafia-site && docker compose up -d`
