export type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "vip";

export type SystemHealthState =
  | "healthy"
  | "needs_attention"
  | "action_required";

export type PaginationState = {
  page: number;
  pageSize: number;
  total: number;
};
