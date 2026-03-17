"use client";

import { AnimatePresence, motion } from "framer-motion";
import { wafiaGlass as G } from "@/styles/glass";

interface IOSNavBarProps {
  isDeep?: boolean;
  isReading?: boolean;
  parentLabel?: string;
  currentTitle?: string;
  onBack?: () => void;
}

export default function IOSNavBar({
  isDeep = false,
  isReading = false,
  parentLabel,
  currentTitle,
  onBack,
}: IOSNavBarProps) {
  const title = isReading ? currentTitle ?? "Lecture" : currentTitle ?? "Wiki de l'Influence";

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={G.spring}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60]"
    >
      <div
        className="pointer-events-auto"
        style={{
          ...G.navbar,
          WebkitBackdropFilter: G.navbar.WebkitBackdropFilter,
          background: isDeep ? "rgba(6, 5, 3, 0.84)" : G.navbar.background,
        }}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 pt-[max(env(safe-area-inset-top),0px)] md:px-6">
          <div className="flex w-[94px] justify-start">
            <AnimatePresence mode="wait" initial={false}>
              {isDeep && onBack ? (
                <motion.button
                  key="wafia-blog-back"
                  type="button"
                  onClick={onBack}
                  className="inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-medium transition-opacity hover:opacity-100"
                  style={{ color: G.backColor, opacity: 0.92 }}
                  aria-label={`Retour a ${parentLabel ?? "l'accueil"}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={G.springFast}
                >
                  <span aria-hidden className="text-xl leading-none">
                    &lt;
                  </span>
                  <span>Retour</span>
                </motion.button>
              ) : (
                <motion.div
                  key="wafia-blog-back-placeholder"
                  className="h-11 w-[86px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="min-w-0 px-2 text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={G.springFast}
              >
                {parentLabel ? (
                  <p
                    className="truncate text-[11px] md:text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,245,220,.30)" }}
                  >
                    {parentLabel}
                  </p>
                ) : null}
                <p
                  className="truncate text-sm"
                  style={{
                    fontFamily: isReading ? G.fontSerif : G.fontUI,
                    fontWeight: isReading ? 700 : 600,
                    color: "rgba(255,255,255,.96)",
                    letterSpacing: isReading ? "-.01em" : "0",
                  }}
                >
                  {title}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-[94px]" aria-hidden />
        </div>
      </div>
    </motion.header>
  );
}
