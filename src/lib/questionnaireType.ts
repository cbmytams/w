import { QuestionnaireType } from "@prisma/client";

type SearchParamsLike = Pick<URLSearchParams, "get">;

export function resolveType(
  searchParams?: SearchParamsLike | null
): QuestionnaireType {
  const typeParam = searchParams?.get("type");
  return typeParam === QuestionnaireType.BRANDS
    ? QuestionnaireType.BRANDS
    : QuestionnaireType.TALENTS;
}
