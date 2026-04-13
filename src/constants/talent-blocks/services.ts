export const TALENT_SERVICES = {
  id: "services",
  title: "Services",
  subtitle: "L'infrastructure complète pour bâtir une institution.",
  services: [
    {
      id: "identity",
      number: "01",
      label: "Identité",
      headline: "Identité & Image",
      microDescription:
        "Nous clarifions votre positionnement. Une image lisible et cohérente qui attire les partenariats stratégiques.",
      points: [
        "Positionnement (promesse simple + signature)",
        "Direction éditoriale (ton, sujets, limites)",
        "Design system visuel (profil, thumbnails, univers)",
      ],
      widget: "IdentityLens",
      icon: "🎯",
      detail: {
        intro:
          "Une identité affirmée fait gagner du temps sur chaque décision : contenu, collaborations, trajectoire. C'est l'architecture de base.",
        whatWeDo: [
          "Positionnement (promesse simple + signature)",
          "Direction éditoriale (ton, sujets, limites)",
          "Cohérence visuelle (profil, thumbnails, univers)",
          "Brand-fit (marques alignées / à éviter)",
          "Storytelling (narration, arcs, crédibilité)",
        ],
        deliverables: [
          "1 phrase de positionnement + règles de ton",
          '"Brand map" : thèmes OK / KO + mots-clés',
          "Check-list visuelle (profil, cover, highlights, thumbnails)",
          "Mini-charte (codes, couleurs, rythme, sous-titres)",
          "Liste brand-fit + pricing de base (plancher)",
        ],
        howItWorks: [
          {
            step: "Audit express",
            description: "profil + contenus + perception audience",
          },
          { step: "Reco & alignement", description: "validation rapide" },
          { step: "Mise en place", description: "pack profil + guidelines" },
        ],
        forWho:
          "Pour les créateurs qui exigent d'être lisibles et crédibles, sans dénaturer leur essence.",
      },
    },
    {
      id: "series",
      number: "02",
      label: "Contenu",
      headline: "Séries & Formats",
      microDescription:
        "Nous transformons votre talent en formats pérennes. Une régularité absolue, la charge mentale en moins.",
      points: [
        "Création de 2–3 séries phares",
        "Structures narratives (hooks, déroulé, rétention)",
        "Banque d'idées (backlog vivant)",
      ],
      widget: "SeriesFormats",
      icon: "📦",
      detail: {
        intro:
          "Les séries forgent la fidélité de l'audience. Les formats structurés rendent la production fluide et prédictible.",
        whatWeDo: [
          "Création de 2–3 séries principales (promesse claire)",
          "Structures de vidéos (hooks, déroulé, chute)",
          "Banque d'idées (backlog vivant)",
          '"Signature" (angle, style, rythme)',
          "Variantes (même idée, différentes exécutions)",
        ],
        deliverables: [
          "3 séries prêtes + template de script",
          "30–60 idées classées par série",
          "10 hooks testés (versions courtes)",
          '"Format bible" (durée, rythme, plans, CTA)',
          "Plan de publication simple (cadence réaliste)",
        ],
        howItWorks: [
          {
            step: "Analyse de tes tops & de ton public",
            description: "ce qui marche déjà",
          },
          { step: "Design des séries", description: "promesse + répétabilité" },
          { step: "Backlog + templates", description: "prêt à tourner" },
        ],
        forWho:
          "Pour les esprits créatifs exigeant un système clair sans jamais s'éparpiller.",
      },
    },
    {
      id: "workflow",
      number: "03",
      label: "Production",
      headline: "Workflow Production",
      microDescription:
        "Mise en place d'un pipeline professionnel : idéation → script → tournage → post-production → QA → publication.",
      points: [
        "Routines de batching intelligentes",
        "Process de QA (tournage, montage, upload)",
        "Sécurisation et structuration data",
      ],
      widget: "ProductionPipeline",
      icon: "⚙️",
      detail: {
        intro:
          "Le créateur innove, l'infrastructure exécute. Un workflow solide garantit une qualité constante et absorbe la charge mentale.",
        whatWeDo: [
          "Routine hebdo (batching intelligent)",
          "Checklists (tournage, montage, upload, QA)",
          "Organisation fichiers + naming",
          "Process validation (si équipe)",
          "Optimisation temps (recyclage, presets, templates)",
        ],
        deliverables: [
          "SOP 1 page (workflow complet)",
          "Checklists prêtes (Notion/Sheets)",
          "Arborescence drive + règles de nommage",
          "Presets sous-titres / export / formats",
          'Plan "1 contenu → 3 variations" (repurpose)',
        ],
        howItWorks: [
          {
            step: "On observe ta manière de produire",
            description: "diagnostic workflow actuel",
          },
          {
            step: "On supprime les frictions",
            description: "bottlenecks identifiés",
          },
          {
            step: "On installe un workflow simple et durable",
            description: "SOPs + templates",
          },
        ],
        forWho:
          "Pour les créateurs cherchant l'hyper-régularité sans sacrifier leur vision.",
      },
    },
    {
      id: "kpis",
      number: "04",
      label: "Performance",
      headline: "Pilotage & KPIs",
      microDescription:
        "Nous pilotons votre trajectoire par la data. Chaque semaine : itération, mise à l'échelle ou suppression.",
      points: [
        "Définition de la North Star Metric",
        "KPIs qualifiés par plateforme",
        "Revues analytiques hebdomadaires",
      ],
      widget: "KPIPulse",
      icon: "📊",
      detail: {
        intro:
          "L'intuition démarre la dynamique, la data la pérennise. Le pilotage transforme l'aléatoire en croissance construite.",
        whatWeDo: [
          "Définition North Star (objectif principal)",
          "KPIs par plateforme (seuils minimums)",
          "Revue hebdo (top 10 + analyse)",
          "Plan de tests (1 variable à la fois)",
          "Journal de learnings (ce qui marche / pourquoi)",
        ],
        deliverables: [
          "Dashboard simple (hebdo)",
          "Seuils KPIs + alertes (quoi surveiller)",
          "Template Stop/Scale/Test",
          "Backlog de tests (hooks, durées, montage, sujets)",
          '"Playbook perso" basé sur tes données',
        ],
        howItWorks: [
          {
            step: "On choisit tes KPIs et tes seuils",
            description: "5 max, pas 50",
          },
          {
            step: "On installe le rituel hebdo",
            description: "15 min top chrono",
          },
          {
            step: "On itère jusqu'à stabiliser la perf",
            description: "amélioration continue",
          },
        ],
        forWho:
          "Pour les créateurs analytiques souhaitant des métriques d'aide à la décision claires.",
      },
    },
    {
      id: "pricing",
      number: "05",
      label: "Business",
      headline: "Offres & Pricing",
      microDescription:
        "Nous structurons vos flux financiers : 3 offres intégrées, une grille tarifaire plancher, et un encadrement des conditions.",
      points: [
        "Création de packages (starter / standard / premium)",
        "Grille tarifaire plancher + conditions",
        "Encadrement strict des droits d'exploitation",
      ],
      widget: "PricingOffers",
      icon: "💰",
      detail: {
        intro:
          "Une offre lisible réduit les frictions de négociation et filtre naturellement les partenariats non pertinents.",
        whatWeDo: [
          "Packs (starter / standard / premium)",
          "Pricing plancher + conditions",
          "Encadrement des droits (usage, durée, ads)",
          "Add-ons (UGC, whitelisting, exclusivité, multi-plateforme)",
          "Positionnement commercial (ce que tu vends vraiment)",
        ],
        deliverables: [
          "3 packs + rate card light",
          "Grille droits (usage / durée / territoires)",
          'Liste "non négociables"',
          "Template devis + template briefing",
          "Argumentaire simple (pourquoi ce prix)",
        ],
        howItWorks: [
          {
            step: "On clarifie ton offre",
            description: "valeur + effort réel",
          },
          {
            step: "On fixe un plancher et des règles",
            description: "jamais en dessous",
          },
          {
            step: "On met tout en templates",
            description: "zéro improvisation",
          },
        ],
        forWho:
          "Pour les créateurs qui souhaitent sécuriser leur valeur financière avec des arguments fiables.",
      },
    },
    {
      id: "deals",
      number: "06",
      label: "Sales",
      headline: "Commercial & Deals",
      microDescription:
        "Nous filtrons, négocions et pilotons les contrats. Vous maîtrisez la décision finale, nous sécurisons l'exécution commerciale.",
      points: [
        "Filtrage préliminaire (brand-fit, budget, risques)",
        "Négociation intégrale (budget, livrables, droits)",
        "Suivi du pipeline et relances",
      ],
      widget: "DealDesk",
      icon: "🤝",
      detail: {
        intro:
          "L'objectif d'une agence premium n'est pas d'accumuler les requêtes, mais de filtrer celles qui valorisent son talent.",
        whatWeDo: [
          "Filtrage (brand-fit, budget, red flags)",
          "Négociation (budget, livrables, droits, timing)",
          "Gestion briefs / retours / validations",
          "Suivi pipeline (relances, statut, deadlines)",
          "Relation long-terme (ambassadorship > one-shots)",
        ],
        deliverables: [
          "Pipeline deals (statuts + next actions)",
          "Templates mails / DM / relances",
          "Checklist négociation (points à cadrer)",
          'Pack "brief" (questions obligatoires)',
          '"Deal recap" avant validation (clair, 1 page)',
        ],
        howItWorks: [
          {
            step: "On installe le filtre",
            description: "ce qu'on accepte / refuse",
          },
          {
            step: "On gère la négo + le suivi",
            description: "tu valides, on exécute",
          },
          {
            step: "Tu valides sur une synthèse courte",
            description: "décision éclairée, rapide",
          },
        ],
        forWho:
          "Pour ceux qui exigent des deals prestigieux et alignés avec leur image de marque.",
      },
    },
    {
      id: "ops",
      number: "07",
      label: "Ops",
      headline: "Ops & Admin",
      microDescription:
        "Nous reprenons la gestion administrative globale : conformité, factures, recouvrement, organisation documentaire.",
      points: [
        "Centralisation des contrats et briefs",
        "Systématisation des factures et suivi paiements",
        "Organisation fine de l'agenda global",
      ],
      widget: "OpsHub",
      icon: "📋",
      detail: {
        intro:
          "La rigueur opérationnelle est l'atout invisible qui sécurise durablement les relations avec les marques.",
        whatWeDo: [
          "Centralisation docs (contrats, briefs, factures)",
          "Facturation + suivi paiements + relances",
          "Organisation calendrier (contenu + commercial)",
          "Process validation (délais, responsabilités)",
          'Mise en ordre "pro" (emails, signatures, dossiers)',
        ],
        deliverables: [
          "Templates facture / relance / recap",
          "Dossier partagé structuré (arbo)",
          "Checklists admin (par opération)",
          "Calendrier type (hebdo / mensuel)",
          '"Ops board" (statuts, deadlines, ownership)',
        ],
        howItWorks: [
          {
            step: "On nettoie et on centralise",
            description: "tout au même endroit",
          },
          { step: "On met des templates", description: "actions répétables" },
          {
            step: "On suit avec un board simple",
            description: "visibilité totale",
          },
        ],
        forWho:
          "Pour ceux nécessitant une infrastructure impénétrable et d'une fiabilité absolue.",
      },
    },
    {
      id: "events",
      number: "08",
      label: "Events",
      headline: "Événementiel",
      microDescription:
        "Nous orchestrons vos activations terrain : logistique, coordination de production, et captation de contenu.",
      points: [
        "Contractualisation et booking",
        "Coordination des équipes sur le terrain",
        "Production intégrale des captations",
      ],
      widget: "EventEngine",
      icon: "🎪",
      detail: {
        intro:
          "Une activation événementielle parfaitement orchestrée devient un atout pour votre image et vos revenus. L'improvisation n'a pas sa place.",
        whatWeDo: [
          "Gestion booking / conditions / planning",
          "Coordination terrain (équipes, timings, livrables)",
          "Production & captation (social-first + récap)",
          "Gestion droits & image (cadre propre)",
          "Post-event : montage, recap, distribution",
        ],
        deliverables: [
          "Template booking + conditions minimales",
          "Checklist terrain (avant / pendant / après)",
          "Plan de contenu event (stories, vlog, recap, photos)",
          "Dossier de prod (timing, contact, contraintes)",
          "Recap final + assets livrables",
        ],
        howItWorks: [
          {
            step: "On cadre l'opération",
            description: "conditions + plan détaillé",
          },
          { step: "On opère sur le terrain", description: "prod + logistique" },
          { step: "On sort le contenu", description: "recap + distribution" },
        ],
        forWho:
          "Pour les créateurs qui souhaitent des activations physiques aux standards d'une production premium.",
      },
    },
    {
      id: "formation",
      number: "09",
      label: "Formation",
      headline: "Autonomie",
      microDescription:
        "Nous vous transmettons l'expertise. Objectif final : faire de vous l'unique maître structuré de votre carrière.",
      points: [
        "Maîtrise fondamentale des algorithmes",
        "Interprétation de la data pour décisions rapides",
        "Bases de la négociation et sécurisation juridique",
      ],
      widget: "Formation",
      icon: "🎓",
      detail: {
        intro:
          "Transférer l'expertise à nos talents, c'est leur garantir la possibilité d'une influence saine et durable.",
        whatWeDo: [
          "Algorithmes & mécaniques plateformes",
          "Lecture analytics + décisions",
          "Négociation & protection (droits, usages, red flags)",
          "Organisation & workflow (durable)",
          "Montée en compétences équipe (si besoin)",
        ],
        deliverables: [
          "Modules wacademy (par niveau)",
          "Cheatsheets : KPIs, hooks, pricing, red flags",
          "Rituels hebdo (pilotage + production)",
          "Templates (briefs, négo, ops)",
          "Plan d'autonomie (ce que tu gères seul)",
        ],
        howItWorks: [
          {
            step: "On identifie ton niveau et tes gaps",
            description: "diagnostic rapide",
          },
          {
            step: "On forme en pratique",
            description: "cas réels, zéro théorie",
          },
          {
            step: "On transfère les process",
            description: "autonomie progressive",
          },
        ],
        forWho:
          "Pour les créateurs désirant acquérir les clés pour piloter stratégiquement une longue carrière.",
      },
    },
  ],
} as const;
