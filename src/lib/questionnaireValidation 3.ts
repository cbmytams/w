const BRAND_SECTIONS = new Set([
  "QUICK_LEAD",
  "IDENTIFICATION",
  "NORTH_STAR",
  "MATURITY",
  "NEEDS_AWARENESS",
  "NEEDS_TRAFFIC",
  "NEEDS_CONVERSION",
  "NEEDS_RETENTION",
  "SERVICES",
  "BUDGET",
  "COMPETITIVE",
  "ORGANIZATION",
  "ADDITIONAL"
]);

const QUESTION_TYPES = new Set([
  "single",
  "multiple",
  "scale",
  "text",
  "email",
  "tel",
  "url",
  "dropdown"
]);

const CONDITION_OPERATORS = new Set([
  "equals",
  "not_equals",
  "one_of",
  "contains",
  "greater_than",
  "less_than"
]);

const PILLAR_KEYS = new Set([
  "STRATEGY",
  "CONTENT",
  "ACTIVATION",
  "DATA",
  "ORGANIZATION"
]);

const VALIDATION_TYPES = new Set(["email", "phone", "url"]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toSafeString(value: unknown, maxLength = 500) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

function toOptionalString(value: unknown, maxLength = 500) {
  if (value === undefined) return undefined;
  const next = toSafeString(value, maxLength);
  return next ?? null;
}

function sanitizeCondition(value: unknown) {
  if (!isPlainObject(value)) return null;

  const questionId = toSafeString(value.questionId, 120);
  const operator =
    typeof value.operator === "string" && CONDITION_OPERATORS.has(value.operator)
      ? value.operator
      : null;
  const raw = value.value;
  const allowedValue =
    typeof raw === "string" ||
    typeof raw === "number" ||
    (Array.isArray(raw) && raw.every((entry) => typeof entry === "string"));

  if (!questionId || !operator || !allowedValue) return null;
  return { questionId, operator, value: raw };
}

function sanitizeImpact(value: unknown) {
  if (!isPlainObject(value)) return null;
  const pillar =
    typeof value.pillar === "string" && PILLAR_KEYS.has(value.pillar) ? value.pillar : null;
  const weight = typeof value.weight === "number" && Number.isFinite(value.weight) ? value.weight : null;
  if (!pillar || weight === null) return null;
  return { pillar, weight };
}

function sanitizeOption(value: unknown) {
  if (!isPlainObject(value)) return null;
  const id = toSafeString(value.id, 120);
  const label = toSafeString(value.label, 240);
  if (!id || !label) return null;

  const impacts = Array.isArray(value.impacts)
    ? value.impacts.map(sanitizeImpact).filter(Boolean)
    : [];

  const description = toOptionalString(value.description, 500);
  const emoji = toOptionalString(value.emoji, 24);
  const followUp = toOptionalString(value.followUp, 240);

  return {
    id,
    label,
    impacts,
    ...(description ? { description } : {}),
    ...(emoji ? { emoji } : {}),
    ...(followUp ? { followUp } : {})
  };
}

export function isSafeRecordId(value: unknown) {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{6,128}$/.test(value);
}

export function sanitizeQuestion(value: unknown) {
  if (!isPlainObject(value)) return null;

  const id = toSafeString(value.id, 120);
  const category =
    typeof value.category === "string" && BRAND_SECTIONS.has(value.category) ? value.category : null;
  const type = typeof value.type === "string" && QUESTION_TYPES.has(value.type) ? value.type : null;
  const question = toSafeString(value.question, 500);

  if (!id || !category || !type || !question) return null;

  const subtitle = toOptionalString(value.subtitle, 500);
  const placeholder = toOptionalString(value.placeholder, 500);
  const validation =
    typeof value.validation === "string" && VALIDATION_TYPES.has(value.validation)
      ? value.validation
      : undefined;

  const min =
    value.min === undefined
      ? undefined
      : typeof value.min === "number" && Number.isFinite(value.min)
        ? value.min
        : null;
  const max =
    value.max === undefined
      ? undefined
      : typeof value.max === "number" && Number.isFinite(value.max)
        ? value.max
        : null;
  if (min === null || max === null) return null;

  const required =
    value.required === undefined ? undefined : typeof value.required === "boolean" ? value.required : null;
  if (required === null) return null;

  const orderIndex =
    value.order_index === undefined
      ? undefined
      : Number.isInteger(value.order_index)
        ? (value.order_index as number)
        : null;
  if (orderIndex === null) return null;

  const labels = value.labels;
  const safeLabels = isPlainObject(labels)
    ? {
        min: toSafeString(labels.min, 120),
        max: toSafeString(labels.max, 120)
      }
    : undefined;
  if (safeLabels && (!safeLabels.min || !safeLabels.max)) return null;

  const dropdownOptions = value.dropdownOptions;
  const safeDropdownOptions = Array.isArray(dropdownOptions)
    ? dropdownOptions
        .map((entry) => toSafeString(entry, 120))
        .filter((entry): entry is string => Boolean(entry))
    : undefined;
  if (Array.isArray(dropdownOptions) && safeDropdownOptions?.length !== dropdownOptions.length) return null;

  const conditions = value.conditions;
  const safeConditions = Array.isArray(conditions)
    ? conditions.map(sanitizeCondition).filter(Boolean)
    : undefined;
  if (Array.isArray(conditions) && safeConditions?.length !== conditions.length) return null;

  const options = value.options;
  const safeOptions = Array.isArray(options) ? options.map(sanitizeOption).filter(Boolean) : undefined;
  if (Array.isArray(options) && safeOptions?.length !== options.length) return null;

  return {
    id,
    category,
    type,
    question,
    ...(subtitle ? { subtitle } : {}),
    ...(safeConditions ? { conditions: safeConditions } : {}),
    ...(safeOptions ? { options: safeOptions } : {}),
    ...(min !== undefined ? { min } : {}),
    ...(max !== undefined ? { max } : {}),
    ...(safeLabels ? { labels: safeLabels } : {}),
    ...(placeholder ? { placeholder } : {}),
    ...(required !== undefined ? { required } : {}),
    ...(safeDropdownOptions ? { dropdownOptions: safeDropdownOptions } : {}),
    ...(validation ? { validation } : {}),
    ...(orderIndex !== undefined ? { order_index: orderIndex } : {})
  };
}

const ALLOWED_UPDATE_KEYS = new Set([
  "category",
  "type",
  "question",
  "subtitle",
  "conditions",
  "options",
  "min",
  "max",
  "labels",
  "placeholder",
  "required",
  "dropdownOptions",
  "validation",
  "order_index"
]);

export function sanitizeQuestionUpdates(value: unknown) {
  if (!isPlainObject(value)) return null;
  const keys = Object.keys(value);
  if (keys.length === 0) return null;
  if (keys.some((key) => !ALLOWED_UPDATE_KEYS.has(key))) return null;

  const updates: Record<string, unknown> = {};

  for (const key of keys) {
    const raw = value[key];

    switch (key) {
      case "category":
        if (typeof raw !== "string" || !BRAND_SECTIONS.has(raw)) return null;
        updates.category = raw;
        break;
      case "type":
        if (typeof raw !== "string" || !QUESTION_TYPES.has(raw)) return null;
        updates.type = raw;
        break;
      case "question": {
        const safe = toSafeString(raw, 500);
        if (!safe) return null;
        updates.question = safe;
        break;
      }
      case "subtitle": {
        const safe = toOptionalString(raw, 500);
        if (safe === null) return null;
        updates.subtitle = safe;
        break;
      }
      case "conditions": {
        if (!Array.isArray(raw)) return null;
        const safe = raw.map(sanitizeCondition).filter(Boolean);
        if (safe.length !== raw.length) return null;
        updates.conditions = safe;
        break;
      }
      case "options": {
        if (!Array.isArray(raw)) return null;
        const safe = raw.map(sanitizeOption).filter(Boolean);
        if (safe.length !== raw.length) return null;
        updates.options = safe;
        break;
      }
      case "min":
      case "max":
        if (typeof raw !== "number" || !Number.isFinite(raw)) return null;
        updates[key] = raw;
        break;
      case "labels": {
        if (!isPlainObject(raw)) return null;
        const min = toSafeString(raw.min, 120);
        const max = toSafeString(raw.max, 120);
        if (!min || !max) return null;
        updates.labels = { min, max };
        break;
      }
      case "placeholder": {
        const safe = toOptionalString(raw, 500);
        if (safe === null) return null;
        updates.placeholder = safe;
        break;
      }
      case "required":
        if (typeof raw !== "boolean") return null;
        updates.required = raw;
        break;
      case "dropdownOptions": {
        if (!Array.isArray(raw)) return null;
        const safe = raw
          .map((entry) => toSafeString(entry, 120))
          .filter((entry): entry is string => Boolean(entry));
        if (safe.length !== raw.length) return null;
        updates.dropdownOptions = safe;
        break;
      }
      case "validation":
        if (typeof raw !== "string" || !VALIDATION_TYPES.has(raw)) return null;
        updates.validation = raw;
        break;
      case "order_index":
        if (!Number.isInteger(raw)) return null;
        updates.order_index = raw;
        break;
      default:
        return null;
    }
  }

  return updates;
}

export function sanitizeQuestionList(value: unknown) {
  if (!Array.isArray(value)) return null;
  if (value.length > 300) return null;

  const safe = value.map(sanitizeQuestion).filter(Boolean);
  if (safe.length !== value.length) return null;
  return safe;
}
