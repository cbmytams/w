import { context, metrics, trace, SpanStatusCode } from "@opentelemetry/api";

type TelemetryAttributes = Record<string, string | number | boolean | undefined>;

const tracer = trace.getTracer("wafia-website");
const meter = metrics.getMeter("wafia-website");
const contactsCounter = meter.createCounter("contacts.intake.count");

function compactAttributes(attributes?: TelemetryAttributes) {
  if (!attributes) return undefined;
  return Object.fromEntries(
    Object.entries(attributes).filter(([, value]) => value !== undefined)
  );
}

export async function withSpan<T>(
  name: string,
  attributes: TelemetryAttributes | undefined,
  fn: () => Promise<T>
): Promise<T> {
  return tracer.startActiveSpan(name, { attributes: compactAttributes(attributes) }, async (span) => {
    try {
      const result = await fn();
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw error;
    } finally {
      span.end();
    }
  });
}

export function incrementWebsiteContactCounter(attributes?: TelemetryAttributes) {
  contactsCounter.add(1, compactAttributes(attributes));
}

export function logWithTrace(message: string, fields: Record<string, unknown> = {}) {
  const activeSpan = trace.getSpan(context.active());
  const spanContext = activeSpan?.spanContext();
  console.log(
    JSON.stringify({
      message,
      traceId: spanContext?.traceId || null,
      spanId: spanContext?.spanId || null,
      ...fields
    })
  );
}
