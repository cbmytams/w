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
