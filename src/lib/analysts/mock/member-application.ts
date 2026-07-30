/** DEV MOCK ONLY — binds a member session to an AnalystApplication in the admin mock store. */

import type { AnalystApplication } from "@/types/analysts/applications";
import {
  MEMBER_APPLICATION_STAGE_ORDER,
  type MemberApplicationSnapshot,
  type MemberApplicationStage,
  type MemberApplicationStageId,
} from "@/types/analysts/member-application";
import { getMockApplication } from "./applications";

const STORAGE_KEY = "tc.dev.memberAnalystApplicationByUser";

type BindingMap = Record<string, string>;

function readBindings(): BindingMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as BindingMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeBindings(map: BindingMap): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getMemberApplicationId(userId: string): string | null {
  return readBindings()[userId] ?? null;
}

export function bindMemberApplication(userId: string, applicationId: string): void {
  const map = readBindings();
  map[userId] = applicationId;
  writeBindings(map);
}

/** Map Admin application record → member progress stages. */
export function projectMemberApplication(
  app: AnalystApplication
): MemberApplicationSnapshot {
  const currentIndex = resolveCurrentStageIndex(app);
  const stages: MemberApplicationStage[] = MEMBER_APPLICATION_STAGE_ORDER.map(
    (stage, index) => ({
      id: stage.id,
      label: stage.label,
      state:
        index < currentIndex
          ? "complete"
          : index === currentIndex
            ? "current"
            : "upcoming",
    })
  );

  return {
    applicationId: app.id,
    analystName: app.analystName,
    statusLabel: memberStatusLabel(app, currentIndex),
    appliedAt: app.appliedAt,
    stages,
  };
}

export function getMemberApplicationSnapshot(
  userId: string
): MemberApplicationSnapshot | null {
  const applicationId = getMemberApplicationId(userId);
  if (!applicationId) return null;
  const app = getMockApplication(applicationId);
  if (!app) return null;
  return projectMemberApplication(app);
}

function resolveCurrentStageIndex(app: AnalystApplication): number {
  if (app.status === "rejected") {
    return stageIndex("decision");
  }
  if (app.status === "approved") {
    return app.partnershipHandoff
      ? stageIndex("onboarding")
      : stageIndex("decision");
  }
  if (app.interviewNotes.trim().length > 0) {
    return stageIndex("interview");
  }
  if (
    app.overallScore !== null ||
    app.evaluation.some((c) => c.rating !== null)
  ) {
    return stageIndex("evaluation");
  }
  if (
    app.verificationState !== "pending" ||
    app.status === "under_review" ||
    app.status === "pending_information"
  ) {
    return stageIndex("verification");
  }
  return stageIndex("submitted");
}

function stageIndex(id: MemberApplicationStageId): number {
  return MEMBER_APPLICATION_STAGE_ORDER.findIndex((s) => s.id === id);
}

function memberStatusLabel(app: AnalystApplication, currentIndex: number): string {
  if (app.status === "rejected") return "Rejected";
  if (app.status === "approved") {
    return app.partnershipHandoff ? "Onboarding" : "Approved";
  }
  return MEMBER_APPLICATION_STAGE_ORDER[currentIndex]?.label ?? "Submitted";
}
