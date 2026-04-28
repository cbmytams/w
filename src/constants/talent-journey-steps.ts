/**
 * Talent Journey Steps — Parcours Complet sur 3 Ans
 *
 * Structure : 4 phases, 12 étapes
 * Design : Timeline verticale animée (inspiré ProcessSection Brand)
 */

// Types
export type JourneyPhase =
  | "diagnostic"
  | "foundation"
  | "growth"
  | "independence";

export interface JourneyStep {
  id: string;
  num: string;
  phase: JourneyPhase;
  title: string;
  duration: string;
  deliverable: string;
  points: string[];
  widget?: string;
}

export interface PhaseConfig {
  id: JourneyPhase;
  name: string;
  label: string;
  icon: string;
  gradient: string;
  borderColor: string;
}

// Header
export const TALENT_JOURNEY_HEADER = {
  id: "journey",
  badge: "Architecture de carrière",
  title: "Une méthode",
  titleHighlight: "pour tenir dans la durée",
  subtitle: "Image, projets, revenus, droits et autonomie.",
  signature: "Notre succès se mesure à votre indépendance.",
} as const;

// Phases Configuration
export const TALENT_JOURNEY_PHASES: PhaseConfig[] = [
  {
    id: "diagnostic",
    name: "DIAGNOSTIC",
    label: "Mois 0 → 1",
    icon: "Search",
    gradient: "from-violet-500 to-purple-500",
    borderColor: "border-violet-500",
  },
  {
    id: "foundation",
    name: "FONDATION",
    label: "Mois 1 → 3",
    icon: "Layers",
    gradient: "from-purple-500 to-fuchsia-500",
    borderColor: "border-purple-500",
  },
  {
    id: "growth",
    name: "CROISSANCE",
    label: "Mois 3 → 12",
    icon: "TrendingUp",
    gradient: "from-fuchsia-500 to-pink-500",
    borderColor: "border-fuchsia-500",
  },
  {
    id: "independence",
    name: "INDÉPENDANCE",
    label: "Mois 12 → 36",
    icon: "Crown",
    gradient: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500",
  },
] as const;

// Steps — Condensed to 8
export const TALENT_JOURNEY_STEPS: JourneyStep[] = [
  // Phase 1: DIAGNOSTIC (2 steps — merged from 3)
  {
    id: "audit",
    num: "01",
    phase: "diagnostic",
    title: "Audit & Diagnostic",
    duration: "2 semaines",
    deliverable: "Rapport d'audit + cartographie d'opportunités",
    points: [
      "Analyse positionnement actuel & perception",
      "Audit image, audience, projets et revenus",
      "Partenariats alignés vs opportunités à éviter",
      "Pricing plancher & conditions non-négociables",
    ],
    widget: "IdentityLens",
  },
  {
    id: "roadmap",
    num: "02",
    phase: "diagnostic",
    title: "Roadmap 90 Jours",
    duration: "1 semaine",
    deliverable: "Roadmap validée",
    points: [
      "Priorités court-terme identifiées",
      "Actions immédiates pour clarifier l'image",
      "Livrables attendus, jalons et arbitrages",
      "Ressources nécessaires mappées",
    ],
  },

  // Phase 2: FONDATION (2 steps — merged from 3)
  {
    id: "identity",
    num: "03",
    phase: "foundation",
    title: "Identité & Positionnement",
    duration: "2 semaines",
    deliverable: "Brand Book",
    points: [
      "Phrase de positionnement claire",
      "Direction artistique & univers visuel",
      "Ton de marque & territoire d'expression",
      "Cohérence cross-plateformes",
    ],
  },
  {
    id: "series-offers",
    num: "04",
    phase: "foundation",
    title: "Formats, projets & offres",
    duration: "4 semaines",
    deliverable: "Bible d'image + catalogue d'offres",
    points: [
      "Formats et supports adaptés au talent",
      "Projets prioritaires et prises de parole clés",
      "Offres structurées pour marques, scène ou collaborations",
      "Tarifs planchers, droits et conditions",
    ],
    widget: "SeriesFormats",
  },

  // Phase 3: CROISSANCE (3 steps — merged from 4)
  {
    id: "production",
    num: "05",
    phase: "growth",
    title: "Production & supports",
    duration: "Continu",
    deliverable: "Pipeline actif",
    points: [
      "Workflow tournage → post-prod optimisé",
      "Checklists qualité & validation",
      "Gestion fichiers & assets",
      "Coordination équipe créative ou artistique",
    ],
    widget: "ProductionPipeline",
  },
  {
    id: "commercial",
    num: "06",
    phase: "growth",
    title: "Opportunités & partenariats",
    duration: "Continu",
    deliverable: "Pipeline opportunités",
    points: [
      "Filtrage entrant (image, budget, risques)",
      "Négociation des partenariats, bookings et collaborations",
      "Suivi exécution, contrats et facturation",
      "Relations long terme avec marques, médias et partenaires",
    ],
    widget: "DealDesk",
  },
  {
    id: "kpis-events",
    num: "07",
    phase: "growth",
    title: "Pilotage & activations",
    duration: "Continu",
    deliverable: "Dashboard live + Activations terrain",
    points: [
      "5 KPIs max, revue hebdo Stop/Scale/Test",
      "Lecture performance des contenus, projets et revenus",
      "Gestion bookings, événements et coordination terrain",
      "Captation, production live et actifs réutilisables",
    ],
    widget: "KPIPulse",
  },

  // Phase 4: INDÉPENDANCE (1 step — merged from 2)
  {
    id: "autonomy",
    num: "08",
    phase: "independence",
    title: "Équipe & autonomie",
    duration: "12+ mois",
    deliverable: "Autonomie totale",
    points: [
      "Recrutement de l'équipe adaptée au talent",
      "Documentation des protocoles internes",
      "Transfert de compétences & formations avancées",
      "Notre agence évolue vers un rôle de conseil stratégique",
    ],
  },
] as const;

// Helper function to get steps by phase
export function getStepsByPhase(phase: JourneyPhase): JourneyStep[] {
  return TALENT_JOURNEY_STEPS.filter((step) => step.phase === phase);
}

// Helper function to get phase config
export function getPhaseConfig(phase: JourneyPhase): PhaseConfig | undefined {
  return TALENT_JOURNEY_PHASES.find((p) => p.id === phase);
}
