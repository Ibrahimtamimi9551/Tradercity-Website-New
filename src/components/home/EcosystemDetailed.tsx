import React from 'react';
import {
  IconChartCandle,
  IconWorld,
  IconChartLine,
  IconRobot,
  IconFileSearch,
  IconMessageCircle,
  IconSchool,
  IconTrendingUp,
  IconUsers,
  IconShield,
  IconClock,
  IconSun,
  IconActivity,
  IconArrowDown
} from '@tabler/icons-react';

const AnalystCard = ({
  title,
  icon,
  features,
  color,
  glowColor,
  delay
}: {
  title: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
  glowColor: string;
  delay: string;
}) => (
  <div className="relative flex flex-col items-center flex-1 z-10 w-full">
    <div
      className="w-full h-full rounded-[40px] border bg-[#05081A] p-6 lg:p-8 flex flex-col items-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        borderColor: color,
        boxShadow: `0 0 25px ${glowColor}15`,
        animationDelay: delay
      }}
    >
      <div 
        className="mb-6 p-4 rounded-full border bg-[#05081A]"
        style={{ borderColor: color, color: color, boxShadow: `0 0 20px ${glowColor}25` }}
      >
        {icon}
      </div>
      <h3 className="text-white font-extrabold text-center text-[13px] tracking-[0.15em] uppercase mb-6 h-12 flex items-center justify-center leading-relaxed">
        {title}
      </h3>
      <ul className="w-full space-y-4">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-[11px] lg:text-xs text-gray-300">
            <span 
              className="mr-3 mt-1.5 h-1 w-1 rounded-full flex-shrink-0" 
              style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
            />
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function Ecosystem() {
  const analysts = [
    {
      title: "Microstructure\n& Orderflow",
      icon: <IconChartCandle size={32} stroke={1.5} />,
      features: [
        "Institutional order flow insights",
        "Liquidity & market depth analysis",
        "Real-time execution perspectives"
      ],
      color: "#9B5DE5", // Purple
      glowColor: "#9B5DE5",
      delay: "0ms"
    },
    {
      title: "Macro Traders",
      icon: <IconWorld size={32} stroke={1.5} />,
      features: [
        "Global macro landscape",
        "Central bank & policy impact",
        "Cross-asset correlations & opportunities"
      ],
      color: "#5E5CE6", // Indigo
      glowColor: "#5E5CE6",
      delay: "100ms"
    },
    {
      title: "Price Action\nTraders",
      icon: <IconChartLine size={32} stroke={1.5} />,
      features: [
        "Structure & trend analysis",
        "Support, resistance & key levels",
        "Market timing & setups"
      ],
      color: "#0A84FF", // Blue
      glowColor: "#0A84FF",
      delay: "200ms"
    },
    {
      title: "Quant Traders",
      icon: <IconRobot size={32} stroke={1.5} />,
      features: [
        "Data-driven strategies",
        "Systematic models & backtesting",
        "Probabilistic edges & automation"
      ],
      color: "#06D6F7", // Cyan
      glowColor: "#06D6F7",
      delay: "300ms"
    },
    {
      title: "Research Analysts",
      icon: <IconFileSearch size={32} stroke={1.5} />,
      features: [
        "Deep market research",
        "Thematic & sector analysis",
        "Reports & actionable insights"
      ],
      color: "#30D158", // Teal/Green
      glowColor: "#30D158",
      delay: "400ms"
    }
  ];

  return (
    <section className="bg-[#05081A] min-h-screen py-24 px-4 overflow-hidden relative font-sans">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#9B5DE5] via-[#5E5CE6] to-[#06D6F7] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 relative w-full flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#9B5DE5]" />
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#9B5DE5] shadow-[0_0_8px_#9B5DE5]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#06D6F7] shadow-[0_0_8px_#06D6F7]" />
            </div>
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#06D6F7]" />
          </div>
          <h2 className="text-4xl md:text-[44px] font-black mb-4 tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#9B5DE5] via-[#5E5CE6] to-[#06D6F7] leading-tight">
            DIFFERENT ANALYSTS.
          </h2>
          <p className="text-white/80 tracking-[0.25em] text-sm md:text-base font-medium">
            OWN MARKET READ. UNIQUE PERSPECTIVE.
          </p>
        </div>

        {/* Analyst Cards */}
        <div className="flex flex-col lg:flex-row justify-between w-full gap-4 lg:gap-6 mb-0 relative z-20">
          {analysts.map((analyst, index) => (
            <AnalystCard key={index} {...analyst} />
          ))}
        </div>

        {/* Connecting Paths to Center Node */}
        <div className="relative w-full h-24 hidden lg:block -mt-2 pointer-events-none z-10">
          <svg className="w-full h-full" style={{ overflow: 'visible' }}>
            <g fill="none" strokeWidth="1.5" opacity="0.8">
              {/* Card 1 to Relay */}
              <path d="M 10% 0 L 10% 40 Q 10% 60 15% 60 L 25% 60" stroke="#9B5DE5" />
              <circle cx="10%" cy="0" r="3.5" fill="#05081A" stroke="#9B5DE5" strokeWidth="2" />
              <circle cx="25%" cy="60" r="3.5" fill="#05081A" stroke="#9B5DE5" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #9B5DE5)' }} />

              {/* Card 2 to Relay */}
              <path d="M 30% 0 L 30% 40 Q 30% 60 35% 60 L 45% 60" stroke="#5E5CE6" />
              <circle cx="30%" cy="0" r="3.5" fill="#05081A" stroke="#5E5CE6" strokeWidth="2" />
              <circle cx="45%" cy="60" r="3.5" fill="#05081A" stroke="#5E5CE6" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #5E5CE6)' }} />

              {/* Card 3 to Relay */}
              <path d="M 50% 0 L 50% 60" stroke="#0A84FF" />
              <circle cx="50%" cy="0" r="3.5" fill="#05081A" stroke="#0A84FF" strokeWidth="2" />
              <circle cx="50%" cy="60" r="3.5" fill="#05081A" stroke="#0A84FF" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #0A84FF)' }} />

              {/* Card 4 to Relay */}
              <path d="M 70% 0 L 70% 40 Q 70% 60 65% 60 L 55% 60" stroke="#06D6F7" />
              <circle cx="70%" cy="0" r="3.5" fill="#05081A" stroke="#06D6F7" strokeWidth="2" />
              <circle cx="55%" cy="60" r="3.5" fill="#05081A" stroke="#06D6F7" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #06D6F7)' }} />

              {/* Card 5 to Relay */}
              <path d="M 90% 0 L 90% 40 Q 90% 60 85% 60 L 75% 60" stroke="#30D158" />
              <circle cx="90%" cy="0" r="3.5" fill="#05081A" stroke="#30D158" strokeWidth="2" />
              <circle cx="75%" cy="60" r="3.5" fill="#05081A" stroke="#30D158" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #30D158)' }} />
            </g>
          </svg>
        </div>

        {/* Central Hexagon Logo Area */}
        <div className="flex flex-col items-center mt-8 lg:-mt-2 z-20">
          <div className="relative mb-6 group cursor-pointer">
            <svg width="80" height="92" viewBox="0 0 80 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_20px_rgba(94,92,230,0.6)] group-hover:drop-shadow-[0_0_30px_rgba(94,92,230,0.9)] transition-all duration-500">
              <path d="M40 0L74.641 20V60L40 80L5.35898 60V20L40 0Z" fill="url(#hex-grad)" />
              <path d="M40 15L60.641 27V51L40 63L19.359 51V27L40 15Z" fill="#05081A" />
              <defs>
                <linearGradient id="hex-grad" x1="5" y1="0" x2="75" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9B5DE5" />
                  <stop offset="0.5" stopColor="#5E5CE6" />
                  <stop offset="1" stopColor="#06D6F7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-[0.2em] mb-2">
            TRADERCITY
          </h1>
          <p className="text-[#06D6F7] text-xs font-bold tracking-[0.3em]">
            THE CENTRAL ECOSYSTEM
          </p>
        </div>

        {/* Down Arrow */}
        <div className="mt-6 flex flex-col items-center">
          <div className="w-[1px] h-12 bg-[#06D6F7] opacity-60 relative">
             <IconArrowDown size={14} color="#06D6F7" className="absolute -bottom-3 -left-[6.5px] opacity-80" />
          </div>
        </div>

        {/* Unified Community */}
        <div className="mt-12 flex flex-col items-center w-full max-w-4xl z-20">
          <div className="w-16 h-16 rounded-full border border-[#06D6F7] bg-[#05081A] shadow-[0_0_20px_rgba(6,214,247,0.3)] flex items-center justify-center mb-6">
            <IconUsers size={32} className="text-[#06D6F7]" stroke={1.5} />
          </div>
          <h3 className="text-white text-xl font-bold tracking-[0.25em] mb-8">
            UNIFIED COMMUNITY
          </h3>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-xs font-bold text-gray-300">
            <div className="flex items-center gap-3 text-[#06D6F7]">
              <IconMessageCircle size={18} stroke={2} />
              <span className="tracking-widest uppercase">Share Ideas</span>
            </div>
            <div className="flex items-center gap-3 text-[#30D158]">
              <IconSchool size={18} stroke={2} />
              <span className="tracking-widest uppercase">Learn Together</span>
            </div>
            <div className="flex items-center gap-3 text-[#0A84FF]">
              <IconTrendingUp size={18} stroke={2} />
              <span className="tracking-widest uppercase">Trade Smarter</span>
            </div>
            <div className="flex items-center gap-3 text-[#9B5DE5]">
              <IconUsers size={18} stroke={2} />
              <span className="tracking-widest uppercase">Grow Together</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 w-full max-w-[1100px] rounded-[24px] border border-[#1E254A] bg-[#080B1E] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 shadow-2xl">
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-[14px] bg-[#0F1433] border border-[#1E254A] text-[#9B5DE5]">
              <IconShield size={24} stroke={1.5} />
            </div>
            <div className="pt-1">
              <h4 className="text-white text-xs font-bold tracking-widest mb-1.5 uppercase">Diverse Perspectives</h4>
              <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">Multiple ways to see the market</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-[14px] bg-[#0F1433] border border-[#1E254A] text-[#0A84FF]">
              <IconClock size={24} stroke={1.5} />
            </div>
            <div className="pt-1">
              <h4 className="text-white text-xs font-bold tracking-widest mb-1.5 uppercase">Better Decisions</h4>
              <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">Compare, validate, and act</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-[14px] bg-[#0F1433] border border-[#1E254A] text-[#06D6F7]">
              <IconSun size={24} stroke={1.5} />
            </div>
            <div className="pt-1">
              <h4 className="text-white text-xs font-bold tracking-widest mb-1.5 uppercase">Continuous Learning</h4>
              <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">Insights that sharpen you</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-[14px] bg-[#0F1433] border border-[#1E254A] text-[#30D158]">
              <IconActivity size={24} stroke={1.5} />
            </div>
            <div className="pt-1">
              <h4 className="text-white text-xs font-bold tracking-widest mb-1.5 uppercase">Stronger Community</h4>
              <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">Together we all grow</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
