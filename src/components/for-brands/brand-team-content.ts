// Non-text data only. Role, "on paper" and "in real life" copy lives in
// messages/<locale>/team.json (`profiles`, same order as this array).
export const BRAND_TEAM_PROFILES = [
  {
    id: "sasha",
    name: "Sasha",
    fullName: "Sasha (Wahib) Guettat",
    image: "/images/team/sasha.jpg",
    linkedin: "https://www.linkedin.com/in/sasha-guettat-a37464220/",
    email: "sasha@wafia.fr",
  },
  {
    id: "yaelle",
    name: "Yaëlle",
    fullName: "Yaëlle",
    image: "/images/team/yaelle.jpg",
    linkedin: "https://www.linkedin.com/in/yaelle-neault-33b872232/",
    email: "yaelle@wafia.fr",
  },
] as const;

export type BrandTeamProfileCopy = {
  readonly role: string;
  readonly paper: string;
  readonly realLife: string;
};
