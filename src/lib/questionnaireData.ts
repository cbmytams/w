import { FieldType } from "./questionnaireMap";

export type Option = {
  id: string;
  label: string;
  description?: string;
  emoji?: string;
};

export type Condition = {
  questionId: string;
  operator:
    | "equals"
    | "not_equals"
    | "one_of"
    | "contains"
    | "greater_than"
    | "less_than";
  value: string | string[] | number;
};

export type QuestionData = {
  id: string;
  category: string;
  type: FieldType;
  question: string;
  subtitle?: string;
  placeholder?: string;
  required?: boolean;
  options?: Option[];
  conditions?: Condition[];
  min?: number;
  max?: number;
  labels?: { min: string; max: string };
};

// ============================================
// BRANDS QUESTIONS
// ============================================

export const BRANDS_QUESTIONS: QuestionData[] = [
  // QUICK_LEAD
  {
    id: "ql_company",
    category: "QUICK_LEAD",
    type: "text",
    question: "Quel est le nom de votre entreprise ?",
    placeholder: "Ex: Acme Corp",
    required: true,
  },
  {
    id: "ql_name",
    category: "QUICK_LEAD",
    type: "text",
    question: "Votre nom & prénom",
    placeholder: "Ex: Marie Dupont",
    required: true,
  },
  {
    id: "ql_function",
    category: "QUICK_LEAD",
    type: "single",
    question: "Quelle est votre fonction ?",
    required: true,
    options: [
      { id: "cmo", label: "CMO / Directeur Marketing" },
      { id: "com_director", label: "Responsable Communication" },
      { id: "product", label: "Chef de Produit" },
      { id: "ceo", label: "CEO / Fondateur" },
      { id: "other", label: "Autre" },
    ],
  },
  {
    id: "ql_email",
    category: "QUICK_LEAD",
    type: "email",
    question: "Votre email professionnel",
    placeholder: "nom@entreprise.com",
    required: true,
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
    required: true,
    options: [
      {
        id: "awareness",
        label: "Notoriété",
        description: "Faire connaître ma marque/produit",
        emoji: "🎯",
      },
      {
        id: "traffic",
        label: "Trafic",
        description: "Attirer des visiteurs sur mon site/app",
        emoji: "🚀",
      },
      {
        id: "conversion",
        label: "Conversion",
        description: "Générer des ventes ou des leads",
        emoji: "💰",
      },
      {
        id: "retention",
        label: "Fidélisation",
        description: "Transformer mes clients en ambassadeurs",
        emoji: "❤️",
      },
    ],
  },
  {
    id: "ql_budget",
    category: "QUICK_LEAD",
    type: "single",
    question: "Budget mensuel estimé ?",
    required: true,
    options: [
      { id: "under_5k", label: "< 5K€" },
      { id: "5_15k", label: "5 – 15K€" },
      { id: "15_30k", label: "15 – 30K€" },
      { id: "over_30k", label: "30K€+" },
    ],
  },
  {
    id: "ql_urgency",
    category: "QUICK_LEAD",
    type: "single",
    question: "Urgence du projet ?",
    required: true,
    options: [
      { id: "immediate", label: "Immédiat" },
      { id: "this_month", label: "Ce mois-ci" },
      { id: "quarter", label: "Dans les 3 mois" },
    ],
  },
  // IDENTIFICATION
  {
    id: "a_sector",
    category: "IDENTIFICATION",
    type: "single",
    question: "Quel est votre secteur d'activité ?",
    required: true,
    options: [
      { id: "ecommerce", label: "E-commerce", emoji: "🛒" },
      { id: "saas", label: "SaaS / Tech B2B", emoji: "💻" },
      { id: "beauty", label: "Beauté / Cosmétiques", emoji: "💄" },
      { id: "food", label: "Food & Beverage", emoji: "🍔" },
      { id: "fashion", label: "Mode / Luxe", emoji: "👗" },
      { id: "other", label: "Autre", emoji: "📦" },
    ],
  },
  {
    id: "a_size",
    category: "IDENTIFICATION",
    type: "single",
    question: "Taille de votre entreprise ?",
    required: true,
    options: [
      { id: "startup", label: "Startup" },
      { id: "pme", label: "PME (< 50)" },
      { id: "enterprise", label: "Entreprise (250+)" },
    ],
  },
  {
    id: "a_model",
    category: "IDENTIFICATION",
    type: "single",
    question: "Votre business model ?",
    required: true,
    options: [
      { id: "b2c", label: "B2C" },
      { id: "b2b", label: "B2B" },
      { id: "d2c", label: "D2C" },
      { id: "marketplace", label: "Marketplace" },
    ],
  },
  {
    id: "a_budget_validator",
    category: "IDENTIFICATION",
    type: "single",
    question: "Qui valide les budgets marketing ?",
    required: true,
    options: [
      { id: "me", label: "Moi directement" },
      { id: "cmo", label: "CMO / Directeur Marketing" },
      { id: "ceo", label: "CEO / CFO" },
    ],
  },
  // NORTH_STAR
  {
    id: "b_north_star",
    category: "NORTH_STAR",
    type: "single",
    question: "Quel est votre objectif business #1 pour les 6 prochains mois ?",
    required: true,
    options: [
      { id: "awareness", label: "Notoriété" },
      { id: "traffic", label: "Trafic" },
      { id: "conversion", label: "Conversion" },
      { id: "retention", label: "Fidélisation" },
    ],
  },
  // MATURITY
  {
    id: "c_channels",
    category: "MATURITY",
    type: "multiple",
    question: "Sur quels canaux êtes-vous actuellement actif ?",
    required: true,
    options: [
      { id: "instagram", label: "Instagram" },
      { id: "tiktok", label: "TikTok" },
      { id: "linkedin", label: "LinkedIn" },
      { id: "youtube", label: "YouTube" },
    ],
  },
  {
    id: "c_frustration",
    category: "MATURITY",
    type: "single",
    question: "Quelle est votre principale frustration ?",
    required: true,
    options: [
      { id: "visibility", label: "Manque de visibilité" },
      { id: "conversion", label: "Taux de conversion trop bas" },
      { id: "roi", label: "Difficulté à mesurer le ROI" },
    ],
  },
  {
    id: "c_measurement",
    category: "MATURITY",
    type: "multiple",
    question: "Comment mesurez-vous vos perfs ?",
    required: true,
    options: [
      { id: "ga4", label: "Google Analytics" },
      { id: "pixels", label: "Pixels (Meta, TikTok)" },
      { id: "crm", label: "CRM" },
    ],
  },
  {
    id: "c_roas",
    category: "MATURITY",
    type: "scale",
    question: "Quel est votre ROAS actuel moyen ?",
    required: false,
    min: 0,
    max: 10,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
  },
  // AWARENESS (Conditional)
  {
    id: "d1_target_age",
    category: "NEEDS_AWARENESS",
    type: "multiple",
    question: "Cible démographique ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "awareness" },
    ],
    options: [
      { id: "18_24", label: "18-24 ans" },
      { id: "25_34", label: "25-34 ans" },
      { id: "35_44", label: "35-44 ans" },
    ],
  },
  {
    id: "d1_content_types",
    category: "NEEDS_AWARENESS",
    type: "multiple",
    question: "Types de contenu ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "awareness" },
    ],
    options: [
      { id: "influence", label: "Influence" },
      { id: "tiktok", label: "TikTok Blast" },
    ],
  },
  {
    id: "d1_kpis",
    category: "NEEDS_AWARENESS",
    type: "single",
    question: "KPI prio ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "awareness" },
    ],
    options: [
      { id: "impressions", label: "Impressions" },
      { id: "engagement", label: "Engagement" },
    ],
  },
  {
    id: "d1_ambassadors",
    category: "NEEDS_AWARENESS",
    type: "single",
    question: "Avez-vous des ambassadeurs ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "awareness" },
    ],
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  // TRAFFIC (Conditional)
  {
    id: "d2_destination",
    category: "NEEDS_TRAFFIC",
    type: "single",
    question: "Où diriger ce trafic ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "traffic" },
    ],
    options: [
      { id: "ecommerce", label: "Site e-commerce" },
      { id: "app", label: "App mobile" },
    ],
  },
  {
    id: "d2_levers",
    category: "NEEDS_TRAFFIC",
    type: "multiple",
    question: "Quels leviers ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "traffic" },
    ],
    options: [
      { id: "influence", label: "Influence" },
      { id: "ads", label: "Social Ads" },
    ],
  },
  {
    id: "d2_volume",
    category: "NEEDS_TRAFFIC",
    type: "single",
    question: "Volume visé ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "traffic" },
    ],
    options: [
      { id: "under_10k", label: "< 10K" },
      { id: "over_10k", label: "10K+" },
    ],
  },
  {
    id: "d2_site_conversion",
    category: "NEEDS_TRAFFIC",
    type: "single",
    question: "Site optimisé conversion ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "traffic" },
    ],
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  // CONVERSION (Conditional)
  {
    id: "d3_model",
    category: "NEEDS_CONVERSION",
    type: "single",
    question: "Business model conversion ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      { id: "ecommerce", label: "E-commerce" },
      { id: "lead", label: "Lead Gen" },
    ],
  },
  {
    id: "d3_cac_target",
    category: "NEEDS_CONVERSION",
    type: "single",
    question: "Objectif CAC ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      { id: "under_10", label: "< 10€" },
      { id: "under_50", label: "10-50€" },
      { id: "over_50", label: "> 50€" },
    ],
  },
  {
    id: "d3_roas_target",
    category: "NEEDS_CONVERSION",
    type: "single",
    question: "Objectif ROAS ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      { id: "2x", label: "2x" },
      { id: "3x", label: "3x-4x" },
      { id: "5x", label: "5x+" },
    ],
  },
  {
    id: "d3_formats",
    category: "NEEDS_CONVERSION",
    type: "multiple",
    question: "Formats ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      { id: "ugc", label: "UGC Ads" },
      { id: "pmax", label: "Google Ads" },
    ],
  },
  {
    id: "d3_assets",
    category: "NEEDS_CONVERSION",
    type: "single",
    question: "Avez-vous des contenus ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "conversion" },
    ],
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  // RETENTION (Conditional)
  {
    id: "d4_client_base",
    category: "NEEDS_RETENTION",
    type: "single",
    question: "Base clients existante ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "retention" },
    ],
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "d4_loyalty_devices",
    category: "NEEDS_RETENTION",
    type: "multiple",
    question: "Dispositifs fidélisation ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "retention" },
    ],
    options: [
      { id: "crm", label: "CRM / Email" },
      { id: "program", label: "Programme fidélité" },
    ],
  },
  {
    id: "d4_priority",
    category: "NEEDS_RETENTION",
    type: "single",
    question: "Priorité en fidélisation ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "retention" },
    ],
    options: [
      { id: "ltv", label: "LTV" },
      { id: "churn", label: "Réduire le churn" },
    ],
  },
  {
    id: "d4_interests",
    category: "NEEDS_RETENTION",
    type: "multiple",
    question: "Intérêts ?",
    required: false,
    conditions: [
      { questionId: "b_north_star", operator: "equals", value: "retention" },
    ],
    options: [
      { id: "ambassadors", label: "Ambassadeurs" },
      { id: "community", label: "Community Management" },
    ],
  },
  // SERVICES
  {
    id: "e_audit",
    category: "SERVICES",
    type: "single",
    question: "Besoin audit stratégique ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "e_production",
    category: "SERVICES",
    type: "multiple",
    question: "Types de contenus à produire ?",
    required: true,
    options: [
      { id: "ugc", label: "UGC" },
      { id: "video", label: "Vidéos courtes" },
      { id: "photo", label: "Photos" },
    ],
  },
  {
    id: "e_media_buying",
    category: "SERVICES",
    type: "single",
    question: "Déléguer l'achat média ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "e_influence_type",
    category: "SERVICES",
    type: "multiple",
    question: "Type collaboration influenceurs ?",
    required: true,
    options: [
      { id: "macro", label: "Macro" },
      { id: "micro", label: "Micro/Nano" },
    ],
  },
  {
    id: "e_reporting",
    category: "SERVICES",
    type: "single",
    question: "Niveau de reporting ?",
    required: true,
    options: [
      { id: "basic", label: "Basique" },
      { id: "advanced", label: "Avancé" },
    ],
  },
  // BUDGET
  {
    id: "f_budget_global",
    category: "BUDGET",
    type: "single",
    question: "Budget global mensuel ?",
    required: true,
    options: [
      { id: "under_10k", label: "< 10K€" },
      { id: "10_30k", label: "10-30K€" },
      { id: "over_30k", label: "30K€+" },
    ],
  },
  {
    id: "f_start",
    category: "BUDGET",
    type: "single",
    question: "Démarrage ?",
    required: true,
    options: [
      { id: "immediate", label: "Immédiat" },
      { id: "soon", label: "Sous 1-3 mois" },
    ],
  },
  {
    id: "f_duration",
    category: "BUDGET",
    type: "single",
    question: "Durée d'engagement ?",
    required: true,
    options: [
      { id: "short", label: "Ponctuel" },
      { id: "medium", label: "Moyen/Long terme" },
    ],
  },
  {
    id: "f_deadline",
    category: "BUDGET",
    type: "single",
    question: "Deadlines ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  // COMPETITIVE
  {
    id: "g_competitors",
    category: "COMPETITIVE",
    type: "text",
    question: "Vos 3 principaux concurrents ?",
    required: false,
  },
  {
    id: "g_tone",
    category: "COMPETITIVE",
    type: "multiple",
    question: "Ton de communication ?",
    required: true,
    options: [
      { id: "premium", label: "Premium" },
      { id: "fun", label: "Fun/Décalé" },
      { id: "serious", label: "Sérieux/Expert" },
    ],
  },
  {
    id: "g_creative_codes",
    category: "COMPETITIVE",
    type: "single",
    question: "Codes créatifs spécifiques ?",
    required: true,
    options: [
      { id: "strict", label: "Charte stricte" },
      { id: "freedom", label: "Liberté totale" },
    ],
  },
  // ORGANIZATION
  {
    id: "h_team_size",
    category: "ORGANIZATION",
    type: "single",
    question: "Taille de l'équipe marketing ?",
    required: true,
    options: [
      { id: "solo", label: "Solo" },
      { id: "small", label: "Petite" },
      { id: "structured", label: "Structurée" },
    ],
  },
  {
    id: "h_agency_experience",
    category: "ORGANIZATION",
    type: "single",
    question: "Expérience avec agence marketing ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "h_decision_process",
    category: "ORGANIZATION",
    type: "single",
    question: "Process de décision ?",
    required: true,
    options: [
      { id: "fast", label: "Rapide" },
      { id: "structured", label: "Structuré" },
    ],
  },
  // ADDITIONAL
  {
    id: "i_motivation",
    category: "ADDITIONAL",
    type: "single",
    question: "Motivation ?",
    required: true,
    options: [
      { id: "growth", label: "Croissance" },
      { id: "overloaded", label: "Surcharge interne" },
      { id: "other", label: "Autre" },
    ],
  },
  {
    id: "i_discovery",
    category: "ADDITIONAL",
    type: "single",
    question: "Comment avez-vous découvert Wafia ?",
    required: false,
    options: [
      { id: "google", label: "Google" },
      { id: "referral", label: "Bouche à oreille" },
      { id: "social", label: "Réseaux Sociaux" },
    ],
  },
  {
    id: "i_constraints",
    category: "ADDITIONAL",
    type: "text",
    question: "Contraintes spécifiques ?",
    required: false,
  },
];

