"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import {
  MANUAL_PAYMENT_MEMBER_OPTIONS,
  MANUAL_PAYMENT_PLAN_OPTIONS,
  MOCK_MANUAL_PAYMENT_STATS,
  MOCK_MANUAL_PAYMENTS,
} from "@/lib/members/mock/manual-payments";
import type {
  ManualPayment,
  ManualPaymentCreateInput,
  ManualPaymentFilters,
  ManualPaymentMethod,
  ManualPaymentStatus,
  ManualPaymentStats,
} from "@/types/members/manual-payment";
import {
  MANUAL_PAYMENT_METHOD_LABELS,
  MANUAL_PAYMENT_REASON_LABELS,
  MANUAL_PAYMENT_STATUS_LABELS,
  MANUAL_PAYMENT_STATUS_TONES,
} from "@/types/members/manual-payment";
import type { SubscriptionPlanKey } from "@/types/members/subscription";

const DEFAULT_FILTERS: ManualPaymentFilters = {
  search: "",
  status: "all",
  plan: "all",
  paymentMethod: "all",
  dateFrom: "",
  dateTo: "",
};

function parseStatus(value: string | null): ManualPaymentFilters["status"] {
  if (value === "pending" || value === "activated" || value === "cancelled") {
    return value;
  }
  return "all";
}

function parsePlan(value: string | null): ManualPaymentFilters["plan"] {
  if (value === "monthly" || value === "quarterly" || value === "yearly") {
    return value;
  }
  return "all";
}

function parseMethod(value: string | null): ManualPaymentFilters["paymentMethod"] {
  if (
    value === "bank_transfer" ||
    value === "upi" ||
    value === "cash" ||
    value === "paypal" ||
    value === "wise" ||
    value === "exchange_transfer" ||
    value === "other"
  ) {
    return value;
  }
  return "all";
}

function parseFiltersFromParams(
  searchParams: URLSearchParams
): ManualPaymentFilters {
  return {
    search: searchParams.get("q") ?? "",
    status: parseStatus(searchParams.get("mpStatus")),
    plan: parsePlan(searchParams.get("mpPlan")),
    paymentMethod: parseMethod(searchParams.get("mpMethod")),
    dateFrom: searchParams.get("mpFrom") ?? "",
    dateTo: searchParams.get("mpTo") ?? "",
  };
}

function parsePage(searchParams: URLSearchParams): number {
  return Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
}

function parsePageSize(searchParams: URLSearchParams): number {
  const size = Number(searchParams.get("pageSize"));
  return [10, 25, 50].includes(size) ? size : 10;
}

