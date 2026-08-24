import { redirect } from "next/navigation";
import { SUPER_ADMIN_ROUTES } from "@/constants/super-admin";

/** Canonical dashboard lives at `/super-admin`. */
export default function SuperAdminDashboardAliasPage() {
  redirect(SUPER_ADMIN_ROUTES.dashboard);
}
