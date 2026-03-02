import { NodeSDK } from "@opentelemetry/sdk-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { UndiciInstrumentation } from "@opentelemetry/instrumentation-undici";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_NAMESPACE, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";
import { getWebsiteEnv } from "@/lib/env.server";

const GLOBAL_KEY = "__wafiaWebsiteOtel";

function parseHeaders(raw: string | undefined) {
  if (!raw?.trim()) return undefined;

  return raw.split(",").reduce<Record<string, string>>((acc, entry) => {
    const [key, value] = entry.split("=");
    const normalizedKey = key?.trim();
    const normalizedValue = value?.trim();
    if (normalizedKey && normalizedValue) {
      acc[normalizedKey] = normalizedValue;
    }
    return acc;
  }, {});
}

function withDefaultPath(endpoint: string, path: string) {
  if (endpoint.endsWith("/")) {
    return `${endpoint.slice(0, -1)}${path}`;
  }
  return `${endpoint}${path}`;
}

export async function registerWebsiteOtel() {
  const env = getWebsiteEnv();
  const endpoint = env.otelEndpoint;
  if (!endpoint) return;

  const globalState = globalThis as typeof globalThis & {
    [GLOBAL_KEY]?: NodeSDK;
  };
  if (globalState[GLOBAL_KEY]) return;

  const headers = parseHeaders(env.otelHeaders);
  const traceExporter = new OTLPTraceExporter({
    url: withDefaultPath(endpoint, "/v1/traces"),
    headers
  });
  const metricExporter = new OTLPMetricExporter({
    url: withDefaultPath(endpoint, "/v1/metrics"),
    headers
  });

  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: "wafia-website",
      [ATTR_SERVICE_NAMESPACE]: "wafia",
      [ATTR_SERVICE_VERSION]: "1.0.0"
    }),
    traceExporter,
    metricReader: new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 60000
    }),
    instrumentations: [new HttpInstrumentation(), new UndiciInstrumentation()]
  });

  await sdk.start();
  globalState[GLOBAL_KEY] = sdk;
}
