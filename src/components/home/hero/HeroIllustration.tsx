import React from "react";
import { IconUsers } from "@tabler/icons-react";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

type CardIconType =
  | "price-action"
  | "orderflow"
  | "macro"
  | "on-chain"
  | "derivatives";

type EcosystemCardData = {
  id: string;
  title: string;
  description: string;
  color: string;
  connectorColor: string;
  icon: CardIconType;
  /** SVG junction x-coordinate in 1000-unit viewBox */
  junctionX: number;
};

const ECOSYSTEM_CARDS: EcosystemCardData[] = [
  {
    id: "price-action",
    title: "Price Action",
    description: "Structure, trends, patterns & high probability setups.",
    color: "#3B9EFF",
    connectorColor: "#3B9EFF",
    icon: "price-action",
    junctionX: 100,
  },
  {
    id: "orderflow",
    title: "Orderflow",
    description: "Execution, real-time buying/selling pressure & market intent.",
    color: "#9B5DE5",
    connectorColor: "#9B5DE5",
    icon: "orderflow",
    junctionX: 300,
  },
  {
    id: "macro",
    title: "Macro",
    description: "Liquidity, global rates & economic conditions.",
    color: "#FF9500",
    connectorColor: "#FF9500",
    icon: "macro",
    junctionX: 500,
  },
  {
    id: "on-chain",
    title: "On-chain",
    description: "Capital flows, where capital moves, accumulates & distributes.",
    color: "#34C759",
    connectorColor: "#34C759",
    icon: "on-chain",
    junctionX: 700,
  },
  {
    id: "derivatives",
    title: "Derivatives",
    description: "Positioning, OI, funding, liquidations & market exposure.",
    color: "#FF453A",
    connectorColor: "#FF453A",
    icon: "derivatives",
    junctionX: 900,
  },
];

const HUB_JUNCTION_X = 500;
const HUB_JUNCTION_Y = 120;

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function CardIcon({ type, color }: { type: CardIconType; color: string }) {
  const common = "h-5 w-5 lg:h-[22px] lg:w-[22px]";

  switch (type) {
    case "price-action":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <rect x="4" y="10" width="3" height="8" rx="0.5" fill={color} />
          <rect x="9" y="6" width="3" height="12" rx="0.5" fill={color} />
          <rect x="14" y="8" width="3" height="10" rx="0.5" fill={color} />
          <rect x="19" y="4" width="3" height="14" rx="0.5" fill={color} opacity="0.7" />
        </svg>
      );
    case "orderflow":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <rect x="3" y="5" width="18" height="2.5" rx="1" fill={color} opacity="0.45" />
          <rect x="3" y="9" width="14" height="2.5" rx="1" fill={color} opacity="0.65" />
          <rect x="3" y="13" width="16" height="2.5" rx="1" fill={color} opacity="0.8" />
          <rect x="3" y="17" width="10" height="2.5" rx="1" fill={color} />
        </svg>
      );
    case "macro":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
          <path d="M12 3v18M4.5 8.5h15M4.5 15.5h15" stroke={color} strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "on-chain":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            d="M6 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm12 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          <path d="M8.5 8.5l7 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "derivatives":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <text
            x="12"
            y="17"
            textAnchor="middle"
            fill={color}
            fontSize="16"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            %
          </text>
        </svg>
      );
  }
}

