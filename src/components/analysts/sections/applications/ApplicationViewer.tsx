"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { SelectField, StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  APPLICATION_SCORE_THRESHOLD,
  AUDIENCE_PLATFORM_LABELS,
  EVALUATION_CATEGORIES,
  TRADING_STYLE_LABELS,
  applicationHandle,
  applicationStatusBadge,
  formatPrimaryMarkets,
  type AnalystApplication,
  type ApplicationDecisionAction,
  type ApplicationVerificationState,
  type ApplicationViewerTabId,
  type EvaluationCategoryId,
} from "@/types/analysts/applications";
import { ApplicationViewerTabs } from "./ApplicationViewerTabs";

const avatarToneStyles: Record<AnalystApplication["avatarTone"], string> = {
  discord: "bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

type ApplicationViewerProps = {
  application: AnalystApplication | null;
  activeTab: ApplicationViewerTabId;
  onTabChange: (tab: ApplicationViewerTabId) => void;
  threshold: number;
  onUpdateCategory: (
    categoryId: EvaluationCategoryId,
    patch: { rating?: number | null; notes?: string }
  ) => void;
  onUpdateVerification: (patch: {
    verificationState?: ApplicationVerificationState;
    verificationNotes?: string;
  }) => void;
  onUpdateNotes: (patch: {
    internalNotes?: string;
    interviewNotes?: string;
    stageRating?: number | null;
  }) => void;
  onDecision: (action: ApplicationDecisionAction) => void;
  className?: string;
  layout?: "panel" | "page";
};

export function ApplicationViewer({
  application,
  activeTab,
  onTabChange,
  threshold,
  onUpdateCategory,
  onUpdateVerification,
  onUpdateNotes,
  onDecision,
  className,
  layout = "panel",
}: ApplicationViewerProps) {
  if (!application) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select an application</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to open the review pipeline — application, verification, evaluation, and
          decision stay in one workspace.
        </p>
      </div>
    );
  }

  const status = applicationStatusBadge(application.status);
  const handle = applicationHandle(application);
  const initials = handle.slice(0, 2).toUpperCase();
  const applied = new Date(application.appliedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={cn(
        "admin-card-surface flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-violet-500/20 [--admin-card-bg:#120e22]",
        className
      )}
    >
      <div
        className={cn(
          "shrink-0 border-b border-white/10",
          layout === "page" ? "p-4 sm:p-5" : "p-3.5 sm:p-4"
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
              avatarToneStyles[application.avatarTone]
            )}
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {application.analystName}
              </h2>
              <StatusBadge label={status.label} tone={status.tone} />
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted sm:text-sm">
              @{handle} · {application.email}
            </p>
            <p className="mt-1 text-xs text-white/70">
              Applied {applied}
              {application.overallScore !== null ? (
                <>
                  {" "}
                  · Score{" "}
                  <span className="tabular-nums text-violet-200">
                    {application.overallScore}/100
                  </span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-2 sm:px-3">
        <ApplicationViewerTabs active={activeTab} onChange={onTabChange} />
      </div>

      <div
        className="min-h-0 flex-1 overflow-y-auto p-3.5 sm:p-4"
        role="tabpanel"
        aria-labelledby={`application-viewer-tab-${activeTab}`}
      >
        {activeTab === "application" ? (
          <ApplicationContentTab application={application} />
        ) : null}
        {activeTab === "verification" ? (
          <VerificationTab application={application} onUpdate={onUpdateVerification} />
        ) : null}
        {activeTab === "evaluation" ? (
          <EvaluationTab
            application={application}
            threshold={threshold}
            onUpdateCategory={onUpdateCategory}
          />
        ) : null}
        {activeTab === "notes" ? (
          <NotesTab application={application} onUpdate={onUpdateNotes} />
        ) : null}
        {activeTab === "decision" ? (
          <DecisionTab
            application={application}
            threshold={threshold}
            onDecision={onDecision}
          />
        ) : null}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-medium uppercase tracking-wide text-tc-muted">{label}</p>
      <div className="text-sm leading-relaxed text-white/85">{children}</div>
    </div>
  );
}

function SectionHeading({
  index,
  title,
  tone,
}: {
  index: string;
  title: string;
  tone: string;
}) {
  return (
    <div className="flex items-baseline gap-2 border-b border-white/10 pb-2">
      <span className={cn("text-[10px] font-semibold uppercase tracking-wider", tone)}>
        {index}
      </span>
      <h3 className="text-sm font-medium text-white">{title}</h3>
    </div>
  );
}

function ExternalHref({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      {...EXTERNAL_LINK_PROPS}
      className="inline-flex items-center gap-1 text-sm text-violet-300 hover:text-violet-200"
    >
      {label}
      <ExternalLink className="h-3 w-3" aria-hidden />
    </a>
  );
}

function ApplicationContentTab({ application }: { application: AnalystApplication }) {
  return (
    <div className="space-y-5">
      <section className="space-y-3">
        <SectionHeading index="01" title="Analyst Profile" tone="text-violet-300" />
        <Field label="Analyst Name">{application.analystName}</Field>
        <Field label="Short Bio">{application.shortBio}</Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Years of Experience">{application.yearsOfExperience}</Field>
          <Field label="Primary Market">
            {formatPrimaryMarkets(application.primaryMarkets)}
          </Field>
          <Field label="X (Twitter) Handle">{application.xHandle}</Field>
          <Field label="Discord Username">
            {application.discordUsername ?? "—"}
          </Field>
          <Field label="Email (ops)">{application.email}</Field>
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeading index="02" title="Trading Background" tone="text-blue-300" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Trading Duration">{application.tradingDuration}</Field>
          <Field label="Primary Trading Style">
            {TRADING_STYLE_LABELS[application.primaryTradingStyle]}
          </Field>
        </div>
        <Field label="Public Track Record">
          {application.publicTrackRecordUrl ? (
            <ExternalHref href={application.publicTrackRecordUrl} label="Open track record" />
          ) : (
            "—"
          )}
        </Field>
        <Field label="Website">
          {application.tradingWebsite ? (
            <ExternalHref href={application.tradingWebsite} label={application.tradingWebsite} />
          ) : (
            "—"
          )}
        </Field>
      </section>

      <section className="space-y-3">
        <SectionHeading index="03" title="Audience & Community" tone="text-emerald-300" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Primary Audience Platform">
            {AUDIENCE_PLATFORM_LABELS[application.primaryAudiencePlatform]}
          </Field>
          <Field label="Total Audience Size">{application.totalAudienceSize}</Field>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-medium uppercase tracking-wide text-tc-muted">
            Social Platform Links
          </p>
          <ul className="space-y-1">
            {application.socialLinks.map((link) => (
              <li key={link.id}>
                <ExternalHref href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </div>
        <Field label="Website">
          {application.audienceWebsite ? (
            <ExternalHref href={application.audienceWebsite} label={application.audienceWebsite} />
          ) : (
            "—"
          )}
        </Field>
      </section>

      <section className="space-y-3">
        <SectionHeading index="04" title="Content & Application" tone="text-amber-300" />
        <Field label="Best Analysis Thread / Post">
          {application.bestAnalysis ? (
            <ExternalHref
              href={application.bestAnalysis.href}
              label={`${application.bestAnalysis.label} (${application.bestAnalysis.kind})`}
            />
          ) : (
            "—"
          )}
        </Field>
        <Field label="Best Educational Content">
          {application.bestEducational ? (
            <ExternalHref
              href={application.bestEducational.href}
              label={`${application.bestEducational.label} (${application.bestEducational.kind})`}
            />
          ) : (
            "—"
          )}
        </Field>
        <Field label="Motivation">{application.motivation}</Field>
      </section>
    </div>
  );
}

function VerificationTab({
  application,
  onUpdate,
}: {
  application: AnalystApplication;
  onUpdate: (patch: {
    verificationState?: ApplicationVerificationState;
    verificationNotes?: string;
  }) => void;
}) {
  const [notes, setNotes] = useState(application.verificationNotes);
  const [state, setState] = useState(application.verificationState);

  useEffect(() => {
    setNotes(application.verificationNotes);
    setState(application.verificationState);
  }, [application.id, application.verificationNotes, application.verificationState]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/75">
        Confirm genuine identity and partnership intent. Text-channel style verification — not KYC,
        no mandatory video.
      </p>
      <label className="block space-y-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wide text-tc-muted">
          Verification state
        </span>
        <SelectField
          aria-label="Verification state"
          value={state}
          options={[
            { value: "pending", label: "Pending" },
            { value: "verified", label: "Verified" },
            { value: "concerns", label: "Concerns" },
          ]}
          onChange={(value) => {
            const next = value as ApplicationVerificationState;
            setState(next);
            onUpdate({ verificationState: next });
          }}
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wide text-tc-muted">
          Verification notes
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => {
            if (notes !== application.verificationNotes) {
              onUpdate({ verificationNotes: notes });
            }
          }}
          rows={5}
          placeholder="Identity trail, intent, availability, professional behaviour…"
          className="w-full resize-y rounded-lg border border-white/10 bg-[#0c101c] px-3 py-2.5 text-sm text-white/90 placeholder:text-tc-muted focus:border-tc-purple/50 focus:outline-none focus:ring-2 focus:ring-tc-purple/20"
        />
      </label>
    </div>
  );
}

const RATING_OPTIONS = [
  { value: "", label: "Not rated" },
  ...Array.from({ length: 11 }, (_, i) => ({
    value: String(i),
    label: `${i} / 10`,
  })),
];

/** Read-only concise panel — Evaluation Workspace context (not the full Application tab). */
function EvaluationContextSummary({ application }: { application: AnalystApplication }) {
  return (
    <div className={modulePanelSurface("navy", "space-y-3 p-3.5")}>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-300">
          Evaluation context
        </p>
        <p className="mt-0.5 text-xs text-tc-muted">
          Read-only summary — full form remains on the Application tab.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Analyst">{application.analystName}</Field>
        <Field label="Primary Market">
          {formatPrimaryMarkets(application.primaryMarkets)}
        </Field>
        <Field label="Experience">{application.yearsOfExperience}</Field>
        <Field label="Trading Style">
          {TRADING_STYLE_LABELS[application.primaryTradingStyle]}
        </Field>
        <Field label="Audience">
          {AUDIENCE_PLATFORM_LABELS[application.primaryAudiencePlatform]} ·{" "}
          {application.totalAudienceSize}
        </Field>
        <Field label="X">{application.xHandle}</Field>
      </div>
      <Field label="Bio">
        <span className="line-clamp-3">{application.shortBio}</span>
      </Field>
      <Field label="Motivation">
        <span className="line-clamp-3">{application.motivation}</span>
      </Field>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {application.bestAnalysis ? (
          <ExternalHref href={application.bestAnalysis.href} label="Best analysis" />
        ) : null}
        {application.bestEducational ? (
          <ExternalHref href={application.bestEducational.href} label="Best education" />
        ) : null}
        {application.publicTrackRecordUrl ? (
          <ExternalHref href={application.publicTrackRecordUrl} label="Track record" />
        ) : null}
      </div>
    </div>
  );
}

function EvaluationTab({
  application,
  threshold,
  onUpdateCategory,
}: {
  application: AnalystApplication;
  threshold: number;
  onUpdateCategory: (
    categoryId: EvaluationCategoryId,
    patch: { rating?: number | null; notes?: string }
  ) => void;
}) {
  const score = application.overallScore;
  const meets = score !== null && score >= threshold;

  return (
    <div className="space-y-4">
      <EvaluationContextSummary application={application} />

      <div className={modulePanelSurface("purple", "space-y-1 p-3.5")}>
        <p className="text-[10px] font-medium uppercase tracking-wide text-tc-muted">
          Overall score
        </p>
        <p className="text-2xl font-semibold tabular-nums text-white">
          {score === null ? "—" : score}
          <span className="text-base font-normal text-tc-muted"> / 100</span>
        </p>
        <p className="text-xs text-white/70">
          Threshold {threshold}+ → Approve path
          {score !== null ? (
            <>
              {" "}
              ·{" "}
              <span className={meets ? "text-emerald-300" : "text-amber-200"}>
                {meets ? "Meets threshold" : "Below threshold"}
              </span>
            </>
          ) : null}
        </p>
      </div>

      <div className="space-y-3">
        {EVALUATION_CATEGORIES.map((cat) => {
          const row = application.evaluation.find((c) => c.categoryId === cat.id);
          return (
            <CategoryCard
              key={cat.id}
              label={cat.label}
              hint={cat.hint}
              rating={row?.rating ?? null}
              notes={row?.notes ?? ""}
              reviewer={row?.reviewer}
              updatedAt={row?.updatedAt}
              onRatingChange={(rating) => onUpdateCategory(cat.id, { rating })}
              onNotesBlur={(notes) => {
                if (notes !== (row?.notes ?? "")) {
                  onUpdateCategory(cat.id, { notes });
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function CategoryCard({
  label,
  hint,
  rating,
  notes,
  reviewer,
  updatedAt,
  onRatingChange,
  onNotesBlur,
}: {
  label: string;
  hint: string;
  rating: number | null;
  notes: string;
  reviewer: string | null | undefined;
  updatedAt: string | null | undefined;
  onRatingChange: (rating: number | null) => void;
  onNotesBlur: (notes: string) => void;
}) {
  const [draft, setDraft] = useState(notes);
  useEffect(() => {
    setDraft(notes);
  }, [notes, label]);

  return (
    <div className="space-y-2 rounded-lg border border-white/10 bg-black/20 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs text-tc-muted">{hint}</p>
        </div>
        <SelectField
          aria-label={`${label} rating`}
          value={rating === null ? "" : String(rating)}
          options={RATING_OPTIONS}
          onChange={(value) => onRatingChange(value === "" ? null : Number(value))}
          size="compact"
          className="w-28"
        />
      </div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => onNotesBlur(draft)}
        rows={2}
        placeholder="Category notes…"
        className="w-full resize-y rounded-lg border border-white/10 bg-[#0c101c] px-2.5 py-2 text-xs text-white/90 placeholder:text-tc-muted focus:border-tc-purple/50 focus:outline-none focus:ring-2 focus:ring-tc-purple/20"
      />
      {reviewer && updatedAt ? (
        <p className="text-[10px] text-tc-muted">
          {reviewer} · {new Date(updatedAt).toLocaleString("en-GB")}
        </p>
      ) : null}
    </div>
  );
}

function NotesTab({
  application,
  onUpdate,
}: {
  application: AnalystApplication;
  onUpdate: (patch: {
    internalNotes?: string;
    interviewNotes?: string;
    stageRating?: number | null;
  }) => void;
}) {
  const [internal, setInternal] = useState(application.internalNotes);
  const [interview, setInterview] = useState(application.interviewNotes);
  const [rating, setRating] = useState(
    application.stageRating === null ? "" : String(application.stageRating)
  );

  useEffect(() => {
    setInternal(application.internalNotes);
    setInterview(application.interviewNotes);
    setRating(application.stageRating === null ? "" : String(application.stageRating));
  }, [
    application.id,
    application.internalNotes,
    application.interviewNotes,
    application.stageRating,
  ]);

  return (
    <div className="space-y-4">
      <label className="block space-y-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wide text-tc-muted">
          Stage rating
        </span>
        <SelectField
          aria-label="Stage rating"
          value={rating}
          options={[
            { value: "", label: "Not rated" },
            ...[1, 2, 3, 4, 5].map((n) => ({
              value: String(n),
              label: `${"★".repeat(n)}${"☆".repeat(5 - n)}`,
            })),
          ]}
          onChange={(value) => {
            setRating(value);
            onUpdate({ stageRating: value === "" ? null : Number(value) });
          }}
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wide text-tc-muted">
          Internal notes
        </span>
        <textarea
          value={internal}
          onChange={(e) => setInternal(e.target.value)}
          onBlur={() => {
            if (internal !== application.internalNotes) {
              onUpdate({ internalNotes: internal });
            }
          }}
          rows={4}
          placeholder="Admin-only operational notes…"
          className="w-full resize-y rounded-lg border border-white/10 bg-[#0c101c] px-3 py-2.5 text-sm text-white/90 placeholder:text-tc-muted focus:border-tc-purple/50 focus:outline-none focus:ring-2 focus:ring-tc-purple/20"
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wide text-tc-muted">
          Interview notes
        </span>
        <textarea
          value={interview}
          onChange={(e) => setInterview(e.target.value)}
          onBlur={() => {
            if (interview !== application.interviewNotes) {
              onUpdate({ interviewNotes: interview });
            }
          }}
          rows={4}
          placeholder="Partnership discussion notes (not an employment interview)…"
          className="w-full resize-y rounded-lg border border-white/10 bg-[#0c101c] px-3 py-2.5 text-sm text-white/90 placeholder:text-tc-muted focus:border-tc-purple/50 focus:outline-none focus:ring-2 focus:ring-tc-purple/20"
        />
      </label>
    </div>
  );
}

function DecisionTab({
  application,
  threshold,
  onDecision,
}: {
  application: AnalystApplication;
  threshold: number;
  onDecision: (action: ApplicationDecisionAction) => void;
}) {
  const score = application.overallScore;
  const belowThreshold = score !== null && score < threshold;
  const stars = application.stageRating;
  const handoff = application.partnershipHandoff;

  return (
    <div className="space-y-4">
      <div className={modulePanelSurface("burgundy", "space-y-2 p-3.5")}>
        <p className="text-sm font-medium text-white">Decision summary</p>
        <div className="flex flex-wrap items-center gap-2 text-sm text-white/75">
          <span>Status</span>
          <StatusBadge {...applicationStatusBadge(application.status)} />
        </div>
        <p className="text-sm text-white/75">
          Score:{" "}
          <span className="tabular-nums text-white">
            {score === null ? "—" : `${score}/100`}
          </span>
          {belowThreshold ? (
            <span className="text-amber-200"> · below {threshold} threshold</span>
          ) : null}
        </p>
        {stars !== null ? (
          <p className="flex items-center gap-1 text-sm text-white/75">
            Stage rating:
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < stars ? "fill-amber-300 text-amber-300" : "text-white/20"
                )}
                aria-hidden
              />
            ))}
          </p>
        ) : null}
        {application.decisionReason ? (
          <p className="text-xs text-white/65">Reason: {application.decisionReason}</p>
        ) : null}
      </div>

      {handoff ? (
        <div className={modulePanelSurface("emerald", "space-y-2 p-3.5")}>
          <p className="text-sm font-medium text-white">Partnership activated</p>
          <p className="text-xs text-white/75">
            Analyst identity <span className="text-emerald-200">{handoff.analystId}</span> created.
            Directory · Control Center · Discord records are live. Referral reserved for Wave E.
            Applications now only record how this partner entered the platform.
          </p>
          <p className="text-[10px] text-tc-muted">
            Control Center: {handoff.controlCenterPath}
            {handoff.discordRecordId ? ` · Discord: ${handoff.discordRecordId}` : null}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/analysts/discord"
              className="inline-flex text-sm text-emerald-300 hover:text-emerald-200"
            >
              Open Discord →
            </Link>
            <Link
              href={handoff.controlCenterPath}
              className="inline-flex text-sm text-emerald-300 hover:text-emerald-200"
            >
              Open Control Center →
            </Link>
          </div>
        </div>
      ) : null}

      <ul className="space-y-1.5 text-xs text-tc-muted">
        <li>
          <span className="text-emerald-300">Approve</span> → create Analyst identity · Directory ·
          Discord · reserve Referral → System Provisioning (Onboarding)
        </li>
        <li>
          <span className="text-rose-300">Reject</span> → archive application · store decision reason
        </li>
        <li>
          <span className="text-amber-200">Request Information</span> → waiting applicant · resume
          review later
        </li>
      </ul>

      <div className="grid gap-2">
        <button
          type="button"
          onClick={() => onDecision("approve")}
          disabled={application.status === "approved"}
          className="rounded-lg border border-emerald-400/35 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-200 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={() => onDecision("request_information")}
          disabled={application.status === "pending_information"}
          className="rounded-lg border border-amber-400/35 bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-100 hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Request Information
        </button>
        <button
          type="button"
          onClick={() => onDecision("reject")}
          disabled={application.status === "rejected"}
          className="rounded-lg border border-rose-400/35 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-200 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export { APPLICATION_SCORE_THRESHOLD };
