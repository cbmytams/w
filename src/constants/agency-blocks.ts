// Nouveaux blocs pour /for-agencies

export const AGENCY_NAVIGATION = [
    { href: "#modes", label: "Modes" },
    { href: "#standards", label: "Standards" },
    { href: "#kit", label: "Kit" },
    { href: "#cases", label: "Cas" }
] as const;

export const AGENCY_HERO = {
    title: "Votre département",
    highlight: "influence",
    subtitle: "Wafia devient l'infrastructure de votre agence.",
    text: "En marque blanche ou co-branding.\nNous exécutons. Vous conservez la relation client.",
    cta: "Étudier une collaboration"
} as const;

export const AGENCY_PROBLEM = {
    title: "La réalité :",
    highlight: "l’influence est chronophage.",
    items: [
        "Sourcing interminable",
        "Coordination complexe",
        "Faible rentabilité sur l'exécution",
        "Délais clients contraignants",
        "Multiplication des prestataires (UGC, talents, prod)"
    ],
    conclusion: "Vous perdez un temps précieux. Vous sacrifiez vos marges."
} as const;

export const AGENCY_MODES = {
    id: "agency-modes",
    title: "Wafia =",
    highlight: "plug-and-play",
    subtitle: "Une intégration fluide pour accélérer votre croissance.",
    modes: [
        {
            title: "Roster & casting",
            desc: "Shortlist rapide, cohérente, brand-safe."
        },
        {
            title: "Studio à la demande",
            desc: "UGC volume, montage, déclinaisons, VFX si besoin."
        },
        {
            title: "Ops",
            desc: "Planning, validation, delivery, suivi complet."
        },
        {
            title: "Reporting",
            desc: "Clair, actionnable, prêt à montrer au client."
        }
    ]
} as const;

export const AGENCY_CASES = {
    title: "Cas concrets",
    cases: [
        { type: "RP", text: "20 talents pour un event → sourcing + coordination + contenu." },
        { type: "Média", text: "UGC en masse → déclinaisons ads + hooks multiples." },
        { type: "Créa", text: "Besoin montage/VFX → social-first, rapide, propre." }
    ]
} as const;

export const AGENCY_STANDARDS = {
    id: "agency-standards",
    title: "Vos leviers d'optimisation",
    items: [
        "Vélocité",
        "Capacité",
        "Rentabilité",
        "Fiabilité",
        "Sérénité"
    ]
} as const;

export const AGENCY_CTA = {
    title: "Structurons un",
    highlight: "partenariat",
    text: "En marque blanche ou co-branding.\nWafia s’intègre scrupuleusement à vos impératifs.\nPour une livraison plus qualitative et sécurisée. 🤝",
    button: "Étudier une collaboration"
} as const;

// (Legacy blocks kept if needed elsewhere, otherwise superseded by above)
export const AGENCY_KIT = {
    id: "agency-kit",
    title: "Ce que vous récupérez.",
    highlightWord: "récupérez",
    subtitle: "Pas juste une presta. Un département complet, branché à votre process.",
    deliverables: [
        {
            icon: "📁",
            title: "Kit process",
            description: "Étapes claires, rôles, validations."
        },
        {
            icon: "🧾",
            title: "Templates",
            description: "Briefs, suivi, reporting, relances."
        },
        {
            icon: "👥",
            title: "Accès roster / sourcing",
            description: "Shortlists prêtes & documentées."
        },
        {
            icon: "🎬",
            title: "Menu studio",
            description: "UGC volume, post-prod, déclinaisons ads."
        },
        {
            icon: "📊",
            title: "Reporting actionnable",
            description: "Prêt à montrer au client final."
        },
        {
            icon: "🤝",
            title: "Modèle de partenariat",
            description: "White label / co-branding / task force cadré."
        }
    ],
    cta: {
        text: "Recevoir le kit partenaire →",
        href: "/questionnaire/brands"
    }
} as const;
