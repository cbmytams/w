# WAFIA BDD Talents (Next.js)

Structure de base pour la plateforme BDD Talents : back-office, onboarding talents, sync stats et exports.

## Démarrage rapide

```bash
cd platform
npm install
cp .env.example .env
npm run db:push
npm run dev
```

## Scripts utiles

- `npm run dev` : serveur local
- `npm run db:push` : applique le schéma Prisma sans migration
- `npm run db:migrate` : crée une migration Prisma
- `npm run db:studio` : UI Prisma Studio
- `npm run db:seed` : seed tenant + catégories + tags

## Structure

- `src/app` : routes App Router
- `src/components` : layout & UI
- `src/lib` : DB, RBAC, helpers
- `prisma/schema.prisma` : modèle de données

## Variables d’environnement

Voir `platform/.env.example`.
