import Link from "next/link";
import { Crown, FileText, MoreVertical } from "lucide-react";
import {
  DataTable,
  StatusBadge,
  SystemHealthBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type { DirectoryMember } from "@/types/members/directory";

const avatarToneStyles: Record<DirectoryMember["avatarTone"], string> = {
  discord: "bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

function MemberAvatar({ member }: { member: DirectoryMember }) {
  const initials = member.username.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        "h-7 w-7 text-[10px] sm:h-9 sm:w-9 sm:text-xs",
        avatarToneStyles[member.avatarTone]
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function MembershipCell({ membership }: { membership: DirectoryMember["membership"] }) {
  if (membership === "vip") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/35 bg-violet-500/15 px-1.5 py-0.5 text-[10px] font-medium text-violet-200 sm:gap-1.5 sm:px-2.5 sm:text-xs">
        <Crown className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden />
        VIP
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/70 sm:gap-1.5 sm:px-2.5 sm:text-xs">
      <FileText className="h-2.5 w-2.5 sm:h-3 sm:w-3" aria-hidden />
      Free
    </span>
  );
}

function SubscriptionCell({ status }: { status: DirectoryMember["subscription"] }) {
  if (status === "none") {
    return <span className="text-sm text-tc-muted">N/A</span>;
  }

  const map = {
    active: { label: "Active", tone: "success" as const },
    pending_verification: { label: "Pending Verification", tone: "warning" as const },
    verification_required: { label: "Verification Required", tone: "danger" as const },
  }[status];

  return <StatusBadge label={map.label} tone={map.tone} />;
}

function DiscordCell({ status }: { status: DirectoryMember["discord"] }) {
  const map = {
    connected: { label: "Connected", tone: "success" as const },
    disconnected: { label: "Disconnected", tone: "neutral" as const },
    action_required: { label: "Action Required", tone: "danger" as const },
    suspended: { label: "Suspended", tone: "danger" as const },
  }[status];

  return <StatusBadge label={map.label} tone={map.tone} />;
}

function ReferralProgressCell({ member }: { member: DirectoryMember }) {
  const pct = Math.round((member.referralCurrent / member.referralTarget) * 100);
  const barColor =
    pct >= 100 ? "bg-emerald-400" : pct >= 50 ? "bg-amber-400" : "bg-rose-400";

  return (
    <div className="min-w-[8.5rem]">
      <div className="mb-1 flex items-center justify-between gap-2 text-xs">
        <span className="tabular-nums text-white/80">
          {member.referralCurrent} / {member.referralTarget}
        </span>
        <span className="tabular-nums text-tc-muted">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className={cn("h-full rounded-full", barColor)} style={{ width: `${pct}%` }} />
      </div>
      {member.referralEligible ? (
        <div className="mt-1.5">
          <StatusBadge label="Eligible" tone="success" dot={false} />
        </div>
      ) : null}
    </div>
  );
}

function JoinedDateCell({ iso }: { iso: string }) {
  const date = new Date(iso);
  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="whitespace-nowrap">
      <p className="text-sm text-white/85">{day}</p>
      <p className="text-xs text-tc-muted">{time}</p>
    </div>
  );
}

const columns: DataTableColumn<DirectoryMember>[] = [
  {
    key: "username",
    header: "Discord Username",
    render: (row) => (
      <Link
        href={`/admin/members/${row.id}`}
        className="flex items-center gap-2 sm:gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <MemberAvatar member={row} />
        <span className="min-w-0">
          <span className="block max-w-[7.5rem] truncate text-[11px] font-medium text-violet-300 hover:text-violet-200 sm:max-w-none sm:text-sm">
            {row.username}
          </span>
          <span className="block max-w-[7.5rem] truncate text-[10px] text-tc-muted sm:max-w-none sm:text-xs">
            {row.email}
          </span>
        </span>
      </Link>
    ),
  },
  {
    key: "membership",
    header: "Membership",
    render: (row) => <MembershipCell membership={row.membership} />,
  },
  {
    key: "subscription",
    header: "Subscription",
    render: (row) => <SubscriptionCell status={row.subscription} />,
  },
  {
    key: "discord",
    header: "Discord",
    render: (row) => <DiscordCell status={row.discord} />,
  },
  {
    key: "referral",
    header: "Referral Progress",
    render: (row) => <ReferralProgressCell member={row} />,
  },
  {
    key: "joined",
    header: "Joined Date",
    render: (row) => <JoinedDateCell iso={row.joinedAt} />,
  },
  {
    key: "health",
    header: "System Health",
    render: (row) => <SystemHealthBadge state={row.systemHealth} />,
  },
  {
    key: "actions",
    header: "Actions",
    className: "w-12",
    render: () => (
      <button
        type="button"
        className="rounded-lg p-1.5 text-tc-muted transition-colors hover:bg-white/[0.06] hover:text-white"
        aria-label="Row actions"
        onClick={(e) => e.stopPropagation()}
      >
        <MoreVertical className="h-4 w-4" />
      </button>
    ),
  },
];

type MembersTableProps = {
  rows: DirectoryMember[];
  onRowNavigate: (member: DirectoryMember) => void;
};

export function MembersTable({ rows, onRowNavigate }: MembersTableProps) {
  return (
    <DataTable
      columns={columns}
      data={rows}
      getRowKey={(row) => row.id}
      onRowClick={onRowNavigate}
      emptyTitle="No members match the current filters"
      compactMobile
      className="border-white/10 bg-white/[0.015] max-sm:rounded-lg"
    />
  );
}
