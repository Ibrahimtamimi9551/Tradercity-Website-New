// // import React from 'react';

// // export default function HeroBackground() {
// //   return (
// //     <div className="absolute inset-0 overflow-hidden bg-[#02030A]">
      
// //       {/* 1. Ambient Lighting */}
// //       {/* Deep Purple Glow - Bottom Left */}
// //       <div 
// //         className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-30 blur-[130px]"
// //         style={{ background: 'radial-gradient(circle, #9B5DE5 0%, transparent 70%)' }}
// //       />
      
// //       {/* Deep Blue Glow - Top Right */}
// //       <div 
// //         className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-20 blur-[130px]"
// //         style={{ background: 'radial-gradient(circle, #06D6F7 0%, transparent 70%)' }}
// //       />
      
// //       {/* 2. Perspective Grid Floor */}
// //       <div className="absolute bottom-0 left-0 right-0 h-[35vh] min-h-[250px] overflow-hidden">
// //         {/* Grid Lines */}
// //         <div 
// //           className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300%] h-[200%] origin-bottom opacity-40"
// //           style={{
// //             transform: 'perspective(400px) rotateX(75deg)',
// //             background: 'linear-gradient(90deg, #9B5DE5 0%, rgba(2,3,10,0) 40%, rgba(2,3,10,0) 60%, #06D6F7 100%)',
// //             WebkitMaskImage: `
// //               linear-gradient(to right, black 1px, transparent 1px),
// //               linear-gradient(to bottom, black 1px, transparent 1px)
// //             `,
// //             WebkitMaskSize: '40px 40px',
// //             maskImage: `
// //               linear-gradient(to right, black 1px, transparent 1px),
// //               linear-gradient(to bottom, black 1px, transparent 1px)
// //             `,
// //             maskSize: '40px 40px'
// //           }}
// //         />
        
// //         {/* Horizon Fade to Darkness */}
// //         <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#02030A]/95 to-[#02030A]" />
// //       </div>

// //       {/* 3. Orbital Curves & Glowing Nodes */}
// //       <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
// //         <defs>
// //           <linearGradient id="orbit-purple" x1="100%" y1="0%" x2="0%" y2="100%">
// //             <stop offset="0%" stopColor="#9B5DE5" stopOpacity="0.5" />
// //             <stop offset="100%" stopColor="#9B5DE5" stopOpacity="0" />
// //           </linearGradient>
// //           <linearGradient id="orbit-blue" x1="100%" y1="50%" x2="0%" y2="100%">
// //             <stop offset="0%" stopColor="#06D6F7" stopOpacity="0.5" />
// //             <stop offset="100%" stopColor="#06D6F7" stopOpacity="0" />
// //           </linearGradient>
          
// //           {/* Filters for soft bloom effects */}
// //           <filter id="glow-purple" x="-100%" y="-100%" width="300%" height="300%">
// //             <feGaussianBlur stdDeviation="6" result="blur" />
// //             <feComposite in="SourceGraphic" in2="blur" operator="over" />
// //           </filter>
          
// //           <filter id="glow-blue" x="-100%" y="-100%" width="300%" height="300%">
// //             <feGaussianBlur stdDeviation="6" result="blur" />
// //             <feComposite in="SourceGraphic" in2="blur" operator="over" />
// //           </filter>
// //         </defs>
        
// //         {/* Purple Curve (Top) */}
// //         {/* Mathematical rx/ry to keep node perfectly aligned regardless of aspect ratio */}
// //         <ellipse cx="110%" cy="-30%" rx="56.56%" ry="56.56%" fill="none" stroke="url(#orbit-purple)" strokeWidth="1" />
        
// //         {/* Purple Node */}
// //         {/* Outer bloom */}
// //         <circle cx="70%" cy="10%" r="6" fill="#9B5DE5" filter="url(#glow-purple)" className="opacity-80" />
// //         {/* Inner bright core */}
// //         <circle cx="70%" cy="10%" r="2" fill="#E9D5FF" />
// //         <circle cx="70%" cy="10%" r="1" fill="#FFFFFF" />


// //         {/* Blue Curve (Bottom) */}
// //         <ellipse cx="130%" cy="10%" rx="57.01%" ry="57.01%" fill="none" stroke="url(#orbit-blue)" strokeWidth="1" />
        
// //         {/* Blue Node */}
// //         {/* Outer bloom */}
// //         <circle cx="85%" cy="45%" r="6" fill="#06D6F7" filter="url(#glow-blue)" className="opacity-80" />
// //         {/* Inner bright core */}
// //         <circle cx="85%" cy="45%" r="2" fill="#CFFAFE" />
// //         <circle cx="85%" cy="45%" r="1" fill="#FFFFFF" />
// //       </svg>
      
// //     </div>
// //   );
// // }

// // Second Background Iteration

