"use client";

import { Suspense } from "react";
import { RequireAuth } from "@/lib/auth";
import { AnalystApplySuccess } from "@/components/analysts/public";

function SuccessFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] font-sans text-sm text-white/50">
      Loading…
    </main>
  );
}

export default function AnalystApplySuccessRoute() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <RequireAuth fallback={<SuccessFallback />}>
        <AnalystApplySuccess />
      </RequireAuth>
    </Suspense>
  );
}
