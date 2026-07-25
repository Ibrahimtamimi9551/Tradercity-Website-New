"use client";

import { Wallet } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import {
  MetricCell,
  ModulePanel,
} from "@/analyst/dashboard/surfaces/ModulePanel";
import { Badge } from "@/analyst/dashboard/ui/Badge";
import { Button } from "@/analyst/dashboard/ui/Button";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";
import { formatUsdPrecise } from "@/analyst/dashboard/utils/format";

export function PayoutModule() {
  const { display, isLoading, dispatchUi } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={3} />;

  const { payout } = display;
  const canRequest = payout.requestEligible;
  const statusTone =
    payout.windowState === "open"
      ? "success"
      : payout.windowState === "already_requested"
        ? "warning"
        : "neutral";

  return (
    <ModulePanel
      title="Payout Center"
      icon={Wallet}
      personality="payout"
      subtitle="How do I receive my earnings?"
    >
      <div
        className="mb-4 overflow-hidden rounded-xl border p-4 sm:p-5"
        style={{
          borderColor: "rgba(245,215,110,0.3)",
          background:
            "radial-gradient(ellipse 70% 80% at 0% 0%, rgba(155,93,229,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 100% 0%, rgba(245,215,110,0.12) 0%, transparent 50%), rgba(0,0,0,0.35)",
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
          Available Balance
        </p>
        <p
          className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: analystTheme.gold }}
        >
          {formatUsdPrecise(payout.availableUsd)}
        </p>
        <p className="mt-1 text-xs text-white/45">
          Ready for USDT (BEP-20) settlement
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <MetricCell
          label="Available For Payout"
          value={formatUsdPrecise(payout.availableUsd)}
          numericValue={payout.availableUsd}
          prefix="$"
          accent={analystTheme.gold}
        />
        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: analystTheme.insetBorder,
            background: analystTheme.insetBg,
          }}
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
            Status
          </p>
          <Badge tone={statusTone} pulse={payout.windowState === "open"}>
            {payout.statusLabel}
          </Badge>
          {payout.windowState === "open" ? (
            <p className="mt-2 text-xs text-emerald-300/80">Eligible · Ready</p>
          ) : null}
        </div>
        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: "rgba(245,215,110,0.25)",
            background: "rgba(245,215,110,0.08)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: analystTheme.gold }}
          >
            Payment Method
          </p>
          <p className="mt-2 text-lg font-bold text-white">{payout.tokenLabel}</p>
          <p className="mt-1 text-xs text-white/50">{payout.networkLabel}</p>
        </div>
      </div>

      <div
        className="mt-4 rounded-xl border p-4"
        style={{
          borderColor: analystTheme.accentBorder,
          background: "rgba(0,0,0,0.28)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Wallet
                className="h-4 w-4"
                style={{ color: analystTheme.accentMuted }}
              />
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                Wallet Address
              </p>
            </div>
            <p className="break-all font-mono text-sm text-white/90">
              {payout.walletAddress ?? "No wallet on file"}
            </p>
            <p className="mt-2 text-xs text-white/40">
              Payments are only sent through USDT (BEP-20).
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              dispatchUi({
                type: "open_wallet_modal",
                currentAddress: payout.walletAddress,
              })
            }
          >
            Edit Wallet
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-white/45">{payout.windowHelper}</p>
          <p className="mt-1 text-xs" style={{ color: analystTheme.gold }}>
            Next window: {payout.nextWindowLabel}
          </p>
        </div>
        <Button
          variant="primary"
          disabled={!canRequest}
          onClick={() => dispatchUi({ type: "open_payout_confirm" })}
          style={
            canRequest
              ? undefined
              : { boxShadow: "none", background: "rgba(255,255,255,0.06)" }
          }
        >
          {payout.requestButtonLabel}
        </Button>
      </div>
    </ModulePanel>
  );
}
