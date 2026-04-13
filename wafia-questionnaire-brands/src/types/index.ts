/**
 * WAFIA BRAND DIAGNOSTIC - TYPE DEFINITIONS
 * Types TypeScript pour le questionnaire marques
 */

// ============================================
// PILIERS D'ANALYSE BRAND
// ============================================

/**
 * Les 5 axes d'analyse de maturité marketing marque
 */
export type BrandPillarKey =
  | "STRATEGY"
  | "CONTENT"
  | "ACTIVATION"
  | "DATA"
  | "ORGANIZATION";

/**
 * Configuration d'un pilier
 */
export interface Pillar {
  key: BrandPillarKey;
  label: string;
  description: string;
  icon: string;
  color: string;
}

// Alias for backward compat with shared components
export type PillarKey = BrandPillarKey;

// ============================================
// TYPES DE QUESTIONS
// ============================================

/**
 * Types de questions supportées
 * - single: choix unique
 * - multiple: choix multiples
 * - scale: échelle 1-10
 * - text: texte libre
 * - email: champ email
 * - tel: champ téléphone
 * - url: champ URL
 * - dropdown: sélection dans un menu déroulant
 */
export type QuestionType =
  | "single"
  | "multiple"
  | "scale"
  | "text"
  | "email"
  | "tel"
  | "url"
  | "dropdown";

// ============================================
// CONDITIONS & LOGIQUE
// ============================================

export type ConditionOperator =
  | "equals"
  | "not_equals"
  | "one_of"
  | "contains"
  | "greater_than"
  | "less_than";

export interface Condition {
  questionId: string;
  operator: ConditionOperator;
  value: string | string[] | number;
}

// ============================================
// IMPACTS & SCORING
// ============================================

export interface Impact {
  pillar: BrandPillarKey;
  weight: number;
}

// ============================================
// OPTIONS DE RÉPONSE
// ============================================

export interface Option {
  id: string;
  label: string;
  description?: string;
  emoji?: string;
  impacts: Impact[];
  followUp?: string;
}

// ============================================
// QUESTIONS
// ============================================

/**
 * Section logique du questionnaire brand (A-I)
 */
export type BrandSection =
  | "QUICK_LEAD"
  | "IDENTIFICATION"
  | "NORTH_STAR"
  | "MATURITY"
  | "NEEDS_AWARENESS"
  | "NEEDS_TRAFFIC"
  | "NEEDS_CONVERSION"
  | "NEEDS_RETENTION"
  | "SERVICES"
  | "BUDGET"
  | "COMPETITIVE"
  | "ORGANIZATION"
  | "ADDITIONAL";

export interface Question {
  id: string;
  category: BrandSection;
  type: QuestionType;
  question: string;
  subtitle?: string;
  conditions?: Condition[];
  options?: Option[];
  min?: number;
  max?: number;
  labels?: {
    min: string;
    max: string;
  };
  placeholder?: string;
  required?: boolean;
  /** For dropdown type: array of selectable values */
  dropdownOptions?: string[];
  /** Validation pattern for text-like inputs */
  validation?: "email" | "phone" | "url";
}

// ============================================
// NORTH STAR
// ============================================

export type NorthStarObjective =
  | "awareness"
  | "traffic"
  | "conversion"
  | "retention"
  | "unknown";

// ============================================
// ÉTAT DU DIAGNOSTIC
// ============================================

export type DiagnosticPhase =
  | "landing"
  | "quick_lead"
  | "deep_qualification"
  | "results"
  | "contact"
  | "admin";

export type AnswerValue = string | string[] | number;
export type Answers = Record<string, AnswerValue>;

export type Scores = Record<BrandPillarKey, number>;

export interface CalibrationData {
  northStar: NorthStarObjective | null;
  companyName: string | null;
  contactName: string | null;
  contactEmail: string | null;
  budget: string | null;
  urgency: string | null;
}

export interface DiagnosticState {
  phase: DiagnosticPhase;
  currentQuestionIndex: number;
  calibration: CalibrationData;
  answers: Answers;
  scores: Scores;
  interstitial?: {
    prevCategory: string;
    nextCategory: BrandSection;
  };
}

