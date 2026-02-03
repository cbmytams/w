// Nouveaux blocs pour /for-talents

export const BRAND_GRADIENT = "from-pink-500 to-pink-600";

export const TALENT_NAVIGATION = [
    { href: "#identity", label: "Identité" },
    { href: "#platforms", label: "Plateformes" },
    { href: "#levels", label: "Process" },
    { href: "#faq", label: "FAQ" }
] as const;

export const TALENT_PERSONA = {
    artist: {
        title: "L'Industrie. Tes règles.",
        subtitle: "Distribution. Droits. Empire.",
        desc: "On ne te signe pas pour te posséder, mais pour te structurer. Distribution mondiale (Spotify, Apple, Deezer), protection juridique des masters et création de ton propre label.",
        icon: "Music",
        points: [
            "Accès Major & Distribution (Tunecore, Believe...)",
            "Architecture contractuelle & Masters",
            "Création d'équipe & Label"
        ],
        color: "from-purple-500/20 to-purple-600/20"
    },
    comedian: {
        title: "Pour les Comédiens.",
        subtitle: "Des rôles. Pas juste des sketchs.",
        desc: "Les réseaux sont ton casting permanent. On t'aide à montrer ta palette de jeu pour attirer les réalisateurs.",
        icon: "Clapperboard",
        points: [
            "Transition web → fiction",
            "Gestion d'image & casting",
            "Monétisation sélective"
        ],
        color: "from-yellow-500/20 to-orange-500/20"
    },
    creator: {
        title: "Pour les Créateurs.",
        subtitle: "Une marque. Pas juste un compte.",
        desc: "Tu veux durer 10 ans. On transforme ton audience en business model solide pour que tu ne dépendes plus de l'algorithme.",
        icon: "Smartphone",
        points: [
            "Diversification des revenus",
            "Production studio premium",
            "Structure d'équipe"
        ],
        color: "from-pink-500/20 to-pink-600/20"
    }
} as const;

export const TALENT_PROOF_STRIP = {
    id: "proof-strip",
    title: "Roster. Sélection. Standard.",
    highlightWord: "Standard",
    subtitle: "On prend peu. On structure fort.\nIci, tu viens pour durer. Pas pour \"tester\".",
    badges: [
        "Places limitées",
        "Suivi mensuel",
        "Studio in-house",
        "Business géré pour toi"
    ],
    bullets: [
        "Zéro amateurisme : deadlines, validation, contrats.",
        "Zéro flou : roadmap + suivi + décisions.",
        "Zéro dépendance : objectif = indépendance."
    ]
} as const;

export const TALENT_OS_SYSTEM = {
    id: "talent-os",
    title: "Ton système.",
    highlightWord: "système",
    subtitle: "Pas juste des deals. Une structure complète autour de toi.",
    items: [
        {
            icon: "🎯",
            title: "Roadmap 90 jours",
            description: "Objectifs clairs. Priorités. Séquences de contenus."
        },
        {
            icon: "📦",
            title: "Offres + Pricing",
            description: "Packs propres. Options (droits / usage / exclus). Closing pro."
        },
        {
            icon: "🧠",
            title: "Séries + formats",
            description: "Ce que tu répètes pour scaler. Ce que tu arrêtes."
        },
        {
            icon: "🎬",
            title: "Studio social-first",
            description: "DA, scripts, tournage, montage. Brand-ready + authentique."
        },
        {
            icon: "🛡️",
            title: "Brand safety & protection",
            description: "Tri des opportunités. Image protégée. Deals cohérents."
        },
        {
            icon: "🗂️",
            title: "Talent OS (workspace)",
            description: "Un espace unique avec ton calendrier, tes deals, tes assets, tes next actions."
        }
    ],
    footer: "Email pro \"équipe perso\" : contact@prenomnom.fr → perception instant \"structure\"."
} as const;

