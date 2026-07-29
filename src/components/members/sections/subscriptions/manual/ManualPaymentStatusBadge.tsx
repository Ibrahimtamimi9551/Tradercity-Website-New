"use client";

import { StatusBadge } from "@/components/admin/ui";
import type {
  ManualPayment,
  ManualPaymentStatus,
} from "@/types/members/manual-payment";

export function ManualPaymentStatusBadge({
  status,
  label,
  tone,
}: {
  status?: ManualPaymentStatus;
  label: string;
  tone: ManualPayment["statusTone"];
}) {
  void status;
  return <StatusBadge label={label} tone={tone} />;
}
