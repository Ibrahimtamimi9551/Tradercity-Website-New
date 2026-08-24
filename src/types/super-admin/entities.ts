/**
 * Placeholder entity contracts for Super Admin.
 * Phase 0: identifiers only — expand fields when a phase ships real UI/API contracts.
 * See docs/Super Admin/05_Backend/DATA_CONTRACTS.md
 */

/** TODO(Phase 01): gross/net/period/growth/topPlans */
export type RevenueSummary = {
  id: string;
};

/** TODO(Phase 06): network, address, status */
export type Wallet = {
  id: string;
};

/** TODO(Phase 06): type, direction, amount, occurredAt */
export type LedgerEntry = {
  id: string;
};

/** TODO(Phase 05): liability, period amounts */
export type Commission = {
  id: string;
};

/** TODO(Phase 04): credits outstanding, redeem volume */
export type ReferralSummary = {
  id: string;
};

/** TODO(Phase 06 / Payment Operations): amount, status, occurredAt */
export type PaymentSummary = {
  id: string;
};
