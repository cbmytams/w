import { NextResponse } from "next/server";
import type { ZodError, ZodType } from "zod";
import type { ApiResponse } from "@/types/api";

type ApiErrorInit = {
  status?: number;
  code?: string;
};

export function apiSuccess<T>(
  data: T,
  init?: number | ResponseInit
): NextResponse<ApiResponse<T>> {
  const responseInit =
    typeof init === "number" ? { status: init } : (init ?? {});
  return NextResponse.json({ success: true, data }, responseInit);
}

/**
 * Standard JSON error response for API routes.
 */
export function apiError(
  message: string,
  init: number | ApiErrorInit = 400
): NextResponse<ApiResponse<never>> {
  const responseInit =
    typeof init === "number"
      ? { status: init }
      : { status: init.status ?? 400 };

  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(typeof init === "number" ? {} : init.code ? { code: init.code } : {}),
    },
    responseInit
  );
}

/**
 * Validate unknown data against a Zod schema.
 * Returns typed data on success, or a pre-built 422 NextResponse on failure.
 */
export function validateBody<T>(
  schema: ZodType<T>,
  data: unknown
): { success: true; data: T } | { success: false; response: NextResponse } {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      response: apiError("Validation failed", {
        status: 422,
        code: formatZodError(result.error),
      }),
    };
  }
  return { success: true, data: result.data };
}

/**
 * Flatten a ZodError into a human-readable field → message map.
 */
function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "body";
      return `${path}: ${issue.message}`;
    })
    .join("; ");
}
