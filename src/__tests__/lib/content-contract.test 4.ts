import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const WIKI_DIR = path.join(process.cwd(), "wiki/src/content/blog");
const VALID_AUTHORS = new Set(["sasha-guettat", "yaelle"]);
const VALID_SOURCE_TYPES = new Set([
  "platform-doc",
  "first-party-data",
  "third-party-report",
  "field-observation",
]);

function listFiles(dir: string, extensions: string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return listFiles(fullPath, extensions);
    }
    if (entry.isFile() && extensions.some((extension) => entry.name.endsWith(extension))) {
      return [fullPath];
    }
    return [];
  });
}

function assertIsoDate(value: unknown, field: string, filePath: string) {
  expect(typeof value).toBe("string");
  const raw = String(value);
  const parsed = new Date(raw);
  expect(Number.isNaN(parsed.getTime())).toBe(false);
  expect(raw.length).toBeGreaterThan(0);
  expect(raw).toEqual(expect.stringContaining("-"));
  expect(field.length).toBeGreaterThan(0);
  expect(filePath.length).toBeGreaterThan(0);
}

function assertSources(value: unknown, filePath: string) {
  expect(Array.isArray(value)).toBe(true);
  (value as unknown[]).forEach((item, index) => {
    expect(item && typeof item === "object").toBe(true);
    const source = item as Record<string, unknown>;
    expect(typeof source.label).toBe("string");
    expect(String(source.label).trim().length).toBeGreaterThan(0);
    expect(typeof source.url).toBe("string");
    expect(() => new URL(String(source.url))).not.toThrow();
    expect(typeof source.sourceType).toBe("string");
    expect(VALID_SOURCE_TYPES.has(String(source.sourceType))).toBe(true);
    assertIsoDate(source.accessedAt, `sources[${index}].accessedAt`, filePath);
  });
}

describe("content frontmatter contract", () => {
  it("enforces machine-readable fields on blog and wiki content", () => {
    const files = [...listFiles(BLOG_DIR, [".mdx"]), ...listFiles(WIKI_DIR, [".md", ".mdx"])];
    expect(files.length).toBeGreaterThan(0);

    files.forEach((filePath) => {
      const source = fs.readFileSync(filePath, "utf8");
      const { data } = matter(source);

      expect(typeof data.title).toBe("string");
      expect(String(data.title).trim().length).toBeGreaterThan(0);

      expect(typeof data.slug).toBe("string");
      expect(String(data.slug).trim().length).toBeGreaterThan(0);

      expect(typeof data.description).toBe("string");
      expect(String(data.description).trim().length).toBeGreaterThan(0);

      expect(typeof data.authorSlug).toBe("string");
      expect(VALID_AUTHORS.has(String(data.authorSlug))).toBe(true);

      assertIsoDate(data.publishedAt, "publishedAt", filePath);
      assertIsoDate(data.updatedAt, "updatedAt", filePath);
      assertIsoDate(data.lastReviewedAt, "lastReviewedAt", filePath);
      assertSources(data.sources, filePath);
    });
  });
});
