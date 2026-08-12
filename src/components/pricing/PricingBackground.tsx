import { MARKETING_SURFACE_BG } from "@/components/home/shared/marketing-surfaces";

export default function PricingBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ background: MARKETING_SURFACE_BG }}
      aria-hidden
    />
  );
}
