"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { TALENT_HERO } from "@/constants";
import { EASING, DURATION } from "@/lib/easing";
import { OrbLink } from "@/components/navigation/OrbLink";

/**
 * HeroSection — Clean editorial layout
 */
export function HeroSection() {
  const talentHeroCtaHref = "/contact/talents";
  const handleSecondaryCtaClick = () => {
    const methodSection = document.getElementById("method");
    if (!methodSection) return;
    methodSection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#method");
  };

  return (
    <section className="pt-32 pb-24 px-4 min-h-[85vh] flex items-center relative">
      <Container className="relative z-10">
        <div className="w-[calc(100vw-4rem)] max-w-4xl min-w-0 sm:w-auto">
          {TALENT_HERO.badge ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slower, ease: EASING.entrance }}
              className="mb-6 inline-flex rounded-full border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-white/50 backdrop-blur-xl"
            >
              {TALENT_HERO.badge}
            </motion.div>
          ) : null}

          {/* Title - Large, two lines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.slower, ease: EASING.entrance }}
            className="mb-8"
          >
            <h1 className="w-full max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-slate-900 dark:text-white break-words">
              {TALENT_HERO.title}{" "}
              <span className="text-slate-600 dark:text-slate-300">
                {TALENT_HERO.titleHighlight}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.slower,
              delay: 0.2,
              ease: EASING.entrance,
            }}
            className="w-full max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-white/60 leading-relaxed mb-8 break-words"
          >
            {TALENT_HERO.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: DURATION.slower,
              delay: 0.32,
              ease: EASING.entrance,
            }}
            className="mb-9 grid max-w-2xl gap-3 border-y border-slate-200/70 py-5 dark:border-white/10 sm:grid-cols-3"
          >
            {TALENT_HERO.proofPoints.map((item) => (
              <div key={item.label} className="min-w-0">
                <div className="text-base font-semibold text-slate-900 dark:text-white">
                  {item.value}
                </div>
                <div className="mt-1 text-sm leading-snug text-slate-500 dark:text-slate-400">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 md:gap-4"
          >
            <OrbLink href={talentHeroCtaHref} className="inline-flex">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex px-6 md:px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-base font-semibold shadow-sm transition-all"
              >
                {TALENT_HERO.ctaPrimary}
              </motion.span>
            </OrbLink>

            <motion.button
              type="button"
              onClick={handleSecondaryCtaClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-4 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-2xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-base font-semibold shadow-sm hover:bg-white dark:hover:bg-black/60 dark:hover:border-white/20 transition-all duration-300"
            >
              {TALENT_HERO.ctaSecondary}
            </motion.button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
