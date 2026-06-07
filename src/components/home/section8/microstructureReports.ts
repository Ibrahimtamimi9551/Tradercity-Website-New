// TODO:
// Replace local report content with backend report content
// GET /reports
// GET /reports/:id

// TODO:
// Replace report viewer content with standalone HTML reports
// Support report HTML fetched from backend

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReportContentSection {
  heading: string;
  paragraphs: string[];
}

export interface ReportContent {
  introduction: string;
  sections: ReportContentSection[];
  takeaways: string[];
}

export interface Report {
  id: string;
  slug: string;
  title: string;
  date: string;
  analyst: string;
  thumbnail: string;
  reportUrl: string | null;
  summary: string;
  content: ReportContent;
}

export interface ReportCategory {
  id: string;
  title: string;
  reports: Report[];
}

// ─── Category 1: BTC Weekly Quant ─────────────────────────────────────────────

const btcWeeklyQuant: ReportCategory = {
  id: 'cat-btc-weekly-quant',
  title: 'BTC Weekly Quant',
  reports: [
    {
      id: 'report-btc-wq-124',
      slug: 'btc-weekly-quant-124',
      title: 'BTC Weekly Quant #124',
      date: '2026-06-02',
      analyst: 'ChartInDepth',
      thumbnail: '/images/reports/btc-weekly-quant-124-thumb.webp',
      // TODO: Replace with actual report file when available
      reportUrl: '/reports/btc-weekly-quant-124.html',
      //reportUrl: 'D:\Tradercity Project\Tradercity Website New\public\reports\btc-weekly-quant-124.html.html', 
      summary:
        'BTC approaches a critical weekly decision zone as perpetual funding normalises and spot CVD diverges from price. Quant framework signals elevated probability of short-term mean reversion before continuation.',
      content: {
        introduction:
          'Full report content is available via the standalone HTML report. This record provides navigation metadata and preview content only.',
        sections: [],
        takeaways: [
          'Funding rates have normalised after a period of elevated longs.',
          'Spot CVD diverging from price — worth monitoring for directional confirmation.',
          'Weekly close above key level required to maintain bullish structure.',
        ],
      },
    },
    {
      id: 'report-btc-wq-123',
      slug: 'btc-weekly-quant-123',
      title: 'BTC Weekly Quant #123',
      date: '2026-05-26',
      analyst: 'ChartInDepth',
      thumbnail: '/images/reports/btc-weekly-quant-123-thumb.webp',
      reportUrl: '/reports/btc-weekly-quant-123.html',
      summary:
        'Open interest expansion into resistance with funding turning positive. Historically this configuration precedes a flush of overleveraged longs before any meaningful continuation higher.',
      content: {
        introduction:
          'Full report content is available via the standalone HTML report. This record provides navigation metadata and preview content only.',
        sections: [],
        takeaways: [
          'OI expanded aggressively into resistance — overleveraged long risk elevated.',
          'Funding turned positive for the first time in three weeks.',
          'Key support levels to watch on a potential long flush outlined in full report.',
        ],
      },
    },
  ],
};

// ─── Category 2: Market Structure ─────────────────────────────────────────────

const marketStructure: ReportCategory = {
  id: 'cat-market-structure',
  title: 'Market Structure',
  reports: [
    {
      id: 'report-ms-06-2026',
      slug: 'market-structure-june-2026',
      title: 'BTC Market Structure — June 2026',
      date: '2026-06-01',
      analyst: 'ChartInDepth',
      thumbnail: '/images/reports/market-structure-june-2026-thumb.webp',
      reportUrl: null,
      summary:
        'Monthly market structure review. Macro uptrend remains intact on the weekly time frame. Mid-term structure shows a series of higher lows but momentum diverging at local highs.',
      content: {
        introduction:
          'This report reviews BTC market structure across the weekly and daily time frames for June 2026.',
        sections: [
          {
            heading: 'Weekly Structure',
            paragraphs: [
              'Higher highs and higher lows remain intact on the weekly time frame. The most recent weekly pullback held above the prior swing low, confirming the structural uptrend.',
            ],
          },
          {
            heading: 'Daily Structure',
            paragraphs: [
              'Daily time frame showing a range consolidation below the prior local high. A daily close above this level is required to confirm continuation of the macro uptrend on the intermediate time frame.',
            ],
          },
        ],
        takeaways: [
          'Weekly uptrend structure intact — no structural break present.',
          'Daily consolidation below resistance — breakout confirmation pending.',
          'Momentum divergence at local high warrants caution on long entries near resistance.',
        ],
      },
    },
    {
      id: 'report-ms-05-2026',
      slug: 'market-structure-may-2026',
      title: 'BTC Market Structure — May 2026',
      date: '2026-05-01',
      analyst: 'ChartInDepth',
      thumbnail: '/images/reports/market-structure-may-2026-thumb.webp',
      reportUrl: null,
      summary:
        'May structure review. BTC printed a monthly higher low and reclaimed a key macro level. Structural context shifting from bearish to neutral with bullish bias above defined level.',
      content: {
        introduction:
          'Monthly market structure review covering the transition in BTC structural bias through May 2026.',
        sections: [
          {
            heading: 'Monthly Context',
            paragraphs: [
              'BTC printed a higher low on the monthly chart for the first time in three months. This is the minimum structural condition required to consider the macro correction complete.',
            ],
          },
        ],
        takeaways: [
          'Monthly higher low confirmed — macro correction structure potentially complete.',
          'Key macro level reclaimed and held on retest.',
          'Structural bias shifts to neutral-bullish above defined support range.',
        ],
      },
    },
  ],
};

