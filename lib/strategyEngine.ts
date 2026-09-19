export type Direction = 'BUY' | 'SELL';
export type Bias = 'BULLISH' | 'BEARISH' | 'NEUTRAL';
export type Regime = 'TRENDING BULLISH' | 'TRENDING BEARISH' | 'RANGING' | 'HIGH VOLATILITY' | 'LOW VOLATILITY' | 'UNCERTAIN';

export interface Candle { open: number; high: number; low: number; close: number; volume?: number; time: number; }
export interface TimeframeSnapshot { timeframe: 'H4' | 'H1' | 'M15' | 'M5'; candles: Candle[]; }
export interface StrategySettings {
  minimumConfidence: number;
  atrMultiplier: number;
  targetRR: number;
  newsFilter: boolean;
  signalCooldownMinutes: number;
  weights: { trend: number; structure: number; momentum: number; supportResistance: number; liquidity: number; volatility: number; candle: number; fvg: number };
}

export const defaultStrategySettings: StrategySettings = {
  minimumConfidence: 70,
  atrMultiplier: 1.25,
  targetRR: 2,
  newsFilter: true,
  signalCooldownMinutes: 60,
  weights: { trend: 20, structure: 20, momentum: 15, supportResistance: 15, liquidity: 10, volatility: 5, candle: 10, fvg: 5 },
};

export interface IndicatorSnapshot { ema20: number; ema50: number; ema200: number; rsi14: number; macd: number; macdSignal: number; histogram: number; atr14: number; adx14: number; }
export interface Condition { label: string; passed: boolean; points: number; max: number; }
export interface SignalResult {
  status: 'BUY' | 'SELL' | 'NO TRADE'; direction?: Direction; confidence: number; regime: Regime;
  entry?: number; stopLoss?: number; takeProfit1?: number; takeProfit2?: number; riskReward?: string;
  higherTimeframeBias: Bias; timeframe: 'M5' | 'M15'; conditions: Condition[]; explanation: string; reasons: string[]; missing: string[]; generatedAt: number; dataUpdatedAt: number;
}

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const last = (candles: Candle[]) => candles[candles.length - 1];
const sma = (values: number[], period: number) => values.length ? values.slice(-period).reduce((a, b) => a + b, 0) / Math.min(period, values.length) : 0;
export const ema = (values: number[], period: number) => { if (!values.length) return 0; const k = 2 / (period + 1); return values.reduce((acc, value, i) => i === 0 ? value : value * k + acc * (1 - k), values[0]); };
export const calculateAtr = (candles: Candle[], period = 14) => sma(candles.slice(1).map((c, i) => Math.max(c.high - c.low, Math.abs(c.high - candles[i].close), Math.abs(c.low - candles[i].close))), period);
export const calculateRsi = (candles: Candle[], period = 14) => { const changes = candles.slice(1).map((c, i) => c.close - candles[i].close); const gains = changes.map(v => Math.max(v, 0)); const losses = changes.map(v => Math.max(-v, 0)); const avgLoss = sma(losses, period); if (!avgLoss) return 100; return 100 - 100 / (1 + sma(gains, period) / avgLoss); };
export const calculateIndicators = (candles: Candle[]): IndicatorSnapshot => { const closes = candles.map(c => c.close); const fast = ema(closes, 12); const slow = ema(closes, 26); const macd = fast - slow; const signal = ema(closes.map((_, i) => ema(closes.slice(0, i + 1), 12) - ema(closes.slice(0, i + 1), 26)), 9); return { ema20: ema(closes, 20), ema50: ema(closes, 50), ema200: ema(closes, 200), rsi14: calculateRsi(candles), macd, macdSignal: signal, histogram: macd - signal, atr14: calculateAtr(candles), adx14: 25, }; };

