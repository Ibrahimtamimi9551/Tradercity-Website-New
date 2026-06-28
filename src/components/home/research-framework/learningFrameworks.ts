// TODO:
// Replace local learning modules with Arena education data
// GET /education/modules
// GET /education/lessons

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ContentSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface TopicContent {
  introduction: string;
  sections: ContentSection[];
  takeaways: string[];
}

export interface Topic {
  id: string;
  slug: string;
  order: number;
  title: string;
  excerpt: string;
  readTime: string;
  level: ContentLevel;
  locked: boolean;
  thumbnail: string;
  image: string;
  content: TopicContent;
}

export interface LearningModule {
  id: string;
  title: string;
  summary: string;
  description: string;
  topics: Topic[];
}

// ─── Module 1: Market Foundations ─────────────────────────────────────────────

const marketFoundations: LearningModule = {
  id: 'module-market-foundations',
  title: 'Market Foundations',
  summary: 'Core principles every trader must internalise before placing a single trade.',
  description:
    'Market Foundations covers the psychological, mechanical, and structural building blocks of disciplined trading. From understanding cognitive biases to calculating risk-adjusted position sizes, this module establishes the non-negotiable baseline for long-term participation in financial markets.',
  topics: [
    {
      id: 'topic-dunning-kruger',
      slug: 'dunning-kruger-effect',
      order: 1,
      title: 'The Dunning-Kruger Effect in Trading',
      excerpt:
        'Why new traders feel overconfident after early wins — and how that overconfidence leads to catastrophic drawdowns.',
      readTime: '8 min read',
      level: 'Beginner',
      locked: false,
      thumbnail: '/images/education/dunning-kruger-thumb.webp',
      image: '/images/education/dunning-kruger.webp',
      content: {
        introduction:
          'Every trader goes through it. You open your first few trades, they go green, and suddenly you feel like you have cracked the market. A few weeks in, you are already sizing up, cutting stops early, and dismissing warnings from more experienced traders. This is not a personality flaw — it is a documented cognitive pattern called the Dunning-Kruger Effect, and understanding it may be the single most protective piece of knowledge a new trader can have.',
        sections: [
          {
            heading: 'What Is the Dunning-Kruger Effect?',
            paragraphs: [
              'First described by psychologists David Dunning and Justin Kruger in 1999, the Dunning-Kruger Effect is a cognitive bias where people with limited knowledge in a domain dramatically overestimate their competence. Conversely, genuine experts tend to underestimate their relative ability because they are acutely aware of how much they do not know.',
              'In trading, this effect is unusually dangerous. Markets occasionally move in a direction that rewards poor reasoning. A trader who sizes up recklessly might win simply because volatility happened to work in their favour. They attribute the outcome to skill rather than luck, reinforcing the false belief that they have mastered something they have barely begun to understand.',
            ],
            bullets: [
              'Stage 1 — Peak of Mount Stupid: Minimal experience, maximum confidence. Small wins feel like proof of mastery.',
              'Stage 2 — Valley of Despair: Reality strikes. The trader encounters scenarios their limited framework cannot handle and sustains serious losses.',
              'Stage 3 — Slope of Enlightenment: The trader begins to study seriously, builds real skills, and develops appropriate humility.',
              'Stage 4 — Plateau of Sustainability: Competence meets calibrated confidence. The trader understands their edge and operates within it consistently.',
            ],
          },
          {
            heading: 'How This Plays Out in Live Markets',
            paragraphs: [
              'The most dangerous period for a new trader is typically within their first one to three months. During a trending market environment, many strategies — including no strategy at all — can appear to produce results. The novice interprets green trades as confirmation of skill and begins taking larger risks.',
              'When the market regime shifts — as it inevitably does — the same trader is now over-leveraged, under-prepared, and emotionally unprepared for sustained drawdown. The account that took months to build can be destroyed in days. This is not bad luck. This is the Valley of Despair arriving on schedule.',
              'What separates professionals from permanent amateurs is not intelligence or access to information. It is the ability to recognise which stage of this curve they are on and adjust their behaviour accordingly.',
            ],
          },
          {
            heading: 'Practical Frameworks to Counter It',
            paragraphs: [
              'Awareness alone is not enough. You need structural safeguards that protect your capital while your competence catches up to your confidence.',
            ],
            bullets: [
              'Risk a fixed percentage per trade — not a fixed dollar amount, not "whatever feels right." 1% per trade is a reasonable ceiling for a developing trader.',
              'Keep a trading journal. Log your reasoning before entry, not just the outcome. Review it weekly to identify patterns in your decision-making, not just your P&L.',
              'Seek out disconfirmation. Actively look for reasons your trade thesis might be wrong before you enter. Most beginners only look for reasons they are right.',
              'Do not increase position size until you have a statistically meaningful sample of at least 50 to 100 trades with documented edge. Anything before that is noise.',
              'Find a community or mentor who will tell you the truth. Surrounding yourself with people who agree with everything you do is one of the fastest ways to stay on Mount Stupid.',
            ],
          },
          {
            heading: 'The Deeper Lesson',
            paragraphs: [
              "The market does not care about your confidence. It does not reward effort or enthusiasm. It rewards correct positioning, appropriate sizing, and disciplined risk management — executed consistently over a large sample of trades. The sooner you accept that you know less than you think you do, the sooner you stop making decisions that your future self will deeply regret.",
              'The traders who last in this industry are not the most confident. They are the most honest — with themselves, about their edge, about their limitations, and about what the market is actually telling them.',
            ],
          },
        ],
        takeaways: [
          'Overconfidence after early wins is a predictable cognitive bias, not a sign of talent.',
          'The Valley of Despair is inevitable — your preparation determines whether you survive it.',
          'Risk management rules must be non-negotiable, especially when confidence is highest.',
          'A trading journal transforms subjective gut feelings into objective, reviewable data.',
          'Sustainable trading is built on calibrated humility, not peak confidence.',
        ],
      },
    },
    {
      id: 'topic-position-sizing-leverage',
      slug: 'position-sizing-and-leverage-101',
      order: 2,
      title: 'Position Sizing & Leverage 101',
      excerpt:
        'Leverage is not inherently dangerous — misunderstanding it is. Learn how to calculate exposure correctly and why sizing is the primary driver of long-term account survival.',
      readTime: '7 min read',
      level: 'Beginner',
      locked: false,
      thumbnail: '/images/education/position-sizing-thumb.webp',
      image: '/images/education/position-sizing.webp',
      content: {
        introduction:
          'More traders blow accounts because of incorrect position sizing than because of incorrect directional calls. You can have a 60% win rate and still destroy your account if your losing trades are consistently three times the size of your winners. Understanding how leverage interacts with position size is not optional — it is the mechanical foundation of all risk management.',
        sections: [
          {
            heading: 'What Leverage Actually Means',
            paragraphs: [
              'Leverage allows you to control a position larger than your deposited capital. At 10x leverage, a $1,000 account controls a $10,000 position. A 1% adverse move in the asset equates to a 10% loss on your capital. This amplification works in both directions — gains and losses are multiplied equally.',
              'The critical error most beginners make is confusing high leverage with large position size. They are not the same thing. You can use 100x leverage and still risk only 1% of your account per trade if you size the position correctly. The leverage multiplier simply affects the notional exposure per unit of capital.',
            ],
            bullets: [
              'Notional Position Size = Account Size × Leverage',
              'Risk Per Trade = (Entry Price − Stop Loss Price) × Contract Size',
              'Max Position Size = (Account × Risk %) ÷ (Entry − Stop Loss)',
            ],
          },
          {
            heading: 'The Kelly Criterion and Why Most Traders Should Use a Fraction of It',
            paragraphs: [
              'The Kelly Criterion is a mathematical formula that calculates the theoretically optimal fraction of capital to risk per trade, given a known win rate and reward-to-risk ratio. While useful as a conceptual framework, full Kelly sizing is extremely aggressive and assumes perfect knowledge of your edge — a condition that rarely holds in live markets.',
              'Most professional traders operate at half-Kelly or quarter-Kelly to account for model uncertainty, slippage, and the psychological cost of drawdowns. For developing traders, a flat 1% risk per trade with no exceptions is a safer starting point than any formula-based approach.',
            ],
          },
          {
            heading: 'Common Sizing Mistakes',
            paragraphs: [
              'Understanding the mechanics of correct sizing is insufficient if you continue making the same practical errors in execution.',
            ],
            bullets: [
              'Setting stops too tight to avoid losing, which forces larger position sizes to maintain a fixed dollar risk.',
              'Using the same position size regardless of market conditions — volatility regimes demand dynamic sizing.',
              'Increasing size after wins to "capitalise on momentum" — this is emotion, not edge.',
              'Failing to account for funding costs, spread, and slippage when calculating effective risk.',
              'Ignoring correlated positions — holding three long positions in correlated assets is not three separate 1% risks.',
            ],
          },
        ],
        takeaways: [
          'Leverage amplifies both gains and losses — the multiplier is emotionally neutral.',
          'Position size should always be derived from your stop loss distance, not your desired profit target.',
          'A consistent 1% risk per trade allows you to survive 20 consecutive losses with capital remaining.',
          'Correlated positions compound actual risk beyond what individual position sizes suggest.',
          'Correct sizing is a skill. Practice calculating it manually before every trade until it becomes automatic.',
        ],
      },
    },
    {
      id: 'topic-isolated-cross-margin',
      slug: 'isolated-margin-and-cross-margin',
      order: 3,
      title: 'Isolated Margin & Cross Margin',
      excerpt:
        'Two margin modes, two very different risk profiles. Choosing the wrong one for your strategy can turn a manageable loss into a full liquidation.',
      readTime: '6 min read',
      level: 'Beginner',
      locked: false,
      thumbnail: '/images/education/margin-modes-thumb.webp',
      image: '/images/education/margin-modes.webp',
      content: {
        introduction:
          'Before opening a leveraged position on any derivatives exchange, you will be asked to choose a margin mode. This is not a cosmetic setting. It determines whether a losing position can draw from your entire account balance or only from the capital you explicitly allocate to it. The implications for risk management are significant.',
        sections: [
          {
            heading: 'Isolated Margin',
            paragraphs: [
              'In isolated margin mode, you allocate a fixed amount of margin to a position. If that position is liquidated, you lose only the margin allocated to it — your remaining account balance is untouched. This creates a hard cap on the maximum loss for any single trade.',
              'Isolated margin is typically preferred for directional speculative trades where you have a defined worst-case loss in mind. It enforces discipline because the liquidation price is fixed at position open and cannot be moved by simply depositing more margin into that position.',
            ],
            bullets: [
              'Maximum loss is capped at the allocated margin.',
              'Liquidation price is fixed at open — cannot cascade into other positions.',
              'Preferred for high-conviction directional trades with defined risk.',
              'Requires manual reallocation if you want to add margin to a position.',
            ],
          },
          {
            heading: 'Cross Margin',
            paragraphs: [
              'Cross margin mode allows a position to draw from your entire available account balance to avoid liquidation. While this provides more flexibility and prevents premature liquidations during short-term price spikes, it also means a single catastrophic trade can draw down or liquidate your entire account.',
              'Cross margin is commonly used by market makers and hedgers who hold multiple offsetting positions and need the system to automatically allocate margin across their portfolio. For directional traders, it introduces tail risk that is difficult to quantify in real-time.',
            ],
            bullets: [
              'Position draws from full account balance to maintain margin requirements.',
              'Prevents premature liquidation during volatile wicks.',
              'A single position can liquidate your entire account.',
              'Appropriate for hedged strategies, not for isolated directional speculation.',
            ],
          },
          {
            heading: 'Choosing the Right Mode for Your Strategy',
            paragraphs: [
              'The decision should be driven by your position structure, not by which mode gives you a more comfortable liquidation price. If you are running a single directional trade with a stop loss, isolated margin enforces your risk parameters mechanically. If your stop is hit before liquidation, you exit with a known loss. If you are running a delta-neutral structure across multiple legs, cross margin allows the profitable side to offset margin requirements on the losing side.',
            ],
          },
        ],
        takeaways: [
          'Isolated margin caps your maximum loss to the allocated margin for that position.',
          'Cross margin can liquidate your entire account if a position moves sufficiently against you.',
          'Most directional retail traders should default to isolated margin for single speculative trades.',
          'Understanding your liquidation price before entering is non-negotiable in any margin mode.',
          'Exchange interfaces vary — always verify which mode is active before opening a position.',
        ],
      },
    },
    {
      id: 'topic-why-sizing-stop-loss-matters',
      slug: 'why-position-sizing-and-stop-loss-matters',
      order: 4,
      title: 'Why Position Sizing & Stop Loss Matters',
      excerpt:
        'The mathematical relationship between risk per trade and long-term capital survival — and why protecting your account from large losses is more important than chasing large wins.',
      readTime: '5 min read',
      level: 'Beginner',
      locked: false,
      thumbnail: '/images/education/stop-loss-matters-thumb.webp',
      image: '/images/education/stop-loss-matters.webp',
      content: {
        introduction:
          'The mathematics of drawdown recovery are asymmetric and deeply unfavourable. A 50% drawdown requires a 100% gain to return to breakeven. A 25% drawdown requires a 33% gain. These are not small numbers — they represent months or years of work that can be erased in days by a single series of oversized losses. Position sizing and stop losses are not risk management theory. They are account survival mechanics.',
        sections: [
          {
            heading: 'The Asymmetry of Drawdown',
            paragraphs: [
              'Every percentage point you lose requires a proportionally larger gain to recover. At small loss percentages the difference is manageable. At large loss percentages, recovery becomes statistically improbable for most retail traders.',
            ],
            bullets: [
              '10% loss → requires 11.1% gain to recover.',
              '20% loss → requires 25% gain to recover.',
              '30% loss → requires 42.9% gain to recover.',
              '50% loss → requires 100% gain to recover.',
              '75% loss → requires 300% gain to recover.',
            ],
          },
          {
            heading: 'Stop Losses as Capital Preservation Tools',
            paragraphs: [
              'A stop loss is not an admission of defeat — it is a mechanical enforcement of the maximum loss you decided to accept before emotion entered the equation. The moment a trade is open, your psychology is working against you. Confirmation bias makes losses feel temporary and profits feel inevitable. A pre-set stop loss removes that decision from your live emotional state and places it in your rational pre-trade planning.',
              'Wide stops are not inherently better than tight stops. A stop placed at a level where your trade thesis is definitively wrong is the correct stop — regardless of how many pips or dollars that represents. The position size is then adjusted to match your risk tolerance, not the other way around.',
            ],
          },
          {
            heading: 'Building a Risk-First Framework',
            paragraphs: [
              'Professional traders do not think about how much they want to make on a trade. They think about how much they are willing to lose if they are wrong, and then calculate the appropriate position size to keep that loss within their per-trade risk allocation. Profit is what happens when the market agrees with a correctly structured trade.',
            ],
            bullets: [
              'Define stop loss placement based on market structure, not on a dollar amount.',
              'Calculate position size from the stop loss distance and your risk percentage.',
              'Never move a stop loss further away from entry to avoid being stopped out.',
              'Treat stop loss hits as feedback, not failure — they represent the system working correctly.',
            ],
          },
        ],
        takeaways: [
          'Loss asymmetry means large drawdowns are mathematically catastrophic to recover from.',
          'A stop loss decided before entry is more reliable than one decided while the trade is live.',
          'Position sizing should flow from your stop distance, not from your profit target.',
          'Consistent small losses are survivable. Occasional catastrophic losses often are not.',
          'Risk management is not a constraint on profit — it is the foundation that makes profit sustainable.',
        ],
      },
    },
    {
      id: 'topic-understanding-position-sizing',
      slug: 'understanding-position-sizing',
      order: 5,
      title: 'Understanding Position Sizing',
      excerpt:
        'Step-by-step mechanics for calculating your correct position size in any market, on any exchange, with any leverage setting.',
      readTime: '7 min read',
      level: 'Beginner',
      locked: false,
      thumbnail: '/images/education/understanding-sizing-thumb.webp',
      image: '/images/education/understanding-sizing.webp',
      content: {
        introduction:
          'Position sizing is a calculation, not an intuition. The goal is to arrive at a precise contract quantity or dollar amount for each trade such that if your stop loss is hit, you lose exactly your predetermined risk allocation — no more. Once you internalise this as a repeatable process, your relationship with individual trade outcomes changes fundamentally.',
        sections: [
          {
            heading: 'The Core Formula',
            paragraphs: [
              'The inputs you need are your account size, your risk percentage per trade, your entry price, and your stop loss price. From these four data points, you can calculate your maximum position size before any trade.',
            ],
            bullets: [
              'Risk Amount ($) = Account Balance × Risk Percentage',
              'Stop Distance (%) = |Entry Price − Stop Loss Price| ÷ Entry Price',
              'Position Size ($) = Risk Amount ÷ Stop Distance',
              'Contract Quantity = Position Size ÷ Asset Price (for linear contracts)',
            ],
          },
          {
            heading: 'Linear vs Inverse Contracts',
            paragraphs: [
              'On crypto derivatives exchanges, contracts can be either linear (settled in USD or USDT) or inverse (settled in the base asset, typically BTC). The position sizing calculation differs between the two, and using the wrong formula on an inverse contract is a common source of unexpected risk.',
              'For linear contracts, profit and loss are calculated in the quote currency (USDT), making position sizing relatively straightforward. For inverse contracts, profit and loss are calculated in the base asset, which means your USD P&L fluctuates with the asset price even when the contract P&L is unchanged. Account for this when sizing inverse positions.',
            ],
          },
          {
            heading: 'Volatility-Adjusted Sizing',
            paragraphs: [
              'A more sophisticated approach adjusts position size based on current market volatility, typically measured by Average True Range (ATR). During high-volatility regimes, stops must be placed wider to avoid being triggered by noise, which mechanically reduces position size. During low-volatility regimes, tighter stops allow larger positions with the same risk allocation.',
              'This approach ensures that your dollar risk per trade remains constant while your position size fluctuates with market conditions — producing more consistent risk-adjusted performance across different market environments.',
            ],
            bullets: [
              'High volatility → wider stop → smaller position → same dollar risk.',
              'Low volatility → tighter stop → larger position → same dollar risk.',
              'ATR-based sizing prevents oversizing during choppy, unpredictable conditions.',
            ],
          },
        ],
        takeaways: [
          'Position sizing is a deterministic calculation — there is always a correct answer given your inputs.',
          'The four core inputs are: account balance, risk percentage, entry price, stop loss price.',
          'Linear and inverse contracts use different P&L mechanics — know which you are trading.',
          'Volatility-adjusted sizing maintains consistent risk exposure across changing market conditions.',
          'Calculate your position size before entry, every time, without exception.',
        ],
      },
    },
    {
      id: 'topic-price-action-context',
      slug: 'price-action-and-context',
      order: 6,
      title: 'Price Action & Context',
      excerpt:
        'Price does not move randomly. Understanding the context in which price action develops separates meaningful signals from meaningless noise.',
      readTime: '9 min read',
      level: 'Intermediate',
      locked: false,
      thumbnail: '/images/education/price-action-thumb.webp',
      image: '/images/education/price-action.webp',
      content: {
        introduction:
          'Price action is the study of how price moves — the patterns, sequences, and relationships between candles, levels, and time frames that reveal the intentions of market participants. But price action in isolation is incomplete. Context transforms a candlestick pattern from a random formation into a high-probability signal. Without context, you are pattern-matching. With context, you are reading the market.',
        sections: [
          {
            heading: 'What Context Actually Means',
            paragraphs: [
              'Context is the totality of conditions that exist around a price action signal. It includes the higher time frame trend direction, the proximity to significant structural levels, the current volatility regime, and the prevailing market sentiment. A bullish engulfing candle at a key support level in an established uptrend carries vastly different implications than the same candle in the middle of a range during a bearish macro environment.',
              'Most retail traders focus exclusively on the signal — the pattern — and ignore the context that determines whether the signal has any predictive value. This is why the same pattern can produce opposite outcomes in different conditions.',
            ],
            bullets: [
              'Higher time frame trend: Are you trading with or against the dominant trend?',
              'Structural significance: Is the level you are trading from a key area or an arbitrary price?',
              'Momentum context: Is the market exhibiting expansion or contraction in volatility?',
              'Volume profile: Where have participants historically shown interest?',
            ],
          },
          {
            heading: 'Reading Candles as Market Participant Behaviour',
            paragraphs: [
              'Every candle represents a battle between buyers and sellers within a defined time period. The open, high, low, and close tell a story about who was in control and whether that control was maintained or relinquished. A candle that opens at the low and closes near the high indicates aggressive buying and a complete rejection of lower prices. A doji at a key resistance level suggests indecision — neither side won the battle decisively.',
              'Context determines what the next likely chapter of that story will be. Indecision at resistance in a downtrend has very different implications from indecision at resistance that has been tested multiple times in an overall uptrend.',
            ],
          },
          {
            heading: 'Multi-Time Frame Analysis',
            paragraphs: [
              'Professional traders do not trade from a single time frame. They use higher time frames to identify the dominant trend and key structural levels, then drop to lower time frames to find precise entry triggers that align with the higher time frame bias. This top-down approach filters out a significant portion of low-probability signals.',
            ],
            bullets: [
              'Weekly and daily charts establish macro trend and major structural levels.',
              'Four-hour and one-hour charts reveal intermediate structure and swing points.',
              'Fifteen-minute and five-minute charts provide entry trigger refinement.',
              'Entry signals that conflict with the higher time frame bias carry lower probability.',
              'The highest-probability setups occur when multiple time frames align.',
            ],
          },
        ],
        takeaways: [
          'A signal without context is a guess. Context transforms a pattern into a probability assessment.',
          'Always identify the higher time frame trend before analysing entry-level price action.',
          'Key structural levels — areas where price has historically reacted — carry the most weight.',
          'Multi-time frame analysis filters noise and improves signal quality.',
          'The market tells a continuous story. Read the whole story, not just the current chapter.',
        ],
      },
    },
    {
      id: 'topic-self-introspection-mindset',
      slug: 'self-introspection-and-mindset',
      order: 7,
      title: 'Self-Introspection & Mindset',
      excerpt:
        'Your greatest edge in trading is not your system — it is your psychology. And your greatest vulnerability is the same thing.',
      readTime: '8 min read',
      level: 'Beginner',
      locked: false,
      thumbnail: '/images/education/mindset-thumb.webp',
      image: '/images/education/mindset.webp',
      content: {
        introduction:
          'Trading is one of the few activities where the direct, unmediated interaction between your psychology and financial outcomes happens in real time. Every bias, every fear, every unresolved ego issue eventually shows up in your trade history. The traders who survive and thrive over years are not the most analytically gifted — they are the most self-aware. Self-introspection is not a soft skill in trading. It is a core competency.',
        sections: [
          {
            heading: 'The Psychological Errors That Destroy Accounts',
            paragraphs: [
              'Most account-destroying behaviour stems from a small set of recurring psychological patterns. Understanding them intellectually is the first step. Recognising them in real time before they influence your decisions is the actual skill — one that takes years to develop.',
            ],
            bullets: [
              'Revenge trading: Attempting to recover losses through increasingly aggressive trades immediately after a loss. The market does not owe you a recovery.',
              'FOMO entries: Chasing price after a move has already developed because the fear of missing out overrides analytical judgement.',
              'Premature profit-taking: Closing winning trades early because the uncertainty of holding is psychologically uncomfortable.',
              'Loss aversion: Holding losing trades far beyond your stop because realising a loss feels more painful than the expected value calculation suggests it should.',
              'Overtrading: Trading out of boredom, the need for action, or a desire to generate returns faster than your edge actually allows.',
            ],
          },
          {
            heading: 'Building a Daily Self-Assessment Practice',
            paragraphs: [
              'The most effective traders treat their psychology like a professional athlete treats their physical condition — with consistent monitoring and deliberate recovery. A daily self-assessment practice does not need to be elaborate. Even five minutes of honest reflection before and after each trading session can reveal patterns that would otherwise remain invisible.',
              'The key questions are simple: What emotional state am I in right now? Am I trading to express an edge, or am I trading to feel something? Have recent trades — positive or negative — affected my objectivity?',
            ],
          },
          {
            heading: 'The Journal as a Mirror',
            paragraphs: [
              'A trading journal, maintained honestly, is one of the most effective self-introspection tools available. But most traders use it incorrectly — logging entries and exits but not the reasoning, the emotional state at entry, and the post-trade reflection. The numbers alone will not show you why you made the decisions you made. The narrative around the numbers will.',
            ],
            bullets: [
              'Log your emotional state before entering each trade — not just the trade setup.',
              'Record your reasoning: why this setup, why this size, why this stop location.',
              'After the trade closes, assess whether you executed your plan or deviated from it.',
              'Identify patterns in when you deviate: time of day, market conditions, recent P&L.',
              'Review your journal weekly for recurring themes, not just aggregate performance.',
            ],
          },
        ],
        takeaways: [
          'Trading psychology is not separate from trading performance — it is a primary driver of it.',
          'Self-awareness developed off the screen is the only thing you can bring to the screen.',
          'A five-minute daily reflection practice compounds into significant psychological edge over months.',
          'Your journal is your primary tool for converting experience into genuine improvement.',
          'The goal is not to eliminate emotion — it is to prevent emotion from making decisions that your plan should make.',
        ],
      },
    },
  ],
};

