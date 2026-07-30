// import React from "react";
// import { IconChevronRight, IconUsers } from "@tabler/icons-react";
// import GradientText from "../shared/GradientText";
// // Illustration temporarily removed — content-first iteration
// // import HeroIllustration from "./HeroIllustration";

// /* ------------------------------------------------------------------ */
// /*  Data                                                               */
// /* ------------------------------------------------------------------ */

// type CtaItem = {
//   href: string;
//   title: string;
//   variant: "primary" | "secondary";
//   icon: React.ReactNode;
// };

// type TrustItem = {
//   title: string;
//   subtitle: string;
//   icon: React.ReactNode;
// };

// type StatItem = {
//   value: string;
//   label: string;
// };

// const CTA_ITEMS: CtaItem[] = [
//   {
//     href: "/login?plan=free",
//     title: "Join Discord",
//     variant: "primary",
//     icon: <DiscordIcon className="h-[18px] w-[18px]" />,
//   },
//   {
//     href: "#analysts",
//     title: "Explore Analysts",
//     variant: "secondary",
//     icon: <IconUsers className="h-[18px] w-[18px]" stroke={1.75} />,
//   },
// ];

// const TRUST_ITEMS: TrustItem[] = [
//   {
//     title: "Free to Join",
//     subtitle: "No credit card required",
//     icon: <TrustLockIcon />,
//   },
//   {
//     title: "Trusted by Thousands",
//     subtitle: "Active & growing daily",
//     icon: <TrustShieldIcon />,
//   },
//   {
//     title: "Premium Value",
//     subtitle: "Upgrade when ready",
//     icon: <TrustBoltIcon />,
//   },
//   {
//     title: "Built for Traders",
//     subtitle: "By traders, for traders",
//     icon: <TrustStarIcon />,
//   },
// ];

// const STAT_ITEMS: StatItem[] = [
//   { value: "1,000+", label: "Active Members" },
//   { value: "5", label: "Professional Analysts" },
//   { value: "400+", label: "Reports & Analyses" },
//   { value: "Daily", label: "Market Insights" },
// ];

// const ICON_PURPLE = "#A855F7";

// /* ------------------------------------------------------------------ */
// /*  Icons                                                              */
// /* ------------------------------------------------------------------ */

// function TrustLockIcon() {
//   return (
//     <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
//       <rect x="5" y="10" width="14" height="11" rx="2.5" fill={ICON_PURPLE} opacity="0.85" />
//       <path
//         d="M8 10V8a4 4 0 0 1 8 0v2"
//         fill="none"
//         stroke={ICON_PURPLE}
//         strokeWidth="2.5"
//         strokeLinecap="round"
//       />
//       <circle cx="12" cy="15.5" r="1.5" fill="#0B1220" />
//     </svg>
//   );
// }

// function TrustShieldIcon() {
//   return (
//     <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
//       <path
//         d="M12 3L4 6.5V11.5c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V6.5L12 3z"
//         fill={ICON_PURPLE}
//         opacity="0.85"
//       />
//       <path
//         d="M9.5 12.5l1.8 1.8 3.7-3.7"
//         fill="none"
//         stroke="#0B1220"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function TrustBoltIcon() {
//   return (
//     <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
//       <path d="M13 2L5 13.5h5.5L10 22l9-12.5H13.5L13 2z" fill={ICON_PURPLE} opacity="0.85" />
//     </svg>
//   );
// }

// function TrustStarIcon() {
//   return (
//     <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
//       <path
//         d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.2L12 18.8 7.6 22.6l1.7-7.2-5.6-4.9 7.4-.6L12 2z"
//         fill={ICON_PURPLE}
//         opacity="0.85"
//       />
//     </svg>
//   );
// }

// function DiscordIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
//       <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2527-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
//     </svg>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Sub-components                                                     */
// /* ------------------------------------------------------------------ */

// function HeroEyebrow() {
//   return (
//     <div className="flex items-center gap-2.5">
//       <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A855F7]" aria-hidden="true" />
//       <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A855F7]/80 sm:text-xs">
//         The Central Ecosystem
//       </span>
//     </div>
//   );
// }

