// Constants for /for-talents page
// Only actively used constants are kept here.
// Dead constants removed: TALENT_PROOF_STRIP, TALENT_OS_SYSTEM, TALENT_LEVELS,
// TALENT_PLATFORMS, TALENT_SERVICES, TALENT_METHOD, TALENT_TIMELINE

export const BRAND_GRADIENT = "from-pink-500 to-pink-600";

export const TALENT_NAVIGATION = [
    { href: "#deliverables", label: "Services" },
    { href: "#journey", label: "Méthode" },
    { href: "#faq", label: "FAQ" }
] as const;

export const TALENT_PERSONA = {
    artist: {
        title: "L'Industrie. Tes règles.",
        subtitle: "Distribution. Droits. Empire.",
        desc: "On te structure : droits, distribution, équipe, label.",
        icon: "Music",
        points: [
            "Distribution mondiale (Spotify, Apple, Deezer)",
            "Protection des masters & contrats",
            "Création d'équipe & label"
        ],
        color: "from-purple-500/20 to-purple-600/20"
    },
    comedian: {
        title: "Pour les Comédiens.",
        subtitle: "Des rôles. Pas juste des sketchs.",
        desc: "On transforme tes réseaux en vitrine de casting.",
        icon: "Clapperboard",
        points: [
            "Transition web → fiction",
            "Gestion d'image & casting",
            "Sélection des projets"
        ],
        color: "from-yellow-500/20 to-orange-500/20"
    },
    creator: {
        title: "Pour les Créateurs.",
        subtitle: "Une marque. Pas juste un compte.",
        desc: "On transforme ton audience en business stable.",
        icon: "Smartphone",
        points: [
            "Diversification des revenus",
            "Production studio premium",
            "Structure d'équipe"
        ],
        color: "from-pink-500/20 to-pink-600/20"
    }
} as const;

export const TALENT_FAQ = [
    {
        q: "Combien ça coûte ?",
        a: "Commission uniquement. Pas de frais fixes. Si tu gagnes rien, on gagne rien. Alignement total."
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
        a: "Non. Ton identité reste chez toi. Nous, on structure et on opère autour : production, deals, ops, stratégie."
    },
    {
        q: "C'est quoi la différence avec une agence classique ?",
        a: "Une agence te place sur des deals. Wafia te construit un système : studio, ops, pricing, protection, traçabilité — puis on te le transfère."
    }
] as const;

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
            "Tu as déjà une audience (même petite) + tu postes déjà.",
            "Tu veux une carrière, pas juste des collabs.",
            "Tu acceptes un cadre : process, routine, validation.",
            "Tu veux des deals alignés + protection."
        ]
    },
    notForYou: {
        title: "Pas pour toi si :",
        items: [
            "Tu débutes de zéro.",
            "Tu veux du quick money sans structure.",
            "Tu veux déléguer sans comprendre.",
            "Tu refuses la discipline."
        ]
    }
} as const;

