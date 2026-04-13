/**
 * Liste des clients/marques affichés sur le site
 * Logos officiels à déposer dans /public/logos/ (light + dark si nécessaire)
 */

export interface Client {
  name: string;
  logoLight: string; // Chemin vers le logo clair (relatif à /public)
  logoDark?: string; // Chemin vers le logo sombre (relatif à /public)
  logoClass?: string; // Ajustement optique optionnel
}

export const CLIENTS: Client[] = [
  { name: "Adidas", logoLight: "/logos/adidas-2.svg" },
  { name: "Asics", logoLight: "/logos/asics-6.svg" },
  { name: "Alibaba", logoLight: "/logos/brandbird-alibaba-logotype.svg" },
  { name: "BYD", logoLight: "/logos/byd-auto-logo-1.svg" },
  { name: "Carrefour", logoLight: "/logos/carrefour-logo-1.svg" },
  { name: "Citroën", logoLight: "/logos/citroen-2.svg" },
  { name: "CJ Group", logoLight: "/logos/cj-logo.svg" },
  { name: "Gigabyte", logoLight: "/logos/gigabyte-technology-logo-2008.svg" },
  { name: "Hostinger", logoLight: "/logos/hostinger.svg" },
  { name: "JBL", logoLight: "/logos/jbl-2.svg" },
  { name: "L'Oréal", logoLight: "/logos/l-oreal-3.svg" },
  { name: "Amazon", logoLight: "/logos/logo-amazon.svg" },
  { name: "Netgear", logoLight: "/logos/netgear-logo-2014.svg" },
  { name: "Shopify", logoLight: "/logos/shopify.svg" },
  { name: "Sonos", logoLight: "/logos/sonos-logo.svg" },
  { name: "Sosh", logoLight: "/logos/sosh-logo-bleu-.svg" },
  { name: "Warner Bros", logoLight: "/logos/warner-bros.svg" },
  { name: "HoYoverse", logoLight: "/logos/HoYoverse_Logo.svg.png" },
] as const;
