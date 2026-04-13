/**
 * WAFIA BRAND DIAGNOSTIC - SCORING UTILITIES
 * Lead scoring, pillar scoring, et analyse des résultats
 */

import type {
  Question,
  Answers,
  Scores,
  BrandPillarKey,
  BrandDiagnosticResult,
  RadarDataPoint,
  CalibrationData,
  LeadScore,
  LeadTier,
  LeadScoreBreakdown,
  NorthStarObjective,
  ServiceRecommendation,
  PackageSuggestion,
  PackageTier,
} from "../types";
import {
  PILLARS,
  PILLAR_ORDER,
  INITIAL_SCORES,
  LEVEL_THRESHOLDS,
} from "../constants";

// Alias for backward compat
type PillarKey = BrandPillarKey;

const SECTION_TO_PILLAR: Partial<Record<Question["category"], PillarKey>> = {
  IDENTIFICATION: "STRATEGY",
  NORTH_STAR: "STRATEGY",
  MATURITY: "DATA",
  NEEDS_AWARENESS: "ACTIVATION",
  NEEDS_TRAFFIC: "ACTIVATION",
  NEEDS_CONVERSION: "ACTIVATION",
  NEEDS_RETENTION: "ACTIVATION",
  SERVICES: "CONTENT",
  BUDGET: "ACTIVATION",
  COMPETITIVE: "STRATEGY",
  ORGANIZATION: "ORGANIZATION",
};

// ============================================
// PILLAR SCORING (marketing maturity)
// ============================================

/**
 * Calcule les scores pour chaque pilier basé sur les réponses
 */
export function calculateScores(
  answers: Answers,
  questions: Question[]
): Scores {
  const scores: Scores = { ...INITIAL_SCORES };

  for (const [questionId, answer] of Object.entries(answers)) {
    const question = questions.find((q) => q.id === questionId);
    if (!question) continue;

    switch (question.type) {
      case "single": {
        const selectedOption = question.options?.find((o) => o.id === answer);
        if (selectedOption?.impacts) {
          applyImpacts(scores, selectedOption.impacts);
        }
        break;
      }

      case "multiple": {
        const selectedIds = answer as string[];
        for (const optionId of selectedIds) {
          const selectedOption = question.options?.find(
            (o) => o.id === optionId
          );
          if (selectedOption?.impacts) {
            applyImpacts(scores, selectedOption.impacts);
          }
        }
        break;
      }

      case "scale": {
        const value = answer as number;
        const mid = ((question.min || 1) + (question.max || 10)) / 2;
        const impact = Math.round((value - mid) * 2);

        const category = question.category as string;
        const directPillar =
          category in scores ? (category as PillarKey) : null;
        const mappedPillar =
          directPillar ?? SECTION_TO_PILLAR[question.category] ?? null;

        if (mappedPillar) {
          scores[mappedPillar] = clampScore(scores[mappedPillar] + impact);
        }
        break;
      }

      // Text/email/tel/url/dropdown don't impact pillar scores
      default:
        break;
    }
  }

  return scores;
}

function applyImpacts(
  scores: Scores,
  impacts: { pillar: PillarKey; weight: number }[]
): void {
  for (const impact of impacts) {
    if (impact.pillar in scores) {
      scores[impact.pillar] = clampScore(scores[impact.pillar] + impact.weight);
    }
  }
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, value));
}

// ============================================
// LEAD SCORING
// ============================================

/**
 * Budget scoring (30% weight)
 * Maps budget answer to a 0-100 subscale
 */
function scoreBudget(answers: Answers): number {
  const budgetMap: Record<string, number> = {
    under_5k: 15,
    under_10k: 25,
    "5_15k": 40,
    "10_30k": 55,
    "15_30k": 55,
    "30_50k": 75,
    "30_70k": 80,
    over_50k: 95,
    over_70k: 100,
    undefined: 20,
    to_define: 20,
  };

  // Check both ql_budget and f_budget_global (deep qualification overrides quick lead)
  const detailedBudget = answers["f_budget_global"] as string | undefined;
  const quickBudget = answers["ql_budget"] as string | undefined;
  const key = detailedBudget || quickBudget || "undefined";

  return budgetMap[key] ?? 20;
}

