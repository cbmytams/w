export * from "./talent-blocks/core";
export * from "./talent-blocks/faq";
export * from "./talent-blocks/persona";
export * from "./talent-blocks/deliverables";
export * from "./talent-blocks/services";
export * from "./talent-blocks/timeline";
export * from "./talent-blocks/method";
export * from "./talent-blocks/proof";
export * from "./talent-blocks/os";

// Not exporting everything from old talent-blocks.ts to keep the barrel clean
export const TALENT_NAVIGATION = [
    { href: "#deliverables", label: "Services" },
    { href: "#journey", label: "Méthode" },
    { href: "#faq", label: "FAQ" }
] as const;

// Not extracting this tiny platform block into a dedicated file since it's the only one left
export const TALENT_PLATFORMS = {
    label: "Centralisation",
    title: "On centralise",
    titleLine2: "tout au même endroit.",
    subtitle: "Votre roadmap sur une seule plateforme.",
    items: [
        { name: "Briefs & Contrats", icon: "FileText" },
        { name: "Validation", icon: "CheckSquare" },
        { name: "Statistiques", icon: "LineChart" },
        { name: "Ops & Admin", icon: "Archive" }
    ],
    cards: [
        { title: "Visibilité", text: "Suivi en temps réel de vos performances sur toutes vos plateformes.", icon: "Activity", color: "text-pink-500" },
        { title: "Engagement", text: "Analyse de l'engagement de votre communauté et recommandations stratégiques.", icon: "Heart", color: "text-red-500" },
        { title: "Communication", text: "Central de messages pour gérer toutes vos conversations professionnelles.", icon: "MessageCircle", color: "text-blue-500" }
    ]
} as const;