function parseSelectedId(searchParams: URLSearchParams): string | null {
  return searchParams.get("payment") ?? searchParams.get("member");
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

function matchesFilters(
  payment: ManualPayment,
  filters: ManualPaymentFilters
): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack =
      `${payment.username} ${payment.email ?? ""} ${payment.referenceNumber ?? ""} ${payment.memberId ?? ""}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (filters.status !== "all" && payment.status !== filters.status) {
    return false;
  }
  if (filters.plan !== "all" && payment.planKey !== filters.plan) return false;
  if (
    filters.paymentMethod !== "all" &&
    payment.paymentMethod !== filters.paymentMethod
  ) {
    return false;
  }

  const receivedDay = dayKey(payment.receivedAt);
  if (filters.dateFrom && receivedDay < filters.dateFrom) return false;
  if (filters.dateTo && receivedDay > filters.dateTo) return false;

  return true;
}

function filtersToParams(
  filters: ManualPaymentFilters,
  page: number,
  pageSize: number,
  selectedId: string | null
) {
  const params = new URLSearchParams();
  params.set("source", "manual");
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.status !== "all") params.set("mpStatus", filters.status);
  if (filters.plan !== "all") params.set("mpPlan", filters.plan);
  if (filters.paymentMethod !== "all") {
    params.set("mpMethod", filters.paymentMethod);
  }
  if (filters.dateFrom) params.set("mpFrom", filters.dateFrom);
  if (filters.dateTo) params.set("mpTo", filters.dateTo);
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 10) params.set("pageSize", String(pageSize));
  if (selectedId) params.set("payment", selectedId);
  return params;
}

function serializeFilters(
  filters: ManualPaymentFilters,
  page: number,
  pageSize: number,
  selectedId: string | null
) {
  return filtersToParams(filters, page, pageSize, selectedId).toString();
}

function computeStats(payments: ManualPayment[]): ManualPaymentStats {
  return {
    pending: payments.filter((p) => p.status === "pending").length,
    activated: payments.filter((p) => p.status === "activated").length,
    cancelled: payments.filter((p) => p.status === "cancelled").length,
    lastRefreshLabel: MOCK_MANUAL_PAYMENT_STATS.lastRefreshLabel,
  };
}

function planLabel(planKey: SubscriptionPlanKey): string {
  return (
    MANUAL_PAYMENT_PLAN_OPTIONS.find((p) => p.value === planKey)?.label ??
    planKey
  );
}

function expiryForPlan(planKey: SubscriptionPlanKey, fromIso: string): string {
  const date = new Date(fromIso);
  if (planKey === "monthly") date.setMonth(date.getMonth() + 1);
  else if (planKey === "quarterly") date.setMonth(date.getMonth() + 3);
  else date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().slice(0, 19);
}

function normalizeDiscordUsername(raw: string): string {
  return raw.trim().replace(/^@+/, "");
}

function buildCreatedPayment(
  input: ManualPaymentCreateInput,
  id: string
): ManualPayment | null {
  const username = normalizeDiscordUsername(input.username);
  if (!username) return null;

  // Soft-match only — never required. Unmatched usernames stay unlinked.
  const known = MANUAL_PAYMENT_MEMBER_OPTIONS.find(
    (m) => m.username.toLowerCase() === username.toLowerCase()
  );

  const label = planLabel(input.planKey);
  const methodLabel = MANUAL_PAYMENT_METHOD_LABELS[input.paymentMethod];
  const reasonLabel = MANUAL_PAYMENT_REASON_LABELS[input.reason];
  const now = new Date().toISOString().slice(0, 19);
  const ref = input.referenceNumber.trim() || null;
  const amountDesc = `${input.amount} ${input.currency}${
    ref ? ` · ${ref}` : ""
  }`;

  return {
    id,
    memberId: known?.id ?? null,
    username,
    email: known?.email ?? null,
    avatarTone: known?.avatarTone ?? "amber",
    planKey: input.planKey,
    planLabel: label,
    paymentMethod: input.paymentMethod,
    paymentMethodLabel: methodLabel,
    amount: input.amount,
    currency: input.currency,
    receivedAt: input.receivedAt,
    referenceNumber: ref,
    receivedBy: input.receivedBy.trim() || "Admin · Ibrahim",
    reason: input.reason,
    reasonLabel,
    notes: input.notes.trim() || null,
    status: "pending",
    statusLabel: MANUAL_PAYMENT_STATUS_LABELS.pending,
    statusTone: MANUAL_PAYMENT_STATUS_TONES.pending,
    activatedBy: null,
    activatedAt: null,
    membershipResult: null,
    createdAt: now,
    timeline: [
      {
        id: `${id}-tl-1`,
        title: "Manual Payment Created",
        description: `${label} · ${methodLabel}`,
        timestamp: now,
        status: "complete",
      },
      {
        id: `${id}-tl-2`,
        title: "Payment Recorded",
        description: amountDesc,
        timestamp: now,
        status: "complete",
      },
      {
        id: `${id}-tl-3`,
        title: "Membership Activated",
        description: "Awaiting activation",
        timestamp: "—",
        status: "current",
      },
      {
        id: `${id}-tl-4`,
        title: "Discord Sync Started",
        timestamp: "—",
        status: "pending",
      },
      {
        id: `${id}-tl-5`,
        title: "Discord Sync Completed",
        timestamp: "—",
        status: "pending",
      },
    ],
  };
}

function activatePaymentRecord(payment: ManualPayment): ManualPayment {
  const now = new Date().toISOString().slice(0, 19);
  const activatedBy = "Admin · Ibrahim";
  return {
    ...payment,
    status: "activated",
    statusLabel: MANUAL_PAYMENT_STATUS_LABELS.activated,
    statusTone: MANUAL_PAYMENT_STATUS_TONES.activated,
    activatedBy,
    activatedAt: now,
    membershipResult: {
      plan: payment.planLabel,
      statusLabel: "Active",
      statusTone: "success",
      activatedAt: now,
      expiryAt: expiryForPlan(payment.planKey, now),
      renewalCount: 1,
      discordSyncLabel: "VIP role assigned",
    },
    timeline: [
      ...payment.timeline
        .filter(
          (e) =>
            e.title !== "Membership Activated" &&
            e.title !== "Discord Sync Started" &&
            e.title !== "Discord Sync Completed" &&
            e.title !== "Cancelled"
        )
        .map((e) => ({ ...e, status: "complete" as const })),
      {
        id: `${payment.id}-tl-act`,
        title: "Membership Activated",
        description: payment.planLabel,
        timestamp: now,
        status: "complete",
      },
      {
        id: `${payment.id}-tl-ds`,
        title: "Discord Sync Started",
        timestamp: now,
        status: "complete",
      },
      {
        id: `${payment.id}-tl-dc`,
        title: "Discord Sync Completed",
        description: "VIP role assigned",
        timestamp: now,
        status: "complete",
      },
    ],
  };
}

function cancelPaymentRecord(payment: ManualPayment): ManualPayment {
  const now = new Date().toISOString().slice(0, 19);
  return {
    ...payment,
    status: "cancelled",
    statusLabel: MANUAL_PAYMENT_STATUS_LABELS.cancelled,
    statusTone: MANUAL_PAYMENT_STATUS_TONES.cancelled,
    activatedBy: null,
    activatedAt: null,
    membershipResult: null,
    timeline: [
      ...payment.timeline
        .filter(
          (e) =>
            e.title === "Manual Payment Created" ||
            e.title === "Payment Recorded"
        )
        .map((e) => ({ ...e, status: "complete" as const })),
      {
        id: `${payment.id}-tl-cancel`,
        title: "Cancelled",
        description: "Manual payment cancelled — Membership unchanged",
        timestamp: now,
        status: "error",
      },
    ],
  };
}

export const MANUAL_PAYMENTS_LIST_PATH = "/admin/subscriptions";

export type UseManualPaymentsDirectoryOptions = {
  listPathname?: string;
};

/**
 * Manual Payments directory — filters, pagination, selection, mock mutations.
 *
 * URL contract:
 *   /admin/subscriptions?source=manual
 *   /admin/subscriptions?source=manual&mpStatus=pending
 *   /admin/subscriptions?source=manual&payment=<id>
 *   /admin/subscriptions/<id>?source=manual  (mobile detail)
 *
 * TODO(NestJS): replace mock list + mutations with Manual Payment APIs
 */
export function useManualPaymentsDirectory(
  options?: UseManualPaymentsDirectoryOptions
) {
  const listPathname = options?.listPathname ?? MANUAL_PAYMENTS_LIST_PATH;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const isDetailRoute =
    pathname.startsWith(`${listPathname}/`) && pathname !== listPathname;

  const routePaymentId = useMemo(() => {
    if (!isDetailRoute) return null;
    const rest = pathname.slice(listPathname.length + 1);
    return rest.split("/")[0] || null;
  }, [isDetailRoute, listPathname, pathname]);

  const [payments, setPayments] = useState<ManualPayment[]>(() => [
    ...MOCK_MANUAL_PAYMENTS,
  ]);
  const [filters, setFiltersState] = useState<ManualPaymentFilters>(() =>
    parseFiltersFromParams(new URLSearchParams(searchKey))
  );
  const [page, setPageState] = useState(() =>
    parsePage(new URLSearchParams(searchKey))
  );
  const [pageSize, setPageSizeState] = useState(() =>
    parsePageSize(new URLSearchParams(searchKey))
  );
  const [selectedId, setSelectedIdState] = useState<string | null>(() =>
    routePaymentId ?? parseSelectedId(new URLSearchParams(searchKey))
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [lastRefreshLabel, setLastRefreshLabel] = useState(
    MOCK_MANUAL_PAYMENT_STATS.lastRefreshLabel
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const lastWrittenKeyRef = useRef(
    serializeFilters(filters, page, pageSize, isDetailRoute ? null : selectedId)
  );
  const filtersRef = useRef(filters);
  const pageRef = useRef(page);
  const pageSizeRef = useRef(pageSize);
  const selectedIdRef = useRef(selectedId);
  const isDetailRouteRef = useRef(isDetailRoute);
  const paymentsRef = useRef(payments);
  filtersRef.current = filters;
  pageRef.current = page;
  pageSizeRef.current = pageSize;
  selectedIdRef.current = selectedId;
  isDetailRouteRef.current = isDetailRoute;
  paymentsRef.current = payments;

  useEffect(() => {
    if (!routePaymentId) return;
    if (selectedIdRef.current === routePaymentId) return;
    setSelectedIdState(routePaymentId);
  }, [routePaymentId]);

  useEffect(() => {
    if (searchKey === lastWrittenKeyRef.current) return;
    if (searchParams.get("source") !== "manual") return;

    const params = new URLSearchParams(searchKey);
    setFiltersState(parseFiltersFromParams(params));
    setPageState(parsePage(params));
    setPageSizeState(parsePageSize(params));
    const fromQuery = parseSelectedId(params);
    if (fromQuery) {
      setSelectedIdState(fromQuery);
    } else if (!isDetailRouteRef.current) {
      setSelectedIdState(null);
    }
    lastWrittenKeyRef.current = searchKey;
  }, [searchKey, searchParams]);

  const writeUrl = useCallback(
    (
      nextFilters: ManualPaymentFilters,
      nextPage: number,
      nextPageSize: number,
      nextSelected: string | null
    ) => {
      const onDetail = isDetailRouteRef.current;
      const query = serializeFilters(
        nextFilters,
        nextPage,
        nextPageSize,
        onDetail ? null : nextSelected
      );
      lastWrittenKeyRef.current = query;
      if (onDetail) {
        const href = query ? `${pathname}?${query}` : pathname;
        router.replace(href, { scroll: false });
        return;
      }
      const href = query ? `${listPathname}?${query}` : `${listPathname}?source=manual`;
      router.push(href, { scroll: false });
    },
    [listPathname, pathname, router]
  );

  const getListHref = useCallback(
    (opts?: { includePayment?: boolean }) => {
      const payment = opts?.includePayment ? selectedIdRef.current : null;
      const query = serializeFilters(
        filtersRef.current,
        pageRef.current,
        pageSizeRef.current,
        payment
      );
      return query ? `${listPathname}?${query}` : `${listPathname}?source=manual`;
    },
    [listPathname]
  );

  const setFilters = useCallback(
    (patch: Partial<ManualPaymentFilters>) => {
      const next = { ...filtersRef.current, ...patch };
      setFiltersState(next);
      setPageState(1);
      writeUrl(next, 1, pageSizeRef.current, selectedIdRef.current);
    },
    [writeUrl]
  );

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPageState(1);
    writeUrl(DEFAULT_FILTERS, 1, pageSizeRef.current, selectedIdRef.current);
  }, [writeUrl]);

  const setPage = useCallback(
    (nextPage: number) => {
      setPageState(nextPage);
      writeUrl(
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
      writeUrl(filtersRef.current, 1, nextSize, selectedIdRef.current);
    },
    [writeUrl]
  );

  const selectPayment = useCallback(
    (id: string) => {
      setSelectedIdState(id);
      if (!isAdminDesktop()) {
        const query = serializeFilters(
          filtersRef.current,
          pageRef.current,
          pageSizeRef.current,
          null
        );
        lastWrittenKeyRef.current = query;
        const detailPath = `${listPathname}/${id}`;
        router.push(query ? `${detailPath}?${query}` : `${detailPath}?source=manual`);
        return;
      }
      if (!isDetailRouteRef.current) {
        writeUrl(filtersRef.current, pageRef.current, pageSizeRef.current, id);
      }
    },
    [listPathname, router, writeUrl]
  );

  const filtered = useMemo(
    () => payments.filter((payment) => matchesFilters(payment, filters)),
    [payments, filters]
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const findPaymentById = useCallback(
    (id: string | null | undefined) => {
      if (!id) return null;
      return (
        paymentsRef.current.find(
          (p) => p.id === id || (p.memberId !== null && p.memberId === id)
        ) ?? null
      );
    },
    []
  );

  const selectedPayment = useMemo(() => {
    if (selectedId) return findPaymentById(selectedId);
    if (isDetailRoute) return null;
    return pageRows[0] ?? filtered[0] ?? null;
  }, [selectedId, pageRows, filtered, findPaymentById, isDetailRoute]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "all" ||
    filters.plan !== "all" ||
    filters.paymentMethod !== "all" ||
    filters.dateFrom !== "" ||
    filters.dateTo !== "";

  const setStatus = useCallback(
    (status: ManualPaymentStatus | "all") => setFilters({ status }),
    [setFilters]
  );
  const setPlan = useCallback(
    (plan: SubscriptionPlanKey | "all") => setFilters({ plan }),
    [setFilters]
  );
  const setPaymentMethod = useCallback(
    (paymentMethod: ManualPaymentMethod | "all") =>
      setFilters({ paymentMethod }),
    [setFilters]
  );

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setUiError(null);
    window.setTimeout(() => {
      setLastRefreshLabel("Just now");
      setIsRefreshing(false);
    }, 600);
  }, []);

  const createPayment = useCallback((input: ManualPaymentCreateInput) => {
    const id = `mp-${String(Date.now()).slice(-6)}`;
    const created = buildCreatedPayment(input, id);
    if (!created) {
      setUiError("Enter a Discord username to create the manual payment.");
      return null;
    }
    setPayments((prev) => [created, ...prev]);
    setSelectedIdState(created.id);
    writeUrl(filtersRef.current, 1, pageSizeRef.current, created.id);
    setPageState(1);
    return created;
  }, [writeUrl]);

  const activatePayment = useCallback((payment: ManualPayment) => {
    if (payment.status !== "pending") return;
    setPayments((prev) =>
      prev.map((p) => (p.id === payment.id ? activatePaymentRecord(p) : p))
    );
  }, []);

  const cancelPayment = useCallback((payment: ManualPayment) => {
    if (payment.status !== "pending") return;
    setPayments((prev) =>
      prev.map((p) => (p.id === payment.id ? cancelPaymentRecord(p) : p))
    );
  }, []);

  const stats = useMemo(() => {
    const base = computeStats(payments);
    return { ...base, lastRefreshLabel };
  }, [payments, lastRefreshLabel]);

  return {
    listPathname,
    isDetailRoute,
    stats,
    filters,
    setFilters,
    resetFilters,
    showAdvanced,
    setShowAdvanced,
    hasActiveFilters,
    rows: pageRows,
    allFiltered: filtered,
    total,
    page: safePage,
    pageSize,
    setPage,
    setPageSize,
    selectedId,
    selectedPayment,
    findPaymentById,
    selectPayment,
    getListHref,
    setStatus,
    setPlan,
    setPaymentMethod,
    lastRefreshLabel,
    isRefreshing,
    refresh,
    uiError,
    setUiError,
    clearError: () => setUiError(null),
    createOpen,
    setCreateOpen,
    createPayment,
    activatePayment,
    cancelPayment,
  };
}

export type ManualPaymentsDirectoryState = ReturnType<
  typeof useManualPaymentsDirectory
>;
