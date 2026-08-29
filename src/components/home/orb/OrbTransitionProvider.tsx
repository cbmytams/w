"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getGlobalBackgroundConfig,
  type BackgroundFlowVariant,
} from "@/lib/background-flow";

/* Continuous orb transition: on click we switch the single persistent orb
   field to the target variant (displayVariant). Because the orb elements keep
   stable keys, framer-motion morphs their position + colour instead of
   remounting — the same orbs travel and stay, so the two pages feel chained
   rather than cut. The content swaps (PageTransition) after a short delay,
   while the orbs are already mid-flight toward the destination layout. */
export type OrbTargetVariant = "brands" | "talents" | "home";

type OrbDeviceProfile = "desktop" | "tablet" | "mobile";

// Lead-time before the route pushes (orbs are already morphing) and total
// morph window. Shorter on touch devices so a tap feels immediate.
const ORB_TIMING: Record<
  OrbDeviceProfile,
  { pushAtMs: number; morphClearMs: number }
> = {
  desktop: { pushAtMs: 520, morphClearMs: 760 },
  tablet: { pushAtMs: 430, morphClearMs: 620 },
  mobile: { pushAtMs: 340, morphClearMs: 480 },
};

interface OrbTransitionOptions {
  href: string;
  target: OrbTargetVariant;
}

interface OrbTransitionContextValue {
  start: (opts: OrbTransitionOptions) => void;
  /** The variant the orb field should currently display (may lead the route). */
  displayVariant: BackgroundFlowVariant;
}

const OrbTransitionContext = createContext<OrbTransitionContextValue | null>(
  null
);

export function OrbTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  // During a transition we lead with the target variant; otherwise the displayed
  // variant follows the route. Deriving it (instead of syncing in an effect)
  // keeps a single source of truth and avoids cascading re-renders.
  const [override, setOverride] = useState<BackgroundFlowVariant | null>(null);
  const [deviceProfile, setDeviceProfile] =
    useState<OrbDeviceProfile>("desktop");
  const busyRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileMedia = window.matchMedia("(max-width: 768px)");
    const tabletMedia = window.matchMedia(
      "(min-width: 769px) and (max-width: 1024px)"
    );
    const update = () => {
      if (mobileMedia.matches) {
        setDeviceProfile("mobile");
        return;
      }
      if (tabletMedia.matches) {
        setDeviceProfile("tablet");
        return;
      }
      setDeviceProfile("desktop");
    };

    update();
    mobileMedia.addEventListener("change", update);
    tabletMedia.addEventListener("change", update);

    return () => {
      mobileMedia.removeEventListener("change", update);
      tabletMedia.removeEventListener("change", update);
    };
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    timeoutsRef.current.push(window.setTimeout(fn, ms));
  }, []);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const displayVariant: BackgroundFlowVariant =
    override ?? getGlobalBackgroundConfig(pathname, null).variant;

  const start = useCallback(
    (opts: OrbTransitionOptions) => {
      if (busyRef.current) return;

      if (prefersReducedMotion) {
        router.push(opts.href);
        return;
      }

      busyRef.current = true;
      setOverride(opts.target);
      const { pushAtMs, morphClearMs } = ORB_TIMING[deviceProfile];
      later(() => {
        router.push(opts.href);
      }, pushAtMs);
      later(() => {
        busyRef.current = false;
        setOverride(null);
      }, pushAtMs + morphClearMs);
    },
    [deviceProfile, later, prefersReducedMotion, router]
  );

  return (
    <OrbTransitionContext.Provider value={{ start, displayVariant }}>
      {children}
    </OrbTransitionContext.Provider>
  );
}

export function useOrbTransition(): OrbTransitionContextValue | null {
  return useContext(OrbTransitionContext);
}
