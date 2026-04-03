/**
 * Constants barrel export
 * Surface publique minimale: exporte uniquement ce qui est
 * consommé par le code tracké via "@/constants".
 *
 * Les anciens exports restent disponibles dans "@/constants/legacy".
 */

// FAQ
export { FAQ_ITEMS } from "./faq"

// Talent blocks
export {
    TALENT_NAVIGATION,
    TALENT_FAQ,
    TALENT_HERO,
    TALENT_PROBLEM,
    TALENT_FOR_WHO,
    TALENT_CTA,
    BRAND_GRADIENT
} from "./talent-blocks"

// Brand additions
export { BRAND_NAVIGATION } from "./brand-additions"

// Home
export { HOME_OPTIONS } from "./home-blocks"

// Legacy re-exports (still consumed by components)
export {
    CLIENTS,
    PROCESS_STEPS,
    BRAND_HERO_CONTENT,
    MAIN_NAVIGATION,
    TALENT_JOURNEY_HEADER,
    TALENT_JOURNEY_PHASES,
} from "./legacy"
