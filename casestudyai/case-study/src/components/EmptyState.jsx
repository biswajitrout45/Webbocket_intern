export default function EmptyState({ title, text }) {
  return <div className="empty-state"><span>⌕</span><strong>{title}</strong><p>{text}</p></div>
}
