'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionEyebrow from '../shared/SectionEyebrow';
import GradientText from '../shared/GradientText';
import { GLASS_CARD_CLASSES } from '../shared/GlassCard';

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

function TrophyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="8 9 4 9 4 3 20 3 20 9 16 9" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <path d="M8 9a4 4 0 0 0 8 0" />
    </svg>
  );
}

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function LockOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function ArchiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CrownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 20h20" />
      <path d="M5 20V8l7-4 7 4v12" />
      <path d="M2 8l5 4M22 8l-5 4" />
      <path d="M12 4v4" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const freeItems = [
  {
    icon: UsersIcon,
    title: 'Community Access',
    desc: 'Connect, learn and grow with the community.',
  },
  {
    icon: MessageSquareIcon,
    title: 'Public Market Discussions',
    desc: 'Open conversations on live market conditions.',
  },
  {
    icon: LightbulbIcon,
    title: 'Analyst Insights',
    desc: 'Selected insights shared publicly by our analysts.',
  },
  {
    icon: TrophyIcon,
    title: 'Challenge Updates',
    desc: 'Stay updated with ongoing challenges and results.',
  },
  {
    icon: BookOpenIcon,
    title: 'Education Snippets',
    desc: 'Short lessons, tips and actionable insights.',
  },
];

const vipItems = [
  {
    icon: LockOpenIcon,
    title: 'Full Discord Access',
    desc: 'Complete access to all VIP channels and resources.',
  },
  {
    icon: BarChartIcon,
    title: 'Weekly BTC Quant Reports',
    desc: 'Published weekly by our active analysts.',
  },
  {
    icon: ActivityIcon,
    title: 'Microstructure Report & Orderflow Analysis',
    desc: 'High quality, actionable market insights.',
  },
  {
    icon: ArchiveIcon,
    title: 'Complete Education & Report Archive',
    desc: 'Access every course and report in the archive.',
  },
  {
    icon: MessageCircleIcon,
    title: 'Active Discussions with Analysts',
    desc: 'Engage directly with analysts and experts.',
  },
];

const journeySteps = [
  { number: '1', label: 'OBSERVE', highlight: false },
  { number: '2', label: 'LEARN', highlight: false },
  { number: '3', label: 'PARTICIPATE', highlight: false },
  { number: '4', label: 'UPGRADE', highlight: true },
];

