# Assets non versionnés: stratégie de provisioning

## Contexte

Plusieurs assets sont référencés par le code, mais non versionnés dans Git:

- `src/constants/studio.ts`
  - `/studio/krh/1 - KRH.MP4` (samples KRH)
  - `/studio/krh/2 - KRH.MP4`
  - `/studio/krh/3 - KRH.MP4`
  - `/studio/krh/noah-basic-fit-vf.mp4` (showcase Basic Fit — produits par KRH)
  - `/studio/krh/basic-fit-redha-vf.mp4`
  - `/studio/krh/ana-basic-fit-vf.mp4`
  - `/studio/krh/shayna-basic-fit-vf.mp4`
- `src/app/cases/page.tsx`
  - `/cases/fashion-ugc.png`
  - `/cases/tech-launch.png`
  - `/cases/gaming-app.png`

## Stratégie retenue

Le repository reste léger: les médias lourds ne sont pas versionnés.

- On garde les dossiers publics avec `.gitkeep`:
  - `public/studio/krh/.gitkeep`
  - `public/cases/.gitkeep`
- Les médias sont provisionnés hors Git (stockage interne/CDN/sync local).
- Les patterns d'ignore sont explicites dans `.gitignore`.

## Provisioning local (dev)

Déposer les fichiers fournis par l'équipe dans:

- `public/studio/krh/`
- `public/cases/`

Si ces fichiers manquent, les pages concernées afficheront des médias absents (404).

## Option alternative

Si vous voulez rendre le build 100% reproductible sans provisioning local, remplacer les chemins `/public/*` ci-dessus par des URLs CDN explicites.
