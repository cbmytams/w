import { sitePaths } from "@/lib/site";

/**
 * Contenu des pages légales — source unique de vérité.
 *
 * On s'en tient aux informations obligatoires : LCEN pour les mentions
 * légales, RGPD art. 13 pour la confidentialité, directive ePrivacy pour
 * les cookies. Aucun développement superflu.
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
  lede: string;
  updatedAt: string;
  sections: LegalSection[];
}

const UPDATED_AT = "22 septembre 2026";
const EMAIL = "contact@wafia.fr";
const SEAT = "Villeneuve-le-Roi, 94290 — France";

export const mentionsLegales: LegalDocument = {
  title: "Mentions légales",
  lede: "L'éditeur et l'hébergeur du site wafia.fr.",
  updatedAt: UPDATED_AT,
  sections: [
    {
      title: "Éditeur",
      blocks: [
        {
          type: "facts",
          items: [
            { label: "Société", value: "Wafia Agency SASU" },
            { label: "Siège social", value: SEAT },
            { label: "RCS", value: "Créteil 929 439 735" },
            { label: "Capital social", value: "1 000 €" },
            { label: "TVA intracommunautaire", value: "FR 91 929 439 735" },
            { label: "Directeur de la publication", value: "Wahib GUETTAT" },
            { label: "Contact", value: EMAIL },
          ],
        },
      ],
    },
    {
      title: "Hébergement",
      blocks: [
        {
          type: "facts",
          items: [
            { label: "Hébergeur", value: "OVH SAS" },
            {
              label: "Adresse",
              value: "2 rue Kellermann, 59100 Roubaix — France",
            },
            { label: "Téléphone", value: "1007" },
          ],
        },
      ],
    },
    {
      title: "Propriété intellectuelle",
      blocks: [
        {
          type: "paragraph",
          text: "Les contenus du site, son logo et la marque Wafia sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou exploitation sans autorisation écrite préalable de Wafia Agency est interdite.",
        },
      ],
    },
  ],
};

export const politiqueConfidentialite: LegalDocument = {
  title: "Politique de confidentialité",
  lede: "Comment Wafia Agency traite les données transmises via wafia.fr.",
  updatedAt: UPDATED_AT,
  sections: [
    {
      title: "Responsable du traitement",
      blocks: [
        {
          type: "facts",
          items: [
            { label: "Société", value: "Wafia Agency SASU" },
            { label: "Siège social", value: SEAT },
            { label: "Contact", value: EMAIL },
          ],
        },
      ],
    },
    {
      title: "Données collectées",
      blocks: [
        {
          type: "paragraph",
          text: "Uniquement les données nécessaires au traitement de votre demande :",
        },
        {
          type: "list",
          items: [
            "Nom et prénom",
            "Adresse e-mail",
            "Numéro de téléphone",
            "Liens vers vos réseaux sociaux (candidatures)",
          ],
        },
      ],
    },
    {
      title: "Finalités et bases légales",
      blocks: [
        {
          type: "paragraph",
          text: "Vos données servent à répondre à votre demande de contact ou de devis et à étudier votre candidature (mesures précontractuelles, art. 6.1.b du RGPD), ainsi qu'à assurer la sécurité du site (intérêt légitime, art. 6.1.f du RGPD).",
        },
      ],
    },
    {
      title: "Conservation et destinataires",
      blocks: [
        {
          type: "paragraph",
          text: "Les données de contact sont conservées 3 ans à compter du dernier échange, les candidatures 2 ans. Elles sont destinées aux équipes de Wafia Agency et à ses sous-traitants : OVH (hébergement), Sentry (surveillance des erreurs techniques) et Upstash (protection des formulaires). Certains peuvent être situés hors de l'Union européenne, dans le cadre des clauses contractuelles types de la Commission européenne.",
        },
      ],
    },
    {
      title: "Vos droits",
      blocks: [
        {
          type: "paragraph",
          text: `Conformément aux articles 15 à 22 du RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition, ainsi que du droit de retirer votre consentement à tout moment. Pour les exercer, écrivez-nous à ${EMAIL}.`,
        },
      ],
    },
    {
      title: "Réclamation",
      blocks: [
        {
          type: "paragraph",
          text: "Vous pouvez introduire une réclamation auprès de la CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.",
        },
      ],
    },
  ],
};

export const politiqueCookies: LegalDocument = {
  title: "Politique de cookies",
  lede: "Les cookies déposés sur wafia.fr et la façon de les gérer.",
  updatedAt: UPDATED_AT,
  sections: [
    {
      title: "Qu'est-ce qu'un cookie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un fichier texte déposé sur votre appareil lors de la visite du site, utilisé pour mémoriser certaines informations pendant une durée limitée.",
        },
      ],
    },
    {
      title: "Cookies utilisés",
      blocks: [
        {
          type: "paragraph",
          text: "Aucun cookie publicitaire ni pixel de réseau social n'est déposé sur wafia.fr.",
        },
        {
          type: "list",
          items: [
            "Sentry — détection des erreurs techniques, durée de session.",
            "Google Analytics — mesure d'audience, chargé uniquement après votre consentement.",
          ],
        },
      ],
    },
    {
      title: "Vos choix",
      blocks: [
        {
          type: "paragraph",
          text: "Vous pouvez à tout moment refuser ou supprimer les cookies depuis les paramètres de votre navigateur (Chrome, Safari, Firefox, Edge), ou suivre le guide de la CNIL.",
        },
        {
          type: "links",
          items: [
            {
              label: "Guide CNIL sur les cookies",
              href: "https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser",
            },
            {
              label: "Politique de confidentialité",
              href: sitePaths.legalPrivacy,
            },
          ],
        },
      ],
    },
  ],
};
