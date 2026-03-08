import { prisma } from "./db";
import { QuestionnaireKind } from "@prisma/client";

export async function getCurrentQuestionnaireForTenant(
  tenantId: string,
  kind: QuestionnaireKind = QuestionnaireKind.BRAND
) {
  return prisma.questionnaire.findFirst({
    where: { tenantId, kind, isActive: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function getOrCreateCurrentQuestionnaireForTenant(
  tenantId: string,
  kind: QuestionnaireKind = QuestionnaireKind.BRAND
) {
  const current = await getCurrentQuestionnaireForTenant(tenantId, kind);
  if (current) return current;

  return prisma.questionnaire.create({
    data: {
      tenantId,
      kind,
      version: "v1",
      sectionsJson: [],
      isActive: true
    }
  });
}