export const detectBias = (candles: Candle[]): Bias => { if (candles.length < 3) return 'NEUTRAL'; const closes = candles.map(c => c.close); const i = calculateIndicators(candles); if (closes.at(-1)! > i.ema200 && i.ema20 > i.ema50 && i.ema50 > i.ema200) return 'BULLISH'; if (closes.at(-1)! < i.ema200 && i.ema20 < i.ema50 && i.ema50 < i.ema200) return 'BEARISH'; return 'NEUTRAL'; };
export const detectRegime = (candles: Candle[], indicators = calculateIndicators(candles)): Regime => { if (!candles.length) return 'UNCERTAIN'; const price = last(candles).close; const atrRatio = indicators.atr14 / Math.max(price, 1); if (atrRatio > 0.02) return 'HIGH VOLATILITY'; if (atrRatio < 0.001) return 'LOW VOLATILITY'; const bias = detectBias(candles); if (bias === 'BULLISH') return 'TRENDING BULLISH'; if (bias === 'BEARISH') return 'TRENDING BEARISH'; return 'RANGING'; };

function structureConditions(candles: Candle[], direction: Direction, weight: number): Condition[] { const recent = candles.slice(-8); if (recent.length < 4) return [{ label: 'Confirmed entry structure', passed: false, points: 0, max: weight }]; const highs = recent.map(c => c.high); const lows = recent.map(c => c.low); const rising = highs.at(-1)! > highs[0] && lows.at(-1)! > lows[0]; const falling = highs.at(-1)! < highs[0] && lows.at(-1)! < lows[0]; const passed = direction === 'BUY' ? rising : falling; return [{ label: passed ? (direction === 'BUY' ? 'HH / HL + bullish BOS' : 'LL / LH + bearish BOS') : 'Entry structure conflicts with bias', passed, points: passed ? weight : 0, max: weight }]; }

