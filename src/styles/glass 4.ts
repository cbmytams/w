export const wafiaGlass = {
  cardStyle: {
    background: "rgba(255, 248, 230, 0.04)",
    borderColor: "rgba(255, 235, 180, 0.09)",
    border: "1px solid rgba(255, 235, 180, 0.09)",
    boxShadow: "inset 0 1px 0 rgba(255, 240, 190, 0.14)",
    borderRadius: "1rem",
  },
  cardHoverStyle: {
    background: "rgba(255, 248, 230, 0.07)",
    borderColor: "rgba(255, 235, 180, 0.18)",
    boxShadow:
      "inset 0 1px 0 rgba(255,240,190,.20), 0 0 40px rgba(255,210,100,.07), 0 8px 32px rgba(0,0,0,.4)",
  },
  navbar: {
    background: "rgba(6, 5, 3, 0.78)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    borderBottom: "1px solid rgba(255, 235, 180, 0.07)",
  },
  pillActive: {
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0 1px 12px rgba(255,210,100,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
  },
  pillInactive: { background: "transparent", color: "rgba(255,245,220,0.35)" },
  backColor: "rgba(255, 210, 100, 0.9)",
  dotActive: { bg: "rgba(255,210,100,1)", glow: "0 0 8px rgba(255,210,100,0.5)" },
  dotInactive: { bg: "rgba(255,255,255,0.3)", glow: "none" },
  text1: "#FFFFFF",
  text2: "rgba(255, 245, 220, 0.55)",
  text3: "rgba(255, 245, 220, 0.25)",
  fontSerif: "'Playfair Display', Georgia, serif",
  fontUI: "-apple-system, 'Inter', var(--font-ui), sans-serif",
  spring: { type: "spring", stiffness: 280, damping: 32 } as const,
  springFast: { type: "spring", stiffness: 380, damping: 38 } as const,
} as const;
