import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { api } from './api'
import { navigation } from './data'
import { quoteTotal } from './utils'
import AdminDashboard from './pages/AdminDashboard'
import SalesDashboard from './pages/SalesDashboard'
import Enquiries from './pages/Enquiries'
import Quotations from './pages/Quotations'
import Orders from './pages/Orders'
import Inventory from './pages/Inventory'
import Modal from './components/Modal'

function App() {
  const now = new Date()
  const [role, setRole] = useState('ADMIN')
  const [page, setPage] = useState('overview')
  const [products, setProducts] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [quotes, setQuotes] = useState([])
  const [orders, setOrders] = useState([])
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All status')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const available = (product) => product.physical - product.reserved
  const filtered = (items, getSearchText, getStatus) => items.filter((item) => {
    const matchesSearch = getSearchText(item).toLowerCase().includes(search.trim().toLowerCase())
    const matchesFilter = filter === 'All status' || getStatus(item) === filter
    return matchesSearch && matchesFilter
  })
  const notify = (message) => {
    setToast({ message, kind: 'error' })
    window.setTimeout(() => setToast(null), 4000)
  }
  const notifySuccess = (message) => {
    setToast({ message, kind: 'success' })
    window.setTimeout(() => setToast(null), 4000)
  }
  const notifyInfo = (message) => {
    setToast({ message, kind: 'info' })
    window.setTimeout(() => setToast(null), 4000)
  }
  const refreshData = async () => {
    const data = await api.loadWorkspace()
    setProducts(data.products)
    setEnquiries(data.enquiries)
    setQuotes(data.quotes)
    setOrders(data.orders)
    setLoadError('')
  }
  useEffect(() => {
    api.loadWorkspace()
      .then((data) => {
        setProducts(data.products)
        setEnquiries(data.enquiries)
        setQuotes(data.quotes)
        setOrders(data.orders)
      })
      .catch((error) => setLoadError(error.message))
      .finally(() => setLoading(false))
  }, [])
  const runMutation = async (mutation, onSuccess) => {
    try {
      const result = await mutation()
      closeModal()
      try {
        await refreshData()
      } catch (error) {
        setLoadError(`Saved successfully, but the latest data could not be loaded: ${error.message}`)
      }
      onSuccess(result)
    } catch (error) {
      notify(error.message)
    }
  }
  const openModal = (type, data = null) => setModal({ type, data })
  const closeModal = () => setModal(null)
  const changeRole = (nextRole) => {
    setRole(nextRole)
    setPage('overview')
    setSearch('')
    setFilter('All status')
    closeModal()
  }

  const handleConfirm = async (order) => {
    if (role !== 'ADMIN' || order.status !== 'PENDING') {
      notify('Only pending sales orders can be confirmed by an Admin.')
      return
    }
    await runMutation(() => api.confirmOrder(order.id), () => notifySuccess(`${order.id} confirmed. Stock has been reserved.`))
  }

  const handleDispatch = async (order) => {
    if (role !== 'ADMIN' || order.status !== 'CONFIRMED') {
      notify('Only confirmed sales orders can be dispatched by an Admin.')
      return
    }
    await runMutation(() => api.dispatchOrder(order.id), () => notifySuccess(`${order.id} marked as dispatched.`))
  }

  const handleCancel = async (order) => {
    if (role !== 'ADMIN' || !['PENDING', 'CONFIRMED'].includes(order.status)) {
      notify('Only pending or confirmed sales orders can be cancelled by an Admin.')
      return
    }
    await runMutation(() => api.cancelOrder(order.id), () => notifySuccess(`${order.id} cancelled. Its reservation has been released.`))
  }

  const createOrder = async (quote) => {
    if (role !== 'SALES_USER' || quote.status !== 'ACCEPTED') {
      notify('Only accepted quotations can be converted to a sales order.')
      return
    }
    if (orders.some((order) => order.quoteId === quote.id)) {
      notify('This quotation already has a sales order.')
      return
    }
    await runMutation(() => api.createOrder(quote.id), (order) => {
      setPage(role === 'ADMIN' ? 'orders' : 'quotations')
      notifySuccess(`${order.id} created from ${quote.id}.`)
    })
  }

  const saveEnquiry = async (form) => {
    await runMutation(() => api.createEnquiry(form), (enquiry) => {
      setPage('enquiries')
      notifySuccess(`Enquiry ${enquiry.id} created.`)
    })
  }

  const saveQuote = async (form) => {
    const payload = {
      ...form,
      items: form.items.map((item) => ({
        ...item,
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        price: Number(item.price),
        discount: Number(item.discount),
        gst: Number(item.gst),
      })),
    }
    await runMutation(() => api.createQuotation(payload), (quote) => {
      setPage('quotations')
      notifySuccess(`Quotation ${quote.id} saved as draft.`)
    })
  }

  const saveInventory = async (form) => {
    const product = products.find((entry) => entry.id === form.id)
    const physical = Number(form.physical)
    if (role !== 'ADMIN' || !product || !Number.isSafeInteger(physical) || physical < product.reserved) {
      notify('Enter a valid whole-number physical quantity that is at least the reserved quantity.')
      return
    }
    await runMutation(() => api.updateInventory(form.id, physical), () => notifySuccess(`${form.name} inventory updated.`))
  }

  const saveProduct = async (form) => {
    const code = form.code.trim()
    const name = form.name.trim()
    const category = form.category.trim()
    const unit = form.unit.trim()
    const price = Number(form.price)
    const physical = Number(form.physical)
    if (role !== 'ADMIN' || !code || !name || !category || !unit || products.some((product) => product.code.toLowerCase() === code.toLowerCase())) {
      notify('Enter all product details and use a unique product code.')
      return
    }
    if (!Number.isFinite(price) || price < 0 || !Number.isSafeInteger(physical) || physical < 0) {
      notify('Enter a valid base price and a non-negative whole-number physical quantity.')
      return
    }
    await runMutation(() => api.createProduct({ code, name, category, unit, price, physical }), () => notifySuccess(`${name} added to the product master.`))
  }

  const metrics = useMemo(() => ({
    enquiries: enquiries.length,
    quotes: quotes.filter((quote) => quote.status === 'SENT').length,
    orders: orders.filter((order) => order.status === 'PENDING').length,
    value: orders.filter((order) => order.status !== 'CANCELLED').reduce((sum, order) => sum + quoteTotal(order.items), 0),
  }), [enquiries, quotes, orders])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" onClick={(event) => { event.preventDefault(); setPage('overview') }}>
          <span className="brand-mark"><span /></span>
          <span className="brand-name">forge<span>flow</span><small>{role === 'ADMIN' ? 'ADMIN WORKSPACE' : 'SALES WORKSPACE'}</small></span>
        </a>
        <div className="workspace-picker"><span className="workspace-avatar">N</span><span className="workspace-copy"><strong>Northstar Industries</strong><small>Business workspace</small></span><span className="chevron">⌄</span></div>
        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map((group) => {
            const visibleItems = group.items.filter((item) => role === 'ADMIN' || item.id !== 'orders')
            return visibleItems.length > 0 && <div className="nav-group" key={group.section}><p className="nav-caption">{group.section}</p>{visibleItems.map((item) => <button className={`nav-link ${page === item.id ? 'active' : ''}`} key={item.id} onClick={() => { setPage(item.id); setSearch(''); setFilter('All status') }}><span className="nav-icon">{item.id === 'overview' ? (role === 'ADMIN' ? '◫' : '◈') : item.icon}</span>{item.id === 'overview' ? (role === 'ADMIN' ? 'Admin dashboard' : 'Sales dashboard') : item.label}{item.id === 'orders' && <span className="nav-count">{orders.filter((order) => order.status === 'PENDING').length}</span>}</button>)}</div>
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon">✳</div><strong>Need a hand?</strong><p>Our team is here to help you get the most out of Forgeflow.</p><button onClick={() => notifyInfo('Support resources are coming soon.')}>Visit help center <span>↗</span></button></div>
          <div className="user-card"><div className="user-avatar">{role === 'ADMIN' ? 'AK' : 'SM'}</div><div className="user-copy"><strong>{role === 'ADMIN' ? 'Ananya Kapoor' : 'Siddharth Mehra'}</strong><small>{role === 'ADMIN' ? 'Administrator' : 'Sales user'}</small></div><button className="user-menu" aria-label="Sign out" onClick={() => notifyInfo('This is a UI demo. Sign-out is not connected.')}>···</button></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="crumb-divider">/</span><strong>{page === 'overview' ? (role === 'ADMIN' ? 'Admin dashboard' : 'Sales dashboard') : page === 'orders' ? 'Sales orders' : page[0].toUpperCase() + page.slice(1)}</strong></div>
          <div className="topbar-actions"><span className="today-label">{new Intl.DateTimeFormat('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(now)}</span><button className="icon-button notification-button" aria-label="Notifications" onClick={() => notifyInfo('You’re all caught up.')}>♧<i /></button><span className="topbar-divider" /><label className="role-switch"><span>Viewing as</span><select aria-label="Switch demo role" value={role} onChange={(event) => changeRole(event.target.value)}><option value="ADMIN">Admin</option><option value="SALES_USER">Sales user</option></select></label></div>
        </header>

        <div className="content">
          {loading && !loadError && <div className="panel api-state" role="status">Connecting to the database…</div>}
          {loadError && <div className="panel api-state" role="alert"><strong>Could not load workspace data</strong><p>{loadError}</p><button className="primary-button" onClick={async () => {
            setLoading(true)
            try {
              await refreshData()
            } catch (error) {
              setLoadError(error.message)
            } finally {
              setLoading(false)
            }
          }}>Retry connection</button></div>}
          {!loading && !loadError && page === 'overview' && role === 'ADMIN' && <AdminDashboard metrics={metrics} products={products} enquiries={enquiries} orders={orders} onNavigate={setPage} onConfirm={handleConfirm} onDispatch={handleDispatch} />}
          {!loading && !loadError && page === 'overview' && role === 'SALES_USER' && <SalesDashboard enquiries={enquiries} quotes={quotes} orders={orders} products={products} onNavigate={setPage} onCreateEnquiry={() => openModal('enquiry')} onCreateQuote={() => openModal('quote', enquiries.find((enquiry) => enquiry.status !== 'WON' && enquiry.status !== 'LOST'))} onConvert={createOrder} />}
          {!loading && !loadError && page === 'enquiries' && <Enquiries enquiries={filtered(enquiries, (item) => `${item.id} ${item.company} ${item.contact} ${item.city}`, (item) => item.status)} role={role} onCreate={() => openModal('enquiry')} onQuote={(enquiry) => openModal('quote', enquiry)} />}
          {!loading && !loadError && page === 'quotations' && <Quotations quotes={filtered(quotes, (item) => `${item.id} ${item.company} ${item.enquiryId}`, (item) => item.status)} orders={orders} role={role} onCreate={() => openModal('quote', enquiries.find((enquiry) => enquiry.status !== 'WON' && enquiry.status !== 'LOST'))} onStatus={async (quote, status) => {
            const allowedTransitions = { DRAFT: ['SENT'], SENT: ['ACCEPTED', 'REJECTED'] }
            if (!allowedTransitions[quote.status]?.includes(status)) {
              notify(`A ${quote.status.toLowerCase()} quotation cannot be marked ${status.toLowerCase()}.`)
              return
            }
            await runMutation(() => api.updateQuotationStatus(quote.id, status), () => notifySuccess(`${quote.id} marked ${status.toLowerCase()}.`))
          }} onConvert={createOrder} />}
          {!loading && !loadError && role === 'ADMIN' && page === 'orders' && <Orders orders={filtered(orders, (item) => `${item.id} ${item.company} ${item.quoteId}`, (item) => item.status)} role={role} onConfirm={handleConfirm} onDispatch={handleDispatch} onCancel={handleCancel} />}
          {!loading && !loadError && page === 'inventory' && <Inventory products={filtered(products, (item) => `${item.code} ${item.name} ${item.category}`, () => 'All status')} role={role} available={available} onEdit={(product) => openModal('inventory', product)} onCreate={() => openModal('product')} />}
        </div>
        <footer className="page-footer"><span>© {now.getFullYear()} Forgeflow Technologies</span><span>Made for the way industry works <span className="footer-heart">♥</span></span><button onClick={() => notifyInfo('Forgeflow ERP · Industrial sales workspace')}>About this demo</button></footer>
      </main>
      {modal && !loading && !loadError && <Modal modal={modal} products={products} enquiries={enquiries} onClose={closeModal} onSaveEnquiry={saveEnquiry} onSaveQuote={saveQuote} onSaveInventory={saveInventory} onSaveProduct={saveProduct} notify={notify} />}
      {toast && <div className={`toast toast-${toast.kind}`} role={toast.kind === 'error' ? 'alert' : 'status'}><span>{toast.kind === 'success' ? '✓' : toast.kind === 'error' ? '!' : 'i'}</span>{toast.message}</div>}
    </div>
  )
}

export default App
