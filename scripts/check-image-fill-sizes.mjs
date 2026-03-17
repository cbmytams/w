#!/usr/bin/env node

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

function getSourceFiles() {
  const output = execSync('rg --files src | rg "\\.(tsx|jsx)$"', {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function findFillWithoutSizes(filePath) {
  const source = readFileSync(filePath, "utf8");
  const imageTagPattern = /<Image\b[\s\S]*?\/>/g;
  const failures = [];

  let match;
  while ((match = imageTagPattern.exec(source)) !== null) {
    const tag = match[0];
    const hasFill = /\bfill\b/.test(tag);
    const hasSizes = /\bsizes\s*=/.test(tag);
    if (!hasFill || hasSizes) continue;

    const line = source.slice(0, match.index).split("\n").length;
    const snippet = tag.replace(/\s+/g, " ").slice(0, 180);
    failures.push({ line, snippet });
  }

  return failures;
}

function main() {
  const files = getSourceFiles();
  const results = [];

  for (const file of files) {
    const failures = findFillWithoutSizes(file);
    for (const failure of failures) {
      results.push({ file, ...failure });
    }
  }

  if (results.length === 0) {
    console.log("OK: every <Image fill /> has a sizes prop.");
    process.exit(0);
  }

  console.error("ERROR: found <Image fill /> without sizes:");
  for (const result of results) {
    console.error(`- ${result.file}:${result.line}`);
    console.error(`  ${result.snippet}`);
  }
  process.exit(1);
}

main();
