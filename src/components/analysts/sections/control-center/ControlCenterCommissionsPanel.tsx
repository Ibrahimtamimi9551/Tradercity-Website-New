"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Coins } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  analystCommissionStatusPresentation,
  formatCommissionDate,
  formatCommissionUsd,
} from "@/lib/analysts/format-commissions";
import { getMockAnalystCommissionByAnalystId } from "@/lib/analysts/mock/commissions";
import type { AnalystControlCenter } from "@/types/analysts/control-center";

type ControlCenterCommissionsPanelProps = {
  profile: AnalystControlCenter;
};

/**
 * Control Center Commissions tab — concise financial summary.
 * Full operations live in `/admin/analysts/commissions`.
 */
export function ControlCenterCommissionsPanel({
  profile,
}: ControlCenterCommissionsPanelProps) {
  const record = getMockAnalystCommissionByAnalystId(profile.id);

  return (
    <section className={modulePanelSurface("gold", "space-y-4")}>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/30 bg-black/25 text-[#E8C96A]">
          <Coins className="h-4 w-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">
            Commission
          </h2>
          <p className="text-xs text-tc-muted">
            Financial summary · Commission domain owns ops
          </p>
        </div>
      </div>

      {record ? (
        <>
          <dl className="space-y-2.5 text-sm">
            <Row
              label="Commission Status"
              value={
                <StatusBadge
                  label={
                    analystCommissionStatusPresentation(record.commissionStatus)
                      .label
                  }
                  tone={
                    analystCommissionStatusPresentation(record.commissionStatus)
                      .tone
                  }
                />
              }
            />
            <Row
              label="Total Earned"
              value={
                <span className="tabular-nums">
                  {formatCommissionUsd(record.summary.totalEarnedUsd)}
                </span>
              }
            />
            <Row
              label="Amount Payable"
              value={
                <span className="tabular-nums">
                  {formatCommissionUsd(record.summary.totalPayableUsd)}
                </span>
              }
            />
            <Row
              label="Outstanding Due"
              value={
                <span className="tabular-nums">
                  {formatCommissionUsd(record.summary.dueAmountUsd)}
                </span>
              }
            />
            <Row
              label="Last Payment"
              value={formatCommissionDate(record.summary.lastPayoutAt)}
            />
            <Row
              label="Analyst Share %"
              value={`${record.tier.analystSharePercent}%`}
            />
          </dl>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={`/admin/analysts/commissions?commission=${record.id}`}
              className="text-xs font-medium text-amber-200 hover:text-amber-100"
            >
              Open Commission Dashboard →
            </Link>
            <Link
              href="/admin/analysts/commissions?view=payouts"
              className="text-xs font-medium text-white/70 hover:text-white"
            >
              Payout workspace →
            </Link>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-white/10 bg-black/20 px-4 py-8 text-center">
          <p className="text-sm text-white/85">No commission identity yet</p>
          <p className="mt-2 text-xs text-tc-muted">
            Commission records are created when referrals become
            commission-ready after Operationally Ready.
          </p>
          <Link
            href="/admin/analysts/commissions"
            className="mt-3 inline-flex text-xs font-medium text-amber-200 hover:text-amber-100"
          >
            Open Commission domain →
          </Link>
        </div>
      )}
    </section>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-tc-muted">{label}</dt>
      <dd className="truncate text-right text-white/90">{value}</dd>
    </div>
  );
}
