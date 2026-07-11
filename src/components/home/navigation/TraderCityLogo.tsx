"use client";

import { useId } from "react";

type TraderCityLogoProps = {
  className?: string;
  showGlow?: boolean;
};

export default function TraderCityLogo({
  className = "h-7 w-7",
  showGlow = false,
}: TraderCityLogoProps) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <span className={["relative inline-flex shrink-0", showGlow ? "drop-shadow-[0_0_12px_rgba(155,93,229,0.45)]" : ""].join(" ")}>
      <svg
        viewBox="0 0 80 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path d="M40 0L74.641 20V60L40 80L5.35898 60V20L40 0Z" fill={`url(#${gradientId})`} />
        <path d="M40 15L60.641 27V51L40 63L19.359 51V27L40 15Z" fill="#02030A" />
        <defs>
          <linearGradient
            id={gradientId}
            x1="5"
            y1="0"
            x2="75"
            y2="80"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06D6F7" />
            <stop offset="0.5" stopColor="#0A84FF" />
            <stop offset="1" stopColor="#9B5DE5" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
