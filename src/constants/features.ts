import {
    BarChart3,
    FileVideo,
    FolderKanban,
    Play,
    ShieldCheck,
    TrendingUp,
    Users,
    type LucideIcon,
} from "lucide-react";

export type DashboardTabId = "campaign" | "creators" | "history";

type TrackingFeature = {
    id: string;
    icon: LucideIcon;
    title: string;
    badge: string;
    elsewhere: string[];
    wafia: string[];
};

type MockCreator = {
    name: string;
    reach: string;
    eng: string;
};

type MockCampaignHistory = {
    name: string;
    score: number;
};

type DeliverableAsset = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

// Features de suivi — Format "Avant/Après" pour différenciation
export const TRACKING_FEATURES: TrackingFeature[] = [
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
];

export const MOCK_CREATORS: MockCreator[] = [
    { name: "Lina Morel", reach: "420K", eng: "8.4%" },
    { name: "Noah Studio", reach: "280K", eng: "6.9%" },
    { name: "Maya Kern", reach: "610K", eng: "7.8%" },
    { name: "Enzo Motion", reach: "190K", eng: "9.1%" },
];

export const MOCK_CAMPAIGN_HISTORY: MockCampaignHistory[] = [
    { name: "Launch TikTok Q1", score: 91 },
    { name: "UGC Reels Retargeting", score: 84 },
    { name: "Creator Seeding FR", score: 77 },
];

export const DELIVERABLE_ASSETS: DeliverableAsset[] = [
    {
        icon: FileVideo,
        title: "Assets vidéos",
        desc: "UGC, cuts social-first et exports prêts à réutiliser en organique comme en paid.",
    },
    {
        icon: FolderKanban,
        title: "Base de campagne",
        desc: "Historique, statuts, validations et livrables centralisés dans une structure exploitable.",
    },
    {
        icon: ShieldCheck,
        title: "Cadre d'usage",
        desc: "Droits, conditions d'utilisation et éléments de conformité rangés avec les contenus.",
    },
];

// BarChart3 kept for potential future use in brand comparison charts
void BarChart3;
