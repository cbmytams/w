import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");
const standaloneNextDir = path.join(standaloneDir, ".next");

async function ensureExists(target) {
  try {
    await mkdir(target, { recursive: true });
  } catch (error) {
    throw new Error(`Unable to prepare directory ${target}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function copyIntoStandalone() {
  await ensureExists(standaloneNextDir);

  const tasks = [
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
    process.stdout.write("Standalone package prepared with public/ and .next/static assets.\n");
  })
  .catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  });
