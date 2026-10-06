import PageHeading from '../components/PageHeading'
import MetricCard from '../components/MetricCard'
import StatusBadge from '../components/StatusBadge'
import { dateLabel, money, quoteTotal } from '../utils'

export default function SalesDashboard({ enquiries, quotes, orders, products, onNavigate, onCreateEnquiry, onCreateQuote, onConvert }) {
  const waiting = quotes.filter((quote) => quote.status === 'SENT')
  const accepted = quotes.filter((quote) => quote.status === 'ACCEPTED' && !orders.some((order) => order.quoteId === quote.id))
  const availableUnits = products.reduce((total, product) => total + product.physical - product.reserved, 0)

  return <div className="overview-page role-dashboard sales-dashboard">
    <PageHeading eyebrow="SALES USER WORKSPACE" title="Sales dashboard" description="Create customer enquiries, prepare quotations, and check product availability." action={onCreateEnquiry} actionLabel="New enquiry" />
    <div className="sales-welcome">
      <div><span className="welcome-tag"><span /> CUSTOMER PIPELINE</span><h2>Turn customer needs<br />into the next order.</h2><p>Capture an enquiry, send a quotation, and convert accepted proposals.</p><div className="sales-quick-actions"><button className="primary-button" onClick={onCreateEnquiry}><span>+</span> Create enquiry</button><button className="secondary-button" onClick={onCreateQuote}>Create quotation <span>→</span></button></div></div>
      <div className="sales-welcome-stock"><span>AVAILABLE TO SELL</span><strong>{availableUnits.toLocaleString('en-IN')}</strong><small>units across {products.length} products</small><button onClick={() => onNavigate('inventory')}>Check availability <span>→</span></button></div>
    </div>
    <div className="section-title-row"><div><h2>Your sales pipeline</h2><p>Track enquiries and keep customer proposals moving.</p></div><button className="text-button" onClick={() => onNavigate('enquiries')}>View enquiries <span>→</span></button></div>
    <div className="metric-grid">
      <MetricCard icon="◎" tone="lavender" label="Customer enquiries" value={enquiries.length} change="Active pipeline" caption="customer conversations" />
      <MetricCard icon="▤" tone="peach" label="Awaiting response" value={waiting.length} change="Follow up" caption="quotations sent" />
      <MetricCard icon="✓" tone="mint" label="Accepted quotations" value={accepted.length} change="Ready to convert" caption="create sales orders" />
      <MetricCard icon="▦" tone="blue" label="Available products" value={products.length} change="Check availability" caption={`${availableUnits.toLocaleString('en-IN')} units in stock`} />
    </div>
    <div className="dashboard-grid bottom-grid">
      <section className="panel activity-panel"><div className="panel-heading"><div><h3>My customer enquiries</h3><p>Recent customer requests and their progress.</p></div><button className="subtle-button" onClick={() => onNavigate('enquiries')}>All enquiries <span>→</span></button></div><div className="activity-list">{enquiries.slice(0, 4).map((enquiry, index) => <div className="activity-item" key={enquiry.id}><div className={`company-avatar company-${index % 4}`}>{enquiry.company.slice(0, 1)}</div><div className="activity-main"><strong>{enquiry.company}</strong><span>{enquiry.id} <i>·</i> {enquiry.city}</span></div><StatusBadge status={enquiry.status} /><span className="activity-date">{dateLabel(enquiry.date)}</span></div>)}</div></section>
      <section className="panel sales-quotes-panel"><div className="panel-heading"><div><h3>Quotations to move forward</h3><p>Sent proposals and accepted quotes.</p></div><button className="subtle-button" onClick={() => onNavigate('quotations')}>All quotes <span>→</span></button></div><div className="sales-quote-list">{quotes.slice(0, 4).map((quote) => <div className="sales-quote-row" key={quote.id}><div><strong>{quote.company}</strong><span>{quote.id} · {money(quoteTotal(quote.items))}</span></div><StatusBadge status={quote.status} />{quote.status === 'ACCEPTED' && !orders.some((order) => order.quoteId === quote.id) && <button className="row-action" onClick={() => onConvert(quote)}>Create order <span>→</span></button>}</div>)}</div></section>
    </div>
    <div className="demo-notice"><span>ⓘ</span><p><strong>Sales workspace</strong> · Create enquiries and quotations, convert accepted quotes, and view stock availability. Inventory editing and order fulfilment are reserved for Admin.</p></div>
  </div>
}
