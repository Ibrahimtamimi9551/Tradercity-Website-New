"use client";

import { ChevronDown, ClipboardList, Download } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { ModulePanel } from "@/analyst/dashboard/surfaces/ModulePanel";
import { Badge } from "@/analyst/dashboard/ui/Badge";
import { Button } from "@/analyst/dashboard/ui/Button";
import { EmptyState } from "@/analyst/dashboard/ui/EmptyState";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";
import { formatUsdPrecise } from "@/analyst/dashboard/utils/format";

export function RequestStatusModule() {
  const { display, isLoading, ui, dispatchUi } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={2} />;

  const { requestStatus } = display;
  const open = ui.requestInvoiceOpen;

  return (
    <ModulePanel
      title="Request Status"
      icon={ClipboardList}
      personality="default"
      subtitle="Track your current payout request"
      action={
        requestStatus.hasActiveRequest ? (
          <Button
            variant="ghost"
            className="!min-h-9 !px-2 text-xs"
            onClick={() => dispatchUi({ type: "toggle_request_invoice" })}
          >
            {open ? "Hide invoice" : "Invoice breakdown"}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </Button>
        ) : null
      }
    >
      {!requestStatus.hasActiveRequest ? (
        <EmptyState
          icon={ClipboardList}
          title="No active payout request"
          description="You'll see submission, review, and payment progress here after you request a payout during the window."
          actionLabel="Open Payout Center"
          onAction={() => {
            document
              .getElementById("analyst-payout-center")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      ) : (
        <>
          <ol className="space-y-0">
            {requestStatus.timeline.map((step, index) => (
              <li key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className="mt-1.5 h-2.5 w-2.5 rounded-full"
                    style={{
                      background:
                        step.state === "upcoming"
                          ? "rgba(255,255,255,0.2)"
                          : step.state === "current"
                            ? analystTheme.warning
                            : analystTheme.success,
                      boxShadow:
                        step.state === "upcoming"
                          ? undefined
                          : `0 0 8px ${
                              step.state === "current"
                                ? analystTheme.warning
                                : analystTheme.success
                            }`,
                    }}
                  />
                  {index < requestStatus.timeline.length - 1 ? (
                    <span className="my-1 w-px flex-1 bg-white/10" />
                  ) : null}
                </div>
                <div className="pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-white">
                      {step.label}
                    </p>
                    {step.state === "current" ? (
                      <Badge tone="warning">In progress</Badge>
                    ) : null}
                    {step.state === "complete" && step.id === "paid" ? (
                      <Badge tone="success">Paid</Badge>
                    ) : null}
                  </div>
                  {step.detail ? (
                    <p className="mt-0.5 text-xs text-white/45">{step.detail}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          {requestStatus.amountUsd !== null ? (
            <p className="text-sm text-white/60">
              Amount:{" "}
              <span
                className="font-semibold"
                style={{ color: analystTheme.success }}
              >
                {formatUsdPrecise(requestStatus.amountUsd)}
              </span>{" "}
              · {requestStatus.estimatedProcessingLabel}
            </p>
          ) : null}

          <div className="analyst-expand" data-open={open}>
            <div>
              {requestStatus.invoice ? (
                <div
                  className="mt-4 rounded-xl border p-4"
                  style={{
                    borderColor: analystTheme.cardBorder,
                    background: "rgba(0,0,0,0.28)",
                  }}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                      Invoice Breakdown
                    </p>
                    <Button variant="ghost" className="!min-h-9 !px-2 text-xs">
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex justify-between gap-3">
                      <span>Monthly Membership Earnings</span>
                      <span>
                        USDT {requestStatus.invoice.monthlyUsd.toFixed(0)}
                      </span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span>Quarterly Membership Earnings</span>
                      <span>
                        USDT {requestStatus.invoice.quarterlyUsd.toFixed(0)}
                      </span>
                    </li>
                    <li className="flex justify-between gap-3">
                      <span>Yearly Membership Earnings</span>
                      <span>
                        USDT {requestStatus.invoice.yearlyUsd.toFixed(0)}
                      </span>
                    </li>
                    <li className="flex justify-between gap-3 border-t border-white/10 pt-2 font-semibold text-white">
                      <span>Total Commission</span>
                      <span style={{ color: analystTheme.success }}>
                        USDT {requestStatus.invoice.totalUsd.toFixed(0)}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 space-y-1 text-xs text-white/45">
                    <p>
                      Wallet:{" "}
                      <span className="break-all text-white/70">
                        {requestStatus.invoice.walletAddress ?? "—"}
                      </span>
                    </p>
                    <p>
                      Request date: {requestStatus.invoice.requestDateLabel}
                    </p>
                    <p>
                      Transaction hash:{" "}
                      {requestStatus.invoice.transactionHash ??
                        "Pending payment"}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </ModulePanel>
  );
}
