"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  applyDecisionRecord,
  updateCategoryEvaluationRecord,
  updateNotesRecord,
  updateVerificationRecord,
} from "@/lib/analysts/mock/application-mutations";
import {
  computeApplicationDashboardStats,
  getMockApplication,
  listMockApplications,
  subscribeApplicationStore,
} from "@/lib/analysts/mock/applications";
import {
  buildSystemProvisioning,
  listSystemProvisioning,
} from "@/lib/analysts/mock/onboarding";
import {
  APPLICATION_SCORE_THRESHOLD,
  type AnalystApplication,
  type ApplicationDecisionAction,
  type ApplicationDomainView,
  type ApplicationQueueFilters,
  type ApplicationQueueStatus,
  type ApplicationVerificationState,
  type CategoryEvaluation,
  type EvaluationCategoryId,
} from "@/types/analysts/applications";
import type { AnalystSystemProvisioning } from "@/types/analysts/onboarding";

const DEFAULT_FILTERS: ApplicationQueueFilters = {
  search: "",
  status: "all",
};

function parseView(value: string | null): ApplicationDomainView {
  if (
    value === "queue" ||
    value === "archive" ||
    value === "dashboard" ||
    value === "onboarding"
  ) {
    return value;
  }
  return "dashboard";
}

function parseStatus(value: string | null): ApplicationQueueFilters["status"] {
  const allowed: ApplicationQueueStatus[] = [
    "new",
    "under_review",
    "pending_information",
    "approved",
    "rejected",
  ];
  if (value && allowed.includes(value as ApplicationQueueStatus)) {
    return value as ApplicationQueueStatus;
  }
  return "all";
}

function parseFiltersFromParams(searchParams: URLSearchParams): ApplicationQueueFilters {
  return {
    search: searchParams.get("q") ?? "",
    status: parseStatus(searchParams.get("status")),
  };
}

function parsePage(searchParams: URLSearchParams): number {
  return Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
}

function parsePageSize(searchParams: URLSearchParams): number {
  const size = Number(searchParams.get("pageSize"));
  return [10, 25, 50].includes(size) ? size : 10;
}

