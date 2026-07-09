import React from 'react';
import TraderSolutionIllustration from "./TraderSolutionIllustration";
import SectionContainer from '../shared/SectionContainer';
import SectionEyebrow from '../shared/SectionEyebrow';
import GradientText from '../shared/GradientText';

const features = [
  // Column 1
  {
    col: 0,
    dot: '#A855F7',
    title: 'Market Structure',
    desc: 'Understand trend, structure, key levels and market behavior.'
  },
  {
    col: 0,
    dot: '#A855F7',
    title: 'Orderflow',
    desc: 'Read liquidity, participation and what moves the market.'
  },
  {
    col: 0,
    dot: '#A855F7',
    title: 'Onchain',
    desc: 'Track wallet activity and major participant flows.'
  },
  {
    col: 0,
    dot: '#A855F7',
    title: 'Scalping',
    desc: 'Fast execution, short-term opportunities and trade management.'
  },
  // Column 2
  {
    col: 1,
    dot: '#F59E0B',
    title: 'Fundamentals',
    desc: 'Macro events, narratives and liquidity conditions.'
  },
  {
    col: 1,
    dot: '#F59E0B',
    title: 'Orderbook & DOM',
    desc: 'Real-time supply and demand context.'
  },
  {
    col: 1,
    dot: '#F59E0B',
    title: (
      <>
        Education<br />
        <span className="text-white/60">Risk Management</span><br />
        <span className="text-white/60">Execution</span>
      </>
    ),
    desc: 'Learn, manage risk and execute with structure.'
  },
  {
    col: 1,
    dot: '#F59E0B',
    title: 'Funded & Target Challenges',
    desc: 'Guidance and support for challenge-based trading programs.'
  },
  // Column 3
  {
    col: 2,
    dot: '#06D6F7',
    title: 'Weekly Reports',
    desc: 'Weekly breakdowns, key levels and market summaries.'
  },
  {
    col: 2,
    dot: '#06D6F7',
    title: 'Meme & Degen Play',
    desc: 'Coverage of high-volatility opportunities and narratives.'
  }
];

export default function TraderSolutionContent() {
  const col0 = features.filter(f => f.col === 0);
  const col1 = features.filter(f => f.col === 1);
  const col2 = features.filter(f => f.col === 2);

  return (
    <SectionContainer band="medium">

      {/* =========================================
          BLOCK 1 — MESSAGE + ILLUSTRATION
          ========================================= */}
      {/* <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 mb-24 lg:mb-32"> */}
      {/* <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 mb-10 lg:mb-12"> */}
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-4 mb-4 lg:mb-6">

        {/* LEFT: Message (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col pt-4 lg:pr-8">

          <SectionEyebrow
            number="03"
            label="The Solution"
            accentColor="#A855F7"
            variant="muted-label"
            className="mb-6"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
          <div className="mb-4">
              TraderCity wasn't built<br />
              to provide more opinions.
          </div>

           <div>
              It was built<br />
              <GradientText from="#C084FC" to="#F59E0B">
               to provide context.
              </GradientText>
           </div>

       </h2>
          <div className="mt-4 text-tc-muted text-base leading-relaxed space-y-8">
            <p>
              Different analysts read the market differently.
            </p>
            <p>
              One perspective can reveal an opportunity.<br />
              Multiple perspectives can reveal the{' '}
              <span className="text-white font-semibold">Bigger Picture.</span>
            </p>
          </div>
        </div>

        {/* RIGHT: Illustration (45%) */}
        <div className="w-full lg:w-[52%] flex items-center justify-center py-2 lg:py-0">
          <TraderSolutionIllustration />
        </div>
      </div>

      {/* =========================================
          BLOCK 2 — FEATURE LIST
          ========================================= */}
      {/* </div><div className="w-full border-t border-white/5 pt-14 lg:pt-16 mb-24 lg:mb-32"> */}
      <div className="w-full border-t border-white/5 pt-6 lg:pt-8 mb-10 lg:mb-8">


        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 xl:gap-x-16">

          {/* Column 1 */}
          <div className="flex flex-col">
            {col0.map((feat, i) => (
              <div
                key={i}
                className={`py-4 ${i !== col0.length - 1 ? 'border-b border-white/5' : 'border-b border-white/5 md:border-b-0 lg:border-b-0'}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-2 h-2 rounded-full mt-[7px] shrink-0"
                    style={{ backgroundColor: feat.dot }}
                  />
                  <div>
                    <h4 className="text-white font-medium text-[15px] mb-2">{feat.title}</h4>
                    <p className="text-tc-muted text-[13px] leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            {col1.map((feat, i) => (
              <div
                key={i}
                className={`py-4 ${i !== col1.length - 1 ? 'border-b border-white/5' : 'border-b border-white/5 lg:border-b-0'}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-2 h-2 rounded-full mt-[7px] shrink-0"
                    style={{ backgroundColor: feat.dot }}
                  />
                  <div>
                    <h4 className="text-white font-medium text-[15px] mb-2">{feat.title}</h4>
                    <p className="text-tc-muted text-[13px] leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            {col2.map((feat, i) => (
              <div
                key={i}
                className="py-4 border-b border-white/5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-2 h-2 rounded-full mt-[7px] shrink-0"
                    style={{ backgroundColor: feat.dot }}
                  />
                  <div>
                    <h4 className="text-white font-medium text-[15px] mb-2">{feat.title}</h4>
                    <p className="text-tc-muted text-[13px] leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* COMMUNITY — Larger Row */}
            <div className="py-8 mt-2">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full mt-[7px] shrink-0 bg-gradient-to-br from-[#A855F7] via-[#F59E0B] to-[#06D6F7]" />
                <div>
                  <h4 className="text-white font-bold text-[28px] md:text-[32px] leading-tight mb-3">
                    Community
                  </h4>
                  <p className="text-tc-muted text-sm leading-relaxed">
                    Active traders.<br />
                    Real discussions.<br />
                    Learn &amp; Grow together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          BLOCK 3 — ENDING
          ========================================= */}
      {/* <div className="flex flex-col items-center text-center w-full mt-10"> */}
      <div className="flex flex-col items-center text-center w-full mt-0">

        

        {/* Large Typography */}
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] leading-tight flex flex-col items-center">
          <span className="text-white/90 mb-2 pl-[0.3em] md:pl-[0.4em]">
            MARKET
          </span>
          <GradientText from="#8B5CF6" via="#3B82F6" to="#06B6D4" className="pl-[0.3em] md:pl-[0.4em]">
            CLARITY.
          </GradientText>
        </h3>

        <p className="text-tc-muted text-base sm:text-lg font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase mt-8 pl-[0.2em] md:pl-[0.3em]">
          Different Expertise. One Conviction. Stronger Community.
        </p>

        {/* Horizontal Line */}
        <div className="flex items-center justify-center w-full max-w-2xl mb-0 mt-12 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <div className="mx-4 w-2 h-2 rounded-full bg-gradient-to-br from-[#A855F7] to-[#F59E0B]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>

    </SectionContainer>
  );
}
