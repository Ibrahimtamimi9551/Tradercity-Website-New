export type AnalystDashboardStat = {
  id: string;
  label: string;
  value: string;
  hint: string;
  href: string;
  linkText: string;
  accent: "purple" | "amber" | "rose" | "gold" | "green" | "teal" | "blue";
  priority: "informational" | "critical" | "important";
  trend?: { value: number; label: string; direction: "up" | "down" };
};

export type AnalystQueueItem = {
  id: string;
  label: string;
  count: number;
  countLabel: string;
  oldestWaiting: string;
  href: string;
  linkText: string;
  iconTone: "warning" | "danger" | "purple" | "blue";
};

export type AnalystActivityItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  tone: "success" | "purple" | "warning" | "danger";
};

export type AnalystDashboardData = {
  stats: AnalystDashboardStat[];
  queue: AnalystQueueItem[];
  queueTotal: number;
  activity: AnalystActivityItem[];
};
