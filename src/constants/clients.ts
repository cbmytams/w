/**
 * Liste des clients/marques affichés sur le site
 * Les logos sont des SVG optimisés dans /public/logos/
 */

export interface Client {
    name: string
    logo: string  // Chemin vers le logo (relatif à /public)
    width: string // Largeur Tailwind pour le conteneur
}

export const CLIENTS: Client[] = [
    { name: "Basic Fit", logo: "/logos/basic-fit.svg", width: "w-32" },
    { name: "BYD", logo: "/logos/byd.svg", width: "w-20" },
    { name: "CJ Group", logo: "/logos/cj-group.svg", width: "w-28" },
    { name: "Wandernana", logo: "/logos/wandernana.svg", width: "w-36" },
    { name: "AirUp", logo: "/logos/airup.svg", width: "w-28" },
    { name: "Citroën", logo: "/logos/citroen.svg", width: "w-28" },
    { name: "Alipay", logo: "/logos/alipay.svg", width: "w-24" },
    { name: "Alibaba", logo: "/logos/alibaba.svg", width: "w-28" },
    { name: "Hostinger", logo: "/logos/hostinger.svg", width: "w-32" },
    { name: "Odoo", logo: "/logos/odoo.svg", width: "w-24" },
    { name: "HoYoverse", logo: "/logos/hoyoverse.svg", width: "w-32" }
] as const

// Statistiques affichées dans le hero
export const HERO_STATS = [
    { icon: "📊", stat: "15+", label: "Marques accompagnées" },
    { icon: "🎬", stat: "200+", label: "Contenus produits" },
    { icon: "⚡", stat: "98%", label: "Taux de satisfaction" }
] as const
