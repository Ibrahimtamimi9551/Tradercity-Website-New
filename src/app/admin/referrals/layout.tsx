import type { ReactNode } from "react";

/**
 * Shared Referral module shell.
 * Operations provider lives in `(operations)/layout.tsx` so Intelligence
 * stays a pure analytics surface.
 */
export default function ReferralsLayout({ children }: { children: ReactNode }) {
  return children;
}
