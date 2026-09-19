'use client';

import { useEffect, useMemo, useState } from 'react';
import { activeSignals, marketStats, watchlist } from '@/lib/mockData';

const symbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'BTCUSD', 'ETHUSD', 'SOLUSD', 'NAS100'];
const nav = ['Dashboard', 'Terminal', 'Markets', 'Signals', 'Trade Planner', 'Journal', 'Analytics', 'Backtester', 'Economic Calendar', 'Risk Manager', 'Psychology', 'Daily Plan', 'Alerts', 'Trade History', 'Settings'];
type LivePrice = { symbol: string; price: number | null; change24h: number | null; source: string; error?: string; updatedAt: number };

export default function TradePilotPage() {
  const [selected, setSelected] = useState('Dashboard');
  const [query, setQuery] = useState('');
  const [prices, setPrices] = useState<LivePrice[]>([]);
  const [balance, setBalance] = useState('10000');
  const [risk, setRisk] = useState('1');
  const [manualEntry, setManualEntry] = useState('');
  const [manualStop, setManualStop] = useState('');
  const [manualTarget, setManualTarget] = useState('');
  const [updated, setUpdated] = useState('');

  const loadPrices = async () => {
    const response = await fetch(`/api/market?symbols=${symbols.join(',')}`, { cache: 'no-store' });
    const data = await response.json(); setPrices(data.prices ?? []); setUpdated(data.fetchedAt ?? '');
  };
  useEffect(() => { loadPrices(); const timer = window.setInterval(loadPrices, 30000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { const saved = window.localStorage.getItem('tradepilot-manual-account'); if (saved) { const data = JSON.parse(saved); setBalance(data.balance ?? '10000'); setRisk(data.risk ?? '1'); } }, []);
  const saveManual = () => window.localStorage.setItem('tradepilot-manual-account', JSON.stringify({ balance, risk }));
  const filtered = useMemo(() => prices.filter(x => x.symbol.includes(query.toUpperCase())), [prices, query]);
  const riskAmount = Number(balance || 0) * Number(risk || 0) / 100;
  const distance = Math.abs(Number(manualEntry || 0) - Number(manualStop || 0));
  const reward = Math.abs(Number(manualTarget || 0) - Number(manualEntry || 0));
  const rr = distance > 0 ? reward / distance : 0;

  return <div className="app-shell"><aside className="sidebar"><div className="brand-block"><div className="brand-mark">TP</div><div><div className="brand-name">TradePilot</div><div className="brand-subtitle">REAL PRICES · MANUAL ACCOUNT</div></div></div><nav className="nav-menu">{nav.map(item => <button key={item} className={selected === item ? 'nav-item nav-item-active' : 'nav-item'} onClick={() => setSelected(item)}>{item}</button>)}</nav><div className="sidebar-card"><div className="mini-label">Data status</div><strong className="positive">LIVE PROVIDER</strong><p className="caption-text">Market prices only. Account, risk and trades are entered manually and never sent to a broker.</p></div></aside><main className="main-panel"><header className="topbar"><div><div className="topbar-label">{selected}</div><h1>Real-market analysis terminal</h1></div><div className="topbar-actions"><input className="search-box" placeholder="Filter symbols" value={query} onChange={e => setQuery(e.target.value)} /><button className="action-button" onClick={loadPrices}>Refresh prices</button></div></header><div className="notice"><strong>MARKET DATA ONLY</strong><span>Prices are fetched from public providers. Your balance, risk, journal and trade plan are manual demo inputs; no broker is connected.</span><small>{updated ? `Updated ${new Date(updated).toLocaleTimeString()}` : 'Loading...'}</small></div><section className="stats-grid">{marketStats.slice(0, 6).map(item => <div className="stat-card" key={item.label}><div className="metric-label">{item.label}</div><div className="metric-value">{item.value}</div><div className="metric-trend positive">Demo account</div></div>)}</section><section className="content-grid"><div className="panel"><div className="panel-head"><div><div className="mini-label">Live watchlist</div><h2>Provider prices</h2></div></div><div className="watchlist">{filtered.map(item => <button className="watch-row" key={item.symbol} onClick={() => setQuery(item.symbol)}><div><div className="symbol-name">{item.symbol}</div><div className="watch-meta">{item.source}</div></div><div className="watch-mid"><div className="watch-price">{item.price === null ? 'Unavailable' : item.price.toLocaleString(undefined, { maximumFractionDigits: 6 })}</div><div className={item.change24h !== null && item.change24h < 0 ? 'negative' : 'positive'}>{item.change24h === null ? '—' : `${item.change24h.toFixed(2)}%`}</div></div><span className="signal-badge buy">DATA</span></button>)}</div></div><div className="panel"><div className="panel-head"><div><div className="mini-label">Manual account</div><h2>Risk controls</h2></div></div><label className="field-label">Account balance<input className="field" inputMode="decimal" value={balance} onChange={e => setBalance(e.target.value)} /></label><label className="field-label">Risk per trade %<input className="field" inputMode="decimal" value={risk} onChange={e => setRisk(e.target.value)} /></label><div className="manual-result"><span>Risk amount</span><strong>${riskAmount.toFixed(2)}</strong></div><button className="action-button action-primary full-width" onClick={saveManual}>Save manually</button><p className="caption-text">Stored locally in this browser. Not integrated with a broker.</p></div></section><section className="two-col-grid"><div className="panel"><div className="panel-head"><div><div className="mini-label">Manual trade planner</div><h2>Calculate before entry</h2></div></div><div className="planner-grid">{[['Entry', manualEntry, setManualEntry], ['Stop loss', manualStop, setManualStop], ['Take profit', manualTarget, setManualTarget]].map(([label, value, setter]) => <label className="field-label" key={label as string}>{label as string}<input className="field" inputMode="decimal" value={value as string} onChange={e => (setter as (v: string) => void)(e.target.value)} /></label>)}</div><div className="manual-result"><span>Manual R:R</span><strong>{rr ? `1:${rr.toFixed(2)}` : 'Enter levels'}</strong></div><p className="caption-text">Stop and target are calculated from your inputs only. This does not place orders.</p></div><div className="panel"><div className="panel-head"><div><div className="mini-label">Signals</div><h2>Analysis candidates</h2></div></div>{activeSignals.map(signal => <div className="event-row" key={signal.symbol}><span>{signal.symbol}</span><strong className={signal.direction === 'BUY' ? 'positive' : 'negative'}>{signal.direction}</strong><b>{signal.confluence}%</b></div>)}<p className="caption-text">Demo candidates are not live signals until confirmed by provider candles and your own plan.</p></div></section></main></div>;
}
