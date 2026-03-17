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