// ============================================
// TALENTS QUESTIONS
// ============================================

export const TALENTS_QUESTIONS: QuestionData[] = [
  // CALIBRATION
  {
    id: "q0_level",
    category: "CALIBRATION",
    type: "single",
    question: "Où en es-tu dans ta carrière de créateur ?",
    required: true,
    options: [
      { id: "beginner", label: "Je me lance" },
      { id: "intermediate", label: "J'ai une petite communauté" },
      { id: "pro", label: "J'en vis à plein temps" },
    ],
  },
  {
    id: "q0_objective",
    category: "CALIBRATION",
    type: "single",
    question: "Quel est ton objectif principal en ce moment ?",
    required: true,
    options: [
      { id: "monetize", label: "Monétiser mon audience" },
      { id: "grow", label: "Faire grossir mon audience" },
      { id: "struct", label: "Me structurer et gagner du temps" },
    ],
  },
  {
    id: "q0_availability",
    category: "CALIBRATION",
    type: "single",
    question: "Combien de temps peux-tu consacrer à ta création ?",
    required: true,
    options: [
      { id: "part_time", label: "À côté d'un job/études" },
      { id: "full_time", label: "À plein temps" },
    ],
  },
  {
    id: "q0_team",
    category: "CALIBRATION",
    type: "single",
    question: "As-tu une équipe pour t'aider ?",
    required: true,
    options: [
      { id: "solo", label: "Solo" },
      { id: "freelancers", label: "Quelques freelances (monteur, etc.)" },
      { id: "agency", label: "Je suis en agence" },
    ],
  },
  // VISION
  {
    id: "vision_01",
    category: "VISION",
    type: "single",
    question: "As-tu une niche clairement définie ?",
    required: true,
    options: [
      { id: "yes", label: "Oui, très claire" },
      { id: "vague", label: "C'est vague" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "vision_02",
    category: "VISION",
    type: "single",
    question: "As-tu défini ton personal branding ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "vision_03",
    category: "VISION",
    type: "single",
    question: "As-tu une roadmap pour les 12 prochains mois ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "vision_04",
    category: "VISION",
    type: "scale",
    question:
      "Sur une échelle de 1 à 10, à quel point ta vision est-elle claire ?",
    required: true,
    min: 1,
    max: 10,
  },
  // PRODUCTION
  {
    id: "prod_01",
    category: "PRODUCTION",
    type: "single",
    question: "As-tu un calendrier éditorial ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "sometimes", label: "De temps en temps" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "prod_02",
    category: "PRODUCTION",
    type: "single",
    question: "Tu tournes tes vidéos à l'avance (batching) ?",
    required: true,
    options: [
      { id: "yes", label: "Oui, toujours" },
      { id: "sometimes", label: "Parfois" },
      { id: "no", label: "Non, jamais" },
    ],
  },
  {
    id: "prod_02_why",
    category: "PRODUCTION",
    type: "single",
    question: "Pourquoi ne batches-tu pas ?",
    required: false,
    conditions: [{ questionId: "prod_02", operator: "equals", value: "no" }],
    options: [
      { id: "time", label: "Manque de temps" },
      { id: "organization", label: "Problème d'organisation" },
      { id: "format", label: "Mon format ne s'y prête pas" },
    ],
  },
  {
    id: "prod_03",
    category: "PRODUCTION",
    type: "single",
    question: "Quel est ton setup de production ?",
    required: true,
    options: [
      { id: "smartphone", label: "Smartphone & lumière naturelle" },
      { id: "pro", label: "Setup pro (Caméra, Mic)" },
    ],
  },
  {
    id: "prod_04",
    category: "PRODUCTION",
    type: "single",
    question: "À quelle fréquence publies-tu ?",
    required: true,
    options: [
      { id: "daily", label: "Tous les jours" },
      { id: "weekly", label: "Plusieurs fois par semaine" },
      { id: "monthly", label: "Moins souvent" },
    ],
  },
  // BUSINESS
  {
    id: "biz_01",
    category: "BUSINESS",
    type: "single",
    question: "Génères-tu des revenus avec ton contenu ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "biz_02",
    category: "BUSINESS",
    type: "multiple",
    question: "Quelles sont tes sources de revenus ?",
    required: true,
    conditions: [
      {
        questionId: "biz_01",
        operator: "one_of",
        value: ["yes_living", "yes_complement", "starting"],
      },
    ],
    options: [
      { id: "sponso", label: "Sponsoring / Placements" },
      { id: "ads", label: "Monétisation Plateforme (YouTube Ads, etc.)" },
      { id: "products", label: "Vente de produits / Affiliation" },
    ],
  },
  {
    id: "biz_03",
    category: "BUSINESS",
    type: "single",
    question: "As-tu une rate card (grille tarifaire) ?",
    required: true,
    conditions: [
      {
        questionId: "q0_level",
        operator: "one_of",
        value: ["intermediaire", "star"],
      },
    ],
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "biz_04",
    category: "BUSINESS",
    type: "single",
    question: "Combien de collaborations marques as-tu fait cette année ?",
    required: true,
    conditions: [
      {
        questionId: "q0_level",
        operator: "one_of",
        value: ["intermediaire", "star"],
      },
    ],
    options: [
      { id: "none", label: "0" },
      { id: "few", label: "1 - 5" },
      { id: "many", label: "5+" },
    ],
  },
  // REACH
  {
    id: "reach_01",
    category: "REACH",
    type: "single",
    question: "Sur combien de plateformes es-tu présent·e ?",
    required: true,
    options: [
      { id: "one", label: "1 seule" },
      { id: "few", label: "2 - 3" },
      { id: "many", label: "Plus de 3" },
    ],
  },
  {
    id: "reach_02",
    category: "REACH",
    type: "single",
    question: "Analyses-tu tes statistiques régulièrement ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "reach_03",
    category: "REACH",
    type: "single",
    question:
      "Comprends-tu comment fonctionne l'algorithme de ta plateforme principale ?",
    required: true,
    options: [
      { id: "yes", label: "Je gère" },
      { id: "vague", label: "Un peu" },
      { id: "no", label: "Pas du tout" },
    ],
  },
  {
    id: "reach_04",
    category: "REACH",
    type: "single",
    question: "As-tu fait des collaborations avec d'autres créateurs ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  // HEALTH
  {
    id: "health_01",
    category: "HEALTH",
    type: "single",
    question: "Comment gères-tu les commentaires négatifs ?",
    required: true,
    options: [
      { id: "ignore", label: "Je les ignore" },
      { id: "affect", label: "Ça m'affecte beaucoup" },
      { id: "ban", label: "Je supprime / bloque" },
    ],
  },
  {
    id: "health_02",
    category: "HEALTH",
    type: "scale",
    question: "Ton niveau de stress lié à la création (1-10)",
    required: true,
    min: 1,
    max: 10,
  },
  {
    id: "health_03",
    category: "HEALTH",
    type: "single",
    question: "As-tu déjà ressenti un burn-out lié à ta création ?",
    required: true,
    options: [
      { id: "yes", label: "Oui" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "health_04",
    category: "HEALTH",
    type: "single",
    question: "As-tu un statut juridique pour ton activité ?",
    required: true,
    conditions: [
      {
        questionId: "biz_01",
        operator: "one_of",
        value: ["yes_living", "yes_complement", "starting"],
      },
    ],
    options: [
      { id: "yes", label: "Oui (Auto, SAS, etc.)" },
      { id: "no", label: "Non" },
    ],
  },
  {
    id: "health_05",
    category: "HEALTH",
    type: "single",
    question: "Fais-tu relire tes contrats de partenariat ?",
    required: true,
    conditions: [
      {
        questionId: "q0_level",
        operator: "one_of",
        value: ["intermediaire", "star"],
      },
      {
        questionId: "biz_01",
        operator: "one_of",
        value: ["yes_living", "yes_complement"],
      },
    ],
    options: [
      { id: "yes", label: "Oui, par un pro" },
      { id: "sometimes", label: "Parfois" },
      { id: "no", label: "Non, je gère seul·e" },
    ],
  },
];
