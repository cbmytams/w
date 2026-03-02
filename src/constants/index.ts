/**
 * Constants barrel export
 * Surface publique minimale: exporte uniquement ce qui est
 * consommé par le code tracké via "@/constants".
 *
 * Les anciens exports restent disponibles dans "@/constants/legacy".
 */

// FAQ
export { FAQ_ITEMS } from "./faq"

// Agency blocks
export {
    AGENCY_MODES,
    AGENCY_STANDARDS,
    AGENCY_HERO,
    AGENCY_PROBLEM,
    AGENCY_CASES,
    AGENCY_CTA
} from "./agency-blocks"

// Talent blocks
export {
    TALENT_NAVIGATION,
    TALENT_PERSONA,
    TALENT_FAQ,
    TALENT_HERO,
    TALENT_PROBLEM,
    TALENT_DELIVERABLES,
    TALENT_FOR_WHO,
    TALENT_CTA,
    BRAND_GRADIENT
} from "./talent-blocks"

// Brand additions
export { BRAND_NAVIGATION } from "./brand-additions"

// Home
export { HOME_OPTIONS } from "./home-blocks"

// Restore legacy for broken components
export * from "./legacy"
