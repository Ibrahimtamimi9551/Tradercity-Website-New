import { Suspense, type ReactNode } from "react";
import { LoadingState } from "@/components/admin/ui";
import { ReferralsDirectoryProvider } from "@/components/members/sections/referrals/ReferralsDirectoryProvider";

/**
 * Operations-only provider — keeps list ↔ detail state without wrapping
 * Referral Intelligence (Part 2).
 */
export default function ReferralsOperationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<LoadingState label="Loading referral operations…" />}>
      <ReferralsDirectoryProvider>{children}</ReferralsDirectoryProvider>
    </Suspense>
  );
}
