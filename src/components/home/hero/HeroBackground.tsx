import { MARKETING_HERO_SURFACE_BG } from "../shared/marketing-surfaces";

/**
 * Hero atmospheric surface — gradient stack + subtle static orbs.
 * No grid, noise, grain, or animation (static by design).
 */
export default function HeroBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: MARKETING_HERO_SURFACE_BG }}
      aria-hidden
    >
      {/* Orb 1 — primary blue ~8% */}
      <div className="pointer-events-none absolute left-1/4 top-[-80px] h-[280px] w-[280px] rounded-full bg-[rgba(59,130,246,0.08)] blur-[100px] sm:h-[380px] sm:w-[380px] sm:blur-[120px] md:h-[480px] md:w-[480px] md:blur-[140px]" />

      {/* Orb 2 — purple #A855F7 at 8% */}
      <div className="pointer-events-none absolute bottom-[-60px] right-1/4 h-[240px] w-[240px] rounded-full bg-[rgba(168,85,247,0.08)] blur-[90px] sm:h-[340px] sm:w-[340px] sm:blur-[110px] md:h-[420px] md:w-[420px] md:blur-[130px]" />

      {/* Orb 3 — blue #3B82F6 at 5% */}
      <div className="pointer-events-none absolute left-[-80px] top-1/2 h-[180px] w-[180px] -translate-y-1/2 rounded-full bg-[rgba(59,130,246,0.05)] blur-[80px] sm:h-[230px] sm:w-[230px] sm:blur-[90px] md:h-[280px] md:w-[280px] md:blur-[100px]" />
    </div>
  );
}
