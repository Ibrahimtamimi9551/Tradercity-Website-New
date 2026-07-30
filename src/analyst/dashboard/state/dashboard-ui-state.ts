/**
 * UI-only state for the Partner Analyst Dashboard.
 * Business data lives in the Analyst Dashboard Service projection.
 */

import type { RequestStatusSlice } from "@/analyst/dashboard/types";

export type PayoutFlowStep =
  | "idle"
  | "confirm"
  | "loading"
  | "success";

export type WalletFlowStatus =
  | "idle"
  | "confirm"
  | "saving"
  | "success"
  | "error";

export type AnalystDashboardUiState = {
  commissionBreakdownOpen: boolean;
  requestInvoiceOpen: boolean;
  payoutHistoryOpen: boolean;
  payoutFlowStep: PayoutFlowStep;
  walletModalOpen: boolean;
  walletDraft: string;
  walletStatus: WalletFlowStatus;
  walletError: string | null;
  /** Local mock override — NestJS will persist. */
  walletOverride: string | null;
  /** Local mock request after successful payout flow. */
  mockPayoutRequest: RequestStatusSlice | null;
};

export const initialDashboardUiState: AnalystDashboardUiState = {
  commissionBreakdownOpen: false,
  requestInvoiceOpen: false,
  payoutHistoryOpen: false,
  payoutFlowStep: "idle",
  walletModalOpen: false,
  walletDraft: "",
  walletStatus: "idle",
  walletError: null,
  walletOverride: null,
  mockPayoutRequest: null,
};

export type DashboardUiAction =
  | { type: "toggle_commission_breakdown" }
  | { type: "toggle_request_invoice" }
  | { type: "toggle_payout_history" }
  | { type: "open_payout_confirm" }
  | { type: "set_payout_step"; step: PayoutFlowStep }
  | { type: "close_payout_flow" }
  | { type: "open_wallet_modal"; currentAddress: string | null }
  | { type: "close_wallet_modal" }
  | { type: "set_wallet_draft"; value: string }
  | { type: "set_wallet_status"; status: WalletFlowStatus; error?: string | null }
  | { type: "save_wallet_success"; address: string }
  | { type: "submit_payout_success"; request: RequestStatusSlice };

export function dashboardUiReducer(
  state: AnalystDashboardUiState,
  action: DashboardUiAction
): AnalystDashboardUiState {
  switch (action.type) {
    case "toggle_commission_breakdown":
      return {
        ...state,
        commissionBreakdownOpen: !state.commissionBreakdownOpen,
      };
    case "toggle_request_invoice":
      return { ...state, requestInvoiceOpen: !state.requestInvoiceOpen };
    case "toggle_payout_history":
      return { ...state, payoutHistoryOpen: !state.payoutHistoryOpen };
    case "open_payout_confirm":
      return { ...state, payoutFlowStep: "confirm" };
    case "set_payout_step":
      return { ...state, payoutFlowStep: action.step };
    case "close_payout_flow":
      return { ...state, payoutFlowStep: "idle" };
    case "open_wallet_modal":
      return {
        ...state,
        walletModalOpen: true,
        walletDraft: action.currentAddress ?? "",
        walletStatus: "idle",
        walletError: null,
      };
    case "close_wallet_modal":
      return {
        ...state,
        walletModalOpen: false,
        walletStatus: "idle",
        walletError: null,
      };
    case "set_wallet_draft":
      return { ...state, walletDraft: action.value, walletError: null };
    case "set_wallet_status":
      return {
        ...state,
        walletStatus: action.status,
        walletError: action.error ?? null,
      };
    case "save_wallet_success":
      return {
        ...state,
        walletOverride: action.address,
        walletStatus: "success",
        walletError: null,
      };
    case "submit_payout_success":
      return {
        ...state,
        mockPayoutRequest: action.request,
        payoutFlowStep: "success",
        requestInvoiceOpen: true,
      };
    default:
      return state;
  }
}

/** Basic BEP-20 / EVM address check for mock validation. */
export function isValidBep20Address(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address.trim());
}
