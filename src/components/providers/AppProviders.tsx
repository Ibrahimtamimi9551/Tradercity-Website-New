"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth";

/** Root client providers. Auth is currently a development mock session. */
export default function AppProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
