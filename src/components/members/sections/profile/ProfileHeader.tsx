"use client";

import Link from "next/link";
import {
  Calendar,
  Crown,
  ExternalLink,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { formatProfileDateTime } from "@/lib/members/format-profile";
import type { MemberProfile } from "@/types/members/profile";

const avatarToneStyles: Record<MemberProfile["avatarTone"], string> = {
  discord: "bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

type ProfileHeaderProps = {
  profile: MemberProfile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const initials = profile.username.slice(0, 2).toUpperCase();

  return (
    <section className={modulePanelSurface("purple", "space-y-5")}>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Identity */}
        <div className="flex min-w-0 items-start gap-4">
          <div className="relative shrink-0">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold sm:h-16 sm:w-16 sm:text-lg",
                avatarToneStyles[profile.avatarTone]
              )}
              aria-hidden
            >
              {profile.avatarTone === "discord" ? (
                <DiscordIcon className="h-7 w-7 sm:h-8 sm:w-8" />
              ) : (
                initials
              )}
            </div>
            {profile.header.online ? (
              <span
                className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#1a1028] bg-emerald-400"
                aria-label="Online"
              />
            ) : null}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {profile.username}
              </h1>
              {profile.membershipTier === "vip" ? (
                <StatusBadge label="VIP Member" tone="success" />
              ) : (
                <StatusBadge label="Free Member" tone="neutral" />
              )}
            </div>
            <p className="mt-1 truncate text-sm text-tc-muted">{profile.email}</p>
            <a
              href={profile.discordProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex max-w-full items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200"
            >
              <DiscordIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">{profile.username}</span>
              <ExternalLink className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
            </a>
          </div>
        </div>

        {/* Status widgets */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-0 xl:flex-1 xl:px-4">
          <StatusWidget
            icon={Crown}
            label="Membership Status"
            value={profile.header.membershipLabel}
            valueClassName={
              profile.membershipTier === "vip" ? "text-emerald-300" : "text-white/85"
            }
          />
          <StatusWidget
            icon={DiscordIcon}
            label="Discord Status"
            value={profile.header.discordLabel}
            valueClassName={
              profile.header.discordTone === "success"
                ? "text-emerald-300"
                : profile.header.discordTone === "danger"
                  ? "text-rose-300"
                  : "text-white/85"
            }
          />
          <StatusWidget
            icon={Crown}
            label="Discord Role"
            value={profile.header.discordRole ?? "—"}
            valueClassName={
              profile.header.discordRole === "VIP" ? "text-tc-gold" : "text-white/85"
            }
            iconClassName="text-tc-gold"
          />
          <StatusWidget
            icon={Calendar}
            label="Joined Date"
            value={formatProfileDateTime(profile.joinedAt)}
            valueClassName="text-white/85 text-xs sm:text-sm"
          />
        </div>

        {/* Actions — Edit is reflection-safe (stub); domain manage stays in modules */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-violet-400/40 bg-violet-500/20 px-3.5 py-2 text-sm font-medium text-violet-100 transition-colors hover:bg-violet-500/30"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden />
            Edit Profile
          </button>
          <button
            type="button"
            aria-label="More actions"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <MoreHorizontal className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

type StatusWidgetProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  valueClassName?: string;
  iconClassName?: string;
};

function StatusWidget({
  icon: Icon,
  label,
  value,
  valueClassName,
  iconClassName,
}: StatusWidgetProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-tc-muted sm:text-[11px]">
        <Icon className={cn("h-3 w-3 shrink-0 text-violet-300", iconClassName)} aria-hidden />
        <span className="truncate">{label}</span>
      </div>
      <p className={cn("mt-1.5 font-medium leading-snug", valueClassName)}>{value}</p>
    </div>
  );
}

export function ProfileBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-tc-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/admin/members" className="hover:text-violet-300">
            Members
          </Link>
        </li>
        <li aria-hidden className="text-white/30">
          /
        </li>
        <li className="font-medium text-white/85">User Profile</li>
      </ol>
    </nav>
  );
}
