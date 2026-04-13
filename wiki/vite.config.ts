import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/wiki/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify - file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== "true",
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === "EVAL" &&
          typeof warning.id === "string" &&
          warning.id.includes("node_modules/gray-matter/lib/engines.js")
        ) {
          // gray-matter uses js-yaml internals that rely on eval for YAML function schema parsing.
          // In this project markdown is bundled from trusted repository content, not user input.
          // We accept this warning and keep gray-matter unchanged to avoid forking vendor code.
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor-react";
          }
          if (
            id.includes("node_modules/gray-matter/") ||
            id.includes("node_modules/js-yaml/") ||
            id.includes("node_modules/argparse/") ||
            id.includes("node_modules/kind-of/") ||
            id.includes("node_modules/section-matter/") ||
            id.includes("node_modules/strip-bom-string/") ||
            id.includes("node_modules/buffer/")
          ) {
            return "vendor-content";
          }
          if (
            id.includes("node_modules/framer-motion") ||
            id.includes("node_modules/motion-dom") ||
            id.includes("node_modules/motion-utils")
          ) {
            return "vendor-motion";
          }
          if (
            id.includes("node_modules/react-router/") ||
            id.includes("node_modules/react-router-dom/")
          ) {
            return "vendor-router";
          }
          if (id.includes("node_modules/lucide-react")) return "vendor-icons";
          if (
            id.includes("node_modules/parse5") ||
            id.includes("node_modules/entities")
          ) {
            return "vendor-html-parser";
          }
          if (
            id.includes("node_modules/react-markdown") ||
            id.includes("node_modules/remark-") ||
            id.includes("node_modules/rehype-") ||
            id.includes("node_modules/unified") ||
            id.includes("node_modules/micromark") ||
            id.includes("node_modules/mdast-") ||
            id.includes("node_modules/hast-") ||
            id.includes("node_modules/vfile") ||
            id.includes("node_modules/unist-") ||
            id.includes("node_modules/property-information") ||
            id.includes("node_modules/markdown-table") ||
            id.includes("node_modules/hastscript") ||
            id.includes("node_modules/trough") ||
            id.includes("node_modules/zwitch") ||
            id.includes("node_modules/comma-separated-tokens") ||
            id.includes("node_modules/trim-lines") ||
            id.includes("node_modules/decode-named-character-reference") ||
            id.includes("node_modules/longest-streak")
          ) {
            return "vendor-markdown";
          }
          if (id.includes("node_modules")) return "vendor-core";
          return undefined;
        },
      },
    },
  },
});
