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
    ctaSecondary: "Voir l'accompagnement",
    proofPoints: [
        { label: "Roadmap & pilotage", value: "Process" },
        { label: "Studio social-first", value: "Production" },
        { label: "Deals & protection", value: "Commercial" }
    ]
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
    quote: "Voilà qui je suis. Voilà ce que je fais.",
    services: [
        {
            title: "Direction éditoriale",
            description: "Ton signature. Tes sujets. Tes limites."
        },
        {
            title: "Cohérence visuelle",
            description: "Profil, covers, thumbnails, univers graphique."
        },
        {
            title: "Positionnement",
            description: "Une phrase pour te pitch. Qui tu es. Pour qui. Pourquoi."
        },
        {
            title: "Brand-fit",
            description: "Quelles marques disent OUI. Quelles marques disent NON."
        }
    ]
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

// ============================================================================
// SERVICES SECTION - Enriched with detailed content
// ============================================================================

export const TALENT_SERVICES = {
    id: "services",
    title: "Ce qu'on met en place",
    subtitle: "9 services, 1 objectif : structure durable.",
    services: [
        {
            id: "identity",
            number: "01",
            label: "IMAGE",
            icon: "🎯",
            headline: "Identité & image",
            microDescription: "On clarifie ce que tu représentes et ce que tu refuses. Une image lisible, cohérente, qui attire les bons deals.",
            points: [
                "Positionnement clair (tu es quoi, pour qui, pourquoi)",
                "Direction éditoriale (ton, sujets, limites)",
                "Cohérence visuelle cross-plateformes",
                "Brand-fit : marques OK / marques à éviter"
            ],
            widget: "IdentityLens" as const,
            detail: {
                intro: "Une identité claire fait gagner du temps partout : contenu, collaborations, décisions. C'est la base.",
                whatWeDo: [
                    "Positionnement (promesse simple + signature)",
                    "Direction éditoriale (ton, sujets, limites)",
                    "Cohérence visuelle (profil, thumbnails, univers)",
                    "Brand-fit (marques alignées / à éviter)",
                    "Storytelling (narration, arcs, crédibilité)"
                ],
                deliverables: [
                    "1 phrase de positionnement + règles de ton",
                    "\"Brand map\" : thèmes OK / KO + mots-clés",
                    "Check-list visuelle (profil, cover, highlights, thumbnails)",
                    "Mini-charte (codes, couleurs, rythme, sous-titres)",
                    "Liste brand-fit + pricing de base (plancher)"
                ],
                howItWorks: [
                    { step: "Audit express", description: "profil + contenus + perception audience" },
                    { step: "Reco & alignement", description: "validation rapide" },
                    { step: "Mise en place", description: "pack profil + guidelines" }
                ],
                forWho: "Pour les talents qui veulent être lisibles et crédibles, sans se dénaturer."
            }
        },
        {
            id: "series",
            number: "02",
            label: "CONTENU",
            icon: "📦",
            headline: "Séries & formats",
            microDescription: "On transforme ton talent en formats répétés. Plus de régularité, moins de stress 'quoi poster ?'.",
            points: [
                "Création de 2-3 séries piliers",
                "Structures répétables (hooks, déroulé, chute)",
                "Banque d'idées organisée (backlog vivant)",
                "Signature éditoriale reconnaissable"
            ],
            widget: "SeriesFormats" as const,
            detail: {
                intro: "Les séries construisent la fidélité. Les formats rendent la production simple et stable.",
                whatWeDo: [
                    "Création de 2–3 séries principales (promesse claire)",
                    "Structures de vidéos (hooks, déroulé, chute)",
                    "Banque d'idées (backlog vivant)",
                    "\"Signature\" (angle, style, rythme)",
                    "Variantes (même idée, différentes exécutions)"
                ],
                deliverables: [
                    "3 séries prêtes + template de script",
                    "30–60 idées classées par série",
                    "10 hooks testés (versions courtes)",
                    "\"Format bible\" (durée, rythme, plans, CTA)",
                    "Plan de publication simple (cadence réaliste)"
                ],
                howItWorks: [
                    { step: "Analyse de tes tops & de ton public", description: "ce qui marche déjà" },
                    { step: "Design des séries", description: "promesse + répétabilité" },
                    { step: "Backlog + templates", description: "prêt à tourner" }
                ],
                forWho: "Pour ceux qui veulent une machine à idées claire, sans s'éparpiller."
            }
        },
        {
            id: "workflow",
            number: "03",
            label: "PRODUCTION",
            icon: "⚙️",
            headline: "Workflow production",
            microDescription: "On met un pipeline pro : idée → script → tournage → montage → QA → publication. Tu tiens la cadence sans te cramer.",
            points: [
                "Routine hebdo optimisée (batching intelligent)",
                "Checklists production (tournage, montage, upload, QA)",
                "Organisation fichiers + backups + naming",
                "Process de validation si équipe"
            ],
            widget: "ProductionPipeline" as const,
            detail: {
                intro: "Le talent crée. Le workflow protège : qualité stable, délais tenus, moins de charge mentale.",
                whatWeDo: [
                    "Routine hebdo (batching intelligent)",
                    "Checklists (tournage, montage, upload, QA)",
                    "Organisation fichiers + naming + backups",
                    "Process validation (si équipe)",
                    "Optimisation temps (recyclage, presets, templates)"
                ],
                deliverables: [
                    "SOP 1 page (workflow complet)",
                    "Checklists prêtes (Notion/Sheets)",
                    "Arborescence drive + règles de nommage",
                    "Presets sous-titres / export / formats",
                    "Plan \"1 contenu → 3 variations\" (repurpose)"
                ],
                howItWorks: [
                    { step: "On observe ta manière de produire", description: "diagnostic workflow actuel" },
                    { step: "On supprime les frictions", description: "bottlenecks identifiés" },
                    { step: "On installe un workflow simple et durable", description: "SOPs + templates" }
                ],
                forWho: "Pour les talents qui veulent de la constance sans sacrifier leur énergie."
            }
        },
        {
            id: "kpis",
            number: "04",
            label: "DATA",
            icon: "📊",
            headline: "Pilotage & KPIs",
            microDescription: "On pilote avec 5 KPIs max. Chaque semaine : Stop / Scale / Test. Les chiffres deviennent un outil, pas un jugement.",
            points: [
                "Dashboard simple (5 KPIs max, pas 50)",
                "Revue hebdo : top 10 + analyse qualitative",
                "Plan de tests A/B (1 variable à la fois)",
                "Journal de learnings (ce qui marche / pourquoi)"
            ],
            widget: "KPIPulse" as const,
            detail: {
                intro: "Sans pilotage, tu répètes au hasard. Avec pilotage, tu construis une trajectoire.",
                whatWeDo: [
                    "Définition North Star (objectif principal)",
                    "KPIs par plateforme (seuils minimums)",
                    "Revue hebdo (top 10 + analyse)",
                    "Plan de tests (1 variable à la fois)",
                    "Journal de learnings (ce qui marche / pourquoi)"
                ],
                deliverables: [
                    "Dashboard simple (hebdo)",
                    "Seuils KPIs + alertes (quoi surveiller)",
                    "Template Stop/Scale/Test",
                    "Backlog de tests (hooks, durées, montage, sujets)",
                    "\"Playbook perso\" basé sur tes données"
                ],
                howItWorks: [
                    { step: "On choisit tes KPIs et tes seuils", description: "5 max, pas 50" },
                    { step: "On installe le rituel hebdo", description: "15 min top chrono" },
                    { step: "On itère jusqu'à stabiliser la perf", description: "amélioration continue" }
                ],
                forWho: "Pour ceux qui veulent comprendre ce qui marche, sans se prendre la tête."
            }
        },
        {
            id: "pricing",
            number: "05",
            label: "OFFRE",
            icon: "💰",
            headline: "Offres & pricing",
            microDescription: "On structure ton business : 3 offres claires, un prix plancher, des options propres. Tu n'improvises plus.",
            points: [
                "3 packs (starter / standard / premium)",
                "Pricing plancher + conditions non négociables",
                "Cadrage droits d'usage (durée, territoires, média)",
                "Add-ons (UGC, whitelisting, exclusivité)"
            ],
            widget: "PricingOffers" as const,
            detail: {
                intro: "Une offre nette = moins de négos inutiles, plus de deals alignés.",
                whatWeDo: [
                    "Packs (starter / standard / premium)",
                    "Pricing plancher + conditions",
                    "Encadrement des droits (usage, durée, ads)",
                    "Add-ons (UGC, whitelisting, exclusivité, multi-plateforme)",
                    "Positionnement commercial (ce que tu vends vraiment)"
                ],
                deliverables: [
                    "3 packs + rate card light",
                    "Grille droits (usage / durée / territoires)",
                    "Liste \"non négociables\"",
                    "Template devis + template briefing",
                    "Argumentaire simple (pourquoi ce prix)"
                ],
                howItWorks: [
                    { step: "On clarifie ton offre", description: "valeur + effort réel" },
                    { step: "On fixe un plancher et des règles", description: "jamais en dessous" },
                    { step: "On met tout en templates", description: "zéro improvisation" }
                ],
                forWho: "Pour les talents qui veulent être payés proprement, sans se brader."
            }
        },
        {
            id: "deals",
            number: "06",
            label: "COMMERCIAL",
            icon: "💼",
            headline: "Commercial & deals",
            microDescription: "On filtre, on négocie, on suit. Tu prends les décisions — on gère la machine commerciale.",
            points: [
                "Filtrage brand-fit (budget, alignement, red flags)",
                "Négociation (budget, livrables, droits, timing)",
                "Gestion briefs / retours / validations",
                "Suivi pipeline (relances, deadlines, statuts)"
            ],
            widget: "DealDesk" as const,
            detail: {
                intro: "Le but n'est pas d'avoir plus de demandes. Le but est d'avoir de meilleures demandes.",
                whatWeDo: [
                    "Filtrage (brand-fit, budget, red flags)",
                    "Négociation (budget, livrables, droits, timing)",
                    "Gestion briefs / retours / validations",
                    "Suivi pipeline (relances, statut, deadlines)",
                    "Relation long-terme (ambassadorship > one-shots)"
                ],
                deliverables: [
                    "Pipeline deals (statuts + next actions)",
                    "Templates mails / DM / relances",
                    "Checklist négociation (points à cadrer)",
                    "Pack \"brief\" (questions obligatoires)",
                    "\"Deal recap\" avant validation (clair, 1 page)"
                ],
                howItWorks: [
                    { step: "On installe le filtre", description: "ce qu'on accepte / refuse" },
                    { step: "On gère la négo + le suivi", description: "tu valides, on exécute" },
                    { step: "Tu valides sur une synthèse courte", description: "décision éclairée, rapide" }
                ],
                forWho: "Pour ceux qui veulent des deals alignés, pas du bruit."
            }
        },
        {
            id: "ops",
            number: "07",
            label: "OPS",
            icon: "📋",
            headline: "Ops & admin",
            microDescription: "On met l'administratif au carré : factures, relances, documents, organisation. Zéro chaos, zéro oublis.",
            points: [
                "Centralisation docs (contrats, briefs, factures)",
                "Facturation + suivi paiements + relances automatiques",
                "Calendrier unifié (contenu + commercial)",
                "Process validation & délais clairs"
            ],
            widget: "OpsHub" as const,
            detail: {
                intro: "L'admin n'est pas glamour, mais c'est ce qui sécurise une carrière.",
                whatWeDo: [
                    "Centralisation docs (contrats, briefs, factures)",
                    "Facturation + suivi paiements + relances",
                    "Organisation calendrier (contenu + commercial)",
                    "Process validation (délais, responsabilités)",
                    "Mise en ordre \"pro\" (emails, signatures, dossiers)"
                ],
                deliverables: [
                    "Templates facture / relance / recap",
                    "Dossier partagé structuré (arbo)",
                    "Checklists admin (par opération)",
                    "Calendrier type (hebdo / mensuel)",
                    "\"Ops board\" (statuts, deadlines, ownership)"
                ],
                howItWorks: [
                    { step: "On nettoie et on centralise", description: "tout au même endroit" },
                    { step: "On met des templates", description: "actions répétables" },
                    { step: "On suit avec un board simple", description: "visibilité totale" }
                ],
                forWho: "Pour ceux qui veulent être crédibles et carrés avec les marques."
            }
        },
        {
            id: "events",
            number: "08",
            label: "ÉVÉNEMENTIEL",
            icon: "🎪",
            headline: "Événementiel & terrain",
            microDescription: "On produit et on opère tes activations : logistique, coordination, captation, et contenu final. À petite comme à grande échelle.",
            points: [
                "Gestion booking (conditions, planning, budgets)",
                "Coordination terrain (équipes, timings, livrables)",
                "Production & captation (social-first + contenu récap)",
                "Post-event : montage, distribution multi-plateformes"
            ],
            widget: "EventEngine" as const,
            detail: {
                intro: "Un event bien géré peut devenir : contenu, image, réseau, revenus. Mal géré, ça abîme tout.",
                whatWeDo: [
                    "Gestion booking / conditions / planning",
                    "Coordination terrain (équipes, timings, livrables)",
                    "Production & captation (social-first + récap)",
                    "Gestion droits & image (cadre propre)",
                    "Post-event : montage, recap, distribution"
                ],
                deliverables: [
                    "Template booking + conditions minimales",
                    "Checklist terrain (avant / pendant / après)",
                    "Plan de contenu event (stories, vlog, recap, photos)",
                    "Dossier de prod (timing, contact, contraintes)",
                    "Recap final + assets livrables"
                ],
                howItWorks: [
                    { step: "On cadre l'opération", description: "conditions + plan détaillé" },
                    { step: "On opère sur le terrain", description: "prod + logistique" },
                    { step: "On sort le contenu", description: "recap + distribution" }
                ],
                forWho: "Pour les talents qui veulent des activations propres et exploitables."
            }
        },
        {
            id: "formation",
            number: "09",
            label: "FORMATION",
            icon: "🎓",
            headline: "Formation",
            microDescription: "Tu comprends ce qu'on fait et pourquoi. L'objectif : autonomie — pas dépendance.",
            points: [
                "Algorithmes & mécaniques plateformes",
                "Lecture analytics → décisions concrètes",
                "Négociation & protection (droits, usages, red flags)",
                "Organisation workflow durable"
            ],
            widget: "Formation" as const,
            detail: {
                intro: "Former, c'est accélérer. Et surtout : protéger ton avenir.",
                whatWeDo: [
                    "Algorithmes & mécaniques plateformes",
                    "Lecture analytics + décisions",
                    "Négociation & protection (droits, usages, red flags)",
                    "Organisation & workflow (durable)",
                    "Montée en compétences équipe (si besoin)"
                ],
                deliverables: [
                    "Modules wacademy (par niveau)",
                    "Cheatsheets : KPIs, hooks, pricing, red flags",
                    "Rituels hebdo (pilotage + production)",
                    "Templates (briefs, négo, ops)",
                    "Plan d'autonomie (ce que tu gères seul)"
                ],
                howItWorks: [
                    { step: "On identifie ton niveau et tes gaps", description: "diagnostic rapide" },
                    { step: "On forme en pratique", description: "cas réels, zéro théorie" },
                    { step: "On transfère les process", description: "autonomie progressive" }
                ],
                forWho: "Pour les talents qui veulent comprendre et maîtriser leur carrière."
            }
        }
    ]
} as const;

