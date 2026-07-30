"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Library } from "lucide-react";
import { PageTitle } from "@/components/admin/ui/PageTitle";
import {
  architectureContent,
  glossaryTerms,
  moduleGuides,
  overviewContent,
  parseGuideTab,
  troubleshootingScenarios,
} from "@/lib/admin/guide";
import type { GuideTabId } from "@/types/admin/guide";
import { ArchitectureGuideView } from "./ArchitectureGuideView";
import { GlossaryList } from "./GlossaryList";
import { GuideCenterTabs } from "./GuideCenterTabs";
import { ModuleGuideView } from "./ModuleGuideView";
import { OverviewGuideView } from "./OverviewGuideView";
import { TroubleshootingList } from "./TroubleshootingList";

function GuideTabPanel({
  tab,
  onSelectTab,
}: {
  tab: GuideTabId;
  onSelectTab: (next: GuideTabId) => void;
}) {
  switch (tab) {
    case "overview":
      return <OverviewGuideView content={overviewContent} />;
    case "architecture":
      return <ArchitectureGuideView content={architectureContent} />;
    case "glossary":
      return <GlossaryList terms={glossaryTerms} />;
    case "troubleshooting":
      return (
        <TroubleshootingList
          scenarios={troubleshootingScenarios}
          onSelectTab={onSelectTab}
        />
      );
    case "dashboard":
    case "members":
    case "profile":
    case "subscriptions":
    case "discord":
    case "referrals": {
      const guide = moduleGuides[tab];
      if (!guide) return null;
      return <ModuleGuideView guide={guide} onSelectTab={onSelectTab} />;
    }
    default:
      return null;
  }
}

export function GuideCenterPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = parseGuideTab(searchParams.get("tab"));

  const setTab = useCallback(
    (tab: GuideTabId) => {
      const next = new URLSearchParams(searchParams.toString());
      if (tab === "overview") next.delete("tab");
      else next.set("tab", tab);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="space-y-6">
      <PageTitle
        title="Admin Guide Center"
        subtitle="Understand the complete TraderCity operational workflow, module relationships and lifecycle architecture."
        icon={Library}
      />

      <GuideCenterTabs active={activeTab} onChange={setTab} />

      <div
        role="tabpanel"
        aria-labelledby={`guide-tab-${activeTab}`}
        className="min-w-0"
      >
        <GuideTabPanel tab={activeTab} onSelectTab={setTab} />
      </div>
    </div>
  );
}
