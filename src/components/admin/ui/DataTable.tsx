import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/admin/cn";

export type DataTableSortDirection = "asc" | "desc";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  /** When true, clicks in this cell do not trigger `onRowClick`. */
  stopRowClick?: boolean;
  /** Enables header click sorting when `onSortChange` is provided. */
  sortable?: boolean;
  render: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  /** When set, the matching row receives selected styles (details panel pairing). */
  selectedKey?: string | null;
  emptyTitle?: string;
  className?: string;
  /** Tighter cell padding on mobile only — keeps desktop spacing unchanged */
  compactMobile?: boolean;
  sortKey?: string | null;
  sortDirection?: DataTableSortDirection | null;
  onSortChange?: (key: string) => void;
};

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  onRowClick,
  selectedKey = null,
  emptyTitle = "No records found",
  className,
  compactMobile = false,
  sortKey = null,
  sortDirection = null,
  onSortChange,
}: DataTableProps<T>) {
  const cellPad = compactMobile ? "px-2 py-2 sm:px-4 sm:py-3" : "px-4 py-3";
  const headerPad = compactMobile ? "px-2 py-2 sm:px-4 sm:py-3" : "px-4 py-3";

  if (data.length === 0) {
    return (
      <div className={cn("overflow-hidden rounded-xl border border-white/10", className)}>
        <div className="px-4 py-10 text-center text-sm text-tc-muted">{emptyTitle}</div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/10", className)}>
      <div className="overflow-x-auto">
        <table
          className={cn(
            "min-w-full divide-y divide-white/10",
            compactMobile ? "text-xs sm:text-sm" : "text-sm"
          )}
        >
          <thead className="bg-white/[0.02]">
            <tr>
              {columns.map((column) => {
                const canSort = Boolean(column.sortable && onSortChange);
                const isActive = sortKey === column.key;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      canSort && isActive
                        ? sortDirection === "asc"
                          ? "ascending"
                          : "descending"
                        : canSort
                          ? "none"
                          : undefined
                    }
                    className={cn(
                      headerPad,
                      "text-left text-[10px] font-medium uppercase tracking-wider text-tc-muted sm:text-xs",
                      column.className
                    )}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        onClick={() => onSortChange?.(column.key)}
                        className={cn(
                          "inline-flex items-center gap-1 transition-colors hover:text-white",
                          isActive && "text-white"
                        )}
                      >
                        {column.header}
                        {isActive && sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3" aria-hidden />
                        ) : isActive && sortDirection === "desc" ? (
                          <ArrowDown className="h-3 w-3" aria-hidden />
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-50" aria-hidden />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            {data.map((row) => {
              const key = getRowKey(row);
              const selected = selectedKey != null && selectedKey === key;
              return (
                <tr
                  key={key}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    onRowClick && "cursor-pointer hover:bg-white/[0.03]",
                    selected && "bg-violet-500/10"
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(cellPad, "text-white/90", column.className)}
                      onClick={
                        column.stopRowClick
                          ? (event) => event.stopPropagation()
                          : undefined
                      }
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