// ============================================================================
// Additional Required Sections
// ============================================================================

export const TALENT_PROBLEM = {
    id: "problem",
    title: "Le talent, c'est rare. Le système, c'est ce qui manque.",
    description: "Beaucoup de créateurs ont du potentiel, mais tout repose sur eux : idées, montage, régularité, deals, admin, stress.\n\nRésultat : inconstance, mauvais choix, burn-out, opportunités ratées.",
    conclusion: "Nous, on ne remplace pas ton talent. On construit ce qui doit exister autour."
} as const;

export const TALENT_CTA = {
    title: "Prêt à structurer ?",
    description: "Rejoins le roster. On commence par un diagnostic gratuit pour voir si on peut travailler ensemble.",
    ctaText: "Demander un diagnostic",
    ctaLink: "/contact"
} as const;

export const TALENT_METHOD = {
    id: "method",
    title: "Notre méthode",
    subtitle: "4 étapes pour passer de créateur à structure",
    steps: [
        {
            number: "01",
            title: "Diagnostic",
            duration: "1 semaine",
            description: "On analyse ton positionnement, ton contenu, tes audiences et ton business actuel.",
            details: "Audit complet : image, plateformes, deals, workflow, opportunités."
        },
        {
            number: "02",
            title: "Roadmap",
            duration: "2 semaines",
            description: "On construit un plan 90 jours avec priorités claires et livrables concrets.",
            details: "Identité, séries, pricing, process. Tout ce qui manque, on le met en place."
        },
        {
            number: "03",
            title: "Production",
            duration: "En continu",
            description: "On produit et on opère : studio, deals, ops, events, formation.",
            details: "Tu restes créateur. On gère le système autour de toi."
        },
        {
            number: "04",
            title: "Scale",
            duration: "3–12 mois",
            description: "On construit ton équipe, on transfert les process, puis on passe en conseil.",
            details: "Objectif : indépendance. Si on bosse bien, un jour t'as plus besoin de nous."
        }
    ]
} as const;

