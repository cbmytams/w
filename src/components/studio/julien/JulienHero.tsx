"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { EASING } from "@/lib/easing";

export function JulienHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-zinc-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/basic_fit_campaign.png"
          alt="Julien Ardid au studio"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-transparent opacity-60" />
      </div>

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 2, ease: EASING.easeOut }}
          className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-purple-600 rounded-full blur-[150px] mix-blend-screen"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: EASING.easeOut }}
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-pink-500 rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-12 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASING.premium }}
          className="inline-flex flex-col items-center gap-6"
        >
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-8">
            Wafia Studio Original
          </div>
        </motion.div>

        <h1 className="flex flex-col items-center justify-center -space-y-4 md:-space-y-8 lg:-space-y-12 mb-8">
          {["JULIEN", "ARDID"].map((word, wordIndex) => (
            <span key={word} className="overflow-hidden flex">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${word}-${letterIndex}`}
                  initial={{ y: "120%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: EASING.premium,
                    delay: wordIndex * 0.2 + letterIndex * 0.05,
                  }}
                  className="block font-black text-[15vw] md:text-[12vw] lg:text-[160px] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
                  style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="max-w-2xl text-lg md:text-xl text-zinc-400 font-medium tracking-wide mt-6"
        >
          Réalisateur & Créateur Vidéo <br className="md:hidden" />
          <span className="text-white">Spécialiste Studio & Produit.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 md:mt-24"
        >
          <div className="w-px h-24 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
        </motion.div>
      </Container>
    </section>
  );
}
