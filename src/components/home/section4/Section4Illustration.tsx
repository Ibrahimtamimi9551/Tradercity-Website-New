import React from 'react';

const blocks = [
  {
    id: 1,
    y: 120,
    color: '#C86EFF',
    title1: 'MARKET STRUCTURE',
    title2: '& PRICE ACTION',
    bullets: ['Trend & Structure Analysis', 'Key Levels & Zones', 'Market Context'],
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
    bullets: ['Orderbook & Footprint Read', 'Liquidity & Imbalance', 'Market Efficiency'],
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
    bullets: ['Wallet Tracking', 'Exchange Flows', 'Onchain Signals'],
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
    bullets: ['High Probability Setups', 'Real-time Execution', 'Risk Management'],
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
    title1: 'FUNDAMENTAL READS',
    title2: '& MACRO NARRATIVE',
    bullets: ['Macro & Economic Outlook', 'Narrative & Sentiment', 'News & Catalysts'],
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

export default function Section4Illustration() {
  return (
    <div className="w-full flex items-center justify-center">
      <svg
        viewBox="0 0 1300 800"
        className="w-full h-auto max-w-[1300px]"
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
            <text x="120" y={b.y - 18} fill="white" fontSize="13" fontWeight="700" letterSpacing="1.2">{b.title1}</text>
            <text x="120" y={b.y - 2} fill="white" fontSize="13" fontWeight="700" letterSpacing="1.2">{b.title2}</text>
            
            {b.bullets.map((bullet, i) => (
              <text key={i} x="120" y={b.y + 19 + (i * 18)} fill="#94A3B8" fontSize="11" letterSpacing="0.3">
                <tspan fill="white">• </tspan>
                <tspan>{bullet}</tspan>
              </text>
            ))}

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
        <line x1="725" y1="400" x2="950" y2="400" stroke="url(#synthGrad)" strokeWidth="4" opacity="0.3" filter="url(#neonGlow)" strokeLinecap="round" />
        <line x1="725" y1="400" x2="950" y2="400" stroke="url(#synthGrad)" strokeWidth="1.5" opacity="0.9" strokeLinecap="round" />

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





// import React from 'react';

// const nodes = [
//   { lines: ['Market Structure', 'Price Action'], color: '#60A5FA', y: 50 },
//   { lines: ['Orderflow', 'Microstructure'], color: '#A855F7', y: 132 },
//   { lines: ['Onchain', 'Wallet Flows'], color: '#F59E0B', y: 215 },
//   { lines: ['Scalping', 'Intraday'], color: '#06D6F7', y: 298 },
//   { lines: ['Fundamentals'], color: '#F97316', y: 380 },
// ];

// const dotX = 195;
// const hubCx = 500;
// const hubCy = 215;
// const hubR = 60;

// const arrivals = [
//   { x: 446, y: 190 },
//   { x: 441, y: 203 },
//   { x: 440, y: 215 },
//   { x: 441, y: 227 },
//   { x: 446, y: 240 },
// ];

// const curves = [
//   `M ${dotX} 50 C 320 50, 420 100, 446 190`,
//   `M ${dotX} 132 C 320 132, 418 162, 441 203`,
//   `M ${dotX} 215 C 310 215, 385 215, 440 215`,
//   `M ${dotX} 298 C 320 298, 418 268, 441 227`,
//   `M ${dotX} 380 C 320 380, 420 330, 446 240`,
// ];

// export default function Section4Illustration() {
//   return (
//     <div className="w-full select-none">

//       {/* ===== DESKTOP (SVG) ===== */}
//       <div className="hidden md:block">
//         <svg
//           viewBox="0 0 920 430"
//           className="w-full h-auto"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             {/* Hub ring gradient */}
//             <linearGradient id="s4-hub-grad" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#A855F7" stopOpacity="0.65" />
//               <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.45" />
//               <stop offset="100%" stopColor="#06D6F7" stopOpacity="0.35" />
//             </linearGradient>

//             {/* Hexagon gradient fill */}
//             <linearGradient id="s4-hex-grad" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#A855F7" />
//               <stop offset="0.5" stopColor="#60A5FA" />
//               <stop offset="1" stopColor="#06D6F7" />
//             </linearGradient>

//             {/* Output line gradient */}
//             <linearGradient id="s4-out-line" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
//               <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.15" />
//             </linearGradient>

//             {/* Hub atmospheric depth - violet */}
//             <radialGradient id="s4-atm-violet" cx="48%" cy="48%" r="50%">
//               <stop offset="0%" stopColor="#A855F7" stopOpacity="1" />
//               <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
//             </radialGradient>

//             {/* Hub atmospheric depth - gold */}
//             <radialGradient id="s4-atm-gold" cx="55%" cy="55%" r="50%">
//               <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
//               <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
//             </radialGradient>

//             {/* Node dot glow */}
//             <filter id="s4-dot-glow" x="-300%" y="-300%" width="700%" height="700%">
//               <feGaussianBlur stdDeviation="3.5" result="blur" />
//               <feComposite in="SourceGraphic" in2="blur" operator="over" />
//             </filter>

//             {/* Output dot glow */}
//             <filter id="s4-out-glow" x="-300%" y="-300%" width="700%" height="700%">
//               <feGaussianBlur stdDeviation="4" result="blur" />
//               <feComposite in="SourceGraphic" in2="blur" operator="over" />
//             </filter>
//           </defs>

//           {/* ---- HUB ATMOSPHERIC DEPTH ---- */}
//           <circle
//             cx={hubCx - 8}
//             cy={hubCy - 5}
//             r="130"
//             fill="url(#s4-atm-violet)"
//             opacity="0.03"
//           />
//           <circle
//             cx={hubCx + 10}
//             cy={hubCy + 8}
//             r="110"
//             fill="url(#s4-atm-gold)"
//             opacity="0.02"
//           />

//           {/* ---- CONNECTION CURVES ---- */}
//           {nodes.map((node, i) => (
//             <path
//               key={`curve-${i}`}
//               d={curves[i]}
//               stroke={node.color}
//               strokeWidth="1.2"
//               opacity="0.35"
//               strokeLinecap="round"
//             />
//           ))}

//           {/* ---- LEFT NODE DOTS ---- */}
//           {nodes.map((node, i) => (
//             <g key={`dot-${i}`}>
//               <circle
//                 cx={dotX}
//                 cy={node.y}
//                 r="5"
//                 fill={node.color}
//                 filter="url(#s4-dot-glow)"
//                 opacity="0.5"
//               />
//               <circle
//                 cx={dotX}
//                 cy={node.y}
//                 r="4.5"
//                 fill="#03040C"
//                 stroke={node.color}
//                 strokeWidth="1.5"
//               />
//               <circle
//                 cx={dotX}
//                 cy={node.y}
//                 r="1.5"
//                 fill={node.color}
//                 opacity="0.85"
//               />
//             </g>
//           ))}

//           {/* ---- LEFT NODE LABELS ---- */}
//           {nodes.map((node, i) => {
//             const isMultiLine = node.lines.length > 1;
//             const baseY = isMultiLine ? node.y - 7 : node.y + 4;
//             return (
//               <text
//                 key={`label-${i}`}
//                 textAnchor="end"
//                 className="fill-[#8F9BB3]"
//                 style={{ fontSize: '12.5px', fontFamily: 'inherit' }}
//               >
//                 {node.lines.map((line, j) => (
//                   <tspan
//                     key={j}
//                     x={dotX - 22}
//                     y={baseY + j * 17}
//                   >
//                     {line}
//                   </tspan>
//                 ))}
//               </text>
//             );
//           })}

//           {/* ---- ARRIVAL DOTS ON HUB EDGE ---- */}
//           {nodes.map((node, i) => (
//             <circle
//               key={`arrival-${i}`}
//               cx={arrivals[i].x}
//               cy={arrivals[i].y}
//               r="2"
//               fill={node.color}
//               opacity="0.6"
//             />
//           ))}

//           {/* ---- ORBITAL RINGS ---- */}
//           <circle
//             cx={hubCx}
//             cy={hubCy}
//             r={hubR + 18}
//             stroke="url(#s4-hub-grad)"
//             strokeWidth="0.7"
//             strokeDasharray="4 10"
//             opacity="0.2"
//           />
//           <circle
//             cx={hubCx}
//             cy={hubCy}
//             r={hubR + 36}
//             stroke="url(#s4-hub-grad)"
//             strokeWidth="0.5"
//             strokeDasharray="2 14"
//             opacity="0.1"
//           />
//           <circle
//             cx={hubCx}
//             cy={hubCy}
//             r={hubR + 52}
//             stroke="url(#s4-hub-grad)"
//             strokeWidth="0.4"
//             strokeDasharray="1 16"
//             opacity="0.05"
//           />

//           {/* ---- HUB CIRCLE ---- */}
//           <circle
//             cx={hubCx}
//             cy={hubCy}
//             r={hubR}
//             stroke="url(#s4-hub-grad)"
//             strokeWidth="1.5"
//             fill="#03040C"
//           />

//           {/* ---- TRADERCITY HEXAGON MARK ---- */}
//           <path
//             d="M 500 183 L 527.7 199 L 527.7 231 L 500 247 L 472.3 231 L 472.3 199 Z"
//             fill="url(#s4-hex-grad)"
//           />
//           <path
//             d="M 500 195 L 515.6 204 L 515.6 222 L 500 231 L 484.4 222 L 484.4 204 Z"
//             fill="#03040C"
//           />

//           {/* ---- OUTPUT LINE ---- */}
//           <line
//             x1={hubCx + hubR + 2}
//             y1={hubCy}
//             x2={735}
//             y2={hubCy}
//             stroke="url(#s4-out-line)"
//             strokeWidth="1"
//           />

//           {/* ---- OUTPUT DOT ---- */}
//           <circle
//             cx={740}
//             cy={hubCy}
//             r="5"
//             fill="#F59E0B"
//             filter="url(#s4-out-glow)"
//             opacity="0.4"
//           />
//           <circle
//             cx={740}
//             cy={hubCy}
//             r="4.5"
//             fill="#03040C"
//             stroke="#F59E0B"
//             strokeWidth="1.2"
//           />
//           <circle
//             cx={740}
//             cy={hubCy}
//             r="1.5"
//             fill="#F59E0B"
//             opacity="0.85"
//           />

//           {/* ---- OUTPUT LABEL ---- */}
//           <text
//             x={758}
//             y={hubCy + 4}
//             textAnchor="start"
//             className="fill-white/80"
//             style={{
//               fontSize: '12px',
//               fontFamily: 'inherit',
//               fontWeight: 500,
//               letterSpacing: '0.22em',
//             }}
//           >
//             BETTER DECISIONS
//           </text>
//         </svg>
//       </div>

//       {/* ===== MOBILE ===== */}
//       <div className="md:hidden flex flex-col items-center gap-5 py-8">
//         {/* Input nodes */}
//         <div className="flex flex-col gap-5 w-full max-w-xs">
//           {nodes.map((node, i) => (
//             <div key={i} className="flex items-center gap-4">
//               <div
//                 className="w-3 h-3 rounded-full shrink-0 border"
//                 style={{
//                   borderColor: node.color,
//                   boxShadow: `0 0 5px ${node.color}30`,
//                 }}
//               >
//                 <div
//                   className="w-1.5 h-1.5 rounded-full mx-auto mt-[2.5px]"
//                   style={{ backgroundColor: node.color, opacity: 0.85 }}
//                 />
//               </div>
//               <span className="text-[#8F9BB3] text-[13px] leading-snug">
//                 {node.lines.join(' · ')}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Connecting line down */}
//         <div className="w-px h-8 bg-gradient-to-b from-[#A855F7]/20 to-[#60A5FA]/20" />

//         {/* Hub */}
//         <div className="flex flex-col items-center">
//           <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
//             <defs>
//               <linearGradient id="s4m-ring" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#A855F7" stopOpacity="0.6" />
//                 <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.35" />
//               </linearGradient>
//               <linearGradient id="s4m-hex" x1="0" y1="0" x2="1" y2="1">
//                 <stop offset="0%" stopColor="#A855F7" />
//                 <stop offset="0.5" stopColor="#60A5FA" />
//                 <stop offset="1" stopColor="#06D6F7" />
//               </linearGradient>
//             </defs>
//             <circle cx="45" cy="45" r="34" stroke="url(#s4m-ring)" strokeWidth="1.2" fill="#03040C" />
//             <path d="M 45 22 L 64.9 33.5 L 64.9 56.5 L 45 68 L 25.1 56.5 L 25.1 33.5 Z" fill="url(#s4m-hex)" />
//             <path d="M 45 31 L 56.5 37.6 L 56.5 50.4 L 45 57 L 33.5 50.4 L 33.5 37.6 Z" fill="#03040C" />
//           </svg>
//         </div>

//         {/* Connecting line down */}
//         <div className="w-px h-8 bg-gradient-to-b from-[#60A5FA]/20 to-[#F59E0B]/20" />

//         {/* Output */}
//         <div className="flex items-center gap-4">
//           <div
//             className="w-3 h-3 rounded-full shrink-0 border border-[#F59E0B]"
//             style={{ boxShadow: '0 0 5px rgba(245,158,11,0.2)' }}
//           >
//             <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mx-auto mt-[2.5px] opacity-85" />
//           </div>
//           <span
//             className="text-white/70 text-[11px] font-medium"
//             style={{ letterSpacing: '0.22em' }}
//           >
//             BETTER DECISIONS
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
