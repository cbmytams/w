# CLAUDE.md — Wafia website

Site marketing Wafia. Production : https://wafia.fr — VPS OVH (`ssh wafia`), Docker + Caddy.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript strict**
- **Tailwind CSS 4** (PostCSS) + `tailwind-merge` + `cva`
- **framer-motion** pour toutes les animations
- **Jest** (ts-jest) pour les tests — `src/__tests__`
- **Sentry** + **Upstash** (rate-limit `/api/contact`)
- Pas de base de données, pas d'auth, pas de back-office — site vitrine + formulaires de contact

## Pages (prod = page unique)

Servies : `/` (page Marques) · `/contact` + `/contact/brands` + `/contact/talents` · `/legal/{mentions,privacy,cookies}`.
Tout le reste (`/for-brands`, `/for-talents`, `/services`, `/studio`, `/equipe`, `/wiki/*`) redirige vers `/` dans `next.config.ts` ; le code wiki/talents est conservé mais non servi. Ne pas rediriger `/studio/krh/*` (médias Basic-Fit).

## Architecture clé

- **Accueil** : `BrandHeroV2` (livre 3D Three.js, chargé en `dynamic` ssr:false) + sections `for-brands/*` (méthode, clients, cas, équipe, FAQ, CTA)
- **Transitions de route** : `PageTransition` (racine) + `lib/route-motion` ; navigation via `OrbLink` / `useOrbNavigate` (simple `router.push`, plus d'orbes)
- **Middleware** : `src/proxy.ts` — CSP par nonce + headers de sécurité uniquement
- **i18n** : `next-intl`, locales `fr` (défaut, sans préfixe), `en`, `es`, `zh` (`/en/...`, `/es/...`, `/zh/...` ; zh = chinois simplifié, balise `zh-Hans`) — config dans `src/i18n/`, catalogues `messages/<locale>/<namespace>.json` (mêmes clés dans toutes les langues, vérifié par `src/__tests__/i18n`). Pages sous `src/app/[locale]/`. Liens/navigation : toujours `Link`/`usePathname`/`useRouter` de `@/i18n/navigation`, jamais `next/link`. Pas de détection de langue ni de cookie : l'URL fait foi. Ajouter une langue = l'ajouter dans `src/i18n/config.ts` (+ `languageTag`) + un dossier `messages/<locale>/` + ses noms dans `nav.languages` de chaque langue. Dans les messages, les retours à la ligne s'écrivent `<br></br>` (jamais `<br/>`).
- **Contenu** : copy dans `messages/`, données non textuelles (ids, images, hrefs) dans `src/constants/*`
- **Contact** : `ContactForm` → `POST /api/contact` (rate-limit Upstash, webhook `CONTACT_WEBHOOK_URL`)

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