// ─── Category 3: Orderflow ────────────────────────────────────────────────────

const orderflow: ReportCategory = {
  id: 'cat-orderflow',
  title: 'Orderflow',
  reports: [
    {
      id: 'report-of-w22-2026',
      slug: 'orderflow-week-22-2026',
      title: 'Orderflow Report — Week 22, 2026',
      date: '2026-05-30',
      analyst: 'Heavyweight',
      thumbnail: '/images/reports/orderflow-w22-2026-thumb.webp',
      reportUrl: null,
      summary:
        'Aggressive spot buying absorbed sell-side pressure at the weekly open. Tape analysis reveals institutional accumulation behaviour at the identified support zone.',
      content: {
        introduction:
          'Week 22 orderflow analysis. Focus on spot market activity and perpetual delta at key structural levels.',
        sections: [
          {
            heading: 'Spot CVD Analysis',
            paragraphs: [
              'Spot CVD showed sustained positive delta through the week, indicating genuine buying pressure rather than derivatives-driven price appreciation. This distinguishes the current move from previous short-squeeze rallies.',
            ],
          },
        ],
        takeaways: [
          'Spot CVD positive — genuine buying, not derivatives-driven.',
          'Key bid walls absorbed sell-side pressure — institutional accumulation signals present.',
          'Perpetual delta diverged from spot early in the week, resolving to the upside.',
        ],
      },
    },
    {
      id: 'report-of-w21-2026',
      slug: 'orderflow-week-21-2026',
      title: 'Orderflow Report — Week 21, 2026',
      date: '2026-05-23',
      analyst: 'Heavyweight',
      thumbnail: '/images/reports/orderflow-w21-2026-thumb.webp',
      reportUrl: null,
      summary:
        'Dominance of passive selling into strength as BTC approaches overhead supply. Aggressive buyers stepping back — tape shows distribution behaviour at the tested resistance cluster.',
      content: {
        introduction:
          'Week 21 orderflow report focusing on the distribution signals observed at the primary resistance zone.',
        sections: [
          {
            heading: 'Distribution Pattern',
            paragraphs: [
              'Passive sell-side absorption of market buy orders identified at the key resistance cluster. Each push into resistance is met with increasing passive supply — a characteristic of distribution rather than continuation.',
            ],
          },
        ],
        takeaways: [
          'Passive selling into strength — distribution rather than continuation pattern.',
          'Aggressive buyer participation diminishing at resistance.',
          'Price accepted below resistance into week close — bearish near-term implication.',
        ],
      },
    },
  ],
};

// ─── Category 4: Funding & Positioning ────────────────────────────────────────