// function CtaButton({ href, title, variant, icon }: CtaItem) {
//   const base =
//     "group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-[15px] font-semibold transition-colors sm:min-h-[52px] sm:w-auto sm:px-6";

//   const styles =
//     variant === "primary"
//       ? "bg-gradient-to-r from-[#9333EA] to-[#7C3AED] text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] hover:from-[#A855F7] hover:to-[#8B5CF6]"
//       : "border border-white/[0.12] bg-[#0c0e16]/60 text-white/90 hover:border-white/[0.18] hover:bg-[#0c0e16]/80";

//   return (
//     <a href={href} className={`${base} ${styles}`}>
//       {icon}
//       <span>{title}</span>
//       <IconChevronRight
//         className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5"
//         stroke={2}
//         aria-hidden="true"
//       />
//     </a>
//   );
// }

// function TrustStripItem({ title, subtitle, icon }: TrustItem) {
//   return (
//     <div className="flex min-w-0 flex-1 items-start gap-3 px-4 py-4 sm:px-5 sm:py-4">
//       <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
//         {icon}
//       </div>
//       <div className="min-w-0">
//         <p className="text-[13px] font-semibold leading-tight text-white sm:text-sm">{title}</p>
//         <p className="mt-1 text-[11px] leading-snug text-tc-muted sm:text-xs">{subtitle}</p>
//       </div>
//     </div>
//   );
// }

// function StatItem({ value, label }: StatItem) {
//   return (
//     <div className="flex min-w-0 flex-1 flex-col items-start px-4 py-2 sm:px-6 sm:py-3">
//       <p className="text-[28px] font-bold leading-none tracking-tight text-white sm:text-[32px] md:text-[36px]">
//         {value}
//       </p>
//       <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-tc-muted sm:text-xs">
//         {label}
//       </p>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  Main                                                               */
// /* ------------------------------------------------------------------ */

// export default function HeroContent2() {
//   return (
//     <div className="contents">
//       <div className="col-span-12 flex w-full max-w-[680px] flex-col pt-20 sm:pt-24 md:max-w-[720px] md:pt-28 lg:max-w-[760px] lg:pt-[7.5rem]">
//         {/* Eyebrow */}
//         <HeroEyebrow />

//         {/* Main headline */}
//         <h1 className="mt-6 max-w-[640px] text-balance font-bold tracking-[-0.03em]">
//           <span className="block text-[34px] leading-[1.05] text-white min-[375px]:text-[38px] sm:text-[44px] md:text-[52px] lg:text-[56px]">
//             Crypto Is More
//             <br />
//             Than One Market.
//           </span>

//           <span className="mt-6 block text-[22px] font-medium leading-[1.15] text-white/55 min-[375px]:text-[24px] sm:text-[26px] md:text-[28px]">
//             Different Perspectives.
//           </span>

//           <span className="mt-2 block text-[22px] font-semibold leading-[1.15] min-[375px]:text-[24px] sm:text-[26px] md:text-[28px]">
//             One{" "}
//             <GradientText from="#C084FC" to="#A855F7">
//               Intelligence
//             </GradientText>{" "}
//             <GradientText from="#F59E0B" to="#F97316">
//               Layer
//             </GradientText>
//             .
//           </span>
//         </h1>

//         {/* Description */}
//         <p className="mt-8 max-w-[480px] text-[15px] leading-relaxed text-tc-muted sm:text-base">
//           Powerful insights, premium education,
//           <br className="hidden sm:block" />
//           {" "}and a thriving community — all in one place.
//         </p>

//         {/* CTAs */}
//         <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
//           {CTA_ITEMS.map((item) => (
//             <CtaButton key={item.title} {...item} />
//           ))}
//         </div>

//         {/* Trust strip */}
//         <div className="mt-14 w-full max-w-[760px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0e16]/40">
//           <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
//             {TRUST_ITEMS.map((item) => (
//               <TrustStripItem key={item.title} {...item} />
//             ))}
//           </div>
//         </div>

