/**
 * Talent Journey — Phases du parcours
 */

interface PhaseConfig {
    id: string
    name: string
    label: string
    icon: string
    gradient: string
    borderColor: string
}

// Header
export const TALENT_JOURNEY_HEADER = {
    id: "journey",
    badge: "Parcours 3 ans",
    title: "Méthodologie",
    titleHighlight: "d'excellence",
    subtitle: "Précision, transparence, résultat. 🤝",
    signature: "Notre succès se mesure à votre indépendance."
} as const

// Phases Configuration
export const TALENT_JOURNEY_PHASES: PhaseConfig[] = [
    {
        id: "diagnostic",
        name: "DIAGNOSTIC",
        label: "Mois 0 → 1",
        icon: "Search",
        gradient: "from-violet-500 to-purple-500",
        borderColor: "border-violet-500"
    },
    {
        id: "foundation",
        name: "FONDATION",
        label: "Mois 1 → 3",
        icon: "Layers",
        gradient: "from-purple-500 to-fuchsia-500",
        borderColor: "border-purple-500"
    },
    {
        id: "growth",
        name: "CROISSANCE",
        label: "Mois 3 → 12",
        icon: "TrendingUp",
        gradient: "from-fuchsia-500 to-pink-500",
        borderColor: "border-fuchsia-500"
    },
    {
        id: "independence",
        name: "INDÉPENDANCE",
        label: "Mois 12 → 36",
        icon: "Crown",
        gradient: "from-amber-500 to-orange-500",
        borderColor: "border-amber-500"
    }
] as const
