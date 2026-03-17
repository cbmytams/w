import { NextResponse } from "next/server";
import type { ZodError, ZodType } from "zod";

/**
 * Standard JSON error response for API routes.
 */
export function apiError(message: string, status: number = 400) {
    return NextResponse.json({ error: message }, { status });
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
            response: NextResponse.json(
                { error: "Validation failed", details: formatZodError(result.error) },
                { status: 422 }
            ),
        };
    }
    return { success: true, data: result.data };
}

/**
 * Flatten a ZodError into a human-readable field → message map.
 */
function formatZodError(error: ZodError): Record<string, string[]> {
    return error.flatten().fieldErrors as Record<string, string[]>;
}
