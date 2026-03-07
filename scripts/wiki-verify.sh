#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${WIKI_VERIFY_PORT:-4317}"
BASE_URL="http://127.0.0.1:${PORT}"

SOURCE_DIR="$ROOT_DIR/wiki/src/content/blog"

assert_http_code() {
  local path="$1"
  local expected="$2"
  local code
  code="$(curl -sS -o /dev/null -w "%{http_code}" "${BASE_URL}${path}")"

  if [[ "$code" != "$expected" ]]; then
    echo "[wiki:verify] ERROR: ${path} returned ${code} (expected ${expected})."
    exit 1
  fi
}

assert_redirect_301() {
  local path="$1"
  local expected_location="$2"
  local headers
  local code
  local location

  headers="$(curl -sSI "${BASE_URL}${path}")"
  code="$(printf "%s" "$headers" | awk 'toupper(substr($1,1,5))=="HTTP/" {print $2; exit}')"
  location="$(printf "%s" "$headers" | awk 'tolower($1)=="location:"{print $2}' | tr -d '\r')"

  if [[ "$code" != "301" ]]; then
    echo "[wiki:verify] ERROR: ${path} returned ${code} (expected 301)."
    exit 1
  fi

  if [[ "$location" != "$expected_location" && "$location" != "${BASE_URL}${expected_location}" ]]; then
    echo "[wiki:verify] ERROR: ${path} redirected to ${location} (expected ${expected_location})."
    exit 1
  fi
}

echo "[wiki:verify] Checking wiki source editorial constraints..."
if rg -n '^title:.*2025|^# .*2025' "$SOURCE_DIR"; then
  echo "[wiki:verify] ERROR: found '2025' in title or H1 in source markdown."
  exit 1
fi
if rg -n '\[cite:|\*Sources?\s*:|Contactez-nous|Discutons|Notre agence|Notre équipe' "$ROOT_DIR/wiki/src/content/blog"; then
  echo "[wiki:verify] ERROR: found forbidden editorial patterns in source markdown."
  exit 1
fi

echo "[wiki:verify] Checking runtime config (Next wiki routes)..."
if rg -n 'destination:\s*"/wiki/.+\.html"' "$ROOT_DIR/next.config.ts"; then
  echo "[wiki:verify] ERROR: legacy static /wiki rewrite detected in next.config.ts."
  exit 1
fi
if ! rg -n 'source:\s*"/wiki/blog"' "$ROOT_DIR/next.config.ts" >/dev/null; then
  echo "[wiki:verify] ERROR: missing redirect /wiki/blog -> /wiki."
  exit 1
fi
if ! rg -n 'source:\s*"/wiki/blog/theme/:id"' "$ROOT_DIR/next.config.ts" >/dev/null; then
  echo "[wiki:verify] ERROR: missing redirect /wiki/blog/theme/:id -> /wiki/theme/:id."
  exit 1
fi
if ! rg -n 'source:\s*"/wiki/blog/platform/:id"' "$ROOT_DIR/next.config.ts" >/dev/null; then
  echo "[wiki:verify] ERROR: missing redirect /wiki/blog/platform/:id -> /wiki/platform/:id."
  exit 1
fi
if ! rg -n 'source:\s*"/wiki/blog/:slug"' "$ROOT_DIR/next.config.ts" >/dev/null; then
  echo "[wiki:verify] ERROR: missing redirect /wiki/blog/:slug -> /wiki/:slug."
  exit 1
fi
if [[ "$(rg -n 'statusCode:\s*301' "$ROOT_DIR/next.config.ts" | wc -l | tr -d ' ')" -lt 4 ]]; then
  echo "[wiki:verify] ERROR: expected 4 wiki redirects with HTTP 301."
  exit 1
fi