/**
 * Urgency scoring (20% weight)
 */
function scoreUrgency(answers: Answers): number {
  const urgencyMap: Record<string, number> = {
    immediate: 100,
    this_month: 80,
    quarter: 50,
    exploration: 20,
    planning: 30,
    flexible: 40,
  };

  // From quick lead or budget section
  const startDate = answers["f_start"] as string | undefined;
  const quickUrgency = answers["ql_urgency"] as string | undefined;
  const key = startDate || quickUrgency || "exploration";

  return urgencyMap[key] ?? 30;
}

/**
 * Marketing maturity scoring (15% weight)
 * Based on channels, measurement, and frustrations
 */
function scoreMaturity(answers: Answers, scores: Scores): number {
  // Use the average of pillar scores as a maturity indicator
  const pillarValues = Object.values(scores);
  const avg = pillarValues.reduce((sum, v) => sum + v, 0) / pillarValues.length;

  // Bonus for having multiple channels
  const channels = answers["c_channels"] as string[] | undefined;
  const channelBonus = channels ? Math.min(channels.length * 5, 25) : 0;

  // Bonus for having measurement tools
  const measurement = answers["c_measurement"] as string[] | undefined;
  const measurementBonus = measurement
    ? Math.min(measurement.length * 8, 30)
    : 0;

  // Penalty for 'nothing' or 'unknown' in measurement
  const hasBadMeasurement = measurement?.some(
    (m) => m === "nothing" || m === "unknown"
  );
  const measurementPenalty = hasBadMeasurement ? -20 : 0;

  return clampScore(
    avg * 0.5 + channelBonus + measurementBonus + measurementPenalty
  );
}

/**
 * Service fit scoring (20% weight)
 * How well the brand's needs match Wafia's services
 */
function scoreFit(answers: Answers): number {
  let fit = 40; // Base

  // Influence types → core Wafia service
  const influenceTypes = answers["e_influence_type"] as string[] | undefined;
  if (influenceTypes && influenceTypes.length > 0) {
    fit += 15;
    if (influenceTypes.includes("whitelisting")) fit += 10;
    if (influenceTypes.includes("long_term")) fit += 10;
  }

  // Production needs → Wafia content production
  const production = answers["e_production"] as string[] | undefined;
  if (production && production.length > 0 && !production.includes("none")) {
    fit += 10;
    if (production.includes("ugc")) fit += 10;
  }

  // Media buying delegation
  const mediaBuying = answers["e_media_buying"] as string | undefined;
  if (mediaBuying === "full") fit += 10;
  if (mediaBuying === "supervised") fit += 5;

  return clampScore(fit);
}

/**
 * Decision power scoring (15% weight)
 * Whether the respondent has authority to make decisions
 */
function scoreDecision(answers: Answers): number {
  let decision = 40;

  // Role / function importance
  const roleMap: Record<string, number> = {
    ceo: 30,
    cmo: 25,
    com_director: 20,
    product: 10,
    other: 5,
  };
  const role = answers["ql_function"] as string | undefined;
  decision += roleMap[role ?? "other"] ?? 5;

  // Budget validator proximity
  const validator = answers["a_budget_validator"] as string | undefined;
  if (validator === "me") decision += 25;
  else if (validator === "cmo") decision += 15;
  else if (validator === "ceo" || validator === "cfo") decision += 10;
  else if (validator === "committee") decision += 5;

  // Decision process speed
  const process = answers["h_decision_process"] as string | undefined;
  if (process === "fast") decision += 10;
  else if (process === "structured") decision += 5;

  return clampScore(decision);
}

/**
 * Calcule le lead score complet
 */
