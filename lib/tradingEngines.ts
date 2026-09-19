:root {
  --bg: #070d17;
  --bg-2: #0f172a;
  --panel: rgba(15, 23, 42, 0.92);
  --panel-strong: #111827;
  --card: #0d1727;
  --card-alt: #0f1c2d;
  --border: rgba(148, 163, 184, 0.18);
  --text: #e5edf8;
  --muted: #9aa9bb;
  --green: #22c55e;
  --green-soft: rgba(34, 197, 94, 0.18);
  --red: #ef4444;
  --red-soft: rgba(239, 68, 68, 0.18);
  --yellow: #fbbf24;
  --blue: #60a5fa;
  --purple: #a78bfa;
  --shadow: rgba(15, 23, 42, 0.7);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: radial-gradient(circle at top, #0d1829 0%, #07111d 35%, #040b13 100%);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
}

button {
  font: inherit;
  cursor: pointer;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: rgba(10, 17, 28, 0.92);
  border-right: 1px solid var(--border);
  padding: 20px 16px;
  position: sticky;
  top: 0;
  height: 100vh;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 8px 24px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1d4ed8, #22c55e);
  display: grid;
  place-items: center;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.brand-subtitle {
  color: var(--yellow);
  letter-spacing: 0.12em;
  font-size: 0.62rem;
  margin-top: 2px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.nav-item {
  width: 100%;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text);
  text-align: left;
  padding: 12px 14px;
  border-radius: 12px;
  transition: 0.2s ease;
}

.nav-item:hover,
.nav-item-active {
  background: rgba(96, 165, 250, 0.12);
  border-color: rgba(96, 165, 250, 0.18);
}

.sidebar-card {
  margin-top: 24px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 12px;
}

.mini-label {
  color: var(--muted);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.session-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: var(--text);
  font-size: 0.9rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--muted);
  display: inline-block;
}

.dot-live {
  background: var(--green);
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.7);
}

.session-time {
  margin-left: auto;
  color: var(--muted);
  font-size: 0.72rem;
}

.main-panel {
  flex: 1;
  padding: 22px 24px 32px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 18px;
}

.topbar-label {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
}

.topbar h1 {
  margin: 8px 0 0;
  font-size: clamp(2rem, 4vw, 2.6rem);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  min-width: 280px;
  padding: 12px 14px;
  background: rgba(15, 23, 42, 0.8);
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.action-button {
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: var(--text);
  border-radius: 12px;
  padding: 12px 16px;
  background: rgba(34, 197, 94, 0.14);
}

.action-primary {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.18), rgba(96, 165, 250, 0.18));
}

.time-range-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.range-pill {
  background: rgba(15, 23, 42, 0.6);
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 9px 12px;
}

.range-pill-active {
  background: rgba(96, 165, 250, 0.12);
  color: var(--text);
  border-color: rgba(96, 165, 250, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(160px, 1fr));
  gap: 14px;
  margin-bottom: 22px;
}

.stat-card,
.panel {
  background: linear-gradient(180deg, rgba(17, 24, 39, 0.96), rgba(11, 18, 32, 0.9));
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 20px 24px -18px var(--shadow);
}

.stat-card {
  padding: 16px 18px;
}

.metric-label {
  color: var(--muted);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.metric-value {
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  margin-top: 8px;
  font-weight: 700;
}

.metric-trend {
  margin-top: 10px;
  font-size: 0.76rem;
  font-weight: 700;
}

.metric-trend.positive,
.positive {
  color: var(--green);
}

.metric-trend.negative,
.negative {
  color: var(--red);
}

.content-grid,
.two-col-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 18px;
  margin-bottom: 18px;
}

.panel {
  padding: 18px;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.panel-head h2 {
  margin: 8px 0 0;
  font-size: 1.2rem;
}

.panel-tools {
  display: flex;
  gap: 10px;
  color: var(--muted);
  font-size: 0.74rem;
}

.chart-toolbar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.chart-toolbar button,
.timeframe {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 10px;
  padding: 8px 10px;
}

.timeframe.active {
  background: rgba(96, 165, 250, 0.14);
  color: var(--text);
  border-color: rgba(96, 165, 250, 0.2);
}

.chart-box {
  position: relative;
  height: 320px;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(15, 21, 32, 0.7), rgba(11, 18, 32, 0.98));
}

