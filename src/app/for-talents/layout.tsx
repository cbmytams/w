import type { Metadata } from "next"
import { siteConfig, sitePaths } from "@/lib/site"
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data"
import { TALENT_FAQ } from "@/constants"

export const metadata: Metadata = {
    title: "Talent Management & Stratégie Créateurs",
    description: "Passe pro sans te perdre. Management de talents, structure business et production studio pour créateurs, artistes et comédiens ambitieux.",
    keywords: ["talent management", "créateur", "artiste", "management musical", "influenceur", "carrière créateur"],
    alternates: {
        canonical: sitePaths.forTalents,
    },
    openGraph: {
        title: "Wafia | Talent Management & Accompagnement Créateurs",
        description: "Management de talents, structure business et production studio pour créateurs, artistes et comédiens. Accompagnement 360° par Wafia.",
        url: sitePaths.forTalents,
        siteName: siteConfig.name,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Wafia | Talent Management & Accompagnement Créateurs",
        description: "Management de talents, structure business et production studio pour créateurs, artistes et comédiens. Accompagnement 360° par Wafia."
    }
}

export default function TalentsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema([
                            { name: "Accueil", url: new URL(sitePaths.home, siteConfig.url).toString() },
                            { name: "Talents", url: new URL(sitePaths.forTalents, siteConfig.url).toString() },
                        ])
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema([...TALENT_FAQ])) }}
            />
        </>
    )
}