export function calculateLeadScore(
  answers: Answers,
  scores: Scores
): LeadScore {
  const breakdown: LeadScoreBreakdown = {
    budget: scoreBudget(answers),
    urgency: scoreUrgency(answers),
    maturity: scoreMaturity(answers, scores),
    fit: scoreFit(answers),
    decision: scoreDecision(answers),
  };

  // Weighted total: Budget 30%, Urgency 20%, Maturity 15%, Fit 20%, Decision 15%
  const total = Math.round(
    breakdown.budget * 0.3 +
      breakdown.urgency * 0.2 +
      breakdown.maturity * 0.15 +
      breakdown.fit * 0.2 +
      breakdown.decision * 0.15
  );

  let tier: LeadTier;
  if (total >= 80) tier = "hot";
  else if (total >= 60) tier = "warm";
  else if (total >= 40) tier = "cool";
  else tier = "cold";

  return { total, breakdown, tier };
}

// ============================================
// RESULT GENERATION
// ============================================

export function identifyStrengthAndWeakness(scores: Scores): {
  strength: PillarKey;
  weakness: PillarKey;
} {
  const entries = Object.entries(scores) as [PillarKey, number][];
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  return {
    strength: sorted[0][0],
    weakness: sorted[sorted.length - 1][0],
  };
}

export function calculateOverallScore(scores: Scores): number {
  const values = Object.values(scores);
  return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
}

export function determineLevel(
  overallScore: number
): BrandDiagnosticResult["level"] {
  if (overallScore >= LEVEL_THRESHOLDS.expert) return "expert";
  if (overallScore >= LEVEL_THRESHOLDS.avance) return "avance";
  if (overallScore >= LEVEL_THRESHOLDS.intermediaire) return "intermediaire";
  return "debutant";
}

/**
 * Génère les recommandations basées sur le profil
 */
export function generateRecommendations(
  scores: Scores,
  weakness: PillarKey,
  northStar: NorthStarObjective
): string[] {
  const recommendations: string[] = [];

  // Weakness-based recommendations
  switch (weakness) {
    case "STRATEGY":
      recommendations.push(
        "Définir une stratégie brand content structurée avec des objectifs SMART"
      );
      if (scores.STRATEGY < 40)
        recommendations.push(
          "Réaliser un audit de positionnement et benchmark concurrentiel"
        );
      break;
    case "CONTENT":
      recommendations.push(
        "Structurer une production de contenus régulière avec des créateurs alignés"
      );
      if (scores.CONTENT < 40)
        recommendations.push(
          "Investir dans du UGC professionnel pour alimenter votre mix créatif"
        );
      break;
    case "ACTIVATION":
      recommendations.push(
        "Diversifier vos leviers d'activation (paid, influence, SEO)"
      );
      if (scores.ACTIVATION < 40)
        recommendations.push(
          "Démarrer par du social ads + whitelisting pour des résultats rapides"
        );
      break;
    case "DATA":
      recommendations.push(
        "Mettre en place un tracking end-to-end fiable (pixels, UTMs, attribution)"
      );
      if (scores.DATA < 40)
        recommendations.push(
          "Implémenter un dashboard de reporting unifié pour piloter les performances"
        );
      break;
    case "ORGANIZATION":
      recommendations.push(
        "Structurer les workflows marketing avec des process de validation clairs"
      );
      if (scores.ORGANIZATION < 40)
        recommendations.push(
          "Envisager un accompagnement agence full-service pour combler les gaps d'équipe"
        );
      break;
  }

  // North Star-specific recommendations
  switch (northStar) {
    case "awareness":
      recommendations.push(
        "Activer une stratégie multi-créateurs pour maximiser le reach organique"
      );
      break;
    case "traffic":
      recommendations.push(
        "Combiner UGC ads + SEO content pour générer du trafic qualifié à fort ROI"
      );
      break;
    case "conversion":
      recommendations.push(
        "Optimiser votre funnel avec du retargeting dynamique et des UGC ads performants"
      );
      break;
    case "retention":
      recommendations.push(
        "Lancer un programme ambassadeurs structuré avec des créateurs long-terme"
      );
      break;
  }

  return recommendations.slice(0, 5);
}

/**
 * Détermine le package recommandé basé sur le budget
 */
