import {
  LayoutDashboard,
  Users,
  CreditCard,
  MessageSquare,
  Gift,
} from "lucide-react";
import type { AdminNavItem } from "@/types/admin/navigation";

export const MEMBER_MANAGEMENT_NAV: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, mobilePrimary: true },
  { label: "Members", href: "/admin/members", icon: Users, mobilePrimary: true },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard, mobilePrimary: true },
  { label: "Discord", href: "/admin/discord", icon: MessageSquare },
  { label: "Referrals", href: "/admin/referrals", icon: Gift },
];

export const MOBILE_MORE_NAV = MEMBER_MANAGEMENT_NAV.filter((item) => !item.mobilePrimary);
