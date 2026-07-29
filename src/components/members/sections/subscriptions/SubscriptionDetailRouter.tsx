"use client";

import { useSearchParams } from "next/navigation";
import { ManualPaymentMemberDetailPage } from "./manual";
import { SubscriptionMemberDetailPage } from "./SubscriptionMemberDetailPage";

type SubscriptionDetailRouterProps = {
  id: string;
};

/**
 * Routes mobile detail to Crypto or Manual based on id prefix / source query.
 */
export function SubscriptionDetailRouter({ id }: SubscriptionDetailRouterProps) {
  const searchParams = useSearchParams();
  const isManual =
    id.startsWith("mp-") || searchParams.get("source") === "manual";

  if (isManual) {
    return <ManualPaymentMemberDetailPage paymentId={id} />;
  }

  return <SubscriptionMemberDetailPage ticketId={id} />;
}
