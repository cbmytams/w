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
    subtitle: "Wafia est le bras armé des agences.",
    text: "Marque blanche ou co-branding.\nOn gère l’opérationnel. Vous gardez la relation client.",
    cta: "Monter un partenariat (réponse rapide)"
} as const;

export const AGENCY_PROBLEM = {
    title: "Le problème :",
    highlight: "l’influence te bouffe.",
    items: [
        "Sourcing trop long",
        "Coordination infernale",
        "Marges faibles sur l’exécution",
        "Deadlines client intenables",
        "Trop de prestas à gérer (UGC, talents, prod)"
    ],
    conclusion: "Tu perds du temps. Tu perds de la marge."
} as const;

export const AGENCY_MODES = {
    id: "agency-modes",
    title: "Wafia =",
    highlight: "plug-and-play",
    subtitle: "Tu branches Wafia, tu scales.",
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
    title: "Ce que tu gagnes",
    items: [
        "vitesse",
        "capacité",
        "marges",
        "fiabilité",
        "tranquillité"
    ]
} as const;

export const AGENCY_CTA = {
    title: "Montons un",
    highlight: "partenariat",
    text: "Marque blanche ou co-branding.\nWafia s’intègre dans ton process.\nEt tu livres plus fort, plus vite. 🤝",
    button: "Monter un partenariat"
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
