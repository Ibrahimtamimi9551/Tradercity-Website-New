export type AdminTheme = "dark" | "light";

export const ADMIN_THEME_STORAGE_KEY = "tradiercity-admin-theme";
export const ADMIN_THEME_EVENT = "tradiercity-admin-theme-change";

export function isAdminTheme(value: unknown): value is AdminTheme {
  return value === "dark" || value === "light";
}

export function readStoredAdminTheme(): AdminTheme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(ADMIN_THEME_STORAGE_KEY);
    return isAdminTheme(stored) ? stored : "dark";
  } catch {
    return "dark";
  }
}

export function writeStoredAdminTheme(theme: AdminTheme) {
  try {
    window.localStorage.setItem(ADMIN_THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore quota / private-mode failures — theme still applies for the session.
  }
}

/** Stamp theme on html, body, and every admin shell — immediate, no React wait. */
export function applyAdminThemeAttribute(theme: AdminTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.adminTheme = theme;
  document.documentElement.style.colorScheme = theme;
  if (document.body) {
    document.body.dataset.adminTheme = theme;
    document.body.style.colorScheme = theme;
  }
  document.querySelectorAll<HTMLElement>(".admin-shell").forEach((el) => {
    el.dataset.adminTheme = theme;
    el.style.colorScheme = theme;
  });
}

export function commitAdminTheme(theme: AdminTheme) {
  writeStoredAdminTheme(theme);
  applyAdminThemeAttribute(theme);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(ADMIN_THEME_EVENT, { detail: theme }));
  }
}

export function toggleStoredAdminTheme(): AdminTheme {
  const next: AdminTheme = readStoredAdminTheme() === "dark" ? "light" : "dark";
  commitAdminTheme(next);
  return next;
}

export function subscribeAdminTheme(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const handler = () => onStoreChange();
  window.addEventListener(ADMIN_THEME_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(ADMIN_THEME_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
