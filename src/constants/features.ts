import { BarChart3, Users, TrendingUp, FileText, Database, FolderOpen, Target, BookOpen, UserCheck } from "lucide-react";

// Features du dashboard
export const DASHBOARD_FEATURES = [
    { icon: BarChart3, title: "KPIs utiles", desc: "Rétention, complétion, saves, shares/DM, trafic, conversions. Selon l'objectif." },
    { icon: Users, title: "Vue par créateur", desc: "Performance individuelle + écart vs benchmark de l'industrie." },
    { icon: TrendingUp, title: "Détection tendances", desc: "Ce qui monte, ce qui stagne, ce qui doit être ajusté." },
    { icon: FileText, title: "Comparatif historique", desc: "Campagne 1 vs Campagne 2 vs Campagne 3. On apprend." }
] as const;

// Assets livrables
export const DELIVERABLE_ASSETS = [
    { icon: Database, title: "Base créateurs activables", desc: "Noms, performances, affinités audience. Réutilisable." },
    { icon: FolderOpen, title: "Banque de contenus", desc: "Tous les contenus produits + droits d'utilisation clarifiés." },
    { icon: BarChart3, title: "Dashboard historique", desc: "Comparaison campagne vs campagne pour apprendre." },
    { icon: Target, title: "Lecture audience réelle", desc: "Pas de vanity metrics. Que des insights actionnables." },
    { icon: BookOpen, title: "Playbooks reproductibles", desc: "Ce qui marche, ce qu'on coupe, ce qu'on teste ensuite." },
    { icon: UserCheck, title: "Noyau d'ambassadeurs", desc: "Talents déjà validés pour vos campagnes futures." }
] as const;

// Onglets du dashboard
export const DASHBOARD_TABS = [
    { id: "campaign", label: "Vue campagne" },
    { id: "creators", label: "Vue créateurs" },
    { id: "history", label: "Historique" }
] as const;

// Données mockées pour le dashboard
export const MOCK_CREATORS = [
    { name: "@creator_1", reach: "450K", eng: "9.2%" },
    { name: "@creator_2", reach: "320K", eng: "7.8%" },
    { name: "@creator_3", reach: "180K", eng: "11.4%" }
] as const;

export const MOCK_CAMPAIGN_HISTORY = [
    { name: "Campagne 3 (actuelle)", score: 92 },
    { name: "Campagne 2", score: 78 },
    { name: "Campagne 1", score: 65 }
] as const;

export type DashboardTabId = typeof DASHBOARD_TABS[number]["id"];
