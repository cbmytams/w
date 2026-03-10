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
    TALENT_BUSINESS,
    TALENT_IDENTITY,
    BRAND_GRADIENT
} from "./talent-blocks"

// Brand additions
export { BRAND_NAVIGATION } from "./brand-additions"

// Home
export { HOME_OPTIONS } from "./home-blocks"

// Restore legacy for broken components
export {
    CLIENTS,
    PROCESS_STEPS,
    AGENCY_KIT,
    AGENCY_NAVIGATION,
    TALENT_TIMELINE,
    TALENT_METHOD,
    TALENT_SERVICES,
    TALENT_PLATFORMS,
    TALENT_PROOF_STRIP,
    TALENT_OS_SYSTEM,
    AUTHENTICITY_CARDS,
    BRAND_HERO_CONTENT,
    MAIN_NAVIGATION,
    FOOTER_NAVIGATION,
    SOCIAL_LINKS,
    WIDGETS,
    TALENT_JOURNEY_HEADER,
    TALENT_JOURNEY_PHASES,
    TALENT_JOURNEY_STEPS,
    getStepsByPhase,
    getPhaseConfig
} from "./legacy"

export type {
    SocialLink,
    WidgetId,
    WidgetData,
    JourneyPhase,
    JourneyStep,
    PhaseConfig
} from "./legacy"
