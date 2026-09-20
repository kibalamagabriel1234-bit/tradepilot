'use client';

import { useEffect, useMemo, useState } from 'react';
import { activeSignals, economicCalendar, marketStats, multiTimeframe, watchlist } from '@/lib/mockData';

const nav = ['Dashboard', 'Terminal', 'Markets', 'Signals', 'Trade Planner', 'Journal', 'Analytics', 'Backtester', 'Economic Calendar', 'Risk Manager', 'Psychology', 'Daily Plan', 'Alerts', 'Trade History', 'Settings'];
const symbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'BTCUSD', 'ETHUSD', 'SOLUSD', 'NAS100'];
const brokerOptions = ['JustMarkets', 'Markets.com', 'Exness', 'HFM', 'FBS', 'Deriv'];
const structureTargets: Record<string, { tp1: number; tp2: number; reason: string }> = {
  XAUUSD: { tp1: 3426.2, tp2: 3432.5, reason: 'prior intraday high + external liquidity' },
  EURUSD: { tp1: 1.0872, tp2: 1.0896, reason: 'swing high + opposing supply' },
  BTCUSD: { tp1: 61420, tp2: 61010, reason: 'range midpoint + sell-side liquidity' },
};

type LivePrice = { symbol: string; price: number | null; change24h: number | null; source: string; updatedAt: number };
type SignalStatus = 'ACTIVE' | 'TP 1 HIT' | 'TP 2 HIT' | 'STOP LOSS HIT' | 'CLOSED';
type TrackedSignal = { status: SignalStatus; taken: boolean; updatedAt: string };

