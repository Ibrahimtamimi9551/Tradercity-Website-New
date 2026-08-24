/** Central route map — never hardcode Super Admin paths in page bodies. */
export const SUPER_ADMIN_ROUTES = {
  root: "/super-admin",
  dashboard: "/super-admin",
  financial: {
    revenue: "/super-admin/financial/revenue",
    memberRevenue: "/super-admin/financial/member-revenue",
    analystRevenue: "/super-admin/financial/analyst-revenue",
    referralEconomy: "/super-admin/financial/referral-economy",
    commissionCentre: "/super-admin/financial/commission-centre",
    walletTreasury: "/super-admin/financial/wallet-treasury",
    paymentOperations: "/super-admin/financial/payment-operations",
    financialLedger: "/super-admin/financial/financial-ledger",
  },
  reports: "/super-admin/reports",
  settings: "/super-admin/settings",
} as const;

export type SuperAdminRouteKey =
  | "dashboard"
  | "revenue"
  | "memberRevenue"
  | "analystRevenue"
  | "referralEconomy"
  | "commissionCentre"
  | "walletTreasury"
  | "paymentOperations"
  | "financialLedger"
  | "reports"
  | "settings";
