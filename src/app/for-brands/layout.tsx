import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Wafia | Campagnes d'Influence Marketing pour Marques",
    description: "Campagnes d'influence data-driven avec créateurs vérifiés. Dashboard live, assets réutilisables et ROI mesurable pour les marques ambitieuses.",
    keywords: ["influence marketing", "campagne influence", "créateurs", "UGC", "marques", "DNVB"],
    openGraph: {
        title: "Wafia | Influence Marketing pour Marques",
        description: "Le moteur de croissance des DNVB. Campagnes traçables et créateurs vérifiés.",
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
        </>
    )
}
