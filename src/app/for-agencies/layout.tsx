import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Wafia | Partenaire Influence pour Agences",
    description: "Sous-traitance clé-en-main ou renfort ponctuel pour agences. Casting, production et pilotage de vos campagnes d'influence.",
    keywords: ["agence influence", "partenariat B2B", "white label", "sous-traitance influence", "production créative"],
    openGraph: {
        title: "Wafia | Influence Marketing B2B pour Agences",
        description: "L'influence en sous-traitance. On s'occupe de tout, vous gardez la relation client.",
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
        </>
    )
}
