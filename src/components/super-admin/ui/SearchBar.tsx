import { Search } from "lucide-react";
import { cn } from "@/lib/super-admin/cn";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  /** Phase 0 default: presentational only. */
  readOnly?: boolean;
};

export function SearchBar({
  placeholder = "Search…",
  value,
  onChange,
  className,
  readOnly = true,
}: SearchBarProps) {
  return (
    <div className={cn("relative min-w-0 flex-1", className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
        aria-hidden
      />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className="h-10 w-full rounded-lg border border-white/[0.08] bg-zinc-950/80 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500/50 focus:outline-none"
        aria-label={placeholder}
      />
    </div>
  );
}
