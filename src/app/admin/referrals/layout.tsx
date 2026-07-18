import { Suspense, type ReactNode } from "react";
import { LoadingState } from "@/components/admin/ui";
import { ReferralsDirectoryProvider } from "@/components/members/sections/referrals/ReferralsDirectoryProvider";

/**
 * Keeps `useReferralsDirectory` mounted across list ↔ detail so filters,
 * pagination, sort, and selection survive mobile full-page navigation.
 */
export default function ReferralsLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingState label="Loading referral operations…" />}>
      <ReferralsDirectoryProvider>{children}</ReferralsDirectoryProvider>
    </Suspense>
  );
}
