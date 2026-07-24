"use client";

import {
  DataTable,
  StatusBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  analystCommissionPayoutStatusPresentation,
  formatCommissionDate,
  formatCommissionUsd,
  shortenTxHash,
  shortenWalletAddress,
} from "@/lib/analysts/format-commissions";
import type { AnalystPayoutRecord } from "@/types/analysts/commissions";
import { CopyValueButton } from "./CopyValueButton";

type CommissionHistoryViewProps = {
  rows: AnalystPayoutRecord[];
  onOpenProfile: (commissionRecordId: string) => void;
};

/**
 * Permanent payout ledger — records are never deleted.
 */
export function CommissionHistoryView({
  rows,
  onOpenProfile,
}: CommissionHistoryViewProps) {
  const columns: DataTableColumn<AnalystPayoutRecord>[] = [
    {
      key: "date",
      header: "Payout Date",
      render: (row) => (
        <span className="text-white">
          {formatCommissionDate(row.paymentDate ?? row.payoutDate)}
        </span>
      ),
    },
    {
      key: "analyst",
      header: "Analyst",
      className: "min-w-[9rem]",
      render: (row) => (
        <button
          type="button"
          onClick={() => onOpenProfile(row.commissionRecordId)}
          className="text-left font-medium text-amber-100 hover:text-amber-50"
        >
          {row.analystDisplayName}
        </button>
      ),
    },
    {
      key: "gross",
      header: "Gross Business",
      render: (row) => (
        <span className="tabular-nums text-white">
          {formatCommissionUsd(row.grossCommissionUsd)}
        </span>
      ),
    },
    {
      key: "refs",
      header: "Referrals",
      render: (row) => (
        <span className="tabular-nums">{row.referralCountIncluded}</span>
      ),
    },
    {
      key: "share",
      header: "Analyst Share",
      render: (row) => (
        <span className="tabular-nums text-amber-100">
          {formatCommissionUsd(row.analystShareUsd)}
        </span>
      ),
    },
    {
      key: "tc",
      header: "TraderCity Share",
      render: (row) => (
        <span className="tabular-nums text-tc-muted">
          {formatCommissionUsd(row.traderCityShareUsd)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const p = analystCommissionPayoutStatusPresentation(row.status);
        return <StatusBadge label={p.label} tone={p.tone} />;
      },
    },
    {
      key: "tx",
      header: "Transaction Hash",
      className: "min-w-[12rem]",
      stopRowClick: true,
      render: (row) =>
        row.transactionHash ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-white/75">
              {shortenTxHash(row.transactionHash)}
            </span>
            <CopyValueButton value={row.transactionHash} />
          </div>
        ) : (
          <span className="text-tc-muted">—</span>
        ),
    },
    {
      key: "wallet",
      header: "Wallet",
      className: "min-w-[10rem]",
      stopRowClick: true,
      render: (row) =>
        row.walletAddress ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-tc-muted">
              {shortenWalletAddress(row.walletAddress)}
            </span>
            <CopyValueButton value={row.walletAddress} label="Wallet" />
          </div>
        ) : (
          <span className="text-tc-muted">—</span>
        ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className={modulePanelSurface("navy", "space-y-2")}>
        <h2 className="text-sm font-medium text-white sm:text-base">
          Permanent financial ledger
        </h2>
        <p className="text-sm text-white/75">
          Completed payout records are append-only. Corrections create new
          entries — never delete prior settlement history. Future disputes
          reference these records by id + transaction hash.
        </p>
      </section>

      <DataTable
        columns={columns}
        data={rows}
        getRowKey={(row) => row.id}
        emptyTitle="No payout history yet"
        compactMobile
        className="border-white/10 bg-white/[0.015] max-sm:rounded-lg"
      />
    </div>
  );
}
