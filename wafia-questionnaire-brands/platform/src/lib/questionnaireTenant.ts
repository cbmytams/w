import { QuestionnaireType } from "@prisma/client";
import { prisma } from "./db";

export async function getCurrentQuestionnaireForTenant(
  tenantId: string,
  type: QuestionnaireType = QuestionnaireType.BRANDS
) {
  return prisma.questionnaire.findFirst({
    where: { tenantId, type, isActive: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrCreateCurrentQuestionnaireForTenant(
  tenantId: string,
  type: QuestionnaireType = QuestionnaireType.BRANDS
) {
  const current = await getCurrentQuestionnaireForTenant(tenantId, type);
  if (current) return current;

  return prisma.questionnaire.create({
    data: {
      tenantId,
      type,
      version: "v1",
      sectionsJson: [],
      isActive: true,
    },
  });
}