// ============================================
// LEAD SCORING
// ============================================

export type LeadTier = "hot" | "warm" | "cool" | "cold";

export interface LeadScoreBreakdown {
  budget: number;
  urgency: number;
  maturity: number;
  fit: number;
  decision: number;
}

export interface LeadScore {
  total: number;
  breakdown: LeadScoreBreakdown;
  tier: LeadTier;
}

// ============================================
// RÉSULTATS BRAND
// ============================================

export interface ServiceRecommendation {
  id: string;
  label: string;
  description: string;
  included: boolean;
  reason?: string;
}

export type PackageTier = "starter" | "growth" | "scale" | "enterprise";

export interface PackageSuggestion {
  tier: PackageTier;
  label: string;
  summary: string;
  priceRange: string;
  features: string[];
  duration: string;
  objective: string;
}

export interface BrandDiagnosticResult {
  scores: Scores;
  leadScore: LeadScore;
  northStar: NorthStarObjective;
  industry: string;
  companySize: string;
  services: ServiceRecommendation[];
  package: PackageSuggestion;
  overallScore: number;
  level: "debutant" | "intermediaire" | "avance" | "expert";
  recommendations: string[];
}

// Alias for compat
export type DiagnosticResult = BrandDiagnosticResult;

export interface RadarDataPoint {
  pillar: string;
  score: number;
  fullMark: number;
}

// ============================================
// ADVICE (simplified for brand)
// ============================================

export type AdviceKind = "priority" | "quick_win" | "strength";
export type AdviceSeverity = "low" | "medium" | "high";

export interface AdviceEvidence {
  questionId: string;
  question: string;
  answer: string;
}

export interface AdviceItem {
  id: string;
  pillar: BrandPillarKey;
  title: string;
  body: string;
  why?: string;
  impactPotential: number;
  kind: AdviceKind;
  severity: AdviceSeverity;
  evidence: AdviceEvidence;
}

export interface AdviceBundle {
  priority: AdviceItem[];
  quickWins: AdviceItem[];
  strengths: AdviceItem[];
}

// ============================================
// ADMIN (kept for interface compat)
// ============================================

export interface Lead {
  id: string;
  session_id?: string;
  name: string;
  email: string;
  phone?: string;
  emailMasked?: string;
  phoneMasked?: string;
  score: number;
  level: string;
  date: string;
  status: "new" | "contacted" | "signed" | "archived" | "qualified";
  priority?: "P1" | "P2" | "P3";
  slaState?: "ON_TIME" | "AT_RISK" | "LATE";
  ownerId?: string;
  answers?: Record<string, unknown>;
}

export type Role = "ADMIN" | "MANAGER" | "VIEWER";
export type DashboardSource = "questionnaire" | "manual" | "import";

export interface DashboardFilters {
  from: string;
  to: string;
  source?: DashboardSource;
  segment?: string;
  owner?: string;
  status?: string;
}

export interface KpiCard {
  id: string;
  label: string;
  value: number;
  unit?: "%" | "h" | "count";
  delta: number;
  period: { from: string; to: string };
  definition: string;
  sourceQueryId: string;
  updatedAt: string;
}

export interface TrendPoint {
  date: string;
  value: number;
}

export interface FunnelStep {
  key: string;
  label: string;
  value: number;
  dropOffFromPrevious: number;
}

export interface LeadRecord {
  id: string;
  name: string;
  emailMasked: string;
  phoneMasked: string;
  email?: string;
  phone?: string;
  status:
    | "NEW"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "QUALIFIED"
    | "INTERVIEW"
    | "REJECTED"
    | "ARCHIVED";
  priority: "P1" | "P2" | "P3";
  slaState: "ON_TIME" | "AT_RISK" | "LATE";
  ownerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadListPage {
  items: LeadRecord[];
  nextCursor: string | null;
}

export interface AuditEvent {
  id: string;
  actorId: string;
  actorRole: Role;
  action: string;
  entity: string;
  entityId: string;
  createdAt: string;
  diffJson?: unknown;
}

export interface AdminSessionUser {
  username: string;
  role: Role;
  tenantSlug?: string;
}
