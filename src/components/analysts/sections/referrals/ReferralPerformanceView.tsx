"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  analystReferralStatusPresentation,
  formatAnalystReferralDateShort,
  formatShortReferralLink,
} from "@/lib/analysts/format-referrals";
import type {
  AnalystReferralPerformanceSnapshot,
  AnalystReferralRecord,
} from "@/types/analysts/referrals";

type ReferralPerformanceViewProps = {
  snapshot: AnalystReferralPerformanceSnapshot;
};

function RowLink({ record }: { record: AnalystReferralRecord }) {
  const status = analystReferralStatusPresentation(record.status);
  return (
    <Link
      href={`/admin/analysts/referrals?view=directory&referral=${record.id}`}
      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">
          {record.displayName}
        </p>
        <p className="truncate font-mono text-[11px] text-tc-muted">
          {record.referralCode} · {formatShortReferralLink(record.referralToken)}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <StatusBadge label={status.label} tone={status.tone} />
        <p className="mt-1 text-[11px] tabular-nums text-tc-muted">
          {record.successfulReferrals} successful
        </p>
      </div>
    </Link>
  );
}

function Panel({
  title,
  hint,
  rows,
  empty,
}: {
  title: string;
  hint: string;
  rows: AnalystReferralRecord[];
  empty: string;
}) {
  return (
    <section className={modulePanelSurface("navy", "space-y-3")}>
      <div>
        <h2 className="text-sm font-medium text-white sm:text-base">{title}</h2>
        <p className="mt-1 text-xs text-tc-muted sm:text-sm">{hint}</p>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-tc-muted">{empty}</p>
      ) : (
        <div className="space-y-2">
          {rows.map((row) => (
            <RowLink key={row.id} record={row} />
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Operational performance workspace — no revenue analytics charts.
 */
export function ReferralPerformanceView({
  snapshot,
}: ReferralPerformanceViewProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel
        title="Top Referring Analysts"
        hint="Ranked by successful referrals"
        rows={snapshot.topReferring}
        empty="No successful referrals yet"
      />
      <Panel
        title="Recent Successful Referrals"
        hint="Partners with converted memberships"
        rows={snapshot.recentSuccessful}
        empty="No conversions yet"
      />
      <section className={modulePanelSurface("purple", "space-y-3")}>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">
            Recently Activated Referral Codes
          </h2>
          <p className="mt-1 text-xs text-tc-muted sm:text-sm">
            Newest Operationally Ready activations
          </p>
        </div>
        {snapshot.recentlyActivated.length === 0 ? (
          <p className="text-sm text-tc-muted">No activations yet</p>
        ) : (
          <div className="space-y-2">
            {snapshot.recentlyActivated.map((row) => (
              <Link
                key={row.id}
                href={`/admin/analysts/referrals?view=directory&referral=${row.id}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 hover:bg-white/[0.05]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {row.displayName}
                  </p>
                  <p className="font-mono text-[11px] text-tc-muted">
                    {row.referralCode}
                  </p>
                </div>
                <p className="shrink-0 text-[11px] tabular-nums text-tc-muted">
                  {formatAnalystReferralDateShort(row.activationDate)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Panel
        title="Disabled Referral Codes"
        hint="Paused or awaiting activation"
        rows={snapshot.disabledCodes}
        empty="No disabled codes"
      />
      <div className="lg:col-span-2">
        <Panel
          title="Analysts Without Referrals"
          hint="Enabled identities with zero attributed referrals"
          rows={snapshot.withoutReferrals}
          empty="Every enabled partner has at least one referral"
        />
      </div>
    </div>
  );
}
