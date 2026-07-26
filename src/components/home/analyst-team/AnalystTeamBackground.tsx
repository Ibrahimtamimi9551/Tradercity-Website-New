import React from "react";

export default function AnalystTeamBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#03040C]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div
        className="absolute left-1/2 top-[28%] h-[42%] w-[70%] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.045] blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#03040C] to-transparent"
        aria-hidden
      />
    </div>
  );
}
