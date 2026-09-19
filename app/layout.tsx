import {
  accountMetrics,
  activeSignals,
  confluenceBreakdown,
  dailyPlanChecklist,
  economicCalendar,
  emotionalStats,
  equityCurve,
  journalEntries,
  marketStats,
  marketStructure,
  multiTimeframe,
  noTradeReasons,
  recentTrades,
  riskPlanner,
  sessions,
  strategySummary,
  tradeHistory,
  watchlist,
} from './mockData';

export type SignalDirection = 'BUY' | 'SELL';

export interface SignalCardData {
  symbol: string;
  direction: SignalDirection;
  confluence: number;
  setup: string;
  entry: number;
  stop: number;
  tp: number;
  rr: string;
  tf: string;
  bias: string;
  status: 'ACTIVE' | 'WATCH' | 'NO TRADE';
}

export const getConfluenceLabel = (value: number) => {
  if (value >= 90) return 'VERY STRONG CONFLUENCE';
  if (value >= 80) return 'STRONG CONFLUENCE';
  if (value >= 70) return 'GOOD CONFLUENCE';
  if (value >= 60) return 'MODERATE SETUP';
  if (value >= 50) return 'WEAK SETUP';
  return 'NO TRADE';
};

export const getSignalCards = (): SignalCardData[] => activeSignals as SignalCardData[];

export const getUiModel = () => ({
  accountStats: marketStats,
  equityCurve,
  watchlist,
  marketStructure,
  recentTrades,
  journalEntries,
  economicCalendar,
  dailyPlanChecklist,
  tradeHistory,
  multiTimeframe,
  confluenceBreakdown,
  noTradeReasons,
  accountMetrics,
  emotionalStats,
  sessions,
  riskPlanner,
  strategySummary,
});

export const calculateConfluence = (components: number[]) => {
  const total = components.reduce((sum, item) => sum + item, 0);
  return Math.max(0, Math.min(100, total / Math.max(components.length, 1)));
};

export const createTradeSignal = (
  symbol: string,
  direction: SignalDirection,
  entry: number,
  stop: number,
  tp: number,
  confluenceComponents: number[],
  setup: string,
  timeframe: string,
): SignalCardData => {
  const total = calculateConfluence(confluenceComponents);
  const normalized = Math.round(total);

  return {
    symbol,
    direction,
    confluence: normalized,
    setup,
    entry,
    stop,
    tp,
    rr: `${(Math.abs(tp - entry) / Math.max(Math.abs(entry - stop), 1)).toFixed(1)}:1`,
    tf: timeframe,
    bias: direction === 'BUY' ? 'Bullish' : 'Bearish',
    status: normalized >= 50 ? 'ACTIVE' : 'NO TRADE',
  };
};

export const getConfluenceExplanation = () =>
  'Confluence percentage measures the alignment of configured analysis conditions. It is not a guaranteed probability of trade success.';
