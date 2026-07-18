/**
 * Canonical Admin directory breakpoints.
 *
 * Contract:
 * - `md` (768): density — card list vs table (presentation only)
 * - `lg` (1024): master–detail — side panel vs full-page detail route
 *
 * Panel visibility (CSS) and route-vs-panel navigation (JS) must both use `lg`.
 */

export const ADMIN_MD = 768;
export const ADMIN_LG = 1024;

/** CSS / matchMedia query: viewport has the desktop side panel. */
export const ADMIN_DESKTOP_MQ = `(min-width: ${ADMIN_LG}px)`;

/** CSS / matchMedia query: viewport uses full-page detail instead of a side panel. */
export const ADMIN_DETAIL_ROUTE_MQ = `(max-width: ${ADMIN_LG - 1}px)`;

export function isAdminDesktop(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(ADMIN_DESKTOP_MQ).matches;
}

export function matchAdminDesktop(): MediaQueryList | null {
  if (typeof window === "undefined") return null;
  return window.matchMedia(ADMIN_DESKTOP_MQ);
}
