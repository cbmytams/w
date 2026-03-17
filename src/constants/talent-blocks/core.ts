export const TALENT_HERO = {
    badge: "Pour ceux qui veulent une vraie structure",
    title: "Passe de créateur",
    titleHighlight: "à structure.",
    subtitle: "On construit le système autour de toi : image, contenu, deals, ops. Objectif : autonomie.",
    ctaPrimary: "Se référencer",
    ctaSecondary: "Voir le process",
    callsAvailable: 2,
    proofPoints: [
        { label: "Positionnement & image", value: "Identité" },
        { label: "Studio & pipeline", value: "Production" },
        { label: "Business & protection", value: "Deals" }
    ]
} as const;

export const TALENT_PROBLEM = {
    id: "problem",
    title: "Le talent démarre tout. Le système décide de la suite.",
    description: "Chaque année, des milliers de nouveaux talents émergent sur les réseaux, mais très peu arrivent à vraiment s'imposer dans la durée. Ce qui fait la différence, c'est d'avoir une image forte, authentique et réfléchie.",
    painTags: ["Pas de direction claire", "Pas de pipeline", "Devis/prix au hasard", "Deals pas alignés"],
    conclusion: "On ne te 'signe' pas pour t'ajouter à une liste. On te construit une structure."
} as const;

export const TALENT_CTA = {
    title: "Prêt à passer un cap ?",
    description: "Référence-toi pour être présenté à nos clients. Si ton profil match, on revient vers toi.",
    ctaText: "S'inscrire au répertoire"
} as const;

export const TALENT_FOR_WHO = {
    id: "who",
    title: "Pour qui ?",
    forYou: {
        title: "C'est fait pour toi si :",
        items: [
            "Tu as déjà une audience engagée et une production régulière.",
            "Tu as l'ambition d'une vraie carrière de créateur, pas juste des 'collabs'.",
            "Tu cherches une infrastructure solide : légal, admin, stratégie, production.",
            "Tu veux accéder à des deals premiums et protéger ta valeur."
        ]
    },
    notForYou: {
        title: "Pas pour toi si :",
        items: [
            "Ton audience est encore en pleine phase de lancement.",
            "Tu cherches uniquement de la mise en relation ponctuelle.",
            "La stratégie d'image et la direction artistique ne sont pas tes priorités.",
            "L'idée de process et de délégation (admin, legal) te correspond moins."
        ]
    }
} as const;

export const BRAND_GRADIENT = "from-pink-500 to-pink-600";

export const TALENT_BUSINESS = {
    label: "Business & Revenus",
    title: "Transforme ton contenu",
    titleLine2: "en business.",
    description: "On structure ton activité pour que chaque contenu génère de la valeur. Rate card, négociation, facturation, protection juridique — tout est cadré.",
    quote: "Un talent sans business model, c'est un hobby. On en fait un métier.",
    steps: [
        "Audit de ta monétisation actuelle",
        "Création de ta rate card personnalisée",
        "Mise en place du process deals & négociation",
        "Protection juridique et contractuelle"
    ],
    conclusion: "De l'audience à la structure. Du contenu au revenu. Valider."
} as const;

export const TALENT_IDENTITY = {
    label: "Identité & Image",
    title: "Construis une image",
    titleLine2: "qui te ressemble.",
    subtitle: "Ton identité, c'est ta fondation.",
    description: "On travaille ton positionnement, ton univers visuel et ta ligne éditoriale pour que chaque contenu soit aligné avec qui tu es vraiment.",
    quote: "L'image la plus forte est celle qui ne force rien.",
    services: [
        { title: "Positionnement", description: "Définition de ta niche, de ton ton et de ta direction artistique." },
        { title: "Identité visuelle", description: "Palette, typographie, templates et guidelines cohérentes." },
        { title: "Ligne éditoriale", description: "Stratégie de contenu alignée avec ton audience cible." },
        { title: "Branding personnel", description: "Construction d'une marque authentique et mémorable." }
    ]
} as const;

