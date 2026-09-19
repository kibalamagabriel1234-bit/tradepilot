import { activeSignals } from './mockData';
import { analyzeSignal, defaultStrategySettings, type SignalResult } from './strategyEngine';

export const getConfluenceLabel = (value: number) => value >= 80 ? 'STRONG SIGNAL' : value >= 70 ? 'VALID SIGNAL' : value >= 60 ? 'WEAK / WATCH' : 'NO TRADE';
export const getConfluenceExplanation = () => 'Confidence measures alignment of actual configured analytical conditions. It is not a probability of winning or a guarantee of success.';
export const getSignalCards = () => activeSignals;
export const getStrategySettings = () => defaultStrategySettings;
export const summarizeSignal = (signal: SignalResult) => ({ status: signal.status, confidence: signal.confidence, regime: signal.regime, explanation: signal.explanation, reasons: signal.reasons, missing: signal.missing });
