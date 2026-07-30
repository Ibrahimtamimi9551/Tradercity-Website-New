"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { copyTextToClipboard } from "@/lib/analysts/format-commissions";

type CopyValueButtonProps = {
  value: string;
  label?: string;
  className?: string;
  onCopied?: () => void;
};

/**
 * One-click copy for operational values (wallet, tx hash, codes, links).
 */
export function CopyValueButton({
  value,
  label = "Copy",
  className,
  onCopied,
}: CopyValueButtonProps) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    const ok = await copyTextToClipboard(value);
    if (!ok) return;
    onCopied?.();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-amber-400/30 bg-amber-500/10 px-2 py-1 text-[11px] font-medium text-amber-100 hover:bg-amber-500/20",
        className
      )}
      aria-label={`${label}: ${value}`}
    >
      {copied ? (
        <Check className="h-3 w-3" aria-hidden />
      ) : (
        <Copy className="h-3 w-3" aria-hidden />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}
