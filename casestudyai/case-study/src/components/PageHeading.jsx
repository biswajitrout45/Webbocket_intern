export default function PageHeading({ eyebrow, title, description, action, actionLabel, actionIcon = '+' }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></div>{action && <button className="primary-button" onClick={action}><span>{actionIcon}</span>{actionLabel}</button>}</div>
}
