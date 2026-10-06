export default function MetricCard({ icon, tone, label, value, change, caption, warning }) {
  return <div className="metric-card"><div className="metric-top"><span className={`metric-icon ${tone}`}>{icon}</span><span className={warning ? 'metric-warning' : 'metric-change'}>{!warning && <span>↗</span>}{change}</span></div><span className="metric-label">{label}</span><strong className="metric-value">{value}</strong><span className="metric-caption">{caption}</span></div>
}
