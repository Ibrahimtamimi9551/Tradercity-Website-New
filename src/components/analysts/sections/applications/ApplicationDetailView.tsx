"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LoadingState } from "@/components/admin/ui";
import { parseApplicationViewerTab } from "@/lib/analysts/hooks/useAnalystApplications";
import {
  applyDecisionRecord,
  updateCategoryEvaluationRecord,
  updateNotesRecord,
  updateVerificationRecord,
} from "@/lib/analysts/mock/application-mutations";
import { getMockApplication } from "@/lib/analysts/mock/applications";
import { buildSystemProvisioning } from "@/lib/analysts/mock/onboarding";
import {
  APPLICATION_SCORE_THRESHOLD,
  type ApplicationViewerTabId,
} from "@/types/analysts/applications";
import { ApplicationViewer } from "./ApplicationViewer";
import { SystemProvisioningPanel } from "./SystemProvisioningPanel";

type ApplicationDetailViewProps = {
  applicationId: string;
};

function ApplicationDetailContent({ applicationId }: ApplicationDetailViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [revision, setRevision] = useState(0);
  const surface = searchParams.get("surface");

  const application = useMemo(() => {
    void revision;
    return getMockApplication(applicationId);
  }, [applicationId, revision]);

  const provisioning = useMemo(() => {
    void revision;
    if (!application) return null;
    return buildSystemProvisioning(application);
  }, [application, revision]);

  const [viewerTab, setViewerTab] = useState<ApplicationViewerTabId>(() =>
    parseApplicationViewerTab(searchParams.get("tab"))
  );

  useEffect(() => {
    setViewerTab(parseApplicationViewerTab(searchParams.get("tab")));
  }, [searchParams]);

  const writeTab = useCallback(
    (tab: ApplicationViewerTabId) => {
      setViewerTab(tab);
      const params = new URLSearchParams(searchParams.toString());
      if (tab === "application") params.delete("tab");
      else params.set("tab", tab);
      const query = params.toString();
      router.replace(
        query
          ? `/admin/analysts/applications/${applicationId}?${query}`
          : `/admin/analysts/applications/${applicationId}`,
        { scroll: false }
      );
    },
    [applicationId, router, searchParams]
  );

  if (!application) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/analysts/applications?view=queue"
          className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Review Queue
        </Link>
        <p className="text-sm text-tc-muted">Application not found.</p>
      </div>
    );
  }

  if (surface === "onboarding") {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col gap-4">
        <Link
          href="/admin/analysts/applications?view=onboarding"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Onboarding
        </Link>
        <SystemProvisioningPanel
          provisioning={provisioning}
          onRetry={() => setRevision((n) => n + 1)}
          className="min-h-[70vh] flex-1"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col gap-4">
      <Link
        href="/admin/analysts/applications?view=queue"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Review Queue
      </Link>
      <ApplicationViewer
        application={application}
        activeTab={viewerTab}
        onTabChange={writeTab}
        threshold={APPLICATION_SCORE_THRESHOLD}
        layout="page"
        onUpdateCategory={(categoryId, patch) => {
          updateCategoryEvaluationRecord(applicationId, categoryId, patch);
          setRevision((n) => n + 1);
        }}
        onUpdateVerification={(patch) => {
          updateVerificationRecord(applicationId, patch);
          setRevision((n) => n + 1);
        }}
        onUpdateNotes={(patch) => {
          updateNotesRecord(applicationId, patch);
          setRevision((n) => n + 1);
        }}
        onDecision={(action) => {
          applyDecisionRecord(applicationId, action);
          setRevision((n) => n + 1);
        }}
        className="min-h-[70vh] flex-1"
      />
    </div>
  );
}

export function ApplicationDetailView({ applicationId }: ApplicationDetailViewProps) {
  return (
    <Suspense fallback={<LoadingState label="Loading application…" />}>
      <ApplicationDetailContent applicationId={applicationId} />
    </Suspense>
  );
}