function determinePackage(
  answers: Answers,
  northStar: NorthStarObjective
): PackageSuggestion {
  const budgetMap: Record<string, PackageTier> = {
    under_5k: "starter",
    under_10k: "starter",
    "5_15k": "growth",
    "10_30k": "growth",
    "15_30k": "growth",
    "30_50k": "scale",
    "30_70k": "scale",
    over_50k: "enterprise",
    over_70k: "enterprise",
    undefined: "growth",
    to_define: "growth",
  };

  const budget = (answers["f_budget_global"] ||
    answers["ql_budget"] ||
    "undefined") as string;
  const tier = budgetMap[budget] ?? "growth";

  const packages: Record<PackageTier, PackageSuggestion> = {
    starter: {
      tier: "starter",
      label: "Starter",
      summary:
        "Premiers pas avec l'influence marketing — Tests et apprentissage",
      priceRange: "3 – 10K€/mois",
      features: [
        "Stratégie influence ciblée",
        "5-10 nano/micro-créateurs",
        "Production UGC basique",
        "Reporting mensuel",
      ],
      duration: "3 mois minimum",
      objective:
        northStar === "awareness"
          ? "Gagner en visibilité"
          : northStar === "traffic"
            ? "Premiers flux de visiteurs"
            : northStar === "conversion"
              ? "Tester les premiers leviers de conversion"
              : "Poser les bases de la fidélisation",
    },
    growth: {
      tier: "growth",
      label: "Growth",
      summary: "Accélération — Mix influence + paid + production",
      priceRange: "10 – 30K€/mois",
      features: [
        "Stratégie multi-canaux",
        "10-30 créateurs mix nano/micro/macro",
        "Production UGC + déclinaisons ads",
        "Paid media management (Meta, TikTok)",
        "Reporting bi-mensuel avancé",
      ],
      duration: "6 mois recommandés",
      objective:
        northStar === "awareness"
          ? "Installer la marque durablement"
          : northStar === "traffic"
            ? "Scaler l'acquisition"
            : northStar === "conversion"
              ? "Optimiser le ROAS et baisser le CAC"
              : "Structurer un programme ambassadeurs",
    },
    scale: {
      tier: "scale",
      label: "Scale",
      summary: "Performance multi-canaux — Full-funnel intégré",
      priceRange: "30 – 70K€/mois",
      features: [
        "Direction stratégique dédiée",
        "30-100+ créateurs multi-tiers",
        "Studio UGC + whitelisting",
        "Paid media avancé (PMax, Attribution)",
        "Dashboard temps réel",
        "Community management premium",
      ],
      duration: "12 mois recommandés",
      objective:
        northStar === "awareness"
          ? "Dominer le Share of Voice"
          : northStar === "traffic"
            ? "Trafic qualifié à grande échelle"
            : northStar === "conversion"
              ? "Machine de conversion optimisée"
              : "Écosystème communautaire complet",
    },
    enterprise: {
      tier: "enterprise",
      label: "Enterprise",
      summary: "Full-Service 360° — Squad dédiée & MMM",
      priceRange: "70K€+/mois",
      features: [
        "Squad dédiée multi-métiers",
        "Programme créateurs exclusif",
        "Studio de production intégré",
        "Marketing Mix Modeling (MMM)",
        "Brand Lift Studies",
        "Direction artistique premium",
        "Reporting C-Level",
      ],
      duration: "12+ mois",
      objective:
        "Transformation marketing complète avec mesure d'impact business",
    },
  };

  return packages[tier];
}

/**
 * Génère les services recommandés en fonction des réponses
 */
