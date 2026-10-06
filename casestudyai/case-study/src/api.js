const request = async (path, options = {}) => {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(body.error || `API request failed (${response.status}).`)
  }
  return body
}

const json = (method, body) => ({ method, body: JSON.stringify(body) })

export const api = {
  loadWorkspace: () => request('/bootstrap'),
  createEnquiry: (data) => request('/enquiries', json('POST', data)),
  createQuotation: (data) => request('/quotations', json('POST', data)),
  updateQuotationStatus: (quotationNumber, status) => request(`/quotations/${encodeURIComponent(quotationNumber)}/status`, json('PATCH', { status })),
  createOrder: (quotationNumber) => request(`/quotations/${encodeURIComponent(quotationNumber)}/orders`, json('POST', {})),
  confirmOrder: (orderNumber) => request(`/orders/${encodeURIComponent(orderNumber)}/confirm`, json('POST', {})),
  dispatchOrder: (orderNumber) => request(`/orders/${encodeURIComponent(orderNumber)}/dispatch`, json('POST', {})),
  cancelOrder: (orderNumber) => request(`/orders/${encodeURIComponent(orderNumber)}/cancel`, json('POST', {})),
  updateInventory: (productId, physical) => request(`/products/${productId}/inventory`, json('PATCH', { physical })),
  createProduct: (data) => request('/products', json('POST', data)),
}
