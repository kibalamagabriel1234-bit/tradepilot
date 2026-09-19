export const marketStats = [
  { label: 'Account Balance', value: '$128,460.00', trend: '+2.4%' },
  { label: 'Equity', value: '$131,240.00', trend: '+3.1%' },
  { label: 'Today P/L', value: '+$2,140.00', trend: '+4.8%' },
  { label: 'Weekly P/L', value: '+$8,440.00', trend: '+7.9%' },
  { label: 'Monthly P/L', value: '+$18,960.00', trend: '+13.7%' },
  { label: 'Total P/L', value: '+$42,340.00', trend: '+48.2%' },
  { label: 'Win Rate', value: '63.4%', trend: '+1.2%' },
  { label: 'Profit Factor', value: '1.86', trend: '+0.14' },
  { label: 'Average R', value: '0.91R', trend: '+0.12R' },
  { label: 'Max Drawdown', value: '-8.7%', trend: '-0.9%' },
  { label: 'Current Drawdown', value: '-2.1%', trend: '-0.4%' },
  { label: 'Total Trades', value: '842', trend: '+21' },
  { label: 'Winning Trades', value: '534', trend: '+18' },
  { label: 'Losing Trades', value: '308', trend: '-11' },
  { label: 'Current Win Streak', value: '6', trend: 'hot' },
  { label: 'Current Loss Streak', value: '2', trend: 'cold' },
];

export const equityCurve = [
  { label: 'Jan', value: 104 },
  { label: 'Feb', value: 112 },
  { label: 'Mar', value: 120 },
  { label: 'Apr', value: 116 },
  { label: 'May', value: 128 },
  { label: 'Jun', value: 136 },
  { label: 'Jul', value: 142 },
  { label: 'Aug', value: 150 },
  { label: 'Sep', value: 146 },
  { label: 'Oct', value: 160 },
  { label: 'Nov', value: 171 },
  { label: 'Dec', value: 188 },
];

export const watchlist = [
  { symbol: 'EURUSD', price: 1.0854, chg: '+0.42%', spread: '0.1', session: 'London', trend: 'Bullish', confluence: 82, signal: 'BUY' },
  { symbol: 'XAUUSD', price: 3421.6, chg: '+1.14%', spread: '0.8', session: 'New York', trend: 'Bullish', confluence: 87, signal: 'BUY' },
  { symbol: 'BTCUSD', price: 61840, chg: '+2.56%', spread: '18', session: 'London', trend: 'Bullish', confluence: 76, signal: 'BUY' },
  { symbol: 'NAS100', price: 19612.4, chg: '-0.52%', spread: '1.2', session: 'New York', trend: 'Bearish', confluence: 71, signal: 'SELL' },
  { symbol: 'USDJPY', price: 147.84, chg: '+0.28%', spread: '0.2', session: 'Tokyo', trend: 'Bullish', confluence: 63, signal: 'BUY' },
  { symbol: 'GBPUSD', price: 1.2726, chg: '-0.66%', spread: '0.2', session: 'London', trend: 'Bearish', confluence: 68, signal: 'SELL' },
];

export const activeSignals = [
  {
    symbol: 'XAUUSD',
    direction: 'BUY',
    confluence: 87,
    setup: 'Liquidity sweep + bullish MSS + order block retest',
    entry: 3420.5,
    stop: 3414.5,
    tp: 3432.5,
    rr: '1:2',
    tf: 'M5',
    bias: 'Bullish',
    status: 'ACTIVE',
  },
  {
    symbol: 'EURUSD',
    direction: 'BUY',
    confluence: 81,
    setup: 'Bullish BOS + discount return + FVG retest',
    entry: 1.0848,
    stop: 1.0828,
    tp: 1.0896,
    rr: '1:2.8',
    tf: 'M15',
    bias: 'Bullish',
    status: 'ACTIVE',
  },
  {
    symbol: 'BTCUSD',
    direction: 'SELL',
    confluence: 74,
    setup: 'Failed breakout + supply zone + bearish CHoCH',
    entry: 61780,
    stop: 62120,
    tp: 61010,
    rr: '1:2.1',
    tf: 'H1',
    bias: 'Bearish',
    status: 'WATCH',
  },
];

export const marketStructure = [
  'Bullish structure on D1',
  'Higher highs confirmed on H4',
  'Liquidity sweep below prior swing low',
  'Bullish CHoCH in premium zone',
  'Order block mitigation at 1.0838',
  'FVG fill pending near 1.0850',
];

export const recentTrades = [
  { pair: 'EURUSD', side: 'BUY', pnl: '+$240', time: '09:45', status: 'Closed', result: 'Win' },
  { pair: 'XAUUSD', side: 'SELL', pnl: '+$380', time: '08:15', status: 'Closed', result: 'Win' },
  { pair: 'BTCUSD', side: 'BUY', pnl: '-$160', time: '07:05', status: 'Closed', result: 'Loss' },
  { pair: 'NAS100', side: 'SELL', pnl: '+$290', time: '05:40', status: 'Closed', result: 'Win' },
];

export const journalEntries = [
  { symbol: 'XAUUSD', direction: 'BUY', pnl: '+$420', r: '+1.8R', strategy: 'Liquidity Sweep', session: 'London', setup: 'OB + FVG + BOS' },
  { symbol: 'EURUSD', direction: 'SELL', pnl: '-$110', r: '-0.4R', strategy: 'Range Rejection', session: 'New York', setup: 'Supply + rejected candle' },
  { symbol: 'BTCUSD', direction: 'BUY', pnl: '+$610', r: '+2.4R', strategy: 'Trend Continuation', session: 'London', setup: 'Breakout + displacement' },
  { symbol: 'NAS100', direction: 'SELL', pnl: '+$340', r: '+1.6R', strategy: 'Trend Reversal', session: 'New York', setup: 'Bearish MSS + OB' },
];

