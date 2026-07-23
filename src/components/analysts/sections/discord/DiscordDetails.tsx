"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import {
  Copy,
  Link2,
  Link2Off,
  RefreshCw,
  Send,
  Shield,
  ShieldOff,
  History,
} from "lucide-react";
import { StatusBadge, Timeline, type TimelineItem } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  analystDiscordRoleLabel,
  analystDiscordServerLabel,
  analystDiscordStatusPresentation,
  analystDiscordSyncPresentation,
  formatAnalystDiscordDate,
} from "@/lib/analysts/format-discord";
import type {
  AnalystDiscordOperation,
  AnalystDiscordRecord,
} from "@/types/analysts/discord";
import { AnalystDiscordAvatar } from "./DiscordDirectoryTable";

type DiscordDetailsProps = {
  record: AnalystDiscordRecord | null;
  onOperation: (
    record: AnalystDiscordRecord,
    operation: AnalystDiscordOperation
  ) => void;
  fullPage?: boolean;
  className?: string;
};

/**
 * Discord inspector — desktop side panel + mobile detail page.
 * Control Center Discord tab consumes the same record shape.
 */
export function DiscordDetails({
  record,
  onOperation,
  fullPage = false,
  className,
}: DiscordDetailsProps) {
  if (!record) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select a Discord record</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to inspect connection status, role, sync health, and run
          operational actions.
        </p>
      </div>
    );
  }

  const status = analystDiscordStatusPresentation(record.status);
  const sync = analystDiscordSyncPresentation(record.syncHealth);
  const auditItems: TimelineItem[] = record.auditHistory.map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    timestamp: formatAnalystDiscordDate(entry.timestamp),
    status: entry.status,
  }));

  const copyInvite = async () => {
    onOperation(record, "copy_invite");
    const url = record.inviteUrl;
    if (url && typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* mock-first — ignore clipboard failures */
      }
    }
  };

  return (
    <div
      className={cn(
        "admin-card-surface flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-violet-500/20 [--admin-card-bg:#120e22]",
        className
      )}
    >
      <div className={cn("shrink-0 border-b border-white/10 p-4", fullPage && "sm:p-5")}>
        <div className="flex items-start gap-3">
          <AnalystDiscordAvatar record={record} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {record.displayName}
              </h2>
              <StatusBadge label={status.label} tone={status.tone} />
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted">@{record.handle}</p>
            <p className="mt-1 truncate text-xs text-white/70">
              {record.discordUsername
                ? `Discord: @${record.discordUsername}`
                : "Discord username not linked"}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Section title="Connection">
          <Field label="Status">
            <StatusBadge label={status.label} tone={status.tone} />
          </Field>
          <Field label="Assigned Role">
            <span className="text-sky-200">
              {analystDiscordRoleLabel(record.assignedRole)}
            </span>
          </Field>
          <Field label="Server Status">
            {analystDiscordServerLabel(record.serverStatus)}
          </Field>
          <Field label="Connected">
            <span className="tabular-nums">
              {formatAnalystDiscordDate(record.connectedAt)}
            </span>
          </Field>
          <Field label="Last Sync">
            <span className="inline-flex flex-wrap items-center gap-2">
              <StatusBadge label={sync.label} tone={sync.tone} />
              <span className="tabular-nums text-tc-muted">
                {formatAnalystDiscordDate(record.lastSyncAt)}
              </span>
            </span>
          </Field>
          {record.inviteUrl ? (
            <Field label="Invite">
              <span className="break-all text-xs text-violet-200">{record.inviteUrl}</span>
            </Field>
          ) : null}
        </Section>

        <Section title="Operational actions">
          <div className="grid gap-2">
            <ActionButton
              icon={Send}
              label="Generate Invite"
              onClick={() => onOperation(record, "generate_invite")}
            />
            <ActionButton
              icon={Copy}
              label="Copy Invite"
              variant="ghost"
              onClick={() => void copyInvite()}
            />
            <ActionButton
              icon={Link2}
              label="Connect Account"
              onClick={() => onOperation(record, "connect_account")}
            />
            <ActionButton
              icon={RefreshCw}
              label="Reconnect"
              variant="ghost"
              onClick={() => onOperation(record, "reconnect")}
            />
            <ActionButton
              icon={RefreshCw}
              label="Synchronize Roles"
              onClick={() => onOperation(record, "synchronize_roles")}
            />
            <ActionButton
              icon={Shield}
              label="Assign Role"
              onClick={() => onOperation(record, "assign_role")}
            />
            <ActionButton
              icon={ShieldOff}
              label="Remove Role"
              variant="ghost"
              onClick={() => onOperation(record, "remove_role")}
            />
            <ActionButton
              icon={Link2Off}
              label="Disconnect Account"
              variant="ghost"
              onClick={() => onOperation(record, "disconnect_account")}
            />
            <ActionButton
              icon={History}
              label="View Audit History"
              variant="ghost"
              onClick={() => onOperation(record, "view_audit_history")}
            />
          </div>
          <p className="text-[10px] leading-relaxed text-tc-muted">
            Assign Role gate (production): Onboarding Complete → Assign Analyst Role.
            Mock allows ops override. Future: publishing / private / education / mod
            permissions — reserved.
          </p>
        </Section>

        <div className="pt-1">
          <Link
            href={`/admin/analysts/${record.analystId}?tab=discord`}
            className="text-xs font-medium text-violet-300 hover:text-violet-200"
          >
            Open Control Center Discord →
          </Link>
        </div>

        <Section title="Audit history">
          {auditItems.length === 0 ? (
            <p className="text-xs text-tc-muted">No events yet.</p>
          ) : (
            <Timeline items={auditItems} />
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-tc-muted">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <dt className="shrink-0 text-tc-muted">{label}</dt>
      <dd className="min-w-0 text-right text-white/90">{children}</dd>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  variant = "primary",
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  variant?: "primary" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
        variant === "primary"
          ? "bg-violet-600 text-white hover:bg-violet-500"
          : "admin-ghost-btn border border-white/15 hover:bg-white/5"
      )}
    >
      <Icon className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}
