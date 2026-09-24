export const HOME_OPTIONS = [
  {
    id: "talent",
    label: "Talents",
    description: "Image, revenus, carrière",
    icon: "Sparkles",
    route: "/for-talents",
    gradient: "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
    hoverGradient: "from-indigo-500/30 via-purple-500/30 to-pink-500/30",
    glowColor: "rgba(139, 92, 246, 0.15)",
    expandColor: "from-indigo-600 to-purple-700",
  },
  {
    id: "brand",
    label: "Marques",
    description: "Campagnes créateurs",
    icon: "Briefcase",
    route: "/",
    gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
    hoverGradient: "from-orange-500/30 via-red-500/30 to-pink-500/30",
    glowColor: "rgba(249, 115, 22, 0.15)",
    expandColor: "from-orange-600 to-red-600",
  },
] as const;
