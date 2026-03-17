import type { NextRequest } from "next/server";
import { QuestionnaireKind } from "@prisma/client";
import { jsonApiError } from "@/lib/apiError";

function parseKind(value: string | null | undefined) {
  if (value === QuestionnaireKind.BRAND) return QuestionnaireKind.BRAND;
  if (value === QuestionnaireKind.TALENT) return QuestionnaireKind.TALENT;
  return null;
}

function inferKindFromReferrer(request: NextRequest) {
  const headerKind = parseKind(request.headers.get("x-questionnaire-kind"));
  if (headerKind) return headerKind;

  const referer = request.headers.get("referer");
  if (!referer) return null;

  try {
    const refPath = new URL(referer).pathname.toLowerCase();
    if (refPath.includes("/questionnaire-brands")) return QuestionnaireKind.BRAND;
    if (refPath.includes("/questionnaire")) return QuestionnaireKind.TALENT;
  } catch {
    return null;
  }

  return null;
}

type ResolveKindOptions = {
  allowDefault?: boolean;
  defaultKind?: QuestionnaireKind;
};

export function resolveQuestionnaireKindFromRequest(
  request: NextRequest,
  options: ResolveKindOptions = {}
) {
  const value = request.nextUrl.searchParams.get("kind");
  const explicitKind = parseKind(value);

  if (value !== null && !explicitKind) {
    return {
      kind: null,
      response: jsonApiError("INVALID_PAYLOAD", "Invalid payload", { status: 400 })
    };
  }

  if (explicitKind) {
    return { kind: explicitKind, response: null };
  }

  const inferredKind = inferKindFromReferrer(request);
  if (inferredKind) {
    return { kind: inferredKind, response: null };
  }

  if (options.allowDefault) {
    return {
      kind: options.defaultKind || QuestionnaireKind.BRAND,
      response: null
    };
  }

  return {
    kind: null,
    response: jsonApiError("INVALID_PAYLOAD", "Invalid payload", { status: 400 })
  };
}
