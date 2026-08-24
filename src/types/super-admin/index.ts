export type {
  SuperAdminNavItem,
  SuperAdminNavSection,
  SuperAdminPermissionKey,
} from "./navigation";

export type {
  RevenueSummary,
  Wallet,
  LedgerEntry,
  Commission,
  ReferralSummary,
  PaymentSummary,
} from "./entities";

export type SuperAdminStatus =
  | "active"
  | "inactive"
  | "pending"
  | "healthy"
  | "warning"
  | "critical";
