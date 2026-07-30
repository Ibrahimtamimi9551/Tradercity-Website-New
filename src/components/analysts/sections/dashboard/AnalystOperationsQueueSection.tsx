"use client";

import { ClipboardList, BadgeCheck, Handshake, Coins } from "lucide-react";
import { OperationsQueue } from "@/components/admin/ui";
import { MOCK_ANALYST_DASHBOARD } from "@/lib/analysts/mock/dashboard";

const iconById = {
  q1: ClipboardList,
  q2: BadgeCheck,
  q3: Handshake,
  q4: Coins,
} as const;

export function AnalystOperationsQueueSection() {
  const items = MOCK_ANALYST_DASHBOARD.queue.map((item) => ({
    ...item,
    icon: iconById[item.id as keyof typeof iconById] ?? ClipboardList,
  }));

  return (
    <OperationsQueue
      title="Analyst Operations Queue"
      total={MOCK_ANALYST_DASHBOARD.queueTotal}
      items={items}
      viewAllHref="/admin/analysts"
    />
  );
}
