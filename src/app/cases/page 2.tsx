import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig, sitePaths } from "@/lib/site";

const CASES = [
  {
    title: "Fashion UGC",
    image: "/cases/fashion-ugc.png",
    description: "Production social-first multi-formats pour booster la notoriété."
  },
  {
    title: "Tech Launch",
    image: "/cases/tech-launch.png",
    description: "Campagne creators orientée acquisition et preuve produit."
  },
  {
    title: "Gaming App",
    image: "/cases/gaming-app.png",
    description: "Activation influence + paid media avec pilotage itératif."
  }
];

export const metadata: Metadata = {
  title: "Cas clients",
  description: "Découvrez des exemples de campagnes influence et studio opérées par Wafia.",
  alternates: {
    canonical: sitePaths.cases,
  },
  openGraph: {
    title: "Cas clients | Wafia",
    description: "Découvrez des exemples de campagnes influence et studio opérées par Wafia.",
    url: sitePaths.cases,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cas clients | Wafia",
    description: "Découvrez des exemples de campagnes influence et studio opérées par Wafia."
  }
};

export default function CasesPage() {
  return (
    <main id="main-content" className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Cases</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Quelques exemples</h1>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CASES.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative h-56 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <a href="/questionnaire/brands"
            className="inline-flex items-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
          >
            Discuter de votre projet
          </a>
        </div>
      </div>
    </main >
  );
}
