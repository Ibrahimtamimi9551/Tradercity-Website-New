"use client";

import {
  DataTable,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type { ManualPayment } from "@/types/members/manual-payment";
import { ManualPaymentStatusBadge } from "./ManualPaymentStatusBadge";
import {
  ManualPaymentRowActions,
  type ManualPaymentRowActionHandlers,
} from "./ManualPaymentRowActions";

const avatarToneStyles: Record<ManualPayment["avatarTone"], string> = {
  discord: "admin-on-accent bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

export function ManualPaymentAvatar({
  payment,
  size = "md",
}: {
  payment: ManualPayment;
  size?: "sm" | "md" | "lg";
}) {
  const initials = payment.username.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        size === "sm" && "h-7 w-7 text-[10px]",
        size === "md" && "h-7 w-7 text-[10px] sm:h-9 sm:w-9 sm:text-xs",
        size === "lg" && "h-12 w-12 text-sm",
        avatarToneStyles[payment.avatarTone]
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}

import { formatAdminDateTimeIst } from "@/lib/members/ist-datetime";

export function formatManualPaymentDate(iso: string | null): string {
  return formatAdminDateTimeIst(iso);
}

type ManualPaymentTableProps = {
  rows: ManualPayment[];
  selectedId: string | null;
  onRowSelect: (payment: ManualPayment) => void;
  actionHandlers: ManualPaymentRowActionHandlers;
  emptyTitle?: string;
};

export function ManualPaymentTable({
  rows,
  selectedId,
  onRowSelect,
  actionHandlers,
  emptyTitle = "No manual payments found",
}: ManualPaymentTableProps) {
  const columns: DataTableColumn<ManualPayment>[] = [
    {
      key: "member",
      header: "Member",
      className: "min-w-[11rem]",
      render: (payment) => (
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ManualPaymentAvatar payment={payment} />
          <div className="min-w-0">
            <p className="truncate font-medium text-white">{payment.username}</p>
            <p className="truncate text-[10px] text-tc-muted sm:text-xs">
              {payment.email ?? "Username only — not linked"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "plan",
      header: "Membership Plan",
      render: (payment) => (
        <span className="text-xs text-white/85 sm:text-sm">{payment.planLabel}</span>
      ),
    },
    {
      key: "method",
      header: "Payment Method",
      render: (payment) => (
        <span className="text-xs text-white/80 sm:text-sm">
          {payment.paymentMethodLabel}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      className: "whitespace-nowrap",
      render: (payment) => (
        <span className="tabular-nums text-xs text-white/90 sm:text-sm">
          {payment.amount} {payment.currency}
        </span>
      ),
    },
    {
      key: "received",
      header: "Received Date",
      className: "whitespace-nowrap",
      render: (payment) => (
        <span className="tabular-nums text-xs text-white/80 sm:text-sm">
          {formatManualPaymentDate(payment.receivedAt)}
        </span>
      ),
    },
    {
      key: "activatedBy",
      header: "Activated By",
      render: (payment) => (
        <span className="text-xs text-white/75 sm:text-sm">
          {payment.activatedBy ?? "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (payment) => (
        <ManualPaymentStatusBadge
          status={payment.status}
          label={payment.statusLabel}
          tone={payment.statusTone}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      stopRowClick: true,
      className: "w-[5.5rem] text-right",
      render: (payment) => (
        <ManualPaymentRowActions payment={payment} handlers={actionHandlers} />
      ),
    },
  ];

  const selectedKey =
    selectedId &&
    rows.some(
      (r) => r.id === selectedId || (r.memberId !== null && r.memberId === selectedId)
    )
      ? rows.find(
          (r) =>
            r.id === selectedId ||
            (r.memberId !== null && r.memberId === selectedId)
        )?.id ?? selectedId
      : selectedId;

  return (
    <DataTable
      columns={columns}
      data={rows}
      getRowKey={(row) => row.id}
      selectedKey={selectedKey}
      onRowClick={onRowSelect}
      emptyTitle={emptyTitle}
      compactMobile
      className="border-white/10 bg-white/[0.015] max-sm:rounded-lg"
    />
  );
}
