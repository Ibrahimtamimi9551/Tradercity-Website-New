"use client";

import { Lightbulb } from "lucide-react";
import { SectionHeader } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { cn } from "@/lib/admin/cn";
import type { BusinessInsight } from "@/types/members/referral-intelligence";

type Props = {
  insights: BusinessInsight[];
};

const toneStyles = {
  positive: "border-emerald-500/25 bg-emerald-500/5",
  neutral: "border-white/10 bg-white/[0.03]",
  attention: "border-amber-500/25 bg-amber-500/5",
} as const;

const toneLabel = {
  positive: "Opportunity",
  neutral: "Insight",
  attention: "Watch",
} as const;

export function BusinessInsightsSection({ insights }: Props) {
  return (
    <section>
      <SectionHeader
        title="Business Insights"
        description="Actionable summaries for referral program decisions."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {insights.map((insight) => (
          <article
            key={insight.id}
            className={cn(
              modulePanelSurface("purple", "border p-4 sm:p-5"),
              toneStyles[insight.tone]
            )}
          >
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb
                className={cn(
                  "h-4 w-4 shrink-0",
                  insight.tone === "positive" && "text-emerald-300",
                  insight.tone === "neutral" && "text-violet-300",
                  insight.tone === "attention" && "text-amber-300"
                )}
                aria-hidden
              />
              <span className="text-[10px] font-medium uppercase tracking-wider text-tc-muted">
                {toneLabel[insight.tone]}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white">{insight.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{insight.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
