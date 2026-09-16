// Ajouts commerciaux pour /for-brands

export const BRAND_NAVIGATION = [
  { href: "#case-studies", label: "Réalisations" },
  { href: "#process", label: "Méthode" },
  { href: "#faq", label: "FAQ" },
] as const;

export const BRAND_HERO_CONTENT = {
  badge: "Pour les marques et agences qui veulent un cadre clair",
  title: {
    line1: "Wafia construit les campagnes créateurs",
    highlight: "que les marques peuvent assumer.",
  },
  subtitle:
    "Nous aidons les marques à choisir les bons talents, produire les bons formats et cadrer les droits avant que la campagne parte en diffusion. Pas de casting décoratif. Pas de contenu jetable. Pas de reporting illisible.",
  antiMarket: [
    {
      type: "check",
      text: "Le casting doit pouvoir s'expliquer, pas seulement séduire.",
    },
    {
      type: "check",
      text: "Le contenu doit pouvoir resservir, en organique comme en paid.",
    },
    {
      type: "check",
      text: "Les droits, validations et résultats doivent être clairs avant le bilan.",
    },
  ],
  stats: [
    { value: "15+", label: "marques accompagnées", color: "orange" },
    { value: "200+", label: "contenus produits", color: "blue" },
    { value: "Top 3%", label: "des profils audités retenus", color: "green" },
  ],
  cta: {
    primary: { text: "Parler d'une campagne", href: "/contact/brands" },
    secondary: {
      text: "Voir les dossiers",
      href: "#case-studies",
    },
  },
  timing: "Casting, production, droits, diffusion, lecture des résultats.",
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