function CommunityCard() {
  const features = [
    { label: "Share Ideas", color: "#9B5DE5" },
    { label: "Learn Together", color: "#0A84FF" },
    { label: "Trade Smarter", color: "#3B9EFF" },
    { label: "Grow Together", color: "#06D6F7" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 bg-[#03040C]/90 lg:h-[72px] lg:w-[72px]"
        style={{
          borderColor: "rgba(6, 214, 247, 0.55)",
          boxShadow:
            "0 0 20px rgba(6,214,247,0.25), 0 0 40px rgba(6,214,247,0.08), inset 0 0 16px rgba(6,214,247,0.06)",
        }}
      >
        <IconUsers className="h-7 w-7 text-[#06D6F7] lg:h-8 lg:w-8" stroke={1.5} aria-hidden="true" />
      </div>

      <p className="mt-2.5 text-[8px] font-bold uppercase tracking-[0.22em] text-white lg:mt-3 lg:text-[9px] xl:tracking-[0.28em]">
        UNIFIED COMMUNITY
      </p>

      <div className="mt-2.5 hidden items-center divide-x divide-white/10 lg:flex">
        {features.map((feature) => (
          <span
            key={feature.label}
            className="px-2 text-[7px] font-medium text-white/75 first:pl-0 last:pr-0 xl:text-[8px]"
          >
            <span style={{ color: feature.color }} className="mr-1">
              ●
            </span>
            {feature.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

function ConnectionNode({ color }: { color: string }) {
  return (
    <div
      className="absolute -bottom-[4px] left-1/2 z-20 h-2 w-2 -translate-x-1/2 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}, 0 0 12px ${color}60`,
      }}
    />
  );
}

function EcosystemCard({
  title,
  description,
  color,
  icon,
  className = "",
}: EcosystemCardData & { className?: string }) {
  return (
    <div
      className={`group relative flex min-h-[130px] w-full flex-col items-center rounded-xl border px-2 pb-4 pt-2.5 transition-colors duration-300 hover:border-opacity-70 lg:min-h-[142px] lg:rounded-2xl lg:px-2.5 lg:pb-4 lg:pt-3 ${className}`}
      style={{
        borderColor: `${color}45`,
        backgroundColor: "rgba(5, 8, 26, 0.8)",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 16px rgba(0,0,0,0.3)`,
      }}
    >
      <div
        className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-105 lg:mb-2.5 lg:h-11 lg:w-11"
        style={{
          borderColor: `${color}65`,
          boxShadow: `0 0 10px ${color}20, inset 0 0 10px ${color}08`,
        }}
      >
        <CardIcon type={icon} color={color} />
      </div>

      <h3
        className="text-center text-[8px] font-bold uppercase tracking-[0.1em] lg:text-[9px] xl:text-[10px]"
        style={{ color }}
      >
        {title}
      </h3>

      <p className="mt-1 text-center text-[7px] leading-[1.4] text-white/60 lg:mt-1.5 lg:text-[8px] xl:text-[9px]">
        {description}
      </p>

      <ConnectionNode color={color} />
    </div>
  );
}

function HeroLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M40 0L74.641 20V60L40 80L5.35898 60V20L40 0Z" fill="url(#hero-hex-grad)" />
      <path d="M40 15L60.641 27V51L40 63L19.359 51V27L40 15Z" fill="#02030A" />
      <defs>
        <linearGradient
          id="hero-hex-grad"
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
  );
}

/**
 * Hub branding with hexagon pinned to the exact center axis (50%),
 * matching the SVG junction at x=500 in the 1000-unit viewBox.
 */
function CenterBranding() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex items-center justify-center">
        <span className="absolute right-full mr-2.5 whitespace-nowrap text-base font-black tracking-[0.18em] text-white lg:mr-4 lg:text-xl xl:mr-5 xl:text-2xl">
          TRADER
        </span>

        <div
          className="relative z-10 shrink-0"
          style={{ filter: "drop-shadow(0 0 18px rgba(10, 132, 255, 0.5))" }}
        >
          <HeroLogo className="h-12 w-[42px] lg:h-16 lg:w-[56px] xl:h-[72px] xl:w-[62px]" />
        </div>

        <span className="absolute left-full ml-2.5 whitespace-nowrap text-base font-black tracking-[0.18em] text-white lg:ml-4 lg:text-xl xl:ml-5 xl:text-2xl">
          CITY
        </span>
      </div>

      <p className="mt-1.5 text-[8px] font-bold tracking-[0.28em] text-[#5AC8FA] lg:mt-2 lg:text-[9px] xl:text-[10px]">
        THE CENTRAL ECOSYSTEM
      </p>
    </div>
  );
}

function CommunityConnector() {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <div
        className="h-8 w-[2px] lg:h-10"
        style={{
          background: "linear-gradient(to bottom, rgba(6,214,247,0.9), rgba(6,214,247,0.15))",
          boxShadow: "0 0 6px rgba(6, 214, 247, 0.5)",
        }}
      />
      <div
        className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#06D6F7]"
        style={{ boxShadow: "0 0 8px #06D6F7, 0 0 16px rgba(6,214,247,0.6)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layouts                                                            */
/* ------------------------------------------------------------------ */

function bezierPath(x: number): string {
  if (x === HUB_JUNCTION_X) {
    return `M ${x} 0 L ${HUB_JUNCTION_X} ${HUB_JUNCTION_Y}`;
  }
  return `M ${x} 0 C ${x} 80, ${HUB_JUNCTION_X} 30, ${HUB_JUNCTION_X} ${HUB_JUNCTION_Y}`;
}

function CurvedConnectors({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none relative z-10 -mt-1 w-full ${className}`}
      aria-hidden="true"
    >
      <svg
        className="h-16 w-full lg:h-20 xl:h-24"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        <g fill="none" strokeWidth="2" opacity="0.65" vectorEffect="non-scaling-stroke">
          {ECOSYSTEM_CARDS.map((card) => (
            <path
              key={card.id}
              d={bezierPath(card.junctionX)}
              stroke={card.connectorColor}
              strokeLinecap="round"
            />
          ))}
        </g>
        {/* Junction dot — aligns with hexagon top vertex */}
        <circle
          cx={HUB_JUNCTION_X}
          cy={HUB_JUNCTION_Y}
          r="3"
          fill="#0A84FF"
          opacity="0.7"
          style={{ filter: "drop-shadow(0 0 4px #0A84FF)" }}
        />
      </svg>
    </div>
  );
}

function DesktopLayout() {
  return (
    <div className="relative mx-auto flex w-full flex-col items-center">
      {/* Top cards — equal columns so centers align with SVG x positions */}
      <div className="relative z-20 grid w-full grid-cols-5 gap-1 lg:gap-1.5 xl:gap-2">
        {ECOSYSTEM_CARDS.map((card) => (
          <EcosystemCard key={card.id} {...card} />
        ))}
      </div>

      {/* Curved SVG — flows directly from card nodes into center junction */}
      <CurvedConnectors />

      {/* Hub — hexagon sits on the same vertical axis as junction (50%) */}
      <div className="relative z-20 -mt-1 flex w-full flex-col items-center lg:-mt-0.5">
        <CenterBranding />
        <CommunityConnector />
        <CommunityCard />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function HeroIllustration() {
  return (
    <div
      className="relative w-full"
      role="img"
      aria-label="TraderCity ecosystem illustration showing Price Action, Orderflow, Macro, On-chain, and Derivatives connecting to the central TraderCity hub and unified community"
    >
      <div className="mx-auto w-[80%] origin-top scale-[1.25] translate-y-6 xl:translate-y-8">
        <DesktopLayout />
      </div>
    </div>
  );
}
