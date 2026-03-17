/**
 * Données des widgets pour la section Deliverables
 * Reformulé pour être orienté bénéfices clients, pas features techniques
 */

import { Users, Play, TrendingUp, ShieldCheck, Zap, type LucideIcon } from "lucide-react"

// --- TYPES ---
export type WidgetId = 'casting' | 'content' | 'performance' | 'legal' | 'strategy'

export interface WidgetData {
    id: WidgetId
    colSpan: string
    title: string
    subtitle: string
    icon: LucideIcon
    color: string
    gradient: string
    content: string
    details: string[]
}

// --- DATA ---
export const WIDGETS: WidgetData[] = [
    {
        id: 'casting',
        colSpan: "lg:col-span-8",
        title: "Créateurs triés, pas trouvés sur Google",
        subtitle: "15k+ profils audités",
        icon: Users,
        color: "bg-blue-500",
        gradient: "from-blue-500 to-indigo-600",
        content: "On vous propose uniquement des créateurs qui matchent vos valeurs. Pas de surprise.",
        details: ["Fake follower check inclus", "Historique de collaboration vérifié", "Audience réellement alignée avec votre cible"]
    },
    {
        id: 'content',
        colSpan: "lg:col-span-4",
        title: "Des contenus réutilisables en Ads",
        subtitle: "Droits cédés 12 mois",
        icon: Play,
        color: "bg-orange-500",
        gradient: "from-orange-500 to-red-500",
        content: "Assets premium, authentiques, prêts à être boostés. Pas besoin de repayer.",
        details: ["Formats 9:16, 4:5, 1:1", "Visuels certifiés UGC", "DA cohérente avec votre marque"]
    },
    {
        id: 'performance',
        colSpan: "lg:col-span-4",
        title: "Votre ROI, visible à la seconde",
        subtitle: "Dashboard live 24/7",
        icon: TrendingUp,
        color: "bg-green-500",
        gradient: "from-emerald-400 to-green-600",
        content: "Chaque euro investi est tracé. Réagissez en 24h, pas en 3 semaines.",
        details: ["Vues, clics, CPV, CPM en temps réel", "Conversions trackées (pixel)", "Sentiment analysis IA"]
    },
    {
        id: 'legal',
        colSpan: "lg:col-span-4",
        title: "Zéro mauvaise surprise juridique",
        subtitle: "ARPP, RGPD, Brand Safety",
        icon: ShieldCheck,
        color: "bg-purple-500",
        gradient: "from-purple-500 to-pink-600",
        content: "Contrats signés, conformité vérifiée, whitelisting sécurisé. Vous êtes couverts.",
        details: ["Contrats talents 100% signés", "Conformité ARPP garantie", "Pas de profil à risque"]
    },
    {
        id: 'strategy',
        colSpan: "lg:col-span-4",
        title: "On vous dit quoi faire après",
        subtitle: "Playbook actionnable",
        icon: Zap,
        color: "bg-yellow-500",
        gradient: "from-amber-400 to-orange-500",
        content: "À la fin de chaque campagne, vous savez exactement comment scaler.",
        details: ["Recommandations concrètes", "Benchmarks vs concurrents", "Roadmap pour la suite"]
    }
] as const
