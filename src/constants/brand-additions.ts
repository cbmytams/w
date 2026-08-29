// Ajouts commerciaux pour /for-brands

export const BRAND_NAVIGATION = [
  { href: "#case-studies", label: "Réalisations" },
  { href: "#process", label: "Méthode" },
  { href: "#faq", label: "FAQ" },
] as const;

export const BRAND_HERO_CONTENT = {
  badge: "Campagnes créateurs, structurées de bout en bout",
  title: {
    line1: "Des campagnes créateurs",
    highlight: "structurées.",
  },
  subtitle:
    "Wafia réunit stratégie, casting, production, droits et reporting pour transformer une campagne en actif exploitable.",
  antiMarket: [
    {
      type: "check",
      text: "Casting argumenté : audience, cohérence de marque, historique et risques vérifiés.",
    },
    {
      type: "check",
      text: "Production pensée pour durer : contenus natifs, assets paid-ready, droits cadrés.",
    },
    {
      type: "check",
      text: "Pilotage lisible : validations, budget, performances et enseignements centralisés.",
    },
  ],
  stats: [
    { value: "15+", label: "Marques accompagnées", color: "orange" },
    { value: "200+", label: "Contenus produits", color: "blue" },
    { value: "Top 3%", label: "Des talents audités retenus", color: "green" },
  ],
  cta: {
    primary: { text: "Voir nos réalisations", href: "#case-studies" },
    secondary: {
      text: "Structurer ma campagne",
      href: "/contact/brands",
    },
  },
  timing: "Cadrage, casting, production, droits, reporting.",
} as const;

export const AUTHENTICITY_CARDS = [
  {
    id: "01",
    title: "Une audience qualifiée",
    description: "Nous sélectionnons les créateurs dont l'audience",
    highlight: "EST",
    suffix: "votre cible commerciale.",
    color: "text-pink-400", // Tailwind class for easy usage
    gradient: "bg-pink-500/20",
    hover: "group-hover:bg-pink-500/30",
    delay: 0,
  },
  {
    id: "02",
    title: "Une affinité sincère",
    description: "Des profils qui",
    highlight: "ADHÈRENT",
    suffix: "réellement à votre vision.",
    color: "text-purple-400",
    gradient: "bg-purple-500/20",
    hover: "group-hover:bg-purple-500/30",
    delay: 0.1,
  },
  {
    id: "03",
    title: "Des campagnes organiques",
    description:
      "Une co-création sur-mesure, loin des discours publicitaires formatés.",
    highlight: "",
    suffix: "",
    color: "",
    gradient: "bg-indigo-500/20",
    hover: "group-hover:bg-indigo-500/30",
    delay: 0.2,
  },
] as const;