//         {/* Statistics */}
//         <div className="mt-10 w-full max-w-[760px] border-t border-white/[0.06] pt-10">
//           <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] lg:grid-cols-4 lg:divide-y-0">
//             {STAT_ITEMS.map((item) => (
//               <StatItem key={item.label} {...item} />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Illustration temporarily removed — content-first iteration
//       <div className="hidden lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:flex lg:items-start lg:justify-center lg:overflow-visible lg:px-1 lg:pt-20 lg:pb-28 xl:px-2 xl:pt-24 xl:pb-32">
//         <HeroIllustration />
//       </div>
//       */}
//      </div>
//   );
// }


import React from "react";
import {
  BarChart3,
  BookOpen,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { IconChevronRight, IconUsers } from "@tabler/icons-react";
import GradientText from "../shared/GradientText";
// Illustration temporarily removed — content-first iteration
// import HeroIllustration from "./HeroIllustration";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type CtaItem = {
  href: string;
  title: string;
  variant: "primary" | "secondary";
  icon: React.ReactNode;
};

type WhyChooseFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type StatItem = {
  value: string;
  label: string;
};

const CTA_ITEMS: CtaItem[] = [
  {
    href: "/login?plan=free",
    title: "Join Discord",
    variant: "primary",
    icon: <DiscordIcon className="h-[18px] w-[18px]" />,
  },
  {
    href: "#analysts",
    title: "Explore Analysts",
    variant: "secondary",
    icon: <IconUsers className="h-[18px] w-[18px]" stroke={1.75} />,
  },
];

const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    title: "Different Perspectives",
    description: "Understand markets from multiple angles and make better decisions.",
    icon: BarChart3,
  },
  {
    title: "Premium Education",
    description: "Learn proven frameworks and strategies designed for real market conditions.",
    icon: BookOpen,
  },
  {
    title: "Active Community",
    description: "Connect with thousands of traders, share insights, and grow together.",
    icon: Users,
  },
  {
    title: "Real-Time Insights",
    description: "Stay ahead with timely analysis, reports, and market intelligence.",
    icon: Zap,
  },
];