export const TALENT_DELIVERABLES = {
    id: "deliverables",
    title: "Du concret.",
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

export const TALENT_BUSINESS = {
    label: "Business & Revenus",
    title: "Ton audience est un",
    titleLine2: "levier, pas une fin.",
    description: "Les vues sans stratégie ne paient pas le loyer. On transforme ta visibilité en revenus récurrents et diversifiés.",
    quote: "La différence entre un influenceur et un entrepreneur, c'est le système.",
    steps: [
        "Audit complet de tes sources de revenus actuelles",
        "Mise en place de nouvelles offres (produits, services, affiliation)",
        "Optimisation des taux de conversion et fidélisation"
    ],
    conclusion: "Structure tes revenus. Valider."
} as const;

export const TALENT_IDENTITY = {
    label: "Identité & Marque",
    title: "Deviens une",
    titleLine2: "marque média.",
    subtitle: "Sortir du lot n'est pas une option.",
    description: "On construit ton univers visuel et narratif pour qu'il soit immédiatement reconnaissable. Cohérence totale, du feed au merch.",
    quote: "Ton image est ton asset le plus précieux.",
    services: [
        {
            title: "Audit & Positionnement",
            description: "Analyse de l'existant et définition de ton angle unique."
        },
        {
            title: "Identité Visuelle",
            description: "DA complète : palette, typos, presets photo, gabarits."
        },
        {
            title: "Ligne Éditoriale",
            description: "Tons, thématiques, et piliers de contenu récurrents."
        },
        {
            title: "Media Kit Pro",
            description: "Présentation impactante pour les marques et partenaires."
        }
    ]
} as const;

export const TALENT_TIMELINE = {
    id: "journey",
    title: "Un parcours en",
    highlightWord: "3 phases",
    subtitle: "De la structuration à l'autonomie. On ne te lâche pas dans la nature, on te construit un empire.",
    signature: "Objectif final : tu n'as plus besoin de nous.",
    phases: [
        {
            id: "phase1",
            name: "Phase 1 : Fondation",
            objective: "Poser les bases",
            duration: "Mois 1-3",
            actions: ["Audit complet", "Définition identité", "Mise en place workflow"],
            deliverables: ["Charte éditoriale", "Pack profils", "3 premiers concepts"],
            exitCriteria: "Identité claire et workflow de production actif."
        },
        {
            id: "phase2",
            name: "Phase 2 : Accélération",
            objective: "Créer la croissance",
            duration: "Mois 4-12",
            actions: ["Production intensive", "Optimisation formats", "Premiers deals"],
            deliverables: ["Séries récurrentes", "Media Kit", "Signatures contrats"],
            exitCriteria: "Audience en hausse et premiers revenus générés."
        },
        {
            id: "phase3",
            name: "Phase 3 : Scale",
            objective: "Maximiser l'impact",
            duration: "Année 2+",
            actions: ["Diversification revenus", "Recrutement équipe", "Nouveaux canaux"],
            deliverables: ["Produits propres", "Équipe autonome", "Empire média"],
            exitCriteria: "Business rentable et indépendant de ton temps."
        }
    ]
} as const;

export const TALENT_METHOD = {
    title: "Notre Méthode",
    subtitle: "Un process éprouvé pour transformer ton potentiel en performance.",
    steps: [
        {
            number: "01",
            title: "Audit & Alignement",
            duration: "Semaine 1-2",
            description: "On analyse tout : data, contenu, audience. On définit ta North Star et on aligne la stratégie.",
            details: "Livrable : Roadmap stratégique et Brand Book."
        },
        {
            number: "02",
            title: "Production System",
            duration: "Mois 1",
            description: "On installe ton usine à contenu. Workflows, templates, équipe. Tu produis mieux, plus vite.",
            details: "Livrable : Pipeline de production opérationnel."
        },
        {
            number: "03",
            title: "Go-to-Market",
            duration: "Mois 2-3",
            description: "Lancement des offres et des formats phares. On active la monétisation et on optimise.",
            details: "Livrable : Premiers revenus et deals signés."
        },
        {
            number: "04",
            title: "Scale & Autonomie",
            duration: "Mois 6+",
            description: "On délègue, on automatise, on structure. Tu deviens un CEO, plus seulement un créateur.",
            details: "Livrable : Équipe autonome et business scalable."
        }
    ]
} as const;

export const TALENT_PROOF_STRIP = {
    id: "proof",
    title: "Pas de magie.",
    highlightWord: "Juste du travail.",
    subtitle: "On ne vend pas du rêve. On vend un système qui marche. Si tu appliques, ça fonctionne.",
    badges: ["Pas de frais cachés", "Liberté totale", "Support 7/7"],
    bullets: [
        "Un plan d'action clair dès le jour 1",
        "Des outils pros pour gagner du temps",
        "Un réseau de partenaires validés",
        "Une roadmap évolutive selon tes résultats"
    ]
} as const;

export const TALENT_OS_SYSTEM = {
    id: "os",
    title: "Wafia OS",
    highlightWord: "OS",
    subtitle: "Ton nouveau système d'exploitation.",
    description: "Tout ce dont tu as besoin pour gérer ta carrière, au même endroit.",
    items: [
        {
            title: "Centralisation",
            description: "Tous tes documents, contrats et factures au même endroit.",
            icon: "📂"
        },
        {
            title: "Planification",
            description: "Calendrier éditorial partagé et intelligent.",
            icon: "📅"
        },
        {
            title: "Tracking",
            description: "Suivi de tes performances et de tes revenus en temps réel.",
            icon: "📊"
        },
        {
            title: "Ressources",
            description: "Accès à toute la base de connaissance Wafia.",
            icon: "📚"
        }
    ],
    footer: "Disponible sur Desktop et Mobile."
} as const;

export const TALENT_SERVICES = {
    id: "services",
    title: "Services",
    subtitle: "Tout ce dont tu as besoin pour exploser.",
    services: [
        {
            id: "identity",
            number: "01",
            label: "Identité",
            headline: "Identité & Image",
            microDescription: "On clarifie ce que tu représentes et ce que tu refuses. Une image lisible, cohérente, qui attire les bons deals.",
            points: ["Positionnement (promesse simple + signature)", "Direction éditoriale (ton, sujets, limites)", "Cohérence visuelle (profil, thumbnails, univers)"],
            widget: "IdentityLens",
            icon: "🎯",
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
            label: "Contenu",
            headline: "Séries & Formats",
            microDescription: "On transforme ton talent en formats répétés. Plus de régularité, moins de stress.",
            points: ["Création de 2–3 séries principales", "Structures de vidéos (hooks, déroulé, chute)", "Banque d'idées (backlog vivant)"],
            widget: "SeriesFormats",
            icon: "📦",
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
            label: "Production",
            headline: "Workflow Production",
            microDescription: "On met un pipeline pro : idée → script → tournage → montage → QA → publication.",
            points: ["Routine hebdo (batching intelligent)", "Checklists (tournage, montage, upload, QA)", "Organisation fichiers + naming"],
            widget: "ProductionPipeline",
            icon: "⚙️",
            detail: {
                intro: "Le talent crée. Le workflow protège : qualité stable, délais tenus, moins de charge mentale.",
                whatWeDo: [
                    "Routine hebdo (batching intelligent)",
                    "Checklists (tournage, montage, upload, QA)",
                    "Organisation fichiers + naming",
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
            label: "Performance",
            headline: "Pilotage & KPIs",
            microDescription: "On pilote avec 5 KPIs max. Chaque semaine : Stop / Scale / Test.",
            points: ["Définition North Star", "KPIs par plateforme", "Revue hebdo (top 10 + analyse)"],
            widget: "KPIPulse",
            icon: "📊",
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
            label: "Business",
            headline: "Offres & Pricing",
            microDescription: "On structure ton business : 3 offres claires, un prix plancher, des options propres.",
            points: ["Packs (starter / standard / premium)", "Pricing plancher + conditions", "Encadrement des droits"],
            widget: "PricingOffers",
            icon: "💰",
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
            label: "Sales",
            headline: "Commercial & Deals",
            microDescription: "On filtre, on négocie, on suit. Tu prends les décisions — on gère la machine commerciale.",
            points: ["Filtrage (brand-fit, budget, red flags)", "Négociation (budget, livrables, droits)", "Suivi pipeline"],
            widget: "DealDesk",
            icon: "🤝",
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
            label: "Ops",
            headline: "Ops & Admin",
            microDescription: "On met l'administratif au carré : factures, relances, documents, organisation.",
            points: ["Centralisation docs", "Facturation + suivi paiements", "Organisation calendrier"],
            widget: "OpsHub",
            icon: "📋",
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
            label: "Events",
            headline: "Événementiel",
            microDescription: "On produit et on opère tes activations : logistique, coordination, captation.",
            points: ["Gestion booking / conditions", "Coordination terrain", "Production & captation"],
            widget: "EventEngine",
            icon: "🎪",
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
            label: "Formation",
            headline: "Autonomie",
            microDescription: "Tu comprends ce qu'on fait et pourquoi. Objectif : autonomie — pas dépendance.",
            points: ["Algorithmes & mécaniques plateformes", "Lecture analytics + décisions", "Négociation & protection"],
            widget: "Formation",
            icon: "🎓",
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

export const TALENT_PLATFORMS = {
    label: "Plateformes",
    title: "Domine tes",
    titleLine2: "réseaux.",
    subtitle: "Une stratégie adaptée à chaque écosystème.",
    cards: [
        {
            title: "Engagement",
            text: "On crée une relation forte avec ta communauté.",
            icon: "Heart",
            color: "text-pink-500"
        },
        {
            title: "Viralité",
            text: "On optimise tes contenus pour toucher les masses.",
            icon: "Activity",
            color: "text-violet-500"
        },
        {
            title: "Conversion",
            text: "On transforme l'attention en opportunités.",
            icon: "MessageCircle",
            color: "text-blue-500"
        }
    ]
} as const;


