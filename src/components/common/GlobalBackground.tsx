"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { BackgroundFlow } from "@/components/common/BackgroundFlow";
import { getGlobalBackgroundConfig } from "@/lib/background-flow";
import { useOrbTransition } from "@/components/home/orb/OrbTransitionProvider";

export function GlobalBackground() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const orbTransition = useOrbTransition();

  // Studio page has its own background
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  // Wiki paints a fully opaque --wiki-bg surface: the orb field underneath
  // would never be visible, so skip rendering it entirely (perf).
  if (pathname?.startsWith("/wiki")) {
    return null;
  }

  const routeConfig = getGlobalBackgroundConfig(
    pathname,
    searchParams.get("context")
  );

  // Prefer the live display variant so the orb field morphs ahead of the route.
  const variant = orbTransition?.displayVariant ?? routeConfig.variant;

  return <BackgroundFlow variant={variant} intensity={routeConfig.intensity} />;
}
