type PlatformEnv = {
  databaseUrl: string;
  adminSessionSecret: string;
  appUrl: string;
  allowedOrigins: string;
  defaultTenantSlug: string;
  exposeResetTokens: boolean;
  contactIntakeToken?: string;
  contactTeamEmail: string;
  internalJobToken?: string;
  resendApiKey?: string;
  resendFromEmail: string;
  resendWebhookSecret?: string;
  otelEndpoint?: string;
  otelHeaders?: string;
};

const GLOBAL_KEY = "__wafiaPlatformEnv";

function readRaw(name: string) {
  const value = process.env[name];
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function required(name: string) {
  const value = readRaw(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string) {
  return readRaw(name);
}

function booleanFlag(name: string, fallback = false) {
  const value = readRaw(name);
  if (!value) return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function requiredOneOf(names: string[]) {
  for (const name of names) {
    const value = readRaw(name);
    if (value) return value;
  }

  throw new Error(
    `Missing required environment variable: ${names.join(" or ")}`
  );
}

export function getPlatformEnv(): PlatformEnv {
  const globalState = globalThis as typeof globalThis & {
    [GLOBAL_KEY]?: PlatformEnv;
  };

  if (globalState[GLOBAL_KEY]) return globalState[GLOBAL_KEY];

  const adminSessionSecret = required("ADMIN_SESSION_SECRET");
  if (adminSessionSecret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters");
  }

  const env: PlatformEnv = {
    databaseUrl: required("DATABASE_URL"),
    adminSessionSecret,
    appUrl: requiredOneOf(["APP_URL", "NEXT_PUBLIC_APP_URL"]),
    allowedOrigins: optional("ALLOWED_ORIGINS") || "",
    defaultTenantSlug: optional("DEFAULT_TENANT_SLUG") || "wafia",
    exposeResetTokens: booleanFlag("EXPOSE_RESET_TOKENS", false),
    contactIntakeToken: optional("CONTACT_INTAKE_TOKEN"),
    contactTeamEmail: optional("CONTACT_TEAM_EMAIL") || "contact@wafia.fr",
    internalJobToken: optional("INTERNAL_JOB_TOKEN"),
    resendApiKey: optional("RESEND_API_KEY"),
    resendFromEmail: optional("RESEND_FROM_EMAIL") || "onboarding@resend.dev",
    resendWebhookSecret: optional("RESEND_WEBHOOK_SECRET"),
    otelEndpoint: optional("OTEL_EXPORTER_OTLP_ENDPOINT"),
    otelHeaders: optional("OTEL_EXPORTER_OTLP_HEADERS"),
  };

  globalState[GLOBAL_KEY] = env;
  return env;
}
