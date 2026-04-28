import { Clapperboard, Zap, Aperture, type LucideIcon } from "lucide-react";

export interface StudioProduction {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  tags: string[];
  stats: { label: string; value: string }[];
  services: string[];
  samples?: string[];
  showcase?: string[];
  showcaseBranding?: { client: string; campaign: string }[];
  comingSoon?: boolean;
}

export const STUDIO_PRODUCTIONS: StudioProduction[] = [
  {
    id: "krh",
    name: "KRH",
    tagline: "Production sociale rapide",
    description:
      "Contenus courts, formats verticaux et assets pensés pour TikTok, Reels, Shorts et Ads.",
    longDescription:
      "KRH produit les formats courts dont une campagne a besoin pour exister sur les plateformes : idées, tournage, montage, déclinaisons et assets réutilisables. L'objectif : produire vite, juste et proprement, sans perdre la cohérence de marque.",
    icon: Zap,
    color: "bg-yellow-400",
    gradient: "from-yellow-400 to-orange-500",
    tags: ["Formats courts", "UGC", "Paid-ready"],
    stats: [
      { label: "Assets / mois", value: "150+" },
      { label: "Avg. ROAS", value: "3.2x" },
      { label: "Turnaround", value: "48h" },
    ],
    services: [
      "Création TikTok & Reels",
      "UGC et formats courts",
      "Montage social media",
      "Déclinaisons paid media",
    ],
    samples: [
      "/studio/krh/1%20-%20KRH.MP4",
      "/studio/krh/2%20-%20KRH.MP4",
      "/studio/krh/3%20-%20KRH.MP4",
    ],
    showcase: [
      "/studio/krh/basic-fit-redha-vf.mp4",
      "/studio/krh/noah-basic-fit-vf.mp4",
      "/studio/krh/ana-basic-fit-vf.mp4",
      "/studio/krh/shayna-basic-fit-vf.mp4",
    ],
    showcaseBranding: [
      { client: "Basic-Fit", campaign: "Booste ton énergie" },
      { client: "Basic-Fit", campaign: "Booste ton énergie" },
      { client: "Basic-Fit", campaign: "Booste ton énergie" },
      { client: "Basic-Fit", campaign: "Booste ton énergie" },
    ],
  },
  {
    id: "assaud",
    name: "Assaud",
    tagline: "Films de marque & image",
    description:
      "Films de marque, publicités, interviews et pièces maîtresses.",
    longDescription:
      "Assaud apporte l'exigence du cinéma à votre marque. Équipes de tournages complètes, caméras RED/Arri, étalonnage cinéma... Nous créons les pièces maîtresses de votre communication, celles qui définissent votre image de marque pour les années à venir.",
    icon: Aperture,
    color: "bg-blue-500",
    gradient: "from-blue-600 to-cyan-400",
    tags: ["Cinéma", "TVC", "Image"],
    stats: [
      { label: "Awards", value: "12" },
      { label: "Qualité", value: "8K Red" },
      { label: "Crew Size", value: "10-50" },
    ],
    services: [
      "Films de marque",
      "Publicités",
      "Documentaire",
      "Post-production image",
    ],
    comingSoon: true,
  },
  {
    id: "aura",
    name: "AURA",
    tagline: "Captation & activations",
    description:
      "Captation événementielle, Livestreams et expériences immersives.",
    longDescription:
      "AURA transforme les événements, lancements, salons, scènes et activations physiques en contenus exploitables : captation, coordination terrain, formats live, aftermovies et assets sociaux.",
    icon: Clapperboard,
    color: "bg-purple-500",
    gradient: "from-purple-600 to-pink-500",
    tags: ["Événement", "Live", "Assets"],
    stats: [
      { label: "Events / an", value: "45" },
      { label: "Audience Live", value: "1M+" },
      { label: "Réactivité", value: "Real-time" },
    ],
    services: [
      "Couverture événementielle",
      "Broadcast multi-cam",
      "Captation live",
      "Montages rapides",
    ],
    comingSoon: true,
  },
];
