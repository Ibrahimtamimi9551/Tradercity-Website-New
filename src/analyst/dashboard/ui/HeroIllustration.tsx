import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

/** Abstract partnership / growth illustration — SVG, no external assets. */
export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px]">
      {/* Soft rings */}
      <div className="pointer-events-none absolute inset-0 rounded-full border border-white/5" />
      <div className="pointer-events-none absolute inset-4 rounded-full border border-purple-400/15 analyst-float" />
      <div className="pointer-events-none absolute inset-10 rounded-full border border-cyan-400/10 analyst-float-delay" />

      <svg
        viewBox="0 0 240 240"
        className="relative z-10 h-full w-full drop-shadow-[0_20px_40px_rgba(155,93,229,0.25)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="heroOrb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9B5DE5" />
            <stop offset="55%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="heroBar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <filter id="heroGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient orb */}
        <circle
          cx="120"
          cy="108"
          r="46"
          fill="url(#heroOrb)"
          opacity="0.9"
          filter="url(#heroGlow)"
        />
        <circle cx="120" cy="108" r="28" fill="rgba(3,4,12,0.35)" />

        {/* Network nodes — partnership */}
        <circle cx="58" cy="78" r="7" fill="#60A5FA" opacity="0.9" />
        <circle cx="182" cy="70" r="6" fill="#F5D76E" opacity="0.9" />
        <circle cx="190" cy="140" r="7" fill="#34D399" opacity="0.9" />
        <circle cx="52" cy="150" r="6" fill="#A78BFA" opacity="0.9" />

        <line
          x1="72"
          y1="85"
          x2="95"
          y2="100"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />
        <line
          x1="165"
          y1="80"
          x2="145"
          y2="95"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />
        <line
          x1="168"
          y1="130"
          x2="148"
          y2="118"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />
        <line
          x1="70"
          y1="140"
          x2="95"
          y2="120"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />

        {/* Growth bars */}
        <rect x="78" y="168" width="14" height="28" rx="4" fill="url(#heroBar)" opacity="0.7" />
        <rect x="100" y="156" width="14" height="40" rx="4" fill="url(#heroBar)" opacity="0.85" />
        <rect x="122" y="144" width="14" height="52" rx="4" fill="url(#heroBar)" />
        <rect x="144" y="132" width="14" height="64" rx="4" fill="url(#heroBar)" />

        {/* Trend line */}
        <path
          d="M 70 185 C 95 175, 110 155, 130 140 S 170 115, 190 100"
          fill="none"
          stroke={analystTheme.info}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="190" cy="100" r="4" fill={analystTheme.info} />
      </svg>

      <div
        className="pointer-events-none absolute -inset-6 -z-0 rounded-full blur-3xl"
        style={{ background: "rgba(155,93,229,0.18)" }}
      />
    </div>
  );
}
