import { TEAM } from "@/constants/team";
import { siteConfig } from "@/lib/site";

export type KnownAuthorSlug = "sasha-guettat" | "yaelle";

export type AuthorProfile = {
  slug: KnownAuthorSlug;
  name: string;
  role: string;
  location: string;
  shortBio: string;
  image: string;
  sameAs: string[];
  knowsAbout: string[];
};

const AUTHOR_KNOWS_ABOUT: Record<KnownAuthorSlug, string[]> = {
  "sasha-guettat": [
    "Influence marketing",
    "Creator economy",
    "Brand strategy",
    "Monetization",
    "Partnership strategy",
  ],
  yaelle: [
    "Creative direction",
    "Personal branding",
    "Editorial strategy",
    "Content systems",
    "Audience growth",
  ],
};

function assertAuthorSlug(slug: string): slug is KnownAuthorSlug {
  return slug === "sasha-guettat" || slug === "yaelle";
}

const authorEntries: Array<[KnownAuthorSlug, AuthorProfile]> = [];

for (const member of TEAM) {
  if (!assertAuthorSlug(member.slug)) continue;

  const sameAs = [member.links.linkedin, member.links.instagram].filter(
    (value): value is string => Boolean(value),
  );

  authorEntries.push([
    member.slug,
    {
      slug: member.slug,
      name: member.name,
      role: member.role,
      location: member.location,
      shortBio: member.shortBio,
      image: member.image,
      sameAs,
      knowsAbout: AUTHOR_KNOWS_ABOUT[member.slug],
    },
  ]);
}

const AUTHOR_INDEX = new Map<KnownAuthorSlug, AuthorProfile>(authorEntries);

export function getAuthorBySlug(slug: string): AuthorProfile | null {
  return AUTHOR_INDEX.get(slug as KnownAuthorSlug) ?? null;
}

export function getDefaultAuthor(): AuthorProfile {
  const author = getAuthorBySlug("sasha-guettat");
  if (!author) {
    throw new Error("Default author profile is missing for slug sasha-guettat.");
  }
  return author;
}

export function getAuthorProfileUrl(slug: string): string {
  return new URL(`/equipe/${slug}`, siteConfig.url).toString();
}
