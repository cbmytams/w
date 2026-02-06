export type Status = "Live" | "En négociation" | "Soon" | "Direct" | "Premium" | "Partner" | "Partenaire" | "Access";
export type Speed = "Lent" | "Normal" | "Rapide" | "Instant";
export type AccessType = "Direct" | "Premium" | "Partner" | "Major" | "Access" | "Viral";

export interface PlatformMetrics {
    speed: string; // e.g. "24-48h"
    share: string; // e.g. "100%" or "80/20"
    geo: string; // e.g. "Monde"
    support: string; // e.g. "Dédié"
}

export interface Platform {
    id: string;
    name: string;
    logo: string;
    // mapped from "Reach" or specific logic in prompt
    reach?: string;
    status: Status;
    isLive: boolean;
    speed?: Speed;
    accessType?: AccessType;
    description?: string;
    metrics?: PlatformMetrics;
}

export interface SubCategory {
    id: string;
    label: string;
    platforms: Platform[];
}

export interface Category {
    id: string;
    label: string;
    subCategories: SubCategory[];
}
