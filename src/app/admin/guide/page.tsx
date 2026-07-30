import { Suspense } from "react";
import { GuideCenterPage } from "@/components/admin/guide";
import { LoadingState } from "@/components/admin/ui/States";

/**
 * Admin Guide Center — interactive operational guide for Members Admin.
 * Utility route (footer nav), not an operational work queue.
 */
export default function AdminGuideRoute() {
  return (
    <Suspense
      fallback={<LoadingState label="Loading Admin Guide Center…" />}
    >
      <GuideCenterPage />
    </Suspense>
  );
}
