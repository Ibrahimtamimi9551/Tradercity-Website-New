"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SectionHeader } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { cn } from "@/lib/admin/cn";
import type {
  LeaderboardContributor,
  LeaderboardSortKey,
} from "@/types/members/referral-intelligence";
import { formatCount, formatPercent, formatUsd } from "./format";

type Props = {
  contributors: LeaderboardContributor[];
  totalReferralRevenue: number;
};

type SortDirection = "asc" | "desc";

const SORT_OPTIONS: { key: LeaderboardSortKey; label: string }[] = [
  { key: "revenue", label: "Revenue Generated" },
  { key: "memberships", label: "Successful Memberships" },
  { key: "credits", label: "Credits Earned" },
  { key: "conversion", label: "Conversion Rate" },
  { key: "share", label: "Revenue Share" },
];

function metricValue(
  row: LeaderboardContributor,
  key: LeaderboardSortKey,
  totalRevenue: number
) {
  switch (key) {
    case "revenue":
      return row.revenueGenerated;
    case "memberships":
      return row.successfulMemberships;
    case "credits":
      return row.creditsEarned;
    case "conversion":
      return row.conversionRate;
    case "share":
      return totalRevenue > 0 ? (row.revenueGenerated / totalRevenue) * 100 : 0;
  }
}

function pickWinner(
  rows: LeaderboardContributor[],
  key: Exclude<LeaderboardSortKey, "share">
) {
  return rows.reduce((best, row) =>
    metricValue(row, key, 1) > metricValue(best, key, 1) ? row : best
  );
}

export function ReferralLeaderboardSection({
  contributors,
  totalReferralRevenue,
}: Props) {
  const [sortKey, setSortKey] = useState<LeaderboardSortKey>("revenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const highlights = useMemo(() => {
    if (contributors.length === 0) return null;
    const byRevenue = pickWinner(contributors, "revenue");
    const byConversion = pickWinner(contributors, "conversion");
    const byMemberships = pickWinner(contributors, "memberships");
    const byCredits = pickWinner(contributors, "credits");
    return [
      {
        label: "Highest Revenue Contributor",
        name: byRevenue.displayName,
        value: formatUsd(byRevenue.revenueGenerated),
        hint: `@${byRevenue.username}`,
      },
      {
        label: "Highest Conversion",
        name: byConversion.displayName,
        value: formatPercent(byConversion.conversionRate),
        hint: `@${byConversion.username}`,
      },
      {
        label: "Most Memberships",
        name: byMemberships.displayName,
        value: formatCount(byMemberships.successfulMemberships),
        hint: `@${byMemberships.username}`,
      },
      {
        label: "Highest Credits Earned",
        name: byCredits.displayName,
        value: formatUsd(byCredits.creditsEarned),
        hint: `@${byCredits.username}`,
      },
    ];
  }, [contributors]);

  const ranked = useMemo(() => {
    const dir = sortDirection === "asc" ? 1 : -1;
    return [...contributors]
      .sort((a, b) => {
        const av = metricValue(a, sortKey, totalReferralRevenue);
        const bv = metricValue(b, sortKey, totalReferralRevenue);
        if (av === bv) return a.displayName.localeCompare(b.displayName);
        return (av - bv) * dir;
      })
      .map((row, index) => ({
        ...row,
        rank: index + 1,
        share:
          totalReferralRevenue > 0
            ? (row.revenueGenerated / totalReferralRevenue) * 100
            : 0,
      }));
  }, [contributors, sortDirection, sortKey, totalReferralRevenue]);

  const onSortHeader = (key: LeaderboardSortKey) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === "desc" ? "asc" : "desc"));
      return;
    }
    setSortKey(key);
    setSortDirection("desc");
  };

  return (
    <section>
      <SectionHeader
        title="Referral Performance Leaderboard"
        description="Which referrers contribute the most value to TraderCity — one view, multiple perspectives."
      />

      <div className={modulePanelSurface("gold", "overflow-hidden p-0")}>
        <div className="p-5 sm:p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-[#E8C96A]/90">
            Executive Highlights
          </h3>
          <p className="mt-1 text-xs text-tc-muted">
            Different winners across performance dimensions.
          </p>

          {highlights ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/10 bg-black/20 px-4 py-3.5"
                >
                  <p className="text-[10px] font-medium uppercase tracking-wider text-tc-muted">
                    {item.label}
                  </p>
                  <p className="mt-2 truncate text-base font-semibold text-white">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xl font-semibold tabular-nums text-[#E8C96A]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] text-tc-muted">{item.hint}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="border-t border-white/10">
          <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h3 className="text-sm font-medium text-white">Leaderboard</h3>
              <p className="mt-0.5 text-xs text-tc-muted">
                Sort by any performance metric — ranks update instantly.
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs text-tc-muted">
              <span className="shrink-0">Sort by</span>
              <select
                value={sortKey}
                onChange={(e) => {
                  setSortKey(e.target.value as LeaderboardSortKey);
                  setSortDirection("desc");
                }}
                className="min-h-9 rounded-lg border border-white/15 bg-[#0c101c] px-2.5 text-xs text-white outline-none focus:border-amber-400/40"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-tc-muted">
                  <th className="px-4 py-3 font-medium sm:px-5">Rank</th>
                  <th className="px-4 py-3 font-medium sm:px-5">Member</th>
                  {(
                    [
                      ["memberships", "Memberships"],
                      ["revenue", "Revenue Generated"],
                      ["credits", "Credits Earned"],
                      ["conversion", "Conversion Rate"],
                      ["share", "Revenue Share"],
                    ] as const
                  ).map(([key, label]) => {
                    const active = sortKey === key;
                    return (
                      <th key={key} className="px-4 py-3 font-medium sm:px-5">
                        <button
                          type="button"
                          onClick={() => onSortHeader(key)}
                          className={cn(
                            "inline-flex items-center gap-1 transition-colors hover:text-white",
                            active ? "text-white" : "text-tc-muted"
                          )}
                        >
                          {label}
                          {active ? (
                            sortDirection === "desc" ? (
                              <ArrowDown className="h-3 w-3" aria-hidden />
                            ) : (
                              <ArrowUp className="h-3 w-3" aria-hidden />
                            )
                          ) : null}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {ranked.map((row) => (
                  <tr
                    key={row.username}
                    className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3 sm:px-5">
                      <span
                        className={cn(
                          "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                          row.rank === 1 && "bg-[#D4AF37]/25 text-[#E8C96A]",
                          row.rank === 2 && "bg-white/10 text-white/90",
                          row.rank === 3 && "bg-amber-700/30 text-amber-200",
                          row.rank > 3 && "bg-white/[0.04] text-tc-muted"
                        )}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <p className="font-medium text-white">{row.displayName}</p>
                      <p className="text-xs text-tc-muted">@{row.username}</p>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-white/90 sm:px-5">
                      {formatCount(row.successfulMemberships)}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-rose-200/90 sm:px-5">
                      {formatUsd(row.revenueGenerated)}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-white/90 sm:px-5">
                      {formatUsd(row.creditsEarned)}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-emerald-300/90 sm:px-5">
                      {formatPercent(row.conversionRate)}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-white/70 sm:px-5">
                      {formatPercent(row.share)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
