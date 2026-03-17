// Étapes du process d'accompagnement
export const PROCESS_STEPS = [
    {
        num: "01",
        title: "Audit & cadrage",
        deliverable: "Doc de cadrage validé",
        points: [
            "Session stratégique (1h30) : objectifs business, contraintes, timing",
            "Audit de l'existant : ce qui a marché/raté avant",
            "Définition KPIs : on ne suit QUE ce qui sert vos décisions",
            "Brand safety map : tonalités acceptées/refusées, sujets sensibles",
            "Budget allocation : casting, prod, amplification",
            "Timing : Idéal 4–6 semaines. Urgence ? On sait sortir vite.",
            "Première campagne ? On vous guide de A à Z."
        ]
    },
    {
        num: "02",
        title: "Concept & casting",
        deliverable: "Shortlist documentée + Brief créatif",
        points: [
            "Shortlist claire et argumentée (critères explicites)",
            "Plan de contenus aligné plateformes",
            "Validation brand safety + audience fit",
            "Brief créatif détaillé pour chaque créateur",
            "Timeline de production validée",
            "Casting validé ensemble : on recommande, vous validez, on tranche ensemble"
        ]
    },
    {
        num: "03",
        title: "Production & exécution",
        deliverable: "Contenus validés + Planning ops",
        points: [
            "Gestion création (DA, scripts, tournages)",
            "Validations clients à chaque étape",
            "Coordination talents (deadlines, retouches)",
            "Conformité légale (mentions, droits, ARPP)",
            "Planning de diffusion optimisé"
        ]
    },
    {
        num: "04",
        title: "Pilotage & optimisation",
        deliverable: "Dashboard live 24/7",
        points: [
            "Suivi live des performances (24h/48h/7j)",
            "Identification rapide des formats qui fonctionnent",
            "Ajustements en cours de route si nécessaire",
            "Veille sentiment communauté (positif/négatif)",
            "Modération et protection marque si besoin"
        ]
    },
    {
        num: "05",
        title: "Reporting & roadmap",
        deliverable: "Playbook + Roadmap",
        points: [
            "Synthèse actionnable (ce qui a marché, pourquoi)",
            "Comparaison vs objectifs et vs benchmark",
            "Recommandations pour scaler",
            "Plan d'activation suivant",
            "Base de données créateurs enrichie"
        ]
    }
] as const;