// import React from 'react';

// export default function HeroBackground() {
//   return (
//     <div className="absolute inset-0 overflow-hidden bg-[#02030A] -z-10 pointer-events-none select-none">
      
//       {/* 1. Ambient Lighting */}
//       {/* Subtle Purple Radial Glow - Bottom Left */}
//       <div 
//         className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-15 blur-[120px]"
//         style={{ background: 'radial-gradient(circle, #9B5DE5 0%, transparent 70%)' }}
//       />
      
//       {/* Subtle Cyan Radial Glow - Right Side */}
//       <div 
//         className="absolute top-[15%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-15 blur-[120px]"
//         style={{ background: 'radial-gradient(circle, #06D6F7 0%, transparent 70%)' }}
//       />

//       {/* 2. Perspective Floor Grid (Bottom 25%) */}
//       <div className="absolute bottom-0 left-0 right-0 h-[25vh] min-h-[200px] overflow-hidden">
//         {/* Low Contrast Grid Lines */}
//         <div 
//           className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] origin-bottom opacity-30"
//           style={{
//             transform: 'perspective(300px) rotateX(75deg)',
//             // Gradients color the grid lines: purple on left, transparent center, cyan on right
//             background: 'linear-gradient(90deg, rgba(155,93,229,0.8) 0%, rgba(2,3,10,0) 40%, rgba(2,3,10,0) 60%, rgba(6,214,247,0.8) 100%)',
//             WebkitMaskImage: `
//               linear-gradient(to right, black 1px, transparent 1px),
//               linear-gradient(to bottom, black 1px, transparent 1px)
//             `,
//             WebkitMaskSize: '40px 40px',
//             maskImage: `
//               linear-gradient(to right, black 1px, transparent 1px),
//               linear-gradient(to bottom, black 1px, transparent 1px)
//             `,
//             maskSize: '40px 40px'
//           }}
//         />
        
//         {/* Infinite Horizon Fade */}
//         <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#02030A]/95 to-[#02030A]" />
        
//         {/* Subtle Central Horizon Grounding Glow */}
//         <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[30%] h-[40%] bg-[#06D6F7] rounded-full opacity-10 blur-[40px]" />
//       </div>

//       {/* 3. Thin Orbital Curves & Glowing Nodes (Top-Right Corner Only) */}
//       <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <linearGradient id="orbit-purple" x1="100%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#9B5DE5" stopOpacity="0.6" />
//             <stop offset="100%" stopColor="#9B5DE5" stopOpacity="0" />
//           </linearGradient>
//           <linearGradient id="orbit-cyan" x1="100%" y1="50%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#06D6F7" stopOpacity="0.6" />
//             <stop offset="100%" stopColor="#06D6F7" stopOpacity="0" />
//           </linearGradient>
          
//           <filter id="glow-purple-node" x="-100%" y="-100%" width="300%" height="300%">
//             <feGaussianBlur stdDeviation="6" result="blur" />
//             <feComposite in="SourceGraphic" in2="blur" operator="over" />
//           </filter>
          
//           <filter id="glow-cyan-node" x="-100%" y="-100%" width="300%" height="300%">
//             <feGaussianBlur stdDeviation="6" result="blur" />
//             <feComposite in="SourceGraphic" in2="blur" operator="over" />
//           </filter>
//         </defs>
        
//         {/* Purple Curve */}
//         {/* rx/ry percentages guarantee the node stays perfectly on the curve at any aspect ratio */}
//         <ellipse cx="110%" cy="-10%" rx="43.01%" ry="43.01%" fill="none" stroke="url(#orbit-purple)" strokeWidth="1" className="opacity-70" />
        
//         {/* Purple Node (Upper Right) */}
//         <circle cx="75%" cy="15%" r="5" fill="#9B5DE5" filter="url(#glow-purple-node)" className="opacity-90" />
//         <circle cx="75%" cy="15%" r="1.5" fill="#E9D5FF" />
//         <circle cx="75%" cy="15%" r="0.5" fill="#FFFFFF" />

//         {/* Cyan Curve */}
//         <ellipse cx="120%" cy="10%" rx="39.05%" ry="39.05%" fill="none" stroke="url(#orbit-cyan)" strokeWidth="1" className="opacity-70" />
        
//         {/* Cyan Node (Mid Right) */}
//         <circle cx="90%" cy="35%" r="5" fill="#06D6F7" filter="url(#glow-cyan-node)" className="opacity-90" />
//         <circle cx="90%" cy="35%" r="1.5" fill="#CFFAFE" />
//         <circle cx="90%" cy="35%" r="0.5" fill="#FFFFFF" />
//       </svg>
      
//     </div>
//   );
// }

export default function HeroBackground() {
  return (
    <div
      className="absolute inset-0 bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/images/Hero-Background.png')", 
      }}
    />
  );
}