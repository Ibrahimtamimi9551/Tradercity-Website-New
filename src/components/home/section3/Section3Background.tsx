// import React from 'react';

// export default function Section3Background() {
//   return (
//     <div className="absolute inset-0 bg-[#03040C] pointer-events-none overflow-hidden">
      
//       {/* 1. Base dark layer (provided by parent bg color) */}
      
//       {/* 2. Vertical grid layer */}
//       <div 
//         className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" 
//       />

//       {/* 3. Horizontal grid layer */}
//       <div 
//         className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" 
//       />
      
//     </div>
//   );
// }


// export default function Section3Background() {
//   return (
//     <div
//       className="absolute inset-0 pointer-events-none"
//       style={{
//         backgroundImage: "url('/images/Backgrounds/Section3Background4.png')",
//         backgroundSize: "100% 100%",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     />
//   );
// }

/**
 * TraderCity Background System: "The Problem"
 * 
 * Instructions:
 * 1. Place this component at the very beginning of your section container.
 * 2. Ensure your parent section has `position: relative` and `overflow: hidden`.
 * 3. Ensure your actual content has `position: relative` and `z-index: 10` (or higher) to sit above the background.
 */

import React, { useMemo } from 'react';

const ProblemBackground = () => {
  const { paths, simplePaths, nodes } = useMemo(() => {
    const p = [];
    const sp = [];
    const n = [];
    
    const width = 1440;
    const height = 900;
    const spacing = 35; // Fine-tuned for premium density

    // Left distortion center (The Singularity/Pull)
    const lcx = 350;
    const lcy = 450;
    const lRadius = 450;
    const lMaxPull = 160;

    // Right distortion center (The Chaos/Push)
    const rcx = 1090;
    const rcy = 350;
    const rRadius = 550;
    const rMaxPush = 110;

    // Seeded random for SSR hydration safety (Next.js friendly)
    let seed = 42;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const applyDistortion = (x: number, y: number) => {
  let nx = x;
  let ny = y;

      // Left: Structured Pull (Spacetime warp)
      const ldx = lcx - x;
      const ldy = lcy - y;
      const lDist = Math.sqrt(ldx * ldx + ldy * ldy);
      const lFactor = Math.exp(-(lDist * lDist) / (lRadius * lRadius));
      
      nx += ldx * (lMaxPull / lRadius) * lFactor;
      ny += ldy * (lMaxPull / lRadius) * lFactor;

      // Right: Chaotic Push (Fragmented noise)
      const rdx = x - rcx;
      const rdy = y - rcy;
      const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
      const rFactor = Math.exp(-(rDist * rDist) / (rRadius * rRadius));
      
      // Introduce subtle mathematical noise for the right side
      const chaosX = Math.sin(y / 60) * 35 + Math.cos(x / 40) * 15;
      const chaosY = Math.cos(x / 60) * 35 + Math.sin(y / 40) * 15;
      
      nx += (rdx * (rMaxPush / rRadius) + chaosX) * rFactor;
      ny += (rdy * (rMaxPush / rRadius) + chaosY) * rFactor;

      return [nx, ny];
    };

    // 1. Generate distorted grid mesh
    for (let x = 0; x <= width; x += spacing) {
      let d = `M `;
      for (let y = 0; y <= height; y += spacing) {
        const [nx, ny] = applyDistortion(x, y);
        d += `${y === 0 ? '' : ' L '}${nx.toFixed(2)},${ny.toFixed(2)}`;
        
        // Node Generation (Concentrated near distortions)
        const lDist = Math.sqrt(Math.pow(lcx - x, 2) + Math.pow(lcy - y, 2));
        const rDist = Math.sqrt(Math.pow(rcx - x, 2) + Math.pow(rcy - y, 2));
        
        let prob = 0.005; // Base tiny probability across whole map
        if (lDist < lRadius) prob += 0.06 * (1 - lDist / lRadius);
        if (rDist < rRadius) prob += 0.04 * (1 - rDist / rRadius);
        
        if (random() < prob) {
          n.push({
            x: nx,
            y: ny,
            delay: random() * 5,
            duration: 3 + random() * 4,
            isPurple: random() > 0.4,
            radius: 1.2 + random() * 0.8
          });
        }
      }
      p.push(d);
    }

    for (let y = 0; y <= height; y += spacing) {
      let d = `M `;
      for (let x = 0; x <= width; x += spacing) {
        const [nx, ny] = applyDistortion(x, y);
        d += `${x === 0 ? '' : ' L '}${nx.toFixed(2)},${ny.toFixed(2)}`;
      }
      p.push(d);
    }

    // 2. Generate simplified straight grid for mobile performance
    for (let x = 0; x <= width; x += spacing) {
      sp.push(`M ${x},0 L ${x},${height}`);
    }
    for (let y = 0; y <= height; y += spacing) {
      sp.push(`M 0,${y} L ${width},${y}`);
    }

    return { paths: p, simplePaths: sp, nodes: n };
  }, []);

  return (
    <div className="problem-bg-system" aria-hidden="true">
      <style>{`
        .problem-bg-system {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-color: #020617; /* Deep Navy Base Layer */
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        /* Protects center content readability via CSS Masking */
        .problem-bg-mask {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          mask-image: radial-gradient(ellipse 65% 75% at 50% 50%, rgba(0,0,0,0.04) 0%, rgba(0,0,0,1) 60%);
          -webkit-mask-image: radial-gradient(ellipse 65% 75% at 50% 50%, rgba(0,0,0,0.04) 0%, rgba(0,0,0,1) 60%);
        }

        .problem-light {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: screen;
        }

        /* Left Side: Large Purple Field */
        .light-primary {
          left: -15%;
          top: 10%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0) 65%);
          filter: blur(80px);
          animation: float-left 25s ease-in-out infinite alternate;
        }

        /* Right Side: Weaker Soft Blue Field */
        .light-secondary {
          right: -10%;
          bottom: 10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0) 65%);
          filter: blur(60px);
          animation: float-right 30s ease-in-out infinite alternate;
        }

        /* Right Side: Subtle Gold Accent */
        .light-accent {
          right: 15%;
          top: 20%;
          width: 35vw;
          height: 35vw;
          background: radial-gradient(circle, rgba(245,158,11,0.03) 0%, rgba(245,158,11,0) 60%);
          filter: blur(50px);
          animation: float-accent 35s ease-in-out infinite alternate;
        }

        .problem-grid-svg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transform-origin: center;
          animation: mesh-breathe 35s ease-in-out infinite alternate;
        }

        .grid-line {
          fill: none;
          stroke: rgba(59, 130, 246, 0.06); /* Very subtle blue */
          stroke-width: 1px;
        }

        .mesh-node {
          transform-box: fill-box;
          transform-origin: center;
          animation: node-pulse ease-in-out infinite alternate;
        }

        /* --- Extremely Subtle Motion System --- */
        @keyframes float-left {
          0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          100% { transform: translate(6%, 4%) scale(1.1); opacity: 1; }
        }

        @keyframes float-right {
          0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          100% { transform: translate(-4%, -6%) scale(1.05); opacity: 1; }
        }

        @keyframes float-accent {
          0% { transform: translate(0, 0); opacity: 0.6; }
          100% { transform: translate(-5%, 5%); opacity: 1; }
        }

        @keyframes mesh-breathe {
          0% { transform: scale(1.01) rotate(0deg); }
          50% { transform: scale(1.03) rotate(0.4deg); }
          100% { transform: scale(1.01) rotate(-0.2deg); }
        }

        @keyframes node-pulse {
          0% { opacity: 0.1; transform: scale(0.6); }
          100% { opacity: 0.85; transform: scale(1.4); }
        }

        /* --- Responsive Performance Overrides --- */
        .desktop-mesh { display: block; }
        .mobile-mesh { display: none; }

        @media (max-width: 768px) {
          .desktop-mesh { display: none; }
          .mobile-mesh { display: block; } /* Reverts to straight SVG grid */
          
          /* Simplify & expand lights for mobile */
          .problem-light.light-primary { width: 120vw; height: 120vw; left: -30%; top: -10%; }
          .problem-light.light-secondary { width: 120vw; height: 120vw; right: -30%; bottom: -10%; }
          .problem-light.light-accent { display: none; }
          
          /* Pull back masking intensity slightly on mobile to keep lights visible */
          .problem-bg-mask {
            mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 70%);
            -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 70%);
          }
        }
      `}</style>

      {/* Masked Layers (Lights + Grid) */}
      <div className="problem-bg-mask">
        
        {/* Soft Radial Lights */}
        <div className="problem-light light-primary" />
        <div className="problem-light light-secondary" />
        <div className="problem-light light-accent" />
        
        {/* Full Desktop Mesh (Warped) */}
        <svg 
          className="problem-grid-svg desktop-mesh" 
          viewBox="0 0 1440 900" 
          preserveAspectRatio="xMidYMid slice"
        >
          <g>
            {paths.map((d, i) => (
              <path key={`path-${i}`} d={d} className="grid-line" />
            ))}
          </g>
          // This was creatig the animation of the nodes , but it was causing performance issues on mobile and was not adding much to the design, so I decided to remove it for now. We can always add it back later if we want to.
          {/* <g>
            {nodes.map((n, i) => (
              <circle 
                key={`node-${i}`} 
                cx={n.x} 
                cy={n.y} 
                r={n.radius} 
                fill={n.isPurple ? "rgba(168, 85, 247, 0.7)" : "rgba(59, 130, 246, 0.7)"} 
                className="mesh-node"
                style={{
                  animationDelay: `${n.delay}s`,
                  animationDuration: `${n.duration}s`
                }}
              />
            ))}
          </g> */}
        </svg>

        {/* Simplified Mobile Mesh (Straight lines, high performance) */}
        <svg 
          className="problem-grid-svg mobile-mesh" 
          viewBox="0 0 1440 900" 
          preserveAspectRatio="xMidYMid slice"
        >
          <g>
            {simplePaths.map((d, i) => (
              <path key={`simple-${i}`} d={d} className="grid-line" />
            ))}
          </g>
        </svg>

      </div>
    </div>
  );
};

export default ProblemBackground;
