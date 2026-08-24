import {
  LayoutDashboard,
  LineChart,
  Users,
  Mic2,
  Gift,
  Coins,
  Wallet,
  CreditCard,
  BookOpen,
  FileBarChart2,
  Settings,
  Building2,
} from "lucide-react";
import type { SuperAdminNavItem, SuperAdminNavSection } from "@/types/super-admin";
import { SUPER_ADMIN_ROUTES } from "./routes";

/**
 * Company Control Centre navigation.
 * Financial Command Centre is the largest module group — not the root product name.
 */
export const SUPER_ADMIN_NAV_SECTIONS: SuperAdminNavSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: SUPER_ADMIN_ROUTES.dashboard,
        icon: LayoutDashboard,
        exactMatch: true,
        permissionKey: "super_admin.access",
      },
    ],
  },
  {
    id: "financial-command-centre",
    label: "Financial Command Centre",
    collapsible: true,
    defaultOpen: true,
    items: [
      {
        id: "revenue",
        label: "Revenue Dashboard",
        href: SUPER_ADMIN_ROUTES.financial.revenue,
        icon: LineChart,
        stub: true,
        permissionKey: "super_admin.financial.read",
      },
      {
        id: "member-revenue",
        label: "Member Revenue",
        href: SUPER_ADMIN_ROUTES.financial.memberRevenue,
        icon: Users,
        stub: true,
        permissionKey: "super_admin.financial.read",
      },
      {
        id: "analyst-revenue",
        label: "Analyst Revenue",
        href: SUPER_ADMIN_ROUTES.financial.analystRevenue,
        icon: Mic2,
        stub: true,
        permissionKey: "super_admin.financial.read",
      },
      {
        id: "referral-economy",
        label: "Referral Economy",
        href: SUPER_ADMIN_ROUTES.financial.referralEconomy,
        icon: Gift,
        stub: true,
        permissionKey: "super_admin.financial.read",
      },
      {
        id: "commission-centre",
        label: "Commission Centre",
        href: SUPER_ADMIN_ROUTES.financial.commissionCentre,
        icon: Coins,
        stub: true,
        permissionKey: "super_admin.financial.read",
      },
      {
        id: "wallet-treasury",
        label: "Wallet Treasury",
        href: SUPER_ADMIN_ROUTES.financial.walletTreasury,
        icon: Wallet,
        stub: true,
        permissionKey: "super_admin.financial.read",
      },
      {
        id: "payment-operations",
        label: "Payment Operations",
        href: SUPER_ADMIN_ROUTES.financial.paymentOperations,
        icon: CreditCard,
        stub: true,
        permissionKey: "super_admin.financial.read",
      },
      {
        id: "financial-ledger",
        label: "Financial Ledger",
        href: SUPER_ADMIN_ROUTES.financial.financialLedger,
        icon: BookOpen,
        stub: true,
        permissionKey: "super_admin.financial.read",
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    items: [
      {
        id: "reports",
        label: "Company Reports",
        href: SUPER_ADMIN_ROUTES.reports,
        icon: FileBarChart2,
        stub: true,
        permissionKey: "super_admin.reports.read",
      },
      {
        id: "settings",
        label: "Platform Settings",
        href: SUPER_ADMIN_ROUTES.settings,
        icon: Settings,
        stub: true,
        permissionKey: "super_admin.settings.read",
      },
    ],
  },
  {
    id: "future",
    label: "Future Modules",
    items: [
      {
        id: "future-placeholder",
        label: "Reserved for expansion",
        href: "#future-modules",
        icon: Building2,
        comingSoon: true,
        permissionKey: "super_admin.access",
      },
    ],
  },
];

/** Flat navigable items (excludes comingSoon placeholders). */
export const SUPER_ADMIN_NAV_ITEMS: SuperAdminNavItem[] = SUPER_ADMIN_NAV_SECTIONS.flatMap(
  (section) => section.items.filter((item) => !item.comingSoon)
);

export function isSuperAdminNavItemActive(
  pathname: string,
  item: SuperAdminNavItem
): boolean {
  if (item.comingSoon) return false;
  if (item.exactMatch || item.href === SUPER_ADMIN_ROUTES.dashboard) {
    return pathname === item.href || pathname === `${item.href}/`;
  }
  if (!pathname.startsWith(item.href)) return false;

  const longerMatch = SUPER_ADMIN_NAV_ITEMS.some(
    (other) =>
      other.href !== item.href &&
      !other.exactMatch &&
      other.href.startsWith(item.href) &&
      pathname.startsWith(other.href) &&
      other.href.length > item.href.length
  );
  return !longerMatch;
}
