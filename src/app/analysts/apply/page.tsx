"use client";

import { Suspense } from "react";
import { RequireAuth } from "@/lib/auth";
import { AnalystApplyForm } from "@/components/analysts/public";

function ApplyFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] font-sans text-sm text-white/50">
      Checking session…
    </main>
  );
}

export default function AnalystApplyRoute() {
  return (
    <Suspense fallback={<ApplyFallback />}>
      <RequireAuth fallback={<ApplyFallback />}>
        <AnalystApplyForm />
      </RequireAuth>
    </Suspense>
  );
}