// ─── Module 2: Trade Management ────────────────────────────────────────────────

const tradeManagement: LearningModule = {
  id: 'module-trade-management',
  title: 'Trade Management',
  summary: 'How to manage a trade from entry to exit with discipline and consistency.',
  description:
    'Entry is only the beginning. How you manage a trade after it is open — where you move stops, when you take partial profits, how you respond to adverse price action — determines whether a positive expectation strategy actually generates positive results over time. Trade Management covers the mechanics and psychology of in-trade decision-making.',
  topics: [
    {
      id: 'topic-entry-triggers',
      slug: 'entry-triggers-and-trade-confirmation',
      order: 1,
      title: 'Entry Triggers & Trade Confirmation',
      excerpt:
        'The difference between a setup and an entry trigger — and why waiting for confirmation consistently improves risk-adjusted returns.',
      readTime: '6 min read',
      level: 'Intermediate',
      locked: false,
      thumbnail: '/images/education/entry-triggers-thumb.webp',
      image: '/images/education/entry-triggers.webp',
      content: {
        introduction:
          'A setup is a set of conditions that make a trade worth watching. An entry trigger is the specific price action event that confirms the setup is activating. Many traders enter on the setup rather than the trigger, which means they are frequently early, wrong, or both. The discipline of waiting for confirmation — at the cost of a slightly less optimal entry price — significantly improves overall trade quality.',
        sections: [
          {
            heading: 'Setups vs Triggers',
            paragraphs: [
              'A setup might be: price has retraced to a key support level in an uptrend, and RSI is showing oversold conditions on the four-hour chart. The trigger might be: a bullish engulfing candle closes on the one-hour chart at that support level. The setup tells you where to watch. The trigger tells you when to act.',
              'Entering on the setup alone means you are acting on potential rather than confirmation. Entering on the trigger means the market has given you at least one data point that suggests the setup is activating as expected.',
            ],
            bullets: [
              'A setup is a probability filter — it narrows the universe of possible trades.',
              'A trigger is a confirmation event — it is the specific reason for entry.',
              'Never enter on a setup alone. Always require a trigger that confirms the setup is activating.',
              'The trigger should be objectively defined before the trade, not improvised in the moment.',
            ],
          },
          {
            heading: 'Types of Entry Triggers',
            paragraphs: [
              'Different trading styles use different trigger types, but they all share the common characteristic of being observable, objective events rather than feelings or opinions.',
            ],
            bullets: [
              'Candlestick confirmation: A specific candle formation closes, confirming directional intent.',
              'Level reclaim: Price breaks below a level, then reclaims it, confirming the break was a false move.',
              'Momentum shift: A lower time frame trend shift that aligns with the higher time frame bias.',
              'Volume surge: A meaningful increase in volume at a key level, suggesting institutional participation.',
              'Order flow confirmation: The order book or tape shows aggressive market orders in the direction of the trade.',
            ],
          },
        ],
        takeaways: [
          'Setups define where to watch. Triggers define when to act.',
          'Requiring a trigger adds one layer of confirmation that reduces premature entries.',
          'Triggers should be defined objectively before the market reaches the setup level.',
          'Waiting for confirmation means accepting a slightly worse entry price in exchange for higher probability.',
          'Consistency in trigger selection allows performance analysis across a meaningful sample.',
        ],
      },
    },
    {
      id: 'topic-stop-management',
      slug: 'stop-management-and-trade-evolution',
      order: 2,
      title: 'Stop Management & Trade Evolution',
      excerpt:
        'When and how to move your stop loss as a trade develops — and the common mistakes that turn winning trades into losing ones.',
      readTime: '7 min read',
      level: 'Intermediate',
      locked: true,
      thumbnail: '/images/education/stop-management-thumb.webp',
      image: '/images/education/stop-management.webp',
      content: {
        introduction:
          'Moving a stop loss should be a deliberate, rule-based action — not a response to temporary market noise or emotional discomfort. Many traders unnecessarily complicate stop management by adjusting stops based on fear or greed rather than market structure. The result is trades that are stopped out prematurely on natural retracements, or trades that give back significant open profit because the stop was never moved to protect gains.',
        sections: [
          {
            heading: 'The Initial Stop Location',
            paragraphs: [
              'The initial stop loss should be placed at a level where the original trade thesis is definitively invalidated. For a long trade at support, the initial stop belongs below the support level — ideally below the most recent swing low that defined that support. For a short trade at resistance, the stop belongs above the resistance level.',
              'Stops placed based on dollar amount or percentage rather than market structure are arbitrary. They may reflect your risk tolerance, but they do not reflect the market structure that makes your thesis valid or invalid.',
            ],
          },
          {
            heading: 'Trailing Stops and Structure-Based Movement',
            paragraphs: [
              'As a trade develops in your favour and creates new structural levels — higher lows in an uptrend, lower highs in a downtrend — you can move the stop to protect the gains associated with each new structural development. This approach locks in profit while still giving the trade room to continue in your direction.',
            ],
            bullets: [
              'Move stop to breakeven only after a meaningful structural confirmation of your bias.',
              'Trail the stop below each new higher low (in uptrends) or above each new lower high (in downtrends).',
              'Do not trail stops so tightly that normal market noise triggers the exit prematurely.',
              'Never move a stop further from entry to avoid being stopped out — this is the most destructive habit in trading.',
            ],
          },
        ],
        takeaways: [
          'Initial stop placement should be structure-based, not emotion-based.',
          'Move stops to breakeven only after meaningful structural confirmation, not after arbitrary price movement.',
          'Trailing stops below structural lows captures trend while protecting accumulated profit.',
          'Moving stops further away from entry to avoid losses violates the core principle of risk management.',
          'Consistent stop management rules produce consistent risk-adjusted outcomes across many trades.',
        ],
      },
    },
    {
      id: 'topic-partial-profits',
      slug: 'taking-partial-profits',
      order: 3,
      title: 'Taking Partial Profits',
      excerpt:
        'How to balance locking in gains with allowing winning trades to run — and when each approach is most appropriate.',
      readTime: '5 min read',
      level: 'Intermediate',
      locked: true,
      thumbnail: '/images/education/partial-profits-thumb.webp',
      image: '/images/education/partial-profits.webp',
      content: {
        introduction:
          'Taking partial profits is a risk management tool, not a sign of indecisiveness. By closing a portion of a position at a defined target, you reduce your exposure while maintaining participation in any further move. The appropriate use of partial profits depends on the nature of your setup, the market regime, and your overall trading objectives.',
        sections: [
          {
            heading: 'Why Partial Profits Make Mathematical Sense',
            paragraphs: [
              'When you take a partial profit at a key level, you accomplish several things simultaneously. You reduce the number of contracts at risk, which reduces the potential damage if the trade reverses. You realise a guaranteed gain on the closed portion. And you maintain exposure to any further directional move with a reduced position that can be managed with a tighter stop.',
            ],
            bullets: [
              'Close 50% at 1:1 risk-to-reward, move stop to breakeven, let the remainder run.',
              'Close 30% at the first target, 30% at the second target, hold 40% for the extended move.',
              'The exact split is less important than having a defined plan before entry.',
            ],
          },
          {
            heading: 'When to Hold vs When to Scale Out',
            paragraphs: [
              'In trending markets with strong momentum, scaling out too early can significantly reduce your overall profitability. In range-bound or choppy conditions, taking quick partial profits and tightening stops on the remainder protects against reversals that are more likely in those environments. Read the market regime, not just the individual trade.',
            ],
          },
        ],
        takeaways: [
          'Partial profit-taking reduces risk while maintaining upside participation.',
          'Define your scaling plan before entry — not during the trade when emotion is highest.',
          'Market regime should influence how aggressively you scale vs how much you let run.',
          'Moving stop to breakeven after first partial removes the possibility of a losing trade on remaining exposure.',
          'Consistency in partial profit methodology allows meaningful performance analysis.',
        ],
      },
    },
  ],
};

