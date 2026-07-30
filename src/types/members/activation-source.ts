/**
 * Membership activation sources — every path converges into one Membership lifecycle.
 * Operational modules may own source-specific validation; Membership remains SoT.
 */
export type MembershipActivationSource =
  | "crypto_payment"
  | "manual_payment"
  | "referral_redeem"
  | "admin_grant"
  | "future_grant";

export const MEMBERSHIP_ACTIVATION_SOURCE_LABELS: Record<
  MembershipActivationSource,
  string
> = {
  crypto_payment: "Crypto Payment",
  manual_payment: "Manual Payment",
  referral_redeem: "Referral Redeem",
  admin_grant: "Admin Grant",
  future_grant: "Future Grant",
};
