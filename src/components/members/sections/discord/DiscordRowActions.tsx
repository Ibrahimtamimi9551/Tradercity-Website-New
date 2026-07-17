"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, MoreVertical, RefreshCw, Send, User } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import type { DiscordMember } from "@/types/members/discord";

export type DiscordRowActionHandlers = {
  onView: (member: DiscordMember) => void;
  onManualSync: (member: DiscordMember) => void;
  onSendInvite: (member: DiscordMember) => void;
};

type DiscordRowActionsProps = {
  member: DiscordMember;
  handlers: DiscordRowActionHandlers;
};

/**
 * Table row actions: View, Manual Sync, More.
 * TODO(NestJS): wire Manual Sync / Send Invite to Discord integration service.
 */
export function DiscordRowActions({ member, handlers }: DiscordRowActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

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
        aria-label={`View ${member.username}`}
        onClick={(e) => {
          e.stopPropagation();
          handlers.onView(member);
        }}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="admin-ghost-btn admin-muted rounded-lg p-1.5 transition-colors hover:text-[var(--admin-fg)]"
        aria-label={`Manual sync ${member.username}`}
        onClick={(e) => {
          e.stopPropagation();
          handlers.onManualSync(member);
        }}
      >
        <RefreshCw className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="admin-ghost-btn admin-muted rounded-lg p-1.5 transition-colors hover:text-[var(--admin-fg)]"
        aria-label={`More actions for ${member.username}`}
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
          aria-label="Discord member actions"
          className="admin-card-surface absolute right-0 top-full z-50 mt-1 min-w-[11.5rem] overflow-hidden rounded-xl border py-1"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem
            icon={User}
            label="Open Profile"
            onSelect={() => {
              close();
              router.push(`/admin/members/${member.memberId}`);
            }}
          />
          <MenuItem
            icon={RefreshCw}
            label="Sync Now"
            onSelect={() => {
              close();
              handlers.onManualSync(member);
            }}
          />
          <MenuItem
            icon={Send}
            label="Send Invite"
            onSelect={() => {
              close();
              handlers.onSendInvite(member);
            }}
          />
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
