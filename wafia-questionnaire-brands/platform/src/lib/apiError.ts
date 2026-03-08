import type { ApiErrorCode, ApiErrorDto } from "@/lib/contracts/types";

type ErrorOptions = {
  status: number;
  headers?: HeadersInit;
};

export function jsonApiError(
  code: ApiErrorCode,
  error: string,
  options: ErrorOptions
) {
  const body: ApiErrorDto = { code, error };
  return Response.json(body, {
    status: options.status,
    headers: options.headers
  });
}

function readUnknownErrorMessage(input: unknown) {
  return input instanceof Error ? input.message : String(input || "");
}

export function isServiceUnavailableError(input: unknown) {
  const message = readUnknownErrorMessage(input);
  return /prisma|p1001|can't reach database|econnrefused|socket|timeout/i.test(message);
}

export function toSafeApiErrorResponse(
  input: unknown,
  fallback = "Unexpected server error",
  headers?: HeadersInit
) {
  if (isServiceUnavailableError(input)) {
    return jsonApiError("SERVICE_UNAVAILABLE", "Service unavailable", {
      status: 503,
      headers
    });
  }
  return jsonApiError("INTERNAL_ERROR", fallback, { status: 500, headers });
}
