#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[wiki:release] Legacy static wiki release is deprecated."
echo "[wiki:release] Wiki is now rendered by Next.js App Router under /wiki."

echo "[wiki:release] Running wiki SEO verification..."
bash "$ROOT_DIR/scripts/wiki-verify.sh"

echo "[wiki:release] Done."
