"use client";

import type { ReactNode } from "react";
import { StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { PublicProfileEditablePatch } from "@/lib/analysts/mock/public-profile-mutations";
import {
  MARKETS_MAX,
  PUBLIC_PROFILE_MARKET_LABELS,
  PUBLIC_PROFILE_MARKET_OPTIONS,
  RESEARCH_FOCUS_MAX,
  SHORT_INTRODUCTION_MAX,
  SHORT_INTRODUCTION_SOFT_MIN,
  publicProfileStatusBadge,
  type PublicAnalystProfile,
  type PublicProfileMarket,
} from "@/types/analysts/public-profile";

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-[#0c101c] px-3 py-2.5 text-sm text-white/90 placeholder:text-tc-muted focus:border-tc-purple/50 focus:outline-none focus:ring-2 focus:ring-tc-purple/20";

const labelClass = "text-[10px] font-medium uppercase tracking-wide text-tc-muted";

type PublicProfileEditorProps = {
  profile: PublicAnalystProfile;
  onPatch: (patch: PublicProfileEditablePatch) => void;
  onSaveDraft: () => void;
  onMarkPreview: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  hasUnsavedChanges: boolean;
  className?: string;
};

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className={modulePanelSurface("purple", "space-y-4 p-4 sm:p-5")}>
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-tc-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function PublicProfileEditor({
  profile,
  onPatch,
  onSaveDraft,
  onMarkPreview,
  onPublish,
  onUnpublish,
  hasUnsavedChanges,
  className,
}: PublicProfileEditorProps) {
  const statusBadge = publicProfileStatusBadge(profile.status);
  const introLen = profile.shortIntroduction.length;
  const introHint =
    introLen < SHORT_INTRODUCTION_SOFT_MIN
      ? `Aim for ${SHORT_INTRODUCTION_SOFT_MIN}–${SHORT_INTRODUCTION_MAX} characters`
      : `${introLen} / ${SHORT_INTRODUCTION_MAX}`;

  const toggleMarket = (market: PublicProfileMarket) => {
    const exists = profile.markets.includes(market);
    if (exists) {
      onPatch({ markets: profile.markets.filter((m) => m !== market) });
      return;
    }
    if (profile.markets.length >= MARKETS_MAX) return;
    onPatch({ markets: [...profile.markets, market] });
  };

  const updateFocusAt = (index: number, value: string) => {
    const next = [...profile.researchFocus];
    next[index] = value;
    onPatch({ researchFocus: next });
  };

  const addFocus = () => {
    if (profile.researchFocus.length >= RESEARCH_FOCUS_MAX) return;
    onPatch({ researchFocus: [...profile.researchFocus, ""] });
  };

  const removeFocus = (index: number) => {
    onPatch({
      researchFocus: profile.researchFocus.filter((_, i) => i !== index),
    });
  };

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-4", className)}>
      <div className={modulePanelSurface("navy", "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between")}>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-white">Homepage Presentation</p>
            <StatusBadge label={statusBadge.label} tone={statusBadge.tone} />
            {hasUnsavedChanges ? (
              <span className="text-[11px] text-amber-200/90">Unsaved changes</span>
            ) : null}
          </div>
          <p className="text-xs text-tc-muted">
            Curate how this analyst appears in Meet the Analysts. Soft publish = homepage-eligible.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSaveDraft}
            className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/90 hover:bg-white/[0.08]"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={onMarkPreview}
            className="rounded-lg border border-sky-400/30 bg-sky-500/10 px-3 py-2 text-xs font-medium text-sky-100 hover:bg-sky-500/15"
          >
            Mark preview
          </button>
          {profile.status === "published" ? (
            <button
              type="button"
              onClick={onUnpublish}
              className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-100 hover:bg-amber-500/15"
            >
              Unpublish
            </button>
          ) : (
            <button
              type="button"
              onClick={onPublish}
              className="rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-3 py-2 text-xs font-medium text-emerald-100 hover:bg-emerald-500/20"
            >
              Publish
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-2">
        <Section
          title="1 · Identity"
          description="Hero area of the homepage card."
        >
          <label className="block space-y-1.5">
            <span className={labelClass}>Profile image URL</span>
            <input
              type="url"
              value={profile.profileImageUrl ?? ""}
              onChange={(e) =>
                onPatch({ profileImageUrl: e.target.value.trim() || null })
              }
              placeholder="https://… (optional — initials used when empty)"
              className={fieldClass}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Display name</span>
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) => onPatch({ displayName: e.target.value })}
              className={fieldClass}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Analyst title</span>
            <input
              type="text"
              value={profile.analystTitle}
              onChange={(e) => onPatch({ analystTitle: e.target.value })}
              placeholder="Order Flow Expert"
              className={fieldClass}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <p className={labelClass}>Verification badge</p>
              <p className="mt-1 text-sm text-emerald-300/90">
                {profile.verified ? "TraderCity Verified Analyst" : "—"}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <p className={labelClass}>Active status</p>
              <p className="mt-1 text-sm text-white/85">
                {profile.active ? "Active (Directory)" : "Not active yet (Directory)"}
              </p>
              <p className="mt-0.5 text-[11px] text-tc-muted">Read-only · synced from Directory</p>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-white/85">
            <input
              type="checkbox"
              checked={profile.featured}
              onChange={(e) => onPatch({ featured: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-[#0c101c]"
            />
            Featured analyst
          </label>
        </Section>

        <Section
          title="2 · Homepage introduction"
          description="First description visitors read."
        >
          <label className="block space-y-1.5">
            <span className={labelClass}>Short introduction</span>
            <textarea
              value={profile.shortIntroduction}
              onChange={(e) =>
                onPatch({
                  shortIntroduction: e.target.value.slice(0, SHORT_INTRODUCTION_MAX),
                })
              }
              rows={3}
              className={fieldClass}
            />
            <span
              className={cn(
                "text-[11px]",
                introLen < SHORT_INTRODUCTION_SOFT_MIN ? "text-amber-200/80" : "text-tc-muted"
              )}
            >
              {introHint}
            </span>
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Public statement</span>
            <input
              type="text"
              value={profile.publicStatement}
              onChange={(e) => onPatch({ publicStatement: e.target.value })}
              placeholder="Trade probabilities. Not predictions."
              className={fieldClass}
            />
          </label>
        </Section>

        <Section
          title="3 · Public statistics"
          description="Presentation-only. Disabled or empty stats stay hidden on the card."
        >
          <div className="space-y-3">
            {profile.statistics.map((stat, index) => (
              <div
                key={stat.key}
                className="grid gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-[7rem_1fr_auto] sm:items-center"
              >
                <p className="text-xs font-medium text-white/70">{stat.label}</p>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => {
                    const statistics = profile.statistics.map((s, i) =>
                      i === index ? { ...s, value: e.target.value } : s
                    );
                    onPatch({ statistics });
                  }}
                  placeholder="e.g. 6+ Years"
                  className={fieldClass}
                  disabled={!stat.enabled}
                />
                <label className="flex items-center gap-2 text-xs text-white/70">
                  <input
                    type="checkbox"
                    checked={stat.enabled}
                    onChange={(e) => {
                      const statistics = profile.statistics.map((s, i) =>
                        i === index ? { ...s, enabled: e.target.checked } : s
                      );
                      onPatch({ statistics });
                    }}
                    className="h-4 w-4 rounded border-white/20 bg-[#0c101c]"
                  />
                  Show
                </label>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="4 · Research focus"
          description={`Core expertise — maximum ${RESEARCH_FOCUS_MAX}.`}
        >
          <div className="space-y-2">
            {profile.researchFocus.map((item, index) => (
              <div key={`focus-${index}`} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateFocusAt(index, e.target.value)}
                  className={fieldClass}
                />
                <button
                  type="button"
                  onClick={() => removeFocus(index)}
                  className="shrink-0 rounded-lg border border-white/10 px-2.5 text-xs text-tc-muted hover:text-white"
                >
                  Remove
                </button>
              </div>
            ))}
            {profile.researchFocus.length < RESEARCH_FOCUS_MAX ? (
              <button
                type="button"
                onClick={addFocus}
                className="text-xs font-medium text-violet-300 hover:text-violet-200"
              >
                + Add focus area
              </button>
            ) : null}
          </div>
        </Section>

        <Section
          title="5 · Trading philosophy"
          description="Trading Approach block on the homepage card."
        >
          <label className="block space-y-1.5">
            <span className={labelClass}>Philosophy title</span>
            <input
              type="text"
              value={profile.philosophyTitle}
              onChange={(e) => onPatch({ philosophyTitle: e.target.value })}
              placeholder="Institutional Order Flow"
              className={fieldClass}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Description</span>
            <textarea
              value={profile.philosophyDescription}
              onChange={(e) => onPatch({ philosophyDescription: e.target.value })}
              rows={3}
              className={fieldClass}
            />
          </label>
        </Section>

        <Section
          title="6 · Markets covered"
          description={`Market icons on the card — maximum ${MARKETS_MAX}.`}
        >
          <div className="flex flex-wrap gap-2">
            {PUBLIC_PROFILE_MARKET_OPTIONS.map((market) => {
              const selected = profile.markets.includes(market);
              const disabled = !selected && profile.markets.length >= MARKETS_MAX;
              return (
                <button
                  key={market}
                  type="button"
                  disabled={disabled}
                  onClick={() => toggleMarket(market)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                    selected
                      ? "border-sky-400/40 bg-sky-500/15 text-sky-100"
                      : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20",
                    disabled && "cursor-not-allowed opacity-40"
                  )}
                >
                  {PUBLIC_PROFILE_MARKET_LABELS[market]}
                </button>
              );
            })}
          </div>
        </Section>

        <Section
          title="7 · Public links"
          description="Only links with values appear on the card."
        >
          {(
            [
              ["website", "Website"],
              ["x", "X"],
              ["youtube", "YouTube"],
              ["telegram", "Telegram"],
              ["discord", "Discord"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block space-y-1.5">
              <span className={labelClass}>{label}</span>
              <input
                type="url"
                value={profile.links[key] ?? ""}
                onChange={(e) =>
                  onPatch({
                    links: {
                      ...profile.links,
                      [key]: e.target.value.trim() || undefined,
                    },
                  })
                }
                placeholder="https://"
                className={fieldClass}
              />
            </label>
          ))}
        </Section>

        <Section
          title="8 · Homepage card settings"
          description="Visibility, featured placement, and display order."
        >
          <label className="flex items-center gap-2 text-sm text-white/85">
            <input
              type="checkbox"
              checked={profile.publicVisibility}
              onChange={(e) => onPatch({ publicVisibility: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-[#0c101c]"
            />
            Public visibility
          </label>
          <label className="flex items-center gap-2 text-sm text-white/85">
            <input
              type="checkbox"
              checked={profile.featured}
              onChange={(e) => onPatch({ featured: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-[#0c101c]"
            />
            Featured analyst
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Display order</span>
            <input
              type="number"
              value={profile.displayOrder}
              onChange={(e) =>
                onPatch({ displayOrder: Number(e.target.value) || 0 })
              }
              className={cn(fieldClass, "max-w-[10rem]")}
            />
            <span className="text-[11px] text-tc-muted">
              Lower numbers appear first. Featured profiles sort ahead of order.
            </span>
          </label>
        </Section>
      </div>
    </div>
  );
}
