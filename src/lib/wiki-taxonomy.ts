export interface WikiTaxonomyItem {
  id: string;
  label: string;
  num: string;
}

export const WIKI_THEME_ITEMS: WikiTaxonomyItem[] = [
  { id: "algorithmes", label: "Algorithmes", num: "01" },
  { id: "monetisation", label: "Monétisation", num: "02" },
  { id: "croissance", label: "Croissance", num: "03" },
  { id: "branding", label: "Branding", num: "04" },
  { id: "audience", label: "Audience & Communauté", num: "05" },
  { id: "production", label: "Production & Outils", num: "06" },
  { id: "business", label: "Business & Contrats", num: "07" },
];

export const WIKI_PLATFORM_ITEMS: WikiTaxonomyItem[] = [
  { id: "tiktok", label: "TikTok", num: "01" },
  { id: "instagram", label: "Instagram", num: "02" },
  { id: "youtube", label: "YouTube", num: "03" },
  { id: "twitch", label: "Twitch", num: "04" },
  { id: "snapchat", label: "Snapchat", num: "05" },
  { id: "x", label: "X / Twitter", num: "06" },
  { id: "facebook", label: "Facebook", num: "07" },
];

export const WIKI_THEME_LABELS: Record<string, string> = Object.fromEntries(
  WIKI_THEME_ITEMS.map((item) => [item.id, item.label])
);

export const WIKI_PLATFORM_LABELS: Record<string, string> = Object.fromEntries(
  WIKI_PLATFORM_ITEMS.map((item) => [item.id, item.label])
);

export const WIKI_THEME_ORDER = WIKI_THEME_ITEMS.map((item) => item.id);
export const WIKI_PLATFORM_ORDER = WIKI_PLATFORM_ITEMS.map((item) => item.id);
