type LogLevel = "info" | "warn" | "error";

type LogPayload = {
  message: string;
  context?: Record<string, unknown>;
  error?: unknown;
};

function serializeError(error: unknown) {
  if (!error) return null;
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return { value: String(error) };
}

function emit(level: LogLevel, payload: LogPayload) {
  const body = {
    ts: new Date().toISOString(),
    level,
    message: payload.message,
    context: payload.context || {},
    error: serializeError(payload.error),
  };

  const line = JSON.stringify(body);
  if (level === "error") {
    console.error(line);
    return;
  }
  if (level === "warn") {
    console.warn(line);
    return;
  }
  console.warn(line);
}

export function logInfo(message: string, context?: Record<string, unknown>) {
  emit("info", { message, context });
}

export function logWarn(message: string, context?: Record<string, unknown>) {
  emit("warn", { message, context });
}

export function logError(
  message: string,
  error: unknown,
  context?: Record<string, unknown>
) {
  emit("error", { message, error, context });
}
