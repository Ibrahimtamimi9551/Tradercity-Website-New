"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useMemberAnalystApplication } from "@/lib/analysts/hooks/useMemberAnalystApplication";

type MemberAnalystApplicationCardProps = {
  /** Visual tone matching Free (purple) or VIP (gold) dashboards. */
  tone?: "free" | "vip";
  className?: string;
};

/**
 * Free / VIP dashboard card — Become Analyst CTA or Application Status.
 */
export function MemberAnalystApplicationCard({
  tone = "free",
  className = "",
}: MemberAnalystApplicationCardProps) {
  const { isReady, hasApplication, application } = useMemberAnalystApplication();

  const isVip = tone === "vip";
  const surface = isVip
    ? "rounded-2xl border border-[#F5D76E]/20 bg-[#14100a]/80 p-6"
    : "rounded-2xl border border-purple-500/20 bg-[#120a1a] p-6";
  const accent = isVip ? "text-[#F5D76E]" : "text-purple-300";
  const button = isVip
    ? "inline-flex items-center gap-2 rounded-xl border border-[#F5D76E]/40 bg-[#F5D76E]/10 px-4 py-2.5 text-sm font-semibold text-[#F5D76E] transition hover:bg-[#F5D76E]/20"
    : "inline-flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/15 px-4 py-2.5 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/25";

  if (!isReady) {
    return (
      <section className={`${surface} ${className}`}>
        <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
        <div className="mt-3 h-3 w-56 animate-pulse rounded bg-white/5" />
      </section>
    );
  }

  if (!hasApplication || !application) {
    return (
      <section className={`${surface} ${className}`}>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className={`h-4 w-4 ${accent}`} />
          <p
            className={`text-[10px] font-bold uppercase tracking-widest ${accent}`}
          >
            Analyst Program
          </p>
        </div>
        <h2 className="text-xl font-bold text-white">Become a TraderCity Analyst</h2>
        <p className="mt-2 max-w-md text-sm text-white/50">
          Share research, build your brand, and publish through TraderCity.
        </p>
        <div className="mt-5">
          <Link href="/analysts" className={button}>
            Apply
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={`${surface} ${className}`}>
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className={`h-4 w-4 ${accent}`} />
        <p className={`text-[10px] font-bold uppercase tracking-widest ${accent}`}>
          Analyst Application
        </p>
      </div>
      <h2 className="text-xl font-bold text-white">Application Status</h2>
      <p className="mt-2 text-sm text-white/50">
        Status{" "}
        <span className={`font-semibold ${accent}`}>{application.statusLabel}</span>
      </p>
      <div className="mt-5">
        <Link href="/dashboard/application" className={button}>
          View Progress
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
