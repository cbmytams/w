import { BarChart3, Users, TrendingUp, Play } from "lucide-react";

// Features de suivi — Format "Avant/Après" pour différenciation
export const TRACKING_FEATURES = [
    {
        id: "talents",
        icon: Users,
        title: "Suivi Créateurs",
        badge: "Temps réel",
        elsewhere: [
            "Reporting mensuel manuel",
            "Pas de benchmark"
        ],
        wafia: [
            "Dashboard live par créateur",
            "Scoring + benchmark industrie",
            "Historique de collaboration",
            "Alertes proactives"
        ]
    },
    {
        id: "content",
        icon: Play,
        title: "Performance Contenu",
        badge: "IA-powered",
        elsewhere: [
            "Comptage likes/vues",
            "Analyse post-campagne"
        ],
        wafia: [
            "Rétention, complétion, saves",
            "Détection formats surperformants",
            "Recommandations créatives",
            "Optimisation en continu"
        ]
    },
    {
        id: "roi",
        icon: TrendingUp,
        title: "Reporting & Impact",
        badge: "Dashboard Live",
        elsewhere: [
            "PDF statique mensuel",
            "Vanity metrics uniquement"
        ],
        wafia: [
            "KPIs alignés sur votre North Star",
            "ROI incrémental mesuré",
            "Comparatifs multi-campagnes",
            "Insights stratégiques automatisés"
        ]
    }
] as const;

// BarChart3 kept for potential future use in brand comparison charts
void BarChart3;
