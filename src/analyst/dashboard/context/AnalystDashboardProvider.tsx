"use client";

import {
  createContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { MOCK_AUTHENTICATED_ANALYST_ID } from "@/analyst/dashboard/constants/mock-auth";
import { getAnalystDashboardProjection } from "@/analyst/dashboard/services/analyst-dashboard.service";
import {
  dashboardUiReducer,
  initialDashboardUiState,
  type AnalystDashboardUiState,
  type DashboardUiAction,
} from "@/analyst/dashboard/state/dashboard-ui-state";
import type { AnalystDashboardProjection } from "@/analyst/dashboard/types";
import { mergeDisplayProjection } from "@/analyst/dashboard/utils/display-projection";

export type AnalystDashboardContextValue = {
  /** Raw Management projection (pre-UI overlays). */
  projection: AnalystDashboardProjection | null;
  /** Display projection including mock wallet / payout overlays. */
  display: AnalystDashboardProjection | null;
  isLoading: boolean;
  error: string | null;
  ui: AnalystDashboardUiState;
  dispatchUi: (action: DashboardUiAction) => void;
  refresh: () => void;
};

export const AnalystDashboardContext =
  createContext<AnalystDashboardContextValue | null>(null);

type AnalystDashboardProviderProps = {
  children: ReactNode;
  analystId?: string;
};

export function AnalystDashboardProvider({
  children,
  analystId = MOCK_AUTHENTICATED_ANALYST_ID,
}: AnalystDashboardProviderProps) {
  const [revision, setRevision] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ui, dispatchUi] = useReducer(
    dashboardUiReducer,
    initialDashboardUiState
  );

  const projection = useMemo(() => {
    // `revision` busts memo on explicit refresh (mock re-read).
    void revision;
    try {
      return getAnalystDashboardProjection(analystId);
    } catch {
      return null;
    }
  }, [analystId, revision]);

  const display = useMemo(
    () => (projection ? mergeDisplayProjection(projection, ui) : null),
    [projection, ui]
  );

  const value = useMemo<AnalystDashboardContextValue>(
    () => ({
      projection,
      display,
      isLoading,
      error: projection ? error : error ?? "Unable to load partner dashboard.",
      ui,
      dispatchUi,
      refresh: () => {
        setError(null);
        setIsLoading(true);
        queueMicrotask(() => {
          setRevision((n) => n + 1);
          setIsLoading(false);
        });
      },
    }),
    [projection, display, isLoading, error, ui]
  );

  return (
    <AnalystDashboardContext.Provider value={value}>
      {children}
    </AnalystDashboardContext.Provider>
  );
}
