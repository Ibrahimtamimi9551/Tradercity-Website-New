"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  analystDiscordRoleLabel,
  analystDiscordStatusPresentation,
  formatAnalystDiscordDate,
} from "@/lib/analysts/format-discord";
import { getMockAnalystDiscordByAnalystId } from "@/lib/analysts/mock/discord";
import type { AnalystControlCenter } from "@/types/analysts/control-center";

type ControlCenterDiscordPanelProps = {
  profile: AnalystControlCenter;
};

/**
 * Control Center Discord tab — consumes Discord domain data.
 * Does not duplicate Discord management; deep-links to the Discord module.
 */
export function ControlCenterDiscordPanel({
  profile,
}: ControlCenterDiscordPanelProps) {
  const record = getMockAnalystDiscordByAnalystId(profile.id);
  const status = record
    ? analystDiscordStatusPresentation(record.status)
    : { label: profile.discord.roleStatus, tone: "neutral" as const };

  return (
    <section className={modulePanelSurface("purple", "space-y-4")}>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/30 bg-black/25 text-violet-200">
          <MessageSquare className="h-4 w-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">Discord</h2>
          <p className="text-xs text-tc-muted">
            Reflection of Analyst Discord domain · shared infrastructure
          </p>
        </div>
      </div>

      {record ? (
        <>
          <dl className="space-y-2.5 text-sm">
            <Row
              label="Discord Status"
              value={<StatusBadge label={status.label} tone={status.tone} />}
            />
            <Row
              label="Username"
              value={
                record.discordUsername
                  ? `@${record.discordUsername}`
                  : "Not linked"
              }
            />
            <Row
              label="Assigned Role"
              value={analystDiscordRoleLabel(record.assignedRole)}
            />
            <Row
              label="Connection Date"
              value={formatAnalystDiscordDate(record.connectedAt)}
            />
            <Row
              label="Last Synchronization"
              value={formatAnalystDiscordDate(record.lastSyncAt)}
            />
          </dl>

          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href={`/admin/analysts/discord?view=directory&discord=${record.id}`}
              className="rounded-lg border border-violet-400/30 bg-violet-500/10 px-3.5 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/20"
            >
              Open Discord Directory
            </Link>
            <Link
              href={`/admin/analysts/discord?view=operations&discord=${record.id}`}
              className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              Discord Operations
            </Link>
          </div>
        </>
      ) : (
        <>
          <dl className="space-y-2.5 text-sm">
            <Row label="Discord Account" value={`@${profile.discord.account}`} />
            <Row label="Current Role" value={profile.discord.currentRole} />
            <Row
              label="Last Sync"
              value={formatAnalystDiscordDate(profile.discord.lastSync)}
            />
            <Row label="Role Status" value={profile.discord.roleStatus} />
          </dl>
          <p className="text-xs text-tc-muted">
            No Discord domain record yet. Approve an application to activate partnership
            Discord lifecycle, or open the Discord module once a record exists.
          </p>
          <Link
            href="/admin/analysts/discord"
            className="inline-flex text-sm text-violet-300 hover:text-violet-200"
          >
            Open Discord domain →
          </Link>
        </>
      )}
    </section>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-tc-muted">{label}</dt>
      <dd className="truncate text-right text-white/90">{value}</dd>
    </div>
  );
}
