"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ClipboardCopy,
  History,
  Link2,
  MoreVertical,
  ScrollText,
  User,
  Wallet,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/admin/cn";
import type { ReferralMember } from "@/types/members/referral";

export type ReferralRowActionHandlers = {
  onCopyReferralLink: (member: ReferralMember) => void;
  onCopyReferralCode: (member: ReferralMember) => void;
  onApproveRedeem?: (member: ReferralMember) => void;
  onRejectRedeem?: (member: ReferralMember) => void;
};

type ReferralRowActionsProps = {
  member: ReferralMember;
  handlers: ReferralRowActionHandlers;
};

/**
 * Compact ⋮ menu only — row click updates the details panel.
 * Approve / Reject Redeem appear when Waiting Admin Approval.
 * Approve must trigger Membership lifecycle (NestJS) — not Referral-owned activation.
 */
export function ReferralRowActions({ member, handlers }: ReferralRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const awaitingRedeem =
    member.redeemRequestStatus === "waiting_admin_approval";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
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
    <div ref={rootRef} className="relative flex justify-end">
      <button
        type="button"
        className="admin-ghost-btn admin-muted rounded-lg p-1.5 transition-colors hover:text-[var(--admin-fg)]"
        aria-label={`Actions for ${member.displayName}`}
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
          aria-label="Referral member actions"
          className="admin-card-surface absolute right-0 top-full z-50 mt-1 min-w-[12rem] overflow-hidden rounded-xl border py-1"
          onClick={(e) => e.stopPropagation()}
        >
          {awaitingRedeem ? (
            <>
              <MenuItem
                icon={CheckCircle2}
                label="Approve Redeem"
                onSelect={() => {
                  close();
                  handlers.onApproveRedeem?.(member);
                }}
              />
              <MenuItem
                icon={XCircle}
                label="Reject Redeem"
                onSelect={() => {
                  close();
                  handlers.onRejectRedeem?.(member);
                }}
              />
              <MenuDivider />
            </>
          ) : null}
          <MenuItem
            icon={Link2}
            label="Copy Referral Link"
            onSelect={() => {
              close();
              handlers.onCopyReferralLink(member);
            }}
          />
          <MenuItem
            icon={ClipboardCopy}
            label="Copy Referral Code"
            onSelect={() => {
              close();
              handlers.onCopyReferralCode(member);
            }}
          />
          <MenuItem
            icon={User}
            label="Open Member Profile"
            onSelect={() => {
              close();
              router.push(`/admin/members/${member.memberId}`);
            }}
          />
          <MenuDivider />
          <MenuItem
            icon={Wallet}
            label="Manual Credit"
            onSelect={() => {
              close();
              window.alert("Manual Credit — coming in a later ops pass.");
            }}
          />
          <MenuItem
            icon={History}
            label="Wallet History"
            onSelect={() => {
              close();
              window.alert("Wallet History — coming in Part 2 / NestJS.");
            }}
          />
          <MenuItem
            icon={ScrollText}
            label="Audit Log"
            onSelect={() => {
              close();
              window.alert("Audit Log — deferred system module.");
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

function MenuDivider() {
  return <div className="admin-divider my-1 border-t" role="separator" />;
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
