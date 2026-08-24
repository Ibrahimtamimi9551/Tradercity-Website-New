import type { SuperAdminPermissionKey } from "@/types/super-admin";

/**
 * Future permission registry — not enforced in Phase 0.
 * Wire to auth/RBAC when Super Admin access control ships.
 */
export const SUPER_ADMIN_PERMISSIONS: Record<
  SuperAdminPermissionKey,
  { key: SuperAdminPermissionKey; label: string; description: string }
> = {
  "super_admin.access": {
    key: "super_admin.access",
    label: "Access Company Control Centre",
    description: "Enter the Super Admin application shell.",
  },
  "super_admin.financial.read": {
    key: "super_admin.financial.read",
    label: "Read Financial Command Centre",
    description: "View financial module stubs and future finance data.",
  },
  "super_admin.reports.read": {
    key: "super_admin.reports.read",
    label: "Read Company Reports",
    description: "View company reporting surfaces.",
  },
  "super_admin.settings.read": {
    key: "super_admin.settings.read",
    label: "Read Platform Settings",
    description: "View platform settings surfaces.",
  },
};
