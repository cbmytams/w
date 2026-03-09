export type ArticleSourceType =
  | "platform-doc"
  | "first-party-data"
  | "third-party-report"
  | "field-observation";

export interface ArticleSource {
  label: string;
  url: string;
  sourceType: ArticleSourceType;
  accessedAt: string;
}
