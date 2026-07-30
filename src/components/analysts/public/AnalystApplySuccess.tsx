"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { MEMBER_APPLICATION_STAGE_ORDER } from "@/types/analysts/member-application";

export function AnalystApplySuccess() {
  const { user } = useAuth();
  const dashboardHref =
    user?.membershipTier === "vip" ? "/dashboard/vip" : "/dashboard/free";

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 font-sans text-white sm:px-8">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80">
          Application Submitted
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Thank you.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          Your application has been received. You can track progress from your Member
          Dashboard.
        </p>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
            Next steps
          </p>
          <ul className="mt-4 space-y-2.5">
            {MEMBER_APPLICATION_STAGE_ORDER.filter((s) => s.id !== "submitted").map(
              (stage) => (
                <li
                  key={stage.id}
                  className="flex items-center gap-2.5 text-sm text-white/70"
                >
                  <span className="text-violet-300/80">✓</span>
                  {stage.label}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={dashboardHref}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition hover:brightness-110"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/dashboard/application"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
          >
            View Progress
          </Link>
        </div>
      </div>
    </main>
  );
}
