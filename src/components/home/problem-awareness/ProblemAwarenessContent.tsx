import React from 'react';
import {
  BookOpen,
  Users,
  Lock,
  RefreshCw,
  Wallet,
  DollarSign,
  type LucideIcon,
} from 'lucide-react';
import SectionContainer from '../shared/SectionContainer';
import SectionEyebrow from '../shared/SectionEyebrow';
import GradientText from '../shared/GradientText';

const journeySteps: {
  num: string;
  icon: LucideIcon;
  title: string;
  desc: React.ReactNode;
}[] = [
  {
    num: '01',
    icon: BookOpen,
    title: 'Scattered Knowledge',
    desc: (
      <>
        Tons of content, courses, and strategies.
        <br />
        You try to piece it together—still no clear edge.
      </>
    ),
  },
  {
    num: '02',
    icon: Users,
    title: 'Join Random Groups',
    desc: (
      <>
        Dozens of groups, endless noise,
        <br />
        distractions and zero real context.
      </>
    ),
  },
  {
    num: '03',
    icon: Lock,
    title: 'Private Groups & One Perspective',
    desc: (
      <>
        Most are either dead, inconsistent,
        <br />
        or worse—scams in disguise.
      </>
    ),
  },
  {
    num: '04',
    icon: RefreshCw,
    title: 'Move On & Start Over',
    desc: (
      <>
        You leave, search again, and hope
        <br />
        the next group is different.
      </>
    ),
  },
  {
    num: '05',
    icon: Wallet,
    title: 'Pay Multiple Analysts',
    desc: (
      <>
        Multiple subscriptions, conflicting views,
        <br />
        no unified context—just more confusion.
      </>
    ),
  },
  {
    num: '06',
    icon: DollarSign,
    title: 'Money Lost. Clarity Missing.',
    desc: (
      <>
        Time, money, and confidence drain away.
        <br />
        No central credibility. No real progress.
      </>
    ),
  },
];

export default function ProblemAwarenessContent() {
  return (
    <SectionContainer band="medium">
      <div className="flex flex-col items-center text-center mb-8 lg:mb-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          EVERY TRADER STARTS HERE.
        </h2>
        <p className="mt-5 text-base leading-relaxed md:text-lg lg:text-xl text-white/60 font-medium">
          The same ambition. The same mistakes.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 mb-8">
        <div className="flex-1 lg:max-w-[520px] xl:max-w-[580px] flex flex-col pt-4">
          <SectionEyebrow
            number="02"
            label="The Trader's Reality"
            accentColor="#A855F7"
            variant="muted-label"
            className="mb-10"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-10">
            The market <br />
            wasn&apos;t the hard part.
            <br />
            <GradientText from="#C084FC" to="#A855F7">Finding clarity was.</GradientText>
          </h2>

          <div className="text-tc-muted text-base leading-relaxed space-y-6">
            <p>
              Every trader starts with the same goal:
              <br />
              learn, improve, and become consistently profitable.
            </p>
            <p>
              But the journey is filled with noise,
              <br />
              dead ends, and costly mistakes.
              <br />
              Most traders don&apos;t lack effort.
            </p>
            <p className="text-[#A855F7]/95 font-semibold uppercase tracking-[0.08em] leading-relaxed">
              MOST TRADERS DON&apos;T FAIL FROM LACK OF EFFORT.
              <br />
              THEY FAIL FROM LACK OF CONTEXT.
            </p>
          </div>
        </div>

        <div className="hidden lg:block w-px bg-white/5" />

        <div className="flex-1 lg:max-w-[600px] xl:max-w-2xl">
          <div className="flex flex-col">
            {journeySteps.map((step, index) => (
              <div
                key={step.num}
                className={`flex flex-col sm:flex-row sm:items-start lg:items-center py-7 gap-4 lg:gap-8 ${
                  index !== journeySteps.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="flex items-center gap-4 sm:w-[45%] shrink-0">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 text-[13px] font-medium shrink-0">
                    {step.num}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-[#F59E0B]/70 shrink-0" />
                  <step.icon className="w-5 h-5 text-[#A855F7]/80 shrink-0" strokeWidth={1.5} />
                  <h4 className="text-white/90 font-medium text-[15px]">{step.title}</h4>
                </div>
                <div className="sm:w-[55%] text-tc-muted text-[13px] leading-relaxed">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center w-full">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] leading-tight flex flex-col items-center">
          <span className="text-white/90 mb-2 pl-[0.3em] md:pl-[0.4em]">FRAGMENTED</span>
          <GradientText from="#F59E0B" to="#F97316" className="pl-[0.3em] md:pl-[0.4em] opacity-90">
            INTELLIGENCE.
          </GradientText>
        </h3>

        <p className="text-tc-muted text-base sm:text-lg font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase mt-8 pl-[0.2em] md:pl-[0.3em]">
          Information everywhere. Confidence nowhere.
        </p>

        <div className="flex items-center justify-center w-full max-w-2xl mb-2 mt-10 opacity-70">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <div className="mx-4 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>
    </SectionContainer>
  );
}
