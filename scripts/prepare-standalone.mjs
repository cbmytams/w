import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");
const standaloneNextDir = path.join(standaloneDir, ".next");
const nextDir = path.join(root, ".next");

const REQUIRED_NEXT_ROOT_FILES = [
  "BUILD_ID",
  "app-path-routes-manifest.json",
  "build-manifest.json",
  "export-marker.json",
  "fallback-build-manifest.json",
  "images-manifest.json",
  "next-minimal-server.js.nft.json",
  "next-server.js.nft.json",
  "prerender-manifest.json",
  "react-loadable-manifest.json",
  "required-server-files.js",
  "required-server-files.json",
  "routes-manifest.json",
];

async function ensureExists(target) {
  try {
    await mkdir(target, { recursive: true });
  } catch (error) {
    throw new Error(
      `Unable to prepare directory ${target}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

async function pathExists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function copyIntoStandalone() {
  await ensureExists(standaloneNextDir);

  const rootFileTasks = [];

  for (const filename of REQUIRED_NEXT_ROOT_FILES) {
    const from = path.join(nextDir, filename);
    if (await pathExists(from)) {
      rootFileTasks.push({
        from,
        to: path.join(standaloneNextDir, filename),
      });
    }
  }

  const tasks = [
    ...rootFileTasks,
    {
      from: path.join(root, ".next", "static"),
      to: path.join(standaloneNextDir, "static"),
    },
    {
      from: path.join(root, "public"),
      to: path.join(standaloneDir, "public"),
    },
  ];

  for (const task of tasks) {
    await rm(task.to, { recursive: true, force: true });
    await cp(task.from, task.to, { recursive: true, force: true });
  }
}

copyIntoStandalone()
  .then(() => {
    process.stdout.write(
      "Standalone package prepared with public/ and .next/static assets.\n"
    );
  })
  .catch((error) => {
    process.stderr.write(
      `${error instanceof Error ? error.message : String(error)}\n`
    );
    process.exit(1);
  });
