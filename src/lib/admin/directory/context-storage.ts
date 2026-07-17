/**
 * Persist directory browsing context across Control Center / detail navigations
 * when the list hook unmounts (e.g. Members → `/admin/members/[id]`).
 *
 * Master–detail modules (Discord) should prefer a layout-mounted provider instead;
 * use this for Control Center-style routes that intentionally remount.
 */

export type DirectoryContextSnapshot = {
  href: string;
  scrollY: number;
  savedAt: number;
};

const STORAGE_PREFIX = "tc.admin.directory.";

function storageKey(moduleKey: string) {
  return `${STORAGE_PREFIX}${moduleKey}`;
}

export function rememberDirectoryContext(
  moduleKey: string,
  snapshot: Omit<DirectoryContextSnapshot, "savedAt">
): void {
  if (typeof window === "undefined") return;
  try {
    const payload: DirectoryContextSnapshot = {
      ...snapshot,
      savedAt: Date.now(),
    };
    sessionStorage.setItem(storageKey(moduleKey), JSON.stringify(payload));
  } catch {
    // Private mode / quota — navigation still works without restore.
  }
}

export function peekDirectoryContext(
  moduleKey: string
): DirectoryContextSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(storageKey(moduleKey));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DirectoryContextSnapshot;
    if (typeof parsed.href !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function consumeDirectoryContext(
  moduleKey: string
): DirectoryContextSnapshot | null {
  const snapshot = peekDirectoryContext(moduleKey);
  if (typeof window === "undefined") return snapshot;
  try {
    sessionStorage.removeItem(storageKey(moduleKey));
  } catch {
    // ignore
  }
  return snapshot;
}

export function getDirectoryReturnHref(
  moduleKey: string,
  fallback: string
): string {
  return peekDirectoryContext(moduleKey)?.href ?? fallback;
}
