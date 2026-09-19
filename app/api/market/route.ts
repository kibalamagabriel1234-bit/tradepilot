import { NextRequest, NextResponse } from 'next/server';

const cryptoMap: Record<string, string> = { BTCUSD: 'BTCUSDT', ETHUSD: 'ETHUSDT', SOLUSD: 'SOLUSDT' };
const forexSymbols = new Set(['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'NZDUSD', 'USDCAD', 'USDCHF', 'GBPJPY']);

async function json(url: string) {
  const response = await fetch(url, { next: { revalidate: 15 } });
  if (!response.ok) throw new Error(`Provider returned ${response.status}`);
  return response.json();
}

export async function GET(request: NextRequest) {
  const symbols = (request.nextUrl.searchParams.get('symbols') ?? 'BTCUSD,ETHUSD,EURUSD').split(',').map(s => s.trim().toUpperCase()).filter(Boolean).slice(0, 20);
  const prices = await Promise.all(symbols.map(async symbol => {
    try {
      if (cryptoMap[symbol]) {
        const data = await json(`https://api.binance.com/api/v3/ticker/24hr?symbol=${cryptoMap[symbol]}`);
        return { symbol, price: Number(data.lastPrice), change24h: Number(data.priceChangePercent), source: 'Binance', updatedAt: Date.now() };
      }
      if (forexSymbols.has(symbol)) {
        const base = symbol.slice(0, 3); const quote = symbol.slice(3, 6);
        const data = await json(`https://open.er-api.com/v6/latest/${base}`);
        const rate = Number(data.rates?.[quote]);
        if (!Number.isFinite(rate)) throw new Error('Rate unavailable');
        return { symbol, price: rate, change24h: null, source: 'ExchangeRate API', updatedAt: Date.now() };
      }
      if (process.env.TWELVEDATA_API_KEY) {
        const data = await json(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.TWELVEDATA_API_KEY}`);
        if (data.status === 'error') throw new Error(data.message);
        return { symbol, price: Number(data.close), change24h: Number(data.percent_change), source: 'Twelve Data', updatedAt: Date.now() };
      }
      return { symbol, price: null, change24h: null, source: 'No provider configured', updatedAt: Date.now(), error: 'Add TWELVEDATA_API_KEY for this instrument.' };
    } catch (error) {
      return { symbol, price: null, change24h: null, source: 'Provider error', updatedAt: Date.now(), error: error instanceof Error ? error.message : 'Unavailable' };
    }
  }));
  return NextResponse.json({ live: true, prices, fetchedAt: new Date().toISOString(), disclaimer: 'Prices are informational and may be delayed. No broker execution is connected.' });
}
