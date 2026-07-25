import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

export default function AnalystDashboardBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: analystTheme.canvas }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Atmosphere: charcoal / navy base + purple accent glows (not monochrome purple) */}
      <div className="absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-tc-purple/[0.09] blur-[120px]" />
      <div className="absolute right-0 top-32 h-[420px] w-[420px] rounded-full bg-blue-600/[0.07] blur-[130px]" />
      <div className="absolute bottom-16 left-1/3 h-[340px] w-[340px] rounded-full bg-cyan-500/[0.04] blur-[110px]" />
      <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-[#F5D76E]/[0.03] blur-[100px]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,4,12,0.7)_100%)]" />
    </div>
  );
}
