"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/admin/ui";
import { useSubscriptionsDirectoryContext } from "./SubscriptionsDirectoryProvider";
import { SubscriptionDetails } from "./SubscriptionDetails";

type SubscriptionMemberDetailPageProps = {
  ticketId: string;
};

function SubscriptionMemberDetailContent({
  ticketId,
}: SubscriptionMemberDetailPageProps) {
  const { findTicketById, getListHref, onOpenExplorer, onApprove, onReject } =
    useSubscriptionsDirectoryContext();

  const ticket = findTicketById(ticketId);
  const listHref = getListHref({ includeMember: false });

  if (!ticket) {
    return (
      <div className="space-y-4">
        <BackLink href={listHref} />
        <EmptyState
          title="Subscription ticket not found"
          description="This payment ticket may have been removed or the link is invalid."
          action={
            <Link
              href={listHref}
              className="text-sm font-medium text-amber-200 hover:text-amber-100"
            >
              Back to Subscriptions
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink href={listHref} />
      <SubscriptionDetails
        ticket={ticket}
        onOpenExplorer={onOpenExplorer}
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
      Back to Subscriptions
    </Link>
  );
}

export function SubscriptionMemberDetailPage({
  ticketId,
}: SubscriptionMemberDetailPageProps) {
  return <SubscriptionMemberDetailContent ticketId={ticketId} />;
}
