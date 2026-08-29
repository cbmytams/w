"use client";

import { useEffect } from "react";
import Link from "next/link";
import { sitePaths } from "@/lib/site";
import { useOrbNavigate } from "@/components/home/orb/useOrbNavigate";
import { HomePillNav } from "./HomePillNav";
import { KineticTitle } from "./KineticTitle";
import { WikiBand } from "./WikiBand";

const ORIENTATION_ROWS = [
  {
    href: sitePaths.forBrands,
    market: "brands" as const,
    label: "Vous êtes une marque",
    className: "orb-row-brands",
  },
  {
    href: sitePaths.forTalents,
    market: "talents" as const,
    label: "Vous êtes un talent",
    className: "orb-row-talents",
  },
];

export function OrbHomePage() {
  const navigateWithCloud = useOrbNavigate();

  // The home is a dark-first design: force the dark theme while mounted,
  // then restore the previous state when leaving.
  useEffect(() => {
    const el = document.documentElement;
    const hadDarkElsewhere =
      el.classList.contains("dark") && el.dataset.orbDark !== "1";
    el.classList.add("dark");
    el.dataset.orbDark = "1";
    return () => {
      if (!hadDarkElsewhere) el.classList.remove("dark");
      delete el.dataset.orbDark;
    };
  }, []);

  return (
    <>
      <main
        id="main-content"
        className="orb-home-content relative z-10 min-h-screen"
      >
        <HomePillNav />

        <section className="px-5 pb-14 pt-10 sm:px-16 sm:pt-16">
          <KineticTitle prefix={["Wafia structure", "l'influence pour"]} />

          <div className="mt-11 flex flex-wrap gap-2.5">
            {ORIENTATION_ROWS.map((row) => (
              <Link
                key={row.href}
                href={row.href}
                onClick={navigateWithCloud(row.href, row.market)}
                className={`orb-orientation-row inline-flex items-center gap-5 rounded-full border border-white/10 bg-[#1c1c1e]/35 px-5 py-2.5 backdrop-blur-xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${row.className}`}
              >
                <b className="text-[13px] font-semibold tracking-[0.01em] text-white">
                  {row.label}
                </b>
                <span
                  aria-hidden="true"
                  className="orb-row-arrow text-sm text-white/35"
                >
                  →
                </span>
              </Link>
            ))}
          </div>

          <WikiBand />
        </section>
      </main>
    </>
  );
}
