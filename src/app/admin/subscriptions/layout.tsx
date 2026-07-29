import { Suspense, type ReactNode } from "react";
import { LoadingState } from "@/components/admin/ui";
import { ManualPaymentsDirectoryProvider } from "@/components/members/sections/subscriptions/manual";
import { SubscriptionsDirectoryProvider } from "@/components/members/sections/subscriptions/SubscriptionsDirectoryProvider";

/**
 * Keeps Crypto + Manual directory hooks mounted across list ↔ detail so
 * filters, pagination, and selection survive mobile full-page navigation.
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
          {children}
        </ManualPaymentsDirectoryProvider>
      </SubscriptionsDirectoryProvider>
    </Suspense>
  );
}
