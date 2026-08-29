"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { sitePaths } from "@/lib/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Home -> Wiki cinematic handoff.
 *
 * On click, the home content plays the `.home-to-wiki-exit` descent
 * (device-calibrated: 760/700/640ms) while the CTA arrow commits downward,
 * then the route pushes. The wiki side already plays its own ascend when
 * returning (WikiNavBar) and OrbHomePage replays the mirrored entrance
 * through the `wafia:wiki-return` sessionStorage flag.
 *
 * Reduced motion: navigate immediately, no choreography.
 */
export function WikiBand() {
  const prefersReducedMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const EXIT_DURATION_MS = useMemo(() => {
    if (typeof window === "undefined") return 760;
    if (window.matchMedia("(max-width: 768px)").matches) return 640;
    if (window.matchMedia("(min-width: 769px) and (max-width: 1024px)").matches)
      return 700;
    return 760;
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return; // plain Link navigation

    e.preventDefault();
    if (isTransitioning) return;

    setIsTransitioning(true);
    document.getElementById("main-content")?.classList.add("home-to-wiki-exit");

    window.setTimeout(() => {
      window.location.href = sitePaths.wiki;
    }, EXIT_DURATION_MS);
  };

  return (
    <div className="mt-9 flex max-w-[600px] items-center justify-between gap-4 rounded-full border border-white/10 bg-[#1c1c1e]/35 py-4 pl-6 pr-4 backdrop-blur-xl">
      <div>
        <p className="mb-0.5 text-[9px] uppercase tracking-[0.24em] text-white/45">
          Ressource libre
        </p>
        <p className="text-[14.5px] font-bold text-white">
          Le Wiki de l&apos;influence
        </p>
      </div>
      <Link
        href={sitePaths.wiki}
        onClick={handleClick}
        aria-label="Ouvrir le Wiki de l'influence"
        className={`orb-shimmer-btn wiki-cta-float relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[13px] font-semibold text-white transition-colors duration-300 hover:border-white/25 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          isTransitioning ? "wiki-cta--transitioning pointer-events-none" : ""
        }`}
      >
        <span
          aria-hidden="true"
          className="wiki-cta-orbit absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15"
        />
        <span
          aria-hidden="true"
          className="wiki-cta-aura pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]"
        />
        <span
          aria-hidden="true"
          className="wiki-cta-icon relative inline-flex h-3 w-[15px] rounded-[2px_4px_4px_2px] border-[1.5px] border-current"
          style={{ borderRadius: "2px 4px 4px 2px" }}
        />
        Ouvrir
        <span aria-hidden="true" className="orb-nudge-arrow not-italic">
          <span className="wiki-cta-arrow inline-block">→</span>
        </span>
      </Link>
    </div>
  );
}
