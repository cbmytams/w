import type { Metadata } from "next"
import { siteConfig, sitePaths } from "@/lib/site"
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data"
import { TALENT_FAQ } from "@/constants"

export const metadata: Metadata = {
    title: "Wafia | Talent Management & Stratégie Créateurs",
    description: "Passe pro sans te perdre. Management de talents, structure business et production studio pour créateurs, artistes et comédiens ambitieux.",
    keywords: ["talent management", "créateur", "artiste", "management musical", "influenceur", "carrière créateur"],
    alternates: {
        canonical: sitePaths.forTalents,
    },
    openGraph: {
        title: "Wafia | Talent Management 2.0",
        description: "Tu crées. Nous on t'aide à construire autour. Sans te cramer. Sans vendre ton âme.",
        url: sitePaths.forTalents,
        siteName: siteConfig.name,
        type: "website",
    },
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
