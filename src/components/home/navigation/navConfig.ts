import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CandlestickChart,
  CreditCard,
  Crown,
  Ellipsis,
  Home,
  Info,
  Map,
  Settings,
  Tag,
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

export type MoreMenuItemConfig = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  disabled?: boolean;
};

export const NAV_ITEMS: NavItemConfig[] = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "journey", label: "Journey", href: "#journey", icon: Map },
  { id: "team", label: "Team", href: "#analysts", icon: Users },
  { id: "community", label: "Community", href: "#community", icon: UsersRound },
  { id: "research", label: "Research", href: "#research", icon: BookOpen },
  {
    id: "pricing",
    label: "Pricing",
    href: "#pricing",
    icon: CreditCard,
    showNotification: true,
  },
];

export const MOBILE_NAV_ITEMS: NavItemConfig[] = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "journey", label: "Journey", href: "#journey", icon: BookOpen },
  { id: "research", label: "Research", href: "#research", icon: CandlestickChart },
  { id: "community", label: "Community", href: "#community", icon: Users },
  { id: "more", label: "More", href: "#more", icon: Ellipsis },
];

export const MORE_MENU_ITEMS: MoreMenuItemConfig[] = [
  {
    id: "team",
    label: "Team",
    description: "Meet our analysts & contributors",
    href: "#analysts",
    icon: Users,
  },
  {
    id: "pricing",
    label: "Pricing",
    description: "View membership plans",
    href: "#pricing",
    icon: Tag,
  },
  {
    id: "login",
    label: "Login / Dashboard",
    description: "Access your account",
    href: "/login",
    icon: Crown,
    badge: "VIP",
  },
  {
    id: "about",
    label: "About TraderCity",
    description: "Our mission & vision",
    href: "#home",
    icon: Info,
  },
  {
    id: "settings",
    label: "Settings",
    description: "Preferences & more",
    href: "#",
    icon: Settings,
    disabled: true,
  },
];

export const SECTION_IDS = ["home", "journey", "analysts", "community", "research", "pricing"];

export const SCROLL_COMPACT_THRESHOLD = 50;
export const NAV_TRANSITION_MS = 520;
export const MOBILE_NAV_TRANSITION_MS = 180;

/** Viewports below this width use mobile bottom navigation. */
export const DESKTOP_NAV_MIN_WIDTH = 768;

/** Viewports below this width always use compact top navigation (tablet range). */
export const DESKTOP_HERO_NAV_MIN_WIDTH = 1024;
