import type { Metadata } from "next"
import { siteConfig, sitePaths } from "@/lib/site"
import { breadcrumbSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
    title: "Wafia | Partenaire Influence pour Agences",
    description: "Sous-traitance clé-en-main ou renfort ponctuel pour agences. Casting, production et pilotage de vos campagnes d'influence.",
    keywords: ["agence influence", "partenariat B2B", "white label", "sous-traitance influence", "production créative"],
    alternates: {
        canonical: sitePaths.forAgencies,
    },
    openGraph: {
        title: "Wafia | Influence Marketing B2B pour Agences",
        description: "L'influence en sous-traitance. On s'occupe de tout, vous gardez la relation client.",
        url: sitePaths.forAgencies,
        siteName: siteConfig.name,
        type: "website",
    },
}

export default function AgenciesLayout({
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
                            { name: "Agences", url: new URL(sitePaths.forAgencies, siteConfig.url).toString() },
                        ])
                    ),
                }}
            />
        </>
    )
}
