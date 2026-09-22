import { sitePaths } from "@/lib/site";

/**
 * Contenu des pages légales — source unique de vérité.
 *
 * Le contenu est séparé du rendu pour :
 * - garder les trois documents cohérents et faciles à auditer ;
 * - éviter toute duplication de mise en page ;
 * - permettre une relecture juridique sans toucher au composant.
 */

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "facts"; items: { label: string; value: string }[] }
  | { type: "callout"; title?: string; text: string; email?: string }
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

export const mentionsLegales: LegalDocument = {
  title: "Mentions légales",
  lede: "Les informations ci-dessous identifient l'éditeur et l'hébergeur du site wafia.fr, conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).",
  updatedAt: UPDATED_AT,
  sections: [
    {
      title: "Éditeur du site",
      blocks: [
        {
          type: "paragraph",
          text: "Le site wafia.fr est édité par :",
        },
        {
          type: "facts",
          items: [
            { label: "Raison sociale", value: "Wafia Agency SASU" },
            { label: "SIREN", value: "929 439 735" },
            { label: "RCS", value: "Créteil 929 439 735" },
            { label: "Capital social", value: "1 000 €" },
            {
              label: "Siège social",
              value: "Villeneuve-le-Roi, 94290 — France",
            },
            {
              label: "N° TVA intracommunautaire",
              value: "FR 91 929 439 735",
            },
            {
              label: "Directeur de la publication",
              value: "Wahib GUETTAT",
            },
            { label: "Contact", value: "contact@wafia.fr" },
          ],
        },
      ],
    },
    {
      title: "Hébergement",
      blocks: [
        {
          type: "paragraph",
          text: "Le site est hébergé par :",
        },
        {
          type: "facts",
          items: [
            { label: "Hébergeur", value: "OVH SAS" },
            { label: "Capital social", value: "50 000 000 €" },
            {
              label: "Siège social",
              value: "2 rue Kellermann, 59100 Roubaix — France",
            },
            {
              label: "RCS",
              value: "Lille Métropole 424 761 419 00045",
            },
            { label: "N° TVA", value: "FR 22 424 761 419" },
          ],
        },
      ],
    },
    {
      title: "Propriété intellectuelle",
      blocks: [
        {
          type: "callout",
          title: "Tous droits réservés",
          text: "L'ensemble des éléments de ce site (structure, design, textes, images, animations, logo et marque Wafia) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable de Wafia Agency est strictement interdite.",
        },
      ],
    },
    {
      title: "Données personnelles",
      blocks: [
        {
          type: "paragraph",
          text: "Les données collectées via les formulaires de contact sont traitées conformément au Règlement général sur la protection des données (RGPD). Le détail des traitements, des durées de conservation et de vos droits figure dans notre politique de confidentialité.",
        },
        {
          type: "links",
          items: [
            {
              label: "Politique de confidentialité",
              href: sitePaths.legalPrivacy,
            },
            {
              label: "Politique de cookies",
              href: sitePaths.legalCookies,
            },
          ],
        },
      ],
    },
  ],
};

