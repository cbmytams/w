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
import { OrbLink } from "@/components/navigation/OrbLink";

/* ─────────────────────────────────────────────
   METADATA
   ───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Influence, Talent Management 360 & Studio",
  description:
    "Wafia structure les campagnes créateurs, la production social media et le talent management 360 : image, revenus, droits, studio et reporting.",
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
    title: "Wafia | Influence, Talent Management 360 & Studio",
    description:
      "Campagnes créateurs, production UGC, studio social media, talent management 360 et pilotage opérationnel.",
    url: sitePaths.services,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafia | Influence, Talent Management 360 & Studio",
    description:
      "Campagnes créateurs, production UGC, studio social media, talent management 360 et pilotage opérationnel.",
  },
};

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const STATS = [
  { value: "17M+", label: "Impressions cumulées" },
  { value: "100+", label: "Créateurs activés" },
  { value: "250+", label: "Assets produits" },
  { value: "21%", label: "Engagement moyen" },
];

const SERVICES = [
  {
    id: "influence-marketing",
    title: "Campagnes créateurs",
    description:
      "Nous concevons des campagnes d'influence marketing comme des dispositifs complets : stratégie, casting, briefs, négociation, production, droits, diffusion et reporting. Chaque activation doit être lisible, défendable et réutilisable.",
    descriptionLinkText: null,
    descriptionLinkHref: null,
    descriptionSuffix: "",
    points: [
      "Stratégie de casting et shortlist argumentée",
      "Activation multi-plateforme (TikTok, Instagram, YouTube)",
      "Cadrage des droits, usages et validations",
      "Reporting post-campagne orienté décisions",
    ],
    deliverables: [
      "Brief créatif",
      "Shortlist casting",
      "Dashboard live",
      "Bilan de campagne",
    ],
    cta: { label: "Voir l'approche Marques", href: "/for-brands" },
  },
  {
    id: "studio-ugc",
    title: "Studio & production sociale",
    description:
      "Notre studio produit les contenus qui donnent de la matière aux campagnes : UGC, formats verticaux, captations, films de marque, déclinaisons paid media et assets réutilisables. Les formats sont pensés pour les plateformes, mais cadrés pour la marque — consultez",
    descriptionLinkText: "nos guides plateformes",
    descriptionLinkHref: "/wiki",
    descriptionSuffix: " pour en savoir plus.",
    points: [
      "Tournage vertical et montage natif social",
      "UGC, captation, films de marque et assets paid-ready",
      "Direction artistique cohérente avec l'image de marque",
      "Déclinaisons Reels, Shorts, TikTok, Stories et Ads",
    ],
    deliverables: [
      "Rushes bruts",
      "Montages finaux",
      "Packs ads et déclinaisons",
      "Adaptations plateforme",
    ],
    cta: { label: "Voir le Studio", href: "/studio" },
  },
  {
    id: "talent-management",
    title: "Talent management 360",
    description:
      "Nous accompagnons les créateurs, artistes, comédiens, musiciens, peintres et talents hybrides dans la structuration de leur image, de leurs projets, de leurs revenus et de leurs droits. L'objectif n'est pas seulement d'obtenir plus d'opportunités, mais de construire une carrière lisible, protégée et durable.",
    descriptionLinkText: null,
    descriptionLinkHref: null,
    descriptionSuffix: "",
    points: [
      "Positionnement, récit public et direction artistique",
      "Partenariats, bookings, collaborations et négociation",
      "Droits d'image, contrats, facturation et cadre juridique",
      "Roadmap carrière, production et autonomie progressive",
    ],
    deliverables: [
      "Roadmap carrière",
      "Architecture d'image",
      "Cadre droits & revenus",
      "Plan d'opportunités",
    ],
    cta: { label: "Découvrir le Talent Management", href: "/for-talents" },
  },
  {
    id: "data-tracabilite",
    title: "Pilotage & cadre opérationnel",
    description:
      "Nous structurons le suivi de chaque campagne ou accompagnement : objectifs, budget, validations, contenus, droits, performances et apprentissages. Le pilotage sert à décider, pas à empiler des chiffres.",
    descriptionLinkText: null,
    descriptionLinkHref: null,
    descriptionSuffix: "",
    points: [
      "Dashboard client en temps réel",
      "KPIs décisionnels et lecture des signaux utiles",
      "Traçabilité casting → production → droits → reporting",
      "Automatisation des tâches répétitives",
    ],
    deliverables: [
      "Dashboard accès client",
      "Reporting unifié",
      "Suivi budgétaire",
      "Facturation transparente",
    ],
    cta: null,
  },
];

const SERVICE_FAQ_ITEMS = [
  {
    q: "Combien coûte une campagne d'influence marketing ?",
    a: "Le budget dépend du nombre de créateurs, du niveau de production, des droits d'usage, des plateformes et de la durée d'activation. Nous cadrons d'abord l'objectif, puis nous construisons un dispositif défendable.",
  },
  {
    q: "Comment choisir les bons influenceurs pour sa marque ?",
    a: "Nous croisons audience, cohérence d'image, historique de collaboration, qualité de contenu, disponibilité, risques de brand safety et capacité à produire. Le casting doit pouvoir se justifier, pas seulement plaire.",
  },
  {
    q: "Quels KPIs suivre pour mesurer une campagne d'influence ?",
    a: "Nous suivons les indicateurs qui aident à décider : complétion vidéo, rétention, sauvegardes, trafic, conversions, coût par résultat, qualité des contenus et potentiel de réutilisation.",
  },
  {
    q: "Quelle est la différence entre UGC et influence marketing ?",
    a: "L'influence marketing s'appuie sur l'audience d'un créateur pour amplifier un message. Le contenu UGC est produit par des créateurs sans obligation de publication sur leurs réseaux. Les deux approches sont complémentaires et nous les intégrons dans une stratégie unifiée.",
  },
  {
    q: "Travaillez-vous avec des marques hors de France ?",
    a: "Oui. Nous pouvons activer des profils francophones et internationaux, avec un cadre juridique européen clair sur les droits, mentions, usages et validations.",
  },
  {
    q: "Peut-on réutiliser les contenus produits en campagne pour du paid media ?",
    a: "Absolument. Nous sécurisons systématiquement les droits d'utilisation (organique et paid) avant chaque activation. Durée, territoires et canaux sont spécifiés contractuellement.",
  },
  {
    q: "En combien de temps une campagne d'influence est-elle livrée ?",
    a: "Le délai dépend du casting, de la production et des validations. Une campagne complète se construit généralement en 4 à 6 semaines ; les activations plus rapides demandent un cadrage très précis.",
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
    "Conception et pilotage de campagnes d'influence marketing : stratégie, casting argumenté, production, droits et reporting KPI.",
  url: new URL(sitePaths.forBrands, baseUrl).toString(),
  serviceType: ["Influence Marketing", "Campagne Créateurs"],
});

const studioServiceJsonLd = serviceSchema({
  name: "Production UGC & Studio Créatif",
  description:
    "Production UGC, formats sociaux, captations, films de marque et déclinaisons multi-formats.",
  url: new URL("/studio", baseUrl).toString(),
  serviceType: ["Production UGC", "Studio Créatif", "Contenu Social Media"],
});

const talentServiceJsonLd = serviceSchema({
  name: "Talent Management 360",
  description:
    "Management 360 pour talents publics et créatifs : image, projets, droits, revenus, opportunités et production.",
  url: new URL(sitePaths.forTalents, baseUrl).toString(),
  serviceType: ["Talent Management", "Gestion de Talents", "Stratégie d'image"],
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
              Influence. Talent management. Studio.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
              Wafia structure les campagnes des marques et les carrières des
              talents : stratégie, image, production, droits, revenus et
              reporting dans un même cadre.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <OrbLink href="/contact/brands">
                  Cadrer un besoin <ArrowRight className="ml-2 h-4 w-4" />
                </OrbLink>
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
              Un projet mérite un cadre avant d&apos;être lancé.
            </h2>
            <p className="text-lg text-slate-400 mb-10">
              Discutons de vos objectifs et construisons un cadre clair avant
              d&apos;activer les bons profils.
            </p>
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100"
              asChild
            >
              <OrbLink href="/contact/brands">
                Structurer un projet <ArrowRight className="ml-2 h-4 w-4" />
              </OrbLink>
            </Button>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" /> Réponse sous 24h
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" /> Process clair
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" /> Premier cadrage
              </span>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
