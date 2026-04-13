/**
 * WAFIA BRAND DIAGNOSTIC - QUESTIONS
 * Base de données complète des questions avec logique conditionnelle North Star
 */

import type { Question } from "../types";

// ============================================
// QUICK LEAD (LEVEL 1 — Express Contact)
// ============================================

export const QUICK_LEAD_QUESTIONS: Question[] = [
  {
    id: "ql_company",
    category: "QUICK_LEAD",
    type: "text",
    question: "Quel est le nom de votre entreprise ?",
    placeholder: "Ex: Acme Corp",
  },
  {
    id: "ql_name",
    category: "QUICK_LEAD",
    type: "text",
    question: "Votre nom & prénom",
    placeholder: "Ex: Marie Dupont",
  },
  {
    id: "ql_function",
    category: "QUICK_LEAD",
    type: "single",
    question: "Quelle est votre fonction ?",
    options: [
      {
        id: "cmo",
        label: "CMO / Directeur Marketing",
        impacts: [{ pillar: "ORGANIZATION", weight: 5 }],
      },
      {
        id: "com_director",
        label: "Responsable Communication",
        impacts: [{ pillar: "ORGANIZATION", weight: 3 }],
      },
      { id: "product", label: "Chef de Produit", impacts: [] },
      {
        id: "ceo",
        label: "CEO / Fondateur",
        impacts: [{ pillar: "ORGANIZATION", weight: 10 }],
      },
      { id: "other", label: "Autre", impacts: [] },
    ],
  },
  {
    id: "ql_email",
    category: "QUICK_LEAD",
    type: "email",
    question: "Votre email professionnel",
    placeholder: "nom@entreprise.com",
  },
  {
    id: "ql_phone",
    category: "QUICK_LEAD",
    type: "tel",
    question: "Votre numéro de téléphone",
    placeholder: "06 XX XX XX XX",
    required: false,
  },
  {
    id: "ql_website",
    category: "QUICK_LEAD",
    type: "url",
    question: "Votre site web",
    placeholder: "https://www.votresite.com",
    required: false,
  },
  {
    id: "ql_objective",
    category: "QUICK_LEAD",
    type: "single",
    question: "Votre objectif principal ?",
    subtitle: "Ce qui drive votre besoin aujourd'hui",
    options: [
      {
        id: "awareness",
        label: "Augmenter la notoriété",
        description: "Faire connaître ma marque/produit",
        emoji: "🎯",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "traffic",
        label: "Générer du trafic qualifié",
        description: "Attirer des visiteurs sur mon site/app",
        emoji: "🚀",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "conversion",
        label: "Booster mes conversions",
        description: "Générer des ventes ou des leads",
        emoji: "💰",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "retention",
        label: "Fidéliser & créer une communauté",
        description: "Transformer mes clients en ambassadeurs",
        emoji: "❤️",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "unknown",
        label: "Je ne sais pas encore",
        description: "J'ai besoin de conseil",
        emoji: "🤔",
        impacts: [],
      },
    ],
  },
  {
    id: "ql_budget",
    category: "QUICK_LEAD",
    type: "single",
    question: "Budget mensuel estimé ?",
    options: [
      { id: "under_5k", label: "< 5K€", impacts: [] },
      {
        id: "5_15k",
        label: "5 – 15K€",
        impacts: [{ pillar: "STRATEGY", weight: 3 }],
      },
      {
        id: "15_30k",
        label: "15 – 30K€",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "30_50k",
        label: "30 – 50K€",
        impacts: [{ pillar: "STRATEGY", weight: 8 }],
      },
      {
        id: "over_50k",
        label: "50K€+",
        impacts: [{ pillar: "STRATEGY", weight: 10 }],
      },
      { id: "undefined", label: "Non défini", impacts: [] },
    ],
  },
  {
    id: "ql_urgency",
    category: "QUICK_LEAD",
    type: "single",
    question: "Urgence du projet ?",
    options: [
      {
        id: "immediate",
        label: "Immédiat",
        description: "On veut démarrer tout de suite",
        emoji: "🔥",
        impacts: [],
      },
      { id: "this_month", label: "Ce mois-ci", impacts: [] },
      { id: "quarter", label: "Dans les 3 mois", impacts: [] },
      {
        id: "exploration",
        label: "Exploration",
        description: "On se renseigne",
        impacts: [],
      },
    ],
  },
];

// ============================================
// SECTION A : IDENTIFICATION & CONTEXTE
// ============================================