export const TALENT_LEVELS = {
    id: "talent-levels",
    title: "De créateur à structure.",
    highlightWord: "structure",
    subtitle: "On ne te garde pas dépendant.\nOn te rend autonome.",
    levels: [
        {
            name: "FOUNDATION",
            duration: "30 jours",
            items: [
                "Positionnement clair",
                "Système contenu stable",
                "Offres + pricing propres"
            ]
        },
        {
            name: "SCALE",
            duration: "90 jours",
            items: [
                "Séries fortes + cadence",
                "Studio + optimisation",
                "Deals cohérents & récurrents"
            ]
        },
        {
            name: "INDEPENDENCE",
            duration: "6–12 mois",
            items: [
                "Équipe structurée",
                "Process internes",
                "Wafia passe en conseil (ou tu voles seul)"
            ]
        }
    ],
    signature: "Si on bosse bien, un jour t'as plus besoin de nous. 🤝"
} as const;

export const TALENT_FAQ = [
    {
        q: "Combien ça coûte ?",
        a: "On fonctionne sur commission. Pas de frais fixes. Si tu gagnes rien, on gagne rien. Alignement total."
    },
    {
        q: "Vous prenez combien de talents ?",
        a: "Très peu. On préfère un roster de 15 talents bien suivis qu'une liste de 200 noms sans impact."
    },
    {
        q: "Je dois poster plus ?",
        a: "Pas forcément. On optimise ce que tu fais déjà avant de rajouter. Qualité > quantité."
    },
    {
        q: "Vous gérez mes réseaux ?",
        a: "Non, tu restes maître de ton contenu. On structure, on conseille, on produit — mais c'est ton identité."
    },
    {
        q: "C'est quoi la différence avec une agence classique ?",
        a: "On ne te signe pas pour te laisser dans un roster de 500 noms. On structure, on produit, on t'accompagne vraiment."
    }
] as const;

export const TALENT_HERO = {
    badge: "Talent Management 2.0",
    title: "Passe pro.",
    titleHighlight: "Sans te perdre.",
    subtitle: "Tu crées. Nous on t'aide à construire autour. Sans te cramer. Sans vendre ton âme.",
    ctaPrimary: "Postuler au roster",
    ctaSecondary: "Voir l'accompagnement"
} as const;

export const TALENT_IDENTITY = {
    id: "identity",
    label: "01 — IDENTITÉ",
    title: "Ton image.",
    titleLine2: "C'est la base.",
    subtitle: "Avant les vues. Avant les deals.",
    description: "On commence par ce que les gens comprennent de toi en 3 secondes : ce que tu dégages, ce que tu représentes, ce qu'on retient.",
    points: [
        "Clarifier ton univers",
        "Contenu reconnaissable",
        "Ligne édito simple",
        "Alignement marques"
    ],
    quote: "Voilà qui je suis. Voilà ce que je fais."
} as const;

export const TALENT_PLATFORMS = {
    id: "platforms",
    label: "02 — COMPRÉHENSION",
    title: "Comprendre le game.",
    titleLine2: "Pas de hacks.",
    subtitle: "On ne cherche pas la viralité vide. On cherche la rétention et la construction d'une communauté active.",
    cards: [
        {
            icon: "Heart",
            color: "text-red-500",
            bg: "bg-red-50",
            title: "L'Attention",
            text: "Pourquoi on reste. Rythme, structure, émotion. C'est du storytelling, pas de la chance."
        },
        {
            icon: "MessageCircle",
            color: "text-purple-500",
            bg: "bg-purple-50",
            title: "Le Partage",
            text: "Pourquoi on envoie à un ami. C'est de la valeur sociale, pas juste du bruit."
        },
        {
            icon: "Activity",
            color: "text-green-500",
            bg: "bg-green-50",
            title: "La Data",
            text: "Lire les chiffres sans ego. Quoi garder ? Quoi tuer ? Décider avec lucidité."
        }
    ]
} as const;

export const TALENT_BUSINESS = {
    id: "business",
    label: "03 — BUSINESS",
    title: "Business carré.",
    titleLine2: "Esprit tranquille.",
    description: "Une fois ton image posée, les opportunités arrivent. Notre job : filtrer le bruit et sécuriser l'argent.",
    quote: "On ne te dérange que pour les décisions. Le reste, c'est géré.",
    steps: [
        "Filtrage des demandes (anti-scam)",
        "Négociation agressive (mais élégante)",
        "Sécurisation juridique (droits & image)"
    ],
    conclusion: "Ton seul job : Valider."
} as const;
