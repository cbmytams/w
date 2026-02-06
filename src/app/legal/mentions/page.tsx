import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { siteConfig, sitePaths } from "@/lib/site"

export const metadata: Metadata = {
    title: "Mentions légales",
    description: "Informations légales et éditoriales du site Wafia.",
    alternates: {
        canonical: sitePaths.legalMentions,
    },
    openGraph: {
        title: "Mentions légales | Wafia",
        description: "Informations légales et éditoriales du site Wafia.",
        url: sitePaths.legalMentions,
        siteName: siteConfig.name,
        type: "article",
    },
}

export default function MentionsLegales() {
    return (
        <main id="main-content" className="py-24 bg-white">
            <Container className="prose prose-slate max-w-3xl mx-auto">
                <h1>Mentions Légales</h1>
                <h2>Éditeur du site</h2>
                <p>
                    Wafia Agency<br />
                    SAS au capital de 1000€<br />
                    RCS Paris B 123 456 789<br />
                    Siège social : [Adresse Wafia]<br />
                    Directeur de la publication : Sasha
                </p>

                <h2>Hébergement</h2>
                <p>
                    Vercel Inc.<br />
                    440 N Barranca Ave #4133<br />
                    Covina, CA 91723<br />
                    United States
                </p>

                <h2>Propriété intellectuelle</h2>
                <p>
                    L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                </p>
            </Container>
        </main>
    )
}
