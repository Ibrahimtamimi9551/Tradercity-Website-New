import React from 'react';
import TraderSolutionIllustration from "./TraderSolutionIllustration";
import SectionContainer from '../shared/SectionContainer';
import SectionEyebrow from '../shared/SectionEyebrow';
import GradientText from '../shared/GradientText';

/* ------------------------------------------------------------------ */
/*  Intelligence points data                                           */
/* ------------------------------------------------------------------ */

type IntelPoint = {
  dot: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const INTEL_COLS: IntelPoint[][] = [
  [
    {
      dot: '#A855F7',
      title: 'Market Structure',
      desc: 'Understand trend, structure and key levels.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
    },
    {
      dot: '#A855F7',
      title: 'Orderflow',
      desc: 'Read liquidity, participation and market movement.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      ),
    },
    {
      dot: '#A855F7',
      title: 'Onchain',
      desc: 'Track wallet activity and major participant flows.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 14a3.5 3.5 0 0 0 5 0l4-4a3.5 3.5 0 0 0-5-5l-.5.5" />
          <path d="M14 10a3.5 3.5 0 0 0-5 0l-4 4a3.5 3.5 0 0 0 5 5l.5-.5" />
        </svg>
      ),
    },
  ],
  [
    {
      dot: '#F59E0B',
      title: 'Scalping & Intraday',
      desc: 'Fast execution and short-term opportunities.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      dot: '#F59E0B',
      title: 'Fundamentals',
      desc: 'Macro events, narratives and liquidity conditions.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
    {
      dot: '#F59E0B',
      title: 'Orderbook & DOM',
      desc: 'Real-time supply and demand context.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
  ],
  [
    {
      dot: '#06D6F7',
      title: 'Education',
      desc: 'Learn, manage risk and execute better.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      dot: '#06D6F7',
      title: 'Weekly Reports',
      desc: 'Weekly breakdowns and market summaries.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      dot: '#06D6F7',
      title: 'Community',
      desc: 'Active traders, discussion and shared learning.',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ],
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TraderSolutionContent() {
  return (
    <SectionContainer band="medium">

      {/* ══════════════════════════════════════════════════════════════
          BLOCK A — EDITORIAL HEADER (headline + right accent)
          ══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-14 xl:gap-20 mb-10 lg:mb-12">

        {/* LEFT: Eyebrow + Large Headline + supporting copy */}
        <div className="flex flex-col flex-1">
          <SectionEyebrow
            number="03"
            label="The Solution"
            accentColor="#A855F7"
            variant="muted-label"
            className="mb-7"
          />

          {/* EDITORIAL HEADLINE — ~30% smaller than previous implementation */}
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[44px] font-bold leading-[1.08] tracking-tight text-white mb-6">
            TraderCity wasn&apos;t built
            <br />
            to provide more opinions.
            <br />
            <span className="mt-1 block">
              It was built{' '}
              <GradientText from="#C084FC" to="#F59E0B">
                to provide context.
              </GradientText>
            </span>
          </h2>

          <p className="text-tc-muted text-[16px] leading-relaxed">
            Multiple perspectives.{' '}
            <span className="text-white/80">A clearer picture.</span>
          </p>
        </div>

        {/* RIGHT: Accent statement */}
        <div className="flex-shrink-0 lg:w-[200px] xl:w-[220px] flex flex-col justify-end lg:pt-[calc(1.75rem+44px+20px)] xl:pt-[calc(1.75rem+52px+20px)]">
          <p className="text-tc-muted text-[14px] leading-relaxed">
            Different data.
            <br />
            One framework.
          </p>
          <p className="text-[18px] font-bold mt-2">
            <GradientText from="#C084FC" to="#F59E0B">
              Better decisions.
            </GradientText>
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BLOCK B — INTELLIGENCE POINTS (3-column compact list)
          ══════════════════════════════════════════════════════════════ */}
      <div className="border-t border-white/[0.07] pt-8 mb-4 lg:mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 xl:gap-x-12">
          {INTEL_COLS.map((col, ci) => (
            <div key={ci} className="flex flex-col">
              {col.map((item, ii) => (
                <div
                  key={ii}
                  className={`flex items-start gap-3.5 py-4 ${
                    ii !== col.length - 1 ? 'border-b border-white/[0.06]' : ''
                  }`}
                >
                  {/* Icon in small rounded container */}
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5"
                    style={{
                      color: item.dot,
                      backgroundColor: `${item.dot}15`,
                    }}
                  >
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-white font-semibold text-[14px] leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-tc-muted text-[12px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BLOCK C — TC CONVERGENCE ILLUSTRATION (full-width panel)
          Illustration is now full-width so the MARKET CLARITY copy
          panel embedded inside the SVG has room to breathe.
          ══════════════════════════════════════════════════════════════ */}
      <div className="w-full overflow-hidden border-t border-white/[0.05] pt-4 mb-4 lg:mb-6">
        <TraderSolutionIllustration />
      </div>

      {/* BLOCK D removed — MARKET CLARITY is now embedded in the SVG illustration panel */}

    </SectionContainer>
  );
}
