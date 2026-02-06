/**
 * Constants barrel export
 * Import simplifié: import { CLIENTS, FAQ_ITEMS } from "@/constants"
 */

// Clients & Stats
export { CLIENTS, HERO_STATS } from "./clients"

// FAQ
export { FAQ_ITEMS } from "./faq"

// Features (dashboard, deliverables, tabs, mock data)
export {
    DASHBOARD_FEATURES,
    DELIVERABLE_ASSETS,
    DASHBOARD_TABS,
    MOCK_CREATORS,
    MOCK_CAMPAIGN_HISTORY
} from "./features"
export type { DashboardTabId } from "./features"

// Process steps
export { PROCESS_STEPS } from "./process-steps"

// Agency blocks
export {
    AGENCY_MODES,
    AGENCY_STANDARDS,
    AGENCY_KIT,
    AGENCY_NAVIGATION,
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
    // New exports for redesign
    TALENT_PROBLEM,
    TALENT_DELIVERABLES,
    TALENT_SERVICES,
    TALENT_METHOD,
    TALENT_TIMELINE,
    TALENT_FOR_WHO,
    TALENT_CTA,
    // Gradient
    BRAND_GRADIENT
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
    BRAND_NAVIGATION,
    BRAND_HERO_CONTENT
} from "./brand-additions"

// Navigation
export { MAIN_NAVIGATION, FOOTER_NAVIGATION, SOCIAL_LINKS } from "./navigation"
export type { SocialLink } from "./navigation"

// Home
export { HOME_OPTIONS } from "./home-blocks"

// Deliverables Widgets (Wafia OS section)
export { WIDGETS } from "./deliverables-widgets"
export type { WidgetId, WidgetData } from "./deliverables-widgets"
