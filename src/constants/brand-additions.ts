// Ajouts commerciaux pour /for-brands

export const BRAND_NAVIGATION = [
    { href: "#dashboard", label: "Dashboard" },
    { href: "#deliverables", label: "Livrables" },
    { href: "#process", label: "Process" },
    { href: "#faq", label: "FAQ" }
] as const;

export const BRAND_HERO_CONTENT = {
    badge: "Creative Studio & Talent Powerhouse",
    title: {
        line1: "L'influence marketing",
        highlight: "qui performe vraiment."
    },
    subtitle: "Wafia combine créateurs vérifiés, production premium et pilotage data pour des campagnes mesurables. Zéro improvisation.",
    antiMarket: [
        { type: "check", text: "Pas de casting au hasard : sélection cohérente, justifiée, traçable." },
        { type: "check", text: "Pas de contenu générique : co-création + prod premium, social-first." },
        { type: "check", text: "Pas d’opacité : pilotage, feedbacks, reporting clair et actionnable." }
    ],
    stats: [
        { value: "15+", label: "Marques accompagnées", color: "orange" },
        { value: "200+", label: "Contenus produits", color: "blue" },
        { value: "€2M+", label: "Valeur générée", color: "green" }
    ],
    cta: {
        primary: { text: "Voir nos réalisations", href: "/cases" },
        secondary: { text: "Parler à un expert", href: "/contact?type=brand" }
    },
    timing: "⏱️ 4–6 semaines pour une campagne complète."
} as const;

// (A) Casting validation client
export const CASTING_VALIDATION = {
    id: "casting-validation",
    title: "Casting validé. Ensemble.",
    highlightWord: "validé",
    subtitle: "On recommande. Vous validez. On tranche ensemble.",
    bullets: [
        "Shortlist documentée (critères clairs).",
        "Allers-retours rapides pour alignement.",
        "Validation finale = côté marque."
    ]
} as const;

// (B) Timing flexibility
export const TIMING_HERO = {
    text: "⏱️ 4–6 semaines recommandé. Last minute possible."
} as const;

export const TIMING_STEP = {
    title: "Timing",
    text: "Idéal : 4–6 semaines. Urgence ? On sait sortir vite."
} as const;

// (C) Authenticité
export const AUTHENTICITY = {
    id: "authenticity",
    title: "Authentique. Sinon inutile.",
    highlightWord: "Authentique",
    subtitle: "On choisit des créateurs qui matchent vraiment votre marque.",
    bullets: [
        "Audience fit (pas juste des stats).",
        "Valeurs + tonalité alignées.",
        "Co-création : contenu naturel, pas plaqué."
    ]
} as const;

// (D) KPIs dashboard feature
export const KPIS_FEATURE = {
    title: "KPIs utiles",
    description: "Rétention, complétion, saves, shares/DM, trafic, conversions. Selon l'objectif."
} as const;

// (E) Sourcing problem
export const SOURCING_PROBLEM = {
    title: "Sourcing = chronophage",
    highlightWord: "Sourcing",
    lines: [
        "Trouver, contacter, relancer, négocier.",
        "On le fait pour vous avec une shortlist cohérente."
    ]
} as const;

// (F) First campaign support
export const FIRST_CAMPAIGN_STEP = {
    text: "Première campagne ? On vous guide de A à Z."
} as const;

export const FIRST_CAMPAIGN_FAQ = {
    question: "Je n'ai jamais lancé de campagne, vous m'aidez ?",
    answer: "Oui. On vous guide pas à pas : stratégie, casting, prod, diffusion, pilotage et analyse. Vous suivez, on exécute."
} as const;

export const AUTHENTICITY_CARDS = [
    {
        id: "01",
        title: "L'audience qui match",
        description: "On cible les créateurs dont l'audience",
        highlight: "EST",
        suffix: "vos clients.",
        color: "text-pink-400", // Tailwind class for easy usage
        gradient: "bg-pink-500/20",
        hover: "group-hover:bg-pink-500/30",
        delay: 0
    },
    {
        id: "02",
        title: "Le ton qui sonne vrai",
        description: "Des créateurs qui",
        highlight: "CROIENT",
        suffix: "en votre produit.",
        color: "text-purple-400",
        gradient: "bg-purple-500/20",
        hover: "group-hover:bg-purple-500/30",
        delay: 0.1
    },
    {
        id: "03",
        title: "Du contenu authentique",
        description: "On co-crée avec eux, pas de script robotique.",
        highlight: "",
        suffix: "",
        color: "",
        gradient: "bg-indigo-500/20",
        hover: "group-hover:bg-indigo-500/30",
        delay: 0.2
    }
] as const;