const fundingAndPositioning: ReportCategory = {
  id: 'cat-funding-positioning',
  title: 'Funding & Positioning',
  reports: [
    {
      id: 'report-fp-june-w1-2026',
      slug: 'funding-positioning-june-w1-2026',
      title: 'Funding & Positioning — June Week 1, 2026',
      date: '2026-06-03',
      analyst: 'ChartInDepth',
      thumbnail: '/images/reports/funding-positioning-june-w1-2026-thumb.webp',
      reportUrl: null,
      summary:
        'Funding rates remain in mild positive territory after a sharp normalisation. Aggregated open interest shows a reduction in speculative leverage. Positioning data consistent with a market preparing for a directional move.',
      content: {
        introduction:
          'Weekly funding and positioning analysis. Covers perpetual funding rates, open interest, and aggregated positioning data across major exchanges.',
        sections: [
          {
            heading: 'Funding Rate Environment',
            paragraphs: [
              'Annualised perpetual funding rates have normalised to the 5–10% range after briefly reaching elevated levels. This compression in funding reduces the risk of a leveraged long flush in the near term.',
            ],
          },
          {
            heading: 'Open Interest',
            paragraphs: [
              'Aggregate OI across major perpetual exchanges declined through the week, indicating speculative leverage is being reduced rather than added. This is constructive for the next directional move.',
            ],
          },
        ],
        takeaways: [
          'Funding rates normalised — reduced long liquidation risk near term.',
          'OI declining — speculative leverage compression underway.',
          'Positioning data does not yet show extremes in either direction — market in equilibrium.',
        ],
      },
    },
    {
      id: 'report-fp-may-w4-2026',
      slug: 'funding-positioning-may-w4-2026',
      title: 'Funding & Positioning — May Week 4, 2026',
      date: '2026-05-27',
      analyst: 'ChartInDepth',
      thumbnail: '/images/reports/funding-positioning-may-w4-2026-thumb.webp',
      reportUrl: null,
      summary:
        'Elevated funding coincided with the rejection at resistance. OI expansion into the high is typical pre-flush positioning. Large short positions opened on perpetuals following the rejection.',
      content: {
        introduction:
          'Week 4 May funding and positioning analysis. Focus on the elevated funding environment and subsequent positioning shift following the resistance rejection.',
        sections: [
          {
            heading: 'Pre-Rejection Positioning',
            paragraphs: [
              'Funding rates reached elevated positive levels immediately before the resistance rejection — a reliable signal of overleveraged long positioning. The subsequent flush was consistent with the historical pattern.',
            ],
          },
        ],
        takeaways: [
          'Elevated funding into resistance — textbook overleveraged long setup ahead of flush.',
          'Large short positions opened post-rejection — bears positioning for continuation lower.',
          'OI expansion on the short side creates a squeeze risk if price reclaims resistance.',
        ],
      },
    },
  ],
};

// ─── Category 5: Macro Context ─────────────────────────────────────────────────

const macroContext: ReportCategory = {
  id: 'cat-macro-context',
  title: 'Macro Context',
  reports: [
    {
      id: 'report-macro-june-2026',
      slug: 'macro-context-june-2026',
      title: 'Macro Context — June 2026',
      date: '2026-06-01',
      analyst: 'Mattertrade',
      thumbnail: '/images/reports/macro-context-june-2026-thumb.webp',
      reportUrl: null,
      summary:
        'Global liquidity conditions continue to expand as central bank balance sheets grow. Dollar index approaching a decision point. Risk asset correlation with global M2 remains high — constructive for BTC in the medium term.',
      content: {
        introduction:
          'Monthly macro context briefing. Covers global liquidity, dollar index dynamics, and the macro tailwinds or headwinds relevant to BTC positioning.',
        sections: [
          {
            heading: 'Global Liquidity',
            paragraphs: [
              'Global M2 continues to expand on a year-over-year basis. Historically, BTC has shown strong positive correlation with global M2 growth on a 12-week lagged basis — a tailwind that remains intact entering June.',
            ],
          },
          {
            heading: 'Dollar Index',
            paragraphs: [
              'DXY approaching a key resistance cluster. A rejection from this level would be consistent with continued risk asset expansion. A breakout above would introduce near-term headwinds for risk assets including BTC.',
            ],
          },
        ],
        takeaways: [
          'Global M2 expansion — macro tailwind for BTC remains intact.',
          'DXY at decision level — outcome determines near-term risk asset environment.',
          'No macro regime change signals present — base case remains risk-on continuation.',
        ],
      },
    },
    {
      id: 'report-macro-may-2026',
      slug: 'macro-context-may-2026',
      title: 'Macro Context — May 2026',
      date: '2026-05-01',
      analyst: 'Mattertrade',
      thumbnail: '/images/reports/macro-context-may-2026-thumb.webp',
      reportUrl: null,
      summary:
        'Fed policy stance shifted toward a pause in May. Bond market pricing in rate cuts within the next two quarters. Historically bullish macro configuration for risk assets entering a rate-cut cycle.',
      content: {
        introduction:
          'May 2026 macro context report. Covers the Fed policy pivot, bond market signals, and implications for risk asset positioning.',
        sections: [
          {
            heading: 'Fed Policy Shift',
            paragraphs: [
              'The Federal Reserve signalled a pause in the hiking cycle during May, citing moderating inflation data. Bond markets responded by pricing in 50bps of cuts within the next two quarters — a historically bullish signal for risk assets.',
            ],
          },
        ],
        takeaways: [
          'Fed pause confirmed — rate-cut cycle pricing underway in bond markets.',
          'Historical precedent: BTC has produced significant gains in the 6 months following the first cut.',
          'Macro configuration shifting to the most favourable in 18 months for risk assets.',
        ],
      },
    },
  ],
};

// ─── Export ────────────────────────────────────────────────────────────────────

// TODO:
// Replace local data with API response from:
// GET /reports
// GET /reports/:id

export const microstructureReports: ReportCategory[] = [
  btcWeeklyQuant,
  marketStructure,
  orderflow,
  fundingAndPositioning,
  macroContext,
];

export default microstructureReports;
