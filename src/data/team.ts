export type TeamSection = {
  title: string;
  text?: string;
  bullets?: string[];
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  image: string;
  location: string;
  quote: string;
  proof: string[];
  longSections: TeamSection[];
  links: {
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
};

// Temporary baseline dataset to keep dynamic team routes type-safe.
// Populate with real members as content is finalized.
export const TEAM: TeamMember[] = [];
