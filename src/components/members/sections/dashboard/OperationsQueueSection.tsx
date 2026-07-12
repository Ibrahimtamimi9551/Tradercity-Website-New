"use client";

import { Clock, UserPlus, Calendar, CreditCard } from "lucide-react";
import { OperationsQueue } from "@/components/admin/ui";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";

const queueItems = [
  {
    id: "1",
    label: "Pending Subscription Verifications",
    description: "Payments awaiting admin verification",
    count: 24,
    href: "/admin/subscriptions?status=pending_verification",
    icon: Clock,
    iconTone: "warning" as const,
    linkText: "Review Payments →",
    avatars: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2", "https://i.pravatar.cc/150?u=3"],
    extraCount: 8,
  },
  {
    id: "2",
    label: "Discord Sync Issues",
    description: "Members with role synchronization problems",
    count: 7,
    href: "/admin/discord?sync=failed",
    icon: DiscordIcon,
    iconTone: "danger" as const,
    linkText: "Review Issues →",
    avatars: ["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5", "https://i.pravatar.cc/150?u=6"],
    extraCount: 3,
  },
  {
    id: "3",
    label: "Referral Redemption Requests",
    description: "Members eligible for bonus credits",
    count: 12,
    href: "/admin/referrals?status=pending",
    icon: UserPlus,
    iconTone: "purple" as const,
    linkText: "Review Requests →",
    avatars: ["https://i.pravatar.cc/150?u=7", "https://i.pravatar.cc/150?u=8", "https://i.pravatar.cc/150?u=9"],
    extraCount: 5,
  },
  {
    id: "4",
    label: "Memberships Expiring Today",
    description: "VIP memberships ending within 24 hours",
    count: 8,
    href: "/admin/members?expiring=today",
    icon: Calendar,
    iconTone: "warning" as const,
    linkText: "View Members →",
    avatars: ["https://i.pravatar.cc/150?u=10", "https://i.pravatar.cc/150?u=11", "https://i.pravatar.cc/150?u=12"],
    extraCount: 2,
  },
  {
    id: "5",
    label: "Verification Required",
    description: "Manual verification needed",
    count: 5,
    href: "/admin/subscriptions?status=verification_required",
    icon: CreditCard,
    iconTone: "blue" as const,
    linkText: "Review Now →",
    avatars: ["https://i.pravatar.cc/150?u=13", "https://i.pravatar.cc/150?u=14", "https://i.pravatar.cc/150?u=15"],
    extraCount: 1,
  },
];

export function OperationsQueueSection() {
  return (
    <OperationsQueue
      title="Operations Queue (Needs Attention)"
      total={25}
      items={queueItems}
      viewAllHref="/admin/queue"
    />
  );
}
