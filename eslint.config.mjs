import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Embedded sub-project (kept for static questionnaire assets/source)
    "wafia-questionnaire-brands/**",
    // Generated static questionnaire bundle
    "public/questionnaire/assets/**",
    "public/questionnaire-brands/assets/**",
  ]),
  // Custom rules
  {
    rules: {
      // Disable for French language content (apostrophes in C'est, l'art, etc.)
      "react/no-unescaped-entities": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // This repo might have some unused vars, so let's warn except for prefix '_'
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
]);

export default eslintConfig;
