import { type Prisma, type Questionnaire, type QuestionnaireType } from "@prisma/client";
import { prisma } from "@/lib/db";

type QuestionEntry = Prisma.JsonValue;

function getQuestionList(sectionsJson: Prisma.JsonValue): QuestionEntry[] {
  return Array.isArray(sectionsJson) ? [...sectionsJson] : [];
}

export async function resolveConfiguredTenantId(): Promise<string | null> {
  const configuredTenantSlug = process.env.DEFAULT_TENANT_SLUG?.trim() || null;
  if (!configuredTenantSlug) {
    return null;
  }

  const tenant = await prisma.tenant.findUnique({ where: { slug: configuredTenantSlug }, select: { id: true } });
  return tenant?.id ?? null;
}

export async function getCurrentQuestionnaireForTenant(tenantId: string, type: QuestionnaireType) {
  return prisma.questionnaire.findFirst({ where: { tenantId, isActive: true, type }, orderBy: { createdAt: "desc" } });
}

export async function getOrCreateCurrentQuestionnaireForTenant(tenantId: string, type: QuestionnaireType) {
  const current = await getCurrentQuestionnaireForTenant(tenantId, type);
  if (current) return current;

  return prisma.questionnaire.create({
    data: {
      tenantId,
      version: "v1",
      type,
      sectionsJson: [],
      isActive: true
    }
  });
}

export async function replaceQuestionnaireSectionsForTenant(
  tenantId: string,
  type: QuestionnaireType,
  sectionsJson: Prisma.InputJsonValue,
  version?: string
) {
  const current = await getOrCreateCurrentQuestionnaireForTenant(tenantId, type);
  return prisma.questionnaire.update({
    where: { id: current.id },
    data: {
      sectionsJson,
      ...(version ? { version } : {})
    }
  });
}

export async function appendQuestionForTenant(
  tenantId: string,
  type: QuestionnaireType,
  question: Prisma.JsonValue
) {
  const current = await getOrCreateCurrentQuestionnaireForTenant(tenantId, type);
  const sections = getQuestionList(current.sectionsJson as Prisma.JsonValue);
  sections.push(question);
  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: { sectionsJson: sections as Prisma.InputJsonValue }
  });

  return { updated, questions: sections };
}

export async function updateQuestionForTenant(
  tenantId: string,
  type: QuestionnaireType,
  questionId: string,
  updates: Prisma.JsonObject
) {
  const current = await getOrCreateCurrentQuestionnaireForTenant(tenantId, type);
  const questions = getQuestionList(current.sectionsJson as Prisma.JsonValue);
  const index = questions.findIndex((entry) => (entry as { id?: string })?.id === questionId);

  if (index < 0) {
    return null;
  }

  questions[index] = {
    ...(questions[index] as Prisma.JsonObject),
    ...updates
  } as Prisma.JsonValue;

  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: { sectionsJson: questions as Prisma.InputJsonValue }
  });

  return { updated, questions };
}

export async function deleteQuestionForTenant(
  tenantId: string,
  type: QuestionnaireType,
  questionId: string
) {
  const current = await getOrCreateCurrentQuestionnaireForTenant(tenantId, type);
  const questions = getQuestionList(current.sectionsJson as Prisma.JsonValue);
  const filtered = questions.filter((entry) => (entry as { id?: string })?.id !== questionId);

  if (filtered.length === questions.length) {
    return null;
  }

  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: { sectionsJson: filtered as Prisma.InputJsonValue }
  });

  return { updated, questions: filtered };
}

export async function reorderQuestionsForTenant(
  tenantId: string,
  type: QuestionnaireType,
  startIndex: number,
  endIndex: number
) {
  const current = await getOrCreateCurrentQuestionnaireForTenant(tenantId, type);
  const questions = getQuestionList(current.sectionsJson as Prisma.JsonValue);

  if (
    startIndex < 0 ||
    endIndex < 0 ||
    startIndex >= questions.length ||
    endIndex >= questions.length
  ) {
    return { error: "Index out of range." as const };
  }

  const [removed] = questions.splice(startIndex, 1);
  questions.splice(endIndex, 0, removed);

  const withOrderIndex = questions.map((entry, index) => ({
    ...(entry as Record<string, unknown>),
    order_index: index
  }));

  const updated = await prisma.questionnaire.update({
    where: { id: current.id },
    data: { sectionsJson: withOrderIndex as Prisma.InputJsonValue }
  });

  return { updated, questions: withOrderIndex };
}

export async function getQuestionnaireVersionForTenant(
  tenantId: string,
  type: QuestionnaireType,
  version: string
): Promise<Pick<Questionnaire, "id" | "version" | "type" | "sectionsJson"> | null> {
  return prisma.questionnaire.findFirst({
    where: { tenantId, version, type },
    select: {
      id: true,
      version: true,
      type: true,
      sectionsJson: true
    }
  });
}
