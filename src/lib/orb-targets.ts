import type { OrbTargetVariant } from "@/components/home/orb/OrbTransitionProvider";

/**
 * Resolves an internal href to the orb field variant it belongs to, or null
 * when the destination has no orb identity (wiki, studio, services, legal…).
 *
 * Only orb-cluster destinations (home, brands, talents showcase pages and
 * their contact forms) get the orb morph transition; everything else falls
 * back to the standard page transition.
 */
export function resolveOrbTarget(href: string): OrbTargetVariant | null {
  // Anchors, external URLs and mail/tel links never morph.
  if (!href.startsWith("/")) return null;

  // Strip query/hash before matching.
  const path = href.split("#")[0].split("?")[0];

  if (path === "/") return "home";
  if (path === "/for-brands" || path === "/for-brands/") return "brands";
  if (path === "/for-talents" || path === "/for-talents/") return "talents";
  if (path === "/contact/brands") return "brands";
  if (path === "/contact/talents") return "talents";

  return null;
}

/**
 * True when the click should bypass any interception and let the browser
 * handle it natively (new tab, window…).
 */
export function isModifiedClick(event: {
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  button?: number;
}): boolean {
  return Boolean(
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    (event.button !== undefined && event.button !== 0)
  );
}
