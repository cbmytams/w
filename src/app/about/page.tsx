import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig, sitePaths } from "@/lib/site"
import { breadcrumbSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
    title: "À propos",
    description:
        "Découvrez la vision Wafia : transparence, rigueur et créativité pour des campagnes d'influence traçables.",
    alternates: {
        canonical: sitePaths.about,
    },
    openGraph: {
        title: "À propos | Wafia",
        description:
            "Découvrez la vision Wafia : transparence, rigueur et créativité pour des campagnes d'influence traçables.",
        url: sitePaths.about,
        siteName: siteConfig.name,
        type: "website",
    },
}

export default function AboutPage() {
    return (
        <main id="main-content" className="py-24 bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema([
                            { name: "Accueil", url: new URL(sitePaths.home, siteConfig.url).toString() },
                            { name: "À propos", url: new URL(sitePaths.about, siteConfig.url).toString() },
                        ])
                    ),
                }}
            />
            <Container>
                {/* Intro */}
                <div className="max-w-4xl mx-auto mb-24 text-center lg:text-left">
                    <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl mb-8 text-slate-900">
                        L&apos;influence ne devrait pas être une boîte noire.
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                        Wafia est née d&apos;un constat simple : les marques veulent de la performance, les talents veulent de la structure, et tout le monde veut plus de transparence.
                    </p>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Nous sommes une agence hybride. Moitié Studio Créatif, Moitié Opérateurs Techniques. Nous utilisons la technologie pour fluidifier les process, mais nous croyons que la valeur finale reste fondamentalement humaine.
                    </p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        { title: "Rigueur & Standards", text: "Nous appliquons les méthodes du conseil au monde de la créativité. Deadlines respectées, livrables carrés." },
                        { title: "Éthique & Compliance", text: "Pas de zones grises. Nous sommes à jour sur l'ARPP, le RGPD et le DSA. Vos campagnes sont Brand Safe." },
                        { title: "Humain > Algo", text: "L'IA est un outil formidable pour scaler, mais c'est l'émotion humaine qui vend." }
                    ].map((val, i) => (
                        <Card key={i} className="bg-slate-50 border-none">
                            <CardContent className="pt-6">
                                <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">{val.title}</h3>
                                <p className="text-slate-600">{val.text}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Team / Contact */}
                <div className="bg-slate-900 rounded-2xl p-8 sm:p-16 text-center text-white">
                    <h2 className="font-heading text-3xl font-bold mb-6">Rencontrons-nous</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-10">
                        Que vous soyez une marque prête à investir intelligemment ou un talent prêt à passer pro, nous sommes là pour vous.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/contact?type=brand">Brand : Réserver un call</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900" asChild>
                            <Link href="/contact?type=talent">Talent : Proposer mon profil</Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </main>
    )
}
