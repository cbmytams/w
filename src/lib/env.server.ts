type WebsiteEnv = {
  nextPublicSiteUrl: string;
  nextPublicGaId?: string;
  platformPublicUrl?: string;
  platformContactIntakeUrl?: string;
  contactWebhookUrl?: string;
  contactIntakeToken?: string;
  otelEndpoint?: string;
  otelHeaders?: string;
};

const GLOBAL_KEY = "__wafiaWebsiteEnv";
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function readRaw(name: string) {
  const value = process.env[name];
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function optional(name: string) {
  return readRaw(name);
}

function isLocalOrigin(value: string | undefined) {
  if (!value) return false;

  try {
    return LOOPBACK_HOSTS.has(new URL(value).hostname);
  } catch {
    return false;
  }
}

export function getWebsiteEnv(): WebsiteEnv {
  const globalState = globalThis as typeof globalThis & {
    [GLOBAL_KEY]?: WebsiteEnv;
  };

  if (globalState[GLOBAL_KEY]) return globalState[GLOBAL_KEY];

  const rawSiteUrl = optional("NEXT_PUBLIC_SITE_URL");
  const nextPublicSiteUrl =
    process.env.NODE_ENV === "production"
      ? rawSiteUrl &&
        rawSiteUrl !== "http://localhost:3000" &&
        !isLocalOrigin(rawSiteUrl)
        ? rawSiteUrl
        : "https://wafia.fr"
      : rawSiteUrl || "http://localhost:3000";

  const env: WebsiteEnv = {
    nextPublicSiteUrl,
    nextPublicGaId: optional("NEXT_PUBLIC_GA_ID"),
    platformPublicUrl: optional("PLATFORM_PUBLIC_URL"),
    platformContactIntakeUrl: optional("PLATFORM_CONTACT_INTAKE_URL"),
    contactWebhookUrl: optional("CONTACT_WEBHOOK_URL"),
    contactIntakeToken: optional("CONTACT_INTAKE_TOKEN"),
    otelEndpoint: optional("OTEL_EXPORTER_OTLP_ENDPOINT"),
    otelHeaders: optional("OTEL_EXPORTER_OTLP_HEADERS"),
  };

  globalState[GLOBAL_KEY] = env;
  return env;
}

export function getWebsiteContactIntakeUrl() {
  const env = getWebsiteEnv();
  const intakeUrl = env.platformContactIntakeUrl || env.contactWebhookUrl;
  if (!intakeUrl) {
    throw new Error(
      "Missing required environment variable: PLATFORM_CONTACT_INTAKE_URL or CONTACT_WEBHOOK_URL"
    );
  }
  return intakeUrl;
}
