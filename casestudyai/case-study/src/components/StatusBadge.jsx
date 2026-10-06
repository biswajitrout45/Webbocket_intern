export default function StatusBadge({ status }) {
  const cls = { NEW: 'status-blue', QUOTED: 'status-orange', WON: 'status-green', LOST: 'status-gray', DRAFT: 'status-gray', SENT: 'status-blue', ACCEPTED: 'status-green', REJECTED: 'status-red', PENDING: 'status-orange', CONFIRMED: 'status-blue', DISPATCHED: 'status-green', CANCELLED: 'status-red' }[status] ?? 'status-gray'
  return <span className={`status-badge ${cls}`}><i />{status[0] + status.slice(1).toLowerCase()}</span>
}
