import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Wafia | Talent Management & Stratégie Créateurs",
    description: "Passe pro sans te perdre. Management de talents, structure business et production studio pour créateurs, artistes et comédiens ambitieux.",
    keywords: ["talent management", "créateur", "artiste", "management musical", "influenceur", "carrière créateur"],
    openGraph: {
        title: "Wafia | Talent Management 2.0",
        description: "Tu crées. Nous on t'aide à construire autour. Sans te cramer. Sans vendre ton âme.",
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
        </>
    )
}
