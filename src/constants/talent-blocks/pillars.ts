/**
 * WhatWeBuild Section — 6 pillars (merged from 9 deliverables)
 *
 * Each pillar: one clear scope, one line of value.
 * No drawers, no detail panels.
 */

export interface TalentPillar {
    id: string
    icon: string
    title: string
    description: string
}

export const TALENT_PILLARS: TalentPillar[] = [
    {
        id: "positioning",
        icon: "🎯",
        title: "Positionnement & image",
        description: "On clarifie ce que tu représentes, ton univers visuel et ta ligne éditoriale. Une identité lisible qui attire les bons deals."
    },
    {
        id: "production",
        icon: "⚡",
        title: "Production & formats",
        description: "Séries récurrentes, workflow optimisé, backlog d'idées. De 8h par vidéo à une routine qui tourne."
    },
    {
        id: "deals",
        icon: "🤝",
        title: "Deals & négociation",
        description: "Filtrage entrant, négociation, closing, suivi. Chaque deal est aligné avec ton positionnement et protégé contractuellement."
    },
    {
        id: "legal-ops",
        icon: "📋",
        title: "Admin & juridique",
        description: "Facturation, relances, contrats, pricing. Tout ce qui se passe en coulisses, géré pour toi."
    },
    {
        id: "kpis",
        icon: "📊",
        title: "Pilotage & KPIs",
        description: "5 indicateurs max, revue hebdo, décisions claires. Pas de vanity metrics — des signaux actionnables."
    },
    {
        id: "autonomy",
        icon: "🏗️",
        title: "Équipe & autonomie",
        description: "Recrutement, process, formation. L'objectif : que tu n'aies plus besoin de nous."
    }
]

export const WHAT_WE_BUILD_HEADER = {
    id: "what-we-build",
    problemTitle: "Ce qui manque à la plupart des talents n'est pas le potentiel.",
    problemHighlight: "C'est la structure.",
    problemDescription: "Chaque année, des milliers de créateurs émergent. Très peu restent. Ce qui fait la différence : une direction claire, une production régulière, et quelqu'un qui gère ce qui se passe en coulisses.",
    painTags: ["Direction floue", "Production instable", "Deals mal négociés", "Partenariats hors-sujet"],
    sectionTitle: "Ce qu'on prend en charge",
} as const
