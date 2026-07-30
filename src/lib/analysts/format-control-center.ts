import type { StatusTone } from "@/types/admin/common";
import type {
  AnalystLifecycleStatus,
  AnalystTier,
} from "@/types/analysts/directory";
import type {
  ActivityStatusPresentation,
  AnalystActivityStatus,
} from "@/types/analysts/control-center";

export function analystStatusBadge(
  status: AnalystLifecycleStatus
): { label: string; tone: StatusTone } {
  const map: Record<AnalystLifecycleStatus, { label: string; tone: StatusTone }> = {
    under_review: { label: "Under Review", tone: "warning" },
    verification: { label: "Verification", tone: "info" },
    partnership_discussion: { label: "Partnership", tone: "info" },
    onboarding: { label: "Onboarding", tone: "info" },
    active: { label: "Active", tone: "success" },
    growing: { label: "Growing", tone: "vip" },
    suspended: { label: "Suspended", tone: "danger" },
    closed: { label: "Closed", tone: "neutral" },
  };
  return map[status];
}

export function analystTierBadge(
  tier: AnalystTier
): { label: string; tone: StatusTone } | null {
  if (tier === "none") return null;
  const map: Record<Exclude<AnalystTier, "none">, { label: string; tone: StatusTone }> = {
    partner: { label: "Partner", tone: "info" },
    growing: { label: "Growing", tone: "vip" },
    top_partner: { label: "Top Partner", tone: "vip" },
  };
  return map[tier];
}

export function analystTierLabel(tier: AnalystTier): string {
  return analystTierBadge(tier)?.label ?? "None";
}

export function activityStatusPresentation(
  status: AnalystActivityStatus
): ActivityStatusPresentation {
  const map: Record<AnalystActivityStatus, ActivityStatusPresentation> = {
    active_today: { label: "Active Today", tone: "success" },
    active: { label: "Active (3 Days)", tone: "success" },
    quiet: { label: "Quiet (5 Days)", tone: "warning" },
    inactive: { label: "Inactive (9 Days)", tone: "warning" },
    critical: { label: "Critical (15 Days)", tone: "danger" },
  };
  return map[status];
}

export function formatReach(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`;
  return String(count);
}

export function formatPartneredDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatControlCenterDateTime(iso: string): string {
  const date = new Date(iso);
  return `${date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })} · ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
}
