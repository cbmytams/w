"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { isModifiedClick, type OrbTargetVariant } from "@/lib/orb-targets";

/**
 * Returns a click handler that keeps internal navigation predictable while
 * preserving modified-click browser behavior.
 */
export function useOrbNavigate() {
  const router = useRouter();

  return useCallback(
    (href: string, _target: OrbTargetVariant) => (e: React.MouseEvent) => {
      if (isModifiedClick(e)) return;
      e.preventDefault();
      router.push(href);
    },
    [router]
  );
}
