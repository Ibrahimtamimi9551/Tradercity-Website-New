"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/admin/cn";

type AdminRowActionsMenuProps = {
  /** Accessible name for the ⋮ trigger button. */
  ariaLabel: string;
  /** Accessible name for the popup menu. */
  menuLabel: string;
  children: React.ReactNode | ((api: { close: () => void }) => React.ReactNode);
};

/**
 * Shared Admin table ⋮ menu — frosted glass, purple hover, fade+scale.
 * Use across Members / Referrals / future directories for identical interaction.
 */
export function AdminRowActionsMenu({
  ariaLabel,
  menuLabel,
  children,
}: AdminRowActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

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
  const content =
    typeof children === "function" ? children({ close }) : children;

  return (
    <div ref={rootRef} className="relative flex justify-end">
      <button
        type="button"
        className="rounded-lg p-1.5 text-tc-muted transition-colors hover:bg-violet-500/15 hover:text-violet-100"
        aria-label={ariaLabel}
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
          aria-label={menuLabel}
          className={cn(
            "absolute right-0 top-full z-50 mt-1.5 min-w-[13.25rem] origin-top-right overflow-hidden",
            "rounded-[10px] border border-white/10 bg-[#0c101c]/90 py-1",
            "shadow-[0_10px_36px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl",
            "transition duration-150 ease-out",
            entered ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
}

export function AdminRowMenuDivider() {
  return <div role="separator" className="my-1 border-t border-white/10" />;
}

export function AdminRowMenuItem({
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
      className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-white/85 transition-colors duration-150 hover:bg-violet-500/15 hover:text-violet-100"
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-white/55" aria-hidden />
      {label}
    </button>
  );
}
