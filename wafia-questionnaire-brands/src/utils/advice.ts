/**
 * WAFIA BRAND DIAGNOSTIC - ADVICE ENGINE
 * Simplified advice generation for brand diagnostic results.
 * Unlike the talent version, brand advice is primarily driven by
 * the lead scoring and service recommendations in scoring.ts.
 * This module provides supplementary text-level advice.
 */

import type {
  AdviceBundle,
  AdviceItem,
  Answers,
  CalibrationData,
  PillarKey,
  Question,
} from "../types";

/**
 * Generates an advice bundle from the brand diagnostic results.
 * Kept intentionally simpler than the talent version since
 * the primary output for brands is the service recommendations
 * and lead scoring (handled in scoring.ts).
 */
export function generateAdvice(
  answers: Answers,
  _questions: Question[],
  _calibration: CalibrationData,
  weakness: PillarKey
): AdviceBundle {
  const priority: AdviceItem[] = [];
  const quickWins: AdviceItem[] = [];
  const strengths: AdviceItem[] = [];

  // Generate weakness-based priority advice
  const weaknessAdvice = getWeaknessAdvice(weakness);
  if (weaknessAdvice) {
    priority.push(weaknessAdvice);
  }

  // Generate North Star-specific quick wins
  const northStar = (answers["b_north_star"] ||
    answers["ql_objective"] ||
    "unknown") as string;
  const northStarWin = getNorthStarQuickWin(northStar);
  if (northStarWin) {
    quickWins.push(northStarWin);
  }

  // Generate measurement-based advice
  const measurement = answers["c_measurement"] as string[] | undefined;
  if (measurement?.includes("nothing") || measurement?.includes("unknown")) {
    priority.push({
      id: "measurement_gap",
      pillar: "DATA",
      title: "Urgence tracking",
      body: "Votre absence de tracking fiable rend impossible la mesure du ROI. C'est le premier chantier à lancer.",
      impactPotential: 9,
      kind: "priority",
      severity: "high",
      evidence: {
        questionId: "c_measurement",
        question: "Comment mesurez-vous vos performances marketing ?",
        answer: "Pas de tracking fiable",
      },
    });
  }

  return { priority, quickWins, strengths };
}

function getWeaknessAdvice(weakness: PillarKey): AdviceItem | null {
  const adviceMap: Record<string, AdviceItem> = {
    STRATEGY: {
      id: "weakness_strategy",
      pillar: "STRATEGY",
      title: "Clarifier votre stratégie marketing",
      body: "Votre score sur l'axe Stratégie indique un besoin de structuration. Commencez par un audit de positionnement et définissez des objectifs SMART.",
      impactPotential: 8,
      kind: "priority",
      severity: "high",
      evidence: {
        questionId: "b_north_star",
        question: "Objectif stratégique",
        answer: "-",
      },
    },
    CONTENT: {
      id: "weakness_content",
      pillar: "CONTENT",
      title: "Investir dans la production de contenu",
      body: "Votre capacité de production de contenu est en dessous de la moyenne. Le contenu est le carburant de votre acquisition.",
      impactPotential: 8,
      kind: "priority",
      severity: "high",
      evidence: {
        questionId: "e_production",
        question: "Types de contenu à produire",
        answer: "-",
      },
    },
    ACTIVATION: {
      id: "weakness_activation",
      pillar: "ACTIVATION",
      title: "Diversifier vos leviers d'activation",
      body: "Votre score Activation montre une dépendance à trop peu de canaux. Diversifiez pour réduire les risques.",
      impactPotential: 7,
      kind: "priority",
      severity: "medium",
      evidence: {
        questionId: "c_channels",
        question: "Canaux actifs",
        answer: "-",
      },
    },
    DATA: {
      id: "weakness_data",
      pillar: "DATA",
      title: "Structurer votre tracking et reporting",
      body: "Sans données fiables, vous pilotez à l'aveugle. Priorité #1 : mettre en place un tracking end-to-end.",
      impactPotential: 9,
      kind: "priority",
      severity: "high",
      evidence: {
        questionId: "c_measurement",
        question: "Outils de mesure",
        answer: "-",
      },
    },
    ORGANIZATION: {
      id: "weakness_organization",
      pillar: "ORGANIZATION",
      title: "Renforcer votre organisation marketing",
      body: "Votre équipe ou vos process freinent votre croissance. Un accompagnement agence peut combler ces gaps rapidement.",
      impactPotential: 6,
      kind: "priority",
      severity: "medium",
      evidence: {
        questionId: "h_team_size",
        question: "Taille de l'équipe marketing",
        answer: "-",
      },
    },
  };

  return adviceMap[weakness] || null;
}

function getNorthStarQuickWin(northStar: string): AdviceItem | null {
  const quickWins: Record<string, AdviceItem> = {
    awareness: {
      id: "qw_awareness",
      pillar: "CONTENT",
      title: "Quick win notoriété",
      body: "Lancez 3-5 collaborations micro-influenceurs ce mois pour maximiser votre reach organique.",
      impactPotential: 7,
      kind: "quick_win",
      severity: "medium",
      evidence: {
        questionId: "b_north_star",
        question: "North Star",
        answer: "Notoriété",
      },
    },
    traffic: {
      id: "qw_traffic",
      pillar: "ACTIVATION",
      title: "Quick win trafic",
      body: "Créez 5 UGC ads et testez-les en A/B sur Meta pour identifier les angles qui convertissent.",
      impactPotential: 7,
      kind: "quick_win",
      severity: "medium",
      evidence: {
        questionId: "b_north_star",
        question: "North Star",
        answer: "Trafic",
      },
    },
    conversion: {
      id: "qw_conversion",
      pillar: "ACTIVATION",
      title: "Quick win conversion",
      body: "Mettez en place du whitelisting sur vos meilleurs UGC. Le contenu créateur en ads surpasse le studio de 2-3x.",
      impactPotential: 8,
      kind: "quick_win",
      severity: "medium",
      evidence: {
        questionId: "b_north_star",
        question: "North Star",
        answer: "Conversion",
      },
    },
    retention: {
      id: "qw_retention",
      pillar: "STRATEGY",
      title: "Quick win fidélisation",
      body: "Identifiez vos 10 clients les plus engagés et proposez-leur un statut ambassadeur exclusif.",
      impactPotential: 6,
      kind: "quick_win",
      severity: "low",
      evidence: {
        questionId: "b_north_star",
        question: "North Star",
        answer: "Fidélisation",
      },
    },
  };

  return quickWins[northStar] || null;
}
