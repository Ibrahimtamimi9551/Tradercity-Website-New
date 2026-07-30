import {
  APPLICATION_SCORE_THRESHOLD,
  applicationHandle,
  computeOverallScore,
  type AnalystApplication,
  type ApplicationDecisionAction,
  type ApplicationVerificationState,
  type CategoryEvaluation,
  type EvaluationCategoryId,
} from "@/types/analysts/applications";
import {
  getMockApplication,
  replaceMockApplication,
} from "@/lib/analysts/mock/applications";
import { activatePartnershipFromApplication } from "@/lib/analysts/mock/partnership-activation";
import { ensurePublicProfileDraftFromApplication } from "@/lib/analysts/mock/public-profile-mutations";

export function updateApplicationRecord(
  id: string,
  patch: Partial<AnalystApplication>
): AnalystApplication | null {
  const current = getMockApplication(id);
  if (!current) return null;
  const next: AnalystApplication = {
    ...current,
    ...patch,
    primaryMarkets: patch.primaryMarkets
      ? [...patch.primaryMarkets]
      : [...current.primaryMarkets],
    socialLinks: patch.socialLinks
      ? patch.socialLinks.map((l) => ({ ...l }))
      : current.socialLinks.map((l) => ({ ...l })),
    bestAnalysis:
      patch.bestAnalysis !== undefined
        ? patch.bestAnalysis
          ? { ...patch.bestAnalysis }
          : null
        : current.bestAnalysis
          ? { ...current.bestAnalysis }
          : null,
    bestEducational:
      patch.bestEducational !== undefined
        ? patch.bestEducational
          ? { ...patch.bestEducational }
          : null
        : current.bestEducational
          ? { ...current.bestEducational }
          : null,
    evaluation: patch.evaluation
      ? patch.evaluation.map((c) => ({ ...c }))
      : current.evaluation.map((c) => ({ ...c })),
    partnershipHandoff:
      patch.partnershipHandoff !== undefined
        ? patch.partnershipHandoff
          ? { ...patch.partnershipHandoff }
          : null
        : current.partnershipHandoff
          ? { ...current.partnershipHandoff }
          : null,
  };
  if (patch.evaluation) {
    next.overallScore = computeOverallScore(next.evaluation);
  }
  return replaceMockApplication(next);
}

export function updateCategoryEvaluationRecord(
  id: string,
  categoryId: EvaluationCategoryId,
  patch: Partial<Pick<CategoryEvaluation, "rating" | "notes">>
): AnalystApplication | null {
  const current = getMockApplication(id);
  if (!current) return null;
  const evaluation = current.evaluation.map((c) =>
    c.categoryId === categoryId
      ? {
          ...c,
          ...patch,
          reviewer: "Admin Ibrahim",
          updatedAt: new Date().toISOString(),
        }
      : c
  );
  return updateApplicationRecord(id, {
    evaluation,
    status: current.status === "new" ? "under_review" : current.status,
  });
}

export function updateVerificationRecord(
  id: string,
  patch: {
    verificationState?: ApplicationVerificationState;
    verificationNotes?: string;
  }
): AnalystApplication | null {
  return updateApplicationRecord(id, patch);
}

export function updateNotesRecord(
  id: string,
  patch: {
    internalNotes?: string;
    interviewNotes?: string;
    stageRating?: number | null;
  }
): AnalystApplication | null {
  return updateApplicationRecord(id, patch);
}

/**
 * Decision outcomes (simple operational flow):
 *
 * Approve → partnership activation (identity · directory · Discord · referral reserved)
 * Reject → archive application · store decision reason
 * Request Information → pending_information · resume later
 */
export function applyDecisionRecord(
  id: string,
  action: ApplicationDecisionAction,
  reason?: string
): AnalystApplication | null {
  const current = getMockApplication(id);
  if (!current) return null;
  const now = new Date().toISOString();

  if (action === "approve") {
    const score = current.overallScore ?? computeOverallScore(current.evaluation);
    if (score !== null && score < APPLICATION_SCORE_THRESHOLD) {
      return updateApplicationRecord(id, {
        status: "pending_information",
        overallScore: score,
        decisionReason:
          reason?.trim() ||
          `Score ${score} below threshold ${APPLICATION_SCORE_THRESHOLD} — request more evidence.`,
        decisionAt: now,
      });
    }
    const handle = applicationHandle(current);
    const analystId = `a-${current.id.replace("app-", "")}-${handle.slice(0, 8)}`;
    const activation = activatePartnershipFromApplication(
      { ...current, overallScore: score },
      analystId,
      now
    );
    const approved = updateApplicationRecord(id, {
      status: "approved",
      archived: false,
      overallScore: score,
      verificationState:
        current.verificationState === "pending"
          ? "verified"
          : current.verificationState,
      decisionReason: reason?.trim() || null,
      decisionAt: now,
      partnershipHandoff: {
        analystId: activation.analystId,
        createdAt: activation.createdAt,
        discordPrepStatus: "record_created",
        controlCenterPath: activation.controlCenterPath,
        directoryCreated: activation.directoryCreated,
        discordRecordId: activation.discordRecordId,
        referralRecordId: activation.referralRecordId,
        referralReserved: activation.referralReserved,
      },
    });
    if (approved) {
      ensurePublicProfileDraftFromApplication(
        approved,
        activation.analystId,
        activation.createdAt
      );
    }
    return approved;
  }

  if (action === "reject") {
    return updateApplicationRecord(id, {
      status: "rejected",
      archived: true,
      decisionReason: reason?.trim() || "Rejected — not eligible for partnership.",
      decisionAt: now,
      partnershipHandoff: null,
    });
  }

  return updateApplicationRecord(id, {
    status: "pending_information",
    decisionReason: reason?.trim() || "Waiting on applicant — resume review later.",
    decisionAt: now,
  });
}
