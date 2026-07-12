"use client";

import { useState } from "react";
import { cn } from "@/lib/admin/cn";
import { AdminBackground } from "./AdminBackground";
import { AdminHeader } from "./AdminHeader";
import { AdminMobileNav } from "./AdminMobileNav";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-tc-navy text-white">
      <AdminBackground />
      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <AdminHeader onOpenMobileNav={() => setMobileOpen(true)} sidebarCollapsed={collapsed} />
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] px-4 pb-24 pt-6 lg:px-8 lg:pb-8",
          collapsed ? "lg:pl-[72px]" : "lg:pl-64"
        )}
      >
        {children}
      </main>
      <AdminMobileNav />
    </div>
  );
}
