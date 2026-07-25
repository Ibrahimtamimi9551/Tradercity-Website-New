import type { AnalystDashboardUiState } from "@/analyst/dashboard/state/dashboard-ui-state";
import type { AnalystDashboardProjection } from "@/analyst/dashboard/types";

/**
 * Merge UI-only mock overlays onto the Management projection for display.
 * Does not mutate Analyst Management or the service layer.
 */
export function mergeDisplayProjection(
  projection: AnalystDashboardProjection,
  ui: AnalystDashboardUiState
): AnalystDashboardProjection {
  let next = projection;

  if (ui.walletOverride) {
    next = {
      ...next,
      payout: {
        ...next.payout,
        walletAddress: ui.walletOverride,
      },
      requestStatus: next.requestStatus.invoice
        ? {
            ...next.requestStatus,
            invoice: {
              ...next.requestStatus.invoice,
              walletAddress: ui.walletOverride,
            },
          }
        : next.requestStatus,
    };
  }

  if (ui.mockPayoutRequest) {
    next = {
      ...next,
      payout: {
        ...next.payout,
        statusLabel: "Already Requested",
        windowState: "already_requested",
        requestEligible: false,
        requestButtonLabel: "Already Requested",
      },
      requestStatus: ui.mockPayoutRequest,
    };
  }

  return next;
}
