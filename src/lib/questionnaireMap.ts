export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "single"
  | "multiple"
  | "scale"
  | "file"
  | "date";

export type QuestionnaireMap = {
  type: "TALENTS" | "BRANDS";
  sections: {
    id: string;
    label: string;
    fields: {
      key: string;
      label: string;
      type: FieldType;
      required: boolean;
    }[];
  }[];
};

export const TALENTS_QUESTIONNAIRE_MAP: QuestionnaireMap = {
  type: "TALENTS",
  sections: [
    {
      id: "CALIBRATION",
      label: "Calibration",
      fields: [
        {
          key: "q0_level",
          label: "Où en es-tu dans ta carrière de créateur ?",
          type: "single",
          required: true,
        },
        {
          key: "q0_objective",
          label: "Quel est ton objectif principal en ce moment ?",
          type: "single",
          required: true,
        },
        {
          key: "q0_availability",
          label: "Combien de temps peux-tu consacrer à ta création ?",
          type: "single",
          required: true,
        },
        {
          key: "q0_team",
          label: "As-tu une équipe pour t'aider ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "VISION",
      label: "Vision & Stratégie",
      fields: [
        {
          key: "vision_01",
          label: "As-tu une niche clairement définie ?",
          type: "single",
          required: true,
        },
        {
          key: "vision_02",
          label: "As-tu défini ton personal branding ?",
          type: "single",
          required: true,
        },
        {
          key: "vision_03",
          label: "As-tu une roadmap pour les 12 prochains mois ?",
          type: "single",
          required: true,
        },
        {
          key: "vision_04",
          label:
            "Sur une échelle de 1 à 10, à quel point ta vision est-elle claire ?",
          type: "scale",
          required: true,
        },
      ],
    },
    {
      id: "PRODUCTION",
      label: "Production",
      fields: [
        {
          key: "prod_01",
          label: "As-tu un calendrier éditorial ?",
          type: "single",
          required: true,
        },
        {
          key: "prod_02",
          label: "Tu tournes tes vidéos à l'avance (batching) ?",
          type: "single",
          required: true,
        },
        {
          key: "prod_02_why",
          label: "Pourquoi ne batches-tu pas ?",
          type: "single",
          required: false,
        }, // Conditional
        {
          key: "prod_03",
          label: "Quel est ton setup de production ?",
          type: "single",
          required: true,
        },
        {
          key: "prod_04",
          label: "À quelle fréquence publies-tu ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "BUSINESS",
      label: "Business & Revenus",
      fields: [
        {
          key: "biz_01",
          label: "Génères-tu des revenus avec ton contenu ?",
          type: "single",
          required: true,
        },
        {
          key: "biz_02",
          label: "Quelles sont tes sources de revenus ?",
          type: "multiple",
          required: true,
        },
        {
          key: "biz_03",
          label: "As-tu une rate card (grille tarifaire) ?",
          type: "single",
          required: true,
        },
        {
          key: "biz_04",
          label: "Combien de collaborations marques as-tu fait cette année ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "REACH",
      label: "Reach & Audience",
      fields: [
        {
          key: "reach_01",
          label: "Sur combien de plateformes es-tu présent·e ?",
          type: "single",
          required: true,
        },
        {
          key: "reach_02",
          label: "Analyses-tu tes statistiques régulièrement ?",
          type: "single",
          required: true,
        },
        {
          key: "reach_03",
          label:
            "Comprends-tu comment fonctionne l'algorithme de ta plateforme principale ?",
          type: "single",
          required: true,
        },
        {
          key: "reach_04",
          label: "As-tu fait des collaborations avec d'autres créateurs ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "HEALTH",
      label: "Santé Mentale & Légale",
      fields: [
        {
          key: "health_01",
          label: "Comment gères-tu les commentaires négatifs ?",
          type: "single",
          required: true,
        },
        {
          key: "health_02",
          label: "Ton niveau de stress lié à la création (1-10)",
          type: "scale",
          required: true,
        },
        {
          key: "health_03",
          label: "As-tu déjà ressenti un burn-out lié à ta création ?",
          type: "single",
          required: true,
        },
        {
          key: "health_04",
          label: "As-tu un statut juridique pour ton activité ?",
          type: "single",
          required: true,
        },
        {
          key: "health_05",
          label: "Fais-tu relire tes contrats de partenariat ?",
          type: "single",
          required: true,
        },
      ],
    },
  ],
};

export const BRANDS_QUESTIONNAIRE_MAP: QuestionnaireMap = {
  type: "BRANDS",
  sections: [
    {
      id: "QUICK_LEAD",
      label: "Contact Rapide",
      fields: [
        {
          key: "ql_company",
          label: "Quel est le nom de votre entreprise ?",
          type: "text",
          required: true,
        },
        {
          key: "ql_name",
          label: "Votre nom & prénom",
          type: "text",
          required: true,
        },
        {
          key: "ql_function",
          label: "Quelle est votre fonction ?",
          type: "single",
          required: true,
        },
        {
          key: "ql_email",
          label: "Votre email professionnel",
          type: "email",
          required: true,
        },
        {
          key: "ql_phone",
          label: "Votre numéro de téléphone",
          type: "tel",
          required: false,
        },
        {
          key: "ql_website",
          label: "Votre site web",
          type: "url",
          required: false,
        },
        {
          key: "ql_objective",
          label: "Votre objectif principal ?",
          type: "single",
          required: true,
        },
        {
          key: "ql_budget",
          label: "Budget mensuel estimé ?",
          type: "single",
          required: true,
        },
        {
          key: "ql_urgency",
          label: "Urgence du projet ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "IDENTIFICATION",
      label: "Identification",
      fields: [
        {
          key: "a_sector",
          label: "Quel est votre secteur d'activité ?",
          type: "single",
          required: true,
        },
        {
          key: "a_size",
          label: "Taille de votre entreprise ?",
          type: "single",
          required: true,
        },
        {
          key: "a_model",
          label: "Votre business model ?",
          type: "single",
          required: true,
        },
        {
          key: "a_budget_validator",
          label: "Qui valide les budgets marketing ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "NORTH_STAR",
      label: "Objectif North Star",
      fields: [
        {
          key: "b_north_star",
          label:
            "Quel est votre objectif business #1 pour les 6 prochains mois ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "MATURITY",
      label: "Maturité Marketing",
      fields: [
        {
          key: "c_channels",
          label: "Sur quels canaux êtes-vous actuellement actif ?",
          type: "multiple",
          required: true,
        },
        {
          key: "c_frustration",
          label: "Quelle est votre principale frustration marketing ?",
          type: "single",
          required: true,
        },
        {
          key: "c_measurement",
          label: "Comment mesurez-vous vos performances marketing ?",
          type: "multiple",
          required: true,
        },
        {
          key: "c_roas",
          label: "Quel est votre ROAS actuel moyen ?",
          type: "scale",
          required: false,
        }, // Conditional
      ],
    },
    {
      id: "NEEDS_AWARENESS",
      label: "Besoins Notoriété",
      fields: [
        {
          key: "d1_target_age",
          label: "Quelle est votre cible démographique principale ?",
          type: "multiple",
          required: false,
        }, // Conditional
        {
          key: "d1_content_types",
          label: "Quels types de contenu vous intéressent ?",
          type: "multiple",
          required: false,
        }, // Conditional
        {
          key: "d1_kpis",
          label: "Quel KPI priorisez-vous le plus ?",
          type: "single",
          required: false,
        }, // Conditional
        {
          key: "d1_ambassadors",
          label: "Avez-vous des ambassadeurs ou égéries actuellement ?",
          type: "single",
          required: false,
        }, // Conditional
      ],
    },
    {
      id: "NEEDS_TRAFFIC",
      label: "Besoins Trafic",
      fields: [
        {
          key: "d2_destination",
          label: "Où souhaitez-vous diriger ce trafic ?",
          type: "single",
          required: false,
        }, // Conditional
        {
          key: "d2_levers",
          label: "Quels leviers souhaitez-vous activer ?",
          type: "multiple",
          required: false,
        }, // Conditional
        {
          key: "d2_volume",
          label: "Quel volume de trafic mensuel visez-vous ?",
          type: "single",
          required: false,
        }, // Conditional
        {
          key: "d2_site_conversion",
          label: "Votre site est-il optimisé pour la conversion ?",
          type: "single",
          required: false,
        }, // Conditional
      ],
    },
    {
      id: "NEEDS_CONVERSION",
      label: "Besoins Conversion",
      fields: [
        {
          key: "d3_model",
          label: "Quel est votre business model de conversion ?",
          type: "single",
          required: false,
        }, // Conditional
        {
          key: "d3_cac_target",
          label: "Quel est votre objectif de CAC cible ?",
          type: "single",
          required: false,
        }, // Conditional
        {
          key: "d3_roas_target",
          label: "Quel ROAS minimum visez-vous ?",
          type: "single",
          required: false,
        }, // Conditional
        {
          key: "d3_formats",
          label:
            "Quels formats vous intéressent pour maximiser les conversions ?",
          type: "multiple",
          required: false,
        }, // Conditional
        {
          key: "d3_assets",
          label: "Avez-vous un catalogue de contenus créatifs pour les ads ?",
          type: "single",
          required: false,
        }, // Conditional
      ],
    },
    {
      id: "NEEDS_RETENTION",
      label: "Besoins Fidélisation",
      fields: [
        {
          key: "d4_client_base",
          label: "Avez-vous une base clients existante ?",
          type: "single",
          required: false,
        }, // Conditional
        {
          key: "d4_loyalty_devices",
          label: "Quels dispositifs de fidélisation avez-vous ?",
          type: "multiple",
          required: false,
        }, // Conditional
        {
          key: "d4_priority",
          label: "Quel est votre objectif prioritaire en fidélisation ?",
          type: "single",
          required: false,
        }, // Conditional
        {
          key: "d4_interests",
          label: "Quels dispositifs vous intéresseraient ?",
          type: "multiple",
          required: false,
        }, // Conditional
      ],
    },
    {
      id: "SERVICES",
      label: "Services Attendus",
      fields: [
        {
          key: "e_audit",
          label: "Avez-vous besoin d'un audit stratégique préalable ?",
          type: "single",
          required: true,
        },
        {
          key: "e_production",
          label: "Quels types de contenus devez-vous produire ?",
          type: "multiple",
          required: true,
        },
        {
          key: "e_media_buying",
          label: "Souhaitez-vous déléguer l'achat média (ads payantes) ?",
          type: "single",
          required: true,
        },
        {
          key: "e_influence_type",
          label: "Quel type de collaboration influenceurs recherchez-vous ?",
          type: "multiple",
          required: true,
        },
        {
          key: "e_reporting",
          label: "Quel niveau de reporting attendez-vous ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "BUDGET",
      label: "Budget & Timeline",
      fields: [
        {
          key: "f_budget_global",
          label: "Quel est votre budget global mensuel pour cette activation ?",
          type: "single",
          required: true,
        },
        {
          key: "f_start",
          label: "Quand souhaitez-vous démarrer ?",
          type: "single",
          required: true,
        },
        {
          key: "f_duration",
          label: "Durée d'engagement souhaitée ?",
          type: "single",
          required: true,
        },
        {
          key: "f_deadline",
          label: "Y a-t-il des deadlines spécifiques ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "COMPETITIVE",
      label: "Concurrence",
      fields: [
        {
          key: "g_competitors",
          label: "Qui sont vos 3 principaux concurrents directs ?",
          type: "text",
          required: false,
        },
        {
          key: "g_tone",
          label: "Quel ton de communication souhaitez-vous ?",
          type: "multiple",
          required: true,
        },
        {
          key: "g_creative_codes",
          label: "Avez-vous des codes créatifs spécifiques à respecter ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "ORGANIZATION",
      label: "Organisation",
      fields: [
        {
          key: "h_team_size",
          label: "Quelle est la taille de votre équipe marketing ?",
          type: "single",
          required: true,
        },
        {
          key: "h_agency_experience",
          label: "Avez-vous déjà travaillé avec une agence marketing ?",
          type: "single",
          required: true,
        },
        {
          key: "h_decision_process",
          label: "Quel est votre process de décision habituel ?",
          type: "single",
          required: true,
        },
      ],
    },
    {
      id: "ADDITIONAL",
      label: "Informations Complémentaires",
      fields: [
        {
          key: "i_motivation",
          label: "Pourquoi cherchez-vous une agence maintenant ?",
          type: "single",
          required: true,
        },
        {
          key: "i_discovery",
          label: "Comment avez-vous découvert Wafia ?",
          type: "single",
          required: false,
        },
        {
          key: "i_constraints",
          label: "Y a-t-il des contraintes spécifiques à connaître ?",
          type: "text",
          required: false,
        },
      ],
    },
  ],
};
