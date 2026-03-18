export const TALENT_HERO = {
    badge: "Pour les créateurs qui visent juste",
    title: "Votre talent.",
    titleHighlight: "Notre infrastructure.",
    subtitle: "On construit l'architecture autour de vous : image, production, deals, admin. L'objectif : une carrière qui tient.",
    ctaPrimary: "Rejoindre le roster",
    ctaSecondary: "Notre approche",
    callsAvailable: 2,
    proofPoints: [
        { label: "Positionnement & image", value: "Identité" },
        { label: "Studio & pipeline", value: "Production" },
        { label: "Business & protection", value: "Deals" }
    ]
} as const;

export const TALENT_PROBLEM = {
    id: "problem",
    title: "Le talent crée. La structure décide de la suite.",
    description: "Chaque année, des milliers de créateurs émergent. Très peu restent. Ce qui fait la différence : une direction claire, une production régulière, et quelqu'un qui gère ce qui se passe en coulisses.",
    painTags: ["Direction floue", "Production instable", "Deals mal négociés", "Partenariats hors-sujet"],
    conclusion: "On ne vous ajoute pas à une liste. On construit quelque chose autour de vous."
} as const;

export const TALENT_CTA = {
    title: "Prêt à passer un cap ?",
    description: "Soumettez votre profil. Si ça matche avec nos exigences, on revient vers vous.",
    ctaText: "Se référencer"
} as const;

export const TALENT_FOR_WHO = {
    id: "who",
    title: "Pour qui ?",
    forYou: {
        title: "C'est fait pour vous si :",
        items: [
            "Vous avez déjà une audience engagée et une production régulière.",
            "Vous voulez une carrière construite, pas seulement des opportunités isolées.",
            "Vous cherchez une structure solide : legal, admin, stratégie, production.",
            "Vous voulez des deals qui ont du sens et protègent votre valeur."
        ]
    },
    notForYou: {
        title: "Pas pour vous si :",
        items: [
            "Votre audience est encore en phase de démarrage.",
            "Vous cherchez uniquement de la mise en relation ponctuelle.",
            "La stratégie d'image et la direction créative ne sont pas vos priorités.",
            "L'idée de process et de délégation ne vous correspond pas."
        ]
    }
} as const;

export const BRAND_GRADIENT = "from-pink-500 to-pink-600";

export const TALENT_BUSINESS = {
    label: "Business & Revenus",
    title: "Faites de votre audience",
    titleLine2: "un revenu stable.",
    description: "On structure votre activité pour que chaque contenu compte financièrement. Grille tarifaire, négociation, facturation, protection juridique. Tout est cadmé.",
    quote: "Un créateur sans modèle économique, c'est un passionné. Avec une structure, c'est une entreprise.",
    steps: [
        "Audit de la monétisation actuelle",
        "Création d'une grille tarifaire sur mesure",
        "Mise en place des process de négociation",
        "Sécurisation juridique des partenariats"
    ],
    conclusion: "De l'audience à un revenu pérenne."
} as const;

export const TALENT_IDENTITY = {
    label: "Identité & Image",
    title: "Construisez une image",
    titleLine2: "qu'on ne peut pas ignorer.",
    subtitle: "Votre identité est votre actif le plus durable.",
    description: "On travaille votre positionnement, votre univers visuel et votre ligne éditoriale. Un tout cohérent, reconnaissable, qui attire les bons partenaires.",
    quote: "L'image la plus forte est celle qui ne force rien.",
    services: [
        { title: "Positionnement", description: "Définition de votre niche, de votre ton et de votre direction artistique." },
        { title: "Identité visuelle", description: "Palette, typographie, templates et charte graphique cohérente." },
        { title: "Ligne éditoriale", description: "Stratégie de contenu alignée avec votre audience cible." },
        { title: "Personal Branding", description: "Une marque propre à vous. Singulière et mémorable." }
    ]
} as const;

