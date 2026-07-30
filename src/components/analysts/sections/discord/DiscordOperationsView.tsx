"use client";

import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { AnalystDiscordRecord } from "@/types/analysts/discord";
import { DiscordDetails } from "./DiscordDetails";
import type { AnalystDiscordOperation } from "@/types/analysts/discord";

type DiscordOperationsViewProps = {
  records: AnalystDiscordRecord[];
  selected: AnalystDiscordRecord | null;
  onSelect: (record: AnalystDiscordRecord) => void;
  onOperation: (
    record: AnalystDiscordRecord,
    operation: AnalystDiscordOperation
  ) => void;
};

/**
 * Operations workspace — pick a partner and run Discord lifecycle actions.
 * Same actions as the Directory inspector; focused surface for ops work.
 */
export function DiscordOperationsView({
  records,
  selected,
  onSelect,
  onOperation,
}: DiscordOperationsViewProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
      <aside className={modulePanelSurface("navy", "space-y-2 p-3")}>
        <p className="px-1 text-xs font-semibold uppercase tracking-wide text-tc-muted">
          Partners
        </p>
        <ul className="max-h-[28rem] space-y-1 overflow-y-auto">
          {records.map((row) => {
            const active = selected?.id === row.id;
            return (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => onSelect(row)}
                  className={
                    active
                      ? "w-full rounded-lg border border-violet-400/35 bg-violet-500/15 px-3 py-2 text-left text-sm text-violet-100"
                      : "w-full rounded-lg border border-transparent px-3 py-2 text-left text-sm text-white/80 hover:bg-white/5"
                  }
                >
                  <span className="block truncate font-medium">{row.displayName}</span>
                  <span className="block truncate text-[10px] text-tc-muted">
                    {row.status.replace(/_/g, " ")}
                  </span>
                </button>
              </li>
            );
          })}
          {records.length === 0 ? (
            <li className="px-2 py-6 text-center text-xs text-tc-muted">
              No Discord records yet. Approve an application to activate a partner.
            </li>
          ) : null}
        </ul>
      </aside>

      <DiscordDetails record={selected} onOperation={onOperation} />
    </div>
  );
}
