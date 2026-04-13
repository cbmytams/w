# Wafia Diagnostic Marques (Vite + React)

Application questionnaire/diagnostic marques intégrée au site principal Wafia.

## Prérequis

- Node.js 20+
- npm 10+

## Démarrage local

```bash
npm ci
npm run dev
```

## Qualité

```bash
npm run lint
npm run type-check
npm test
npm run build
```

## Variables d'environnement

Voir `.env.example`:

- `VITE_ALLOW_LOCAL_QUESTION_FALLBACK`
- `VITE_ALLOW_LOCAL_ADMIN_FALLBACK`
- `VITE_ERROR_REPORTING_URL`
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (optionnel, persistance)

Si Supabase n'est pas configuré, l'application fonctionne en mode sans persistance distante.
