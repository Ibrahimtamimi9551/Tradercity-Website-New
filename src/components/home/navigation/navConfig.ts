import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CreditCard,
  Handshake,
  Home,
  Map,
  Users,
  UsersRound,
} from "lucide-react";

export type NavItemConfig = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  showNotification?: boolean;
};

export const NAV_ITEMS: NavItemConfig[] = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "journey", label: "Journey", href: "#journey", icon: Map },
  { id: "team", label: "Team", href: "#analysts", icon: Users },
  { id: "community", label: "Community", href: "#community", icon: UsersRound },
  { id: "knowledge", label: "Knowledge", href: "#research", icon: BookOpen },
  {
    id: "pricing",
    label: "Pricing",
    href: "#pricing",
    icon: CreditCard,
    showNotification: true,
  },
  {
    id: "partnership",
    label: "Partnership",
    href: "#become-analyst",
    icon: Handshake,
  },
];

/** Mobile bottom nav mirrors desktop homepage IA. */
export const MOBILE_NAV_ITEMS: NavItemConfig[] = NAV_ITEMS;

export const SECTION_IDS = [
  "home",
  "journey",
  "analysts",
  "community",
  "research",
  "pricing",
  "become-analyst",
];

export const SCROLL_COMPACT_THRESHOLD = 50;
export const NAV_TRANSITION_MS = 520;
export const MOBILE_NAV_TRANSITION_MS = 180;

/** Viewports below this width use mobile bottom navigation. */
export const DESKTOP_NAV_MIN_WIDTH = 768;

/** Viewports below this width always use compact top navigation (tablet range). */
export const DESKTOP_HERO_NAV_MIN_WIDTH = 1024;
