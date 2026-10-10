import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const ROOT = join(process.cwd(), "messages");
const LOCALES = readdirSync(ROOT);
const REFERENCE = "fr";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

function load(locale: string, file: string): Json {
  return JSON.parse(readFileSync(join(ROOT, locale, file), "utf8"));
}

/** Structural signature: keys, array lengths, ICU placeholders and rich tags. */
function shape(value: Json, path = ""): string[] {
  if (Array.isArray(value)) {
    return [
      `${path}[${value.length}]`,
      ...value.flatMap((v, i) => shape(v, `${path}[${i}]`)),
    ];
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) =>
      shape(v, path ? `${path}.${k}` : k)
    );
  }
  const tokens = String(value).match(/\{[^}]+\}|<\/?[a-z]+\/?>/gi) ?? [];
  return [`${path}:${[...tokens].sort().join("")}`];
}

function strings(value: Json): string[] {
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(strings);
  }
  return typeof value === "string" ? [value] : [];
}

const files = readdirSync(join(ROOT, REFERENCE));

describe("message catalogues", () => {
  it.each(files)("%s has content in the reference locale", (file) => {
    expect(Object.keys(load(REFERENCE, file) as object).length).toBeGreaterThan(
      0
    );
  });

  describe.each(LOCALES.filter((l) => l !== REFERENCE))("%s", (locale) => {
    it("has the same files as the reference locale", () => {
      expect(readdirSync(join(ROOT, locale)).sort()).toEqual([...files].sort());
    });

    it.each(files)("%s mirrors the reference structure", (file) => {
      expect(shape(load(locale, file))).toEqual(shape(load(REFERENCE, file)));
    });

    it.each(files)("%s has no empty strings", (file) => {
      expect(strings(load(locale, file)).filter((s) => !s.trim())).toEqual([]);
    });
  });
});
