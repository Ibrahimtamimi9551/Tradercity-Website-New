"use client";

import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { cn } from "@/lib/admin/cn";
import {
  formatBillingCycleMonth,
  formatCommissionDateShort,
  formatCommissionTierLabel,
  formatCommissionUsd,
  shortenWalletAddress,
} from "@/lib/analysts/format-commissions";
import type {
  AnalystCommissionCompletePayoutInput,
  AnalystCommissionOperation,
  AnalystCommissionPayoutQueueItem,
  AnalystCommissionRecord,
} from "@/types/analysts/commissions";
import { CopyValueButton } from "./CopyValueButton";

type PayoutListFilter = "ready" | "overdue" | "paid" | "this_month";

type CommissionPayoutsViewProps = {
  queue: AnalystCommissionPayoutQueueItem[];
  allRows: AnalystCommissionRecord[];
  onOperation: (
    commissionId: string,
    operation: AnalystCommissionOperation,
    input?: AnalystCommissionCompletePayoutInput
  ) => void;
  onOpenWorkspace: (commissionId: string) => void;
};

/**
 * Monthly payment workspace — search → select → copy wallet → send → mark paid.
 */
export function CommissionPayoutsView({
  queue,
  allRows,
  onOperation,
  onOpenWorkspace,
}: CommissionPayoutsViewProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PayoutListFilter>("ready");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const queueById = useMemo(() => {
    const map = new Map<string, AnalystCommissionPayoutQueueItem>();
    for (const item of queue) map.set(item.record.id, item);
    return map;
  }, [queue]);

  const now = useMemo(() => new Date(), []);

  const candidates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allRows
      .filter((row) => {
        if (q) {
          const hay =
            `${row.displayName} ${row.handle} ${row.email}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        if (filter === "ready") return queueById.has(row.id);
        if (filter === "overdue") return row.summary.dueAmountUsd > 0;
        if (filter === "paid") return row.summary.paidUsd > 0;
        if (queueById.has(row.id)) return true;
        return row.payouts.some((p) => {
          if (p.status !== "paid") return false;
          const d = new Date(p.paymentDate ?? p.payoutDate);
          return (
            d.getUTCFullYear() === now.getUTCFullYear() &&
            d.getUTCMonth() === now.getUTCMonth()
          );
        });
      })
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [allRows, filter, now, query, queueById]);

  const selected =
    selectedId != null
      ? allRows.find((r) => r.id === selectedId) ?? null
      : null;
  const selectedQueueItem = selected ? queueById.get(selected.id) ?? null : null;

  const selectionValid =
    selected != null && candidates.some((c) => c.id === selected.id);

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className={modulePanelSurface("gold", "space-y-3")}>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">
            Monthly payment workspace
          </h2>
          <p className="mt-1 text-sm text-white/75">
            Search an analyst, review commission, copy the wallet, send USDT,
            paste the hash, optionally attach evidence, then mark paid.
          </p>
        </div>
        <dl className="grid gap-2 sm:grid-cols-3">
          <Stat label="Analysts Ready for Payment" value={String(queue.length)} />
          <Stat
            label="Total Commission Generated"
            value={formatCommissionUsd(
              queue.reduce((s, item) => s + item.readyGrossUsd, 0)
            )}
          />
          <Stat
            label="Total Amount to Pay"
            value={formatCommissionUsd(
              queue.reduce((s, item) => s + item.readyAnalystUsd, 0)
            )}
          />
        </dl>
      </section>

      <div className="space-y-3">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-tc-muted">
            Search analyst
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedId(null);
            }}
            placeholder="Name, handle, email…"
            className="w-full max-w-lg rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-tc-muted/70 focus:border-amber-400/40 focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["ready", "Ready for Payment"],
              ["overdue", "Overdue"],
              ["paid", "Paid"],
              ["this_month", "This Month"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setFilter(id);
                setSelectedId(null);
              }}
              className={cn(
                "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
                filter === id
                  ? "border-amber-400/40 bg-amber-500/20 text-amber-50"
                  : "border-white/10 bg-black/20 text-tc-muted hover:border-white/20 hover:text-white/80"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="max-h-64 overflow-y-auto divide-y divide-white/5 rounded-lg border border-white/10 bg-black/20">
          {candidates.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-tc-muted">
              No analysts match this search or filter
            </li>
          ) : (
            candidates.map((row) => {
              const ready = queueById.has(row.id);
              const active = selectionValid && selectedId === row.id;
              return (
                <li key={row.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(row.id)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left",
                      active
                        ? "bg-amber-500/15"
                        : "hover:bg-white/[0.04]"
                    )}
                  >
                    <span>
                      <span className="block text-sm font-medium text-white">
                        {row.displayName}
                      </span>
                      <span className="block text-xs text-tc-muted">
                        @{row.handle}
                        {ready
                          ? ` · Pay ${formatCommissionUsd(queueById.get(row.id)!.readyAnalystUsd)}`
                          : row.summary.dueAmountUsd > 0
                            ? ` · Due ${formatCommissionUsd(row.summary.dueAmountUsd)}`
                            : ` · Paid ${formatCommissionUsd(row.summary.paidUsd)}`}
                      </span>
                    </span>
                    {ready ? (
                      <StatusBadge
                        label={
                          row.summary.dueAmountUsd > 0
                            ? "Overdue"
                            : "Ready for Payment"
                        }
                        tone={
                          row.summary.dueAmountUsd > 0 ? "danger" : "warning"
                        }
                      />
                    ) : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {selectionValid && selected ? (
        selectedQueueItem ? (
          <PayoutQueueCard
            item={selectedQueueItem}
            onOperation={onOperation}
            onOpenWorkspace={onOpenWorkspace}
            onCompleted={() => setSelectedId(null)}
          />
        ) : (
          <div className="admin-card-surface rounded-xl border border-white/10 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-white">
                  {selected.displayName}
                </h3>
                <p className="mt-0.5 text-xs text-tc-muted">
                  @{selected.handle} · Not ready for payout
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenWorkspace(selected.id)}
                className="text-xs text-amber-200 hover:text-amber-100"
              >
                Open Dashboard →
              </button>
            </div>
            <dl className="mt-4 grid gap-2 sm:grid-cols-3">
              <Stat
                label="Commission Generated"
                value={formatCommissionUsd(selected.summary.currentCommissionUsd)}
              />
              <Stat
                label="Outstanding Due"
                value={formatCommissionUsd(selected.summary.dueAmountUsd)}
              />
              <Stat
                label="Paid"
                value={formatCommissionUsd(selected.summary.paidUsd)}
              />
            </dl>
            <p className="mt-3 text-xs text-tc-muted">
              Ensure a wallet is on file before settling ready commission.
            </p>
            {selected.summary.lastPayoutAt ? (
              <p className="mt-2 text-xs text-tc-muted">
                Last payment{" "}
                {formatCommissionDateShort(selected.summary.lastPayoutAt)}
              </p>
            ) : null}
          </div>
        )
      ) : (
        <div className="admin-card-surface rounded-xl border border-dashed border-white/10 px-4 py-10 text-center">
          <p className="text-sm font-medium text-white">Select an analyst</p>
          <p className="mt-1 text-xs text-tc-muted">
            Search and choose one result to open the payment card.
          </p>
        </div>
      )}
    </div>
  );
}

function PayoutQueueCard({
  item,
  onOperation,
  onOpenWorkspace,
  onCompleted,
}: {
  item: AnalystCommissionPayoutQueueItem;
  onOperation: CommissionPayoutsViewProps["onOperation"];
  onOpenWorkspace: (commissionId: string) => void;
  onCompleted: () => void;
}) {
  const [txHash, setTxHash] = useState("");
  const [notes, setNotes] = useState("");
  const [evidenceFileName, setEvidenceFileName] = useState<string | null>(null);
  const { record } = item;
  const wallet = record.wallet!;

  const complete = () => {
    const hash = txHash.trim();
    if (!hash) return;
    onOperation(record.id, "complete_payout", {
      transactionHash: hash,
      notes: notes.trim() || undefined,
      evidenceFileName: evidenceFileName ?? undefined,
    });
    setTxHash("");
    setNotes("");
    setEvidenceFileName(null);
    onCompleted();
  };

  return (
    <div className="admin-card-surface rounded-xl border border-amber-500/15 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-white">
              {record.displayName}
            </h3>
            <StatusBadge
              label={
                item.dueAmountUsd > 0 ? "Overdue" : "Ready for Payment"
              }
              tone={item.dueAmountUsd > 0 ? "danger" : "warning"}
            />
          </div>
          <p className="mt-0.5 text-xs text-tc-muted">
            @{record.handle} · {formatCommissionTierLabel(record.tier)} ·{" "}
            {formatBillingCycleMonth(record.tier.billingCycleMonth)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenWorkspace(record.id)}
          className="text-xs text-amber-200 hover:text-amber-100"
        >
          Open Dashboard →
        </button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <SplitCard
          label="Commission Generated"
          value={item.readyGrossUsd}
        />
        <SplitCard
          label="Amount Payable"
          value={record.summary.amountPayableUsd}
        />
        <SplitCard
          label="Outstanding Due"
          value={item.dueAmountUsd}
          warn={item.dueAmountUsd > 0}
        />
        <SplitCard
          label="Total Amount to Pay"
          value={item.readyAnalystUsd}
          emphasize
        />
      </div>

      <p className="mt-2 text-xs text-tc-muted">
        {item.readyReferralCount} referral
        {item.readyReferralCount === 1 ? "" : "s"} · Token USDT ·{" "}
        {wallet.networkLabel} · Tier {record.tier.analystSharePercent}%
      </p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/25 px-3 py-2">
          <p className="text-[11px] text-tc-muted">Wallet</p>
          <p className="truncate font-mono text-sm text-amber-100">
            {shortenWalletAddress(wallet.address, 8)}
          </p>
        </div>
        <CopyValueButton
          value={wallet.address}
          label="Copy wallet"
          className="px-3.5 py-2.5 text-sm"
          onCopied={() => onOperation(record.id, "copy_wallet")}
        />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
        <label className="block space-y-1">
          <span className="text-[11px] text-tc-muted">
            Blockchain transaction hash
          </span>
          <input
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="0x…"
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-white placeholder:text-tc-muted/60 focus:border-amber-400/40 focus:outline-none"
          />
        </label>
        <div className="flex items-end">
          <button
            type="button"
            onClick={complete}
            disabled={!txHash.trim()}
            className="w-full rounded-lg border border-emerald-400/35 bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-50 hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            Mark paid
          </button>
        </div>
      </div>

      <label className="mt-3 block space-y-1">
        <span className="text-[11px] text-tc-muted">
          Payment evidence (optional · screenshot / receipt)
        </span>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setEvidenceFileName(file?.name ?? null);
          }}
          className="block w-full text-xs text-tc-muted file:mr-3 file:rounded-md file:border file:border-white/15 file:bg-white/5 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-white/10"
        />
        {evidenceFileName ? (
          <p className="text-[11px] text-amber-100/80">
            Attached · {evidenceFileName}
          </p>
        ) : (
          <p className="text-[11px] text-tc-muted">
            Visible later in Analyst Dashboard payout history.
          </p>
        )}
      </label>

      <label className="mt-2 block space-y-1">
        <span className="text-[11px] text-tc-muted">Internal notes (optional)</span>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ops notes for this payment…"
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-tc-muted/60 focus:border-amber-400/40 focus:outline-none"
        />
      </label>
    </div>
  );
}

function SplitCard({
  label,
  value,
  emphasize,
  warn,
}: {
  label: string;
  value: number;
  emphasize?: boolean;
  warn?: boolean;
}) {
  return (
    <div
      className={
        emphasize
          ? "rounded-lg border border-amber-400/25 bg-amber-500/10 px-3 py-2.5"
          : warn
            ? "rounded-lg border border-rose-400/25 bg-rose-500/10 px-3 py-2.5"
            : "rounded-lg border border-white/8 bg-black/20 px-3 py-2.5"
      }
    >
      <p className="text-[11px] text-tc-muted">{label}</p>
      <p className="mt-0.5 tabular-nums text-sm font-semibold text-white">
        {formatCommissionUsd(value)}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-black/20 px-3 py-2.5">
      <dt className="text-[11px] text-tc-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold tabular-nums text-white">
        {value}
      </dd>
    </div>
  );
}
