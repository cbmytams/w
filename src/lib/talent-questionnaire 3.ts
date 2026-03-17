const TRACKING_QUERY_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ttclid",
] as const;

const QUESTIONNAIRE_ENTRYPOINT = "site";
const INTERNAL_QUESTIONNAIRE_PATH = "/questionnaire/talents";

type SearchParamsLike = Pick<URLSearchParams, "get">;

export function buildTalentQuestionnaireUrl(input: {
  source?: string | null;
  currentSearchParams?: SearchParamsLike | null;
}) {
  const params = new URLSearchParams({
    entry: QUESTIONNAIRE_ENTRYPOINT,
  });

  if (input.source) {
    params.set("src", input.source);
  }

  if (input.currentSearchParams) {
    for (const key of TRACKING_QUERY_KEYS) {
      const value = input.currentSearchParams.get(key);
      if (!value || params.has(key)) continue;
      params.set(key, value);
    }
  }

  return `${INTERNAL_QUESTIONNAIRE_PATH}?${params.toString()}`;
}

export function buildTalentQuestionnaireHref(source: string) {
  return buildTalentQuestionnaireUrl({
    source,
  });
}