export const politiqueConfidentialite: LegalDocument = {
  title: "Politique de confidentialité",
  lede: "Wafia Agency s'engage à protéger vos données personnelles. Cette politique explique quelles données nous collectons, pourquoi nous les traitons et comment vous pouvez exercer vos droits, conformément au Règlement général sur la protection des données (RGPD).",
  updatedAt: UPDATED_AT,
  sections: [
    {
      title: "Responsable du traitement",
      blocks: [
        {
          type: "paragraph",
          text: "Le responsable du traitement des données collectées sur wafia.fr est :",
        },
        {
          type: "facts",
          items: [
            { label: "Responsable", value: "Wafia Agency SASU" },
            { label: "SIREN", value: "929 439 735" },
            {
              label: "Siège social",
              value: "Villeneuve-le-Roi, 94290 — France",
            },
            { label: "Contact", value: "contact@wafia.fr" },
          ],
        },
      ],
    },
    {
      title: "Données collectées",
      blocks: [
        {
          type: "paragraph",
          text: "Nous collectons uniquement les données strictement nécessaires au traitement de vos demandes de contact et de vos candidatures :",
        },
        {
          type: "list",
          items: [
            "Nom et prénom",
            "Adresse e-mail",
            "Numéro de téléphone",
            "Liens vers vos réseaux sociaux (Instagram, TikTok, YouTube)",
          ],
        },
      ],
    },
    {
      title: "Finalités et bases légales",
      blocks: [
        {
          type: "paragraph",
          text: "Vos données sont utilisées exclusivement pour les finalités suivantes :",
        },
        {
          type: "list",
          items: [
            "Répondre à vos demandes de contact et de devis — base légale : exécution de mesures précontractuelles (art. 6.1.b du RGPD).",
            "Étudier votre candidature talent et évaluer une potentielle collaboration — base légale : exécution de mesures précontractuelles (art. 6.1.b du RGPD).",
            "Assurer la sécurité et le bon fonctionnement du site — base légale : intérêt légitime (art. 6.1.f du RGPD).",
          ],
        },
      ],
    },
    {
      title: "Durées de conservation",
      blocks: [
        {
          type: "paragraph",
          text: "Nous conservons vos données uniquement pendant la durée nécessaire aux finalités décrites ci-dessus :",
        },
        {
          type: "list",
          items: [
            "Données de contact (prospects) : 3 ans à compter du dernier contact.",
            "Candidatures talents : 2 ans à compter du dernier contact.",
            "Données techniques (journaux d'erreurs) : durée limitée aux besoins de la surveillance technique.",
          ],
        },
      ],
    },
    {
      title: "Destinataires et sous-traitants",
      blocks: [
        {
          type: "paragraph",
          text: "Vos données sont destinées aux équipes internes de Wafia Agency et, le cas échéant, à nos sous-traitants :",
        },
        {
          type: "list",
          items: [
            "OVH SAS — hébergement du site",
            "Sentry — surveillance des erreurs techniques",
            "Upstash — limitation de débit des formulaires",
            "Le prestataire en charge de la réception des formulaires de contact",
          ],
        },
      ],
    },
    {
      title: "Transferts hors de l'Union européenne",
      blocks: [
        {
          type: "paragraph",
          text: "Certains sous-traitants, notamment Sentry, peuvent être situés hors de l'Union européenne, en particulier aux États-Unis. Ces transferts sont encadrés par des garanties appropriées conformément au RGPD (clauses contractuelles types).",
        },
      ],
    },
    {
      title: "Vos droits",
      blocks: [
        {
          type: "paragraph",
          text: "Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants sur vos données personnelles :",
        },
        {
          type: "list",
          items: [
            "Droit d'accès à vos données",
            "Droit de rectification",
            "Droit à l'effacement",
            "Droit à la limitation du traitement",
            "Droit à la portabilité",
            "Droit d'opposition",
            "Droit de retirer votre consentement à tout moment",
          ],
        },
      ],
    },
    {
      title: "Réclamation auprès de la CNIL",
      blocks: [
        {
          type: "paragraph",
          text: "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.",
        },
      ],
    },
    {
      title: "Contact",
      blocks: [
        {
          type: "callout",
          title: "Exercer vos droits",
          text: "Pour toute question ou demande relative à vos données personnelles, contactez-nous :",
          email: "contact@wafia.fr",
        },
      ],
    },
  ],
};

export const politiqueCookies: LegalDocument = {
  title: "Politique de cookies",
  lede: "Cette page explique ce que sont les cookies, ceux susceptibles d'être déposés sur wafia.fr et comment les gérer.",
  updatedAt: UPDATED_AT,
  sections: [
    {
      title: "Qu'est-ce qu'un cookie ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un cookie est un petit fichier texte déposé sur votre appareil lors de la consultation d'un site. Il permet de reconnaître votre navigateur et de mémoriser certaines informations pendant une durée limitée.",
        },
      ],
    },
    {
      title: "Cookies utilisés sur ce site",
      blocks: [
        {
          type: "paragraph",
          text: "wafia.fr utilise un nombre limité de traceurs techniques. Aucun cookie publicitaire ni pixel de réseau social n'est déposé.",
        },
        {
          type: "list",
          items: [
            "Sentry — finalité : détection et correction des erreurs techniques ; durée : session (quelques jours).",
            "Google Analytics — mesure d'audience, activée uniquement après votre consentement explicite (actuellement inactif).",
          ],
        },
      ],
    },
    {
      title: "Vos choix",
      blocks: [
        {
          type: "paragraph",
          text: "Vous pouvez à tout moment gérer ou supprimer les cookies depuis les paramètres de votre navigateur. La plupart des navigateurs permettent de bloquer les cookies, de les supprimer ou d'être averti avant leur dépôt.",
        },
        {
          type: "list",
          items: [
            "Configurer votre navigateur pour refuser ou supprimer les cookies.",
            "Utiliser le mode de navigation privée de votre navigateur.",
            "Consulter l'aide de votre navigateur (Chrome, Safari, Firefox, Edge) pour les instructions détaillées.",
          ],
        },
      ],
    },
    {
      title: "En savoir plus",
      blocks: [
        {
          type: "paragraph",
          text: "Pour plus d'informations sur le traitement de vos données personnelles, consultez notre politique de confidentialité.",
        },
        {
          type: "links",
          items: [
            {
              label: "Politique de confidentialité",
              href: sitePaths.legalPrivacy,
            },
            {
              label: "Mentions légales",
              href: sitePaths.legalMentions,
            },
            {
              label: "Guide CNIL sur les cookies",
              href: "https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser",
            },
          ],
        },
      ],
    },
  ],
};
