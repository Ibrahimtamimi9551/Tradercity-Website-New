"use client";

import Link from "next/link";
import { CheckCircle2, Clock, UserPlus } from "lucide-react";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";
import { cn } from "@/lib/admin/cn";
import { modulePanelAccent, modulePanelSurface } from "@/lib/admin/module-surfaces";

type ActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  iconTone: "success" | "purple" | "warning" | "danger";
};

const activities: ActivityItem[] = [
  {
    id: "1",
    title: "Payment verified successfully",
    description: "ibrahim_trader • VIP Monthly",
    time: "2m ago",
    icon: CheckCircle2,
    iconTone: "success",
  },
  {
    id: "2",
    title: "Discord role updated to VIP",
    description: "ali_crypto",
    time: "5m ago",
    icon: DiscordIcon,
    iconTone: "purple",
  },
  {
    id: "3",
    title: "New payment received",
    description: "usman_hodler • $60.00 USDT",
    time: "8m ago",
    icon: Clock,
    iconTone: "warning",
  },
  {
    id: "4",
    title: "Referral request submitted",
    description: "fahad_trades • 6/6 completed",
    time: "12m ago",
    icon: UserPlus,
    iconTone: "success",
  },
  {
    id: "5",
    title: "Membership expired",
    description: "waleed_777 • VIP Monthly",
    time: "18m ago",
    icon: DiscordIcon,
    iconTone: "danger",
  },
  {
    id: "6",
    title: "Subscription approved",
    description: "nomoman_khan • VIP Quarterly",
    time: "25m ago",
    icon: CheckCircle2,
    iconTone: "success",
  },
];

const iconToneMap = {
  success: "bg-emerald-500 text-white",
  purple: "bg-tc-purple text-white",
  warning: "bg-amber-500 text-white",
  danger: "bg-rose-500 text-white",
};

export function RecentActivity() {
  return (
    <div className={cn("flex flex-col", modulePanelSurface("navy"))}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-medium text-white">Recent Activity</h3>
        <Link
          href="/admin/activity"
          className={cn("text-sm font-medium hover:opacity-90", modulePanelAccent("navy"))}
        >
          View all
        </Link>
      </div>

      <div className="flex-1">
        <ul className="space-y-6">
          {activities.map((item) => (
            <li key={item.id} className="flex gap-4">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  iconToneMap[item.iconTone]
                )}
              >
                <item.icon className="h-4 w-4" />
              </div>
              <div className="flex flex-1 items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white/90">{item.title}</p>
                  <p className="mt-0.5 text-xs text-tc-muted">{item.description}</p>
                </div>
                <span className="shrink-0 text-xs text-tc-muted">{item.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
