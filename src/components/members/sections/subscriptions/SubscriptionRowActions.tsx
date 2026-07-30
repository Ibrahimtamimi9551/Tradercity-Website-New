"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ExternalLink,
  Eye,
  MoreVertical,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/admin/cn";
import type { SubscriptionTicket } from "@/types/members/subscription";

export type SubscriptionRowActionHandlers = {
  onView: (ticket: SubscriptionTicket) => void;
  onOpenExplorer: (ticket: SubscriptionTicket) => void;
  onApprove: (ticket: SubscriptionTicket) => void;
  onReject: (ticket: SubscriptionTicket) => void;
};

type SubscriptionRowActionsProps = {
  ticket: SubscriptionTicket;
  handlers: SubscriptionRowActionHandlers;
};

/**
 * Table row actions: View, Explorer, More (Approve / Reject / Profile).
 * TODO(NestJS): wire Approve / Reject to Subscriptions API.
 */
export function SubscriptionRowActions({
  ticket,
  handlers,
}: SubscriptionRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const canDecide =
    ticket.displayStatus === "approval_pending" ||
    ticket.displayStatus === "verification_required";

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
        aria-label={`View ${ticket.username}`}
        onClick={(e) => {
          e.stopPropagation();
          handlers.onView(ticket);
        }}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="admin-ghost-btn admin-muted rounded-lg p-1.5 transition-colors hover:text-[var(--admin-fg)]"
        aria-label={`Open explorer for ${ticket.username}`}
        onClick={(e) => {
          e.stopPropagation();
          handlers.onOpenExplorer(ticket);
        }}
      >
        <ExternalLink className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="admin-ghost-btn admin-muted rounded-lg p-1.5 transition-colors hover:text-[var(--admin-fg)]"
        aria-label={`More actions for ${ticket.username}`}
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
          aria-label="Subscription ticket actions"
          className="admin-card-surface absolute right-0 top-full z-50 mt-1 min-w-[12rem] overflow-hidden rounded-xl border py-1"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem
            icon={User}
            label="Open Profile"
            onSelect={() => {
              close();
              router.push(`/admin/members/${ticket.memberId}`);
            }}
          />
          <MenuItem
            icon={ExternalLink}
            label="Open Explorer"
            onSelect={() => {
              close();
              handlers.onOpenExplorer(ticket);
            }}
          />
          {canDecide ? (
            <>
              <MenuItem
                icon={Check}
                label="Approve"
                onSelect={() => {
                  close();
                  handlers.onApprove(ticket);
                }}
              />
              <MenuItem
                icon={X}
                label="Reject"
                onSelect={() => {
                  close();
                  handlers.onReject(ticket);
                }}
              />
            </>
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
