import { activeSignals, confluenceBreakdown, dailyPlanChecklist, economicCalendar, emotionalStats, journalEntries, marketStats, multiTimeframe, noTradeReasons, riskPlanner, sessions, tradeHistory, watchlist } from './mockData';

export default function SignalsStrategyPanel() {
  return null;
}

export const strategySnapshot = {
  title: 'Multi-timeframe confluence strategy',
  description: 'H4/H1 establish directional bias; M15/M5 seek confirmed entries. EMA 20/50/200, RSI 14, MACD 12/26/9, ATR 14 and ADX 14 are weighted confirmations—not standalone triggers.',
  timeframes: ['H4', 'H1', 'M15', 'M5'],
  regime: 'TRENDING BULLISH',
  settings: { minimumConfidence: 70, atrMultiplier: 1.25, targetRR: 2, newsFilter: true, cooldownMinutes: 60 },
  weights: { trend: 20, structure: 20, momentum: 15, supportResistance: 15, liquidity: 10, volatility: 5, candle: 10, fvg: 5 },
  signals: activeSignals,
  confluenceBreakdown,
  noTradeReasons,
  dataSources: { market: 'Provider adapter required for live data', news: 'Provider adapter required for live news', demo: true },
  dashboard: { marketStats, watchlist, multiTimeframe, journalEntries, economicCalendar, dailyPlanChecklist, emotionalStats, sessions, riskPlanner, tradeHistory },
};
