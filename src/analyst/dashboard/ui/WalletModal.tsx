"use client";

import { useEffect } from "react";
import { CheckCircle2, Wallet } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { isValidBep20Address } from "@/analyst/dashboard/state/dashboard-ui-state";
import { Button } from "@/analyst/dashboard/ui/Button";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

export function WalletModal() {
  const { ui, dispatchUi, display } = useAnalystDashboardContext();

  useEffect(() => {
    if (ui.walletStatus !== "success") return;
    const t = window.setTimeout(() => {
      dispatchUi({ type: "close_wallet_modal" });
    }, 1400);
    return () => window.clearTimeout(t);
  }, [ui.walletStatus, dispatchUi]);

  if (!ui.walletModalOpen) return null;

  const address = ui.walletDraft.trim();

  const continueToConfirm = () => {
    if (!isValidBep20Address(address)) {
      dispatchUi({
        type: "set_wallet_status",
        status: "error",
        error: "Enter a valid BEP-20 address (0x + 40 hex characters).",
      });
      return;
    }
    dispatchUi({ type: "set_wallet_status", status: "confirm" });
  };

  const confirmSave = () => {
    dispatchUi({ type: "set_wallet_status", status: "saving" });
    window.setTimeout(() => {
      dispatchUi({ type: "save_wallet_success", address });
    }, 750);
  };

  return (
    <div className="analyst-modal-backdrop fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-sm sm:items-center">
      <div
        className="my-auto w-full max-w-md rounded-2xl border p-5 shadow-2xl md:p-6"
        style={{
          borderColor: analystTheme.accentBorder,
          background: "rgba(10, 14, 24, 0.98)",
        }}
        role="dialog"
        aria-labelledby="wallet-modal-title"
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{
              borderColor: analystTheme.accentBorder,
              background: analystTheme.accentSoft,
              color: analystTheme.accentMuted,
            }}
          >
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h3
              id="wallet-modal-title"
              className="text-base font-semibold text-white"
            >
              {ui.walletStatus === "confirm"
                ? "Confirm wallet"
                : ui.walletStatus === "success"
                  ? "Wallet updated"
                  : "Edit Wallet"}
            </h3>
            <p className="text-xs text-white/45">
              USDT on BNB Smart Chain (BEP-20) only
            </p>
          </div>
        </div>

        {ui.walletStatus === "success" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2
              className="mb-3 h-10 w-10"
              style={{ color: analystTheme.success }}
            />
            <p className="text-sm font-medium text-white">
              Wallet saved successfully
            </p>
            <p className="mt-1 break-all font-mono text-xs text-white/50">
              {ui.walletOverride}
            </p>
          </div>
        ) : ui.walletStatus === "confirm" ? (
          <>
            <p className="text-sm text-white/60">
              Confirm this BEP-20 address will receive USDT payouts:
            </p>
            <p className="mt-3 break-all rounded-lg border border-white/10 bg-black/40 px-3 py-3 font-mono text-xs text-white/85">
              {address}
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="secondary"
                onClick={() =>
                  dispatchUi({ type: "set_wallet_status", status: "idle" })
                }
              >
                Back
              </Button>
              <Button
                variant="primary"
                loading={false}
                onClick={confirmSave}
              >
                Confirm & Save
              </Button>
            </div>
          </>
        ) : ui.walletStatus === "saving" ? (
          <div className="flex flex-col items-center py-8">
            <span className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-purple-300" />
            <p className="text-sm text-white/70">Saving wallet…</p>
          </div>
        ) : (
          <>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-white/40">
              BEP-20 Address
            </label>
            <input
              value={ui.walletDraft}
              onChange={(e) =>
                dispatchUi({ type: "set_wallet_draft", value: e.target.value })
              }
              placeholder={display?.payout.walletAddress ?? "0x…"}
              className="min-h-11 w-full rounded-lg border border-white/15 bg-black/40 px-3 font-mono text-sm text-white outline-none focus:border-purple-400/50"
              autoComplete="off"
              spellCheck={false}
            />

            {ui.walletError ? (
              <p className="mt-2 text-xs" style={{ color: analystTheme.error }}>
                {ui.walletError}
              </p>
            ) : (
              <p className="mt-2 text-xs text-white/40">
                Format: 0x followed by 40 hexadecimal characters.
              </p>
            )}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="secondary"
                onClick={() => dispatchUi({ type: "close_wallet_modal" })}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={continueToConfirm}>
                Continue
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