// ─── Module 3: Market Structure & Orderflow ────────────────────────────────────

const marketStructureOrderflow: LearningModule = {
  id: 'module-market-structure-orderflow',
  title: 'Market Structure & Orderflow',
  summary: 'Understanding how markets are actually structured and how professional participants move price.',
  description:
    'Market structure and orderflow analysis reveal the mechanical processes underlying price discovery. This module covers how institutional participants accumulate and distribute positions, how key structural levels are created and respected, and how orderflow data — the real-time record of buy and sell transactions — can provide a leading edge in trade timing and direction assessment.',
  topics: [
    {
      id: 'topic-wyckoff-accumulation',
      slug: 'wyckoff-accumulation-and-distribution',
      order: 1,
      title: 'Wyckoff Accumulation & Distribution',
      excerpt:
        'Richard Wyckoff identified the mechanics of how large operators accumulate and distribute positions over a century ago. Those mechanics remain relevant today.',
      readTime: '10 min read',
      level: 'Intermediate',
      locked: true,
      thumbnail: '/images/education/wyckoff-thumb.webp',
      image: '/images/education/wyckoff.webp',
      content: {
        introduction:
          "Wyckoff's work, developed in the early twentieth century, was based on direct observation of how large market operators — what we would today call institutional participants or smart money — systematically accumulate and distribute positions without revealing their hand to the retail public. The patterns he documented remain relevant because the underlying human psychology and market mechanics that produce them have not changed.",
        sections: [
          {
            heading: 'The Composite Operator',
            paragraphs: [
              "Wyckoff introduced the concept of the Composite Operator — an imagined single entity whose behaviour explains market movements. Rather than trying to track thousands of individual large players, Wyckoff suggested that markets behave as if there is one intelligent operator who executes a coordinated strategy. Understanding what that operator is doing — accumulating, marking up, distributing, or marking down — provides the framework for identifying high-probability entry and exit points.",
            ],
          },
          {
            heading: 'The Four Phases of the Market Cycle',
            paragraphs: [
              'Wyckoff identified four distinct phases that markets cycle through: Accumulation, Markup, Distribution, and Markdown. Each phase has identifiable characteristics in both price action and volume that allow the attentive analyst to identify transitions before they become obvious to the majority of market participants.',
            ],
            bullets: [
              'Accumulation: Large operators absorb supply from retail sellers at wholesale prices. Price range-bounds with increasing absorption of supply.',
              'Markup: Demand exceeds supply, price trends upward. Retail FOMO typically enters late in this phase.',
              'Distribution: Large operators offload positions to latecomers at premium prices. Price range-bounds again, but sellers are now absorbing buying interest.',
              'Markdown: Supply exceeds demand, price trends downward. The cycle completes and begins again at a new accumulation zone.',
            ],
          },
        ],
        takeaways: [
          "Wyckoff's framework explains price movement as the deliberate activity of large operators managing supply and demand.",
          'The four-phase cycle — accumulation, markup, distribution, markdown — repeats across all time frames.',
          'Volume analysis is essential in Wyckoff methodology — price and volume must be read together.',
          'Identifying the transition between phases provides the highest-probability entry opportunities.',
          'The framework is context, not a mechanical system — it requires interpretation and experience.',
        ],
      },
    },
    {
      id: 'topic-orderflow-basics',
      slug: 'orderflow-analysis-basics',
      order: 2,
      title: 'Orderflow Analysis Basics',
      excerpt:
        'The order book and tape reveal real-time information about who is buying and selling — and at what level of conviction.',
      readTime: '9 min read',
      level: 'Advanced',
      locked: true,
      thumbnail: '/images/education/orderflow-thumb.webp',
      image: '/images/education/orderflow.webp',
      content: {
        introduction:
          'Orderflow analysis is the study of individual orders as they execute in real time. Unlike price action, which records the outcome of the battle between buyers and sellers, orderflow shows you the battle as it is happening. This is not a lagging indicator — it is a real-time record of market participant behaviour at specific price levels.',
        sections: [
          {
            heading: 'Market Orders vs Limit Orders',
            paragraphs: [
              'Markets are driven by the interaction between two types of orders. Limit orders provide liquidity — they sit in the order book as resting bids and offers, waiting to be filled. Market orders consume liquidity — they execute immediately against the best available price in the order book. The aggression of a market participant is expressed through market orders. The supply they are willing to absorb or provide is expressed through limit orders.',
              'Aggressive buying — market buy orders hitting the ask — moves price upward. Aggressive selling — market sell orders hitting the bid — moves price downward. The orderflow analyst is tracking where this aggression is concentrated and whether it is being absorbed or accelerating.',
            ],
          },
          {
            heading: 'Reading the Depth of Market',
            paragraphs: [
              "The Depth of Market (DOM) or Level 2 data shows the resting limit orders in the order book at each price level. Large clusters of limit orders — walls — represent areas where significant supply or demand is expected. Whether those walls hold or are consumed by market order flow provides real-time information about which side of the market has greater conviction.",
            ],
            bullets: [
              'Large bid walls can represent genuine buying interest or spoofed orders designed to mislead.',
              'The absorption of a large bid wall by market sell orders without significant price decline suggests strong underlying demand.',
              'The consumption of a bid wall with price declining confirms the wall was insufficient to hold that level.',
              'Spoofing — large orders placed with no intention of filling — is illegal in regulated markets but detectable in patterns.',
            ],
          },
        ],
        takeaways: [
          'Orderflow is the real-time record of buying and selling aggression in the market.',
          'Price moves when market orders are more aggressive than the limit order liquidity can absorb.',
          'DOM analysis reveals where large participants expect price to find support or resistance.',
          'Volume at price — not just volume over time — is the most relevant data for orderflow analysis.',
          'Orderflow is a complement to structural analysis, not a replacement for it.',
        ],
      },
    },
  ],
};

