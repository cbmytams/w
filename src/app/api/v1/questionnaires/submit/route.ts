import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma as db } from "@/lib/db";
import { computeCompletion } from "@/lib/completion";
import {
  BRANDS_QUESTIONNAIRE_MAP,
  TALENTS_QUESTIONNAIRE_MAP,
} from "@/lib/questionnaireMap";
import { QuestionnaireSubmitSchema } from "@/lib/validations";
import { validateBody, apiError, apiSuccess } from "@/lib/api-response";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/requestSecurity";
import { resolveConfiguredTenantId } from "@/lib/questionnaireTenant";
import { logError } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const originError = enforceSameOrigin(request);
    if (originError) return originError;

    const rateLimitError = enforceRateLimit(request, {
      scope: "questionnaire-submit",
      limit: 20,
      windowMs: 60 * 1000,
    });
    if (rateLimitError) return rateLimitError;

    const rawBody = await request.json().catch(() => null);
    if (!rawBody) return apiError("Invalid JSON body");

    const validation = validateBody(QuestionnaireSubmitSchema, rawBody);
    if (!validation.success) return validation.response;

    const { type, responses } = validation.data;

    const name = (responses.ql_name || responses.ql_company) as
      | string
      | undefined;
    const email = responses.ql_email as string | undefined;

    // We require at least a name or an email to consider this a valid lead.
    // Otherwise, it's a ghost/bot submission that pollutes the database.
    if (!name && !email) {
      return apiError(
        "Payload rejected: Missing basic identification (name or email).",
        400
      );
    }

    const tenantId = await resolveConfiguredTenantId();
    if (!tenantId) {
      return apiError(
        "No tenant configured for questionnaire submissions.",
        503
      );
    }

    const questionnaire = await db.questionnaire.findFirst({
      where: {
        tenantId,
        type: type === "BRANDS" ? "BRANDS" : "TALENTS",
        isActive: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!questionnaire) {
      return apiError(
        "No active questionnaire configured for this submission type.",
        503
      );
    }

    // Calculate completion
    const map =
      type === "BRANDS" ? BRANDS_QUESTIONNAIRE_MAP : TALENTS_QUESTIONNAIRE_MAP;
    const completionData = computeCompletion(
      responses as Record<string, string>,
      map
    );

    // Keep lead creation and questionnaire response atomic to avoid orphan talents.
    const finalName = name || `Inconnu (${email})`;
    const timestamp = Date.now().toString();
    const slug = `${finalName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${timestamp}`;

    const newResponse = await db.$transaction(async (tx) => {
      const talentRecord = await tx.talent.create({
        data: {
          name: finalName,
          slug,
          tenantId,
        },
      });

      return tx.questionnaireResponse.create({
        data: {
          talentId: talentRecord.id,
          questionnaireId: questionnaire.id,
          type: type === "BRANDS" ? "BRANDS" : "TALENTS",
          answersJson: responses as Prisma.InputJsonValue,
          completionRate: completionData.percent,
        },
      });
    });

    return apiSuccess(newResponse, 201);
  } catch (error) {
    logError("questionnaires.submit_failed", error, {
      route: "/api/v1/questionnaires/submit",
    });
    return apiError("Internal Server Error", 500);
  }
}
