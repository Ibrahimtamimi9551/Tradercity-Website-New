import type { LucideIcon } from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Shown in the mobile bottom bar (Members section primaries only for now). */
  mobilePrimary?: boolean;
  /**
   * When true, item is visible in nav but not navigable (Content Platform IA).
   * Prefer omitting href usage in UI when comingSoon.
   */
  comingSoon?: boolean;
  /**
   * Section dashboards (`/admin`, `/admin/analysts`) must use exact pathname match
   * so nested routes do not keep the dashboard item active.
   */
  exactMatch?: boolean;
};

/** Admin sidebar / More-sheet section (UI noun: Members, Analysts, Content). */
export type AdminNavDomain = {
  id: string;
  label: string;
  items: AdminNavItem[];
};

export type AdminRole = "super_admin" | "admin";
