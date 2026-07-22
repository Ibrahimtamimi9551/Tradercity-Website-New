"use client";

import { Suspense } from "react";
import { LoadingState } from "@/components/admin/ui";
import { AnalystControlCenterPageContent } from "./AnalystControlCenterPage";

type AnalystControlCenterViewProps = {
  analystId: string;
};

/**
 * Analyst Control Center compositor.
 * Route page stays thin; ops UI lives under analysts/sections/control-center/.
 */
export function AnalystControlCenterView({ analystId }: AnalystControlCenterViewProps) {
  return (
    <Suspense fallback={<LoadingState label="Loading analyst Control Center…" />}>
      <AnalystControlCenterPageContent analystId={analystId} />
    </Suspense>
  );
}
