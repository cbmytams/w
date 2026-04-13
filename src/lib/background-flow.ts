export type BackgroundFlowVariant = "brands" | "talents";
export type BackgroundFlowIntensity = "base" | "showcase";

export type BackgroundRuntimeProfile = {
  isConstrainedRuntime: boolean;
  mobileLite: boolean;
  allowBubbleMotion: boolean;
  bubbleCount: 3 | 5;
};

export function getGlobalBackgroundConfig(
  pathname: string | null | undefined,
  legalContext: string | null
): { variant: BackgroundFlowVariant; intensity: BackgroundFlowIntensity } {
  if (pathname?.startsWith("/for-brands")) {
    return { variant: "brands", intensity: "showcase" };
  }

  if (pathname?.startsWith("/for-talents")) {
    return { variant: "talents", intensity: "showcase" };
  }

  if (pathname?.startsWith("/services")) {
    return { variant: "brands", intensity: "base" };
  }

  if (pathname?.startsWith("/wiki")) {
    return { variant: "brands", intensity: "base" };
  }

  if (pathname?.startsWith("/legal")) {
    return {
      variant: legalContext === "brands" ? "brands" : "talents",
      intensity: "base",
    };
  }

  return { variant: "brands", intensity: "base" };
}

export function shouldAnimateAmbientPhase({
  variant,
  intensity,
  prefersReducedMotion,
  isConstrainedRuntime,
}: {
  variant: BackgroundFlowVariant;
  intensity: BackgroundFlowIntensity;
  prefersReducedMotion: boolean;
  isConstrainedRuntime: boolean;
}): boolean {
  if (prefersReducedMotion || isConstrainedRuntime) {
    return false;
  }

  return variant === "talents" || intensity === "showcase";
}

export function shouldAnimateShowcaseAccent({
  intensity,
  prefersReducedMotion,
  isConstrainedRuntime,
}: {
  intensity: BackgroundFlowIntensity;
  prefersReducedMotion: boolean;
  isConstrainedRuntime: boolean;
}): boolean {
  return (
    intensity === "showcase" && !prefersReducedMotion && !isConstrainedRuntime
  );
}

export function getBackgroundRuntimeProfile({
  isMobile,
  saveData,
  lowMemory,
  prefersReducedMotion,
}: {
  isMobile: boolean;
  saveData: boolean;
  lowMemory: boolean;
  prefersReducedMotion: boolean;
}): BackgroundRuntimeProfile {
  const isConstrainedRuntime = saveData || lowMemory;
  const mobileLite = isMobile || isConstrainedRuntime;
  const allowBubbleMotion = !prefersReducedMotion && !isConstrainedRuntime;

  return {
    isConstrainedRuntime,
    mobileLite,
    allowBubbleMotion,
    bubbleCount: mobileLite ? 3 : 5,
  };
}
