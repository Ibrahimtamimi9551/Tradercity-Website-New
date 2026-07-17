export default function VipDashboardBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#03040C]">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Atmospheric glows — purple / blue / gold */}
      <div className="absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-tc-purple/[0.09] blur-[120px]" />
      <div className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-blue-600/[0.08] blur-[130px]" />
      <div className="absolute bottom-20 left-1/3 h-[360px] w-[360px] rounded-full bg-[#F5D76E]/[0.04] blur-[110px]" />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,4,12,0.65)_100%)]" />
    </div>
  );
}
