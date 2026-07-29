"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/admin/ui";
import type { ReferralMember } from "@/types/members/referral";
import {
  confirmApproveRedeem,
  confirmRejectRedeem,
} from "./referral-redeem-actions";
import { ReferralRedeemRequestDetails } from "./ReferralRedeemRequestDetails";
import { useReferralRedeemRequestsDirectoryContext } from "./ReferralRedeemRequestsDirectoryProvider";

type ReferralRedeemMemberDetailPageProps = {
  memberId: string;
};

function ReferralRedeemMemberDetailContent({
  memberId,
}: ReferralRedeemMemberDetailPageProps) {
  const {
    findMemberById,
    getListHref,
    approveRedeem,
    rejectRedeem,
  } = useReferralRedeemRequestsDirectoryContext();

  const member = findMemberById(memberId);
  const listHref = getListHref({ includeMember: false });

  const onApprove = (item: ReferralMember) => {
    if (!confirmApproveRedeem(item)) return;
    approveRedeem(item);
  };

  const onReject = (item: ReferralMember) => {
    if (!confirmRejectRedeem(item)) return;
    rejectRedeem(item);
  };

  if (!member) {
    return (
      <div className="space-y-4">
        <BackLink href={listHref} />
        <EmptyState
          title="Redeem request not found"
          description="This request may have been removed or the link is invalid."
          action={
            <Link
              href={listHref}
              className="text-sm font-medium text-amber-200 hover:text-amber-100"
            >
              Back to Referral Redeem Requests
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink href={listHref} />
      <ReferralRedeemRequestDetails
        member={member}
        onApprove={onApprove}
        onReject={onReject}
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
      Back to Referral Redeem Requests
    </Link>
  );
}

export function ReferralRedeemMemberDetailPage({
  memberId,
}: ReferralRedeemMemberDetailPageProps) {
  return <ReferralRedeemMemberDetailContent memberId={memberId} />;
}
