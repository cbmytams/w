const major = Number(process.versions.node.split(".")[0]);

if (Number.isNaN(major) || major < 20 || major >= 25) {
  console.error(
    `[node-version] Unsupported Node.js ${process.versions.node}. ` +
      "Use Node.js 20.x or 22.x (>=20 <25) for Next.js build/runtime tasks."
  );
  process.exit(1);
}
