export * from "./talent-blocks/core";
export * from "./talent-blocks/faq";
export * from "./talent-blocks/persona";
export * from "./talent-blocks/deliverables";
export * from "./talent-blocks/services";

// Not exporting everything from old talent-blocks.ts to keep the barrel clean
export const TALENT_NAVIGATION = [
    { href: "#deliverables", label: "Services" },
    { href: "#journey", label: "Méthode" },
    { href: "#faq", label: "FAQ" }
] as const;

// Legacy compatibility exports (kept to avoid breaking older imports)
export const TALENT_TIMELINE = [] as const;
export const TALENT_METHOD = [] as const;
export const TALENT_PLATFORMS = [] as const;
export const TALENT_PROOF_STRIP = [] as const;
export const TALENT_OS_SYSTEM = [] as const;