function matchesFilters(
  app: AnalystApplication,
  filters: ApplicationQueueFilters,
  view: ApplicationDomainView
): boolean {
  if (view === "archive") {
    if (!app.archived) return false;
  } else if (view === "onboarding") {
    if (app.status !== "approved" || !app.partnershipHandoff) return false;
  } else if (view === "queue") {
    // Rejects are archived; still visible when filtering Rejected in the queue.
    if (app.archived && filters.status !== "rejected") return false;
  }

  const query = filters.search.trim().toLowerCase();
  if (query) {
    const markets = app.primaryMarkets.join(" ");
    const haystack =
      `${app.analystName} ${app.xHandle} ${app.email} ${markets} ${app.yearsOfExperience} ${app.shortBio}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (view !== "onboarding" && filters.status !== "all" && app.status !== filters.status) {
    return false;
  }
  return true;
}

function filtersToParams(
  view: ApplicationDomainView,
  filters: ApplicationQueueFilters,
  page: number,
  pageSize: number,
  applicationId: string | null
) {
  const params = new URLSearchParams();
  if (view !== "dashboard") params.set("view", view);
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.status !== "all") params.set("status", filters.status);
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 10) params.set("pageSize", String(pageSize));
  if (applicationId) params.set("application", applicationId);
  return params;
}

function serializeState(
  view: ApplicationDomainView,
  filters: ApplicationQueueFilters,
  page: number,
  pageSize: number,
  applicationId: string | null
) {
  return filtersToParams(view, filters, page, pageSize, applicationId).toString();
}

/**
 * Applications domain — Dashboard / Review Queue / Onboarding / Archive.
 *
 * URL contract:
 *   /admin/analysts/applications
 *   /admin/analysts/applications?view=queue&status=new
 *   /admin/analysts/applications?view=queue&application=app-001
 *   /admin/analysts/applications?view=onboarding&application=app-005
 *   /admin/analysts/applications?view=archive
 *
 * Onboarding = System Provisioning verification after Approve (Wave D).
 * TODO(NestJS): replace mock store with authenticated applications API.
 */
export function useAnalystApplications() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();

  const [revision, setRevision] = useState(0);
  const [view, setViewState] = useState<ApplicationDomainView>(() =>
    parseView(new URLSearchParams(searchKey).get("view"))
  );
  const [filters, setFiltersState] = useState<ApplicationQueueFilters>(() =>
    parseFiltersFromParams(new URLSearchParams(searchKey))
  );
  const [page, setPageState] = useState(() => parsePage(new URLSearchParams(searchKey)));
  const [pageSize, setPageSizeState] = useState(() =>
    parsePageSize(new URLSearchParams(searchKey))
  );
  const [selectedId, setSelectedIdState] = useState<string | null>(() =>
    new URLSearchParams(searchKey).get("application")
  );

  const lastWrittenKeyRef = useRef(
    serializeState(view, filters, page, pageSize, selectedId)
  );
  const filtersRef = useRef(filters);
  const pageSizeRef = useRef(pageSize);
  const viewRef = useRef(view);
  const selectedIdRef = useRef(selectedId);
  filtersRef.current = filters;
  pageSizeRef.current = pageSize;
  viewRef.current = view;
  selectedIdRef.current = selectedId;

  useEffect(() => {
    if (searchKey === lastWrittenKeyRef.current) return;
    const params = new URLSearchParams(searchKey);
    setViewState(parseView(params.get("view")));
    setFiltersState(parseFiltersFromParams(params));
    setPageState(parsePage(params));
    setPageSizeState(parsePageSize(params));
    setSelectedIdState(params.get("application"));
    lastWrittenKeyRef.current = searchKey;
  }, [searchKey]);

  useEffect(() => subscribeApplicationStore(() => setRevision((n) => n + 1)), []);

  const writeUrl = useCallback(
    (
      nextView: ApplicationDomainView,
      nextFilters: ApplicationQueueFilters,
      nextPage: number,
      nextPageSize: number,
      nextApplicationId: string | null
    ) => {
      const query = serializeState(
        nextView,
        nextFilters,
        nextPage,
        nextPageSize,
        nextApplicationId
      );
      lastWrittenKeyRef.current = query;
      const href = query ? `${pathname}?${query}` : pathname;
      router.push(href, { scroll: false });
    },
    [pathname, router]
  );

  const setView = useCallback(
    (nextView: ApplicationDomainView) => {
      setViewState(nextView);
      setPageState(1);
      const nextFilters =
        nextView === "dashboard" ? DEFAULT_FILTERS : filtersRef.current;
      if (nextView === "dashboard") setFiltersState(DEFAULT_FILTERS);
      const nextSelected = nextView === "dashboard" ? null : selectedIdRef.current;
      if (nextView === "dashboard") setSelectedIdState(null);
      writeUrl(nextView, nextFilters, 1, pageSizeRef.current, nextSelected);
    },
    [writeUrl]
  );

  const setFilters = useCallback(
    (patch: Partial<ApplicationQueueFilters>) => {
      const next = { ...filtersRef.current, ...patch };
      setFiltersState(next);
      setPageState(1);
      writeUrl(viewRef.current, next, 1, pageSizeRef.current, selectedIdRef.current);
    },
    [writeUrl]
  );

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPageState(1);
    writeUrl(viewRef.current, DEFAULT_FILTERS, 1, pageSizeRef.current, selectedIdRef.current);
  }, [writeUrl]);

  const setPage = useCallback(
    (nextPage: number) => {
      setPageState(nextPage);
      writeUrl(
        viewRef.current,
        filtersRef.current,
        nextPage,
        pageSizeRef.current,
        selectedIdRef.current
      );
    },
    [writeUrl]
  );

  const setPageSize = useCallback(
    (nextSize: number) => {
      setPageSizeState(nextSize);
      setPageState(1);
      writeUrl(viewRef.current, filtersRef.current, 1, nextSize, selectedIdRef.current);
    },
    [writeUrl]
  );

  const setSelectedId = useCallback(
    (id: string | null) => {
      setSelectedIdState(id);
      writeUrl(viewRef.current, filtersRef.current, page, pageSizeRef.current, id);
    },
    [page, writeUrl]
  );

  const openQueueWithStatus = useCallback(
    (status: ApplicationQueueStatus | "all") => {
      const nextFilters: ApplicationQueueFilters = {
        search: "",
        status,
      };
      setViewState("queue");
      setFiltersState(nextFilters);
      setPageState(1);
      setSelectedIdState(null);
      writeUrl("queue", nextFilters, 1, pageSizeRef.current, null);
    },
    [writeUrl]
  );

  const allApps = useMemo(() => {
    void revision;
    return listMockApplications();
  }, [revision]);

  const stats = useMemo(() => computeApplicationDashboardStats(allApps), [allApps]);

  const filtered = useMemo(
    () => allApps.filter((app) => matchesFilters(app, filters, view)),
    [allApps, filters, view]
  );

  const provisioningRows = useMemo((): AnalystSystemProvisioning[] => {
    void revision;
    if (view !== "onboarding") return [];
    const query = filters.search.trim().toLowerCase();
    return listSystemProvisioning().filter((row) => {
      if (!query) return true;
      const haystack =
        `${row.analystName} ${row.analystId} ${row.email} ${row.applicationId}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [filters.search, revision, view]);

  const listSource =
    view === "onboarding" ? provisioningRows : filtered;
  const total = listSource.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const rows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const onboardingPageRows = provisioningRows.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const selectedApplication = useMemo(() => {
    if (selectedId) {
      const fromAll = allApps.find((a) => a.id === selectedId);
      if (fromAll) return fromAll;
    }
    if (view === "onboarding") {
      const first = onboardingPageRows[0];
      return first ? allApps.find((a) => a.id === first.applicationId) ?? null : null;
    }
    return rows[0] ?? null;
  }, [allApps, onboardingPageRows, rows, selectedId, view]);

  const selectedProvisioning = useMemo(() => {
    void revision;
    if (view !== "onboarding" || !selectedApplication) return null;
    return buildSystemProvisioning(selectedApplication);
  }, [revision, selectedApplication, view]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    (view !== "onboarding" && filters.status !== "all");

  const bump = () => setRevision((n) => n + 1);

  const updateCategoryEvaluation = useCallback(
    (
      id: string,
      categoryId: EvaluationCategoryId,
      patch: Partial<Pick<CategoryEvaluation, "rating" | "notes">>
    ) => {
      const next = updateCategoryEvaluationRecord(id, categoryId, patch);
      bump();
      return next;
    },
    []
  );

  const updateVerification = useCallback(
    (
      id: string,
      patch: {
        verificationState?: ApplicationVerificationState;
        verificationNotes?: string;
      }
    ) => {
      const next = updateVerificationRecord(id, patch);
      bump();
      return next;
    },
    []
  );

  const updateNotes = useCallback(
    (
      id: string,
      patch: {
        internalNotes?: string;
        interviewNotes?: string;
        stageRating?: number | null;
      }
    ) => {
      const next = updateNotesRecord(id, patch);
      bump();
      return next;
    },
    []
  );

  const applyDecision = useCallback((id: string, action: ApplicationDecisionAction) => {
    const next = applyDecisionRecord(id, action);
    bump();
    return next;
  }, []);
  return {
    view,
    setView,
    stats,
    filters,
    setFilters,
    resetFilters,
    hasActiveFilters,
    rows,
    onboardingRows: onboardingPageRows,
    selectedProvisioning,
    refreshProvisioning: bump,
    total,
    page: safePage,
    pageSize,
    setPage,
    setPageSize,
    selectedId: selectedApplication?.id ?? selectedId,
    setSelectedId,
    selectedApplication,
    openQueueWithStatus,
    updateCategoryEvaluation,
    updateVerification,
    updateNotes,
    applyDecision,
    getApplication: getMockApplication,
    threshold: APPLICATION_SCORE_THRESHOLD,
  };
}

export function parseApplicationViewerTab(
  value: string | null
): import("@/types/analysts/applications").ApplicationViewerTabId {
  if (
    value === "application" ||
    value === "verification" ||
    value === "evaluation" ||
    value === "notes" ||
    value === "decision"
  ) {
    return value;
  }
  return "application";
}
