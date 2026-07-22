import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquare,
  Gift,
  Mic2,
  ClipboardList,
  BadgeCheck,
  Handshake,
  Coins,
  Home,
  FileText,
  BookOpen,
  LineChart,
  Newspaper,
  Calendar,
} from "lucide-react";
import type { AdminNavDomain, AdminNavItem } from "@/types/admin/navigation";

/** Members UI section — Member Platform / Member Domain. */
export const MEMBERS_NAV: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    mobilePrimary: true,
    exactMatch: true,
  },
  { label: "Members", href: "/admin/members", icon: Users, mobilePrimary: true },
  {
    label: "Subscriptions",
    href: "/admin/subscriptions",
    icon: CreditCard,
    mobilePrimary: true,
  },
  { label: "Discord", href: "/admin/discord", icon: MessageSquare },
  { label: "Referrals", href: "/admin/referrals", icon: Gift },
];

/** @deprecated Use MEMBERS_NAV — alias retained for gradual import migration. */
export const MEMBER_MANAGEMENT_NAV = MEMBERS_NAV;

/** Analysts UI section — Analyst Platform / Analyst Domain. */
export const ANALYSTS_NAV: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/analysts",
    icon: LayoutDashboard,
    exactMatch: true,
  },
  { label: "Directory", href: "/admin/analysts/directory", icon: Mic2 },
  { label: "Applications", href: "/admin/analysts/applications", icon: ClipboardList },
  { label: "Verification", href: "/admin/analysts/verification", icon: BadgeCheck },
  { label: "Partnerships", href: "/admin/analysts/partnerships", icon: Handshake },
  { label: "Commissions", href: "/admin/analysts/commissions", icon: Coins },
];

/** @deprecated Use ANALYSTS_NAV. */
export const ANALYST_MANAGEMENT_NAV = ANALYSTS_NAV;

/**
 * Content UI section — Content Platform / Content Domain.
 * Coming soon: no routes yet.
 */
export const CONTENT_NAV: AdminNavItem[] = [
  { label: "Homepage", href: "#content-homepage", icon: Home, comingSoon: true },
  { label: "Landing Pages", href: "#content-landing", icon: FileText, comingSoon: true },
  { label: "Learning", href: "#content-learning", icon: BookOpen, comingSoon: true },
  { label: "Research", href: "#content-research", icon: LineChart, comingSoon: true },
  { label: "Reports", href: "#content-reports", icon: Newspaper, comingSoon: true },
  { label: "Events", href: "#content-events", icon: Calendar, comingSoon: true },
];

/** @deprecated Use CONTENT_NAV. */
export const WEBSITE_MANAGEMENT_NAV = CONTENT_NAV;

export const ADMIN_NAV_DOMAINS: AdminNavDomain[] = [
  {
    id: "members",
    label: "Members",
    items: MEMBERS_NAV,
  },
  {
    id: "analysts",
    label: "Analysts",
    items: ANALYSTS_NAV,
  },
  {
    id: "content",
    label: "Content",
    items: CONTENT_NAV,
  },
];

/** Flat list of navigable items (excludes comingSoon). */
export const ADMIN_NAV_ITEMS: AdminNavItem[] = ADMIN_NAV_DOMAINS.flatMap((domain) =>
  domain.items.filter((item) => !item.comingSoon)
);

/** Mobile bottom-bar primaries (Members section only). */
export const MOBILE_PRIMARY_NAV = MEMBERS_NAV.filter((item) => item.mobilePrimary);

/**
 * Items shown in the mobile More sheet: non-primary Members items + Analysts
 * + Content coming-soon items.
 */
export const MOBILE_MORE_DOMAINS: AdminNavDomain[] = [
  {
    id: "members",
    label: "Members",
    items: MEMBERS_NAV.filter((item) => !item.mobilePrimary),
  },
  {
    id: "analysts",
    label: "Analysts",
    items: ANALYSTS_NAV,
  },
  {
    id: "content",
    label: "Content",
    items: CONTENT_NAV,
  },
];

/** @deprecated Prefer MOBILE_MORE_DOMAINS. */
export const MOBILE_MORE_NAV = MEMBERS_NAV.filter((item) => !item.mobilePrimary);

/**
 * Resolve which nav item is active. Domain dashboards use exact match;
 * other items prefer the longest matching href prefix.
 */
export function isAdminNavItemActive(pathname: string, item: AdminNavItem): boolean {
  if (item.comingSoon) return false;
  if (item.exactMatch || item.href === "/admin") {
    return pathname === item.href;
  }
  if (!pathname.startsWith(item.href)) return false;

  const longerMatch = ADMIN_NAV_ITEMS.some(
    (other) =>
      other.href !== item.href &&
      !other.exactMatch &&
      other.href.startsWith(item.href) &&
      pathname.startsWith(other.href) &&
      other.href.length > item.href.length
  );
  return !longerMatch;
}