function generateServiceRecommendations(
  answers: Answers,
  northStar: NorthStarObjective
): ServiceRecommendation[] {
  const services: ServiceRecommendation[] = [
    {
      id: "strategy",
      label: "Audit & Stratégie",
      description: "Analyse complète et roadmap personnalisée",
      included: false,
    },
    {
      id: "ugc",
      label: "Production UGC",
      description: "Contenus authentiques avec des créateurs sélectionnés",
      included: false,
    },
    {
      id: "influence",
      label: "Campagnes Influence",
      description: "Gestion de campagnes multi-créateurs",
      included: false,
    },
    {
      id: "paid",
      label: "Paid Media",
      description: "Gestion des achats publicitaires (Meta, TikTok, Google)",
      included: false,
    },
    {
      id: "community",
      label: "Community Management",
      description: "Animation et engagement de votre communauté",
      included: false,
    },
    {
      id: "analytics",
      label: "Data & Analytics",
      description: "Dashboard de reporting et analyse de performance",
      included: false,
    },
  ];

  // Audit if they asked for it (e_audit)
  const audit = answers["e_audit"] as string | undefined;
  if (audit === "full" || audit === "targeted") {
    services[0].included = true;
    services[0].reason =
      audit === "full" ? "Audit complet demandé" : "Audit ciblé souhaité";
  }

  // UGC if production needs include ugc or short_video
  const production = answers["e_production"] as string[] | undefined;
  if (
    production?.some((p) => ["ugc", "short_video", "ad_assets"].includes(p))
  ) {
    services[1].included = true;
    services[1].reason = "Production de contenus identifiée comme besoin clé";
  }

  // Influence always recommended
  const influenceTypes = answers["e_influence_type"] as string[] | undefined;
  if (
    influenceTypes &&
    influenceTypes.length > 0 &&
    !influenceTypes.includes("advise")
  ) {
    services[2].included = true;
    services[2].reason = `${influenceTypes.length} type(s) de collaboration identifié(s)`;
  } else {
    services[2].included = true;
    services[2].reason = "Service cœur Wafia — recommandation automatique";
  }

  // Paid media
  const mediaBuying = answers["e_media_buying"] as string | undefined;
  if (mediaBuying === "full" || mediaBuying === "supervised") {
    services[3].included = true;
    services[3].reason =
      mediaBuying === "full"
        ? "Délégation complète souhaitée"
        : "Accompagnement supervisé demandé";
  }

  // Community management (for retention)
  if (northStar === "retention") {
    services[4].included = true;
    services[4].reason =
      "Objectif fidélisation → community management recommandé";
  }

  // Analytics based on reporting needs
  const reporting = answers["e_reporting"] as string | undefined;
  if (reporting && reporting !== "basic" && reporting !== "unknown") {
    services[5].included = true;
    services[5].reason = `Reporting ${reporting} demandé`;
  }

  return services;
}

/**
 * Génère le résultat complet du diagnostic brand
 */
export function generateDiagnosticResult(
  scores: Scores,
  answers: Answers,
  _questions: Question[],
  calibration: CalibrationData
): BrandDiagnosticResult {
  const { weakness } = identifyStrengthAndWeakness(scores);
  const overallScore = calculateOverallScore(scores);
  const level = determineLevel(overallScore);
  const northStar: NorthStarObjective = (calibration.northStar ||
    answers["b_north_star"] ||
    answers["ql_objective"] ||
    "unknown") as NorthStarObjective;
  const leadScore = calculateLeadScore(answers, scores);
  const recommendations = generateRecommendations(scores, weakness, northStar);
  const services = generateServiceRecommendations(answers, northStar);
  const packageSuggestion = determinePackage(answers, northStar);

  return {
    scores,
    leadScore,
    northStar,
    industry: (answers["a_sector"] as string) || "Non spécifié",
    companySize: (answers["a_size"] as string) || "Non spécifié",
    services,
    package: packageSuggestion,
    overallScore,
    level,
    recommendations,
  };
}

// ============================================
// RADAR CHART HELPERS
// ============================================

export function scoresToRadarData(scores: Scores): RadarDataPoint[] {
  return PILLAR_ORDER.map((key) => ({
    pillar: PILLARS[key].label,
    score: scores[key],
    fullMark: 100,
  }));
}

export function getLevelLabel(level: BrandDiagnosticResult["level"]): string {
  const labels: Record<BrandDiagnosticResult["level"], string> = {
    debutant: "Débutant",
    intermediaire: "Intermédiaire",
    avance: "Avancé",
    expert: "Expert",
  };
  return labels[level];
}

export function getLevelColor(level: BrandDiagnosticResult["level"]): string {
  const colors: Record<BrandDiagnosticResult["level"], string> = {
    debutant: "#EF4444",
    intermediaire: "#F59E0B",
    avance: "#10B981",
    expert: "#8B5CF6",
  };
  return colors[level];
}
