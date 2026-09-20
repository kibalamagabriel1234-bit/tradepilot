'use client';

import { useEffect, useMemo, useState } from 'react';
import { activeSignals, economicCalendar, marketStats, multiTimeframe, watchlist } from '@/lib/mockData';

const nav = ['Dashboard', 'Terminal', 'Markets', 'Signals', 'Trade Planner', 'Journal', 'Analytics', 'Backtester', 'Economic Calendar', 'Risk Manager', 'Psychology', 'Daily Plan', 'Alerts', 'Trade History', 'Settings'];
const symbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'BTCUSD', 'ETHUSD', 'SOLUSD', 'NAS100'];
const journalEntries = [
  { time: '09:42', setup: 'EURUSD BUY', note: 'Bullish retrace into support with strong structure.', pnl: '+$180' },
  { time: '11:10', setup: 'XAUUSD BUY', note: 'Demand zone defended after liquidity sweep.', pnl: '+$260' },
  { time: '14:30', setup: 'BTCUSD SELL', note: 'Failed breakout into local resistance.', pnl: '+$420' },
];
const planChecklist = ['Review H4/H1 bias before entry', 'Check risk reward and max loss', 'Confirm trade plan before execution', 'Journal outcome within 10 minutes'];
const riskBuckets = [
  { label: 'Max risk per trade', value: '1.0%' },
  { label: 'Max daily loss', value: '3.0%' },
  { label: 'Max open trades', value: '3' },
  { label: 'Session rule', value: 'No revenge trading' },
];

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
    const data = await response.json();
    setPrices(data.prices ?? []);
    setUpdated(data.fetchedAt ?? '');
  };

  useEffect(() => {
    loadPrices();
    const timer = window.setInterval(loadPrices, 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem('tradepilot-manual-account');
    if (saved) {
      const data = JSON.parse(saved);
      setBalance(data.balance ?? '10000');
      setRisk(data.risk ?? '1');
    }
  }, []);

  const saveManual = () => {
    window.localStorage.setItem('tradepilot-manual-account', JSON.stringify({ balance, risk }));
  };

  const liveRows = useMemo(() => {
    const rows = prices.length ? prices : watchlist.map((item) => ({ symbol: item.symbol, price: item.price, change24h: Number.parseFloat(item.chg.replace('%', '')) || 0, source: 'Demo feed', updatedAt: Date.now() }));
    return rows.filter((item) => item.symbol.toLowerCase().includes(query.toLowerCase()));
  }, [prices, query]);

  const riskAmount = Number(balance || 0) * Number(risk || 0) / 100;
  const distance = Math.abs(Number(manualEntry || 0) - Number(manualStop || 0));
  const reward = Math.abs(Number(manualTarget || 0) - Number(manualEntry || 0));
  const rr = distance > 0 ? reward / distance : 0;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">TP</div>
          <div>
            <div className="brand-name">TradePilot</div>
            <div className="brand-subtitle">REAL PRICES · MANUAL ACCOUNT</div>
          </div>
        </div>

        <nav className="nav-menu">
          {nav.map((item) => (
            <button
              key={item}
              className={selected === item ? 'nav-item nav-item-active' : 'nav-item'}
              onClick={() => setSelected(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <div className="mini-label">Data status</div>
          <strong className="positive">LIVE PROVIDER</strong>
          <p className="caption-text">
            Public market prices are shown. Balance, risk, and execution are manual-only and never
            sent to a broker.
          </p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="topbar-label">{selected}</div>
            <h1>Risk-aware market analysis terminal</h1>
          </div>

          <div className="topbar-actions">
            <input
              className="search-box"
              placeholder="Filter symbols"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="action-button action-primary" onClick={loadPrices}>
              Refresh prices
            </button>
          </div>
        </header>

        <div className="notice">
          <strong>MARKET DATA ONLY</strong>
          <span>
            Prices are fetched from public providers. Your balance, risk, plan and journal are manual,
            browser-local inputs. No execution or broker connection is active.
          </span>
          <small>{updated ? `Updated ${new Date(updated).toLocaleTimeString()}` : 'Loading...'}</small>
        </div>

        <section className="stats-grid">
          {marketStats.slice(0, 6).map((item) => (
            <div className="stat-card" key={item.label}>
              <div className="metric-label">{item.label}</div>
              <div className="metric-value">{item.value}</div>
              <div className="metric-trend positive">Manual portfolio view</div>
            </div>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel large-panel">
            <div className="panel-head">
              <div>
                <div className="mini-label">Terminal</div>
                <h2>Live market overview</h2>
              </div>
              <div className="panel-tools">
                <span>● Public data</span>
                <span>Manual risk</span>
              </div>
            </div>

            <div className="chart-toolbar">
              {['1m', '5m', '15m', '1H', '4H', '1D'].map((tf) => (
                <button key={tf} className={`timeframe ${tf === '1H' ? 'active' : ''}`}>{tf}</button>
              ))}
            </div>

            <div className="chart-box">
              <div className="chart-grid" />
              {Array.from({ length: 18 }, (_, i) => (
                <span
                  key={i}
                  className="chart-bar"
                  style={{ height: `${26 + ((i * 17) % 160)}px`, left: `${i * 5.4}%` }}
                />
              ))}
              <div className="chart-label bull">BULLISH STRUCTURE</div>
              <div className="chart-label fvg">SUPPORT / FVG</div>
            </div>

            <div className="analysis-strip">
              <span>
                H4 <b className="positive">Bullish</b>
              </span>
              <span>
                H1 <b className="positive">Bullish</b>
              </span>
              <span>
                M15 <b className="positive">Bullish</b>
              </span>
              <span>
                M5 <b className="warning">Watch</b>
              </span>
              <span>
                Regime <b>Trend</b>
              </span>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="mini-label">Live watchlist</div>
                <h2>Provider prices</h2>
              </div>
            </div>

            <div className="watchlist">
              {liveRows.length === 0 && <p className="caption-text">No matching pairs found.</p>}
              {liveRows.map((item) => (
                <button className="watch-row" key={item.symbol} onClick={() => setQuery(item.symbol)}>
                  <div>
                    <div className="symbol-name">{item.symbol}</div>
                    <div className="watch-meta">{item.source ?? 'Demo feed'}</div>
                  </div>
                  <div className="watch-mid">
                    <div className="watch-price">
                      {item.price === null ? 'Unavailable' : item.price.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </div>
                    <div className={item.change24h !== null && item.change24h < 0 ? 'negative' : 'positive'}>
                      {item.change24h === null ? '—' : `${item.change24h.toFixed(2)}%`}
                    </div>
                  </div>
                  <span className="signal-badge buy">DATA</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="two-col-grid">
          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="mini-label">Signal engine</div>
                <h2>Explainable setups</h2>
              </div>
            </div>

            {activeSignals.map((signal) => (
              <article className="signal-card" key={signal.symbol}>
                <div className="signal-header">
                  <div>
                    <div className="symbol-name">{signal.symbol}</div>
                    <span className="signal-pill buy">{signal.direction}</span>
                  </div>
                  <span className="confluence-pill">{signal.confluence}%</span>
                </div>

                <p className="setup-text">{signal.setup}</p>

                <div className="trade-grid">
                  <div><span>Entry</span><strong>{signal.entry}</strong></div>
                  <div><span>Stop</span><strong>{signal.stop}</strong></div>
                  <div><span>TP</span><strong>{signal.tp}</strong></div>
                  <div><span>R:R</span><strong>{signal.rr}</strong></div>
                  <div><span>TF</span><strong>{signal.tf}</strong></div>
                  <div><span>Bias</span><strong>{signal.bias}</strong></div>
                </div>
              </article>
            ))}
          </div>

          <div className="stack">
            <div className="panel">
              <div className="panel-head">
                <div>
                  <div className="mini-label">Manual account</div>
                  <h2>Risk controls</h2>
                </div>
              </div>

              <label className="field-label">
                Balance
                <input className="field" inputMode="decimal" value={balance} onChange={(e) => setBalance(e.target.value)} />
              </label>

              <label className="field-label">
                Risk per trade %
                <input className="field" inputMode="decimal" value={risk} onChange={(e) => setRisk(e.target.value)} />
              </label>

              <div className="manual-result">
                <span>Risk amount</span>
                <strong>${riskAmount.toFixed(2)}</strong>
              </div>

              <button className="action-button action-primary full-width" onClick={saveManual}>
                Save manually
              </button>
            </div>

            <div className="panel">
              <div className="panel-head">
                <div>
                  <div className="mini-label">Trade planner</div>
                  <h2>Entry / stop / target</h2>
                </div>
              </div>

              <div className="planner-grid">
                <label className="field-label">
                  Entry
                  <input className="field" inputMode="decimal" value={manualEntry} onChange={(e) => setManualEntry(e.target.value)} />
                </label>
                <label className="field-label">
                  Stop loss
                  <input className="field" inputMode="decimal" value={manualStop} onChange={(e) => setManualStop(e.target.value)} />
                </label>
                <label className="field-label">
                  Take profit
                  <input className="field" inputMode="decimal" value={manualTarget} onChange={(e) => setManualTarget(e.target.value)} />
                </label>
              </div>

              <div className="manual-result">
                <span>Manual R:R</span>
                <strong>{rr ? `1:${rr.toFixed(2)}` : 'Enter levels'}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="panel compact-panel">
          <div className="panel-head">
            <div>
              <div className="mini-label">Structure and plan</div>
              <h2>Market context</h2>
            </div>
          </div>

          <div className="info-grid">
            <div className="mini-panel">
              <div className="mini-label">Multi-timeframe</div>
              {multiTimeframe.map((item) => (
                <div key={item.label} className="mtf-row">
                  <span>{item.label}</span>
                  <strong className="positive">{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="mini-panel">
              <div className="mini-label">Risk rules</div>
              {riskBuckets.map((item) => (
                <div key={item.label} className="mtf-row">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="mini-panel">
              <div className="mini-label">Daily plan</div>
              <ul className="checklist">
                {planChecklist.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="two-col-grid">
          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="mini-label">Journal</div>
                <h2>Recent decisions</h2>
              </div>
            </div>

            {journalEntries.map((entry) => (
              <div className="journal-row" key={`${entry.time}-${entry.setup}`}>
                <div>
                  <div className="journal-time">{entry.time}</div>
                  <strong>{entry.setup}</strong>
                  <p>{entry.note}</p>
                </div>
                <span className="journal-pnl positive">{entry.pnl}</span>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-head">
              <div>
                <div className="mini-label">Economic calendar</div>
                <h2>Upcoming events</h2>
              </div>
            </div>

            {economicCalendar.slice(0, 4).map((event) => (
              <div key={event.time + event.event} className="event-row">
                <span>{event.time} · {event.currency}</span>
                <strong>{event.event}</strong>
                <b className={event.impact === 'High' ? 'warning' : 'positive'}>{event.impact}</b>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
