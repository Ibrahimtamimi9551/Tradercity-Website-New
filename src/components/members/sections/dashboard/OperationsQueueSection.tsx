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
    label: "Pending Subscription Verifications",
    count: 24,
    countLabel: "Requests",
    oldestWaiting: "6 Hours",
    href: "/admin/subscriptions?status=pending_verification",
    icon: Clock,
    iconTone: "warning" as const,
    linkText: "Review Payments",
  },
  {
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
    label: "Verification Required",
    count: 5,
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
      total={25}
      items={queueItems}
      viewAllHref="/admin"
    />
  );
}
