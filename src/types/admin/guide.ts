/**
 * Admin Guide Center — typed content model.
 * Future-ready: media, SOP links, version, and release notes without shell changes.
 */

export type GuideTabId =
  | "overview"
  | "dashboard"
  | "members"
  | "profile"
  | "subscriptions"
  | "discord"
  | "referrals"
  | "architecture"
  | "glossary"
  | "troubleshooting"
  | "release_notes";

export type GuideMediaSlot = {
  type: "video" | "diagram";
  url: string;
  title: string;
};

export type GuideSopLink = {
  label: string;
  href: string;
};

export type GuideFlowStep = {
  label: string;
  description?: string;
};

export type GuideStatusDefinition = {
  label: string;
  /** Code enum when it differs from the display label. */
  code?: string;
  meaning: string;
  adminAction?: string;
};

export type GuideRelatedModule = {
  label: string;
  /** Guide tab to open, if internal. */
  tab?: GuideTabId;
  /** Live admin route deep-link. */
  href?: string;
};

export type GuideSourceOfTruthItem = {
  label: string;
  detail: string;
};

/** Standard 8-section module guide. */
export type ModuleGuideContent = {
  id: GuideTabId;
  title: string;
  purpose: string;
  owns: string[];
  doesNotOwn: string[];
  processFlow: GuideFlowStep[];
  crossModuleFlow: GuideFlowStep[];
  sourceOfTruth: GuideSourceOfTruthItem[];
  statuses: GuideStatusDefinition[];
  adminWorkflow: GuideFlowStep[];
  relatedModules: GuideRelatedModule[];
  /** Reserved for later — unused in v1. */
  media?: GuideMediaSlot[];
  sopLinks?: GuideSopLink[];
  version?: string;
};

export type OverviewGuideContent = {
  philosophy: string[];
  adminPurpose: string[];
  memberLifecycle: GuideFlowStep[];
  operationalLoop: GuideFlowStep[];
  principles: { title: string; body: string }[];
};

export type ArchitectureDiagram = {
  id: string;
  title: string;
  description?: string;
  steps: GuideFlowStep[];
};

export type ArchitectureGuideContent = {
  intro: string;
  diagrams: ArchitectureDiagram[];
  membershipNote: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export type TroubleshootingScenario = {
  id: string;
  title: string;
  possibleCauses: string[];
  expectedBehavior: string;
  resolution: GuideFlowStep[];
  responsibleModule: string;
  relatedHref?: string;
  relatedTab?: GuideTabId;
};

export type ReleaseNoteEntry = {
  version: string;
  date: string;
  title: string;
  summary: string;
  changes?: string[];
};

export type GuideTabMeta = {
  id: GuideTabId;
  label: string;
  comingSoon?: boolean;
};
