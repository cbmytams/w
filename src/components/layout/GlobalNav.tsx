"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const FloatingNavigation = dynamic(
  () =>
    import("@/components/for-brands/FloatingNavigation").then(
      (mod) => mod.FloatingNavigation
    ),
  { loading: () => null }
);

const TalentsFloatingNavigation = dynamic(
  () =>
    import("@/components/for-talents/TalentsFloatingNavigation").then(
      (mod) => mod.TalentsFloatingNavigation
    ),
  { loading: () => null }
);

export function GlobalNav() {
  const pathname = usePathname();

  // Wiki has its own navigation
  if (pathname?.startsWith("/wiki")) {
    return null;
  }

  // Homepage = page Marques (single-page prod)
  if (pathname === "/") {
    return (
      <FloatingNavigation
        key={`brands-${pathname}`}
        estimateHref="/contact/brands"
      />
    );
  }

  // Talents page specific nav
  if (pathname === "/for-talents") {
    return <TalentsFloatingNavigation key={`talents-${pathname}`} />;
  }

  // All other pages manage their own navigation
  return null;
}
