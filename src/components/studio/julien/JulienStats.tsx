"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const STATS = [
  {
    label: "Vues TikTok (Mois dernier)",
    value: "3.7M",
    suffix: "+",
    network: "TikTok",
    color: "text-cyan-400",
  },
  {
    label: "Abonnés TikTok",
    value: "320K",
    suffix: "",
    network: "TikTok",
    color: "text-cyan-400",
  },
  {
    label: "Vues YouTube (Année)",
    value: "15M",
    suffix: "+",
    network: "YouTube",
    color: "text-red-500",
  },
  {
    label: "Comptes Touchés Insta (90j)",
    value: "2.1M",
    suffix: "",
    network: "Instagram",
    color: "text-pink-500",
  },
];

export function JulienStats() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container className="relative z-10 px-4">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              L'Audience.
            </h2>
            <p className="text-zinc-500 font-medium mt-4 uppercase tracking-widest text-sm">
              Des millions de vues générées organiques.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 md:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between h-full min-h-[200px] shadow-2xl relative overflow-hidden group"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    {stat.network}
                  </div>
                  <div className="text-sm font-medium text-zinc-400 leading-tight">
                    {stat.label}
                  </div>
                </div>
                <div className="mt-8 flex items-baseline gap-1">
                  <span
                    className={`text-5xl md:text-6xl font-black tracking-tighter ${stat.color}`}
                  >
                    {stat.value}
                  </span>
                  <span className="text-2xl font-bold text-white/50">
                    {stat.suffix}
                  </span>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
