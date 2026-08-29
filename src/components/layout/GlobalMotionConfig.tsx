"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global framer-motion configuration. Mounting it once at the root means
 * every animation in the tree (navs, sections, page transitions, drawers)
 * honours the user's prefers-reduced-motion setting through a single
 * source of truth. Reduced-motion users get instant, jump-free changes.
 */
export function GlobalMotionConfig({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