export const IDENTIFICATION_QUESTIONS: Question[] = [
  {
    id: "a_sector",
    category: "IDENTIFICATION",
    type: "single",
    question: "Quel est votre secteur d'activité ?",
    options: [
      {
        id: "ecommerce",
        label: "E-commerce",
        emoji: "🛒",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "saas",
        label: "SaaS / Tech B2B",
        emoji: "💻",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "beauty",
        label: "Beauté / Cosmétiques",
        emoji: "💄",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "food",
        label: "Food & Beverage",
        emoji: "🍔",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "fashion",
        label: "Mode / Luxe",
        emoji: "👗",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      { id: "health", label: "Santé / Wellness", emoji: "🧘", impacts: [] },
      {
        id: "gaming",
        label: "Gaming / Divertissement",
        emoji: "🎮",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "finance",
        label: "Services Financiers",
        emoji: "🏦",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      { id: "other", label: "Autre", emoji: "📦", impacts: [] },
    ],
  },
  {
    id: "a_size",
    category: "IDENTIFICATION",
    type: "single",
    question: "Taille de votre entreprise ?",
    options: [
      {
        id: "startup",
        label: "Startup",
        description: "Moins de 10 personnes",
        impacts: [],
      },
      {
        id: "pme",
        label: "PME (< 50)",
        impacts: [{ pillar: "ORGANIZATION", weight: 3 }],
      },
      {
        id: "scaleup",
        label: "Scale-up (50-250)",
        impacts: [{ pillar: "ORGANIZATION", weight: 5 }],
      },
      {
        id: "enterprise",
        label: "Entreprise (250+)",
        impacts: [{ pillar: "ORGANIZATION", weight: 8 }],
      },
      {
        id: "cac40",
        label: "Grand Compte / CAC40",
        impacts: [{ pillar: "ORGANIZATION", weight: 10 }],
      },
    ],
  },
  {
    id: "a_model",
    category: "IDENTIFICATION",
    type: "single",
    question: "Votre business model ?",
    options: [
      {
        id: "b2c",
        label: "B2C",
        description: "Vente directe aux consommateurs",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "b2b",
        label: "B2B",
        description: "Vente aux entreprises",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "d2c",
        label: "D2C",
        description: "Direct-to-Consumer",
        impacts: [
          { pillar: "CONTENT", weight: 5 },
          { pillar: "ACTIVATION", weight: 3 },
        ],
      },
      {
        id: "marketplace",
        label: "Marketplace",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      { id: "hybrid", label: "Hybride", impacts: [] },
    ],
  },
  {
    id: "a_budget_validator",
    category: "IDENTIFICATION",
    type: "single",
    question: "Qui valide les budgets marketing ?",
    options: [
      {
        id: "me",
        label: "Moi directement",
        impacts: [{ pillar: "ORGANIZATION", weight: 10 }],
      },
      {
        id: "cmo",
        label: "CMO / Directeur Marketing",
        impacts: [{ pillar: "ORGANIZATION", weight: 8 }],
      },
      {
        id: "cfo",
        label: "CFO / Direction Financière",
        impacts: [{ pillar: "ORGANIZATION", weight: 5 }],
      },
      {
        id: "ceo",
        label: "CEO / Direction Générale",
        impacts: [{ pillar: "ORGANIZATION", weight: 5 }],
      },
      {
        id: "committee",
        label: "Comité de validation",
        impacts: [{ pillar: "ORGANIZATION", weight: 3 }],
      },
    ],
  },
];

// ============================================
// SECTION B : NORTH STAR (Question Pivot)
// ============================================

export const NORTH_STAR_QUESTIONS: Question[] = [
  {
    id: "b_north_star",
    category: "NORTH_STAR",
    type: "single",
    question: "Quel est votre objectif business #1 pour les 6 prochains mois ?",
    subtitle: "Cette réponse adaptera la suite du diagnostic à vos priorités",
    options: [
      {
        id: "awareness",
        label: "Notoriété",
        description:
          "Faire connaître ma marque/produit auprès d'une large audience",
        emoji: "🎯",
        impacts: [{ pillar: "STRATEGY", weight: 10 }],
      },
      {
        id: "traffic",
        label: "Trafic",
        description:
          "Attirer des visiteurs qualifiés vers mon site/app/points de vente",
        emoji: "🚀",
        impacts: [{ pillar: "ACTIVATION", weight: 10 }],
      },
      {
        id: "conversion",
        label: "Conversion",
        description: "Générer des ventes, des leads ou des inscriptions",
        emoji: "💰",
        impacts: [
          { pillar: "ACTIVATION", weight: 10 },
          { pillar: "DATA", weight: 5 },
        ],
      },
      {
        id: "retention",
        label: "Fidélisation",
        description:
          "Transformer mes clients en ambassadeurs et maximiser leur LTV",
        emoji: "❤️",
        impacts: [{ pillar: "CONTENT", weight: 10 }],
      },
    ],
  },
];

// ============================================
// SECTION C : DIAGNOSTIC MATURITÉ MARKETING
// ============================================

export const MATURITY_QUESTIONS: Question[] = [
  {
    id: "c_channels",
    category: "MATURITY",
    type: "multiple",
    question: "Sur quels canaux êtes-vous actuellement actif ?",
    subtitle: "Sélectionnez tous ceux qui s'appliquent",
    options: [
      {
        id: "instagram",
        label: "Instagram",
        emoji: "📸",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "tiktok",
        label: "TikTok",
        emoji: "🎵",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "facebook",
        label: "Facebook",
        impacts: [{ pillar: "ACTIVATION", weight: 2 }],
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        impacts: [{ pillar: "ACTIVATION", weight: 2 }],
      },
      {
        id: "youtube",
        label: "YouTube",
        emoji: "▶️",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "website",
        label: "Site web / E-commerce",
        emoji: "🌐",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "seo",
        label: "SEO / Blog",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "email",
        label: "Email marketing / CRM",
        emoji: "📧",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "paid_ads",
        label: "Paid Ads (Meta, Google, TikTok)",
        emoji: "💳",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "influence",
        label: "Influence marketing",
        emoji: "🤝",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      { id: "events", label: "Événementiel", impacts: [] },
    ],
  },
  {
    id: "c_frustration",
    category: "MATURITY",
    type: "single",
    question: "Quelle est votre principale frustration marketing ?",
    options: [
      {
        id: "visibility",
        label: "Manque de visibilité / reach",
        impacts: [{ pillar: "STRATEGY", weight: -5 }],
      },
      {
        id: "low_traffic",
        label: "Trafic faible ou non qualifié",
        impacts: [{ pillar: "ACTIVATION", weight: -5 }],
      },
      {
        id: "low_conversion",
        label: "Taux de conversion trop bas",
        impacts: [{ pillar: "ACTIVATION", weight: -5 }],
      },
      {
        id: "high_cac",
        label: "CAC trop élevé",
        impacts: [
          { pillar: "DATA", weight: -3 },
          { pillar: "ACTIVATION", weight: -3 },
        ],
      },
      {
        id: "no_roi",
        label: "Difficulté à mesurer le ROI",
        impacts: [{ pillar: "DATA", weight: -10 }],
      },
      {
        id: "bad_content",
        label: "Contenu qui ne performe pas",
        impacts: [{ pillar: "CONTENT", weight: -10 }],
      },
      {
        id: "no_coherence",
        label: "Manque de cohérence entre canaux",
        impacts: [{ pillar: "STRATEGY", weight: -5 }],
      },
      {
        id: "wasted_budget",
        label: "Budget gaspillé sans résultats",
        impacts: [
          { pillar: "STRATEGY", weight: -5 },
          { pillar: "DATA", weight: -5 },
        ],
      },
      {
        id: "no_expertise",
        label: "Manque d'expertise interne",
        impacts: [{ pillar: "ORGANIZATION", weight: -10 }],
      },
    ],
  },
  {
    id: "c_measurement",
    category: "MATURITY",
    type: "multiple",
    question: "Comment mesurez-vous vos performances marketing ?",
    subtitle: "Sélectionnez tous les outils utilisés",
    options: [
      {
        id: "ga4",
        label: "Google Analytics / GA4",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "pixels",
        label: "Meta Pixel / TikTok Pixel",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "dashboards",
        label: "Dashboards propriétaires",
        impacts: [{ pillar: "DATA", weight: 8 }],
      },
      {
        id: "crm",
        label: "CRM (HubSpot, Salesforce…)",
        impacts: [{ pillar: "DATA", weight: 8 }],
      },
      {
        id: "attribution",
        label: "Outils d'attribution",
        impacts: [{ pillar: "DATA", weight: 10 }],
      },
      {
        id: "mmm",
        label: "Marketing Mix Modeling",
        impacts: [{ pillar: "DATA", weight: 15 }],
      },
      {
        id: "nothing",
        label: "Pas de tracking fiable",
        impacts: [{ pillar: "DATA", weight: -15 }],
      },
      {
        id: "unknown",
        label: "Je ne sais pas",
        impacts: [{ pillar: "DATA", weight: -10 }],
      },
    ],
  },
  {
    id: "c_roas",
    category: "MATURITY",
    type: "scale",
    question: "Quel est votre ROAS actuel moyen ?",
    subtitle: "Return on Ad Spend — 0 = Inconnu, 1-10x",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    min: 0,
    max: 10,
    labels: {
      min: "Inconnu",
      max: "10x+",
    },
  },
];

// ============================================
// SECTION D1 : BESOINS NOTORIÉTÉ
// ============================================

export const AWARENESS_QUESTIONS: Question[] = [
  {
    id: "d1_target_age",
    category: "NEEDS_AWARENESS",
    type: "multiple",
    question: "Quelle est votre cible démographique principale ?",
    subtitle: "Tranches d'âge prioritaires",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "awareness" },
    ],
    options: [
      {
        id: "13_17",
        label: "13-17 ans",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "18_24",
        label: "18-24 ans",
        emoji: "🎓",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "25_34",
        label: "25-34 ans",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "35_44",
        label: "35-44 ans",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      { id: "45_plus", label: "45+", impacts: [] },
    ],
  },
  {
    id: "d1_content_types",
    category: "NEEDS_AWARENESS",
    type: "multiple",
    question: "Quels types de contenu vous intéressent ?",
    subtitle: "Pour maximiser votre notoriété",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "awareness" },
    ],
    options: [
      {
        id: "macro_influence",
        label: "Campagnes macro-influenceurs (100K+)",
        impacts: [
          { pillar: "CONTENT", weight: 5 },
          { pillar: "ACTIVATION", weight: 5 },
        ],
      },
      {
        id: "tiktok_blast",
        label: "TikTok Blast / Tendances virales",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "sponsoring",
        label: "Sponsoring créateurs (YouTube, Podcasts)",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "product_placement",
        label: "Placement produit natif",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "events",
        label: "Événements brand / Activations terrain",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "display",
        label: "Publicité Display / OOH Digital",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
    ],
  },
  {
    id: "d1_kpis",
    category: "NEEDS_AWARENESS",
    type: "single",
    question: "Quel KPI priorisez-vous le plus ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "awareness" },
    ],
    options: [
      {
        id: "impressions",
        label: "Impressions / Reach total",
        impacts: [{ pillar: "DATA", weight: 3 }],
      },
      {
        id: "engagement",
        label: "Engagement Rate moyen",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "emv",
        label: "EMV (Earned Media Value)",
        impacts: [{ pillar: "DATA", weight: 8 }],
      },
      {
        id: "brand_lift",
        label: "Brand Lift (études notoriété)",
        impacts: [{ pillar: "DATA", weight: 10 }],
      },
      {
        id: "sov",
        label: "Part of Voice social",
        impacts: [{ pillar: "DATA", weight: 8 }],
      },
    ],
  },
  {
    id: "d1_ambassadors",
    category: "NEEDS_AWARENESS",
    type: "single",
    question: "Avez-vous des ambassadeurs ou égéries actuellement ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "awareness" },
    ],
    options: [
      {
        id: "yes",
        label: "Oui, contrats en cours",
        impacts: [{ pillar: "CONTENT", weight: 10 }],
      },
      {
        id: "searching",
        label: "Non, mais on cherche",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      { id: "no", label: "Non, pas dans notre stratégie", impacts: [] },
    ],
  },
];

// ============================================
// SECTION D2 : BESOINS TRAFIC
// ============================================

export const TRAFFIC_QUESTIONS: Question[] = [
  {
    id: "d2_destination",
    category: "NEEDS_TRAFFIC",
    type: "single",
    question: "Où souhaitez-vous diriger ce trafic ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "traffic" },
    ],
    options: [
      {
        id: "ecommerce",
        label: "Site e-commerce",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "product_page",
        label: "Page produit spécifique",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "landing",
        label: "Landing page de capture",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "app",
        label: "Application mobile",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "stores",
        label: "Magasins physiques",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
    ],
  },
  {
    id: "d2_levers",
    category: "NEEDS_TRAFFIC",
    type: "multiple",
    question: "Quels leviers souhaitez-vous activer ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "traffic" },
    ],
    options: [
      {
        id: "influence_links",
        label: "Influence avec swipe-up / liens Stories",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "ugc_ads",
        label: "UGC Ads (contenu créateurs en ads)",
        emoji: "🎬",
        impacts: [
          { pillar: "CONTENT", weight: 5 },
          { pillar: "ACTIVATION", weight: 5 },
        ],
      },
      {
        id: "seo",
        label: "SEO / Contenu optimisé Google",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "google_ads",
        label: "Google Search / Shopping",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "retargeting",
        label: "Retargeting display",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "affiliation",
        label: "Collaborations affiliées",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
    ],
  },
  {
    id: "d2_volume",
    category: "NEEDS_TRAFFIC",
    type: "single",
    question: "Quel volume de trafic mensuel visez-vous ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "traffic" },
    ],
    options: [
      { id: "under_10k", label: "< 10K visiteurs/mois", impacts: [] },
      {
        id: "10_50k",
        label: "10-50K visiteurs/mois",
        impacts: [{ pillar: "STRATEGY", weight: 3 }],
      },
      {
        id: "50_100k",
        label: "50-100K visiteurs/mois",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "over_100k",
        label: "100K+ visiteurs/mois",
        impacts: [{ pillar: "STRATEGY", weight: 8 }],
      },
      { id: "unknown", label: "Je ne sais pas", impacts: [] },
    ],
  },
  {
    id: "d2_site_conversion",
    category: "NEEDS_TRAFFIC",
    type: "single",
    question: "Votre site est-il optimisé pour la conversion ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "traffic" },
    ],
    options: [
      {
        id: "yes",
        label: "Oui, bon taux de conversion",
        impacts: [{ pillar: "DATA", weight: 10 }],
      },
      {
        id: "partial",
        label: "Partiellement, marge d'amélioration",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "no",
        label: "Non, c'est un problème identifié",
        impacts: [{ pillar: "DATA", weight: -5 }],
      },
      {
        id: "unknown",
        label: "Je ne sais pas",
        impacts: [{ pillar: "DATA", weight: -5 }],
      },
    ],
  },
];

