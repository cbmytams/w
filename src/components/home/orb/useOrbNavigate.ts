"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  useOrbTransition,
  type OrbTargetVariant,
} from "./OrbTransitionProvider";
import { isModifiedClick } from "@/lib/orb-targets";

/**
 * Returns a click handler that morphs the background to the target page's
 * variant, then navigates. The Link keeps its prefetch-on-hover behaviour;
 * we only intercept the click. Modified clicks (⌘/Ctrl/Shift/middle) fall
 * through to the browser so new-tab behaviour keeps working.
 */
export function useOrbNavigate() {
  const ctx = useOrbTransition();
  const router = useRouter();

  return useCallback(
    (href: string, target: OrbTargetVariant) => (e: React.MouseEvent) => {
      if (isModifiedClick(e)) return;
      if (!ctx) {
        // Provider missing (should not happen) — navigate normally.
        e.preventDefault();
        router.push(href);
        return;
      }
      e.preventDefault();
      ctx.start({ href, target });
    },
    [ctx, router]
  );
}
