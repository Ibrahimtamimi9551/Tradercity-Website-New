"use client";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Crown,
  Gift,
  RefreshCw,
  UserPlus,
} from "lucide-react";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";
import { cn } from "@/lib/admin/cn";
import { formatProfileDateTime } from "@/lib/members/format-profile";
import type { MemberProfile, ProfileActivityKind } from "@/types/members/profile";
import { ReflectionCard } from "./ReflectionCard";

type ActivityTimelineProps = {
  profile: MemberProfile;
  /** Overview preview vs full Activity tab */
  expanded?: boolean;
  onViewAll?: () => void;
};

const kindMeta: Record<
  ProfileActivityKind,
  { icon: React.ElementType; tone: "success" | "purple" | "warning" | "danger" | "info" | "gold" }
> = {
  registered: { icon: UserPlus, tone: "success" },
  joined_discord: { icon: DiscordIcon, tone: "purple" },
  payment_submitted: { icon: CreditCard, tone: "info" },
  payment_verified: { icon: CheckCircle2, tone: "success" },
  vip_activated: { icon: Crown, tone: "gold" },
  membership_renewed: { icon: RefreshCw, tone: "info" },
  membership_expired: { icon: AlertTriangle, tone: "danger" },
  referral_redeemed: { icon: Gift, tone: "success" },
  discord_role: { icon: DiscordIcon, tone: "purple" },
  note: { icon: Activity, tone: "warning" },
};

const toneStyles = {
  success: "bg-emerald-500 text-white",
  purple: "bg-tc-purple text-white",
  warning: "bg-amber-500 text-white",
  danger: "bg-rose-500 text-white",
  info: "bg-blue-500 text-white",
  gold: "bg-[#D4AF37] text-[#1a1408]",
};

export function ActivityTimeline({
  profile,
  expanded = false,
  onViewAll,
}: ActivityTimelineProps) {
  const items = expanded ? profile.activity : profile.activity.slice(0, 4);

  return (
    <ReflectionCard
      tone="purple"
      title="Recent Activity"
      icon={Activity}
      headerAction={
        onViewAll && !expanded ? (
          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-medium text-violet-300 hover:text-violet-200"
          >
            View All
          </button>
        ) : null
      }
    >
      {items.length === 0 ? (
        <p className="text-sm text-tc-muted">No recent activity.</p>
      ) : (
        <ul className="space-y-5">
          {items.map((item) => {
            const meta = kindMeta[item.kind];
            const Icon = meta.icon;
            return (
              <li key={item.id} className="flex gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    toneStyles[meta.tone]
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                  <p className="text-sm font-medium leading-snug text-white/90">{item.title}</p>
                  <span className="shrink-0 text-xs text-tc-muted">
                    {formatProfileDateTime(item.timestamp)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </ReflectionCard>
  );
}
