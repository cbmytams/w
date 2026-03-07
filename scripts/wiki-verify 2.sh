#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_ORIGIN="${WIKI_SITE_URL:-${NEXT_PUBLIC_SITE_URL:-https://wafia.fr}}"
SITE_ORIGIN="${SITE_ORIGIN%/}"

echo "[wiki:verify] Checking source article titles..."
if rg -n '^title:.*2025|^# .*2025' "$ROOT_DIR"/wiki/src/content/blog/*.md; then
  echo "[wiki:verify] ERROR: Found \"2025\" in article title or H1."
  exit 1
fi

echo "[wiki:verify] Checking source/published editorial cleanup patterns..."
if rg -n '\[cite:|\*Sources?\s*:|Contactez-nous|Discutons|Notre agence|Notre équipe' "$ROOT_DIR"/wiki/src/content/blog; then
  echo "[wiki:verify] ERROR: Found forbidden editorial patterns in source wiki content."
  exit 1
fi
if rg -n '\[cite:|\*Sources?\s*:|Contactez-nous|Discutons|Notre agence|Notre équipe' "$ROOT_DIR"/public/wiki; then
  echo "[wiki:verify] ERROR: Found forbidden editorial patterns in published wiki."
  exit 1
fi

echo "[wiki:verify] Checking published bundles for legacy clickbait titles..."
if rg -n 'Le Guide Complet 2025|en 2025 : Le Guide' "$ROOT_DIR"/public/wiki/assets/*.js; then
  echo "[wiki:verify] ERROR: Found legacy title patterns in published JS bundle."
  exit 1
fi

dist_js="$(rg -o 'assets/index-[^"]+\.js' "$ROOT_DIR/wiki/dist/index.html" | head -n 1 || true)"
dist_css="$(rg -o 'assets/index-[^"]+\.css' "$ROOT_DIR/wiki/dist/index.html" | head -n 1 || true)"
pub_js="$(rg -o 'assets/index-[^"]+\.js' "$ROOT_DIR/public/wiki/index.html" | head -n 1 || true)"
pub_css="$(rg -o 'assets/index-[^"]+\.css' "$ROOT_DIR/public/wiki/index.html" | head -n 1 || true)"

if [[ -z "$dist_js" || -z "$dist_css" || -z "$pub_js" || -z "$pub_css" ]]; then
  echo "[wiki:verify] ERROR: Could not resolve asset references from dist/public index.html."
  exit 1
fi

echo "[wiki:verify] Dist assets:   JS=$dist_js CSS=$dist_css"
echo "[wiki:verify] Public assets: JS=$pub_js CSS=$pub_css"

if [[ "$dist_js" != "$pub_js" || "$dist_css" != "$pub_css" ]]; then
  echo "[wiki:verify] ERROR: public/wiki is not aligned with wiki/dist asset hashes."
  exit 1
fi

echo "[wiki:verify] Checking placeholders and canonical metadata..."
if rg -n 'Replace .*domain after deploying' "$ROOT_DIR"/public/wiki; then
  echo "[wiki:verify] ERROR: Found stale deployment placeholder comments in published wiki."
  exit 1
fi
if ! rg -n '<link rel="canonical"' "$ROOT_DIR"/public/wiki/index.html >/dev/null; then
  echo "[wiki:verify] ERROR: canonical link missing in public/wiki/index.html."
  exit 1
fi
if ! rg -n "<link rel=\"canonical\" href=\"$SITE_ORIGIN/wiki\"" "$ROOT_DIR"/public/wiki/index.html >/dev/null; then
  echo "[wiki:verify] ERROR: canonical URL in public/wiki/index.html is not aligned with site origin."
  exit 1
fi

echo "[wiki:verify] Checking article route pages and sitemap coverage..."
source_slugs="$(rg --no-filename -o '^slug:\s*"([^"]+)"' -r '$1' "$ROOT_DIR"/wiki/src/content/blog/*.md | sort -u || true)"
source_slug_count="$(printf "%s\n" "$source_slugs" | sed '/^$/d' | wc -l | tr -d ' ')"
if [[ "$source_slug_count" -eq 0 ]]; then
  echo "[wiki:verify] ERROR: Could not resolve source slugs."
  exit 1
fi

missing=0
while IFS= read -r slug; do
  [[ -z "$slug" ]] && continue
  if [[ ! -f "$ROOT_DIR/public/wiki/blog/$slug/index.html" ]]; then
    echo "[wiki:verify] ERROR: Missing published article page for slug '$slug'."
    missing=1
  fi
done <<< "$source_slugs"

if [[ "$missing" -ne 0 ]]; then
  exit 1
fi

article_urls_in_sitemap="$(rg -n "/wiki/blog/" "$ROOT_DIR/public/wiki/sitemap.xml" | wc -l | tr -d ' ')"
if [[ "$article_urls_in_sitemap" -lt "$source_slug_count" ]]; then
  echo "[wiki:verify] ERROR: sitemap article coverage too low ($article_urls_in_sitemap < $source_slug_count)."
  exit 1
fi

expected_sitemap_line="Sitemap: $SITE_ORIGIN/wiki/sitemap.xml"
if ! rg -n "^${expected_sitemap_line//\//\\/}$" "$ROOT_DIR/public/wiki/robots.txt" >/dev/null; then
  echo "[wiki:verify] ERROR: robots.txt sitemap does not match expected site origin."
  echo "[wiki:verify] Expected: $expected_sitemap_line"
  exit 1
fi

if find "$ROOT_DIR/public/wiki" -type f | rg ' (2|3|4)\.|assets (2|3|4)' >/dev/null; then
  echo "[wiki:verify] ERROR: Found duplicate legacy wiki files (suffix 2/3/4)."
  exit 1
fi

echo "[wiki:verify] OK."
