"use client";

import { useSearchParams } from "next/navigation";
import { ManualPaymentMemberDetailPage } from "./manual";
import { ReferralRedeemMemberDetailPage } from "./referral-redeem";
import { SubscriptionMemberDetailPage } from "./SubscriptionMemberDetailPage";

type SubscriptionDetailRouterProps = {
  id: string;
};

/**
 * Routes mobile detail to Crypto, Manual, or Referral Redeem
 * based on id prefix / source query.
 */
export function SubscriptionDetailRouter({ id }: SubscriptionDetailRouterProps) {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  if (id.startsWith("mp-") || source === "manual") {
    return <ManualPaymentMemberDetailPage paymentId={id} />;
  }

  if (id.startsWith("r-") || source === "referral_redeem") {
    return <ReferralRedeemMemberDetailPage memberId={id} />;
  }

  return <SubscriptionMemberDetailPage ticketId={id} />;
}