// ============================================
// SECTION D3 : BESOINS CONVERSION
// ============================================

export const CONVERSION_QUESTIONS: Question[] = [
  {
    id: "d3_model",
    category: "NEEDS_CONVERSION",
    type: "single",
    question: "Quel est votre business model de conversion ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      {
        id: "ecommerce",
        label: "Vente e-commerce directe",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "lead_gen",
        label: "Génération de leads B2B",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "saas",
        label: "Inscriptions / Abonnements SaaS",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "app_dl",
        label: "Téléchargements app",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "booking",
        label: "Réservations / Prises de RDV",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "drive_to_store",
        label: "Drive-to-store",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
    ],
  },
  {
    id: "d3_cac_target",
    category: "NEEDS_CONVERSION",
    type: "single",
    question: "Quel est votre objectif de CAC cible ?",
    subtitle: "Coût d'Acquisition Client",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      {
        id: "under_10",
        label: "< 10€",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "10_30",
        label: "10-30€",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "30_100",
        label: "30-100€",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "100_500",
        label: "100-500€",
        impacts: [{ pillar: "ACTIVATION", weight: 8 }],
      },
      {
        id: "over_500",
        label: "500€+",
        impacts: [{ pillar: "ACTIVATION", weight: 10 }],
      },
      { id: "unknown", label: "Je ne sais pas / À définir", impacts: [] },
    ],
  },
  {
    id: "d3_roas_target",
    category: "NEEDS_CONVERSION",
    type: "single",
    question: "Quel ROAS minimum visez-vous ?",
    subtitle: "Return on Ad Spend",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      {
        id: "2x",
        label: "2x (seuil de rentabilité)",
        impacts: [{ pillar: "DATA", weight: 3 }],
      },
      {
        id: "3_4x",
        label: "3-4x (performance correcte)",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "5x_plus",
        label: "5x+ (haute performance)",
        impacts: [{ pillar: "DATA", weight: 10 }],
      },
      {
        id: "unknown",
        label: "Je ne connais pas ce metric",
        impacts: [{ pillar: "DATA", weight: -5 }],
      },
    ],
  },
  {
    id: "d3_formats",
    category: "NEEDS_CONVERSION",
    type: "multiple",
    question: "Quels formats vous intéressent pour maximiser les conversions ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      {
        id: "ugc_ads",
        label: "UGC Ads avec whitelisting",
        emoji: "🎬",
        impacts: [
          { pillar: "CONTENT", weight: 5 },
          { pillar: "ACTIVATION", weight: 5 },
        ],
      },
      {
        id: "google_shopping",
        label: "Google Shopping / PMax",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "retargeting",
        label: "Retargeting dynamique",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "cro",
        label: "Landing pages optimisées (CRO)",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "email_automation",
        label: "Email marketing automation",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "affiliation",
        label: "Programmes affiliation / codes promo",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
    ],
  },
  {
    id: "d3_assets",
    category: "NEEDS_CONVERSION",
    type: "single",
    question: "Avez-vous un catalogue de contenus créatifs pour les ads ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      {
        id: "yes",
        label: "Oui, bibliothèque fournie",
        impacts: [{ pillar: "CONTENT", weight: 10 }],
      },
      {
        id: "some",
        label: "Quelques assets, mais limités",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "no",
        label: "Non, besoin de production complète",
        impacts: [{ pillar: "CONTENT", weight: -5 }],
      },
      {
        id: "internal",
        label: "Nous produisons en interne",
        impacts: [{ pillar: "CONTENT", weight: 8 }],
      },
    ],
  },
];

