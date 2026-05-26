import React, { useState, useEffect, useCallback } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import './ClimateGuard.css';
import API_ENDPOINT from '../../config/api';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, Title, Tooltip, Legend, Filler
);

const API = `${API_ENDPOINT}/api/climate-guard`;

const RISK = {
  LOW:  { color: '#10b981', glow: 'rgba(16,185,129,0.3)',  bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.4)',  label: 'LOW RISK',   icon: '✓' },
  MED:  { color: '#f59e0b', glow: 'rgba(245,158,11,0.3)',  bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.4)',  label: 'MODERATE',   icon: '!' },
  HIGH: { color: '#ef4444', glow: 'rgba(239,68,68,0.35)',  bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.4)',   label: 'HIGH RISK',  icon: '⚠' },
};

const POPULAR_CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur'];

// ── Sub-components ────────────────────────────────────────────────────────────

function RiskGauge({ level, score }) {
  const r = RISK[level] || RISK.LOW;
  const pct = Math.round((score || 0) * 100);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference * (1 - (score || 0));

  return (
    <div className="gauge-wrap" style={{ '--glow': r.glow }}>
      <svg className="gauge-svg" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <circle
          cx="60" cy="60" r="54" fill="none"
          stroke={r.color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s' }}
        />
      </svg>
      <div className="gauge-center">
        <div className="gauge-pct" style={{ color: r.color }}>{pct}%</div>
        <div className="gauge-label" style={{ color: r.color }}>{r.label}</div>
      </div>
    </div>
  );
}

function WeatherCard({ icon, label, value, unit, status }) {
  return (
    <div className={`wcard wcard--${status || 'normal'}`}>
      <div className="wcard-icon">{icon}</div>
      <div className="wcard-body">
        <div className="wcard-val">{value}<span className="wcard-unit">{unit}</span></div>
        <div className="wcard-label">{label}</div>
      </div>
    </div>
  );
}

function VoteBar({ label, votes, total, color }) {
  const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
  return (
    <div className="vote-row">
      <div className="vote-label">{label}</div>
      <div className="vote-bar-bg">
        <div className="vote-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="vote-count" style={{ color }}>{votes} <span>votes</span></div>
    </div>
  );
}

function FeatureBar({ name, importance, value }) {
  const pct = Math.round(importance * 100);
  return (
    <div className="feat-row">
      <div className="feat-name">{name}</div>
      <div className="feat-bar-bg">
        <div className="feat-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="feat-meta">
        <span className="feat-imp">{pct}%</span>
        <span className="feat-val">val={value}</span>
      </div>
    </div>
  );
}

function PipelineStep({ label, active, last }) {
  return (
    <div className="pipe-item">
      <div className={`pipe-box ${active ? 'pipe-box--active' : ''}`}>{label}</div>
      {!last && <div className="pipe-arrow">›</div>}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function ClimateGuard() {
  const [city, setCity] = useState('');
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [modelInfo, setModelInfo] = useState(null);

  const fetchRisk = useCallback(async (targetCity) => {
    if (!targetCity) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/risk/${encodeURIComponent(targetCity)}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'City not found. Try another city name.');
      }
      const json = await res.json();
      setData(json);
      setCity(json.city);
      setInput(json.city);

      const [histRes, alertRes] = await Promise.all([
        fetch(`${API}/history/${encodeURIComponent(json.city)}`),
        fetch(`${API}/alerts/${encodeURIComponent(json.city)}`),
      ]);
      const histJson = await histRes.json();
      const alertJson = await alertRes.json();
      setHistory(Array.isArray(histJson) ? histJson : []);
      setAlerts(Array.isArray(alertJson) ? alertJson : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch(`${API}/model-info`)
      .then(r => r.json())
      .then(setModelInfo)
      .catch(() => {});
    fetchRisk('Mumbai');
  }, [fetchRisk]);

  useEffect(() => {
    if (!city) return;
    const id = setInterval(() => fetchRisk(city), 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [city, fetchRisk]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) fetchRisk(input.trim());
  };

  const r = data ? (RISK[data.risk.riskLevel] || RISK.LOW) : null;

  const forecastLabels = data?.forecast?.map(f => {
    const d = new Date(f.dt * 1000);
    return `${d.getHours()}:00`;
  }) ?? [];

  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1e293b', titleColor: '#94a3b8', bodyColor: '#e2e8f0' } },
    scales: {
      x: { ticks: { color: '#64748b', maxTicksLimit: 6 }, grid: { color: 'rgba(255,255,255,0.04)' } },
      y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.04)' } },
    },
  };

  const tempChartData = {
    labels: forecastLabels,
    datasets: [{
      label: 'Temp (°C)',
      data: data?.forecast?.map(f => parseFloat(f.temp.toFixed(1))) ?? [],
      borderColor: '#f97316',
      backgroundColor: 'rgba(249,115,22,0.08)',
      fill: true, tension: 0.4, pointRadius: 2, borderWidth: 2,
    }],
  };

  const rainChartData = {
    labels: forecastLabels,
    datasets: [{
      label: 'Rain (mm/3h)',
      data: data?.forecast?.map(f => parseFloat((f.rainfall_3h ?? 0).toFixed(2))) ?? [],
      backgroundColor: 'rgba(59,130,246,0.65)',
      borderRadius: 3,
    }],
  };

  const rfVotes = data?.risk?.engine?.rf?.votes;
  const rfTotal = data?.risk?.engine?.rf?.nTrees || 100;
  const featureContribs = data?.risk?.engine?.rf?.featureContributions || [];

  const trendIcon = {
    rising: '↑', falling: '↓', stable: '→',
  }[data?.features?.humidity_trend] || '→';

  const tempStatus = (data?.current?.temp > 38) ? 'warn' : (data?.current?.temp > 42) ? 'danger' : 'normal';
  const windStatus = (data?.current?.wind_speed > 20) ? 'danger' : (data?.current?.wind_speed > 13) ? 'warn' : 'normal';
  const rainStatus = (data?.current?.rainfall_1h > 10) ? 'danger' : (data?.current?.rainfall_1h > 5) ? 'warn' : 'normal';
  const visStatus  = (data?.current?.visibility < 1000) ? 'danger' : (data?.current?.visibility < 3000) ? 'warn' : 'normal';

  const TABS = ['overview', 'ml-engine', 'forecast', 'history'];

  return (
    <div className="cg">
      {/* ── HEADER ── */}
      <header className="cg-head">
        <div className="cg-head-brand">
          <div className="cg-logo">🛡️</div>
          <div>
            <h1 className="cg-title">ClimateGuard</h1>
            <p className="cg-subtitle">Intelligent Calamity Detection & Risk Alert System</p>
          </div>
        </div>
        <form className="cg-search-form" onSubmit={handleSearch}>
          <div className="cg-input-wrap">
            <span className="cg-search-icon">🔍</span>
            <input
              className="cg-search-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Search any city..."
              list="city-suggestions"
            />
            <datalist id="city-suggestions">
              {POPULAR_CITIES.map(c => <option key={c} value={c} />)}
            </datalist>
          </div>
          <button className="cg-analyze-btn" type="submit" disabled={loading}>
            {loading ? <span className="cg-spin" /> : 'Analyze'}
          </button>
        </form>
      </header>

      {/* ── QUICK CITIES ── */}
      <div className="cg-quick-cities">
        {POPULAR_CITIES.map(c => (
          <button key={c} className={`cg-city-chip ${city === c ? 'active' : ''}`} onClick={() => fetchRisk(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* ── ERROR ── */}
      {error && (
        <div className="cg-error-banner">
          <span>⚠</span> {error}
        </div>
      )}

      {/* ── INITIAL LOADING ── */}
      {loading && !data && (
        <div className="cg-init-load">
          <div className="cg-big-spinner" />
          <p>Fetching weather · Running feature engineering · Computing risk score...</p>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      {data && (
        <div className={`cg-content ${loading ? 'cg-content--refreshing' : ''}`}>

          {/* City status bar */}
          <div className="cg-statusbar">
            <div className="cg-statusbar-left">
              <span className="cg-city-name">📍 {data.city}</span>
              <span className="cg-weather-desc">{data.current.description}</span>
            </div>
            <div className="cg-statusbar-right">
              <span className="cg-ts">Updated: {new Date(data.timestamp).toLocaleTimeString()}</span>
              <button className="cg-refresh-btn" onClick={() => fetchRisk(city)} disabled={loading}>
                {loading ? '…' : '↻'}
              </button>
            </div>
          </div>

          {/* ALERT BANNER */}
          {data.risk.alertTriggered && (
            <div className="cg-alert-critical">
              🚨 CRITICAL ALERT — {data.risk.consecutiveHighCount} consecutive HIGH readings recorded for {data.city}!
            </div>
          )}

          {/* ── HERO ROW ── */}
          <div className="cg-hero">
            {/* Risk Gauge */}
            <div className="cg-card cg-card--gauge" style={{ borderColor: r.border, '--glow-color': r.glow }}>
              <div className="cg-card-label">Risk Assessment</div>
              <RiskGauge level={data.risk.riskLevel} score={data.risk.riskScore} />
              <div className="cg-streak">
                Consecutive HIGH: <strong style={{ color: RISK.HIGH.color }}>{data.risk.consecutiveHighCount}</strong> / 3
              </div>
            </div>

            {/* Risk reasons */}
            <div className="cg-card cg-card--reasons">
              <div className="cg-card-label">
                {data.risk.reasons.length > 0 ? '⚡ Risk Factors Detected' : '✓ System Status'}
              </div>
              {data.risk.reasons.length > 0 ? (
                <ul className="cg-reasons-list">
                  {data.risk.reasons.map((r, i) => (
                    <li key={i} className="cg-reason-item">{r}</li>
                  ))}
                </ul>
              ) : (
                <div className="cg-allclear">
                  <div className="cg-allclear-icon">✅</div>
                  <p>No critical thresholds breached. Conditions are within safe limits for {data.city}.</p>
                </div>
              )}
              <div className="cg-engine-verdict">
                <span>Rule engine: <strong style={{ color: RISK[data.risk.engine.rule.prediction]?.color }}>{data.risk.engine.rule.prediction}</strong></span>
                <span>RF prediction: <strong style={{ color: RISK[data.risk.engine.rf.prediction]?.color }}>{data.risk.engine.rf.prediction}</strong></span>
                <span>Final score: <strong>{(data.risk.riskScore * 100).toFixed(0)}%</strong></span>
              </div>
            </div>
          </div>

          {/* ── WEATHER METRICS ── */}
          <div className="cg-section-head">Current Conditions</div>
          <div className="cg-weather-grid">
            <WeatherCard icon="🌡️" label="Temperature" value={data.current.temp?.toFixed(1)} unit="°C" status={tempStatus} />
            <WeatherCard icon="💧" label="Humidity" value={data.current.humidity} unit="%" status="normal" />
            <WeatherCard icon="💨" label="Wind Speed" value={data.current.wind_speed?.toFixed(1)} unit=" m/s" status={windStatus} />
            <WeatherCard icon="🌧️" label="Rainfall (1h)" value={data.current.rainfall_1h?.toFixed(2)} unit=" mm" status={rainStatus} />
            <WeatherCard icon="👁️" label="Visibility" value={(data.current.visibility / 1000).toFixed(1)} unit=" km" status={visStatus} />
          </div>

          {/* ── TABS ── */}
          <div className="cg-tabs">
            {TABS.map(t => (
              <button key={t} className={`cg-tab ${activeTab === t ? 'cg-tab--active' : ''}`} onClick={() => setActiveTab(t)}>
                {t === 'overview' && '📊 Overview'}
                {t === 'ml-engine' && '🤖 ML Engine'}
                {t === 'forecast' && '📈 Forecast'}
                {t === 'history' && '🕒 History'}
              </button>
            ))}
          </div>

          {/* ── TAB: OVERVIEW ── */}
          {activeTab === 'overview' && (
            <div className="cg-tab-content">
              {/* Engineered features */}
              <div className="cg-section-head">Feature Engineering Output</div>
              <div className="cg-feat-cards">
                <div className="cg-feat-pill">
                  <div className="cg-feat-pill-name">avg_temp_24h</div>
                  <div className="cg-feat-pill-val">{data.features.avg_temp_24h?.toFixed(1)}°C</div>
                  <div className="cg-feat-pill-desc">24h rolling avg from forecast</div>
                </div>
                <div className="cg-feat-pill">
                  <div className="cg-feat-pill-name">rainfall_intensity</div>
                  <div className="cg-feat-pill-val">{data.features.rainfall_intensity?.toFixed(2)} mm</div>
                  <div className="cg-feat-pill-desc">6h sliding window sum</div>
                </div>
                <div className="cg-feat-pill">
                  <div className="cg-feat-pill-name">humidity_trend</div>
                  <div className="cg-feat-pill-val">{trendIcon} {data.features.humidity_trend}</div>
                  <div className="cg-feat-pill-desc">delta vs next 3h avg</div>
                </div>
                <div className="cg-feat-pill cg-feat-pill--highlight">
                  <div className="cg-feat-pill-name">visibility_score</div>
                  <div className="cg-feat-pill-val">{(1 - Math.min(1, data.current.visibility / 10000)).toFixed(3)}</div>
                  <div className="cg-feat-pill-desc">inverted, normalized [0,1]</div>
                </div>
              </div>

              {/* Pipeline */}
              <div className="cg-section-head">System Pipeline</div>
              <div className="cg-pipeline">
                {['OpenWeather API', 'Preprocessing', 'Feature Engineering', 'Rule Engine', 'Random Forest', 'Hybrid Combiner', 'Alert System'].map((step, i, arr) => (
                  <PipelineStep key={step} label={step} active last={i === arr.length - 1} />
                ))}
              </div>
            </div>
          )}

          {/* ── TAB: ML ENGINE ── */}
          {activeTab === 'ml-engine' && (
            <div className="cg-tab-content">
              {modelInfo && (
                <div className="cg-model-meta">
                  <div className="cg-model-chip">Algorithm: <strong>{modelInfo.ml?.algorithm}</strong></div>
                  <div className="cg-model-chip">Trees: <strong>{modelInfo.ml?.nTrees}</strong></div>
                  <div className="cg-model-chip">Max Depth: <strong>{modelInfo.ml?.maxDepth}</strong></div>
                  <div className="cg-model-chip">Split: <strong>{modelInfo.ml?.splitCriterion}</strong></div>
                  <div className="cg-model-chip">Feature subset: <strong>{modelInfo.ml?.featureSubsampling}</strong></div>
                  <div className="cg-model-chip">Training accuracy: <strong style={{ color: RISK.LOW.color }}>{modelInfo.ml?.trainingAccuracy}</strong></div>
                </div>
              )}

              {rfVotes && (
                <>
                  <div className="cg-section-head">Random Forest Voting — {rfTotal} Trees</div>
                  <div className="cg-card cg-card--ml">
                    <VoteBar label="HIGH" votes={rfVotes.HIGH || 0} total={rfTotal} color={RISK.HIGH.color} />
                    <VoteBar label="MED"  votes={rfVotes.MED  || 0} total={rfTotal} color={RISK.MED.color} />
                    <VoteBar label="LOW"  votes={rfVotes.LOW  || 0} total={rfTotal} color={RISK.LOW.color} />
                    <div className="cg-rf-verdict">
                      Majority vote: <strong style={{ color: RISK[data.risk.engine.rf.prediction]?.color }}>{data.risk.engine.rf.prediction}</strong>
                      <span className="cg-rf-prob">
                        P(HIGH)={((data.risk.engine.rf.probabilities?.HIGH || 0) * 100).toFixed(0)}%
                        · P(MED)={((data.risk.engine.rf.probabilities?.MED || 0) * 100).toFixed(0)}%
                        · P(LOW)={((data.risk.engine.rf.probabilities?.LOW || 0) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="cg-section-head">Feature Importances (Gini-weighted)</div>
                  <div className="cg-card cg-card--ml">
                    {featureContribs.map(f => (
                      <FeatureBar
                        key={f.feature}
                        name={f.feature}
                        importance={f.importance}
                        value={f.normalizedValue}
                      />
                    ))}
                    <p className="cg-feat-note">
                      Importances computed via mean decrease in Gini impurity across all {rfTotal} trees.
                      Higher value = feature has greater influence on classification.
                    </p>
                  </div>

                  <div className="cg-section-head">Hybrid Combination Logic</div>
                  <div className="cg-card cg-card--ml cg-hybrid-box">
                    <div className="cg-hybrid-row">
                      <div className="cg-hybrid-col">
                        <div className="cg-hybrid-label">Rule Engine</div>
                        <div className="cg-hybrid-val" style={{ color: RISK[data.risk.engine.rule.prediction]?.color }}>
                          {data.risk.engine.rule.prediction}
                        </div>
                        <div className="cg-hybrid-desc">5 threshold rules (IMD standards)</div>
                      </div>
                      <div className="cg-hybrid-plus">+</div>
                      <div className="cg-hybrid-col">
                        <div className="cg-hybrid-label">Random Forest</div>
                        <div className="cg-hybrid-val" style={{ color: RISK[data.risk.engine.rf.prediction]?.color }}>
                          {data.risk.engine.rf.prediction}
                        </div>
                        <div className="cg-hybrid-desc">100 trees, bootstrap sampling</div>
                      </div>
                      <div className="cg-hybrid-plus">=</div>
                      <div className="cg-hybrid-col">
                        <div className="cg-hybrid-label">Final Score</div>
                        <div className="cg-hybrid-val" style={{ color: r.color }}>
                          {(data.risk.riskScore * 100).toFixed(0)}%
                        </div>
                        <div className="cg-hybrid-desc">{data.risk.engine.combination}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── TAB: FORECAST ── */}
          {activeTab === 'forecast' && (
            <div className="cg-tab-content">
              <div className="cg-charts-grid">
                <div className="cg-card cg-card--chart">
                  <div className="cg-chart-title">Temperature Trend (°C) — 48h</div>
                  <div className="cg-chart-area">
                    <Line data={tempChartData} options={chartDefaults} />
                  </div>
                </div>
                <div className="cg-card cg-card--chart">
                  <div className="cg-chart-title">Rainfall Forecast (mm / 3h) — 48h</div>
                  <div className="cg-chart-area">
                    <Bar data={rainChartData} options={chartDefaults} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: HISTORY ── */}
          {activeTab === 'history' && (
            <div className="cg-tab-content">
              {alerts.length > 0 && (
                <>
                  <div className="cg-section-head">🔔 Triggered Alerts — {city}</div>
                  <div className="cg-table-wrap">
                    <table className="cg-table">
                      <thead><tr><th>Time</th><th>Level</th><th>Score</th><th>Reasons</th><th>Temp</th><th>Rain</th></tr></thead>
                      <tbody>
                        {alerts.map(a => {
                          const rc = RISK[a.riskLevel] || RISK.LOW;
                          return (
                            <tr key={a._id}>
                              <td className="cg-td-mono">{new Date(a.triggeredAt).toLocaleString()}</td>
                              <td><span className="cg-badge" style={{ color: rc.color, background: rc.bg, borderColor: rc.border }}>{a.riskLevel}</span></td>
                              <td>{(a.riskScore * 100).toFixed(0)}%</td>
                              <td className="cg-td-reasons">{a.reasons?.join(' · ')}</td>
                              <td>{a.weatherSnapshot?.temp?.toFixed(1)}°C</td>
                              <td>{a.weatherSnapshot?.rainfall_intensity?.toFixed(1)} mm</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {history.length > 0 ? (
                <>
                  <div className="cg-section-head">📊 Reading Log — {city}</div>
                  <div className="cg-table-wrap">
                    <table className="cg-table">
                      <thead><tr><th>Time</th><th>Level</th><th>Score</th><th>Temp</th><th>Humidity</th><th>Wind</th></tr></thead>
                      <tbody>
                        {history.slice(0, 15).map(h => {
                          const rc = RISK[h.riskLevel] || RISK.LOW;
                          return (
                            <tr key={h._id}>
                              <td className="cg-td-mono">{new Date(h.timestamp).toLocaleString()}</td>
                              <td><span className="cg-badge" style={{ color: rc.color, background: rc.bg, borderColor: rc.border }}>{h.riskLevel}</span></td>
                              <td>{((h.riskScore || 0) * 100).toFixed(0)}%</td>
                              <td>{h.current?.temp?.toFixed(1)}°C</td>
                              <td>{h.current?.humidity}%</td>
                              <td>{h.current?.wind_speed?.toFixed(1)} m/s</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="cg-empty">No history records yet. Readings are stored every 30 minutes.</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
