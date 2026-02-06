import type { Metadata } from "next"
import { siteConfig, sitePaths } from "@/lib/site"
import { breadcrumbSchema, faqSchema } from "@/lib/structured-data"
import { FAQ_ITEMS } from "@/constants"

export const metadata: Metadata = {
    title: "Wafia | Campagnes d'Influence Marketing pour Marques",
    description: "Campagnes d'influence data-driven avec créateurs vérifiés. Dashboard live, assets réutilisables et ROI mesurable pour les marques ambitieuses.",
    keywords: ["influence marketing", "campagne influence", "créateurs", "UGC", "marques", "DNVB"],
    alternates: {
        canonical: sitePaths.forBrands,
    },
    openGraph: {
        title: "Wafia | Influence Marketing pour Marques",
        description: "Le moteur de croissance des DNVB. Campagnes traçables et créateurs vérifiés.",
        url: sitePaths.forBrands,
        siteName: siteConfig.name,
        type: "website",
    },
}

export default function BrandsLayout({
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
                            { name: "Marques", url: new URL(sitePaths.forBrands, siteConfig.url).toString() },
                        ])
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema([...FAQ_ITEMS])) }}
            />
        </>
    )
}
