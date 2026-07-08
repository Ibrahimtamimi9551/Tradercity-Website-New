
import React from 'react';
import {
  IconChartBar,
  IconChartCandle,
  IconWorld,
  IconFileSearch,
  IconChartHistogram,
  IconUsers,
  IconArrowDown
} from '@tabler/icons-react';

const ExpertNode = ({
  title,
  icon: IconComponent,
  color
}: {
  title: string;
  icon: React.ElementType;
  color: string;
}) => (
  <div className="relative flex flex-col items-center flex-1 z-10 w-full px-1">
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 md:w-[130px] md:h-[130px] rounded-full border bg-[#05081A] flex flex-col items-center justify-center p-1 md:p-2 text-center transition-transform hover:scale-105"
      style={{
        borderColor: color,
        boxShadow: `inset 0 0 15px ${color}10`
      }}
    >
      <div className="mb-0.5 md:mb-2" style={{ color: color }}>
        <IconComponent className="w-5 h-5 md:w-8 md:h-8" stroke={1.5} />
      </div>
      <span className="text-white text-[7px] sm:text-[9px] md:text-[11px] font-semibold leading-tight tracking-wider uppercase">
        {title.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i !== title.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    </div>

    {/* Anchor Dot */}
    <div
      className="absolute -bottom-[2px] md:-bottom-[4px] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full z-20"
      style={{ backgroundColor: color }}
    />
  </div>
);

export default function EcosystemLiteContent() {
  const nodes = [
    {
      title: "Orderflow",
      icon: IconChartCandle,
      color: "#9B5DE5" // Purple
    },
    {
      title: "Macro",
      icon: IconWorld,
      color: "#5E5CE6" // Indigo
    },
    {
      title: "Price Action",
      icon: IconChartBar,
      color: "#0A84FF" // Blue
    },
    {
      title: "Quant",
      icon: IconChartHistogram,
      color: "#06D6F7" // Cyan
    },
    {
      title: "Research",
      icon: IconFileSearch,
      color: "#30D158" // Green
    }
  ];

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center relative">
      
      {/* Expertise Nodes */}
      <div className="flex justify-between w-full gap-1 md:gap-4 relative z-20">
        {nodes.map((node, index) => (
          <ExpertNode key={index} {...node} />
        ))}
      </div>

      {/* Smooth Curved SVG Connections */}
      <div className="relative w-full h-16 md:h-24 hidden md:block -mt-1 pointer-events-none z-10">
        <svg className="w-full h-full" viewBox="0 0 1000 120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <g fill="none" strokeWidth="2" opacity="0.6" vectorEffect="non-scaling-stroke">
            {/* Natural organic flow into the center using Cubic Bezier */}
            <path d="M 100 0 C 100 80, 500 30, 500 120" stroke="#9B5DE5" />
            <path d="M 300 0 C 300 80, 500 30, 500 120" stroke="#5E5CE6" />
            <path d="M 500 0 L 500 120" stroke="#0A84FF" />
            <path d="M 700 0 C 700 80, 500 30, 500 120" stroke="#06D6F7" />
            <path d="M 900 0 C 900 80, 500 30, 500 120" stroke="#30D158" />
          </g>
        </svg>
      </div>

      {/* Central Hub Iteration */}
      <div className="flex flex-col items-center mt-2 md:mt-10 z-8">
        {/* <div className="flex items-center justify-center -ml-16"> */}
        {/* <div className="flex items-center justify-center -ml-6 md:-ml-8 lg:-ml-10"> */}
        <div className=" flex items-center justify-center-translate-x-2 md:-translate-x-4 lg:-translate-x-6">
          
          {/* TRADER */}
          <span className="text-white text-[28px] md:text-[36px] font-black tracking-[0.18em] mr-6">
            TRADER
          </span>

          {/* LOGO */}
          <div className="relative group cursor-pointer -ml-2">
            <svg
              width="90"
              height="100"
              viewBox="0 0 80 92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 0L74.641 20V60L40 80L5.35898 60V20L40 0Z"
                fill="url(#hex-grad-lite)"
              />
              <path
                d="M40 15L60.641 27V51L40 63L19.359 51V27L40 15Z"
                fill="#03040C"
              />
              <defs>
                <linearGradient
                  id="hex-grad-lite"
                  x1="5"
                  y1="0"
                  x2="75"
                  y2="80"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9B5DE5" />
                  <stop offset="0.5" stopColor="#0A84FF" />
                  <stop offset="1" stopColor="#06D6F7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* CITY */}
          <span className="text-white text-[28px] md:text-[36px] font-black tracking-[0.18em] ml-6">
            CITY
          </span>

        </div>

        <p className="mt-2 text-[#06D6F7] text-[10px] md:text-[11px] font-bold tracking-[0.3em]">
          THE CENTRAL ECOSYSTEM
        </p>
      </div> 

      {/* Connecting Arrow Down */}
      <div className="mt-3 md:mt-4 flex flex-col items-center">
        <div className="w-[3.5px] h-6 md:h-8 bg-gradient-to-b from-[#06D6F7] to-[#06D6F7]/20 relative">
           <IconArrowDown size={14} color="#06D6F7" className="absolute -bottom-3 -left-[6px]" />
        </div>
      </div>

      {/* Unified Community */}
      <div className="mt-4 md:mt-5 flex flex-col items-center w-full z-20">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#06D6F7] bg-[#03040C] flex flex-col items-center justify-center mb-4 transition-transform hover:scale-105">
          <IconUsers className="w-8 h-8 md:w-10 md:h-10 text-[#06D6F7]" stroke={1.5} />
        </div>
        <h3 className="text-white text-lg md:text-x2 font-bold tracking-[0.50em] uppercase">
          UNIFIED COMMUNITY
        </h3>
      </div>

    </div>
  );
}



// //EcosystemLiteContent.tsx
// import React from 'react';
// import {
//   IconChartBar,
//   IconChartCandle,
//   IconWorld,
//   IconFileSearch,
//   IconChartHistogram,
//   IconUsers,
//   IconArrowDown
// } from '@tabler/icons-react';

// const ExpertNode = ({
//   title,
//   icon: IconComponent,
//   color
// }: {
//   title: string;
//   icon: React.ElementType;
//   color: string;
// }) => (
//   <div className="relative flex flex-col items-center flex-1 z-10 w-full px-1">
//     <div
//       className="w-16 h-16 sm:w-20 sm:h-20 md:w-[130px] md:h-[130px] rounded-full border bg-[#05081A] flex flex-col items-center justify-center p-1 md:p-2 text-center transition-transform hover:scale-105"
//       style={{
//         borderColor: color,
//         boxShadow: `inset 0 0 15px ${color}10`
//       }}
//     >
//       <div className="mb-0.5 md:mb-2" style={{ color: color }}>
//         <IconComponent className="w-5 h-5 md:w-8 md:h-8" stroke={1.5} />
//       </div>
//       <span className="text-white text-[7px] sm:text-[9px] md:text-[11px] font-semibold leading-tight tracking-wider uppercase">
//         {title.split('\n').map((line, i) => (
//           <React.Fragment key={i}>
//             {line}
//             {i !== title.split('\n').length - 1 && <br />}
//           </React.Fragment>
//         ))}
//       </span>
//     </div>

//     {/* Anchor Dot */}
//     <div
//       className="absolute -bottom-[2px] md:-bottom-[4px] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full z-20"
//       // style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
//       style={{ backgroundColor: color }}
//     />
//   </div>
// );

// export default function EcosystemLiteContent() {
//   const nodes = [
//     // {
//     //   title: "Market\nStructure",
//     //   icon: IconChartBar,
//     //   color: "#9B5DE5" // Purple
//     // },
//     // {
//     //   title: "Orderflow",
//     //   icon: IconChartCandle,
//     //   color: "#5E5CE6" // Indigo
//     // },
//     // {
//     //   title: "Macro",
//     //   icon: IconWorld,
//     //   color: "#0A84FF" // Blue
//     // },
//     // {
//     //   title: "Research",
//     //   icon: IconFileSearch,
//     //   color: "#06D6F7" // Cyan
//     // },
//     // {
//     //   title: "Education",
//     //   icon: IconSchool,
//     //   color: "#30D158" // Teal/Green
//     // }

//      {
// title: "Orderflow",
// icon: IconChartCandle,
// color: "#9B5DE5" // Purple
// },
// {
// title: "Macro",
// icon: IconWorld,
// color: "#5E5CE6" // Indigo
// },
// {
// title: "Price Action",
// icon: IconChartBar,
// color: "#0A84FF" // Blue
// },
// {
// title: "Quant",
// icon: IconChartHistogram,
// color: "#06D6F7" // Cyan
// },
// {
// title: "Research",
// icon: IconFileSearch,
// color: "#30D158" // Green
// }

//   ];

//   return (
//     <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center relative">
      
//       {/* Header
//       <div className="flex flex-col items-center text-center mb-8 md:mb-12 w-full">
//         <div className="flex items-center justify-center w-full max-w-5xl mx-auto gap-4 mb-3 md:mb-4">
//           <div className="hidden md:flex items-center gap-3 flex-1 justify-end opacity-80">
//             <div className="w-1.5 h-1.5 rounded-full bg-[#9B5DE5]" />
//             <div className="h-[1px] w-16 lg:w-32 bg-gradient-to-r from-transparent to-[#9B5DE5]" />
//           </div>
          
//           <h2 className="text-2xl md:text-[36px] lg:text-[40px] font-black tracking-[0.2em] text-white leading-tight uppercase px-2">
//             DIFFERENT PERSPECTIVES.
//           </h2>
          
//           <div className="hidden md:flex items-center gap-3 flex-1 justify-start opacity-80">
//             <div className="h-[1px] w-16 lg:w-32 bg-gradient-to-l from-transparent to-[#06D6F7]" />
//             <div className="w-1.5 h-1.5 rounded-full bg-[#06D6F7]" />
//           </div>
//         </div>
//         <p className="text-[#0A84FF] tracking-[0.35em] text-[10px] md:text-sm font-bold uppercase">
//           ONE INTELLIGENCE LAYER.
//         </p>
//       </div> */}

//       {/* Expertise Nodes */}
//       <div className="flex justify-between w-full gap-1 md:gap-4 relative z-20">
//         {nodes.map((node, index) => (
//           <ExpertNode key={index} {...node} />
//         ))}
//       </div>

//       {/* Smooth Curved SVG Connections */}
//       <div className="relative w-full h-16 md:h-24 hidden md:block -mt-1 pointer-events-none z-10">
//         <svg className="w-full h-full" viewBox="0 0 1000 120" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
//           <g fill="none" strokeWidth="2" opacity="0.6" vectorEffect="non-scaling-stroke">
//             {/* Natural organic flow into the center using Cubic Bezier */}
//             <path d="M 100 0 C 100 80, 500 30, 500 120" stroke="#9B5DE5" />
//             <path d="M 300 0 C 300 80, 500 30, 500 120" stroke="#5E5CE6" />
//             <path d="M 500 0 L 500 120" stroke="#0A84FF" />
//             <path d="M 700 0 C 700 80, 500 30, 500 120" stroke="#06D6F7" />
//             <path d="M 900 0 C 900 80, 500 30, 500 120" stroke="#30D158" />
//           </g>
//           {/* Minimal Hub Connection Dot */}
//           {/* <circle cx="500" cy="120" r="3" fill="#0A84FF" /> */}
//         </svg>
//       </div>


//        {/* Central Hub Iteration 1  */}
        
//      {/* <div className="flex flex-col items-center mt-2 md:mt-10 z-8"> */}
//    {/* <div className="flex items-center justify-center gap-6 md:gap-10"> */}
//    <div className="flex items-center justify-center -ml-24">
      
//      {/* TRADER */}
//      <span className="text-white text-[28px] md:text-[36px] font-black tracking-[0.18em] mr-6">
//        TRADER
//      </span>

//     {/* LOGO */}
//     <div className="relative group cursor-pointer -ml-2">
//        <svg
//         width="90"
//         height="100"
//         viewBox="0 0 80 92"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M40 0L74.641 20V60L40 80L5.35898 60V20L40 0Z"
//           fill="url(#hex-grad-lite)"
//         />
//         <path
//           d="M40 15L60.641 27V51L40 63L19.359 51V27L40 15Z"
//           fill="#03040C"
//         />

//         <defs>
//           <linearGradient
//             id="hex-grad-lite"
//             x1="5"
//             y1="0"
//             x2="75"
//             y2="80"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop stopColor="#9B5DE5" />
//             <stop offset="0.5" stopColor="#0A84FF" />
//             <stop offset="1" stopColor="#06D6F7" />
//           </linearGradient>
//         </defs>
//       </svg>
//     </div>

//     {/* CITY */}
//     <span className="text-white text-[28px] md:text-[36px] font-black tracking-[0.18em] ml-6">
//       CITY
//     </span>

//   </div>

//   <p className="mt-2 text-[#06D6F7] text-[10px] md:text-[11px] font-bold tracking-[0.3em]">
//     THE CENTRAL ECOSYSTEM
//   </p>

// </div> 
  

//       {/* Connecting Arrow Down */}
//       <div className="mt-3 md:mt-4 flex flex-col items-center">
//         <div className="w-[3.5px] h-6 md:h-8 bg-gradient-to-b from-[#06D6F7] to-[#06D6F7]/20 relative">
//            <IconArrowDown size={14} color="#06D6F7" className="absolute -bottom-3 -left-[6px]" />
//         </div>
//       </div>

//       {/* Unified Community */}
//       <div className="mt-4 md:mt-5 flex flex-col items-center w-full z-20">
//         <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-[#06D6F7] bg-[#03040C] flex flex-col items-center justify-center mb-4 transition-transform hover:scale-105">
//           <IconUsers className="w-8 h-8 md:w-10 md:h-10 text-[#06D6F7]" stroke={1.5} />
//         </div>
//         <h3 className="text-white text-lg md:text-x2 font-bold tracking-[0.50em] uppercase">
//           UNIFIED COMMUNITY
//         </h3>
//       </div>

//     </div>
//   );
// }

