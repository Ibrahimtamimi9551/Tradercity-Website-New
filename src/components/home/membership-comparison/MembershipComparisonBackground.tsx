import { MARKETING_SURFACE_BG } from "../shared/marketing-surfaces";

export default function MembershipComparisonBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: MARKETING_SURFACE_BG }}
      aria-hidden
    />
  );
}
