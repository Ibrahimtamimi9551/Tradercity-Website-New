import { SUPER_ADMIN_ROUTES } from "./routes";
import type { SuperAdminRouteKey } from "./routes";

export type SuperAdminPageMeta = {
  key: SuperAdminRouteKey;
  title: string;
  description: string;
  href: string;
  breadcrumb: string[];
};

export const SUPER_ADMIN_PAGES: Record<SuperAdminRouteKey, SuperAdminPageMeta> = {
  dashboard: {
    key: "dashboard",
    title: "Dashboard",
    description:
      "Executive overview for the Company Control Centre. Module surfaces will appear here in later phases.",
    href: SUPER_ADMIN_ROUTES.dashboard,
    breadcrumb: ["Company Control Centre", "Dashboard"],
  },
  revenue: {
    key: "revenue",
    title: "Revenue Dashboard",
    description:
      "Company-wide revenue command view. Financial summaries will plug in here — no calculations in Phase 0.",
    href: SUPER_ADMIN_ROUTES.financial.revenue,
    breadcrumb: ["Company Control Centre", "Financial Command Centre", "Revenue Dashboard"],
  },
  memberRevenue: {
    key: "memberRevenue",
    title: "Member Revenue",
    description: "Membership-attributed revenue breakdown. Placeholder until Phase 02.",
    href: SUPER_ADMIN_ROUTES.financial.memberRevenue,
    breadcrumb: ["Company Control Centre", "Financial Command Centre", "Member Revenue"],
  },
  analystRevenue: {
    key: "analystRevenue",
    title: "Analyst Revenue",
    description: "Analyst-attributed revenue breakdown. Placeholder until Phase 03.",
    href: SUPER_ADMIN_ROUTES.financial.analystRevenue,
    breadcrumb: ["Company Control Centre", "Financial Command Centre", "Analyst Revenue"],
  },
  referralEconomy: {
    key: "referralEconomy",
    title: "Referral Economy",
    description: "Executive referral-economy rollup. Placeholder until Phase 04.",
    href: SUPER_ADMIN_ROUTES.financial.referralEconomy,
    breadcrumb: ["Company Control Centre", "Financial Command Centre", "Referral Economy"],
  },
  commissionCentre: {
    key: "commissionCentre",
    title: "Commission Centre",
    description: "Executive commission liability overview. Placeholder until Phase 05.",
    href: SUPER_ADMIN_ROUTES.financial.commissionCentre,
    breadcrumb: ["Company Control Centre", "Financial Command Centre", "Commission Centre"],
  },
  walletTreasury: {
    key: "walletTreasury",
    title: "Wallet Treasury",
    description: "Treasury wallet visibility. Placeholder until Phase 06.",
    href: SUPER_ADMIN_ROUTES.financial.walletTreasury,
    breadcrumb: ["Company Control Centre", "Financial Command Centre", "Wallet Treasury"],
  },
  paymentOperations: {
    key: "paymentOperations",
    title: "Payment Operations",
    description: "Executive payment operations surface. Placeholder — no ops logic in Phase 0.",
    href: SUPER_ADMIN_ROUTES.financial.paymentOperations,
    breadcrumb: ["Company Control Centre", "Financial Command Centre", "Payment Operations"],
  },
  financialLedger: {
    key: "financialLedger",
    title: "Financial Ledger",
    description: "Ledger inspection surface. Placeholder until Phase 06.",
    href: SUPER_ADMIN_ROUTES.financial.financialLedger,
    breadcrumb: ["Company Control Centre", "Financial Command Centre", "Financial Ledger"],
  },
  reports: {
    key: "reports",
    title: "Company Reports",
    description: "Cross-company reporting hub. Placeholder for future report modules.",
    href: SUPER_ADMIN_ROUTES.reports,
    breadcrumb: ["Company Control Centre", "Company Reports"],
  },
  settings: {
    key: "settings",
    title: "Platform Settings",
    description: "Company-wide platform configuration. Placeholder for future settings modules.",
    href: SUPER_ADMIN_ROUTES.settings,
    breadcrumb: ["Company Control Centre", "Platform Settings"],
  },
};
