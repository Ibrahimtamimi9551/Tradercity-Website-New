import { Crown } from "lucide-react";
import { StatusBadge, Timeline } from "@/components/admin/ui";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";
import { formatProfileDateTime } from "@/lib/members/format-profile";
import type { MemberProfile } from "@/types/members/profile";
import { FieldRow, ManageLink, ReflectionCard } from "./ReflectionCard";

type DiscordCardProps = {
  profile: MemberProfile;
};

export function DiscordCard({ profile }: DiscordCardProps) {
  const { discord } = profile;
  const historyPreview = discord.roleHistory.slice(0, 3);

  return (
    <ReflectionCard
      tone="navy"
      title="Discord"
      icon={DiscordIcon}
      badge={
        <StatusBadge
          label={discord.connectionLabel}
          tone={discord.connectionTone}
          className="hidden sm:inline-flex"
        />
      }
      footer={
        <ManageLink
          href={`/admin/discord?member=${profile.id}`}
          label="Manage Discord"
          tone="navy"
        />
      }
    >
      <div className="divide-y divide-white/5">
        <FieldRow label="Discord Role">
          {discord.role === "VIP" ? (
            <span className="inline-flex items-center gap-1.5 text-tc-gold">
              <Crown className="h-3.5 w-3.5" aria-hidden />
              VIP
            </span>
          ) : (
            (discord.role ?? "—")
          )}
        </FieldRow>
        <FieldRow label="Connection Status">
          <span
            className={
              discord.connectionTone === "success"
                ? "text-emerald-300"
                : discord.connectionTone === "danger"
                  ? "text-rose-300"
                  : "text-white/80"
            }
          >
            {discord.connectionLabel}
          </span>
        </FieldRow>
        <FieldRow label="Joined">{formatProfileDateTime(discord.joinedAt)}</FieldRow>
        <FieldRow label="Last Update">{formatProfileDateTime(discord.updatedAt)}</FieldRow>
        <FieldRow label="Account Status">{discord.accountStatus}</FieldRow>
        <FieldRow label="Community Access">{discord.communityAccess}</FieldRow>
      </div>

      {historyPreview.length > 0 ? (
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-tc-muted">
              Role History
            </p>
            <span className="text-xs text-violet-300">View All</span>
          </div>
          <Timeline
            items={historyPreview.map((item) => ({
              id: item.id,
              title: item.title,
              timestamp: formatProfileDateTime(item.timestamp),
              status: item.status ?? "complete",
            }))}
          />
        </div>
      ) : null}
    </ReflectionCard>
  );
}
