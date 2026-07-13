"use client";

import { Suspense } from "react";
import { LoadingState } from "@/components/admin/ui";
import { MemberProfilePageContent } from "@/components/members/sections/profile";

type MemberProfileViewProps = {
  memberId: string;
};

/**
 * Phase 3 — User Profile Control Center compositor.
 * Route page stays thin; profile UI lives under members/sections/profile/.
 */
export function MemberProfileView({ memberId }: MemberProfileViewProps) {
  return (
    <Suspense fallback={<LoadingState label="Loading member profile…" />}>
      <MemberProfilePageContent memberId={memberId} />
    </Suspense>
  );
}
