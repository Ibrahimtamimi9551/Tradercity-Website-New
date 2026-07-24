"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState, LoadingState, PageTitle } from "@/components/admin/ui";
import { applyAnalystReferralOperation } from "@/lib/analysts/mock/referrals-mutations";
import { getMockAnalystReferral } from "@/lib/analysts/mock/referrals";
import type { AnalystReferralOperation } from "@/types/analysts/referrals";
import { ReferralDetails } from "./ReferralDetails";

type ReferralDetailViewProps = {
  referralId: string;
};

/**
 * Mobile / narrow Referral Profile route.
 * Desktop keeps the Directory inspector on `/admin/analysts/referrals`.
 */
export function ReferralDetailView({ referralId }: ReferralDetailViewProps) {
  const [tick, setTick] = useState(0);
  const record = useMemo(() => {
    void tick;
    return getMockAnalystReferral(referralId) ?? null;
  }, [referralId, tick]);

  const onOperation = useCallback(
    (
      _record: NonNullable<typeof record>,
      operation: AnalystReferralOperation
    ) => {
      applyAnalystReferralOperation(referralId, operation);
      setTick((t) => t + 1);
    },
    [referralId]
  );

  if (!record && tick === 0) {
    return <LoadingState label="Loading referral identity…" />;
  }

  if (!record) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/analysts/referrals?view=directory"
          className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Referrals
        </Link>
        <EmptyState
          title="Referral identity not found"
          description={`No Analyst Referral record for “${referralId}”.`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link
        href="/admin/analysts/referrals?view=directory"
        className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Referrals
      </Link>
      <PageTitle
        title={record.displayName}
        subtitle="Referral Profile"
      />
      <ReferralDetails record={record} onOperation={onOperation} fullPage />
    </div>
  );
}
