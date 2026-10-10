import { sitePaths } from "@/lib/site";

/**
 * Structure des pages légales.
 *
 * Le texte (français = version qui fait foi, autres langues = traductions
 * de courtoisie) vit dans `messages/<locale>/legal.json`, sous
 * `legal.documents.<clé>`. On s'en tient aux informations obligatoires :
 * LCEN pour les mentions légales, RGPD art. 13 pour la confidentialité,
 * directive ePrivacy pour les cookies. Aucun développement superflu.
 */

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "facts"; items: { label: string; value: string }[] }
  | { type: "links"; items: { label: string; href: string }[] };

export interface LegalSection {
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  description: string;
  lede: string;
  updatedAt: string;
  sections: LegalSection[];
}

export type LegalDocumentKey = "mentions" | "privacy" | "cookies";

/** Chemin public (sans préfixe de langue) de chaque document. */
export const LEGAL_PATHS: Record<LegalDocumentKey, string> = {
  mentions: sitePaths.legalMentions,
  privacy: sitePaths.legalPrivacy,
  cookies: sitePaths.legalCookies,
};
