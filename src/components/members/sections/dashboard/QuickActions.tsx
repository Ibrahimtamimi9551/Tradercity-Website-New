"use client";

import Link from "next/link";
import { Plus, CheckCircle, Download, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";

const actions = [
  {
    id: "add-member",
    title: "Add New Member",
    description: "Create and invite new member",
    icon: Plus,
    // Route not built yet — land on Members directory (stability).
    href: "/admin/members",
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
    // Export route not built yet — land on Members directory (stability).
    href: "/admin/members",
  },
  {
    id: "audit-logs",
    title: "View Audit Logs",
    description: "View system audit trails",
    icon: FileText,
    // Audit logs deferred — land on Operations Dashboard (stability).
    href: "/admin",
  },
];

export function QuickActions() {
  return (
    <div className={modulePanelSurface("purple")}>
      <h3 className="mb-6 text-base font-medium text-white">Quick Actions</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className={cn(
              "group flex items-center justify-between rounded-lg border border-violet-400/15 bg-black/20 p-4 transition-colors",
              "hover:border-violet-400/25 hover:bg-violet-500/10"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="text-violet-300/80 group-hover:text-violet-200">
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