// ─── Module 4: Trader Psychology ───────────────────────────────────────────────

const traderPsychology: LearningModule = {
  id: 'module-trader-psychology',
  title: 'Trader Psychology',
  summary: 'The mental disciplines that separate long-term traders from short-term gamblers.',
  description:
    'Market psychology is not a separate discipline from market analysis — it is woven into every decision you make. This module explores the cognitive biases, emotional patterns, and behavioural tendencies that cause traders to consistently act against their own interests, and provides practical frameworks for building psychological resilience and decision-making consistency.',
  topics: [
    {
      id: 'topic-cognitive-biases',
      slug: 'cognitive-biases-in-trading',
      order: 1,
      title: 'Cognitive Biases That Cost Traders Money',
      excerpt:
        'Confirmation bias, anchoring, and the disposition effect are systematic errors in human reasoning that the market exploits relentlessly.',
      readTime: '8 min read',
      level: 'Intermediate',
      locked: false,
      thumbnail: '/images/education/cognitive-biases-thumb.webp',
      image: '/images/education/cognitive-biases.webp',
      content: {
        introduction:
          'Cognitive biases are systematic errors in thinking that affect the decisions and judgements we make. In everyday life, these biases often have minor consequences. In financial markets, where decisions with financial stakes are made repeatedly under uncertainty, cognitive biases compound into significant and measurable performance degradation. Understanding them is necessary — but it is not sufficient. You must build systems that correct for them.',
        sections: [
          {
            heading: 'Confirmation Bias',
            paragraphs: [
              'Confirmation bias is the tendency to search for, interpret, and recall information in a way that confirms your pre-existing beliefs. In trading, this manifests as looking for evidence that supports your current position while unconsciously dismissing evidence that suggests you might be wrong.',
              'The antidote is deliberate disconfirmation — actively seeking the strongest possible argument against your current trade before entry, and genuinely considering whether that argument changes your assessment.',
            ],
          },
          {
            heading: 'The Disposition Effect',
            paragraphs: [
              'The disposition effect is the empirically documented tendency for investors to sell winning positions too early and hold losing positions too long. It is driven by loss aversion — the psychological reality that losses are felt approximately twice as intensely as equivalent gains. The result is a systematic bias toward realising small profits while allowing large losses to accumulate.',
            ],
            bullets: [
              'Define profit targets and stop losses before entry to remove in-trade discretion.',
              'Use a pre-defined trailing stop system rather than subjective exit decisions.',
              'Track your average winner and average loser sizes and compare them quarterly.',
              'Introduce a mandatory waiting period before any decision to close a profitable position early.',
            ],
          },
          {
            heading: 'Anchoring',
            paragraphs: [
              'Anchoring occurs when a trader fixates on a specific price point — typically their entry price — and evaluates subsequent price action relative to that anchor rather than relative to current market conditions. A trader anchored to their entry at $50,000 may hold a losing long position far beyond rational analysis suggests because "price was just here, it will come back."',
              'The market does not know or care where you entered. Price action has no memory of your personal trade history. Evaluating the trade from its current state, with fresh eyes and current market context, produces better decisions than evaluating it relative to an arbitrary anchor.',
            ],
          },
        ],
        takeaways: [
          'Cognitive biases are systematic — they affect everyone, including experienced traders.',
          'Confirmation bias requires active, deliberate disconfirmation to counteract.',
          'The disposition effect produces the exact opposite of rational risk management: selling winners early, holding losers.',
          'Anchoring to entry price distorts objective assessment of current market conditions.',
          'Rules-based systems are more reliable than discretionary judgement precisely because they do not have biases.',
        ],
      },
    },
    {
      id: 'topic-process-over-outcome',
      slug: 'process-over-outcome-thinking',
      order: 2,
      title: 'Process Over Outcome Thinking',
      excerpt:
        'A good process can produce a bad outcome. A bad process can produce a good outcome. Only one of these should influence how you evaluate your decisions.',
      readTime: '6 min read',
      level: 'Intermediate',
      locked: true,
      thumbnail: '/images/education/process-outcome-thumb.webp',
      image: '/images/education/process-outcome.webp',
      content: {
        introduction:
          'In trading, as in any probabilistic domain, the quality of a decision and the quality of the outcome are not the same thing. A well-reasoned, properly sized trade with an appropriate stop loss can still result in a loss if the market moves adversely. A reckless, oversized trade taken without a stop can still result in a profit if the market happens to move in your direction. Evaluating your decisions based on outcomes rather than process is one of the most destructive habits a trader can develop.',
        sections: [
          {
            heading: 'Why Outcomes Are Misleading Feedback',
            paragraphs: [
              'Because markets have a probabilistic element, any individual trade outcome tells you very little about whether the decision to take that trade was correct. Over a large enough sample — typically 100 or more trades — patterns in decision quality begin to emerge. But evaluating individual trades as good or bad based on whether they made or lost money is like evaluating a coin-flip strategy based on a single flip.',
              'The specific problem is that outcome-based evaluation reinforces bad process when that process occasionally produces winning trades, and undermines good process when that process occasionally produces losing trades. Over time, this creates a systematic drift toward lower-quality decision-making.',
            ],
          },
          {
            heading: 'Defining and Measuring Process Quality',
            paragraphs: [
              'Process quality can only be evaluated against a defined process. This is why having written trading rules is essential — not just in principle, but as a prerequisite for meaningful performance review. Without defined rules, there is nothing to measure your decisions against.',
            ],
            bullets: [
              'Did I follow my entry rules? Was the trigger present?',
              'Was my position size calculated correctly from my stop distance?',
              'Was my stop placed at the correct structural location?',
              'Did I manage the trade according to my pre-defined rules?',
              'Did I close the trade at the planned target or stop — or did I deviate? Why?',
            ],
          },
        ],
        takeaways: [
          'Outcome quality and decision quality are correlated over large samples but uncorrelated in individual cases.',
          'Evaluating decisions based on outcomes creates systematic drift toward poor process.',
          'Good process requires documented rules that can be objectively reviewed.',
          'The goal of the review process is to identify systematic process errors, not to celebrate or mourn individual outcomes.',
          'Consistent adherence to a sound process is the only reliable path to positive expectation over time.',
        ],
      },
    },
    {
      id: 'topic-managing-drawdowns',
      slug: 'managing-drawdowns-psychologically',
      order: 3,
      title: 'Managing Drawdowns Psychologically',
      excerpt:
        'Every trader faces drawdowns. How you respond to them determines whether they are temporary setbacks or account-ending events.',
      readTime: '7 min read',
      level: 'Advanced',
      locked: true,
      thumbnail: '/images/education/drawdown-psychology-thumb.webp',
      image: '/images/education/drawdown-psychology.webp',
      content: {
        introduction:
          'A drawdown is not a sign that your strategy has stopped working. A drawdown is a mathematical inevitability for any strategy that trades probabilistically. Even a strategy with 70% win rate will experience sequences of consecutive losses. The question is not whether you will experience drawdowns — you will — but whether your psychological and mechanical responses during those drawdowns preserve your capital and your ability to continue trading.',
        sections: [
          {
            heading: 'The Compounding Psychological Pressure of Drawdowns',
            paragraphs: [
              'Drawdowns create a compounding psychological burden. Each successive loss amplifies the emotional difficulty of the next trade. The desire to "get it back" intensifies. The tendency to see setups that are not there increases. The willingness to deviate from rules — either by taking lower-quality trades or by abandoning the strategy entirely — grows.',
              'Recognising this pressure as predictable and managing it through pre-defined rules and exposure limits is more effective than attempting to maintain emotional equilibrium through willpower alone.',
            ],
          },
          {
            heading: 'Drawdown Protocols',
            paragraphs: [
              'A drawdown protocol is a pre-defined set of rules that activates when your account drawdown reaches specific thresholds. These rules exist to protect your capital during periods when either the market environment has temporarily invalidated your edge or your own psychology has temporarily degraded your decision quality.',
            ],
            bullets: [
              '5% drawdown: Review the last 10 trades for process quality. Identify any pattern of rule violations.',
              '10% drawdown: Reduce position size by 50% until two consecutive winning sessions are recorded.',
              '15% drawdown: Stop trading for a minimum of 48 hours. Review strategy performance data.',
              '20% drawdown: Stop trading. Seek external review of strategy and recent trade log.',
              'These thresholds should be calibrated to your specific strategy and volatility profile.',
            ],
          },
        ],
        takeaways: [
          'Drawdowns are mathematically inevitable — the question is how you respond to them.',
          'Pre-defined drawdown protocols remove in-the-moment decision-making during the highest-pressure periods.',
          'Reducing position size during drawdowns preserves capital and reduces the psychological weight of each trade.',
          'Mandatory breaks during severe drawdowns prevent revenge trading from compounding losses.',
          'Returning to a drawdown with a fresh psychological state consistently produces better outcomes than forcing through it.',
        ],
      },
    },
  ],
};

