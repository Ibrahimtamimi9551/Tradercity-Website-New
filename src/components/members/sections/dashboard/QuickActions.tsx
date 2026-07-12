"use client";

import Link from "next/link";
import { Plus, CheckCircle, Download, FileText, ChevronRight } from "lucide-react";

const actions = [
  {
    id: "add-member",
    title: "Add New Member",
    description: "Create and invite new member",
    icon: Plus,
    href: "/admin/members/new",
  },
  {
    id: "manual-verification",
    title: "Manual Verification",
    description: "Verify payments manually",
    icon: CheckCircle,
    href: "/admin/subscriptions?action=verify",
  },
  {
    id: "export-members",
    title: "Export Members",
    description: "Export member data",
    icon: Download,
    href: "/admin/members/export",
  },
  {
    id: "audit-logs",
    title: "View Audit Logs",
    description: "View system audit trails",
    icon: FileText,
    href: "/admin/audit-logs",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-5">
      <h3 className="mb-6 text-base font-medium text-white">Quick Actions</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-3">
              <div className="text-tc-muted group-hover:text-white">
                <action.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/90">{action.title}</p>
                <p className="text-xs text-tc-muted">{action.description}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-tc-muted transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
          </Link>
        ))}
      </div>
    </div>
  );
}
