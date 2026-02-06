import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FadeIn, StaggerContainer } from "@/components/ui/fade-in"
import { siteConfig, sitePaths } from "@/lib/site"
import { breadcrumbSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Agence Influence & Studio",
  description:
    "Wafia connecte marques et talents avec un process clair, une production studio interne et une conformité totale.",
  alternates: {
    canonical: sitePaths.explore,
  },
  openGraph: {
    title: "Agence Influence & Studio | Wafia",
    description:
      "Wafia connecte marques et talents avec un process clair, une production studio interne et une conformité totale.",
    url: sitePaths.explore,
    siteName: siteConfig.name,
    type: "website",
  },
}

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col gap-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Accueil", url: new URL(sitePaths.home, siteConfig.url).toString() },
              { name: "Agence", url: new URL(sitePaths.explore, siteConfig.url).toString() },
            ])
          ),
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white opacity-70" />
        <Container className="flex flex-col items-center text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-800 shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-slate-900 mr-2"></span>
              Agence Hybride & Studio Créatif
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl max-w-4xl mb-6">
              Influence traçable. <br className="hidden sm:inline" />
              Créa social-first. <span className="text-slate-500">Talents structurés.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
              Wafia connecte les marques et les talents avec des processus clairs, une production studio interne et une conformité totale. Humain avant tout, data-driven par design.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" asChild className="w-full sm:w-auto text-base">
                <Link href="/contact?type=brand">Je suis une Marque / Agence</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base">
                <Link href="/contact?type=talent">Je suis un Talent</Link>
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">
              <div className="flex items-center"><Check className="mr-2 h-4 w-4 text-slate-900" /> Casting cadré</div>
              <div className="flex items-center"><Check className="mr-2 h-4 w-4 text-slate-900" /> Production interne</div>
              <div className="flex items-center"><Check className="mr-2 h-4 w-4 text-slate-900" /> Reporting clair</div>
              <div className="flex items-center"><Check className="mr-2 h-4 w-4 text-slate-900" /> Compliance by design</div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Pain Points Section */}
      <section className="bg-slate-50 py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Dites stop à l&apos;opacité
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Le marché de l&apos;influence est cassé. Nous le réparons avec de la rigueur et de la transparence.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[
              { title: "Campagnes floues", desc: "Fini les briefs incompris et les livrables hors-sujet." },
              { title: "Talents non cadrés", desc: "Plus de retards, de ghosting ou de caprices de stars." },
              { title: "Créa inadaptée", desc: "Terminé les contenus TV recyclés qui floppent sur TikTok." },
              { title: "Reporting inutile", desc: "Adieu les vanity metrics, place à la performance réelle." },
            ].map((item, i) => (
              <FadeIn key={i}>
                <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow h-full">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="mt-2">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeIn>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Client Logos Section */}
      <section className="py-16 bg-white">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-8">
                Ils nous font confiance
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholder logos - remplacer par de vrais logos */}
                {["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"].map((brand, i) => (
                  <div key={i} className="text-2xl font-bold text-slate-300 hover:text-slate-900 transition-colors">
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 4 Pillars Section */}
      <section>
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Nos piliers d&apos;excellence
              </h2>
              <p className="text-slate-600">
                Une approche 360° pour maîtriser toute la chaîne de valeur, de la stratégie à la diffusion.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link href="/services">Voir tous nos services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Influence & Talent Links Management",
                desc: "Sélection rigoureuse, roadmap carrière et brand safety.",
                badge: "Talents"
              },
              {
                title: "Studio Créatif / Production",
                desc: "Tournage, montage, VFX, formats verticaux et UGC avancé.",
                badge: "Studio"
              },
              {
                title: "Stratégie & FanOps",
                desc: "Concepts activables, community building et scaling organique.",
                badge: "Stratégie"
              },
              {
                title: "Systèmes & Data",
                desc: "Automatisation du suivi, traçabilité des assets et reporting.",
                badge: "Tech"
              }
            ].map((service, i) => (
              <Card key={i} className="group cursor-pointer hover:border-slate-800 transition-colors">
                <Link href="/services">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10 mb-4">
                        {service.badge}
                      </span>
                      <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.desc}</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
          <div className="mt-8 md:hidden">
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/services">Voir tous nos services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="bg-slate-900 py-24 text-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
              Un process clair et traçable
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Pas de boite noire. Vous savez exactement où nous en sommes à chaque étape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Audit & Stratégie", desc: "Analyse des besoins, définition des KPIs et ligne éditoriale." },
              { step: "02", title: "Casting & Concept", desc: "Sélection des meilleurs profils et validation des scripts." },
              { step: "03", title: "Production & Ops", desc: "Tournage, montage, validation et mise en ligne." },
              { step: "04", title: "Reporting Traçable", desc: "Analyse des performances et recommandations." }
            ].map((item, i) => (
              <div key={i} className="relative pl-8 md:pl-0 pt-0 md:pt-8 border-l-2 md:border-l-0 md:border-t-2 border-slate-700">
                <span className="absolute -left-[9px] top-0 md:-top-[9px] md:left-0 h-4 w-4 rounded-full bg-slate-900 border-2 border-slate-500"></span>
                <div className="text-sm font-bold text-slate-500 mb-2 font-mono">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section>
        <Container>
          <div className="rounded-2xl bg-slate-50 p-8 sm:p-16">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8">
                <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
                  Des livrables concrets pour vos campagnes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Reels / TikTok / Shorts", "Stories & Sets", "UGC Authentique", "Couverture Événementielle", "Reporting KPI", "Droits gérés"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-900">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" asChild>
                  <Link href="/services">Explorer notre studio</Link>
                </Button>
              </div>
              {/* Decorative abstract visual representation */}
              <div className="flex-1 w-full lg:max-w-md aspect-square rounded-xl bg-white shadow-xl border border-slate-100 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/50 -z-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Quality First</h3>
                <p className="text-slate-500 text-sm">Chaque contenu est validé par notre direction artistique avant diffusion.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Wafia / CTA Final */}
      <section className="text-center py-12">
        <Container className="max-w-4xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Prêt à passer au niveau supérieur ?
          </h2>
          <p className="text-lg text-slate-600 mb-10">
            Que vous soyez une marque cherchant de la performance ou un talent cherchant de la structure, Wafia est votre partenaire.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="px-8">
              <Link href="/contact?type=brand">Réserver un call (Marque)</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8">
              <Link href="/contact?type=talent">Postuler (Talent)</Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