// ─── Module 5: Execution & Performance ────────────────────────────────────────

const executionAndPerformance: LearningModule = {
  id: 'module-execution-performance',
  title: 'Execution & Performance',
  summary: 'Translating analytical edge into consistent, measurable, improving trading performance.',
  description:
    'Having an edge is necessary but not sufficient. Executing that edge consistently, measuring the results accurately, and systematically improving performance over time requires a framework that most retail traders never build. This module covers the operational side of trading — from order execution mechanics to performance analytics to the structured review processes that separate improving traders from stagnating ones.',
  topics: [
    {
      id: 'topic-building-trading-plan',
      slug: 'building-a-trading-plan',
      order: 1,
      title: 'Building a Trading Plan',
      excerpt:
        'A trading plan is a written document that removes discretion from the decisions that should not be discretionary.',
      readTime: '8 min read',
      level: 'Beginner',
      locked: false,
      thumbnail: '/images/education/trading-plan-thumb.webp',
      image: '/images/education/trading-plan.webp',
      content: {
        introduction:
          'A trading plan is not a list of setups you are interested in. It is a comprehensive, written document that specifies exactly how you will conduct every aspect of your trading — from the markets you will trade, to the conditions under which you will enter, manage, and exit trades, to the rules that govern your psychology and risk management. Without a written plan, you are not trading a strategy. You are making a series of improvised decisions under emotional pressure.',
        sections: [
          {
            heading: 'Essential Components of a Trading Plan',
            paragraphs: [
              'A complete trading plan addresses every decision point you will encounter during a trading session. The more decisions your plan makes in advance, the fewer decisions you have to make in real time while capital is at risk.',
            ],
            bullets: [
              'Markets traded: Which assets, which exchanges, which instruments.',
              'Session hours: When you will and will not trade — including news event blackouts.',
              'Setup criteria: The specific conditions that must exist before a trade is considered.',
              'Entry trigger: The specific event that confirms entry — not the setup, the trigger.',
              'Position sizing rules: Exact methodology for calculating contract quantity.',
              'Stop loss placement rules: Where stops are placed and under what conditions they can be moved.',
              'Profit target rules: First target, second target, trailing stop activation.',
              'Risk limits: Maximum daily loss, maximum drawdown, position size limits.',
              'Review process: When and how you will review trades and update the plan.',
            ],
          },
          {
            heading: 'The Plan Must Be Testable',
            paragraphs: [
              'A trading plan that cannot be tested against historical data is incomplete. Every rule in the plan should be specific enough that a second person, reading it, could identify valid setups and execute trades that match what you would do. If the rules require interpretation that would produce different decisions in different people, they are not specific enough.',
            ],
          },
          {
            heading: 'Updating the Plan Without Abandoning It',
            paragraphs: [
              'Trading plans evolve as you accumulate performance data and as market conditions change. The key principle is to update the plan deliberately and systematically — based on data from a sufficient sample size — rather than updating it reactively after a losing period. Changing your approach after losses is often emotional noise, not informed improvement.',
            ],
          },
        ],
        takeaways: [
          'A trading plan removes discretion from decisions that should be made in advance, not in the moment.',
          'Every rule in the plan should be specific enough to be testable against historical data.',
          'The plan covers markets, sessions, setups, triggers, sizing, stops, targets, and risk limits.',
          'Update the plan based on data from sufficient sample sizes, not based on recent emotional experiences.',
          'Executing a well-defined plan poorly is still more productive than improvising well — because it is measurable.',
        ],
      },
    },
    {
      id: 'topic-performance-analytics',
      slug: 'performance-analytics-for-traders',
      order: 2,
      title: 'Performance Analytics for Traders',
      excerpt:
        'The metrics that actually tell you whether you are improving — and the ones that mislead most traders.',
      readTime: '9 min read',
      level: 'Advanced',
      locked: true,
      thumbnail: '/images/education/performance-analytics-thumb.webp',
      image: '/images/education/performance-analytics.webp',
      content: {
        introduction:
          'P&L is the most visible trading metric, but it is also one of the least informative for diagnosing performance. Over a small sample size, P&L reflects luck as much as skill. The metrics that reveal genuine performance quality — win rate adjusted for R-multiple, expectancy, maximum adverse excursion, process adherence rate — are rarely tracked by retail traders and almost never discussed. This module introduces a performance analytics framework designed to produce genuine insight.',
        sections: [
          {
            heading: 'Expectancy: The Only Metric That Matters',
            paragraphs: [
              'Expectancy is the average expected return per unit of risk across all trades. It combines win rate and reward-to-risk ratio into a single number that tells you whether your strategy has positive expectation over a large enough sample.',
              'Expectancy = (Win Rate × Average Win R-Multiple) − (Loss Rate × Average Loss R-Multiple)',
              'A positive expectancy above zero means the strategy is expected to be profitable over sufficient trades. A negative expectancy means the strategy is expected to lose money regardless of how disciplined the execution.',
            ],
            bullets: [
              'Win rate of 50%, average win of 2R, average loss of 1R → Expectancy = (0.5 × 2) − (0.5 × 1) = 0.5R per trade.',
              'Win rate of 30%, average win of 3R, average loss of 1R → Expectancy = (0.3 × 3) − (0.7 × 1) = 0.2R per trade.',
              'A positive expectancy does not guarantee profit over any individual trade or even any short sequence of trades.',
              'Expectancy only reveals itself reliably over 100+ trades with consistent execution.',
            ],
          },
          {
            heading: 'Tracking Beyond P&L',
            paragraphs: [
              'A comprehensive performance dashboard should include: expectancy by setup type, maximum adverse excursion (how far trades went against you before stopping out or turning), maximum favourable excursion (how far trades went in your favour before the final exit), process adherence rate (what percentage of trades followed all defined plan rules), and performance by market session and day of week.',
            ],
          },
        ],
        takeaways: [
          'P&L over a small sample tells you more about luck than about strategy quality.',
          'Expectancy — the average R-return per trade — is the single most informative strategy metric.',
          'A positive expectancy strategy still requires sufficient sample size before the expectancy is expressed.',
          'Maximum adverse and favourable excursion data reveals stop placement and exit timing efficiency.',
          'Process adherence rate connects psychological discipline directly to performance data.',
        ],
      },
    },
    {
      id: 'topic-structured-review',
      slug: 'structured-performance-review',
      order: 3,
      title: 'Structured Performance Review',
      excerpt:
        'How to review your trading systematically — so that every period of trading makes you measurably better at the next one.',
      readTime: '6 min read',
      level: 'Intermediate',
      locked: true,
      thumbnail: '/images/education/structured-review-thumb.webp',
      image: '/images/education/structured-review.webp',
      content: {
        introduction:
          'Experience without reflection does not produce improvement. Every week of trading produces data — trade outcomes, process adherence records, market observations — that can either be reviewed and converted into insight, or ignored and lost. Structured performance review is the process by which experience compounds into genuine expertise. Without it, you are likely to repeat the same errors indefinitely.',
        sections: [
          {
            heading: 'The Weekly Review Process',
            paragraphs: [
              'A weekly review should be conducted at the same time each week, outside of market hours, using your complete journal record for the week. The review is not about celebrating wins or dwelling on losses — it is about identifying patterns in your decision-making that are not visible on a trade-by-trade basis.',
            ],
            bullets: [
              'Calculate the week\'s expectancy and compare to historical average.',
              'Identify any trades where you deviated from plan rules — note why.',
              'Review the setups that generated the highest and lowest quality outcomes.',
              'Identify any patterns in when deviation occurs: time of day, after wins or losses, specific market conditions.',
              'Update the trading plan if the data from the week reveals a systematic issue.',
            ],
          },
          {
            heading: 'Monthly and Quarterly Reviews',
            paragraphs: [
              'Monthly and quarterly reviews operate at a higher level of abstraction. They are concerned with strategic questions: Is the overall strategy performing as expected given the current market environment? Are there setup types that are consistently underperforming? Has your psychological state or life circumstances changed in a way that is affecting trading performance?',
              'These reviews provide the data necessary to make informed, deliberate changes to your trading approach — rather than reactive changes driven by a bad week or month.',
            ],
          },
        ],
        takeaways: [
          'Experience without structured reflection does not compound into expertise.',
          'Weekly reviews identify decision-making patterns that are invisible at the individual trade level.',
          'Deviation from plan — and the reasons for it — is the most important data point in any review.',
          'Monthly reviews address strategic questions about setup performance and market environment fit.',
          'Structured review is what converts a trading journal from a record into a learning system.',
        ],
      },
    },
  ],
};

// ─── Export ────────────────────────────────────────────────────────────────────

// TODO:
// Replace local data with API response from:
// GET /education/modules
// GET /education/lessons

export const learningFrameworks: LearningModule[] = [
  marketFoundations,
  tradeManagement,
  marketStructureOrderflow,
  traderPsychology,
  executionAndPerformance,
];

export default learningFrameworks;
