import PageHeading from '../components/PageHeading'
import MetricCard from '../components/MetricCard'
import StatusBadge from '../components/StatusBadge'
import { dateLabel, money, quoteTotal } from '../utils'

export default function AdminDashboard({ metrics, products, enquiries, orders, onNavigate, onConfirm, onDispatch }) {
  const pendingOrders = orders.filter((order) => order.status === 'PENDING')
  const readyToDispatch = orders.filter((order) => order.status === 'CONFIRMED')
  const lowStock = products.filter((product) => product.physical - product.reserved < 100)

  return <div className="overview-page role-dashboard admin-dashboard">
    <PageHeading eyebrow="ADMINISTRATOR WORKSPACE" title="Admin dashboard" description="Review business records, manage stock, and keep orders moving." />
    <div className="metric-grid">
      <MetricCard icon="◎" tone="lavender" label="Customer enquiries" value={metrics.enquiries} change="All records" caption="across the workspace" />
      <MetricCard icon="▣" tone="peach" label="Orders to confirm" value={pendingOrders.length} change={pendingOrders.length ? 'Needs attention' : 'All caught up'} caption="awaiting stock check" warning={pendingOrders.length > 0} />
      <MetricCard icon="↗" tone="mint" label="Ready to dispatch" value={readyToDispatch.length} change="Fulfilment queue" caption="confirmed sales orders" />
      <MetricCard icon="₹" tone="blue" label="Order pipeline" value={money(metrics.value)} change="Active orders" caption="excluding cancelled orders" />
    </div>

    <div className="dashboard-grid">
      <section className="panel orders-panel">
        <div className="panel-heading"><div><h3>Order operations</h3><p>Confirm available orders or process dispatches.</p></div><button className="subtle-button" onClick={() => onNavigate('orders')}>All sales orders <span>→</span></button></div>
        <div className="table-scroll"><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>AMOUNT</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{orders.slice(0, 5).map((order) => <tr key={order.id}><td><strong className="table-primary">{order.id}</strong><span className="table-secondary">{order.quoteId}</span></td><td>{order.company}</td><td>{money(quoteTotal(order.items))}</td><td><StatusBadge status={order.status} /></td><td>{order.status === 'PENDING' && <button className="row-action" onClick={() => onConfirm(order)}>Confirm <span>→</span></button>}{order.status === 'CONFIRMED' && <button className="row-action" onClick={() => onDispatch(order)}>Process dispatch <span>→</span></button>}{order.status === 'DISPATCHED' && <span className="table-secondary">Complete</span>}</td></tr>)}</tbody></table></div>
      </section>
      <section className="panel action-panel">
        <div className="panel-heading"><div><h3>Inventory attention</h3><p>Products that may need replenishment.</p></div><button className="subtle-button" onClick={() => onNavigate('inventory')}>Manage <span>→</span></button></div>
        <div className="inventory-peek-list">{lowStock.length ? lowStock.map((product) => <div className="stock-row" key={product.id}><span className="stock-product-mark">{product.code.slice(-1)}</span><div className="stock-info"><strong>{product.name}</strong><span>{product.code}</span></div><div className="stock-quantity"><strong>{product.physical - product.reserved}</strong><span>{product.unit} available</span></div></div>) : <p className="dashboard-empty">All products have healthy available stock.</p>}</div>
        <button className="attention-footer" onClick={() => onNavigate('inventory')}>Open inventory management <span>→</span></button>
      </section>
    </div>

    <div className="dashboard-grid bottom-grid">
      <section className="panel activity-panel"><div className="panel-heading"><div><h3>Latest customer enquiries</h3><p>Recent activity across customer records.</p></div><button className="subtle-button" onClick={() => onNavigate('enquiries')}>All enquiries <span>→</span></button></div><div className="activity-list">{enquiries.slice(0, 4).map((enquiry, index) => <div className="activity-item" key={enquiry.id}><div className={`company-avatar company-${index % 4}`}>{enquiry.company.slice(0, 1)}</div><div className="activity-main"><strong>{enquiry.company}</strong><span>{enquiry.id} <i>·</i> {enquiry.city}</span></div><StatusBadge status={enquiry.status} /><span className="activity-date">{dateLabel(enquiry.date)}</span></div>)}</div></section>
      <section className="panel admin-records-panel"><div className="panel-heading"><div><h3>Workspace records</h3><p>Admin access to all business areas.</p></div></div><div className="admin-record-links"><button onClick={() => onNavigate('enquiries')}><span className="metric-icon lavender">◎</span><span><strong>Customers & enquiries</strong><small>View customer pipeline</small></span><b>→</b></button><button onClick={() => onNavigate('quotations')}><span className="metric-icon peach">▤</span><span><strong>Quotations</strong><small>Review all proposals</small></span><b>→</b></button><button onClick={() => onNavigate('orders')}><span className="metric-icon mint">▣</span><span><strong>Sales orders</strong><small>Confirm and dispatch orders</small></span><b>→</b></button><button onClick={() => onNavigate('inventory')}><span className="metric-icon blue">▦</span><span><strong>Inventory</strong><small>Update product quantities</small></span><b>→</b></button></div></section>
    </div>
    <div className="demo-notice"><span>ⓘ</span><p><strong>Admin workspace</strong> · The role switch is a frontend demo. Real authorization requires a protected backend.</p></div>
  </div>
}
