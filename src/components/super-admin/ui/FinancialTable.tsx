import { cn } from "@/lib/super-admin/cn";

export type FinancialTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => React.ReactNode;
};

type FinancialTableProps<T> = {
  columns: FinancialTableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  emptyTitle?: string;
  className?: string;
};

/**
 * Reusable presentational table. No sorting, filtering, or finance logic.
 */
export function FinancialTable<T>({
  columns,
  data,
  getRowKey,
  emptyTitle = "No records",
  className,
}: FinancialTableProps<T>) {
  if (data.length === 0) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-white/[0.07] px-4 py-10 text-center text-sm text-zinc-500",
          className
        )}
      >
        {emptyTitle}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/[0.07]", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-white/[0.02] text-[11px] uppercase tracking-[0.12em] text-zinc-500">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn("px-4 py-3 font-medium", column.className)}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {data.map((row) => (
              <tr key={getRowKey(row)} className="text-zinc-200">
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-4 py-3", column.className)}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
