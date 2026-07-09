import React from 'react';

const blocks = [
  {
    id: 1,
    y: 120,
    color: '#C86EFF',
    title1: 'MARKET STRUCTURE',
    title2: '& PRICE ACTION',
    // bullets: ['Trend & Structure Analysis'/* , 'Key Levels & Zones', 'Market Context' */],
    arrX: 592.5, arrY: 351.8,
    cp1X: 480, cp1Y: 120,
    cp2X: 546.5, cp2Y: 313.2,
    icon: (
      <g transform="translate(58, 108) scale(1.1)">
        <path d="M3 17l6-6 4 4 8-8" stroke="#C86EFF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 7h7v7" stroke="#C86EFF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    )
  },
  {
    id: 2,
    y: 260,
    color: '#5D9BFF',
    title1: 'ORDERFLOW',
    title2: '& MICROSTRUCTURE',
    // bullets: ['Orderbook & Footprint Read', 'Liquidity & Imbalance'/* , 'Market Efficiency' */],
    arrX: 579.5, arrY: 374.3,
    cp1X: 480, cp1Y: 260,
    cp2X: 523.1, cp2Y: 353.8,
    icon: (
      <g transform="translate(58, 248) scale(1.1)">
        <path d="M9 4v16M15 4v16M6 8h6v6H6zM12 10h6v8h-6z" stroke="#5D9BFF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    )
  },
  {
    id: 3,
    y: 400,
    color: '#F8C547',
    title1: 'ONCHAIN',
    title2: '& WALLET FLOWS',
    // bullets: ['Wallet Tracking', 'Exchange Flows'/* , 'Onchain Signals' */],
    arrX: 575, arrY: 400,
    cp1X: 480, cp1Y: 400,
    cp2X: 515, cp2Y: 400,
    icon: (
      <g transform="translate(58, 388) scale(1.1)">
        <path d="M10 14a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-.5.5" stroke="#F8C547" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 10a3.5 3.5 0 0 0-5 0l-4 4a3.5 3.5 0 0 0 5 5l.5-.5" stroke="#F8C547" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    )
  },
  {
    id: 4,
    y: 540,
    color: '#31E8FF',
    title1: 'SCALPING',
    title2: '& INTRADAY TRADES',
    // bullets: [/* 'High Probability Setups', */ 'Real-time Execution'/* , 'Risk Management' */],
    arrX: 579.5, arrY: 425.6,
    cp1X: 480, cp1Y: 540,
    cp2X: 523.1, cp2Y: 446.1,
    icon: (
      <g transform="translate(58, 528) scale(1.1)">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#31E8FF" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    )
  },
  {
    id: 5,
    y: 680,
    color: '#FF9B3F',
    title1: 'FUNDAMENTAL',
    title2: '& MACRO NARRATIVE',
    // bullets: ['Macro & Economic Outlook', 'Narrative & Sentiment'/* , 'News & Catalysts' */],
    arrX: 592.5, arrY: 448.2,
    cp1X: 480, cp1Y: 680,
    cp2X: 546.5, cp2Y: 486.8,
    icon: (
      <g transform="translate(58, 668) scale(1.1)">
        <circle cx="12" cy="12" r="10" stroke="#FF9B3F" strokeWidth="1.5" fill="none"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#FF9B3F" strokeWidth="1.5" fill="none"/>
        <path d="M2 12h20" stroke="#FF9B3F" strokeWidth="1.5" fill="none"/>
      </g>
    )
  }
];

export default function TraderSolutionIllustration() {
  return (
    <div className="w-full flex items-center justify-center">
      <svg
        // viewBox="0 0 1300 800"
        // className="w-full h-auto max-w-[1300px]"
        // className="w-[145%] h-auto max-w-none"
        
            viewBox="0 0 1300 800"
            className="w-[1800px] h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fontFamily: 'inherit' }}
      >
        <defs>
          {/* Dual-layered gaussian blur for a premium optical glow */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Multicolor blended output line representing synthesis */}
          <linearGradient id="synthGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C86EFF" />
            <stop offset="25%" stopColor="#5D9BFF" />
            <stop offset="50%" stopColor="#31E8FF" />
            <stop offset="75%" stopColor="#F8C547" />
            <stop offset="100%" stopColor="#FF9B3F" />
          </linearGradient>

          {/* Center Hub internal deep shadow/glow */}
          <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
            <stop offset="50%" stopColor="#03040C" />
            <stop offset="100%" stopColor="#1A1A2E" />
          </radialGradient>
        </defs>

        {/* ==================== LEFT SPECIALIST BLOCKS ==================== */}
        {blocks.map((b) => (
          <g key={`block-${b.id}`}>
            
            {/* --- ICON --- */}
            <circle cx="70" cy={b.y} r="28" fill="none" stroke={b.color} strokeWidth="1.2" opacity="0.6" filter="url(#neonGlow)" />
            <circle cx="70" cy={b.y} r="28" fill="none" stroke={b.color} strokeWidth="1.2" />
            {b.icon}

            {/* --- TEXT CONTENT --- */}
            <text x="120" y={b.y - 10} fill="white" fontSize="13" fontWeight="700" letterSpacing="1.2">{b.title1}</text>
            <text x="120" y={b.y + 6} fill="white" fontSize="13" fontWeight="700" letterSpacing="1.2">{b.title2}</text>
            
            {/* {b.bullets.map((bullet, i) => (
              <text key={i} x="120" y={b.y + 19 + (i * 18)} fill="#94A3B8" fontSize="11" letterSpacing="0.3">
                <tspan fill="white">â€¢ </tspan>
                <tspan>{bullet}</tspan>
              </text>
            ))} */}

            {/* --- CONNECTION DOT (LEFT) --- */}
            <circle cx="400" cy={b.y} r="3.5" fill={b.color} filter="url(#neonGlow)" />
            <circle cx="400" cy={b.y} r="3.5" fill={b.color} />

            {/* --- CONVERGENCE SPLINE CURVE --- */}
            <path
              d={`M 400 ${b.y} C ${b.cp1X} ${b.cp1Y}, ${b.cp2X} ${b.cp2Y}, ${b.arrX} ${b.arrY}`}
              fill="none"
              stroke={b.color}
              strokeWidth="4"
              opacity="0.15"
              strokeLinecap="round"
              filter="url(#neonGlow)"
            />
            <path
              d={`M 400 ${b.y} C ${b.cp1X} ${b.cp1Y}, ${b.cp2X} ${b.cp2Y}, ${b.arrX} ${b.arrY}`}
              fill="none"
              stroke={b.color}
              strokeWidth="1.5"
              opacity="0.9"
              strokeLinecap="round"
            />

            {/* --- ARRIVAL DOT (CENTER HUB BORDER) --- */}
            <circle cx={b.arrX} cy={b.arrY} r="3" fill={b.color} filter="url(#neonGlow)" />
            <circle cx={b.arrX} cy={b.arrY} r="2.5" fill="white" />
          </g>
        ))}

        {/* ==================== CENTER HUB ==================== */}
        
        {/* Outer Atmospheric Rings */}
        <circle cx="650" cy="400" r="160" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 12" opacity="0.1" />
        <circle cx="650" cy="400" r="120" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.15" />
        <circle cx="650" cy="400" r="95" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />

        {/* Main Hub Body */}
        <circle cx="650" cy="400" r="75" fill="url(#hubGrad)" stroke="#E2E8F0" strokeWidth="1" filter="url(#neonGlow)" opacity="0.8" />
        <circle cx="650" cy="400" r="75" fill="none" stroke="white" strokeWidth="1" />

        {/* Hub Typography */}
        <text x="650" y="405" fill="white" fontSize="46" fontWeight="700" textAnchor="middle" letterSpacing="1">TC</text>
        <text x="650" y="430" fill="#94A3B8" fontSize="10" fontWeight="600" textAnchor="middle" letterSpacing="4">TRADERCITY</text>

        {/* ==================== RIGHT OUTPUT ==================== */}
        
        {/* Synthesis Output Line */}
        <line x1="735" y1="400" x2="950" y2="400" stroke="url(#synthGrad)" strokeWidth="8" opacity="0.08" filter="url(#neonGlow)" strokeLinecap="round" />
        <line x1="950" y1="400" x2="950" y2="400" stroke="url(#synthGrad)" strokeWidth="2.5" opacity="1" strokeLinecap="round" />

        {/* Better Decisions Node */}
        <circle cx="950" cy="400" r="10" stroke="#FF9B3F" strokeWidth="2.5" fill="#03040C" filter="url(#neonGlow)" />
        <circle cx="950" cy="400" r="10" stroke="#FF9B3F" strokeWidth="2.5" fill="#03040C" />
        <circle cx="950" cy="400" r="4.5" fill="white" />

        {/* Output Label */}
        <text x="980" y="405" fill="white" fontSize="15" fontWeight="600" letterSpacing="6">BETTER DECISIONS</text>

      </svg>
    </div>
  );
}
