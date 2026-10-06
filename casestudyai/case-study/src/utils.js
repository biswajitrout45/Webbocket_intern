export const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
export const dateLabel = (value) => new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
export const lineAmount = (item) => item.quantity * item.price * (1 - item.discount / 100) * (1 + item.gst / 100)
export const quoteTotal = (items) => items.reduce((sum, item) => sum + lineAmount(item), 0)
