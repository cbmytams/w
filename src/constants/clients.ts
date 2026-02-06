/**
 * Liste des clients/marques affichés sur le site
 * Logos officiels à déposer dans /public/logos/ (light + dark si nécessaire)
 */

export interface Client {
    name: string
    logoLight: string // Chemin vers le logo clair (relatif à /public)
    logoDark?: string // Chemin vers le logo sombre (relatif à /public)
    logoClass?: string // Ajustement optique optionnel
}

export const CLIENTS: Client[] = [
    { name: "Basic Fit", logoLight: "/logos/official/basic-fit-light.png", logoDark: "/logos/official/basic-fit-dark.png" },
    { name: "BYD", logoLight: "/logos/byd.svg" },
    { name: "CJ Group", logoLight: "/logos/cj-group.svg" },
    { name: "Wandernana", logoLight: "/logos/wandernana.svg" },
    { name: "AirUp", logoLight: "/logos/airup.svg" },
    { name: "Citroën", logoLight: "/logos/citroen.svg" },
    { name: "Alipay", logoLight: "/logos/alipay.svg" },
    { name: "Alibaba", logoLight: "/logos/alibaba.svg" },
    { name: "Hostinger", logoLight: "/logos/hostinger.svg" },
    { name: "Odoo", logoLight: "/logos/official/odoo-light.svg", logoDark: "/logos/official/odoo-dark.svg" },
    { name: "HoYoverse", logoLight: "/logos/hoyoverse.svg" }
] as const

// Statistiques affichées dans le hero
export const HERO_STATS = [
    { icon: "📊", stat: "15+", label: "Marques accompagnées" },
    { icon: "🎬", stat: "200+", label: "Contenus produits" },
    { icon: "⚡", stat: "98%", label: "Taux de satisfaction" }
] as const
