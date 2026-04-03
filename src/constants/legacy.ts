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

// Brand additions (BRAND_HERO_CONTENT still consumed by BrandHeroV2)
export { BRAND_HERO_CONTENT } from "./brand-additions"

// Navigation
export { MAIN_NAVIGATION } from "./navigation"

// Talent Journey (used by TalentJourneySection)
export {
    TALENT_JOURNEY_HEADER,
    TALENT_JOURNEY_PHASES,
} from "./talent-journey-steps"
