"use client";

import { Clock, UserPlus, Calendar, CreditCard } from "lucide-react";
import { OperationsQueue } from "@/components/admin/ui";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";

/**
 * Mock oldest-waiting values — replace with min(createdAt) of unresolved
 * queue items once NestJS hooks land.
 */
const queueItems = [
  {
    id: "1",
    label: "Approval Pending",
    count: 3,
    countLabel: "Tickets",
    oldestWaiting: "2 Hours",
    href: "/admin/subscriptions?status=approval_pending",
    icon: CreditCard,
    iconTone: "warning" as const,
    linkText: "Review Queue",
  },
  {
    id: "2",
    label: "Blockchain Verifying",
    count: 3,
    countLabel: "Requests",
    oldestWaiting: "6 Hours",
    href: "/admin/subscriptions?status=blockchain_verifying",
    icon: Clock,
    iconTone: "blue" as const,
    linkText: "Monitor Payments",
  },
  {
    id: "3",
    label: "Discord Sync Issues",
    count: 7,
    countLabel: "Issues",
    oldestWaiting: "14 Hours",
    href: "/admin/discord?sync=failed",
    icon: DiscordIcon,
    iconTone: "danger" as const,
    linkText: "Review Issues",
  },
  {
    id: "4",
    label: "Referral Redeem Requests",
    count: 12,
    countLabel: "Requests",
    oldestWaiting: "2 Hours",
    href: "/admin/referrals?progress=redeem_requests",
    icon: UserPlus,
    iconTone: "purple" as const,
    linkText: "Review Requests",
  },
  {
    id: "5",
    label: "Memberships Expiring Today",
    count: 8,
    countLabel: "Members",
    oldestWaiting: "45 Minutes",
    href: "/admin/members?expiring=today",
    icon: Calendar,
    iconTone: "warning" as const,
    linkText: "View Members",
  },
  {
    id: "6",
    label: "Verification Required",
    count: 2,
    countLabel: "Payments",
    oldestWaiting: "1 Day",
    href: "/admin/subscriptions?status=verification_required",
    icon: CreditCard,
    iconTone: "blue" as const,
    linkText: "Review Now",
  },
];

export function OperationsQueueSection() {
  return (
    <OperationsQueue
      title="Operations Queue (Needs Attention)"
      total={35}
      items={queueItems}
      viewAllHref="/admin"
    />
  );
}
