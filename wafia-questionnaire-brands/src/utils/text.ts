/**
 * WAFIA BRAND DIAGNOSTIC - TEXT UTILITIES
 * Utilitaires pour la manipulation de texte et templates
 */

import type { CalibrationData } from "../types";

const NORTH_STAR_LABELS: Record<string, string> = {
  awareness: "Notoriété",
  traffic: "Trafic",
  conversion: "Conversion",
  retention: "Fidélisation",
};

/**
 * Remplace les variables dans un texte par les données de calibrage
 * Syntaxe : {{variable}}
 * Variables supportées : company, name, northStar, budget
 */
export function replaceTemplateVariables(
  text: string | undefined,
  calibration: CalibrationData
): string {
  if (!text) return "";

  return text.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
    switch (variable) {
      case "company":
        return calibration.companyName || "votre entreprise";
      case "name":
        return calibration.contactName || "";
      case "northStar":
        return calibration.northStar
          ? NORTH_STAR_LABELS[calibration.northStar] || calibration.northStar
          : "vos objectifs";
      case "budget":
        return calibration.budget || "";
      default:
        return match;
    }
  });
}
