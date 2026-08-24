import type { Metadata } from "next";
import { SuperAdminShell } from "@/components/super-admin/layout";

export const metadata: Metadata = {
  title: "TraderCity — Company Control Centre",
  description: "TraderCity Super Admin Company Control Centre",
  robots: { index: false, follow: false },
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminShell>{children}</SuperAdminShell>;
}
