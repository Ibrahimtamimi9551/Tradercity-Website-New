"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/admin/ui";
import { ReferralDetails } from "./ReferralDetails";
import { useReferralsDirectoryContext } from "./ReferralsDirectoryProvider";

type ReferralMemberDetailPageProps = {
  referralId: string;
};

function ReferralMemberDetailContent({ referralId }: ReferralMemberDetailPageProps) {
  const { findMemberById, getListHref } = useReferralsDirectoryContext();
  const member = findMemberById(referralId);
  const listHref = getListHref({ includeMember: false });

  if (!member) {
    return (
      <div className="space-y-4">
        <BackLink href={listHref} />
        <EmptyState
          title="Referral member not found"
          description="This referral record may have been removed or the link is invalid."
          action={
            <Link
              href={listHref}
              className="text-sm font-medium text-violet-300 hover:text-violet-200"
            >
              Back to Referrals
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink href={listHref} />
      <ReferralDetails member={member} fullPage className="min-h-[70vh]" />
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
      Back to Referrals
    </Link>
  );
}

export function ReferralMemberDetailPage({
  referralId,
}: ReferralMemberDetailPageProps) {
  return <ReferralMemberDetailContent referralId={referralId} />;
}
