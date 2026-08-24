import type { AdminRole } from "@/types/admin/navigation";

/**
 * DEV MOCK ONLY — TODO(NestJS): resolve Admin Portal role from session claims.
 *
 * Flip this constant to `"admin"` or `"moderator"` to verify the Support nav
 * hides Super Admin Control Centre for non–Super Admin roles.
 */
export const DEV_MOCK_ADMIN_PORTAL_ROLE: AdminRole = "super_admin";

export function useAdminPortalRole(): AdminRole {
  return DEV_MOCK_ADMIN_PORTAL_ROLE;
}

/** True only for Super Admin — used for Support-nav entry gating. */
export function isSuperAdminRole(role: AdminRole): boolean {
  return role === "super_admin";
}

export function canSeeAdminNavItem(role: AdminRole, requiresRole?: AdminRole): boolean {
  if (!requiresRole) return true;
  return role === requiresRole;
}
