/**
 * Member-facing Analyst application progress (projection of Admin queue).
 * Scores and evaluation detail stay Admin-only.
 */

export type MemberApplicationStageId =
  | "submitted"
  | "verification"
  | "evaluation"
  | "interview"
  | "decision"
  | "onboarding";

export type MemberApplicationStageState = "complete" | "current" | "upcoming";

export type MemberApplicationStage = {
  id: MemberApplicationStageId;
  label: string;
  state: MemberApplicationStageState;
};

export type MemberApplicationSnapshot = {
  applicationId: string;
  analystName: string;
  /** Short status for dashboard card */
  statusLabel: string;
  appliedAt: string;
  stages: MemberApplicationStage[];
};

export const MEMBER_APPLICATION_STAGE_ORDER: {
  id: MemberApplicationStageId;
  label: string;
}[] = [
  { id: "submitted", label: "Submitted" },
  { id: "verification", label: "Verification" },
  { id: "evaluation", label: "Evaluation" },
  { id: "interview", label: "Interview" },
  { id: "decision", label: "Decision" },
  { id: "onboarding", label: "Onboarding" },
];
