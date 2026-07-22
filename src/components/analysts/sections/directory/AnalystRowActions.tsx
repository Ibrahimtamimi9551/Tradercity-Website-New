"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Archive,
  MessageSquare,
  MoreVertical,
  StickyNote,
  UserRound,
  Ban,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/admin/cn";
import type { DirectoryAnalyst } from "@/types/analysts/directory";

type AnalystRowActionsProps = {
  analyst: DirectoryAnalyst;
};

/**
 * Directory ⋮ operational menu.
 * Wave A: only "Open Analyst Control Center" is active.
 * Other items are visible placeholders — not fake functionality.
 */
export function AnalystRowActions({ analyst }: AnalystRowActionsProps) {
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
    <div ref={rootRef} className="relative flex items-center justify-end">
      <button
        type="button"
        className="rounded-lg p-1.5 text-tc-muted transition-colors hover:bg-white/[0.06] hover:text-white"
        aria-label={`More actions for ${analyst.displayName}`}
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
          aria-label="Analyst directory actions"
          className="admin-card-surface absolute right-0 top-full z-50 mt-1 min-w-[14.5rem] overflow-hidden rounded-xl border py-1"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem
            icon={UserRound}
            label="Open Analyst Control Center"
            onSelect={() => {
              close();
              router.push(`/admin/analysts/${analyst.id}`);
            }}
          />
          <MenuDivider />
          <MenuItem icon={MessageSquare} label="Open Discord" disabled />
          <MenuItem icon={Clock} label="View Timeline" disabled />
          <MenuItem icon={StickyNote} label="Internal Notes" disabled />
          <MenuDivider />
          <MenuItem icon={Ban} label="Suspend Partnership" disabled />
          <MenuItem icon={XCircle} label="Close Partnership" disabled />
          <MenuItem icon={Archive} label="Archive Analyst" disabled />
        </div>
      ) : null}
    </div>
  );
}

function MenuDivider() {
  return <div role="separator" className="my-1 border-t border-white/10" />;
}

function MenuItem({
  icon: Icon,
  label,
  onSelect,
  disabled,
}: {
  icon: React.ElementType;
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors",
        disabled
          ? "cursor-not-allowed text-tc-muted/70"
          : "text-white/85 hover:bg-[var(--admin-row-hover)]"
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
      <span className="flex-1">{label}</span>
      {disabled ? <span className="text-[10px] uppercase tracking-wide">Soon</span> : null}
    </button>
  );
}
