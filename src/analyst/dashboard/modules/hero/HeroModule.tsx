"use client";

import {
  Calendar,
  CheckCircle2,
  Handshake,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { Badge } from "@/analyst/dashboard/ui/Badge";
import { HeroIllustration } from "@/analyst/dashboard/ui/HeroIllustration";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export function HeroModule() {
  const { display, isLoading } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={3} />;

  const { hero } = display;

  return (
    <section
      className="analyst-module analyst-glass relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border p-6 sm:p-7 md:min-h-[400px] md:p-9"
      style={{
        borderColor: analystTheme.accentBorder,
        background:
          "radial-gradient(ellipse 90% 80% at 25% 15%, rgba(90, 40, 180, 0.55) 0%, transparent 55%), radial-gradient(ellipse 70% 70% at 90% 80%, rgba(6, 214, 247, 0.14) 0%, transparent 50%), radial-gradient(ellipse 40% 50% at 70% 20%, rgba(245, 215, 110, 0.06) 0%, transparent 45%), linear-gradient(160deg, #1a1240 0%, #0a1630 45%, #06101f 100%)",
        boxShadow:
          "0 0 80px rgba(90, 40, 180, 0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Geometric depth */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,transparent_40%)]" />
      <div className="pointer-events-none absolute -right-20 top-8 h-64 w-64 rotate-12 rounded-[2rem] border border-white/[0.04]" />
      <div className="pointer-events-none absolute -right-8 top-24 h-40 w-40 -rotate-6 rounded-[1.5rem] border border-purple-400/10" />
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-tc-purple/25 blur-3xl analyst-glow-pulse" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-52 w-52 rounded-full bg-cyan-500/12 blur-3xl analyst-float-delay" />
      <div className="pointer-events-none absolute right-1/4 top-0 h-32 w-32 rounded-full bg-[#F5D76E]/[0.06] blur-2xl" />

      <div className="relative z-10 grid flex-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="flex flex-col items-start text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65 backdrop-blur-sm">
            <Handshake
              className="h-3.5 w-3.5"
              style={{ color: analystTheme.accentMuted }}
            />
            Welcome to your Analyst Workspace
          </div>

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            <Sparkles
              className="h-3.5 w-3.5"
              style={{ color: analystTheme.accentMuted }}
            />
            Partnership Performance
          </div>

          <div className="mb-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="text-sm font-medium text-white/55">
              Welcome back,
            </span>
            <h2
              className={`${displaySerif.className} text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[3.25rem]`}
            >
              {hero.displayName}
            </h2>
            <CheckCircle2 className="h-6 w-6 shrink-0 self-center text-[#A78BFA] md:h-7 md:w-7" />
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            <Badge tone="success" pulse>
              {hero.partnerStatusLabel}
            </Badge>
            <Badge tone="neutral">
              <Calendar className="h-3 w-3" />
              Joined {hero.partneredAtLabel}
            </Badge>
            <Badge tone="accent">Partner Workspace</Badge>
          </div>

          <p className="max-w-lg text-sm leading-relaxed text-white/70 md:text-[15px]">
            {hero.welcomeMessage} Monitor referrals, unlock commission tiers, and
            manage payouts — all synchronized from Analyst Management.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[280px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-purple-500/10 to-transparent blur-xl" />
          <div className="relative rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur-md sm:p-5">
            <HeroIllustration />
            <div className="mt-2 text-center">
              <p className="text-sm font-semibold text-white">
                {hero.illustrationLabel}
              </p>
              <p className="mt-1 text-[11px] text-white/45">
                Growth · Intelligence · Community
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 sm:gap-3">
        {[
          { icon: Target, label: "Monitor growth." },
          { icon: TrendingUp, label: "Track commissions." },
          { icon: Users, label: "Partner ecosystem." },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-black/20 px-2 py-3 text-center backdrop-blur-sm"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-tc-cyan/40 text-tc-cyan">
              <item.icon className="h-4 w-4" strokeWidth={1.6} />
            </div>
            <span className="text-[10px] leading-tight text-white/60 sm:text-[11px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
