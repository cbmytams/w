/**
 * WhatWeBuild Section — 6 pillars (merged from 9 deliverables)
 *
 * Each pillar: one clear scope, one line of value.
 * No drawers, no detail panels.
 */

export interface TalentPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const TALENT_PILLARS: TalentPillar[] = [
  {
    id: "positioning",
    icon: "🎯",
    title: "Positionnement & image",
    description:
      "Nous clarifions ce que vous représentez, ce que vous refusez et la manière dont votre image doit être perçue.",
  },
  {
    id: "production",
    icon: "⚡",
    title: "Projets & production",
    description:
      "Contenus, shootings, captations, prises de parole, formats récurrents ou projets artistiques : chaque support sert une trajectoire.",
  },
  {
    id: "deals",
    icon: "🤝",
    title: "Opportunités & négociation",
    description:
      "Nous filtrons, négocions et cadrons les partenariats, bookings et collaborations pour protéger votre valeur.",
  },
  {
    id: "legal-ops",
    icon: "📋",
    title: "Droits & cadre juridique",
    description:
      "Contrats, image, usages, territoires, facturation, relances : l'arrière-plan devient lisible et sécurisé.",
  },
  {
    id: "kpis",
    icon: "📊",
    title: "Revenus & pilotage",
    description:
      "Nous suivons ce qui compte : revenus, demandes entrantes, performance des formats, qualité des opportunités et progression réelle.",
  },
  {
    id: "autonomy",
    icon: "🏗️",
    title: "Équipe & autonomie",
    description:
      "Process, recrutement, transmission et montée en compétences. L'objectif : une carrière plus maîtrisée, pas une dépendance.",
  },
];

export const WHAT_WE_BUILD_HEADER = {
  id: "what-we-build",
  problemTitle:
    "Ce qui manque à la plupart des talents n'est pas le potentiel.",
  problemHighlight: "C'est la structure.",
  problemDescription:
    "Une image peut attirer l'attention. Une structure transforme cette attention en projets, revenus, droits protégés et décisions plus sûres.",
  painTags: [
    "Image floue",
    "Projet mal cadré",
    "Contrat fragile",
    "Opportunité hors-sujet",
  ],
  sectionTitle: "Ce que nous structurons",
} as const;
