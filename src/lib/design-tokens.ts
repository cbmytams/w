/**
 * Wafia Design Tokens — Single source of truth
 *
 * Rules:
 * - All components import visual constants from here
 * - No hardcoded colors, radius, shadows, or springs in components
 * - easing.ts remains canonical for EASING/DURATION (re-exported here)
 */

// Re-export animation tokens from canonical source
export { EASING, DURATION } from "./easing"

export const COLORS = {
  neutral: "slate",
  dark: {
    bg: "#0b111a",
    surface: "slate-900",
    border: "white/10",
  },
  brands: {
    accent: "orange-500",
    accentHover: "orange-600",
    gradient: "from-orange-500 to-red-500",
    gradientHover: "from-orange-600 to-red-600",
  },
  talents: {
    accent: "violet-600",
    gradient: "from-violet-600 via-purple-600 to-fuchsia-500",
  },
  feedback: {
    success: "emerald-500",
    danger: "rose-500",
  },
} as const

export const RADIUS = {
  card: "rounded-xl",
  prominent: "rounded-2xl",
  pill: "rounded-full",
} as const

export const SHADOW = {
  soft: "shadow-lg",
  elevated: "shadow-2xl",
} as const

export const SPRING = {
  responsive: { stiffness: 300, damping: 25 },
  gentle: { stiffness: 120, damping: 28 },
} as const

export const TYPOGRAPHY = {
  heading: "font-heading",
  body: "font-sans",
} as const

export const SECTION = {
  compact: "py-16 md:py-20",
  standard: "py-20 md:py-28",
  generous: "py-24 md:py-32",
} as const

export const HEADER_MARGIN = {
  sm: "mb-12",
  md: "mb-16",
  lg: "mb-20",
} as const

export const CARD = {
  dark: "rounded-xl bg-slate-900/80 backdrop-blur-xl border border-white/10",
  light: "rounded-xl bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10",
} as const