// ============================================
// SECTION D4 : BESOINS FIDÉLISATION
// ============================================

export const RETENTION_QUESTIONS: Question[] = [
  {
    id: "d4_client_base",
    category: "NEEDS_RETENTION",
    type: "single",
    question: "Avez-vous une base clients existante ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "retention" },
    ],
    options: [
      {
        id: "large",
        label: "Oui, > 10K clients",
        impacts: [{ pillar: "DATA", weight: 10 }],
      },
      {
        id: "medium",
        label: "Oui, 1K-10K clients",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "small",
        label: "Oui, < 1K clients",
        impacts: [{ pillar: "DATA", weight: 3 }],
      },
      { id: "starting", label: "Non, nous démarrons", impacts: [] },
    ],
  },
  {
    id: "d4_loyalty_devices",
    category: "NEEDS_RETENTION",
    type: "multiple",
    question: "Quels dispositifs de fidélisation avez-vous ?",
    subtitle: "Sélectionnez tous ceux qui s'appliquent",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "retention" },
    ],
    options: [
      {
        id: "loyalty_program",
        label: "Programme de fidélité / Points",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "crm_email",
        label: "CRM / Email marketing actif",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "community",
        label: "Communauté (Discord, Facebook…)",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "exclusive_content",
        label: "Contenu exclusif membres",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "ambassador_program",
        label: "Programme ambassadeurs",
        impacts: [{ pillar: "STRATEGY", weight: 8 }],
      },
      {
        id: "nothing",
        label: "Aucun dispositif structuré",
        impacts: [{ pillar: "STRATEGY", weight: -5 }],
      },
    ],
  },
  {
    id: "d4_priority",
    category: "NEEDS_RETENTION",
    type: "single",
    question: "Quel est votre objectif prioritaire en fidélisation ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "retention" },
    ],
    options: [
      {
        id: "ltv",
        label: "Augmenter la LTV",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "churn",
        label: "Réduire le churn",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
      {
        id: "ugc",
        label: "Générer du UGC organique",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "community",
        label: "Créer une communauté engagée",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "ambassadors",
        label: "Transformer clients en ambassadeurs",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
    ],
  },
  {
    id: "d4_interests",
    category: "NEEDS_RETENTION",
    type: "multiple",
    question: "Quels dispositifs vous intéresseraient ?",
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "retention" },
    ],
    options: [
      {
        id: "structured_ambassadors",
        label: "Programme ambassadeurs structuré",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "community_mgmt",
        label: "Community management premium",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "ugc_rewards",
        label: "UGC co-créé avec clients",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "vip_events",
        label: "Événements exclusifs VIP",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "lifecycle_emails",
        label: "Marketing automation avancé",
        impacts: [{ pillar: "DATA", weight: 5 }],
      },
    ],
  },
];

