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
    samples?: string[]
    showcase?: string[]
    comingSoon?: boolean
}

export const STUDIO_PRODUCTIONS: StudioProduction[] = [
    {
        id: "krh",
        name: "KRH",
        tagline: "Social-First Content Factory",
        description: "Contenus courts, dynamiques et optimisés pour la conversion TikTok/Reels.",
        longDescription: "L'internet va trop vite pour les méthodes traditionnelles. KRH est notre unité de réponse rapide conçue pour la culture Gen Z. Nous produisons, montons et diffusons des assets verticaux (9:16) haute performance pendant que vos concurrents font encore des réunions de pré-prod. Transformez l'attention organique en acquisition client.",
        icon: Zap,
        color: "bg-yellow-400",
        gradient: "from-yellow-400 to-orange-500",
        tags: ["Short-form", "Viral", "Gen Z"],
        stats: [
            { label: "Assets / mois", value: "150+" },
            { label: "Avg. ROAS", value: "3.2x" },
            { label: "Turnaround", value: "48h" }
        ],
        services: ["TikTok & Reels Creation", "Trend Jacking", "UGC Editing", "Motion Design Express"],
        samples: [
            "/studio/krh/1%20-%20KRH.MP4",
            "/studio/krh/2%20-%20KRH.MP4",
            "/studio/krh/3%20-%20KRH.MP4"
        ],
        showcase: [
            "/studio/krh/noah-basic-fit-vf.mp4",
            "/studio/krh/basic-fit-redha-vf.mp4",
            "/studio/krh/ana-basic-fit-vf.mp4",
            "/studio/krh/shayna-basic-fit-vf.mp4"
        ]
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
        services: ["Brand Films", "TV Commercials", "Documentary", "High-end Post-production"],
        comingSoon: true
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
        services: ["Event Coverage", "Broadcast Multi-cam", "Live Shopping", "Same-day Edits"],
        comingSoon: true
    }
]
