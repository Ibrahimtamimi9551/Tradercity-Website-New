"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Eye, MoreVertical, User, X } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import type { ManualPayment } from "@/types/members/manual-payment";
import {
  manualPaymentCanActivate,
  manualPaymentCanCancel,
} from "@/types/members/manual-payment";

export type ManualPaymentRowActionHandlers = {
  onView: (payment: ManualPayment) => void;
  onActivate: (payment: ManualPayment) => void;
  onCancel: (payment: ManualPayment) => void;
};

type ManualPaymentRowActionsProps = {
  payment: ManualPayment;
  handlers: ManualPaymentRowActionHandlers;
};

/**
 * Table row actions: View, More (Activate / Cancel / Profile).
 * TODO(NestJS): wire Activate / Cancel to Manual Payment APIs.
 */
export function ManualPaymentRowActions({
  payment,
  handlers,
}: ManualPaymentRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const canActivate = manualPaymentCanActivate(payment.status);
  const canCancel = manualPaymentCanCancel(payment.status);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="relative flex items-center justify-end gap-0.5">
      <button
        type="button"
        className="admin-ghost-btn admin-muted rounded-lg p-1.5 transition-colors hover:text-[var(--admin-fg)]"
        aria-label={`View ${payment.username}`}
        onClick={(e) => {
          e.stopPropagation();
          handlers.onView(payment);
        }}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="admin-ghost-btn admin-muted rounded-lg p-1.5 transition-colors hover:text-[var(--admin-fg)]"
        aria-label={`More actions for ${payment.username}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Manual payment actions"
          className="admin-card-surface absolute right-0 top-full z-50 mt-1 min-w-[12rem] overflow-hidden rounded-xl border py-1"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem
            icon={User}
            label="Open Profile"
            onSelect={() => {
              close();
              if (!payment.memberId) {
                window.alert(
                  `No linked Member ID for @${payment.username} yet.\n\n` +
                    "This payment was recorded with a free-text username. " +
                    "Backend resolution will link it later."
                );
                return;
              }
              router.push(`/admin/members/${payment.memberId}`);
            }}
          />
          {canActivate ? (
            <MenuItem
              icon={Check}
              label="Activate Membership"
              onSelect={() => {
                close();
                handlers.onActivate(payment);
              }}
            />
          ) : null}
          {canCancel ? (
            <MenuItem
              icon={X}
              label="Cancel"
              onSelect={() => {
                close();
                handlers.onCancel(payment);
              }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onSelect,
}: {
  icon: React.ElementType;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className={cn(
        "admin-fg-soft flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--admin-row-hover)]"
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
      {label}
    </button>
  );
}
