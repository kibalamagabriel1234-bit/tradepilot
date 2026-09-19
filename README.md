# TradePilot

TradePilot now includes an explainable, AI-assisted signal-analysis boundary. It does not invent prices or news and does not claim prediction accuracy.

- H4/H1 establish bias; M15/M5 search for entries.
- EMA 20/50/200, RSI 14, MACD 12/26/9, ATR 14 and ADX 14 are weighted confirmations.
- Market structure, support/resistance, liquidity sweeps, candle confirmation and FVGs are measured separately.
- Confidence is normalized from actual conditions, not a win probability.
- Contradictory structure, missing candles, news blocks, low scores and duplicate cooldowns produce NO TRADE.
- ATR plus recent swing structure determines stops; TP1 is 1.5R and TP2 uses the configured target.
- `POST /api/ai-analysis` produces local explainable commentary from a measured `SignalResult`. A future server-side model provider may be connected without exposing secrets.
- Demo content remains DEMO DATA. Connect a real market-data provider before enabling live analysis.
