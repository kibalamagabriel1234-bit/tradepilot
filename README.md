# TradePilot — Finished Trading Terminal

A complete browser-based trading analysis terminal using Twelve Data for market prices/candles and manual account values.

## What is live
- Twelve Data OHLC candles
- Twelve Data quotes
- Symbol + timeframe switching
- Market structure analysis
- BOS / CHoCH
- Liquidity levels and sweeps
- Fair Value Gaps
- Order-block style POIs
- Premium / discount
- Support/resistance
- EMA / RSI / MACD / ATR
- Multi-timeframe bias
- Weighted confluence 0–100
- Reversal / continuation / breakout / range signal classification
- Explicit NO TRADE engine
- Risk calculator
- Trade planner
- Journal
- Trade history
- Daily plan
- Watchlist
- Alerts stored locally
- Backtest-style signal review on loaded historical candles
- Analytics dashboard
- Psychology checklist
- Demo mode
- Manual balance/equity/P&L/risk fields
- Responsive mobile/desktop UI

## Important account-data rule
Balance, equity, daily P/L, risk limits and similar account values are manual. The site does not connect to a broker for account information.

## Setup
1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Put your Twelve Data API key in `.env`.
4. Run `npm install`.
5. Run `npm start`.
6. Open http://localhost:3000

The API key is kept server-side.

Twelve Data's REST API provides historical/intraday OHLC data. Real-time quote streaming is available through its WebSocket service depending on the Twelve Data plan. This build uses the secure server-side REST endpoints for candles and quotes so it works without exposing the API key in the browser. Check your Twelve Data plan and licensing before public/commercial redistribution of market data.
