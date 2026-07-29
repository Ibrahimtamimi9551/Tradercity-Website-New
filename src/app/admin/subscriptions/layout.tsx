import { Suspense, type ReactNode } from "react";
import { LoadingState } from "@/components/admin/ui";
import { ManualPaymentsDirectoryProvider } from "@/components/members/sections/subscriptions/manual";
import { ReferralRedeemRequestsDirectoryProvider } from "@/components/members/sections/subscriptions/referral-redeem";
import { SubscriptionsDirectoryProvider } from "@/components/members/sections/subscriptions/SubscriptionsDirectoryProvider";

/**
 * Membership Activation Center providers — Crypto, Manual, Referral Redeem
 * stay mounted across list ↔ detail so filters/selection survive mobile nav.
 */
export default function SubscriptionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={<LoadingState label="Loading subscription tickets…" />}
    >
      <SubscriptionsDirectoryProvider>
        <ManualPaymentsDirectoryProvider>
          <ReferralRedeemRequestsDirectoryProvider>
            {children}
          </ReferralRedeemRequestsDirectoryProvider>
        </ManualPaymentsDirectoryProvider>
      </SubscriptionsDirectoryProvider>
    </Suspense>
  );
}
