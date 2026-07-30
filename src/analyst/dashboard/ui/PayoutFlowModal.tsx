"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { Button } from "@/analyst/dashboard/ui/Button";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";
import { formatUsdPrecise } from "@/analyst/dashboard/utils/format";
import type { RequestStatusSlice } from "@/analyst/dashboard/types";

export function PayoutFlowModal() {
  const { ui, dispatchUi, display } = useAnalystDashboardContext();

  if (!display || ui.payoutFlowStep === "idle") return null;

  const amount = display.payout.availableUsd;
  const wallet = display.payout.walletAddress;

  const confirm = () => {
    dispatchUi({ type: "set_payout_step", step: "loading" });
    window.setTimeout(() => {
      const request: RequestStatusSlice = {
        hasActiveRequest: true,
        emptyNote: "",
        amountUsd: amount,
        estimatedProcessingLabel: "1–3 Business Days",
        timeline: [
          {
            id: "submitted",
            label: "Submitted",
            detail: new Date().toLocaleString(),
            state: "complete",
          },
          {
            id: "under_review",
            label: "Under Review",
            detail: `USDT ${amount.toFixed(0)} · Estimated Processing 1–3 Business Days`,
            state: "current",
          },
          {
            id: "paid",
            label: "Paid",
            detail: null,
            state: "upcoming",
          },
        ],
        invoice: {
          monthlyUsd: display.commissionOverview.breakdown[0]?.earningsUsd ?? 0,
          quarterlyUsd:
            display.commissionOverview.breakdown[1]?.earningsUsd ?? 0,
          yearlyUsd: display.commissionOverview.breakdown[2]?.earningsUsd ?? 0,
          totalUsd: amount,
          walletAddress: wallet,
          requestDateLabel: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          transactionHash: null,
        },
      };
      dispatchUi({ type: "submit_payout_success", request });
    }, 1100);
  };

  return (
    <div className="analyst-modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-4 backdrop-blur-sm sm:items-center">
      <div
        className="w-full max-w-md rounded-2xl border p-5 md:p-6"
        style={{
          borderColor: "rgba(245,215,110,0.3)",
          background: "rgba(10, 14, 24, 0.98)",
        }}
        role="dialog"
        aria-labelledby="payout-flow-title"
      >
        {ui.payoutFlowStep === "confirm" ? (
          <>
            <h3
              id="payout-flow-title"
              className="text-base font-semibold text-white"
            >
              Confirm payout request
            </h3>
            <p className="mt-2 text-sm text-white/55">
              You are requesting{" "}
              <span className="font-semibold text-white">
                {formatUsdPrecise(amount)}
              </span>{" "}
              to your BEP-20 wallet.
            </p>
            <p className="mt-3 break-all rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-white/70">
              {wallet ?? "No wallet on file"}
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="secondary"
                onClick={() => dispatchUi({ type: "close_payout_flow" })}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={confirm} disabled={!wallet}>
                Confirm Request
              </Button>
            </div>
          </>
        ) : null}

        {ui.payoutFlowStep === "loading" ? (
          <div className="flex flex-col items-center py-8 text-center">
            <Loader2
              className="mb-4 h-8 w-8 animate-spin"
              style={{ color: analystTheme.accentMuted }}
            />
            <p className="text-sm font-medium text-white">
              Submitting payout request…
            </p>
            <p className="mt-1 text-xs text-white/45">
              Creating request for Admin review
            </p>
          </div>
        ) : null}

        {ui.payoutFlowStep === "success" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2
              className="mb-3 h-10 w-10"
              style={{ color: analystTheme.success }}
            />
            <h3 className="text-base font-semibold text-white">
              Request submitted
            </h3>
            <p className="mt-2 text-sm text-white/55">
              Track progress in Request Status below.
            </p>
            <Button
              variant="primary"
              className="mt-5"
              onClick={() => dispatchUi({ type: "close_payout_flow" })}
            >
              View Request Status
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
