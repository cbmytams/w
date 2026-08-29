"use client";

import { useState, useEffect } from "react";
import { WafiaLogo } from "@/components/ui/WafiaLogo";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrbSwitcherPill } from "@/components/navigation/OrbSwitcherPill";
import { OrbLink } from "@/components/navigation/OrbLink";
import { BRAND_NAVIGATION } from "@/constants";
import { EASING, DURATION } from "@/lib/easing";
import { SPRING } from "@/lib/design-tokens";

// Animation Variants for the fluid Spatial UI cascading menu
const menuPlaqueVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      ...SPRING.responsive,
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, ...SPRING.responsive },
  },
};

interface FloatingNavigationProps {
  onEstimateClick?: () => void;
  estimateHref?: string;
}

export function FloatingNavigation({
  onEstimateClick,
  estimateHref,
}: FloatingNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Scroll spy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        // If we are at the very top of the page, clear the active section
        if (window.scrollY < 100) {
          setActiveSection(null);
          return;
        }

        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );
          const activeId = visibleEntries[0].target.id;
          setActiveSection(`#${activeId}`);
        }
      },
      {
        rootMargin: "-20% 0px -40% 0px", // Trigger active state when section is near top, improved ratio
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    // Small delay to ensure DOM is fully rendered before observing
    const timeoutId = setTimeout(() => {
      BRAND_NAVIGATION.forEach((item) => {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleEstimateClick = () => {
    onEstimateClick?.();
  };

  return (
    <>
      {/* 1. Left - Logo (Minimal & Clean) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: DURATION.slow, ease: EASING.entrance }}
        className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100]"
      >
        <OrbSwitcherPill current="brands" />
      </motion.div>

      {/* 2. Center - Navigation Pill (Premium Apple Style) - Desktop only */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DURATION.slower, ease: EASING.entrance }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] hidden lg:block"
      >
        <div className="h-12 bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] rounded-full p-1.5 shadow-lg border border-white/50 dark:border-white/10 flex items-center justify-center gap-1 relative">
          <div className="flex items-center gap-0.5 relative z-10 h-9">
            {BRAND_NAVIGATION.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative h-9 px-5 rounded-full transition-all duration-300 text-sm font-semibold leading-[1.2] text-center flex items-center justify-center min-w-[80px] ${
                    isActive
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBubble"
                      className="absolute inset-0 bg-white/60 dark:bg-white/20 rounded-full shadow-sm border border-black/5 dark:border-white/10"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>
          <div className="w-1"></div>
          {estimateHref ? (
            <Button
              asChild
              className="rounded-full bg-[#111111] dark:bg-white hover:bg-black dark:hover:bg-slate-100 px-6 h-9 text-white dark:text-black text-sm font-bold tracking-wide shadow-md transition-transform duration-300 hover:scale-105"
            >
              <OrbLink href={estimateHref}>Structurer ma campagne</OrbLink>
            </Button>
          ) : (
            <Button
              onClick={handleEstimateClick}
              className="rounded-full bg-[#111111] dark:bg-white hover:bg-black dark:hover:bg-slate-100 px-6 h-9 text-white dark:text-black text-sm font-bold tracking-wide shadow-md transition-transform duration-300 hover:scale-105"
            >
              Structurer ma campagne
            </Button>
          )}
        </div>
      </motion.nav>

      {/* 3. Right - Hamburger (Mobile) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: DURATION.slow, ease: EASING.entrance }}
        className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[100] flex items-center gap-3"
      >
        {/* Hamburger - Mobile only */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="h-12 w-12 lg:hidden flex items-center justify-center rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[40px] saturate-[180%] shadow-lg border border-white/50 dark:border-white/10 hover:scale-105 hover:bg-white/50 dark:hover:bg-[#1C1C1E]/80 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-white"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5 text-slate-900 dark:text-white" />
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with extreme blur and dimming */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: EASING.premium }}
              className="fixed inset-0 z-[150] bg-black/40 dark:bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Spatial Floating Menu Plaque WITH AURA */}
            <motion.div
              variants={menuPlaqueVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-x-4 top-[10%] bottom-[15%] z-[200] flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="w-full h-full max-h-[520px] max-w-sm bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[60px] saturate-[180%] border border-white/50 dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between pointer-events-auto relative overflow-hidden">
                {/* The Living Glass Aura (Ambient Orange Glow) */}
                <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-orange-500/20 dark:from-orange-500/10 to-transparent blur-[40px] pointer-events-none rounded-full" />
                <div className="absolute inset-x-0 -bottom-24 h-48 bg-gradient-to-t from-red-500/20 dark:from-red-500/10 to-transparent blur-[40px] pointer-events-none rounded-full" />

                {/* Header with Pulsing Dot & Context */}
                <div className="flex items-center justify-center mb-6 relative z-10">
                  <WafiaLogo className="h-6 w-auto text-black dark:text-white" />
                  <div className="flex items-center justify-center w-6 z-10 mx-3">
                    <div className="w-[6px] h-[6px] rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                  </div>
                  <span className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider leading-none mb-[1px]">
                    BRANDS
                  </span>
                </div>

                {/* Monumental Navigation Links (Cascading) */}
                <motion.nav className="flex-1 flex flex-col items-center justify-center space-y-3 overflow-y-auto relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {BRAND_NAVIGATION.map((item) => {
                    const isActive = activeSection === item.href;
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        variants={menuItemVariants}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`relative px-6 py-2.5 text-2xl font-black tracking-tighter transition-all duration-300 hover:scale-105 active:scale-95 group ${
                          isActive
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-500/80 dark:text-slate-400/80 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeBubbleMobileBrand"
                            className="absolute inset-0 bg-white/70 dark:bg-white/20 backdrop-blur-md rounded-full shadow-md border border-white/50 dark:border-white/10 -z-10"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <span className="relative z-10">{item.label}</span>
                      </motion.a>
                    );
                  })}
                </motion.nav>

                {/* Action Buttons (Global & Conversion) */}
                <div className="mt-6 w-full flex flex-col gap-3 relative z-10 shrink-0">
                  {/* Secondary: Menu principal */}
                  <motion.div variants={menuItemVariants}>
                    <OrbLink
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-12 w-full flex items-center justify-center gap-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 text-base font-semibold text-slate-700 dark:text-slate-300 group"
                    >
                      <Home className="h-[18px] w-[18px] group-hover:scale-110 transition-transform" />
                      Menu principal
                    </OrbLink>
                  </motion.div>

                  {/* Primary CTA Button */}
                  <motion.div variants={menuItemVariants}>
                    {estimateHref ? (
                      <OrbLink
                        href={estimateHref}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-14 w-full items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-lg shadow-lg hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        Structurer ma campagne
                      </OrbLink>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleEstimateClick();
                        }}
                        className="h-14 w-full rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-lg shadow-lg hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:focus-visible:outline-black"
                      >
                        Structurer ma campagne
                      </button>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Detached Ergonomic Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{ type: "spring", ...SPRING.responsive, delay: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[250] h-14 w-14 flex items-center justify-center rounded-full bg-white/40 dark:bg-[#1C1C1E]/60 backdrop-blur-[60px] saturate-[180%] border border-white/50 dark:border-white/10 shadow-lg hover:scale-110 active:scale-95 transition-all"
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6 text-slate-900 dark:text-white" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
