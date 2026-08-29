import fs from "node:fs";
import path from "node:path";

describe("Julien case study assets", () => {
  // Skipped: the KRH videos live in public/studio/krh/ which is gitignored
  // (heavy media, not committed to the repo). The test only passes on
  // machines where the media folder is present on disk.
  it.skip("only references public assets that exist on disk", () => {
    const sourcePath = path.join(
      process.cwd(),
      "src/components/studio/julien/JulienCaseStudies.tsx"
    );
    const source = fs.readFileSync(sourcePath, "utf8");

    const assetMatches = Array.from(
      source.matchAll(/(?:mockUrl|posterUrl):\s*"([^"]+)"/g),
      (match) => match[1]
    );

    expect(assetMatches.length).toBeGreaterThan(0);

    const missingAssets = assetMatches.filter((assetPath) => {
      const relativeAssetPath = assetPath.replace(/^\/+/, "");
      return !fs.existsSync(
        path.join(process.cwd(), "public", relativeAssetPath)
      );
    });

    expect(missingAssets).toEqual([]);
  });
});