export const TALENT_TIMELINE = {
    id: "timeline",
    title: "De créateur à structure.",
    highlightWord: "structure",
    subtitle: "On ne te garde pas dépendant.\nOn te rend autonome.",
    phases: [
        {
            id: "foundation",
            name: "FOUNDATION",
            duration: "30 jours",
            objective: "Bases solides",
            actions: [
                "Audit complet (image, audience, business)",
                "Définition identité + positionnement",
                "Création des first séries",
                "Pricing + offres structurées"
            ],
            deliverables: [
                "Positionnement clair",
                "Système contenu stable",
                "Offres + pricing propres",
                "Roadmap 90 jours"
            ],
            exitCriteria: "Tu as une image lisible, un système de contenu répétable, et des offres structurées."
        },
        {
            id: "scale",
            name: "SCALE",
            duration: "90 jours",
            objective: "Montée en régime",
            actions: [
                "Production régulière (séries + cadence)",
                "Studio + workflow optimisé",
                "Deals + commercial actif",
                "Pilotage hebdo (KPIs + tests)"
            ],
            deliverables: [
                "Séries fortes + cadence tenue",
                "Studio + optimisation",
                "Deals cohérents & récurrents",
                "Dashboard KPIs"
            ],
            exitCriteria: "Tu produis de manière constante, tu génères des revenus, et tu pilotes avec des KPIs."
        },
        {
            id: "independence",
            name: "INDEPENDENCE",
            duration: "6–12 mois",
            objective: "Vers l'autonomie",
            actions: [
                "Construction équipe (monteur, assistant, manager)",
                "Transfert de process",
                "Formation continue",
                "Transition vers conseil"
            ],
            deliverables: [
                "Équipe structurée",
                "Process internes documentés",
                "Autonomie opérationnelle",
                "Wafia en mode conseil"
            ],
            exitCriteria: "Tu as une équipe, tu maîtrises tes process, et tu n'as plus besoin de nous au quotidien."
        }
    ],
    signature: "Si on bosse bien, un jour t'as plus besoin de nous. 🤝"
} as const;

