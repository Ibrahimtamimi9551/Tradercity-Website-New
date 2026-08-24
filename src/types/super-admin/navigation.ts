import type { LucideIcon } from "lucide-react";

export type SuperAdminNavItem = {
  id: string;
  label: string;
  /** Omit or use `#` when `comingSoon` — item is not navigable. */
  href: string;
  icon: LucideIcon;
  exactMatch?: boolean;
  /** Routes to a Phase 0 stub page (structure only). */
  stub?: boolean;
  /** Visible label only — no route yet. */
  comingSoon?: boolean;
  /** Future permission key — not enforced in Phase 0. */
  permissionKey?: string;
};

export type SuperAdminNavSection = {
  id: string;
  label: string;
  /** When true, items render as a nested group under the section label. */
  collapsible?: boolean;
  defaultOpen?: boolean;
  items: SuperAdminNavItem[];
};

/** Placeholder role keys for future RBAC (not enforced in Phase 0). */
export type SuperAdminPermissionKey =
  | "super_admin.access"
  | "super_admin.financial.read"
  | "super_admin.reports.read"
  | "super_admin.settings.read";
