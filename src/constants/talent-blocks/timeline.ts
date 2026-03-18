export const TALENT_TIMELINE = {
    id: "journey",
    title: "Un parcours en",
    highlightWord: "3 phases",
    subtitle: "De la structuration à l'autonomie. On construit avec vous, pas à votre place.",
    signature: "Objectif final : vous n'avez plus besoin de nous.",
    phases: [
        {
            id: "phase1",
            name: "Phase 1 : Fondation",
            objective: "Poser les bases",
            duration: "Mois 1-3",
            actions: ["Audit complet", "Définition de l'identité", "Mise en place du workflow"],
            deliverables: ["Charte éditoriale", "Pack profils", "3 premiers concepts"],
            exitCriteria: "Identité claire et pipeline de production actif."
        },
        {
            id: "phase2",
            name: "Phase 2 : Accélération",
            objective: "Créer la dynamique",
            duration: "Mois 4-12",
            actions: ["Production régulière", "Optimisation des formats", "Premiers deals"],
            deliverables: ["Séries récurrentes", "Media Kit", "Contrats signés"],
            exitCriteria: "Audience en croissance et premiers revenus solides."
        },
        {
            id: "phase3",
            name: "Phase 3 : Scale",
            objective: "Consolider et déléguer",
            duration: "Année 2+",
            actions: ["Diversification des revenus", "Recrutement d'équipe", "Nouveaux canaux"],
            deliverables: ["Produits propres", "Équipe autonome", "Modèle économique pérenne"],
            exitCriteria: "Activité rentable, structurée, indépendante."
        }
    ]
} as const;