export default function TradePilotPage() {
  const [selected, setSelected] = useState('Dashboard');
  const [query, setQuery] = useState('');
  const [prices, setPrices] = useState<LivePrice[]>([]);
  const [updated, setUpdated] = useState('');
  const [balance, setBalance] = useState('10000');
  const [risk, setRisk] = useState('1');
  const [manualEntry, setManualEntry] = useState('');
  const [manualStop, setManualStop] = useState('');
  const [manualTarget, setManualTarget] = useState('');
  const [selectedBroker, setSelectedBroker] = useState('JustMarkets');
  const [brokerAccount, setBrokerAccount] = useState<'Demo' | 'Live'>('Demo');
  const [autoExecute, setAutoExecute] = useState(false);
  const [minConfidence, setMinConfidence] = useState('80');
  const [pair, setPair] = useState('EURUSD');
  const [breakEven, setBreakEven] = useState('20');
  const [partialClose, setPartialClose] = useState('50');
  const [tracked, setTracked] = useState<Record<string, TrackedSignal>>({});
  const [reEntryAllowed, setReEntryAllowed] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('tradepilot-signal-tracking');
    if (saved) setTracked(JSON.parse(saved));
    setReEntryAllowed(window.localStorage.getItem('tradepilot-re-entry') === 'true');
    const account = window.localStorage.getItem('tradepilot-manual-account');
    if (account) {
      const data = JSON.parse(account);
      setBalance(data.balance ?? '10000');
      setRisk(data.risk ?? '1');
    }
  }, []);

  const saveTracked = (next: Record<string, TrackedSignal>) => {
    setTracked(next);
    window.localStorage.setItem('tradepilot-signal-tracking', JSON.stringify(next));
  };

  const toggleReEntry = () => {
    setReEntryAllowed((current) => {
      const next = !current;
      window.localStorage.setItem('tradepilot-re-entry', String(next));
      return next;
    });
  };

  const loadPrices = async () => {
    const response = await fetch(`/api/market?symbols=${symbols.join(',')}`, { cache: 'no-store' });
    const data = await response.json();
    setPrices(data.prices ?? []);
    setUpdated(data.fetchedAt ?? '');
  };

  useEffect(() => {
    loadPrices();
    const timer = window.setInterval(loadPrices, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const liveRows = useMemo(() => {
    const rows = prices.length ? prices : watchlist.map((item) => ({ symbol: item.symbol, price: item.price, change24h: Number.parseFloat(item.chg.replace('%', '')) || 0, source: 'Demo feed', updatedAt: Date.now() }));
    return rows.filter((item) => item.symbol.toLowerCase().includes(query.toLowerCase()));
  }, [prices, query]);

  const activeTrades = Object.entries(tracked).filter(([, item]) => item.taken && !['TP 2 HIT', 'STOP LOSS HIT', 'CLOSED'].includes(item.status));
  const activeTrade = activeTrades[0];
  const riskAmount = Number(balance || 0) * Number(risk || 0) / 100;
  const distance = Math.abs(Number(manualEntry || 0) - Number(manualStop || 0));
  const reward = Math.abs(Number(manualTarget || 0) - Number(manualEntry || 0));
  const rr = distance > 0 ? reward / distance : 0;

  const takeSignal = (symbol: string) => {
    const alreadyTaken = tracked[symbol]?.taken && !['TP 2 HIT', 'STOP LOSS HIT', 'CLOSED'].includes(tracked[symbol].status);
    if (alreadyTaken) return;
    if (activeTrades.length > 0 && !reEntryAllowed) return;
    saveTracked({ ...tracked, [symbol]: { status: 'ACTIVE', taken: true, updatedAt: new Date().toISOString() } });
  };

  const updateSignalStatus = (symbol: string, status: SignalStatus) => {
    const current = tracked[symbol];
    if (!current?.taken) return;
    saveTracked({ ...tracked, [symbol]: { ...current, status, updatedAt: new Date().toISOString() } });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block"><div className="brand-mark">TP</div><div><div className="brand-name">TradePilot</div><div className="brand-subtitle">STRUCTURE · SIGNALS · EXECUTION</div></div></div>
        <nav className="nav-menu">{nav.map((item) => <button key={item} className={selected === item ? 'nav-item nav-item-active' : 'nav-item'} onClick={() => setSelected(item)}>{item}</button>)}</nav>
        <div className="sidebar-card"><div className="mini-label">Trade lock</div><strong className={activeTrades.length ? 'warning' : 'positive'}>{activeTrades.length ? `${activeTrades.length} ACTIVE TRADE${activeTrades.length > 1 ? 'S' : ''}` : 'READY FOR SIGNAL'}</strong><p className="caption-text">{activeTrades.length && !reEntryAllowed ? 'New signals are paused. Enable re-entry when you want another setup.' : reEntryAllowed ? 'Re-entry is enabled while existing trades remain active.' : 'Take a signal to pause competing signals.'}</p></div>
      </aside>

      <main className="main-panel">
        <header className="topbar"><div><div className="topbar-label">{selected}</div><h1>Premium structure-led trading terminal</h1></div><div className="topbar-actions"><input className="search-box" placeholder="Filter symbols" value={query} onChange={(e) => setQuery(e.target.value)} /><button className="action-button action-primary" onClick={loadPrices}>Refresh prices</button></div></header>
        <div className="notice"><strong>STRUCTURE-BASED TARGETS</strong><span>TP1 and TP2 follow swing structure, liquidity, supply and demand—not fixed R:R.</span><small>{updated ? `Updated ${new Date(updated).toLocaleTimeString()}` : 'Loading...'}</small></div>
        <section className="stats-grid">{marketStats.slice(0, 6).map((item) => <div className="stat-card" key={item.label}><div className="metric-label">{item.label}</div><div className="metric-value">{item.value}</div><div className="metric-trend positive">Account view</div></div>)}</section>

        <section className="content-grid">
          <div className="panel large-panel"><div className="panel-head"><div><div className="mini-label">Terminal</div><h2>Live market overview</h2></div><div className="panel-tools"><span>● Public data</span><span>{activeTrades.length ? 'Trade active' : 'No active trade'}</span></div></div><div className="chart-toolbar">{['1m', '5m', '15m', '1H', '4H', '1D'].map((tf) => <button key={tf} className={`timeframe ${tf === '1H' ? 'active' : ''}`}>{tf}</button>)}</div><div className="chart-box"><div className="chart-grid" />{Array.from({ length: 18 }, (_, i) => <span key={i} className="chart-bar" style={{ height: `${26 + ((i * 17) % 160)}px`, left: `${i * 5.4}%` }} />)}<div className="chart-label bull">STRUCTURE CONFIRMED</div><div className="chart-label fvg">POI / LIQUIDITY</div></div><div className="analysis-strip"><span>H4 <b className="positive">Bullish</b></span><span>H1 <b className="positive">Bullish</b></span><span>M15 <b className="positive">Bullish</b></span><span>M5 <b className="warning">Watch</b></span><span>Regime <b>Trend</b></span></div></div>
          <div className="panel"><div className="panel-head"><div><div className="mini-label">Live watchlist</div><h2>Provider prices</h2></div></div><div className="watchlist">{liveRows.map((item) => <button className="watch-row" key={item.symbol} onClick={() => setQuery(item.symbol)}><div><div className="symbol-name">{item.symbol}</div><div className="watch-meta">{item.source}</div></div><div className="watch-mid"><div className="watch-price">{item.price === null ? 'Unavailable' : item.price.toLocaleString(undefined, { maximumFractionDigits: 6 })}</div><div className={item.change24h !== null && item.change24h < 0 ? 'negative' : 'positive'}>{item.change24h === null ? '—' : `${item.change24h.toFixed(2)}%`}</div></div><span className="signal-badge buy">DATA</span></button>)}</div></div>
        </section>

        <section className="two-col-grid">
          <div className="panel"><div className="panel-head"><div><div className="mini-label">Signal engine</div><h2>Structure targets & status</h2></div><button className={reEntryAllowed ? 'toggle active' : 'toggle'} onClick={toggleReEntry} type="button">{reEntryAllowed ? 'RE-ENTRY ON' : 'ENABLE RE-ENTRY'}</button></div>{activeSignals.map((signal) => { const target = structureTargets[signal.symbol]; const record = tracked[signal.symbol]; const taken = Boolean(record?.taken && !['TP 2 HIT', 'STOP LOSS HIT', 'CLOSED'].includes(record.status)); const blocked = activeTrades.length > 0 && !reEntryAllowed && !taken; return <article className="signal-card" key={signal.symbol}><div className="signal-header"><div><div className="symbol-name">{signal.symbol}</div><span className="signal-pill buy">{signal.direction}</span></div><span className="confluence-pill">{signal.confluence}%</span></div><p className="setup-text">{signal.setup}</p><div className="trade-grid"><div><span>Entry</span><strong>{signal.entry}</strong></div><div><span>Stop</span><strong>{signal.stop}</strong></div><div><span>TP1 · structure</span><strong>{target?.tp1 ?? signal.tp}</strong></div><div><span>TP2 · structure</span><strong>{target?.tp2 ?? signal.tp}</strong></div><div><span>Target basis</span><strong>{target?.reason ?? 'market structure'}</strong></div><div><span>Status</span><strong className={record?.status === 'STOP LOSS HIT' ? 'negative' : record?.status?.includes('TP') ? 'positive' : 'warning'}>{record?.status ?? 'WAITING'}</strong></div></div><div className="signal-actions"><button className="action-button action-primary" disabled={blocked || taken} onClick={() => takeSignal(signal.symbol)}>{taken ? 'Trade taken' : blocked ? 'Paused by active trade' : reEntryAllowed && activeTrades.length ? 'Take re-entry' : 'I took this trade'}</button>{taken && <><button className="action-button" onClick={() => updateSignalStatus(signal.symbol, 'TP 1 HIT')}>TP1 hit</button><button className="action-button" onClick={() => updateSignalStatus(signal.symbol, 'TP 2 HIT')}>TP2 hit</button><button className="action-button" onClick={() => updateSignalStatus(signal.symbol, 'STOP LOSS HIT')}>Stop loss hit</button><button className="action-button" onClick={() => updateSignalStatus(signal.symbol, 'CLOSED')}>Close trade</button></>}</div>{record?.updatedAt && <small className="watch-meta">Tracked {new Date(record.updatedAt).toLocaleString()}</small>}</article>})}</div>
          <div className="stack"><div className="panel"><div className="panel-head"><div><div className="mini-label">Manual account</div><h2>Risk controls</h2></div></div><label className="field-label">Balance<input className="field" inputMode="decimal" value={balance} onChange={(e) => setBalance(e.target.value)} /></label><label className="field-label">Risk per trade %<input className="field" inputMode="decimal" value={risk} onChange={(e) => setRisk(e.target.value)} /></label><div className="manual-result"><span>Risk amount</span><strong>${riskAmount.toFixed(2)}</strong></div><button className="action-button action-primary full-width" onClick={() => window.localStorage.setItem('tradepilot-manual-account', JSON.stringify({ balance, risk }))}>Save manually</button></div><div className="panel"><div className="panel-head"><div><div className="mini-label">Trade planner</div><h2>Manual levels</h2></div></div><div className="planner-grid"><label className="field-label">Entry<input className="field" value={manualEntry} onChange={(e) => setManualEntry(e.target.value)} /></label><label className="field-label">Stop loss<input className="field" value={manualStop} onChange={(e) => setManualStop(e.target.value)} /></label><label className="field-label">Structure target<input className="field" value={manualTarget} onChange={(e) => setManualTarget(e.target.value)} /></label></div><div className="manual-result"><span>Reference R:R only</span><strong>{rr ? `1:${rr.toFixed(2)}` : 'Enter levels'}</strong></div></div></div>
        </section>

        <section className="panel compact-panel broker-panel"><div className="panel-head"><div><div className="mini-label">Broker automation</div><h2>Execution router</h2></div><span className="broker-status-label">{autoExecute ? 'Demo-ready' : 'Manual mode'}</span></div><div className="broker-grid"><div className="broker-options">{brokerOptions.map((broker) => <button key={broker} className={selectedBroker === broker ? 'broker-option active' : 'broker-option'} onClick={() => setSelectedBroker(broker)}><strong>{broker}</strong><small>{broker === 'Deriv' ? 'REST / WebSocket API' : 'MT5 EA / VPS'}</small><span>Demo-ready</span></button>)}</div><div className="broker-settings"><div className="inline-group"><label className="field-label compact-label">Account<select className="field" value={brokerAccount} onChange={(e) => setBrokerAccount(e.target.value as 'Demo' | 'Live')}><option>Demo</option><option>Live</option></select></label><label className="field-label compact-label">Pair<select className="field" value={pair} onChange={(e) => setPair(e.target.value)}>{symbols.map((symbol) => <option key={symbol}>{symbol}</option>)}</select></label></div><div className="inline-group"><label className="field-label compact-label">Minimum confidence %<input className="field" type="number" value={minConfidence} onChange={(e) => setMinConfidence(e.target.value)} /></label><label className="field-label compact-label">Auto execution<button className={autoExecute ? 'toggle active' : 'toggle'} onClick={() => setAutoExecute((value) => !value)} type="button">{autoExecute ? 'ON' : 'OFF'}</button></label></div><div className="inline-group"><label className="field-label compact-label">Break even pips<input className="field" type="number" value={breakEven} onChange={(e) => setBreakEven(e.target.value)} /></label><label className="field-label compact-label">Partial close %<input className="field" type="number" value={partialClose} onChange={(e) => setPartialClose(e.target.value)} /></label></div></div></div></section>

        <section className="panel compact-panel"><div className="panel-head"><div><div className="mini-label">Market context</div><h2>Structure and calendar</h2></div></div><div className="info-grid"><div className="mini-panel"><div className="mini-label">Multi-timeframe</div>{multiTimeframe.map((item) => <div key={item.label} className="mtf-row"><span>{item.label}</span><strong className="positive">{item.value}</strong></div>)}</div><div className="mini-panel"><div className="mini-label">Re-entry rule</div><p className="caption-text">Enable re-entry to receive another signal while one or more trades are active. Disable it to keep the one-trade lock.</p></div><div className="mini-panel"><div className="mini-label">Economic calendar</div>{economicCalendar.slice(0, 3).map((event) => <div key={event.time + event.event} className="event-row"><span>{event.time} · {event.currency}</span><strong>{event.event}</strong><b className={event.impact === 'High' ? 'warning' : 'positive'}>{event.impact}</b></div>)}</div></div></section>
      </main>
    </div>
  );
}