export const TALENT_FOR_WHO = {
    id: "who",
    title: "Pour qui ?",
    forYou: {
        title: "C'est fait pour toi si :",
        items: [
            "Tu crées déjà et tu as une audience engaged, même petite.",
            "Tu cherches à construire une carrière durable, pas juste encaisser vite.",
            "Tu veux comprendre et maîtriser ta carrière (on forme, on ne garde pas dépendant).",
            "Tu acceptes un cadre : routine, process, validation.",
            "Tu veux des deals alignés et propres (brand safety)."
        ]
    },
    notForYou: {
        title: "Pas pour toi si :",
        items: [
            "Tu débutes de zéro (il faut déjà une base d'audience).",
            "Tu cherches un coup rapide ou des hack sans système.",
            "Tu veux déléguer sans comprendre (on ne remplace pas ton cerveau).",
            "Tu refuses tout cadre ou process.",
            "Tu veux accepter tout deal par peur."
        ]
    }
} as const;


export const TALENT_DELIVERABLES = {
    id: "deliverables",
    title: "Concret. Pas théorique.",
    subtitle: "Tu repars avec un système qui tourne.",
    items: [
        {
            id: "identity",
            icon: "🎯",
            title: "Identité & image",
            subtitle: "Positionnement, DA, cohérence",
            microDescription: "On clarifie ce que tu représentes et ce que tu refuses. Une image lisible, cohérente, qui attire les bons deals.",
            detail: {
                intro: "Une identité claire fait gagner du temps partout : contenu, collaborations, décisions. C'est la base.",
                whatWeDo: [
                    "Positionnement (promesse simple + signature)",
                    "Direction éditoriale (ton, sujets, limites)",
                    "Cohérence visuelle (profil, thumbnails, univers)",
                    "Brand-fit (marques alignées / à éviter)",
                    "Storytelling (narration, arcs, crédibilité)"
                ],
                deliverables: [
                    "1 phrase de positionnement + règles de ton",
                    "\"Brand map\" : thèmes OK / KO + mots-clés",
                    "Check-list visuelle (profil, cover, highlights, thumbnails)",
                    "Mini-charte (codes, couleurs, rythme, sous-titres)",
                    "Liste brand-fit + pricing de base (plancher)"
                ],
                howItWorks: [
                    { step: "Audit express", description: "profil + contenus + perception audience" },
                    { step: "Reco & alignement", description: "validation rapide" },
                    { step: "Mise en place", description: "pack profil + guidelines" }
                ],
                forWho: "Pour les talents qui veulent être lisibles et crédibles, sans se dénaturer."
            }
        },
        {
            id: "series",
            icon: "📦",
            title: "Séries & formats",
            subtitle: "Répétables, backlog, signatures",
            microDescription: "On transforme ton talent en formats répétés. Plus de régularité, moins de stress 'quoi poster ?'.",
            detail: {
                intro: "Les séries construisent la fidélité. Les formats rendent la production simple et stable.",
                whatWeDo: [
                    "Création de 2–3 séries principales (promesse claire)",
                    "Structures de vidéos (hooks, déroulé, chute)",
                    "Banque d'idées (backlog vivant)",
                    "\"Signature\" (angle, style, rythme)",
                    "Variantes (même idée, différentes exécutions)"
                ],
                deliverables: [
                    "3 séries prêtes + template de script",
                    "30–60 idées classées par série",
                    "10 hooks testés (versions courtes)",
                    "\"Format bible\" (durée, rythme, plans, CTA)",
                    "Plan de publication simple (cadence réaliste)"
                ],
                howItWorks: [
                    { step: "Analyse de tes tops & de ton public", description: "ce qui marche déjà" },
                    { step: "Design des séries", description: "promesse + répétabilité" },
                    { step: "Backlog + templates", description: "prêt à tourner" }
                ],
                forWho: "Pour ceux qui veulent une machine à idées claire, sans s'éparpiller."
            }
        },
        {
            id: "workflow",
            icon: "⚙️",
            title: "Workflow production",
            subtitle: "Routine, QA, outils, pipeline",
            microDescription: "On met un pipeline pro : idée → script → tournage → montage → QA → publication. Tu tiens la cadence sans te cramer.",
            detail: {
                intro: "Le talent crée. Le workflow protège : qualité stable, délais tenus, moins de charge mentale.",
                whatWeDo: [
                    "Routine hebdo (batching intelligent)",
                    "Checklists (tournage, montage, upload, QA)",
                    "Organisation fichiers + naming + backups",
                    "Process validation (si équipe)",
                    "Optimisation temps (recyclage, presets, templates)"
                ],
                deliverables: [
                    "SOP 1 page (workflow complet)",
                    "Checklists prêtes (Notion/Sheets)",
                    "Arborescence drive + règles de nommage",
                    "Presets sous-titres / export / formats",
                    "Plan \"1 contenu → 3 variations\" (repurpose)"
                ],
                howItWorks: [
                    { step: "On observe ta manière de produire", description: "diagnostic workflow actuel" },
                    { step: "On supprime les frictions", description: "bottlenecks identifiés" },
                    { step: "On installe un workflow simple et durable", description: "SOPs + templates" }
                ],
                forWho: "Pour les talents qui veulent de la constance sans sacrifier leur énergie."
            }
        },
        {
            id: "kpis",
            icon: "📊",
            title: "Pilotage & KPIs",
            subtitle: "North star + seuils, review hebdo",
            microDescription: "On pilote avec 5 KPIs max. Chaque semaine : Stop / Scale / Test. Les chiffres deviennent un outil, pas un jugement.",
            detail: {
                intro: "Sans pilotage, tu répètes au hasard. Avec pilotage, tu construis une trajectoire.",
                whatWeDo: [
                    "Définition North Star (objectif principal)",
                    "KPIs par plateforme (seuils minimums)",
                    "Revue hebdo (top 10 + analyse)",
                    "Plan de tests (1 variable à la fois)",
                    "Journal de learnings (ce qui marche / pourquoi)"
                ],
                deliverables: [
                    "Dashboard simple (hebdo)",
                    "Seuils KPIs + alertes (quoi surveiller)",
                    "Template Stop/Scale/Test",
                    "Backlog de tests (hooks, durées, montage, sujets)",
                    "\"Playbook perso\" basé sur tes données"
                ],
                howItWorks: [
                    { step: "On choisit tes KPIs et tes seuils", description: "5 max, pas 50" },
                    { step: "On installe le rituel hebdo", description: "15 min top chrono" },
                    { step: "On itère jusqu'à stabiliser la perf", description: "amélioration continue" }
                ],
                forWho: "Pour ceux qui veulent comprendre ce qui marche, sans se prendre la tête."
            }
        },
        {
            id: "pricing",
            icon: "💰",
            title: "Offres & pricing",
            subtitle: "Packs, plancher, conditions",
            microDescription: "On structure ton business : 3 offres claires, un prix plancher, des options propres. Tu n'improvises plus.",
            detail: {
                intro: "Une offre nette = moins de négos inutiles, plus de deals alignés.",
                whatWeDo: [
                    "Packs (starter / standard / premium)",
                    "Pricing plancher + conditions",
                    "Encadrement des droits (usage, durée, ads)",
                    "Add-ons (UGC, whitelisting, exclusivité, multi-plateforme)",
                    "Positionnement commercial (ce que tu vends vraiment)"
                ],
                deliverables: [
                    "3 packs + rate card light",
                    "Grille droits (usage / durée / territoires)",
                    "Liste \"non négociables\"",
                    "Template devis + template briefing",
                    "Argumentaire simple (pourquoi ce prix)"
                ],
                howItWorks: [
                    { step: "On clarifie ton offre", description: "valeur + effort réel" },
                    { step: "On fixe un plancher et des règles", description: "jamais en dessous" },
                    { step: "On met tout en templates", description: "zéro improvisation" }
                ],
                forWho: "Pour les talents qui veulent être payés proprement, sans se brader."
            }
        },
        {
            id: "deals",
            icon: "🤝",
            title: "Commercial & deals",
            subtitle: "Filtrage, négo, contracts, suivi",
            microDescription: "On filtre, on négocie, on suit. Tu prends les décisions — on gère la machine commerciale.",
            detail: {
                intro: "Le but n'est pas d'avoir plus de demandes. Le but est d'avoir de meilleures demandes.",
                whatWeDo: [
                    "Filtrage (brand-fit, budget, red flags)",
                    "Négociation (budget, livrables, droits, timing)",
                    "Gestion briefs / retours / validations",
                    "Suivi pipeline (relances, statut, deadlines)",
                    "Relation long-terme (ambassadorship > one-shots)"
                ],
                deliverables: [
                    "Pipeline deals (statuts + next actions)",
                    "Templates mails / DM / relances",
                    "Checklist négociation (points à cadrer)",
                    "Pack \"brief\" (questions obligatoires)",
                    "\"Deal recap\" avant validation (clair, 1 page)"
                ],
                howItWorks: [
                    { step: "On installe le filtre", description: "ce qu'on accepte / refuse" },
                    { step: "On gère la négo + le suivi", description: "tu valides, on exécute" },
                    { step: "Tu valides sur une synthèse courte", description: "décision éclairée, rapide" }
                ],
                forWho: "Pour ceux qui veulent des deals alignés, pas du bruit."
            }
        },
        {
            id: "ops",
            icon: "📋",
            title: "Ops & admin",
            subtitle: "Facturation, relances, organisation, docs",
            microDescription: "On met l'administratif au carré : factures, relances, documents, organisation. Zéro chaos, zéro oublis.",
            detail: {
                intro: "L'admin n'est pas glamour, mais c'est ce qui sécurise une carrière.",
                whatWeDo: [
                    "Centralisation docs (contrats, briefs, factures)",
                    "Facturation + suivi paiements + relances",
                    "Organisation calendrier (contenu + commercial)",
                    "Process validation (délais, responsabilités)",
                    "Mise en ordre \"pro\" (emails, signatures, dossiers)"
                ],
                deliverables: [
                    "Templates facture / relance / recap",
                    "Dossier partagé structuré (arbo)",
                    "Checklists admin (par opération)",
                    "Calendrier type (hebdo / mensuel)",
                    "\"Ops board\" (statuts, deadlines, ownership)"
                ],
                howItWorks: [
                    { step: "On nettoie et on centralise", description: "tout au même endroit" },
                    { step: "On met des templates", description: "actions répétables" },
                    { step: "On suit avec un board simple", description: "visibilité totale" }
                ],
                forWho: "Pour ceux qui veulent être crédibles et carrés avec les marques."
            }
        },
        {
            id: "events",
            icon: "🎪",
            title: "Événementiel",
            subtitle: "Bookings, terrain, captation, recap",
            microDescription: "On produit et on opère tes activations : logistique, coordination, captation, et contenu final. À petite comme à grande échelle.",
            detail: {
                intro: "Un event bien géré peut devenir : contenu, image, réseau, revenus. Mal géré, ça abîme tout.",
                whatWeDo: [
                    "Gestion booking / conditions / planning",
                    "Coordination terrain (équipes, timings, livrables)",
                    "Production & captation (social-first + récap)",
                    "Gestion droits & image (cadre propre)",
                    "Post-event : montage, recap, distribution"
                ],
                deliverables: [
                    "Template booking + conditions minimales",
                    "Checklist terrain (avant / pendant / après)",
                    "Plan de contenu event (stories, vlog, recap, photos)",
                    "Dossier de prod (timing, contact, contraintes)",
                    "Recap final + assets livrables"
                ],
                howItWorks: [
                    { step: "On cadre l'opération", description: "conditions + plan détaillé" },
                    { step: "On opère sur le terrain", description: "prod + logistique" },
                    { step: "On sort le contenu", description: "recap + distribution" }
                ],
                forWho: "Pour les talents qui veulent des activations propres et exploitables."
            }
        },
        {
            id: "formation",
            icon: "🎓",
            title: "Formation",
            subtitle: "Algorithmes, analytics, négo, autonomie",
            microDescription: "Tu comprends ce qu'on fait et pourquoi. L'objectif : autonomie — pas dépendance.",
            detail: {
                intro: "Former, c'est accélérer. Et surtout : protéger ton avenir.",
                whatWeDo: [
                    "Algorithmes & mécaniques plateformes",
                    "Lecture analytics + décisions",
                    "Négociation & protection (droits, usages, red flags)",
                    "Organisation & workflow (durable)",
                    "Montée en compétences équipe (si besoin)"
                ],
                deliverables: [
                    "Modules wacademy (par niveau)",
                    "Cheatsheets : KPIs, hooks, pricing, red flags",
                    "Rituels hebdo (pilotage + production)",
                    "Templates (briefs, négo, ops)",
                    "Plan d'autonomie (ce que tu gères seul)"
                ],
                howItWorks: [
                    { step: "On identifie ton niveau et tes gaps", description: "diagnostic rapide" },
                    { step: "On forme en pratique", description: "cas réels, zéro théorie" },
                    { step: "On transfère les process", description: "autonomie progressive" }
                ],
                forWho: "Pour les talents qui veulent comprendre et maîtriser leur carrière."
            }
        }
    ]
} as const;


export const TALENT_HERO_BACKUP = TALENT_HERO;
