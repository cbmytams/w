"use client";

import { OrbSwitcherPill } from "@/components/navigation/OrbSwitcherPill";

export function HomePillNav() {
  return (
    <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8">
      <OrbSwitcherPill current="home" tone="dark" />
    </header>
  );
}
