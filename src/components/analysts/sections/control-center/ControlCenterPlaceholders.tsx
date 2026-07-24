"use client";

import { Coins, LineChart, MessageSquare, Clock } from "lucide-react";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { formatControlCenterDateTime } from "@/lib/analysts/format-control-center";
import type { AnalystControlCenter } from "@/types/analysts/control-center";

export function ControlCenterTimelinePlaceholder() {
  return (
    <section className={modulePanelSurface("navy", "space-y-4")}>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/30 bg-black/25 text-blue-200">
          <Clock className="h-4 w-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">Timeline</h2>
          <p className="text-xs text-tc-muted">Lifecycle and operational history</p>
        </div>
      </div>
      <div className="rounded-lg border border-dashed border-white/10 bg-black/20 px-4 py-8 text-center">
        <p className="text-sm text-white/85">Timeline layout reserved</p>
        <p className="mt-2 text-xs text-tc-muted">
          TODO(NestJS): load analyst timeline events from Admin APIs.
        </p>
      </div>
    </section>
  );
}

export function ControlCenterDiscordPlaceholder({
  profile,
}: {
  profile: AnalystControlCenter;
}) {
  return (
    <section className={modulePanelSurface("purple", "space-y-4")}>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/30 bg-black/25 text-violet-200">
          <MessageSquare className="h-4 w-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">Discord</h2>
          <p className="text-xs text-tc-muted">
            Future shared Discord infrastructure · Analyst role (not VIP)
          </p>
        </div>
      </div>
      <dl className="space-y-2.5 text-sm">
        <Row label="Discord Account" value={`@${profile.discord.account}`} />
        <Row label="Current Role" value={profile.discord.currentRole} />
        <Row
          label="Last Sync"
          value={formatControlCenterDateTime(profile.discord.lastSync)}
        />
        <Row label="Role Status" value={profile.discord.roleStatus} />
      </dl>
      <p className="text-xs text-tc-muted">
        Mock reflection only. Full sync controls ship with the Analyst Discord module.
      </p>
    </section>
  );
}

export function ControlCenterPerformancePlaceholder() {
  return (
    <section className={modulePanelSurface("emerald", "space-y-4")}>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/30 bg-black/25 text-emerald-200">
          <LineChart className="h-4 w-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">Performance</h2>
          <p className="text-xs text-tc-muted">Growth · Publishing · Revenue · Engagement</p>
        </div>
      </div>
      <div className="rounded-lg border border-dashed border-white/10 bg-black/20 px-4 py-8 text-center">
        <p className="text-sm text-white/85">Performance layout reserved</p>
        <p className="mt-2 text-xs text-tc-muted">
          Will plug into Performance Monitoring once that module ships.
        </p>
      </div>
    </section>
  );
}

export function ControlCenterCommissionsPlaceholder() {
  return (
    <section className={modulePanelSurface("gold", "space-y-4")}>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/30 bg-black/25 text-[#E8C96A]">
          <Coins className="h-4 w-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">Commissions</h2>
          <p className="text-xs text-tc-muted">Wave F — payouts · wallet · tiers</p>
        </div>
      </div>
      <div className="rounded-lg border border-dashed border-white/10 bg-black/20 px-4 py-8 text-center">
        <p className="text-sm text-white/85">Commission calculations deferred</p>
        <p className="mt-2 text-xs text-tc-muted">
          Wave F will consume Referral Identity, Successful Referrals, membership
          plan breakdown, and conversion counts from the Referrals domain.
        </p>
        <a
          href="/admin/analysts/referrals"
          className="mt-3 inline-flex text-xs font-medium text-violet-300 hover:text-violet-200"
        >
          Open Referrals domain →
        </a>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-tc-muted">{label}</dt>
      <dd className="truncate text-right text-white/90">{value}</dd>
    </div>
  );
}
