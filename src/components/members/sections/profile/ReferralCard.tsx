import { Link2 } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type { MemberProfile } from "@/types/members/profile";
import { FieldRow, ManageLink, ReflectionCard } from "./ReflectionCard";

type ReferralCardProps = {
  profile: MemberProfile;
};

export function ReferralCard({ profile }: ReferralCardProps) {
  const { referral } = profile;
  const pct = Math.round((referral.completed / referral.target) * 100);

  return (
    <ReflectionCard
      tone="emerald"
      title="Referral"
      icon={Link2}
      footer={
        <ManageLink
          href={`/admin/referrals?member=${profile.id}`}
          label="Manage Referral"
          tone="emerald"
        />
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs text-tc-muted">Total Referral Task</p>
            <p className="text-lg font-semibold tabular-nums text-white">{referral.target}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-tc-muted">Completed</p>
            <p className="text-sm font-medium tabular-nums">
              <span className="text-emerald-300">{referral.completed}</span>
              <span className="text-tc-muted"> / {referral.target}</span>
            </p>
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-tc-muted">
            <span>Progress</span>
            <span className="tabular-nums">{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className={cn(
                "h-full rounded-full transition-[width]",
                pct >= 100 ? "bg-emerald-400" : pct >= 50 ? "bg-emerald-400" : "bg-amber-400"
              )}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniStat label="Successful" value={String(referral.completed)} />
          <MiniStat label="Pending" value={String(referral.pending)} />
          <MiniStat
            label="Credits"
            value={`$${referral.creditsEarned.toFixed(2)}`}
            valueClassName="text-emerald-300"
          />
        </div>

        <div className="divide-y divide-white/5 border-t border-white/10 pt-1">
          <FieldRow label="Credit per Referral">
            <span className="text-emerald-300">${referral.creditPerReferral}</span>
          </FieldRow>
          <FieldRow label="Redemption Status">
            <StatusBadge
              label={referral.redemptionLabel}
              tone={referral.redemptionTone}
              dot={false}
            />
          </FieldRow>
        </div>
      </div>
    </ReflectionCard>
  );
}

function MiniStat({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 px-2 py-2 text-center">
      <p className="text-[10px] text-tc-muted sm:text-xs">{label}</p>
      <p className={cn("mt-1 text-sm font-semibold tabular-nums text-white", valueClassName)}>
        {value}
      </p>
    </div>
  );
}
