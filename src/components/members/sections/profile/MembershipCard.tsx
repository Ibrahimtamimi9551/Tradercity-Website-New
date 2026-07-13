import { UserRound } from "lucide-react";
import {
  daysRemainingClass,
  formatDaysRemaining,
  formatProfileDateTime,
} from "@/lib/members/format-profile";
import type { MemberProfile } from "@/types/members/profile";
import { FieldRow, ManageLink, ReflectionCard } from "./ReflectionCard";

type MembershipCardProps = {
  profile: MemberProfile;
  onViewActivity?: () => void;
};

export function MembershipCard({ profile, onViewActivity }: MembershipCardProps) {
  const { membership } = profile;

  return (
    <ReflectionCard
      tone="navy"
      title="Membership Activity"
      icon={UserRound}
      footer={
        onViewActivity ? (
          <button
            type="button"
            onClick={onViewActivity}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-blue-400/35 bg-black/20 px-3 py-2.5 text-sm font-medium text-blue-200 transition-colors hover:border-blue-400/50 hover:bg-white/5"
          >
            View Activity Log
            <span aria-hidden>→</span>
          </button>
        ) : (
          <ManageLink
            href={`/admin/subscriptions?member=${profile.id}`}
            label="Manage Subscription"
            tone="navy"
          />
        )
      }
    >
      <div className="divide-y divide-white/5">
        <FieldRow label="Current Plan">
          <span className="text-violet-300">{membership.currentPlan}</span>
        </FieldRow>
        <FieldRow label="Membership Status">
          <span
            className={
              membership.statusTone === "success"
                ? "text-emerald-300"
                : membership.statusTone === "warning"
                  ? "text-amber-200"
                  : "text-white/80"
            }
          >
            {membership.statusLabel}
          </span>
        </FieldRow>
        <FieldRow label="Plan Started On">
          {formatProfileDateTime(membership.planStartedOn)}
        </FieldRow>
        <FieldRow label="Expiry Date">{formatProfileDateTime(membership.expiryDate)}</FieldRow>
        <FieldRow label="Days Remaining">
          <span className={daysRemainingClass(membership.daysRemaining)}>
            {formatDaysRemaining(membership.daysRemaining)}
          </span>
        </FieldRow>
        <FieldRow label="Renewal Count">{membership.renewalCount}</FieldRow>
        <FieldRow label="VIP Activated Via">
          <span className="text-sky-300">{membership.activatedVia ?? "—"}</span>
        </FieldRow>
        <FieldRow label="Total Duration">{membership.totalDuration}</FieldRow>
      </div>
    </ReflectionCard>
  );
}
