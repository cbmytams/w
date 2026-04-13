import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageShell } from "@/components/common/PageShell";
import { siteConfig, sitePaths } from "@/lib/site";
import {
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/structured-data";
import { ServicesFaqAccordion } from "@/components/services/ServicesFaqAccordion";

/* ─────────────────────────────────────────────
   METADATA
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Agence Influence Marketing, UGC & Talents",
  description:
    "Agence influence marketing en France : campagnes créateurs, production UGC, talent management et studio créatif. Résultats mesurables. Contactez-nous.",
  keywords: [
    "agence influence marketing",
    "agence UGC france",
    "campagne influence marketing",
    "talent management influenceur",
    "studio créatif social media",
    "production contenu UGC",
  ],
  alternates: {
    canonical: sitePaths.services,
  },
  openGraph: {
    title: "Wafia | Agence Influence Marketing, UGC & Talents en France",
    description:
      "Campagnes d'influence, production UGC, talent management et studio créatif. Une agence complète pour des résultats mesurables.",
    url: sitePaths.services,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafia | Agence Influence Marketing, UGC & Talents en France",
    description:
      "Campagnes d'influence, production UGC, talent management et studio créatif. Une agence complète pour des résultats mesurables.",
  },
};

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const STATS = [
  { value: "17M+", label: "Impressions cumulées" },
  { value: "100+", label: "Créateurs activés" },
  { value: "250+", label: "Contenus produits" },
  { value: "21%", label: "Taux d'engagement moyen" },
];

const SERVICES = [
  {
    id: "influence-marketing",
    title: "Campagnes d'Influence Marketing",
    description:
      "Nous concevons et pilotons des campagnes d'influence marketing de bout en bout : identification des créateurs, négociation, production et reporting. Chaque activation repose sur une sélection data-driven et un suivi KPI en temps réel, selon notre méthode éprouvée.",
    descriptionLinkText: null,
    descriptionLinkHref: null,
    descriptionSuffix: "",
    points: [
      "Stratégie de casting et sélection data-driven",
      "Activation multi-plateforme (TikTok, Instagram, YouTube)",
      "Suivi KPIs en temps réel et optimisation",
      "Reporting post-campagne détaillé",
    ],
    deliverables: [
      "Brief créatif",
      "Shortlist casting",
      "Dashboard live",
      "Bilan de campagne",
    ],
    cta: { label: "Découvrir l'expertise Marques", href: "/for-brands" },
  },
  {
    id: "studio-ugc",
    title: "Production UGC & Studio Créatif",
    description:
      "Notre studio interne produit du contenu social-first pensé pour convertir : UGC authentique, montage dynamique, VFX et déclinaisons multi-formats. Nous maîtrisons les codes de chaque plateforme — consultez",
    descriptionLinkText: "nos guides plateformes",
    descriptionLinkHref: "/wiki",
    descriptionSuffix: " pour en savoir plus.",
    points: [
      "Tournage vertical et montage natif social",
      "UGC authentique ou production studio premium",
      "VFX, motion design et hooks visuels",
      "Déclinaisons Reels, Shorts, TikTok, Stories",
    ],
    deliverables: [
      "Rushes bruts",
      "Montages finaux",
      "Packs ads multi-formats",
      "Adaptations plateforme",
    ],
    cta: { label: "Voir le Studio", href: "/studio" },
  },
  {
    id: "talent-management",
    title: "Talent Management & Accompagnement Créateurs",
    description:
      "Nous accompagnons un roster exclusif de créateurs, artistes et comédiens dans la structuration de leur carrière : positionnement éditorial, négociation de contrats, production de contenu et monétisation durable.",
    descriptionLinkText: null,
    descriptionLinkHref: null,
    descriptionSuffix: "",
    points: [
      "Positionnement éditorial et direction artistique",
      "Négociation et sécurisation contractuelle",
      "Roadmap carrière et développement de marque",
      "Monétisation multi-canal structurée",
    ],
    deliverables: [
      "Roadmap carrière",
      "Contrats sécurisés",
      "Ligne éditoriale",
      "Bilan trimestriel",
    ],
    cta: { label: "Découvrir le Talent Management", href: "/for-talents" },
  },
  {
    id: "data-tracabilite",
    title: "Traçabilité & Reporting Data",
    description:
      "Nous avons construit nos propres outils pour suivre chaque étape de la campagne en temps réel. Transparence totale sur le budget, les validations et les résultats — intégré à notre process.",
    descriptionLinkText: null,
    descriptionLinkHref: null,
    descriptionSuffix: "",
    points: [
      "Dashboard client en temps réel",
      "KPIs décisionnels, zéro vanity metrics",
      "Traçabilité casting → ops → reporting",
      "Automatisation des tâches répétitives",
    ],
    deliverables: [
      "Dashboard accès client",
      "Reporting KPI unifié",
      "Suivi budgétaire",
      "Facturation transparente",
    ],
    cta: null,
  },
];

const SERVICE_FAQ_ITEMS = [
  {
    q: "Combien coûte une campagne d'influence marketing ?",
    a: "Le budget varie selon le nombre de créateurs, les plateformes ciblées et la durée de l'activation. Nos campagnes débutent à partir de 5 000 €. Nous établissons un devis détaillé après analyse de vos objectifs et de votre marché.",
  },
  {
    q: "Comment choisir les bons influenceurs pour sa marque ?",
    a: "Nous utilisons une méthodologie data-driven combinant analyse d'audience, taux d'engagement réel, brand-safety et affinité thématique. Chaque créateur est vérifié manuellement avant d'être proposé au casting.",
  },
  {
    q: "Quels KPIs suivre pour mesurer une campagne d'influence ?",
    a: "Nous mesurons uniquement les indicateurs décisionnels : taux de complétion vidéo, sauvegardes, trafic généré, conversions et coût par résultat. Aucune vanity metric. Tout est accessible en temps réel via votre dashboard.",
  },
  {
    q: "Quelle est la différence entre UGC et influence marketing ?",
    a: "L'influence marketing s'appuie sur l'audience d'un créateur pour amplifier un message. Le contenu UGC est produit par des créateurs sans obligation de publication sur leurs réseaux. Les deux approches sont complémentaires et nous les intégrons dans une stratégie unifiée.",
  },
  {
    q: "Travaillez-vous avec des marques hors de France ?",
    a: "Oui. Notre roster inclut des créateurs francophones et internationaux. Nous gérons des campagnes en France, en Belgique, en Suisse et au-delà. Notre siège est basé en France, ce qui garantit la conformité juridique européenne.",
  },
  {
    q: "Peut-on réutiliser les contenus produits en campagne pour du paid media ?",
    a: "Absolument. Nous sécurisons systématiquement les droits d'utilisation (organique et paid) avant chaque activation. Durée, territoires et canaux sont spécifiés contractuellement.",
  },
  {
    q: "En combien de temps une campagne d'influence est-elle livrée ?",
    a: "Le délai moyen est de 4 à 6 semaines entre le brief initial et la livraison du reporting final. Les activations urgentes peuvent être orchestrées en 2 semaines sous conditions spécifiques.",
  },
];

/* ─────────────────────────────────────────────
   STRUCTURED DATA (JSON-LD)
   ───────────────────────────────────────────── */

const baseUrl = siteConfig.url;

const servicesBreadcrumbs = breadcrumbSchema([
  { name: "Accueil", url: baseUrl },
  { name: "Services", url: new URL(sitePaths.services, baseUrl).toString() },
]);

const influenceServiceJsonLd = serviceSchema({
  name: "Campagnes d'Influence Marketing",
  description:
    "Conception et pilotage de campagnes d'influence marketing : casting data-driven, activation multi-plateforme et reporting KPI.",
  url: new URL(sitePaths.forBrands, baseUrl).toString(),
  serviceType: ["Influence Marketing", "Campagne Créateurs"],
});

const studioServiceJsonLd = serviceSchema({
  name: "Production UGC & Studio Créatif",
  description:
    "Production de contenu social-first : UGC authentique, montage dynamique, VFX et déclinaisons multi-formats.",
  url: new URL("/studio", baseUrl).toString(),
  serviceType: ["Production UGC", "Studio Créatif", "Contenu Social Media"],
});

const talentServiceJsonLd = serviceSchema({
  name: "Talent Management & Accompagnement Créateurs",
  description:
    "Management de créateurs : positionnement éditorial, négociation contrats, roadmap carrière et monétisation durable.",
  url: new URL(sitePaths.forTalents, baseUrl).toString(),
  serviceType: ["Talent Management", "Gestion de Talents"],
});

const dataServiceJsonLd = serviceSchema({
  name: "Traçabilité & Reporting Data",
  description:
    "Outils propriétaires de suivi campagne : dashboard temps réel, KPIs décisionnels et traçabilité complète.",
  url: new URL(sitePaths.services + "#data-tracabilite", baseUrl).toString(),
  serviceType: ["Reporting Influence", "Data & Traçabilité"],
});

const servicesFaqJsonLd = faqSchema(SERVICE_FAQ_ITEMS);

/* ─────────────────────────────────────────────
   PAGE COMPONENT
   ───────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <PageShell>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesBreadcrumbs),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(influenceServiceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(studioServiceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(talentServiceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dataServiceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Agence d&apos;Influence Marketing, UGC &amp; Talent Management
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
              Wafia est une agence d&apos;influence marketing basée en France.
              Nous concevons des campagnes data-driven avec des créateurs
              vérifiés, un studio créatif intégré et un talent management
              structuré.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/questionnaire/brands">
                  Lancer votre campagne <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#services">Voir nos expertises</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-slate-900/90 backdrop-blur-sm text-white py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── SERVICE SECTIONS ── */}
      {SERVICES.map((service, i) => (
        <section
          key={service.id}
          id={i === 0 ? "services" : service.id}
          className="scroll-mt-28 py-16 md:py-20 border-t border-slate-200/60 dark:border-slate-700/40"
        >
          <Container>
            <div className="max-w-4xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {service.title}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
                {service.description}
                {service.descriptionLinkHref && (
                  <>
                    {" "}
                    <Link
                      href={service.descriptionLinkHref}
                      className="text-slate-900 dark:text-white font-semibold underline underline-offset-4 hover:text-orange-600 transition-colors"
                    >
                      {service.descriptionLinkText}
                    </Link>
                  </>
                )}
                {service.descriptionSuffix}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-slate-200/60 dark:border-white/10">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                    Ce que nous faisons
                  </h3>
                  <ul className="space-y-3">
                    {service.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex items-start text-sm text-slate-700 dark:text-slate-300"
                      >
                        <Check className="h-4 w-4 text-slate-900 dark:text-white mr-2 mt-0.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-slate-200/60 dark:border-white/10">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                    Livrables
                  </h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-center text-sm text-slate-500 dark:text-slate-400"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {service.cta && (
                <Button variant="outline" asChild>
                  <Link href={service.cta.href}>
                    {service.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </Container>
        </section>
      ))}

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Questions fréquentes sur l&apos;influence marketing
              </h2>
            </div>
            <ServicesFaqAccordion items={SERVICE_FAQ_ITEMS} />
          </div>
        </Container>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 md:py-28 bg-slate-900/90 backdrop-blur-sm text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Prêt à lancer votre prochaine campagne d&apos;influence ?
            </h2>
            <p className="text-lg text-slate-400 mb-10">
              Discutons de vos objectifs et construisons un dispositif sur
              mesure.
            </p>
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100"
              asChild
            >
              <Link href="/questionnaire/brands">
                Réserver un appel stratégique{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" /> Réponse sous 24h
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" /> Process clair
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" /> Zéro engagement
              </span>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
