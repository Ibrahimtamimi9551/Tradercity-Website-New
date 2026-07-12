import type { LucideIcon } from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  mobilePrimary?: boolean;
};

export type AdminRole = "super_admin" | "admin";
