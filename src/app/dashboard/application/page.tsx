"use client";

import { Suspense } from "react";
import { RequireAuth } from "@/lib/auth";
import { MemberApplicationTracking } from "@/components/analysts/public";

function TrackingFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] font-sans text-sm text-white/50">
      Checking session…
    </main>
  );
}

export default function MemberApplicationTrackingRoute() {
  return (
    <Suspense fallback={<TrackingFallback />}>
      <RequireAuth fallback={<TrackingFallback />}>
        <MemberApplicationTracking />
      </RequireAuth>
    </Suspense>
  );
}
