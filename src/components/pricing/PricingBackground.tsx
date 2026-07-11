import React from 'react';

export default function PricingBackground() {
  return (
    <div className="absolute inset-0 bg-[#03040C] pointer-events-none overflow-hidden z-0">
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
    </div>
  );
}
