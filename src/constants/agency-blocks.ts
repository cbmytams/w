// Blocs de contenu — /for-agencies

export const AGENCY_NAVIGATION = [
    { href: "#modes", label: "Services" },
    { href: "#cases", label: "Références" },
    { href: "#standards", label: "Avantages" },
    { href: "#kit", label: "Process" }
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
    highlight: "l'influence est chronophage.",
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
    title: "Comment on",
    highlight: "s'intègre",
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
            title: "Ops & coordination",
            desc: "Planning, validation, delivery, suivi complet."
        },
        {
            title: "Reporting",
            desc: "Clair, structuré, prêt à présenter au client."
        }
    ]
} as const;

export const AGENCY_CASES = {
    title: "Cas concrets",
    cases: [
        { type: "RP", text: "20 talents pour un événement — sourcing, coordination, contenu." },
        { type: "Média", text: "UGC en volume — déclinaisons ads et hooks multiples." },
        { type: "Créa", text: "Post-production et VFX — social-first, rapide, propre." }
    ]
} as const;

export const AGENCY_STANDARDS = {
    id: "agency-standards",
    title: "Ce que vous gagnez",
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
    text: "En marque blanche ou co-branding.\nWafia s'intègre à vos impératifs de livraison et de qualité.",
    button: "Étudier une collaboration"
} as const;