// ============================================
// SECTION E : SERVICES & BESOINS OPÉRATIONNELS
// ============================================

export const SERVICES_QUESTIONS: Question[] = [
  {
    id: "e_audit",
    category: "SERVICES",
    type: "single",
    question: "Avez-vous besoin d'un audit stratégique préalable ?",
    options: [
      {
        id: "full",
        label: "Oui, audit complet",
        description: "Concurrence, positioning, personas, benchmark",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "targeted",
        label: "Oui, ciblé sur un aspect",
        impacts: [{ pillar: "STRATEGY", weight: 3 }],
      },
      {
        id: "no",
        label: "Non, stratégie déjà claire",
        impacts: [{ pillar: "STRATEGY", weight: 10 }],
      },
      { id: "unknown", label: "Je ne sais pas", impacts: [] },
    ],
  },
  {
    id: "e_production",
    category: "SERVICES",
    type: "multiple",
    question: "Quels types de contenus devez-vous produire ?",
    subtitle: "Sélectionnez tous ceux qui s'appliquent",
    options: [
      {
        id: "ugc",
        label: "UGC avec créateurs",
        emoji: "🎬",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "short_video",
        label: "Vidéos format court (Reels, TikToks)",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "long_video",
        label: "Vidéos format long (YouTube, Docu)",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "photo",
        label: "Photos / Visuels",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "scripts",
        label: "Scripts / Storytelling",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "blog",
        label: "Articles de blog / SEO Content",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "ad_assets",
        label: "Assets pour ads (déclinaisons)",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "none",
        label: "Aucun, production interne",
        impacts: [{ pillar: "CONTENT", weight: 8 }],
      },
    ],
  },
  {
    id: "e_media_buying",
    category: "SERVICES",
    type: "single",
    question: "Souhaitez-vous déléguer l'achat média (ads payantes) ?",
    options: [
      {
        id: "full",
        label: "Oui, gestion complète",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      {
        id: "supervised",
        label: "Oui, avec validation de notre côté",
        impacts: [{ pillar: "ACTIVATION", weight: 3 }],
      },
      {
        id: "no",
        label: "Non, interne (mais besoin de contenus)",
        impacts: [{ pillar: "ACTIVATION", weight: 8 }],
      },
      { id: "unknown", label: "Je ne sais pas encore", impacts: [] },
    ],
  },
  {
    id: "e_influence_type",
    category: "SERVICES",
    type: "multiple",
    question: "Quel type de collaboration influenceurs recherchez-vous ?",
    options: [
      {
        id: "nano",
        label: "Nano (1K-10K) — Volume & authenticité",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "micro",
        label: "Micro (10K-100K) — Engagement fort",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "macro",
        label: "Macro (100K-1M) — Notoriété large",
        impacts: [
          { pillar: "CONTENT", weight: 5 },
          { pillar: "ACTIVATION", weight: 3 },
        ],
      },
      {
        id: "celeb",
        label: "Célébrités (1M+) — Impact maximal",
        impacts: [{ pillar: "ACTIVATION", weight: 8 }],
      },
      {
        id: "long_term",
        label: "Ambassadeurs long-terme (6-12 mois)",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      { id: "one_shot", label: "Collaborations ponctuelles", impacts: [] },
      {
        id: "whitelisting",
        label: "Whitelisting (ads via comptes créateurs)",
        impacts: [{ pillar: "ACTIVATION", weight: 5 }],
      },
      { id: "advise", label: "À conseiller", impacts: [] },
    ],
  },
  {
    id: "e_reporting",
    category: "SERVICES",
    type: "single",
    question: "Quel niveau de reporting attendez-vous ?",
    options: [
      {
        id: "basic",
        label: "Basique (impressions, reach, engagement)",
        impacts: [{ pillar: "DATA", weight: 3 }],
      },
      {
        id: "advanced",
        label: "Avancé (conversions, ROAS, attribution)",
        impacts: [{ pillar: "DATA", weight: 8 }],
      },
      {
        id: "realtime",
        label: "Dashboard temps réel unifié",
        impacts: [{ pillar: "DATA", weight: 10 }],
      },
      {
        id: "mmm",
        label: "Marketing Mix Modeling (MMM)",
        impacts: [{ pillar: "DATA", weight: 15 }],
      },
      { id: "unknown", label: "Je ne sais pas", impacts: [] },
    ],
  },
];

// ============================================
// SECTION F : BUDGET & TIMELINE
// ============================================

export const BUDGET_QUESTIONS: Question[] = [
  {
    id: "f_budget_global",
    category: "BUDGET",
    type: "single",
    question: "Quel est votre budget global mensuel pour cette activation ?",
    subtitle: "Inclut honoraires, média, créateurs, production",
    options: [
      {
        id: "under_10k",
        label: "Exploration (< 10K€/mois)",
        description: "Starter pack, tests, micro-influenceurs",
        impacts: [],
      },
      {
        id: "10_30k",
        label: "Growth (10-30K€/mois)",
        description: "Mix influence + ads, production régulière",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "30_70k",
        label: "Scale (30-70K€/mois)",
        description: "Multi-canaux, production intensive, reporting avancé",
        impacts: [{ pillar: "STRATEGY", weight: 8 }],
      },
      {
        id: "over_70k",
        label: "Enterprise (70K€+/mois)",
        description: "Full-Service 360°, MMM, squads dédiées",
        impacts: [{ pillar: "STRATEGY", weight: 15 }],
      },
      { id: "to_define", label: "Budget à définir ensemble", impacts: [] },
    ],
  },
  {
    id: "f_start",
    category: "BUDGET",
    type: "single",
    question: "Quand souhaitez-vous démarrer ?",
    options: [
      {
        id: "immediate",
        label: "Immédiatement (< 2 semaines)",
        emoji: "🔥",
        impacts: [],
      },
      { id: "this_month", label: "Ce mois-ci", impacts: [] },
      { id: "quarter", label: "Dans les 2-3 mois", impacts: [] },
      { id: "planning", label: "Planification > 3 mois", impacts: [] },
      { id: "flexible", label: "Pas de contrainte", impacts: [] },
    ],
  },
  {
    id: "f_duration",
    category: "BUDGET",
    type: "single",
    question: "Durée d'engagement souhaitée ?",
    options: [
      { id: "test", label: "Test ponctuel (1-3 mois)", impacts: [] },
      {
        id: "medium",
        label: "Moyen terme (6 mois)",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "long",
        label: "Long terme (12+ mois)",
        impacts: [{ pillar: "STRATEGY", weight: 10 }],
      },
      { id: "discuss", label: "À discuter", impacts: [] },
    ],
  },
  {
    id: "f_deadline",
    category: "BUDGET",
    type: "single",
    question: "Y a-t-il des deadlines spécifiques ?",
    subtitle: "Ex: lancement produit, saisonnalité, événement",
    options: [
      { id: "yes", label: "Oui, deadline identifiée", impacts: [] },
      { id: "no", label: "Non, flexibilité totale", impacts: [] },
    ],
  },
];

// ============================================
// SECTION G : CONTEXTE CONCURRENTIEL
// ============================================

export const COMPETITIVE_QUESTIONS: Question[] = [
  {
    id: "g_competitors",
    category: "COMPETITIVE",
    type: "text",
    question: "Qui sont vos 3 principaux concurrents directs ?",
    placeholder: "Ex: Nike, Adidas, Puma",
    required: false,
  },
  {
    id: "g_tone",
    category: "COMPETITIVE",
    type: "multiple",
    question: "Quel ton de communication souhaitez-vous ?",
    options: [
      {
        id: "premium",
        label: "Premium / Luxe",
        emoji: "✨",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "fun",
        label: "Fun / Décalé",
        emoji: "🎉",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "authentic",
        label: "Authentique / Raw",
        emoji: "📷",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "inspiring",
        label: "Inspirant / Aspirationnel",
        emoji: "🌟",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "educational",
        label: "Éducatif / Expert",
        emoji: "🎓",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "community",
        label: "Communautaire / Inclusif",
        emoji: "🤝",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      {
        id: "disruptive",
        label: "Disruptif / Bold",
        emoji: "⚡",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
    ],
  },
  {
    id: "g_creative_codes",
    category: "COMPETITIVE",
    type: "single",
    question: "Avez-vous des codes créatifs spécifiques à respecter ?",
    options: [
      {
        id: "strict",
        label: "Oui, charte graphique stricte",
        impacts: [{ pillar: "CONTENT", weight: 5 }],
      },
      {
        id: "guidelines",
        label: "Guidelines générales",
        impacts: [{ pillar: "CONTENT", weight: 3 }],
      },
      { id: "freedom", label: "Liberté créative totale", impacts: [] },
      { id: "co_build", label: "À co-construire ensemble", impacts: [] },
    ],
  },
];

// ============================================
// SECTION H : ORGANISATION INTERNE
// ============================================

export const ORGANIZATION_QUESTIONS: Question[] = [
  {
    id: "h_team_size",
    category: "ORGANIZATION",
    type: "single",
    question: "Quelle est la taille de votre équipe marketing ?",
    options: [
      {
        id: "solo",
        label: "Solo (1 personne)",
        impacts: [{ pillar: "ORGANIZATION", weight: -5 }],
      },
      {
        id: "small",
        label: "Petite équipe (2-5)",
        impacts: [{ pillar: "ORGANIZATION", weight: 3 }],
      },
      {
        id: "structured",
        label: "Équipe structurée (6-15)",
        impacts: [{ pillar: "ORGANIZATION", weight: 8 }],
      },
      {
        id: "large",
        label: "Département large (15+)",
        impacts: [{ pillar: "ORGANIZATION", weight: 10 }],
      },
      {
        id: "none",
        label: "Pas d'équipe dédiée",
        impacts: [{ pillar: "ORGANIZATION", weight: -10 }],
      },
    ],
  },
  {
    id: "h_agency_experience",
    category: "ORGANIZATION",
    type: "single",
    question: "Avez-vous déjà travaillé avec une agence marketing ?",
    options: [
      {
        id: "current",
        label: "Oui, actuellement",
        impacts: [{ pillar: "ORGANIZATION", weight: 8 }],
      },
      {
        id: "past",
        label: "Oui, par le passé",
        impacts: [{ pillar: "ORGANIZATION", weight: 5 }],
      },
      { id: "first", label: "Non, première expérience", impacts: [] },
      {
        id: "multiple",
        label: "Oui, plusieurs simultanément",
        impacts: [{ pillar: "ORGANIZATION", weight: 10 }],
      },
    ],
  },
  {
    id: "h_decision_process",
    category: "ORGANIZATION",
    type: "single",
    question: "Quel est votre process de décision habituel ?",
    options: [
      {
        id: "fast",
        label: "Décision rapide (< 1 semaine)",
        impacts: [{ pillar: "ORGANIZATION", weight: 10 }],
      },
      {
        id: "structured",
        label: "Process structuré (2-4 semaines)",
        impacts: [{ pillar: "ORGANIZATION", weight: 5 }],
      },
      {
        id: "long",
        label: "Validation longue (> 1 mois)",
        impacts: [{ pillar: "ORGANIZATION", weight: 3 }],
      },
      { id: "variable", label: "Variable selon projets", impacts: [] },
    ],
  },
];

// ============================================
// SECTION I : INFORMATIONS COMPLÉMENTAIRES
// ============================================

export const ADDITIONAL_QUESTIONS: Question[] = [
  {
    id: "i_motivation",
    category: "ADDITIONAL",
    type: "single",
    question: "Pourquoi cherchez-vous une agence maintenant ?",
    options: [
      {
        id: "growth",
        label: "Croissance rapide, besoin de scale",
        emoji: "📈",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "overloaded",
        label: "Équipe interne surchargée",
        impacts: [{ pillar: "ORGANIZATION", weight: -3 }],
      },
      { id: "expertise", label: "Besoin d'expertise spécialisée", impacts: [] },
      {
        id: "poor_results",
        label: "Résultats actuels insatisfaisants",
        impacts: [{ pillar: "STRATEGY", weight: -5 }],
      },
      {
        id: "new_launch",
        label: "Nouveau lancement produit/marque",
        emoji: "🚀",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
      {
        id: "overhaul",
        label: "Refonte stratégique globale",
        impacts: [{ pillar: "STRATEGY", weight: 3 }],
      },
      {
        id: "opportunity",
        label: "Opportunité de marché à saisir",
        emoji: "🎯",
        impacts: [{ pillar: "STRATEGY", weight: 5 }],
      },
    ],
  },
  {
    id: "i_discovery",
    category: "ADDITIONAL",
    type: "single",
    question: "Comment avez-vous découvert Wafia ?",
    required: false,
    options: [
      { id: "google", label: "Recherche Google", impacts: [] },
      { id: "referral", label: "Recommandation", impacts: [] },
      { id: "social", label: "Réseaux sociaux", impacts: [] },
      { id: "event", label: "Événement / Conférence", impacts: [] },
      { id: "press", label: "Article / Presse", impacts: [] },
      { id: "other", label: "Autre", impacts: [] },
    ],
  },
  {
    id: "i_constraints",
    category: "ADDITIONAL",
    type: "text",
    question: "Y a-t-il des contraintes spécifiques à connaître ?",
    subtitle: "Secteur réglementé, contraintes légales, exclusivités, NDA…",
    placeholder: "Décrivez vos contraintes ici (optionnel)",
    required: false,
  },
];

// ============================================
// EXPORT GLOBAL
// ============================================

export const CALIBRATION_QUESTIONS: Question[] = QUICK_LEAD_QUESTIONS;

export const MAIN_QUESTIONS: Question[] = [
  ...IDENTIFICATION_QUESTIONS,
  ...NORTH_STAR_QUESTIONS,
  ...MATURITY_QUESTIONS,
  ...AWARENESS_QUESTIONS,
  ...TRAFFIC_QUESTIONS,
  ...CONVERSION_QUESTIONS,
  ...RETENTION_QUESTIONS,
  ...SERVICES_QUESTIONS,
  ...BUDGET_QUESTIONS,
  ...COMPETITIVE_QUESTIONS,
  ...ORGANIZATION_QUESTIONS,
  ...ADDITIONAL_QUESTIONS,
];

export const ALL_QUESTIONS: Question[] = [
  ...CALIBRATION_QUESTIONS,
  ...MAIN_QUESTIONS,
];
