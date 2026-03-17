import type { Metadata } from "next"
import { sitePaths, siteConfig } from "@/lib/site"
import { TalentsClient } from "@/components/talents/TalentsClient"

export const metadata: Metadata = {
    title: "Nos Talents",
    description: "Découvrez les créateurs Wafia : lifestyle, tech, food, sport. Une sélection authentique, brand-safe et documentée.",
    alternates: {
        canonical: sitePaths.forTalents,
    },
    openGraph: {
        title: "Nos Talents | Wafia",
        description: "Découvrez les créateurs Wafia : lifestyle, tech, food, sport. Une sélection authentique, brand-safe et documentée.",
        url: sitePaths.forTalents,
        siteName: siteConfig.name,
        type: "website",
    },
}

export default function TalentsPage() {
    return <TalentsClient />
}
