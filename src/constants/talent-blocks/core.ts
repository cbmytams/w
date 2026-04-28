export const TALENT_HERO = {
  badge: "Talent management 360",
  title: "Votre talent.",
  titleHighlight: "Une structure autour.",
  subtitle:
    "Wafia accompagne les créateurs, artistes, comédiens, musiciens et talents hybrides dans la construction de leur image, de leurs revenus et de leurs opportunités.",
  ctaPrimary: "Se référencer",
  ctaSecondary: "Notre approche",
  callsAvailable: 0,
  proofPoints: [
    { label: "Image & positionnement", value: "Identité" },
    { label: "Projets & production", value: "Formats" },
    { label: "Revenus & protection", value: "Business" },
  ],
} as const;

export const TALENT_PROBLEM = {
  id: "problem",
  title: "Le talent ouvre les portes. La structure construit la carrière.",
  description:
    "Un talent peut venir d'une scène, d'un atelier, d'un plateau, d'un studio ou d'une audience. Ce qui fait la différence dans la durée : une image lisible, des projets choisis, des droits protégés et une équipe qui sait gérer ce qui se joue en coulisses.",
  painTags: [
    "Image difficile à lire",
    "Opportunités mal cadrées",
    "Droits insuffisamment protégés",
    "Revenus trop dépendants du hasard",
  ],
  conclusion:
    "Nous ne vous ajoutons pas à une liste. Nous structurons l'écosystème qui doit exister autour de vous.",
} as const;

export const TALENT_CTA = {
  title: "Prêt à structurer la suite ?",
  description: "",
  ctaText: "Se référencer",
} as const;

export const TALENT_FOR_WHO = {
  id: "who",
  title: "Pour qui ?",
  forYou: {
    title: "C'est fait pour vous si :",
    items: [
      "Vous êtes créateur, artiste, comédien, musicien, peintre, performer ou talent hybride avec une image à structurer.",
      "Vous voulez une trajectoire construite, pas seulement une succession d'opportunités isolées.",
      "Vous cherchez une structure solide : image, production, droits, admin, stratégie, revenus.",
      "Vous voulez des partenariats, bookings et projets qui respectent votre valeur.",
    ],
  },
  notForYou: {
    title: "Pas pour vous si :",
    items: [
      "Vous cherchez uniquement une mise en relation ponctuelle.",
      "Vous ne souhaitez pas travailler votre image, vos offres ou votre cadre professionnel.",
      "Vous préférez multiplier les opportunités sans arbitrage stratégique.",
      "L'idée de process, de droits cadrés et de délégation ne vous correspond pas.",
    ],
  },
} as const;

export const BRAND_GRADIENT = "from-pink-500 to-pink-600";

export const TALENT_BUSINESS = {
  label: "Business & Revenus",
  title: "Transformez votre valeur",
  titleLine2: "en revenus structurés.",
  description:
    "Nous structurons votre activité pour que chaque collaboration, apparition, contenu ou projet s'inscrive dans un cadre clair : offres, tarifs, droits, facturation et protection juridique.",
  quote:
    "Un talent sans modèle économique dépend des occasions. Avec une structure, il choisit sa trajectoire.",
  steps: [
    "Audit de la monétisation actuelle",
    "Création d'une grille tarifaire sur mesure",
    "Mise en place des process de négociation et de booking",
    "Sécurisation juridique des partenariats",
  ],
  conclusion: "De la visibilité à une activité pérenne.",
} as const;

export const TALENT_IDENTITY = {
  label: "Identité & Image",
  title: "Construisez une image",
  titleLine2: "qu'on ne peut pas ignorer.",
  subtitle: "Votre identité est votre actif le plus durable.",
  description:
    "On travaille votre positionnement, votre univers visuel et votre ligne éditoriale. Un tout cohérent, reconnaissable, qui attire les bons partenaires.",
  quote: "L'image la plus forte est celle qui ne force rien.",
  services: [
    {
      title: "Positionnement",
      description:
        "Définition de votre niche, de votre ton et de votre direction artistique.",
    },
    {
      title: "Identité visuelle",
      description:
        "Palette, typographie, templates et charte graphique cohérente.",
    },
    {
      title: "Ligne éditoriale",
      description: "Stratégie de contenu alignée avec votre audience cible.",
    },
    {
      title: "Personal Branding",
      description: "Une marque propre à vous. Singulière et mémorable.",
    },
  ],
} as const;
