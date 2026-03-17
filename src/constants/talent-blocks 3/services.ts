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
