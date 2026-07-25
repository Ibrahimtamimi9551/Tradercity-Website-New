"use client";

import { HeadphonesIcon, Mail, MessageSquare } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { ModulePanel } from "@/analyst/dashboard/surfaces/ModulePanel";
import { Button } from "@/analyst/dashboard/ui/Button";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

export function HelpSupportModule() {
  const { display, isLoading } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={2} />;

  const { helpSupport } = display;

  return (
    <div id="analyst-help-support">
      <ModulePanel
        title="Help & Support"
        icon={HeadphonesIcon}
        personality="support"
        subtitle="Policy, FAQ, and direct contact"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: analystTheme.accentBorder,
              background: analystTheme.accentSoft,
            }}
          >
            <h3 className="text-sm font-semibold text-white">
              Commission Policy
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              {helpSupport.commissionPolicy.map((line) => (
                <li key={line} className="flex gap-2">
                  <span style={{ color: analystTheme.accentMuted }}>•</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl border p-4"
            style={{
              borderColor: analystTheme.cardBorder,
              background: analystTheme.insetBg,
            }}
          >
            <h3 className="text-sm font-semibold text-white">Payout FAQ</h3>
            <ul className="mt-3 space-y-3">
              {helpSupport.payoutFaq.map((item) => (
                <li key={item.question}>
                  <p className="text-sm font-medium text-white/90">
                    {item.question}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/45">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <a href={helpSupport.discordUrl} target="_blank" rel="noreferrer">
            <Button variant="primary">
              <MessageSquare className="h-4 w-4" />
              {helpSupport.discordLabel}
            </Button>
          </a>
          <a href={`mailto:${helpSupport.supportEmail}`}>
            <Button variant="secondary">
              <Mail className="h-4 w-4" />
              {helpSupport.supportEmail}
            </Button>
          </a>
        </div>
      </ModulePanel>
    </div>
  );
}
