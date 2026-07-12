"use client";

import Link from "next/link";
import { CheckCircle2, Hexagon, Mail, Database, Server, HardDrive } from "lucide-react";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";

const services = [
  { id: "payment", name: "Payment System", status: "Operational", icon: CheckCircle2 },
  { id: "discord", name: "Discord Integration", status: "Operational", icon: DiscordIcon },
  { id: "blockchain", name: "Blockchain Network", status: "Operational", icon: Hexagon },
  { id: "email", name: "Email Service", status: "Operational", icon: Mail },
  { id: "storage", name: "File Storage", status: "Operational", icon: HardDrive },
  { id: "database", name: "Database", status: "Operational", icon: Database },
  { id: "api", name: "API Services", status: "Operational", icon: Server },
];

export function PlatformHealth() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-5">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium text-white">Platform Health</h3>
          <p className="mt-1 text-sm text-tc-muted">Real-time status of critical system components</p>
        </div>
        <Link href="/admin/health" className="text-sm font-medium text-tc-purple hover:text-purple-300">
          View detailed status &rarr;
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <service.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-white/90">{service.name}</p>
              <div className="mt-0.5 flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <p className="text-[10px] font-medium text-emerald-400">{service.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
