# TradePilot

TradePilot is a responsive trading-terminal foundation with a modular, explainable signal strategy.

## Strategy implementation

- **H4/H1** determine the higher-timeframe bias; **M15/M5** are used for entry structure.
- EMA 20/50/200, RSI 14, MACD 12/26/9, ATR 14 and ADX 14 are weighted confirmations.
- Market structure, liquidity, support/resistance, candle confirmation and FVG are separate score components.
- Confidence is normalized to 0–100 and is explicitly **not** a win probability.
- Signals are blocked when data is insufficient, higher/entry structure conflicts, news filtering is active, confidence is below the setting, or a duplicate cooldown is active.
- Stops use recent swing structure plus an ATR multiplier; TP1 uses 1.5R and TP2 uses the configured target R.
- The demo dashboard remains labeled DEMO DATA. No live prices, broker connection, news, or profitability are claimed without provider adapters and confirmed subsequent data.

The live adapter boundary is `TimeframeSnapshot` in `lib/strategyEngine.ts`. Connect a market-data provider there before enabling live signal generation.