export default function MembershipComparisonContent() {
  return (
    <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 py-12 lg:py-16 font-sans">

      {/* ── Main grid ── */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto_minmax(0,1.4fr)] gap-6 lg:gap-8 xl:gap-10 items-start mb-12 lg:mb-16">

        {/* LEFT COPY */}
        <motion.div
        //   className="flex flex-col gap-8 lg:pt-2"
        // className="flex flex-col gap-8 lg:-translate-y-8 xl:-translate-y-10"
        className="flex flex-col gap-8 lg:-translate-y-12"

        //   initial="hidden"
        //   whileInView="visible"
        //   viewport={{ once: true }}
        //   variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <SectionEyebrow
            number="06"
            label="Membership"
            accentColor="#A855F7"
            className="mb-0"
          />

          <motion.h2
            // variants={fadeUp}
            custom={0.05}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.12] tracking-tight"
          >
            Most communities
            <br />
            give you information.
            <br />
            <GradientText from="#A855F7" via="#C084FC" to="#D4AF37">
              TraderCity gives
              <br />
              you context.
            </GradientText>
          </motion.h2>

          <motion.div /* variants={fadeUp} */ custom={0.1} className="w-10 h-px bg-white/20" />

          <motion.p
           // variants={fadeUp}
            custom={0.15}
            className="text-white/55 text-sm sm:text-base leading-relaxed"
          >
            Start free.
            <br />
            Upgrade when you&apos;re ready for deeper insights,
            <br className="hidden sm:block" />
            advanced education and direct trader access.
          </motion.p>

          <motion.div
            //variants={fadeUp}
            custom={0.2}
            className="inline-flex items-center gap-3 border border-[#A855F7]/20 rounded-xl px-4 py-3 bg-[#A855F7]/5 w-fit"
          >
            <div className="w-8 h-8 rounded-lg border border-[#A855F7]/25 flex items-center justify-center shrink-0">
              <UsersIcon className="w-4 h-4 text-[#A855F7]" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] text-white/45 uppercase">One Ecosystem.</p>
              <p className="text-[10px] font-bold tracking-[0.22em] text-white/45 uppercase">Two Levels. Endless Growth.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* FREE CARD */}
        <motion.div
        //   initial={{ opacity: 0, y: 28 }}
        //   whileInView={{ opacity: 1, y: 0 }}
        //   viewport={{ once: true }}
        //   transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        //   whileHover={{ y: -4, transition: { duration: 0.22 } }}
          className={`relative ${GLASS_CARD_CLASSES} rounded-2xl border-[#A855F7]/30 p-6 sm:p-7 flex flex-col gap-5 shadow-[0_8px_40px_rgba(168,85,247,0.07)]`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-block border border-[#A855F7]/45 text-[#A855F7] text-[10px] font-bold tracking-[0.3em] uppercase rounded-md px-2.5 py-1 bg-[#A855F7]/10">
              FREE
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Free Community</h3>
            <p className="text-white/40 text-sm">Open Access. Real Value.</p>
          </div>

          <div className="w-full h-px bg-white/[0.07]" />

          <ul className="flex flex-col gap-4">
            {freeItems.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-3.5 group">
                <div className="w-8 h-8 rounded-lg border border-[#A855F7]/20 bg-[#A855F7]/7 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#A855F7]/45 transition-colors duration-200">
                  <Icon className="w-4 h-4 text-[#A855F7]" />
                </div>
                <div>
                  <p className="text-white/90 text-sm font-semibold leading-snug">{title}</p>
                  <p className="text-white/38 text-xs leading-relaxed mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* JOURNEY COLUMN — desktop only */}
        <motion.div
        //   initial={{ opacity: 0, y: 28 }}
        //   whileInView={{ opacity: 1, y: 0 }}
        //   viewport={{ once: true }}
        //   transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex flex-col items-center justify-center gap-0 self-stretch pt-2 pb-2"
        >
          <p className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase mb-5 text-center leading-relaxed">
            Your<br />Journey
          </p>

          {journeySteps.map((step, i) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
                    step.highlight
                      ? 'border-[#D4AF37] bg-[#D4AF37]/12 text-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.22)]'
                      : 'border-white/18 bg-white/4 text-white/50'
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-[9px] font-bold tracking-[0.22em] uppercase ${
                    step.highlight ? 'text-[#D4AF37]' : 'text-white/30'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {i < journeySteps.length - 1 && (
                <div className="flex flex-col items-center my-2">
                  <div className="w-px h-4 bg-white/10" />
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                    <path d="M3.5 5L0 0H7L3.5 5Z" fill="rgba(255,255,255,0.15)" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* VIP CARD */}
        <motion.div
        //   initial={{ opacity: 0, y: 28 }}
        //   whileInView={{ opacity: 1, y: 0 }}
        //   viewport={{ once: true }}
        //   transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        //   whileHover={{ y: -4, transition: { duration: 0.22 } }}
          className={`relative ${GLASS_CARD_CLASSES} rounded-2xl border-[#D4AF37]/35 p-6 sm:p-7 flex flex-col gap-5 shadow-[0_8px_40px_rgba(212,175,55,0.07)]`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-block border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase rounded-md px-2.5 py-1 bg-[#D4AF37]/10">
              VIP
            </span>
            <CrownIcon className="w-4 h-4 text-[#D4AF37]/40" />
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">VIP Community</h3>
            <p className="text-white/40 text-sm">Deeper Access. Higher Edge.</p>
          </div>

          <div className="w-full h-px bg-white/[0.07]" />

          <ul className="flex flex-col gap-4">
            {vipItems.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-3.5 group">
                <div className="w-8 h-8 rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/7 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#D4AF37]/45 transition-colors duration-200">
                  <Icon className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white/90 text-sm font-semibold leading-snug">{title}</p>
                  <p className="text-white/38 text-xs leading-relaxed mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Journey strip — mobile only */}
      <motion.div
        // initial={{ opacity: 0, y: 20 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        // transition={{ duration: 0.6, delay: 0.15 }}
        className="flex lg:hidden items-center justify-center gap-0 mb-10 flex-wrap"
      >
        <p className="text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase mr-4">Your Journey</p>
        {journeySteps.map((step, i) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                  step.highlight
                    ? 'border-[#D4AF37] bg-[#D4AF37]/12 text-[#D4AF37]'
                    : 'border-white/18 bg-white/4 text-white/45'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-[8px] font-bold tracking-widest uppercase ${
                  step.highlight ? 'text-[#D4AF37]' : 'text-white/28'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < journeySteps.length - 1 && (
              <div className="w-5 h-px bg-white/12 mb-4 mx-1" />
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* CTA PANEL */}
      <motion.div
        // initial={{ opacity: 0, y: 28 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        // transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full border border-white/[0.09] rounded-2xl bg-[#09090F]/55 backdrop-blur-sm overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-stretch">

          {/* Step 1 — Free */}
          <div className="flex-1 flex items-center gap-5 px-6 sm:px-8 py-7 sm:py-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#A855F7]/28 bg-[#A855F7]/7 flex items-center justify-center shrink-0">
              <DiscordIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#A855F7]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#A855F7]/65 uppercase">Step 1</span>
              <p className="text-white font-bold text-lg sm:text-xl leading-tight">Join Free Community</p>
              <p className="text-white/40 text-sm">Start your journey. No commitment.</p>
              <motion.a
                href="/login?plan=free"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-1.5 text-[#A855F7] text-sm font-semibold mt-1 hover:text-[#C084FC] transition-colors"
              >
                Join Free on Discord
                <span className="text-base leading-none">→</span>
              </motion.a>
            </div>
          </div>

          {/* Center OR — desktop */}
          <div className="hidden sm:flex flex-col items-center justify-center px-4 py-6">
            <div className="w-px flex-1 bg-white/[0.07]" />
            <span className="text-white/22 text-xs font-bold tracking-[0.2em] uppercase py-3 px-1">OR</span>
            <div className="w-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Center OR — mobile */}
          <div className="flex sm:hidden items-center gap-4 px-6">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-white/22 text-xs font-bold tracking-[0.2em] uppercase">OR</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Step 2 — VIP */}
          <div className="flex-1 flex items-center gap-5 px-6 sm:px-8 py-7 sm:py-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#D4AF37]/28 bg-[#D4AF37]/7 flex items-center justify-center shrink-0">
              <CrownIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4AF37]/65 uppercase">Step 2</span>
              <p className="text-white font-bold text-lg sm:text-xl leading-tight">Explore VIP Membership</p>
              <p className="text-white/40 text-sm">Unlock the complete experience.</p>
              <motion.a
                href="#plan-selector"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-1.5 text-[#D4AF37] text-sm font-semibold mt-1 hover:text-[#F5CC5A] transition-colors"
              >
                View VIP Plans
                <span className="text-base leading-none">→</span>
              </motion.a>
            </div>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
