"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/admin/ui";
import type { ManualPayment } from "@/types/members/manual-payment";
import {
  confirmActivateManualPayment,
  confirmCancelManualPayment,
} from "./manual-payment-actions";
import { ManualPaymentDetails } from "./ManualPaymentDetails";
import { useManualPaymentsDirectoryContext } from "./ManualPaymentsDirectoryProvider";

type ManualPaymentMemberDetailPageProps = {
  paymentId: string;
};

function ManualPaymentMemberDetailContent({
  paymentId,
}: ManualPaymentMemberDetailPageProps) {
  const {
    findPaymentById,
    getListHref,
    activatePayment,
    cancelPayment,
  } = useManualPaymentsDirectoryContext();

  const payment = findPaymentById(paymentId);
  const listHref = getListHref({ includePayment: false });

  const onActivate = (item: ManualPayment) => {
    if (!confirmActivateManualPayment(item)) return;
    activatePayment(item);
  };

  const onCancel = (item: ManualPayment) => {
    if (!confirmCancelManualPayment(item)) return;
    cancelPayment(item);
  };

  if (!payment) {
    return (
      <div className="space-y-4">
        <BackLink href={listHref} />
        <EmptyState
          title="Manual payment not found"
          description="This payment record may have been removed or the link is invalid."
          action={
            <Link
              href={listHref}
              className="text-sm font-medium text-amber-200 hover:text-amber-100"
            >
              Back to Manual Payments
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink href={listHref} />
      <ManualPaymentDetails
        payment={payment}
        onActivate={onActivate}
        onCancel={onCancel}
        fullPage
        className="min-h-[70vh]"
      />
    </div>
  );
}

function BackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="admin-muted inline-flex items-center gap-1.5 text-sm transition-colors hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      Back to Manual Payments
    </Link>
  );
}

export function ManualPaymentMemberDetailPage({
  paymentId,
}: ManualPaymentMemberDetailPageProps) {
  return <ManualPaymentMemberDetailContent paymentId={paymentId} />;
}
