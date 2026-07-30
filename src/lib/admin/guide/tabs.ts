import type { GuideTabId, GuideTabMeta } from "@/types/admin/guide";

export const GUIDE_TABS: GuideTabMeta[] = [
  { id: "overview", label: "Platform Overview" },
  { id: "dashboard", label: "Dashboard" },
  { id: "members", label: "Members" },
  { id: "profile", label: "User Profile" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "discord", label: "Discord" },
  { id: "referrals", label: "Referral" },
  { id: "architecture", label: "Architecture" },
  { id: "glossary", label: "Glossary" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "release_notes", label: "Release Notes", comingSoon: true },
];

const VALID_TABS = new Set<GuideTabId>(
  GUIDE_TABS.filter((t) => !t.comingSoon).map((t) => t.id)
);

export function parseGuideTab(value: string | null): GuideTabId {
  if (value && VALID_TABS.has(value as GuideTabId)) {
    return value as GuideTabId;
  }
  return "overview";
}