export const economicCalendar = [
  { time: '08:30', currency: 'USD', event: 'CPI', impact: 'High', previous: '3.2%', forecast: '3.1%', actual: '3.0%' },
  { time: '13:30', currency: 'USD', event: 'NFP', impact: 'High', previous: '185K', forecast: '210K', actual: '218K' },
  { time: '14:00', currency: 'EUR', event: 'PMI', impact: 'Medium', previous: '51.2', forecast: '51.6', actual: '52.0' },
  { time: '18:00', currency: 'USD', event: 'FOMC', impact: 'High', previous: '5.25%', forecast: '5.00%', actual: '5.00%' },
  { time: '20:00', currency: 'GBP', event: 'GDP', impact: 'Medium', previous: '0.4%', forecast: '0.3%', actual: '0.2%' },
];

export const dailyPlanChecklist = [
  'Economic calendar checked',
  'Higher timeframe analyzed',
  'Market structure identified',
  'Liquidity identified',
  'POIs marked',
  'Risk calculated',
  'Entry planned',
  'Stop loss planned',
  'Take profit planned',
  'Avoided overtrading',
];

export const tradeHistory = [
  { date: '2026-09-18', symbol: 'XAUUSD', direction: 'BUY', entry: '3418.2', exit: '3431.4', sl: '3411.2', tp: '3436.8', pnl: '+$520', r: '+1.9R', confluence: '87%', strategy: 'Liquidity Sweep', session: 'London' },
  { date: '2026-09-17', symbol: 'EURUSD', direction: 'SELL', entry: '1.0872', exit: '1.0831', sl: '1.0894', tp: '1.0816', pnl: '+$310', r: '+1.4R', confluence: '81%', strategy: 'Break & Retest', session: 'New York' },
  { date: '2026-09-17', symbol: 'BTCUSD', direction: 'BUY', entry: '61290', exit: '61890', sl: '60780', tp: '62150', pnl: '+$730', r: '+2.7R', confluence: '89%', strategy: 'Trend Continuation', session: 'London' },
  { date: '2026-09-16', symbol: 'GBPUSD', direction: 'SELL', entry: '1.2740', exit: '1.2711', sl: '1.2762', tp: '1.2684', pnl: '-$140', r: '-0.6R', confluence: '64%', strategy: 'Range Rejection', session: 'London' },
];

export const multiTimeframe = [
  { label: 'D1', value: 'Bullish ✓' },
  { label: 'H4', value: 'Bullish ✓' },
  { label: 'H1', value: 'Bullish ✓' },
  { label: 'M15', value: 'Bullish ✓' },
  { label: 'M5', value: 'Bullish ✓' },
];

export const confluenceBreakdown = [
  { label: 'Higher TF Structure', value: '20/20' },
  { label: 'Liquidity', value: '15/15' },
  { label: 'Market Structure', value: '15/15' },
  { label: 'POI', value: '12/12' },
  { label: 'FVG', value: '8/8' },
  { label: 'Premium/Discount', value: '5/5' },
  { label: 'Support/Resistance', value: '5/5' },
  { label: 'Price Action', value: '5/5' },
  { label: 'Pattern', value: '3/3' },
  { label: 'EMA', value: '4/4' },
  { label: 'RSI', value: '3/3' },
  { label: 'MACD', value: '2/3' },
  { label: 'Displacement', value: '2/2' },
];

export const noTradeReasons = [
  'Conflicting higher timeframe structure',
  'No valid POI',
  'No liquidity sweep confirmed',
  'Price in middle of range',
  'Poor risk-to-reward',
  'Weak displacement',
  'Major news approaching',
  'Signal score below threshold',
];

export const accountMetrics = [
  { label: 'Daily P/L', value: '+$2,140', tone: 'up' },
  { label: 'Daily Risk', value: '0.85%', tone: 'neutral' },
  { label: 'Max Daily Risk', value: '1.50%', tone: 'neutral' },
  { label: 'Open Risk', value: '$1,280', tone: 'warning' },
  { label: 'Trades', value: '16', tone: 'neutral' },
];

export const emotionalStats = [
  { label: 'Confidence', value: '82%' },
  { label: 'Fear', value: '18%' },
  { label: 'Greed', value: '26%' },
  { label: 'Focus', value: '90%' },
  { label: 'Discipline', value: '84%' },
];

export const sessions = [
  { label: 'Sydney', active: false, time: 'GMT+10' },
  { label: 'Tokyo', active: false, time: 'GMT+9' },
  { label: 'London', active: true, time: 'GMT+1' },
  { label: 'New York', active: false, time: 'GMT-5' },
  { label: 'Uganda / EAT', active: false, time: 'GMT+3' },
];

export const riskPlanner = [
  { label: 'Account Balance', value: '$128,460' },
  { label: 'Risk %', value: '1.0%' },
  { label: 'Entry', value: '3420.50' },
  { label: 'Stop Loss', value: '3414.50' },
  { label: 'Take Profit', value: '3432.50' },
  { label: 'R:R', value: '1:2.0' },
  { label: 'Position Size', value: '0.82 lots' },
  { label: 'Risk Amount', value: '$128.46' },
  { label: 'Potential Profit', value: '$256.92' },
];

export const strategySummary = {
  title: 'TradePilot Strategy Framework',
  description:
    'Professional multi-factor signal engine combining structure, liquidity, POI, FVGs, price action, premium/discount, multi-timeframe alignment, and risk logic. Confluence measures alignment of configured analytical conditions and is not a guarantee of trade success.',
};
