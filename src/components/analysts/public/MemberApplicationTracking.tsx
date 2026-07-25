"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useMemberAnalystApplication } from "@/lib/analysts/hooks/useMemberAnalystApplication";

export function MemberApplicationTracking() {
  const { user } = useAuth();
  const { isReady, hasApplication, application } = useMemberAnalystApplication();
  const dashboardHref =
    user?.membershipTier === "vip" ? "/dashboard/vip" : "/dashboard/free";

  if (!isReady) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-16 font-sans text-white">
        <div className="mx-auto max-w-lg">
          <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
          <div className="mt-6 h-40 animate-pulse rounded-2xl bg-white/[0.04]" />
        </div>
      </main>
    );
  }

  if (!hasApplication || !application) {
    return (
      <main className="min-h-screen bg-[#050816] px-6 py-16 font-sans text-white">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold">No application yet</h1>
          <p className="mt-3 text-sm text-white/50">
            Start from the Analyst Landing Page to learn about the program and apply.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/analysts"
              className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Become an Analyst
            </Link>
            <Link
              href={dashboardHref}
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] font-sans text-white">
      <div className="border-b border-white/[0.06] px-6 py-4 sm:px-8">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href={dashboardHref} className="text-sm text-white/50 hover:text-white">
            ← Dashboard
          </Link>
          <span className="text-xs text-white/40">{application.applicationId}</span>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-6 py-12 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80">
          Analyst Application
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Status</h1>
        <p className="mt-2 text-lg font-semibold text-violet-200">
          {application.statusLabel}
        </p>
        <p className="mt-1 text-sm text-white/40">
          Submitted{" "}
          {new Date(application.appliedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-6">
          <ul className="space-y-4">
            {application.stages.map((stage) => {
              const mark =
                stage.state === "complete"
                  ? "✓"
                  : stage.state === "current"
                    ? "●"
                    : "○";
              const color =
                stage.state === "complete"
                  ? "text-emerald-300"
                  : stage.state === "current"
                    ? "text-violet-300"
                    : "text-white/30";
              const labelColor =
                stage.state === "upcoming" ? "text-white/35" : "text-white/85";
              return (
                <li key={stage.id} className="flex items-center gap-3 text-sm">
                  <span className={`w-4 text-center font-medium ${color}`}>{mark}</span>
                  <span className={`font-medium ${labelColor}`}>{stage.label}</span>
                  {stage.state === "current" ? (
                    <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-violet-300/80">
                      Current
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-white/35">
          Progress updates as Admin reviews your application (mock store).
        </p>
      </div>
    </main>
  );
}
