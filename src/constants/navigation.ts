import type { NavItem } from "@/types"
import { Instagram, Linkedin, Music, type LucideIcon } from "lucide-react"

/**
 * Navigation principale du site
 * Utilisée dans le Header et Footer
 */
export const MAIN_NAVIGATION: NavItem[] = [
    { name: "Services", href: "/services" },
    { name: "Réalisations", href: "/for-brands#case-studies" },
]

/**
 * Navigation footer (liens légaux)
 */
export const FOOTER_NAVIGATION: NavItem[] = [
    { name: "Mentions légales", href: "/legal/mentions" },
    { name: "Politique de confidentialité", href: "/legal/privacy" },
    { name: "Cookies", href: "/legal/cookies" },
]

/**
 * Liens réseaux sociaux
 */
export interface SocialLink {
    name: string
    href: string
    icon: LucideIcon
}

export const SOCIAL_LINKS: SocialLink[] = [
    { name: "Instagram", href: "https://www.instagram.com/wafia.agency", icon: Instagram },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/wafia-agency", icon: Linkedin },
    { name: "TikTok", href: "https://www.tiktok.com/@wafia.agency", icon: Music },
]
