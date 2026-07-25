/** DEV MOCK ONLY helpers stay; swap callers to real auth later without changing this API. */

import { DEFAULT_POST_AUTH_PATH } from "./constants";

/**
 * Accept only same-origin relative paths.
 * Rejects protocol-relative (`//evil.com`), absolute URLs, and empty values.
 */
export function sanitizeReturnUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let decoded = raw.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return null;
  }
  if (!decoded.startsWith("/")) return null;
  if (decoded.startsWith("//")) return null;
  if (decoded.includes("://")) return null;
  if (decoded.includes("\\")) return null;
  return decoded;
}

export function buildLoginHref(options?: {
  returnUrl?: string | null;
  plan?: string | null;
  mode?: "login" | "register";
}): string {
  const params = new URLSearchParams();
  const safeReturn = sanitizeReturnUrl(options?.returnUrl ?? null);
  if (safeReturn) params.set("returnUrl", safeReturn);
  if (options?.plan) params.set("plan", options.plan);
  if (options?.mode === "register") params.set("mode", "register");
  const query = params.toString();
  return query ? `/login?${query}` : "/login";
}

/**
 * Post-auth destination priority:
 * 1. Safe returnUrl / next
 * 2. plan=vip → payment-activation
 * 3. Default free dashboard
 */
export function resolvePostAuthRedirect(input: {
  returnUrl?: string | null;
  next?: string | null;
  plan?: string | null;
}): string {
  const fromReturn =
    sanitizeReturnUrl(input.returnUrl) ?? sanitizeReturnUrl(input.next);
  if (fromReturn) return fromReturn;

  const plan = input.plan?.trim().toLowerCase();
  if (plan === "vip") return "/payment-activation";

  return DEFAULT_POST_AUTH_PATH;
}