source_slugs="$(rg --no-filename -o '^slug:\s*"([^"]+)"' -r '$1' "$SOURCE_DIR" | sort -u || true)"
source_themes="$(rg --no-filename -o '^theme:\s*"([^"]+)"' -r '$1' "$SOURCE_DIR" | sort -u || true)"
source_platforms="$(rg --no-filename -o '^platform:\s*"([^"]+)"' -r '$1' "$SOURCE_DIR" | sort -u || true)"

first_slug="$(printf "%s\n" "$source_slugs" | sed '/^$/d' | head -n 1)"
first_theme="$(printf "%s\n" "$source_themes" | sed '/^$/d' | head -n 1)"
first_platform="$(printf "%s\n" "$source_platforms" | sed '/^$/d' | head -n 1)"

if [[ -z "$first_slug" || -z "$first_theme" || -z "$first_platform" ]]; then
  echo "[wiki:verify] ERROR: failed to resolve slug/theme/platform from markdown source."
  exit 1
fi

source_file_for_first_slug="$(rg -l "^slug:\s*\"${first_slug}\"$" "$SOURCE_DIR" | head -n 1 || true)"
if [[ -z "$source_file_for_first_slug" ]]; then
  echo "[wiki:verify] ERROR: unable to map source file for slug ${first_slug}."
  exit 1
fi
first_title="$(rg --no-filename -m 1 -o '^title:\s*"([^"]+)"' -r '$1' "$source_file_for_first_slug" || true)"
if [[ -z "$first_title" ]]; then
  echo "[wiki:verify] ERROR: unable to resolve title for slug ${first_slug}."
  exit 1
fi

echo "[wiki:verify] Building Next app..."
BUILD_LOG="$(mktemp -t wiki-verify-build.XXXXXX.log)"
SERVER_LOG="$(mktemp -t wiki-verify-server.XXXXXX.log)"

if ! npm --prefix "$ROOT_DIR" run build >"$BUILD_LOG" 2>&1; then
  echo "[wiki:verify] ERROR: npm run build failed."
  cat "$BUILD_LOG"
  rm -f "$BUILD_LOG" "$SERVER_LOG"
  exit 1
fi

echo "[wiki:verify] Starting local server for HTTP assertions..."
(
  cd "$ROOT_DIR"
  PORT="$PORT" NEXT_PUBLIC_SITE_URL="$BASE_URL" node .next/standalone/server.js >"$SERVER_LOG" 2>&1
) &
SERVER_PID=$!

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]] && kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" >/dev/null 2>&1 || true
  fi
  rm -f "$BUILD_LOG" "$SERVER_LOG"
}
trap cleanup EXIT

server_ready=0
for _ in {1..60}; do
  if curl -s -o /dev/null "${BASE_URL}/wiki"; then
    server_ready=1
    break
  fi
  sleep 1
done

if [[ "$server_ready" -ne 1 ]]; then
  echo "[wiki:verify] ERROR: local server did not start."
  cat "$SERVER_LOG"
  exit 1
fi

echo "[wiki:verify] Checking wiki routes and redirects..."
assert_http_code "/wiki" "200"
assert_http_code "/wiki/${first_slug}" "200"
assert_http_code "/wiki/theme/${first_theme}" "200"
assert_http_code "/wiki/platform/${first_platform}" "200"
assert_http_code "/wiki/slug-inconnu-seo-check" "404"

assert_redirect_301 "/wiki/blog" "/wiki"
assert_redirect_301 "/wiki/blog/${first_slug}" "/wiki/${first_slug}"
assert_redirect_301 "/wiki/blog/theme/${first_theme}" "/wiki/theme/${first_theme}"
assert_redirect_301 "/wiki/blog/platform/${first_platform}" "/wiki/platform/${first_platform}"

echo "[wiki:verify] Checking crawlable links and article HTML..."
index_html="$(curl -sS "${BASE_URL}/wiki")"
theme_html="$(curl -sS "${BASE_URL}/wiki/theme/${first_theme}")"
article_html="$(curl -sS "${BASE_URL}/wiki/${first_slug}")"

if ! printf "%s" "$index_html" | rg -q '<a[^>]+href="/wiki/theme/'; then
  echo "[wiki:verify] ERROR: /wiki does not expose crawlable theme anchors."
  exit 1
fi
if ! printf "%s" "$index_html" | rg -q '<a[^>]+href="/wiki/platform/'; then
  echo "[wiki:verify] ERROR: /wiki does not expose crawlable platform anchors."
  exit 1
fi
if ! printf "%s" "$theme_html" | rg -q '<a[^>]+href="/wiki/'; then
  echo "[wiki:verify] ERROR: /wiki/theme/${first_theme} does not expose crawlable article anchors."
  exit 1
fi
if ! printf "%s" "$article_html" | rg -F -q "$first_title"; then
  echo "[wiki:verify] ERROR: article title not visible in initial HTML for /wiki/${first_slug}."
  exit 1
fi

if printf "%s" "$index_html" "$theme_html" "$article_html" | rg -qi 'application/ld\+json'; then
  echo "[wiki:verify] ERROR: JSON-LD detected in wiki HTML."
  exit 1
fi

echo "[wiki:verify] Checking wiki sitemap coverage..."
wiki_sitemap="$(curl -sS "${BASE_URL}/wiki/sitemap.xml")"
sitemap_origin="$(printf "%s" "$wiki_sitemap" | rg -o '<loc>https?://[^<]+/wiki</loc>' | head -n 1 | sed -E 's#<loc>(https?://[^<]+)/wiki</loc>#\1#')"

if [[ -z "$sitemap_origin" ]]; then
  echo "[wiki:verify] ERROR: unable to resolve canonical origin from /wiki/sitemap.xml."
  exit 1
fi

if ! printf "%s" "$wiki_sitemap" | rg -F -q "<loc>${sitemap_origin}/wiki</loc>"; then
  echo "[wiki:verify] ERROR: canonical /wiki missing from /wiki/sitemap.xml."
  exit 1
fi

while IFS= read -r slug; do
  [[ -z "$slug" ]] && continue
  if ! printf "%s" "$wiki_sitemap" | rg -F -q "<loc>${sitemap_origin}/wiki/${slug}</loc>"; then
    echo "[wiki:verify] ERROR: slug '${slug}' missing from /wiki/sitemap.xml."
    exit 1
  fi
done <<< "$source_slugs"

echo "[wiki:verify] OK."
