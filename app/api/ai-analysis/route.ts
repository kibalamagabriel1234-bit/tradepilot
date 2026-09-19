import { NextRequest, NextResponse } from 'next/server';
import { buildLocalAIAnalysis } from '@/lib/tradingEngines';
import type { SignalResult } from '@/lib/strategyEngine';

export async function POST(request: NextRequest) {
  try {
    const signal = (await request.json()) as SignalResult;
    if (!signal || typeof signal.confidence !== 'number' || !signal.explanation) return NextResponse.json({ error: 'A measured signal result is required.' }, { status: 400 });
    const local = buildLocalAIAnalysis(signal);
    // Optional provider hook: keep API keys server-side and fall back safely when unavailable.
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ mode: 'local-explainable', ...local });
    return NextResponse.json({ mode: 'local-explainable', ...local, providerReady: true, note: 'Connect a server-side model adapter here; never expose provider keys in the browser.' });
  } catch { return NextResponse.json({ error: 'Unable to analyze signal.' }, { status: 500 }); }
}