const STAT_ITEMS: StatItem[] = [
  { value: "1,000+", label: "Active Members" },
  { value: "5", label: "Professional Analysts" },
  { value: "400+", label: "Reports & Analyses" },
  { value: "Daily", label: "Market Insights" },
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2527-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function HeroEyebrow({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A855F7]" aria-hidden="true" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A855F7]/80 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function CtaButton({ href, title, variant, icon }: CtaItem) {
  const base =
    "group inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-[15px] font-semibold transition-colors sm:min-h-[52px] sm:w-auto sm:px-6";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[#9333EA] to-[#7C3AED] text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] hover:from-[#A855F7] hover:to-[#8B5CF6]"
      : "border border-white/[0.12] bg-[#0c0e16]/60 text-white/90 hover:border-white/[0.18] hover:bg-[#0c0e16]/80";

  return (
    <a href={href} className={`${base} ${styles}`}>
      {icon}
      <span>{title}</span>
      <IconChevronRight
        className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5"
        stroke={2}
        aria-hidden="true"
      />
    </a>
  );
}

function WhyChooseFeatureRow({
  title,
  description,
  icon: Icon,
  isLast,
}: WhyChooseFeature & { isLast: boolean }) {
  return (
    <div
      className={`flex flex-col gap-4 py-7 sm:flex-row sm:items-start lg:items-center lg:gap-8 ${
        isLast ? "" : "border-b border-white/[0.06]"
      }`}
    >
      <div className="flex shrink-0 items-center gap-4 sm:w-[42%] lg:w-[40%]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#A855F7]/25 bg-[#A855F7]/[0.06] sm:h-11 sm:w-11">
          <Icon className="h-[18px] w-[18px] text-[#A855F7]" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <p className="text-[15px] font-semibold leading-tight text-white sm:text-base">{title}</p>
      </div>
      <p className="text-[13px] leading-relaxed text-tc-muted sm:w-[58%] lg:w-[60%] lg:pl-2">
        {description}
      </p>
    </div>
  );
}

function WhyChooseSection() {
  return (
    <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-stretch lg:justify-between lg:gap-14 xl:gap-20">
      {/* Left — headline, centered in its column */}
      <div className="flex w-full flex-col items-center justify-center text-center lg:max-w-[400px] lg:shrink-0 xl:max-w-[440px]">
        <HeroEyebrow label="Why Traders Choose TraderCity" centered />

        <h2 className="mt-8 flex w-full flex-col items-center text-[40px] font-bold tracking-[-0.03em] min-[375px]:text-[44px] sm:mt-10 sm:text-[52px] md:text-[56px] lg:mt-10 lg:text-[60px] xl:text-[64px]">
          <span className="block leading-[1.1] text-white">Clarity.</span>
          <span className="mt-5 block leading-[1.1] sm:mt-6 md:mt-7 lg:mt-8">
            <GradientText from="#C084FC" to="#A855F7">Context.</GradientText>
          </span>
          <span className="mt-5 block leading-[1.1] sm:mt-6 md:mt-7 lg:mt-8">
            <GradientText from="#F59E0B" to="#F97316">Confidence.</GradientText>
          </span>
        </h2>
      </div>

      <div className="hidden shrink-0 lg:block lg:w-px lg:bg-white/[0.06]" aria-hidden="true" />

      {/* Right — feature list, pushed toward page right like Problem Awareness */}
      <div className="w-full lg:ml-auto lg:max-w-[600px] lg:flex-1 xl:max-w-2xl">
        {WHY_CHOOSE_FEATURES.map((feature, index) => (
          <WhyChooseFeatureRow
            key={feature.title}
            {...feature}
            isLast={index === WHY_CHOOSE_FEATURES.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function StatItem({ value, label }: StatItem) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start px-4 py-4 sm:px-6 sm:py-5">
      <p className="text-[28px] font-bold leading-none tracking-tight text-white sm:text-[32px] md:text-[36px]">
        {value}
      </p>
      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-tc-muted sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function StatsBar() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0e16]/40">
      <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] lg:grid-cols-4 lg:divide-y-0">
        {STAT_ITEMS.map((item) => (
          <StatItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function HeroContent2() {
  return (
    <div className="col-span-12 flex min-h-0 flex-1 flex-col">
      {/* Hero copy + CTAs */}
      <div className="flex w-full max-w-[760px] flex-col pt-20 sm:pt-24 md:pt-28 lg:pt-[7.5rem]">
        <HeroEyebrow label="The Central Ecosystem" />

        <h1 className="mt-6 max-w-[640px] text-balance font-bold tracking-[-0.03em]">
          <span className="block text-[34px] leading-[1.05] text-white min-[375px]:text-[38px] sm:text-[44px] md:text-[52px] lg:text-[56px]">
            Crypto Is More
            <br />
            Than One Market.
          </span>

          <span className="mt-6 block text-[22px] font-medium leading-[1.15] text-white/55 min-[375px]:text-[24px] sm:text-[26px] md:text-[28px]">
            Different Perspectives.
          </span>

          <span className="mt-2 block text-[22px] font-semibold leading-[1.15] min-[375px]:text-[24px] sm:text-[26px] md:text-[28px]">
            One{" "}
            <GradientText from="#C084FC" to="#A855F7">
              Intelligence
            </GradientText>{" "}
            <GradientText from="#F59E0B" to="#F97316">
              Layer
            </GradientText>
            .
          </span>
        </h1>

        <p className="mt-8 max-w-[480px] text-[15px] leading-relaxed text-tc-muted sm:text-base">
          Powerful insights, premium education,
          <br className="hidden sm:block" />
          {" "}and a thriving community — all in one place.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {CTA_ITEMS.map((item) => (
            <CtaButton key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* Why Traders Choose — replaces trust strip */}
      <div className="mt-16 w-full sm:mt-20 lg:mt-24">
        <WhyChooseSection />
      </div>

      {/* Stats bar — pinned to hero bottom */}
      <div className="mt-auto w-full pt-14 sm:pt-16 lg:pt-20">
        <StatsBar />
      </div>

      {/* Illustration temporarily removed — content-first iteration
      <div className="hidden lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:flex lg:items-start lg:justify-center lg:overflow-visible lg:px-1 lg:pt-20 lg:pb-28 xl:px-2 xl:pt-24 xl:pb-32">
        <HeroIllustration />
      </div>
      */}
    </div>
  );
}
