"use client";

import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { Play } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "idalia",
    client: "IDALIA",
    title: "Carte Blanche Créative",
    description:
      "Idalia est une marque émergente qui cartonne grâce à leurs framboises enrobées de chocolat. C'est sûrement la publicité que j'ai le plus aimé réaliser car la marque m'a donné sa confiance totale en me laissant carte blanche.",
    tags: ["Gourmand", "Coloré", "Plusieurs Millions de Vues"],
    videoUrl: "https://www.tiktok.com/@ardidprod/video/1234567890", // Placeholder if we don't embed iframe, or we can use a mock
    mockUrl: "/studio/krh/noah-basic-fit-vf.mp4",
  },
  {
    id: "haribo",
    client: "HARIBO",
    title: "30 Millions de vues",
    description:
      "L'histoire a commencé avec une publicité fictive pour les dragibus. Les backstages ont atteint plus de 30 millions de vues. Cela m'a permis d'être repéré par la marque et de travailler officiellement avec eux. Coloré, gourmand, la bonne humeur pure.",
    tags: ["Viral", "Coloré", "Storytelling"],
    mockUrl: "/studio/krh/basic-fit-redha-vf.mp4",
  },
  {
    id: "monster",
    client: "MONSTER ENERGY",
    title: "La Marque de Cœur",
    description:
      "Première marque qui m'a fait confiance, et première vidéo qui a véritablement fait exploser les statistiques de ma chaîne TikTok. Des produits avec lesquels j'adore travailler, une esthétique sombre et survoltée.",
    tags: ["Énergie", "Sombre", "Explosif"],
    mockUrl: "/studio/krh/ana-basic-fit-vf.mp4",
  },
];

export function JulienCaseStudies() {
  return (
    <section className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      <Container className="px-4">
        <FadeIn>
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              Études de Cas.
            </h2>
            <p className="text-zinc-500 font-medium mt-6 max-w-2xl mx-auto uppercase tracking-widest text-sm">
              Behind the scenes & masterclass executions pour les plus grandes
              marques mondiales.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-12 md:gap-24">
          {CASE_STUDIES.map((study, index) => (
            <FadeIn key={study.id} delay={index * 0.1} className="w-full">
              <div
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center`}
              >
                {/* Image / Video Placeholder */}
                <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-square bg-zinc-900 rounded-2xl md:rounded-2xl border border-white/10 overflow-hidden relative group shadow-2xl">
                  {/* Video simulation */}
                  <video
                    src={study.mockUrl}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-500">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                  <div className="inline-flex px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 w-fit">
                    Cas N°0{index + 1}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">
                      {study.client}
                    </h3>
                    <h4 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                      {study.title}
                    </h4>
                  </div>

                  <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
                    {study.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-bold text-white/70 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
