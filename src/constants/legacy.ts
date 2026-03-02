/**
 * Legacy constants barrel.
 *
 * Ces exports ont été retirés de "@/constants" pour réduire la surface
 * publique. Les conserver ici permet une migration progressive.
 */

// Clients & Stats
export { CLIENTS } from "./clients"

// Process steps
export { PROCESS_STEPS } from "./process-steps"

// Agency blocks
export {
    AGENCY_KIT,
    AGENCY_NAVIGATION
} from "./agency-blocks"

// Talent blocks
export {
    TALENT_BUSINESS,
    TALENT_IDENTITY,
    TALENT_TIMELINE,
    TALENT_METHOD,
    TALENT_SERVICES,
    TALENT_PLATFORMS,
    TALENT_PROOF_STRIP,
    TALENT_OS_SYSTEM
} from "./talent-blocks"

// Brand additions
export {
    CASTING_VALIDATION,
    TIMING_HERO,
    TIMING_STEP,
    AUTHENTICITY,
    KPIS_FEATURE,
    SOURCING_PROBLEM,
    FIRST_CAMPAIGN_STEP,
    FIRST_CAMPAIGN_FAQ,
    BRAND_HERO_CONTENT
} from "./brand-additions"

// Navigation
export { MAIN_NAVIGATION, FOOTER_NAVIGATION, SOCIAL_LINKS } from "./navigation"
export type { SocialLink } from "./navigation"

// Deliverables Widgets (Wafia OS section)
export { WIDGETS } from "./deliverables-widgets"
export type { WidgetId, WidgetData } from "./deliverables-widgets"

// Talent Journey (3-year process)
export {
    TALENT_JOURNEY_HEADER,
    TALENT_JOURNEY_PHASES,
    TALENT_JOURNEY_STEPS,
    getStepsByPhase,
    getPhaseConfig
} from "./talent-journey-steps"
export type { JourneyPhase, JourneyStep, PhaseConfig } from "./talent-journey-steps"
