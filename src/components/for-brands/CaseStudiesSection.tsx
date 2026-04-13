"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useRevealViewport } from "@/hooks/useRevealViewport";

const CASE_STUDIES = [
  {
    id: "basic-fit",
    title: "Basic Fit",
    subtitle: "Campagne Influence • Fitness & Lifestyle",
    description:
      "Activation 360° orchestrée avec 10 créateurs lifestyle & fitness — du casting au reporting final. Contenus verticaux UGC (TikTok / Reels) produits en studio autour du concept \u2018Booste ton énergie\u2019.",
    image: "/basic_fit_campaign.png",
    category: "Fitness",
    tags: ["Instagram / TikTok", "UGC Studio", "100% Organique"],
    results: [
      { label: "Vues Organiques", value: "6M" },
      { label: "Taux d'Engagement", value: "21,44%" },
      { label: "Créateurs Activés", value: "10" },
    ],
    badge: "Campagne Influence",
    highlight:
      "Vidéos lifestyle social-first tournées en studio (Redha, Noah, Ana, Shayna...) sur le concept \u2018Booste ton énergie\u2019 — maximisant la portée organique et la shareability.",
    gradient: "from-orange-500/20 to-orange-600/5",
    logo: "/logos/official/basic-fit-light.png",
    studioLink: "/studio",
  },
  {
    id: "cj-group",
    title: "CJ Group — Korea House",
    subtitle: "Activation Créateurs • La Maison de la Chimie • JO Paris 2024",
    description:
      "Orchestration d'une activation créateurs sur place pour connecter CJ à la culture coréenne de façon naturelle (vlog / découverte / storytelling).",
    image: "/korea_house_paris_2024.png",
    category: "Événement",
    tags: ["TikTok", "Instagram", "IRL Activation"],
    results: [
      { label: "Impressions", value: "11M" },
      { label: "Créateurs Activés", value: "67" },
      { label: "Contenus Créés", value: "+150" },
    ],
    badge: "Événement — Activation IRL",
    highlight:
      "Tournages prévus autour de Besides Kimchi (Paris 4) + gestion des contraintes terrain liées à l'ouverture des JO.",
    gradient: "from-blue-500/20 to-indigo-600/5",
    logo: "/logos/cj-logo.svg",
  },
  {
    id: "equip-auto",
    title: "Salon de l'Auto — 50e édition",
    subtitle: "Couverture Média & Content Factory • Paris Expo",
    description:
      "Dispositif 'Média + Campagne' pour couvrir les innovations du salon en temps réel : 4 jours de live, interviews, et contenus snackable.",
    image: "/equip_auto_paris.png",
    category: "Salon Pro",
    tags: ["B2B / Grand Public", "Content Factory", "Live Coverage"],
    results: [
      { label: "Créateurs / Journalistes", value: "23" },
      { label: "Contenus Produits", value: "+100" },
      { label: "Jours de Live", value: "4" },
    ],
    badge: "Couverture Média",
    highlight:
      "Une approche 'Newsroom' pour transformer un salon B2B en événement incontournable sur les réseaux sociaux.",
    gradient: "from-red-500/20 to-rose-600/5",
    logo: null,
  },
];

export function CaseStudiesSection() {
  const { disableMotion, viewport, transitionDuration, clampDelay } =
    useRevealViewport();

  return (
    <section
      id="case-studies"
      className="py-20 md:py-28 px-4 relative overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading
            title={
              <>
                Ce qu&apos;on a{" "}
                <span className="text-gradient-brand">déjà fait.</span>
              </>
            }
            subtitle="Quelques exemples de campagnes réussies."
            className="mb-16 text-center scroll-mt-32"
          />

          {/* RESTORED CASES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {CASE_STUDIES.map((study, i) => (
              <motion.div
                key={study.id}
                initial={disableMotion ? false : { opacity: 0, y: 30 }}
                whileInView={disableMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={disableMotion ? undefined : viewport}
                transition={
                  disableMotion
                    ? undefined
                    : {
                        duration: Math.max(transitionDuration, 0.42),
                        delay: clampDelay(i * 0.12),
                      }
                }
                className="group cursor-pointer w-full"
              >
                <div className="h-full bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${study.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${study.gradient} shadow-lg`}
                      >
                        {study.category}
                      </span>
                    </div>

                    {/* Brand Logo */}
                    {study.logo && (
                      <div className="absolute top-4 right-4 z-20 h-8 w-24">
                        <Image
                          src={study.logo}
                          alt={`${study.title} logo`}
                          fill
                          sizes="96px"
                          className="object-contain drop-shadow-lg"
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-8 flex flex-col grow">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-slate-50 dark:bg-zinc-800/50 rounded-md text-[10px] uppercase font-bold tracking-wide text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-zinc-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {study.title}
                    </h3>
                    <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-4 uppercase tracking-wide">
                      {study.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-3">
                      {study.description}
                    </p>

                    {/* Highlight */}
                    <div className="mt-auto">
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/20 mb-6 min-h-[80px] flex items-center shadow-inner">
                        <p className="text-xs font-medium text-orange-800 dark:text-orange-200 leading-relaxed italic">
                          &quot;{study.highlight}&quot;
                        </p>
                      </div>

                      {/* Optional Studio CTA */}
                      {study.studioLink && (
                        <div className="mb-6 flex justify-center">
                          <Link
                            href={study.studioLink}
                            className="group flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white shadow-md active:scale-95"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Voir la production</span>
                            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        </div>
                      )}

                      {/* Results */}
                      <div className="grid grid-cols-3 gap-2 pt-6 border-t border-slate-100 dark:border-zinc-800">
                        {study.results.map((result, j) => (
                          <div key={j} className="text-center">
                            <div className="text-lg font-bold text-orange-500 dark:text-orange-400 mb-1">
                              {result.value}
                            </div>
                            <div className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider truncate">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
