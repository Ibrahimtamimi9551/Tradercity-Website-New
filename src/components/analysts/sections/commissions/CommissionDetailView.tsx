"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { EmptyState, LoadingState, PageTitle } from "@/components/admin/ui";
import { applyAnalystCommissionOperation } from "@/lib/analysts/mock/commissions-mutations";
import { getMockAnalystCommission } from "@/lib/analysts/mock/commissions";
import type {
  AnalystCommissionCompletePayoutInput,
  AnalystCommissionOperation,
} from "@/types/analysts/commissions";
import { CommissionWorkspaceView } from "./CommissionWorkspaceView";

type CommissionDetailViewProps = {
  commissionId: string;
};

/**
 * Mobile / deep-link route — opens the Dashboard operational workspace.
 */
export function CommissionDetailView({
  commissionId,
}: CommissionDetailViewProps) {
  const router = useRouter();
  const [tick, setTick] = useState(0);
  const record = useMemo(() => {
    void tick;
    return getMockAnalystCommission(commissionId) ?? null;
  }, [commissionId, tick]);

  const onOperation = useCallback(
    (
      _record: NonNullable<typeof record>,
      operation: AnalystCommissionOperation,
      input?: AnalystCommissionCompletePayoutInput
    ) => {
      applyAnalystCommissionOperation(commissionId, operation, input);
      setTick((t) => t + 1);
    },
    [commissionId]
  );

  if (!record && tick === 0) {
    return <LoadingState label="Loading commission workspace…" />;
  }

  if (!record) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/analysts/commissions?view=directory"
          className="inline-flex items-center gap-1.5 text-sm text-amber-300 hover:text-amber-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Commission
        </Link>
        <EmptyState
          title="Commission record not found"
          description={`No Analyst Commission record for “${commissionId}”.`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link
        href="/admin/analysts/commissions?view=directory"
        className="inline-flex items-center gap-1.5 text-sm text-amber-300 hover:text-amber-200"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Directory
      </Link>
      <PageTitle
        title={record.displayName}
        subtitle="Commission Dashboard workspace"
      />
      <CommissionWorkspaceView
        record={record}
        onOperation={onOperation}
        onOpenPayouts={() => {
          router.push("/admin/analysts/commissions?view=payouts");
        }}
      />
    </div>
  );
}
