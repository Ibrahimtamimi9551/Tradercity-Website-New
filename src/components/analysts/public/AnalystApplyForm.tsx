"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useMemberAnalystApplication } from "@/lib/analysts/hooks/useMemberAnalystApplication";
import {
  submitPublicAnalystApplication,
  type PublicApplicationFormValues,
} from "@/lib/analysts/mock/public-application-submit";
import {
  AUDIENCE_PLATFORM_LABELS,
  PRIMARY_MARKET_LABELS,
  TRADING_STYLE_LABELS,
  type AudiencePlatform,
  type PrimaryMarket,
  type TradingStyle,
} from "@/types/analysts/applications";

const MARKET_OPTIONS = Object.entries(PRIMARY_MARKET_LABELS) as [
  PrimaryMarket,
  string,
][];
const STYLE_OPTIONS = Object.entries(TRADING_STYLE_LABELS) as [
  TradingStyle,
  string,
][];
const PLATFORM_OPTIONS = Object.entries(AUDIENCE_PLATFORM_LABELS) as [
  AudiencePlatform,
  string,
][];

const initialValues = (
  displayName: string,
  email: string
): PublicApplicationFormValues => ({
  analystName: displayName,
  email,
  shortBio: "",
  yearsOfExperience: "3–5 years",
  primaryMarkets: ["crypto"],
  xHandle: "",
  discordUsername: "",
  tradingDuration: "",
  primaryTradingStyle: "swing",
  publicTrackRecordUrl: "",
  tradingWebsite: "",
  primaryAudiencePlatform: "x",
  totalAudienceSize: "",
  telegramUrl: "",
  youtubeUrl: "",
  audienceWebsite: "",
  bestAnalysisUrl: "",
  bestEducationalUrl: "",
  motivation: "",
});

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-white/70">
      {children}
      {required ? <span className="text-violet-300"> *</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-violet-400/50 focus:ring-1 focus:ring-violet-400/30";

export function AnalystApplyForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { hasApplication, application } = useMemberAnalystApplication();
  const [values, setValues] = useState<PublicApplicationFormValues>(() =>
    initialValues(user?.displayName ?? "", user?.email ?? "")
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (hasApplication && application) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-16 font-sans text-white sm:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold">Application already submitted</h1>
          <p className="mt-3 text-sm text-white/50">
            Status: {application.statusLabel}. Track progress from your Member Dashboard.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard/application"
              className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              View Progress
            </Link>
            <Link
              href="/analysts"
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80"
            >
              Back to Landing
            </Link>
          </div>
        </div>
      </main>
    );
  }

  function update<K extends keyof PublicApplicationFormValues>(
    key: K,
    value: PublicApplicationFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleMarket(market: PrimaryMarket) {
    setValues((prev) => {
      const exists = prev.primaryMarkets.includes(market);
      const next = exists
        ? prev.primaryMarkets.filter((m) => m !== market)
        : [...prev.primaryMarkets, market];
      return { ...prev, primaryMarkets: next };
    });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    setError(null);

    if (!values.analystName.trim() || !values.xHandle.trim() || !values.motivation.trim()) {
      setError("Please complete required fields: name, X handle, and motivation.");
      return;
    }
    if (values.primaryMarkets.length === 0) {
      setError("Select at least one primary market.");
      return;
    }

    setSubmitting(true);
    try {
      const app = submitPublicAnalystApplication({ userId: user.id, values });
      router.push(`/analysts/apply/success?application=${app.id}`);
    } catch {
      setError("Could not submit application. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] font-sans text-white">
      <div className="border-b border-white/[0.06] px-6 py-4 sm:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/analysts" className="text-sm text-white/50 hover:text-white">
            ← Analyst Program
          </Link>
          <span className="text-xs text-white/40">{user?.email}</span>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight">Apply as Analyst</h1>
        <p className="mt-2 text-sm text-white/50">
          Evaluation form — mock submission only. No backend. Wallet details are not
          collected here.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-10">
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wider text-violet-300/90">
              01 · Analyst Profile
            </legend>
            <div>
              <FieldLabel htmlFor="analystName" required>
                Full name / analyst name
              </FieldLabel>
              <input
                id="analystName"
                className={inputClass}
                value={values.analystName}
                onChange={(e) => update("analystName", e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="email" required>
                Contact email
              </FieldLabel>
              <input
                id="email"
                type="email"
                className={inputClass}
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="shortBio" required>
                Short bio
              </FieldLabel>
              <textarea
                id="shortBio"
                rows={3}
                className={inputClass}
                value={values.shortBio}
                onChange={(e) => update("shortBio", e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="yearsOfExperience">Years of experience</FieldLabel>
              <input
                id="yearsOfExperience"
                className={inputClass}
                value={values.yearsOfExperience}
                onChange={(e) => update("yearsOfExperience", e.target.value)}
              />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-white/70">
                Primary markets <span className="text-violet-300">*</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {MARKET_OPTIONS.map(([id, label]) => {
                  const active = values.primaryMarkets.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleMarket(id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${
                        active
                          ? "bg-violet-500/30 text-violet-100 ring-violet-400/50"
                          : "bg-white/[0.02] text-white/50 ring-white/10 hover:text-white/80"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="xHandle" required>
                  X handle
                </FieldLabel>
                <input
                  id="xHandle"
                  className={inputClass}
                  placeholder="@yourhandle"
                  value={values.xHandle}
                  onChange={(e) => update("xHandle", e.target.value)}
                  required
                />
              </div>
              <div>
                <FieldLabel htmlFor="discordUsername">Discord username</FieldLabel>
                <input
                  id="discordUsername"
                  className={inputClass}
                  value={values.discordUsername}
                  onChange={(e) => update("discordUsername", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wider text-violet-300/90">
              02 · Trading Background
            </legend>
            <div>
              <FieldLabel htmlFor="tradingDuration" required>
                Trading duration
              </FieldLabel>
              <input
                id="tradingDuration"
                className={inputClass}
                placeholder="e.g. 5 years"
                value={values.tradingDuration}
                onChange={(e) => update("tradingDuration", e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="primaryTradingStyle">Primary trading style</FieldLabel>
              <select
                id="primaryTradingStyle"
                className={inputClass}
                value={values.primaryTradingStyle}
                onChange={(e) =>
                  update("primaryTradingStyle", e.target.value as TradingStyle)
                }
              >
                {STYLE_OPTIONS.map(([id, label]) => (
                  <option key={id} value={id} className="bg-[#120e22]">
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel htmlFor="publicTrackRecordUrl">Public track record URL</FieldLabel>
              <input
                id="publicTrackRecordUrl"
                className={inputClass}
                placeholder="https://"
                value={values.publicTrackRecordUrl}
                onChange={(e) => update("publicTrackRecordUrl", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel htmlFor="tradingWebsite">Trading website</FieldLabel>
              <input
                id="tradingWebsite"
                className={inputClass}
                value={values.tradingWebsite}
                onChange={(e) => update("tradingWebsite", e.target.value)}
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wider text-violet-300/90">
              03 · Audience & Community
            </legend>
            <div>
              <FieldLabel htmlFor="primaryAudiencePlatform">
                Primary audience platform
              </FieldLabel>
              <select
                id="primaryAudiencePlatform"
                className={inputClass}
                value={values.primaryAudiencePlatform}
                onChange={(e) =>
                  update("primaryAudiencePlatform", e.target.value as AudiencePlatform)
                }
              >
                {PLATFORM_OPTIONS.map(([id, label]) => (
                  <option key={id} value={id} className="bg-[#120e22]">
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel htmlFor="totalAudienceSize" required>
                Total audience size
              </FieldLabel>
              <input
                id="totalAudienceSize"
                className={inputClass}
                placeholder="e.g. 5k–10k"
                value={values.totalAudienceSize}
                onChange={(e) => update("totalAudienceSize", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="telegramUrl">Telegram URL</FieldLabel>
                <input
                  id="telegramUrl"
                  className={inputClass}
                  value={values.telegramUrl}
                  onChange={(e) => update("telegramUrl", e.target.value)}
                />
              </div>
              <div>
                <FieldLabel htmlFor="youtubeUrl">YouTube URL</FieldLabel>
                <input
                  id="youtubeUrl"
                  className={inputClass}
                  value={values.youtubeUrl}
                  onChange={(e) => update("youtubeUrl", e.target.value)}
                />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="audienceWebsite">Audience website</FieldLabel>
              <input
                id="audienceWebsite"
                className={inputClass}
                value={values.audienceWebsite}
                onChange={(e) => update("audienceWebsite", e.target.value)}
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wider text-violet-300/90">
              04 · Content & Motivation
            </legend>
            <div>
              <FieldLabel htmlFor="bestAnalysisUrl">Best analysis link</FieldLabel>
              <input
                id="bestAnalysisUrl"
                className={inputClass}
                placeholder="https://"
                value={values.bestAnalysisUrl}
                onChange={(e) => update("bestAnalysisUrl", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel htmlFor="bestEducationalUrl">Best educational link</FieldLabel>
              <input
                id="bestEducationalUrl"
                className={inputClass}
                placeholder="https://"
                value={values.bestEducationalUrl}
                onChange={(e) => update("bestEducationalUrl", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel htmlFor="motivation" required>
                Why join TraderCity?
              </FieldLabel>
              <textarea
                id="motivation"
                rows={4}
                className={inputClass}
                value={values.motivation}
                onChange={(e) => update("motivation", e.target.value)}
                required
              />
            </div>
          </fieldset>

          {error ? (
            <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit Application"}
          </button>
        </form>
      </div>
    </main>
  );
}
