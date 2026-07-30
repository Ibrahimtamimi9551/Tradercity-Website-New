"use client";

import Link from "next/link";
import { Check, Circle, TriangleAlert, X } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  provisioningOverallPresentation,
  type AnalystSystemProvisioning,
  type ProvisioningItem,
  type ProvisioningItemStatus,
} from "@/types/analysts/onboarding";

function formatLongDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ItemMark({ status }: { status: ProvisioningItemStatus }) {
  if (status === "ready") {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300"
        aria-label="Ready"
      >
        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-300"
        aria-label="Failed"
      >
        <X className="h-3 w-3" strokeWidth={2.5} aria-hidden />
      </span>
    );
  }
  if (status === "future") {
    return (
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center text-tc-muted/60"
        aria-label="Future"
      >
        <Circle className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      </span>
    );
  }
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center text-amber-200/80"
      aria-label="Pending"
    >
      <Circle className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

function domainHref(
  item: ProvisioningItem,
  provisioning: AnalystSystemProvisioning
): string | null {
  switch (item.domain) {
    case "discord":
      return provisioning.discordRecordId
        ? `/admin/analysts/discord?view=operations&discord=${provisioning.discordRecordId}`
        : "/admin/analysts/discord";
    case "control_center":
      return provisioning.controlCenterPath;
    case "directory":
      return "/admin/analysts/directory";
    case "applications":
      return `/admin/analysts/applications?view=queue&application=${provisioning.applicationId}&tab=decision`;
    default:
      return null;
  }
}

type SystemProvisioningPanelProps = {
  provisioning: AnalystSystemProvisioning | null;
  className?: string;
  /** Optional refresh when a failed item Retry is pressed (re-reads mock stores). */
  onRetry?: () => void;
};

export function SystemProvisioningPanel({
  provisioning,
  className,
  onRetry,
}: SystemProvisioningPanelProps) {
  if (!provisioning) {
    return (
      <div
        className={cn(
          modulePanelSurface("purple", "flex h-full min-h-[20rem] flex-col p-5"),
          className
        )}
      >
        <p className="text-sm text-tc-muted">
          Select an approved analyst to verify system provisioning.
        </p>
      </div>
    );
  }

  const overall = provisioningOverallPresentation(provisioning.overallStatus);

  return (
    <div
      className={cn(
        modulePanelSurface("purple", "flex h-full min-h-0 flex-col overflow-hidden"),
        className
      )}
    >
      <div className="space-y-5 overflow-y-auto p-4 sm:p-5">
        <header className="space-y-3 border-b border-white/10 pb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-violet-200/80">
            Application Approved
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            {provisioning.analystName}
          </h2>
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-tc-muted">Approved By</dt>
              <dd className="text-white/90">{provisioning.approvedBy}</dd>
            </div>
            <div>
              <dt className="text-tc-muted">Approved Date</dt>
              <dd className="text-white/90">{formatLongDate(provisioning.approvedAt)}</dd>
            </div>
          </dl>
        </header>

        <section className="space-y-3" aria-labelledby="system-init-heading">
          <h3
            id="system-init-heading"
            className="text-xs font-medium uppercase tracking-wide text-violet-200/80"
          >
            System Initialization
          </h3>
          <ul className="space-y-1">
            {provisioning.items.map((item) => {
              const href =
                item.status === "pending" || item.status === "failed"
                  ? domainHref(item, provisioning)
                  : null;
              return (
                <li
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-white/[0.03]"
                >
                  <ItemMark status={item.status} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p
                        className={cn(
                          "text-sm",
                          item.status === "future"
                            ? "text-tc-muted"
                            : item.status === "failed"
                              ? "text-rose-100"
                              : "text-white/90"
                        )}
                      >
                        {item.label}
                      </p>
                      {item.status === "future" ? (
                        <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-tc-muted">
                          Future
                        </span>
                      ) : null}
                    </div>
                    {item.note ? (
                      <p className="mt-0.5 text-xs text-tc-muted">{item.note}</p>
                    ) : null}
                    {item.status === "failed" && onRetry ? (
                      <button
                        type="button"
                        onClick={onRetry}
                        className="mt-1.5 text-xs font-medium text-rose-200 hover:text-rose-100"
                      >
                        Retry
                      </button>
                    ) : null}
                    {href && item.status !== "failed" ? (
                      <Link
                        href={href}
                        className="mt-1 inline-block text-xs text-violet-300 hover:text-violet-200"
                      >
                        Open {item.domain.replace(/_/g, " ")} →
                      </Link>
                    ) : null}
                    {href && item.status === "failed" ? (
                      <Link
                        href={href}
                        className="mt-1 ml-2 inline-block text-xs text-rose-200/90 hover:text-rose-100"
                      >
                        Open Discord →
                      </Link>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          className="space-y-2 border-t border-white/10 pt-4"
          aria-labelledby="overall-status-heading"
        >
          <h3
            id="overall-status-heading"
            className="text-xs font-medium uppercase tracking-wide text-violet-200/80"
          >
            Operational Status
          </h3>
          <div className="flex items-center gap-2.5">
            {overall.symbol === "✓" ? (
              <Check className="h-4 w-4 text-emerald-300" aria-hidden />
            ) : overall.symbol === "✗" ? (
              <X className="h-4 w-4 text-rose-300" aria-hidden />
            ) : (
              <TriangleAlert className="h-4 w-4 text-amber-200" aria-hidden />
            )}
            <StatusBadge label={overall.label} tone={overall.tone} />
          </div>
          <p className="text-xs text-tc-muted">
            Verifies module initialization only. Analyst orientation lives in the future
            Analyst Dashboard.
          </p>
        </section>
      </div>
    </div>
  );
}
