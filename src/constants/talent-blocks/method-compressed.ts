/**
 * Compressed Method — 4 phases with benefit sentences
 *
 * The full 8-step detail from TALENT_JOURNEY_STEPS remains available
 * for the expandable accordion. This file provides the compressed view.
 */

export interface CompressedPhase {
  id: string;
  name: string;
  label: string;
  icon: string;
  gradient: string;
  benefit: string;
}

export const TALENT_METHOD_PHASES: CompressedPhase[] = [
  {
    id: "diagnostic",
    name: "Diagnostic",
    label: "Mois 0 → 1",
    icon: "Search",
    gradient: "from-slate-700 to-slate-900",
    benefit:
      "On clarifie ton positionnement, ton potentiel business et les mauvais deals à éviter.",
  },
  {
    id: "foundation",
    name: "Fondation",
    label: "Mois 1 → 3",
    icon: "Layers",
    gradient: "from-orange-500 to-red-500",
    benefit: "On structure ton image, tes formats et ton offre commerciale.",
  },
  {
    id: "growth",
    name: "Croissance",
    label: "Mois 3 → 12",
    icon: "TrendingUp",
    gradient: "from-rose-500 to-red-500",
    benefit: "On industrialise la production, les partenariats et le pilotage.",
  },
  {
    id: "independence",
    name: "Autonomie",
    label: "Mois 12 → 36",
    icon: "Crown",
    gradient: "from-amber-500 to-orange-500",
    benefit: "On construit une équipe et des process qui te rendent durable.",
  },
];

export const METHOD_SECTION_HEADER = {
  id: "method",
  title: "Notre méthode",
  subtitle: "De l'audit initial à l'autonomie complète.",
  signature: "Notre succès se mesure à votre indépendance.",
  expandLabel: "Voir le détail de la méthode",
  collapseLabel: "Masquer le détail",
} as const;