.chart-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: 28px 28px;
}

.chart-bar {
  position: absolute;
  bottom: 28px;
  width: 16px;
  background: linear-gradient(180deg, rgba(34, 197, 94, 0.8), rgba(14, 116, 144, 0.6));
  border-radius: 8px 8px 0 0;
  transform: translateX(-50%);
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.2);
}

.chart-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.price-tag {
  position: absolute;
  padding: 6px 8px;
  border-radius: 8px;
  font-size: 0.72rem;
  border: 1px solid var(--border);
}

.price-green {
  top: 30px;
  right: 18px;
  background: rgba(34, 197, 94, 0.12);
  color: var(--green);
}

.price-red {
  bottom: 70px;
  left: 18px;
  background: rgba(239, 68, 68, 0.12);
  color: var(--red);
}

.timeframe-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 14px;
}

.side-panel {
  min-width: 0;
}

.watchlist {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.watch-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 12px 10px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.55);
}

.symbol-name {
  font-weight: 700;
  font-size: 0.96rem;
}

.watch-meta,
.caption-text,
.setup-text,
.score-label,
.breakdown-row,
.reason-list,
.checklist,
.emotion-label,
.watch-change {
  color: var(--muted);
}

.watch-mid {
  text-align: right;
}

.watch-price {
  font-weight: 700;
  font-size: 0.96rem;
}

.signal-badge,
.signal-pill,
.confluence-pill {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.signal-badge.buy,
.signal-pill.buy,
.confluence-pill {
  background: rgba(34, 197, 94, 0.12);
  color: var(--green);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.signal-badge.sell,
.signal-pill.sell {
  background: rgba(239, 68, 68, 0.12);
  color: var(--red);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.signal-stack,
.stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.signal-card {
  border: 1px solid var(--border);
  background: rgba(12, 20, 32, 0.8);
  border-radius: 14px;
  padding: 14px;
}

.signal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.setup-block {
  margin-bottom: 14px;
}

.setup-label {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.62rem;
  margin-bottom: 6px;
}

.trade-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(80px, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.trade-grid div {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 8px;
}

.trade-grid span {
  display: block;
  color: var(--muted);
  font-size: 0.7rem;
  margin-bottom: 6px;
}

.why-box {
  margin-top: 14px;
  border-top: 1px solid var(--border);
  padding-top: 12px;
}

.why-box ul,
.reason-list,
.checklist {
  margin: 10px 0 0;
  padding-left: 18px;
  line-height: 1.9;
}

.confluence-total {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.score-line {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.12);
  overflow: hidden;
  margin: 12px 0 8px;
}

.score-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.95), rgba(96, 165, 250, 0.85));
}

.breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.breakdown-row,
.risk-row,
.mtf-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
}

.reason-list {
  list-style: none;
  padding-left: 0;
}

.mtf-box,
.risk-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 620px;
}

th,
td {
  text-align: left;
  padding: 10px 8px;
  border-bottom: 1px solid var(--border);
}

th {
  color: var(--muted);
  font-size: 0.7rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.emotion-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: 12px;
}

.emotion-box {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px;
}

.emotion-value {
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 8px;
}

.full-panel {
  margin-top: 18px;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(3, minmax(160px, 1fr));
  }
}

@media (max-width: 980px) {
  .app-shell {
    display: block;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .main-panel {
    padding: 18px 16px 28px;
  }

  .content-grid,
  .two-col-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar-actions {
    width: 100%;
    justify-content: space-between;
  }

  .search-box {
    min-width: 0;
    flex: 1;
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }

  .main-panel {
    padding-inline: 12px;
  }

  .brand-name {
    font-size: 1.1rem;
  }

  .search-box {
    display: none;
  }

  .timeframe-row,
  .chart-toolbar,
  .time-range-row {
    overflow-x: auto;
    white-space: nowrap;
  }
}
