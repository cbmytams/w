import { Clapperboard, Zap, Aperture, type LucideIcon } from "lucide-react"

export interface StudioProduction {
    id: string
    name: string
    tagline: string
    description: string
    longDescription: string
    icon: LucideIcon
    color: string
    gradient: string
    tags: string[]
    stats: { label: string; value: string }[]
    services: string[]
}

export const STUDIO_PRODUCTIONS: StudioProduction[] = [
    {
        id: "neon",
        name: "NEON",
        tagline: "Social-First Content Factory",
        description: "Contenus courts, dynamiques et optimisés pour la viralité TikTok/Reels.",
        longDescription: "NEON est notre unité dédiée à la rapidité et à la culture internet. Nous produisons des assets verticaux (9:16) qui captent l'attention en moins de 3 secondes. Idéal pour les lancements produits, les challenges et le brand content quotidien.",
        icon: Zap,
        color: "bg-yellow-400",
        gradient: "from-yellow-400 to-orange-500",
        tags: ["Short-form", "Viral", "Gen Z"],
        stats: [
            { label: "Assets / mois", value: "150+" },
            { label: "Avg. Engagement", value: "8.5%" },
            { label: "Turnaround", value: "48h" }
        ],
        services: ["TikTok & Reels Creation", "Trend Jacking", "UGC Editing", "Motion Design Express"]
    },
    {
        id: "lumen",
        name: "LUMEN",
        tagline: "High-End Cinematography",
        description: "Publicités TVC, Brand Movies et storytelling visuel premium.",
        longDescription: "LUMEN apporte l'exigence du cinéma à votre marque. Équipes de tournages complètes, caméras RED/Arri, étalonnage cinéma... Nous créons les pièces maîtresses de votre communication, celles qui définissent votre image de marque pour les années à venir.",
        icon: Aperture,
        color: "bg-blue-500",
        gradient: "from-blue-600 to-cyan-400",
        tags: ["Cinema", "TVC", "Premium"],
        stats: [
            { label: "Awards", value: "12" },
            { label: "Qualité", value: "8K Red" },
            { label: "Crew Size", value: "10-50" }
        ],
        services: ["Brand Films", "TV Commercials", "Documentary", "High-end Post-production"]
    },
    {
        id: "aura",
        name: "AURA",
        tagline: "Live & Experiential",
        description: "Captation événementielle, Livestreams et expériences immersives.",
        longDescription: "AURA capture l'instant. De la Fashion Week aux lancements de produits exclusifs, nos équipes mobiles sont partout. Nous transformons vos événements physiques en résonance numérique mondiale grâce à des livestreams interactifs et des aftermovies instantanés.",
        icon: Clapperboard,
        color: "bg-purple-500",
        gradient: "from-purple-600 to-pink-500",
        tags: ["Event", "Live", "Hybrid"],
        stats: [
            { label: "Events / an", value: "45" },
            { label: "Audience Live", value: "1M+" },
            { label: "Réactivité", value: "Real-time" }
        ],
        services: ["Event Coverage", "Broadcast Multi-cam", "Live Shopping", "Same-day Edits"]
    }
]
