import { Metadata } from "next";
import Link from "next/link";
import { OrbLink } from "@/components/navigation/OrbLink";
import { JulienHero } from "@/components/studio/julien/JulienHero";
import { JulienBio } from "@/components/studio/julien/JulienBio";
import { JulienStats } from "@/components/studio/julien/JulienStats";
import { JulienBrandsMarquee } from "@/components/studio/julien/JulienBrandsMarquee";
import { JulienCaseStudies } from "@/components/studio/julien/JulienCaseStudies";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SmartBackButton } from "@/components/ui/SmartBackButton";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Julien Ardid | Studio Créatif Wafia",
  description:
    "Réalisateur & Créateur Vidéo spécialiste studio et produit. Du terrain au studio, explorez l'envers du décor des plus grandes marques.",
  alternates: {
    canonical: "/studio/julien-ardid",
  },
  openGraph: {
    title: "Julien Ardid | Studio Créatif Wafia",
    description:
      "Réalisateur & Créateur Vidéo spécialiste studio et produit. Du terrain au studio, explorez l'envers du décor des plus grandes marques.",
    url: "/studio/julien-ardid",
    siteName: siteConfig.name,
    type: "article",
  },
};

export default function JulienArdidPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-zinc-950 text-white selection:bg-white selection:text-black font-sans relative pt-12"
    >
      {/* Studio return button */}
      <div className="fixed top-24 left-4 md:left-8 z-50 mix-blend-difference hidden md:block">
        <SmartBackButton
          fallback="/studio"
          ariaLabel="Retour au studio"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-all leading-none focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au studio
        </SmartBackButton>
      </div>

      <article className="pt-8">
        <JulienHero />
        <JulienBio />
        <JulienStats />
        <JulienBrandsMarquee />
        <JulienCaseStudies />

        {/* CTA Section */}
        <section className="py-32 md:py-48 bg-zinc-950 border-t border-white/5 text-center relative overflow-hidden">
          <Container className="px-4 relative z-10">
            <FadeIn>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-8">
                Prêt à produire <br className="md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
                  des assets utiles ?
                </span>
              </h2>
              <p className="text-zinc-400 font-medium text-lg md:text-xl max-w-2xl mx-auto mb-12">
                Créons des images, vidéos et déclinaisons capables de porter
                votre marque au-delà d'une seule publication.
              </p>
              <OrbLink
                href="/contact/brands"
                className="inline-flex items-center gap-4 px-8 py-5 md:px-12 md:py-6 rounded-full bg-white text-black font-black text-sm md:text-base uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Cadrer une production
                <ArrowRight className="w-5 h-5 mb-0.5" />
              </OrbLink>
            </FadeIn>
          </Container>

          {/* Background Noise/Texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </section>
      </article>
    </main>
  );
}
