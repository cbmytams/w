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
    AGENCY_NAVIGATION
} from "./agency-blocks"

// Talent blocks (still used by existing section components)
export {
    TALENT_TIMELINE,
    TALENT_METHOD,
    TALENT_SERVICES,
    TALENT_PLATFORMS
} from "./talent-blocks"

// Brand additions (only AUTHENTICITY_CARDS and BRAND_HERO_CONTENT still consumed)
export {
    AUTHENTICITY_CARDS,
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
