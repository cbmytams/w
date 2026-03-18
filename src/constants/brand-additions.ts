// Ajouts commerciaux pour /for-brands

export const BRAND_NAVIGATION = [
    { href: "#services", label: "Services" },
    { href: "#process", label: "Méthode" },
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
        { value: "100%", label: "Reporting transparent", color: "green" }
    ],
    cta: {
        primary: { text: "Voir nos réalisations", href: "#case-studies" },
        secondary: { text: "Cadrer ma campagne", href: "/questionnaire/brands" }
    },
    timing: "⏱️ 4–6 semaines pour une campagne complète."
} as const;


export const AUTHENTICITY_CARDS = [
    {
        id: "01",
        title: "Une audience qualifiée",
        description: "Nous sélectionnons les créateurs dont l'audience",
        highlight: "EST",
        suffix: "votre cible commerciale.",
        color: "text-pink-400", // Tailwind class for easy usage
        gradient: "bg-pink-500/20",
        hover: "group-hover:bg-pink-500/30",
        delay: 0
    },
    {
        id: "02",
        title: "Une affinité sincère",
        description: "Des profils qui",
        highlight: "ADHÈRENT",
        suffix: "réellement à votre vision.",
        color: "text-purple-400",
        gradient: "bg-purple-500/20",
        hover: "group-hover:bg-purple-500/30",
        delay: 0.1
    },
    {
        id: "03",
        title: "Des campagnes organiques",
        description: "Une co-création sur-mesure, loin des discours publicitaires formatés.",
        highlight: "",
        suffix: "",
        color: "",
        gradient: "bg-indigo-500/20",
        hover: "group-hover:bg-indigo-500/30",
        delay: 0.2
    }
] as const;