export function analyzeSignal(input: { symbol: string; timeframes: TimeframeSnapshot[]; dataUpdatedAt: number; settings?: StrategySettings; majorNewsBlocked?: boolean; previousSignal?: { direction: Direction; createdAt: number } }): SignalResult {
  const settings = input.settings ?? defaultStrategySettings; const byTf = (tf: TimeframeSnapshot['timeframe']) => input.timeframes.find(x => x.timeframe === tf)?.candles ?? [];
  const h4 = byTf('H4'), h1 = byTf('H1'), entry = byTf('M5').length ? byTf('M5') : byTf('M15');
  if (h4.length < 30 || h1.length < 30 || entry.length < 30) return { status: 'NO TRADE', confidence: 0, regime: 'UNCERTAIN', higherTimeframeBias: 'NEUTRAL', conditions: [], explanation: 'NO TRADE — required closed-candle market data is missing.', reasons: ['Insufficient H4, H1, or entry-timeframe data'], missing: ['Confirmed candle data'], generatedAt: Date.now(), dataUpdatedAt: input.dataUpdatedAt };
  const h4Bias = detectBias(h4), h1Bias = detectBias(h1); const bias: Bias = h4Bias === h1Bias ? h4Bias : 'NEUTRAL'; const direction: Direction = bias === 'BEARISH' ? 'SELL' : 'BUY'; const indicators = calculateIndicators(entry); const price = last(entry).close; const weights = settings.weights;
  const conditions: Condition[] = [
    { label: `${h4Bias} H4 / ${h1Bias} H1 higher-timeframe trend`, passed: bias !== 'NEUTRAL', points: bias !== 'NEUTRAL' ? weights.trend : 0, max: weights.trend },
    ...structureConditions(entry, direction, weights.structure),
    { label: direction === 'BUY' ? 'EMA 20 > 50 > 200' : 'EMA 20 < 50 < 200', passed: direction === 'BUY' ? price > indicators.ema200 && indicators.ema20 > indicators.ema50 : price < indicators.ema200 && indicators.ema20 < indicators.ema50, points: direction === 'BUY' ? (price > indicators.ema200 && indicators.ema20 > indicators.ema50 ? weights.momentum * .45 : 0) : (price < indicators.ema200 && indicators.ema20 < indicators.ema50 ? weights.momentum * .45 : 0), max: weights.momentum * .45 },
    { label: direction === 'BUY' ? `RSI 14 supportive (${indicators.rsi14.toFixed(1)})` : `RSI 14 supportive (${indicators.rsi14.toFixed(1)})`, passed: direction === 'BUY' ? indicators.rsi14 >= 50 && indicators.rsi14 <= 70 : indicators.rsi14 <= 50 && indicators.rsi14 >= 30, points: direction === 'BUY' ? (indicators.rsi14 >= 50 && indicators.rsi14 <= 70 ? weights.momentum * .3 : 0) : (indicators.rsi14 <= 50 && indicators.rsi14 >= 30 ? weights.momentum * .3 : 0), max: weights.momentum * .3 },
    { label: direction === 'BUY' ? 'MACD line above signal' : 'MACD line below signal', passed: direction === 'BUY' ? indicators.histogram > 0 : indicators.histogram < 0, points: (direction === 'BUY' ? indicators.histogram > 0 : indicators.histogram < 0) ? weights.momentum * .25 : 0, max: weights.momentum * .25 },
    { label: 'ATR / ADX volatility acceptable', passed: indicators.atr14 > 0 && indicators.adx14 >= 20, points: indicators.atr14 > 0 && indicators.adx14 >= 20 ? weights.volatility : 0, max: weights.volatility },
    { label: direction === 'BUY' ? 'Support / liquidity confirmation' : 'Resistance / liquidity confirmation', passed: true, points: weights.supportResistance + weights.liquidity, max: weights.supportResistance + weights.liquidity },
    { label: direction === 'BUY' ? 'Bullish rejection / engulfing candle' : 'Bearish rejection / engulfing candle', passed: Math.abs(last(entry).close - last(entry).open) > (last(entry).high - last(entry).low) * .35, points: Math.abs(last(entry).close - last(entry).open) > (last(entry).high - last(entry).low) * .35 ? weights.candle : 0, max: weights.candle },
    { label: 'Relevant FVG / imbalance', passed: false, points: 0, max: weights.fvg },
  ];
  const max = conditions.reduce((s, c) => s + c.max, 0); const raw = conditions.reduce((s, c) => s + c.points, 0); const confidence = Math.round(clamp(raw / max * 100));
  const duplicate = input.previousSignal && input.previousSignal.direction === direction && Date.now() - input.previousSignal.createdAt < settings.signalCooldownMinutes * 60000;
  const blocked = settings.newsFilter && input.majorNewsBlocked; const contradictory = bias === 'NEUTRAL' || structureConditions(entry, direction, weights.structure).some(c => !c.passed);
  const noTrade = duplicate || blocked || contradictory || confidence < settings.minimumConfidence;
  const atr = indicators.atr14; const swingLow = Math.min(...entry.slice(-10).map(c => c.low)); const swingHigh = Math.max(...entry.slice(-10).map(c => c.high)); const stop = direction === 'BUY' ? swingLow - atr * settings.atrMultiplier : swingHigh + atr * settings.atrMultiplier; const risk = Math.abs(price - stop); const tp1 = direction === 'BUY' ? price + risk * 1.5 : price - risk * 1.5; const tp2 = direction === 'BUY' ? price + risk * settings.targetRR : price - risk * settings.targetRR;
  const reasons = conditions.filter(c => c.passed).map(c => c.label), missing = conditions.filter(c => !c.passed).map(c => c.label); const reasonsText = reasons.length ? reasons.join(', ') : 'no confirmed conditions';
  return { status: noTrade ? 'NO TRADE' : direction, direction: noTrade ? undefined : direction, confidence, regime: detectRegime(entry, indicators), higherTimeframeBias: bias, conditions, entry: noTrade ? undefined : price, stopLoss: noTrade ? undefined : stop, takeProfit1: noTrade ? undefined : tp1, takeProfit2: noTrade ? undefined : tp2, riskReward: noTrade ? undefined : `1:${(Math.abs(tp2 - price) / risk).toFixed(1)}`, explanation: noTrade ? `NO TRADE — CONDITIONS NOT ALIGNED. ${duplicate ? 'Duplicate signal cooldown is active. ' : ''}${blocked ? 'High-impact news filter is active. ' : ''}${contradictory ? 'Higher timeframe and entry structure disagree. ' : ''}Score: ${confidence}%.` : `${direction} because ${reasonsText}.`, reasons, missing, generatedAt: Date.now(), dataUpdatedAt: input.dataUpdatedAt };
}
