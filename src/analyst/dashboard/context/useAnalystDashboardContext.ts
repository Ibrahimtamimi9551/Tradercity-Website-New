"use client";

import { useContext } from "react";
import {
  AnalystDashboardContext,
  type AnalystDashboardContextValue,
} from "@/analyst/dashboard/context/AnalystDashboardProvider";

export function useAnalystDashboardContext(): AnalystDashboardContextValue {
  const ctx = useContext(AnalystDashboardContext);
  if (!ctx) {
    throw new Error(
      "useAnalystDashboardContext must be used within AnalystDashboardProvider"
    );
  }
  return ctx;
}
