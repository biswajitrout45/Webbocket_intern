import 'dotenv/config'
import express from 'express'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const app = express()
const port = Number(process.env.API_PORT || 3001)
const host = process.env.API_HOST || '127.0.0.1'

app.use(express.json({ limit: '1mb' }))

class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

const fail = (status, message) => { throw new ApiError(status, message) }
const isPositiveId = (value) => Number.isSafeInteger(Number(value)) && Number(value) > 0 && Number(value) <= 2147483647
const isNumericInput = (value) => (typeof value === 'number' || typeof value === 'string' && value.trim() !== '') && Number.isFinite(Number(value))
const isIsoDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
}
const number = (value) => Number(value)
const productItems = (items, allowDuplicateProducts = false) => {
  if (!Array.isArray(items) || items.length === 0) fail(400, 'Add at least one product.')
  const normalized = items.map((item) => {
    if (!item || typeof item !== 'object') fail(400, 'Each product line must be an object.')
    if (!isNumericInput(item.productId) || !isNumericInput(item.quantity)) fail(400, 'Product IDs and quantities must be positive whole numbers.')
    const productId = Number(item.productId)
    const quantity = Number(item.quantity)
    if (!Number.isSafeInteger(productId) || productId <= 0 || productId > 2147483647
      || !Number.isSafeInteger(quantity) || quantity <= 0 || quantity > 2147483647) {
      fail(400, 'Product IDs and quantities must be positive whole numbers.')
    }
    return { ...item, productId, quantity }
  })
  if (!allowDuplicateProducts && new Set(normalized.map((item) => item.productId)).size !== normalized.length) {
    fail(400, 'A product can only appear once per document.')
  }
  if (allowDuplicateProducts) {
    return [...normalized.reduce((merged, item) => {
      merged.set(item.productId, (merged.get(item.productId) ?? 0) + item.quantity)
      return merged
    }, new Map()).entries()].map(([productId, quantity]) => ({ productId, quantity }))
  }
  return normalized
}

const transaction = async (work) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await work(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

const insertItems = async (client, table, documentId, items, quotation = false) => {
  const columnSet = {
    enquiry_items: 'enquiry_id',
    quotation_items: 'quotation_id',
    sales_order_items: 'sales_order_id',
  }
  const documentKey = columnSet[table]
  if (!documentKey) throw new Error(`Unsupported item table: ${table}`)
  for (const item of items) {
    if (quotation) {
      const price = Number(item.price)
      const discount = Number(item.discount)
      const gst = Number(item.gst)
      if (!isNumericInput(item.price) || price < 0 || price > 9999999999.99
        || !isNumericInput(item.discount) || discount < 0 || discount > 100
        || !isNumericInput(item.gst) || gst < 0 || gst > 100) {
        fail(400, 'Prices must be non-negative and discount/GST percentages must be between 0 and 100.')
      }
      await client.query(
        `INSERT INTO ${table} (${documentKey}, product_id, quantity, unit_price, discount_percent, gst_percent)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [documentId, item.productId, item.quantity, price, discount, gst],
      )
    } else {
      await client.query(
        `INSERT INTO ${table} (${documentKey}, product_id, quantity) VALUES ($1, $2, $3)`,
        [documentId, item.productId, item.quantity],
      )
    }
  }
}

const itemsFor = async (client, table, documentKey, documentId) => {
  const result = await client.query(
    `SELECT product_id, quantity, unit_price, discount_percent, gst_percent
     FROM ${table} WHERE ${documentKey} = $1 ORDER BY id`,
    [documentId],
  )
  return result.rows.map((row) => ({
    productId: row.product_id,
    quantity: row.quantity,
    ...(row.unit_price === null ? {} : {
      price: number(row.unit_price),
      discount: number(row.discount_percent),
      gst: number(row.gst_percent),
    }),
  }))
}

const lockProducts = async (client, items) => {
  if (!items.length) fail(409, 'The sales order has no product lines.')
  const ids = items.map((item) => item.productId)
  const result = await client.query(
    `SELECT id, product_name, physical_quantity, reserved_quantity
     FROM products WHERE id = ANY($1::integer[]) ORDER BY id FOR UPDATE`,
    [ids],
  )
  if (result.rowCount !== items.length) fail(409, 'The order references a product that is no longer available.')
  return new Map(result.rows.map((product) => [product.id, product]))
}

app.get('/api/health', async (_request, response) => {
  await pool.query('SELECT 1')
  response.json({ status: 'ok' })
})

app.get('/api/bootstrap', async (_request, response) => {
  const [products, enquiryRows, enquiryItemRows, quoteRows, quoteItemRows, orderRows, orderItemRows] = await Promise.all([
    pool.query(`SELECT id, product_code, product_name, category, unit, base_price, physical_quantity, reserved_quantity
                FROM products ORDER BY product_code`),
    pool.query(`SELECT e.enquiry_number AS id, c.company_name AS company, c.contact_person AS contact,
                       c.mobile, c.email, c.city, to_char(e.enquiry_date, 'YYYY-MM-DD') AS date,
                       to_char(e.required_date, 'YYYY-MM-DD') AS required,
                       e.notes, e.status
                FROM enquiries e JOIN customers c ON c.id = e.customer_id
                ORDER BY e.id DESC`),
    pool.query(`SELECT e.enquiry_number AS document_id, ei.product_id, ei.quantity
                FROM enquiry_items ei JOIN enquiries e ON e.id = ei.enquiry_id ORDER BY ei.id`),
    pool.query(`SELECT q.quotation_number AS id, e.enquiry_number AS "enquiryId", c.company_name AS company,
                       to_char(q.quotation_date, 'YYYY-MM-DD') AS date,
                       to_char(q.valid_until, 'YYYY-MM-DD') AS "validUntil", q.status
                FROM quotations q JOIN enquiries e ON e.id = q.enquiry_id
                JOIN customers c ON c.id = e.customer_id ORDER BY q.id DESC`),
    pool.query(`SELECT q.quotation_number AS document_id, qi.product_id, qi.quantity, qi.unit_price,
                       qi.discount_percent, qi.gst_percent
                FROM quotation_items qi JOIN quotations q ON q.id = qi.quotation_id ORDER BY qi.id`),
    pool.query(`SELECT so.order_number AS id, q.quotation_number AS "quoteId",
                       e.enquiry_number AS "enquiryId", c.company_name AS company,
                       to_char(so.order_date, 'YYYY-MM-DD') AS date, so.status
                FROM sales_orders so JOIN quotations q ON q.id = so.quotation_id
                JOIN enquiries e ON e.id = q.enquiry_id JOIN customers c ON c.id = e.customer_id
                ORDER BY so.id DESC`),
    pool.query(`SELECT so.order_number AS document_id, soi.product_id, soi.quantity, soi.unit_price,
                       soi.discount_percent, soi.gst_percent
                FROM sales_order_items soi JOIN sales_orders so ON so.id = soi.sales_order_id ORDER BY soi.id`),
  ])

  const groupItems = (rows, idKey, includePrice = false) => {
    const grouped = new Map()
    for (const row of rows) {
      const items = grouped.get(row[idKey]) ?? []
      items.push({
        productId: row.product_id,
        quantity: row.quantity,
        ...(includePrice ? {
          price: number(row.unit_price),
          discount: number(row.discount_percent),
          gst: number(row.gst_percent),
        } : {}),
      })
      grouped.set(row[idKey], items)
    }
    return grouped
  }

  const enquiryItems = groupItems(enquiryItemRows.rows, 'document_id')
  const quoteItems = groupItems(quoteItemRows.rows, 'document_id', true)
  const orderItems = groupItems(orderItemRows.rows, 'document_id', true)
  response.json({
    products: products.rows.map((row) => ({
      id: row.id,
      code: row.product_code,
      name: row.product_name,
      category: row.category,
      unit: row.unit,
      price: number(row.base_price),
      physical: row.physical_quantity,
      reserved: row.reserved_quantity,
    })),
    enquiries: enquiryRows.rows.map((row) => ({ ...row, products: enquiryItems.get(row.id) ?? [] })),
    quotes: quoteRows.rows.map((row) => ({ ...row, items: quoteItems.get(row.id) ?? [] })),
    orders: orderRows.rows.map((row) => ({ ...row, items: orderItems.get(row.id) ?? [] })),
  })
})

app.post('/api/enquiries', async (request, response) => {
  const { company, contact, mobile, email, city, required, notes = '', products } = request.body ?? {}
  if (![company, contact, mobile, email, city].every((value) => typeof value === 'string' && value.trim()) || !isIsoDate(required)) {
    fail(400, 'Company, contact, mobile, email, city, and a valid required date are required.')
  }
  const items = productItems(products, true)
  const record = await transaction(async (client) => {
    const customer = await client.query(
      `INSERT INTO customers (company_name, contact_person, mobile, email, city)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (company_name, contact_person)
       DO UPDATE SET mobile = EXCLUDED.mobile, email = EXCLUDED.email, city = EXCLUDED.city
       RETURNING id`,
      [company.trim(), contact.trim(), mobile.trim(), email.trim(), city.trim()],
    )
    const enquiry = await client.query(
      `WITH next_id AS (SELECT nextval('enquiries_id_seq') AS id)
       INSERT INTO enquiries (id, enquiry_number, customer_id, required_date, notes)
       SELECT id, 'ENQ-' || EXTRACT(YEAR FROM CURRENT_DATE)::text || '-' || lpad(id::text, 3, '0'),
              $1, $2, $3
       FROM next_id
       RETURNING id, enquiry_number`,
      [customer.rows[0].id, required, String(notes)],
    )
    await insertItems(client, 'enquiry_items', enquiry.rows[0].id, items)
    return enquiry.rows[0]
  })
  response.status(201).json({ id: record.enquiry_number })
})

app.post('/api/quotations', async (request, response) => {
  const { enquiryId, validUntil, items: submittedItems } = request.body ?? {}
  if (typeof enquiryId !== 'string' || !isIsoDate(validUntil)) fail(400, 'Choose an enquiry and provide a valid quotation expiry date.')
  const items = productItems(submittedItems)
  if (items.some((item, index) => {
    const submitted = submittedItems[index]
    return !isNumericInput(submitted.price) || Number(submitted.price) < 0 || Number(submitted.price) > 9999999999.99
      || !isNumericInput(submitted.discount) || Number(submitted.discount) < 0 || Number(submitted.discount) > 100
      || !isNumericInput(submitted.gst) || Number(submitted.gst) < 0 || Number(submitted.gst) > 100
  })) fail(400, 'Prices must be non-negative and discount/GST percentages must be between 0 and 100.')

  const record = await transaction(async (client) => {
    const enquiry = await client.query(
      `SELECT id, status FROM enquiries WHERE enquiry_number = $1 FOR UPDATE`,
      [enquiryId],
    )
    if (!enquiry.rowCount) fail(404, 'Enquiry not found.')
    if (['WON', 'LOST'].includes(enquiry.rows[0].status)) fail(409, 'A won or lost enquiry cannot receive a quotation.')
    const quote = await client.query(
      `WITH next_id AS (SELECT nextval('quotations_id_seq') AS id)
       INSERT INTO quotations (id, quotation_number, enquiry_id, valid_until)
       SELECT id, 'QUO-' || EXTRACT(YEAR FROM CURRENT_DATE)::text || '-' || lpad(id::text, 3, '0'),
              $1, $2
       FROM next_id
       RETURNING id, quotation_number`,
      [enquiry.rows[0].id, validUntil],
    )
    await insertItems(client, 'quotation_items', quote.rows[0].id, items, true)
    await client.query(`UPDATE enquiries SET status = 'QUOTED' WHERE id = $1`, [enquiry.rows[0].id])
    return quote.rows[0]
  })
  response.status(201).json({ id: record.quotation_number })
})

app.patch('/api/quotations/:quotationNumber/status', async (request, response) => {
  const { status } = request.body ?? {}
  if (!['SENT', 'ACCEPTED', 'REJECTED'].includes(status)) fail(400, 'Invalid quotation status.')
  await transaction(async (client) => {
    const quote = await client.query(
      `SELECT id, status FROM quotations WHERE quotation_number = $1 FOR UPDATE`,
      [request.params.quotationNumber],
    )
    if (!quote.rowCount) fail(404, 'Quotation not found.')
    const allowed = { DRAFT: ['SENT'], SENT: ['ACCEPTED', 'REJECTED'] }
    if (!allowed[quote.rows[0].status]?.includes(status)) fail(409, `A ${quote.rows[0].status.toLowerCase()} quotation cannot be marked ${status.toLowerCase()}.`)
    await client.query(`UPDATE quotations SET status = $1 WHERE id = $2`, [status, quote.rows[0].id])
  })
  response.json({ status })
})

app.post('/api/quotations/:quotationNumber/orders', async (request, response) => {
  const record = await transaction(async (client) => {
    const quote = await client.query(
      `SELECT id, status FROM quotations WHERE quotation_number = $1 FOR UPDATE`,
      [request.params.quotationNumber],
    )
    if (!quote.rowCount) fail(404, 'Quotation not found.')
    if (quote.rows[0].status !== 'ACCEPTED') fail(409, 'Only accepted quotations can be converted to a sales order.')
    const existing = await client.query(`SELECT order_number FROM sales_orders WHERE quotation_id = $1`, [quote.rows[0].id])
    if (existing.rowCount) fail(409, 'This quotation already has a sales order.')
    const order = await client.query(
      `WITH next_id AS (SELECT nextval('sales_orders_id_seq') AS id)
       INSERT INTO sales_orders (id, order_number, quotation_id)
       SELECT id, 'SO-' || EXTRACT(YEAR FROM CURRENT_DATE)::text || '-' || lpad(id::text, 3, '0'), $1
       FROM next_id
       RETURNING id, order_number`,
      [quote.rows[0].id],
    )
    await client.query(
      `INSERT INTO sales_order_items (sales_order_id, product_id, quantity, unit_price, discount_percent, gst_percent)
       SELECT $1, product_id, quantity, unit_price, discount_percent, gst_percent
       FROM quotation_items WHERE quotation_id = $2`,
      [order.rows[0].id, quote.rows[0].id],
    )
    await client.query(
      `UPDATE enquiries SET status = 'WON' WHERE id = (SELECT enquiry_id FROM quotations WHERE id = $1)`,
      [quote.rows[0].id],
    )
    return order.rows[0]
  })
  response.status(201).json({ id: record.order_number })
})

app.post('/api/orders/:orderNumber/confirm', async (request, response) => {
  await transaction(async (client) => {
    const order = await client.query(`SELECT id, status FROM sales_orders WHERE order_number = $1 FOR UPDATE`, [request.params.orderNumber])
    if (!order.rowCount) fail(404, 'Sales order not found.')
    if (order.rows[0].status !== 'PENDING') fail(409, 'Only pending sales orders can be confirmed.')
    const items = await itemsFor(client, 'sales_order_items', 'sales_order_id', order.rows[0].id)
    const stockById = await lockProducts(client, items)
    for (const item of items) {
      const stock = stockById.get(item.productId)
      const available = stock.physical_quantity - stock.reserved_quantity
      if (available < item.quantity) fail(409, `Not enough ${stock.product_name} available. ${available} units available.`)
    }
    for (const item of items) {
      await client.query(`UPDATE products SET reserved_quantity = reserved_quantity + $1 WHERE id = $2`, [item.quantity, item.productId])
    }
    await client.query(`UPDATE sales_orders SET status = 'CONFIRMED' WHERE id = $1`, [order.rows[0].id])
  })
  response.json({ status: 'CONFIRMED' })
})

app.post('/api/orders/:orderNumber/dispatch', async (request, response) => {
  await transaction(async (client) => {
    const order = await client.query(`SELECT id, status FROM sales_orders WHERE order_number = $1 FOR UPDATE`, [request.params.orderNumber])
    if (!order.rowCount) fail(404, 'Sales order not found.')
    if (order.rows[0].status !== 'CONFIRMED') fail(409, 'Only confirmed sales orders can be dispatched.')
    const items = await itemsFor(client, 'sales_order_items', 'sales_order_id', order.rows[0].id)
    await lockProducts(client, items)
    for (const item of items) {
      const update = await client.query(
        `UPDATE products
         SET physical_quantity = physical_quantity - $1, reserved_quantity = reserved_quantity - $1
         WHERE id = $2 AND reserved_quantity >= $1 AND physical_quantity >= $1`,
        [item.quantity, item.productId],
      )
      if (!update.rowCount) fail(409, 'The order reservation is invalid. Review inventory before dispatching.')
    }
    await client.query(`UPDATE sales_orders SET status = 'DISPATCHED' WHERE id = $1`, [order.rows[0].id])
  })
  response.json({ status: 'DISPATCHED' })
})

app.post('/api/orders/:orderNumber/cancel', async (request, response) => {
  await transaction(async (client) => {
    const order = await client.query(`SELECT id, status FROM sales_orders WHERE order_number = $1 FOR UPDATE`, [request.params.orderNumber])
    if (!order.rowCount) fail(404, 'Sales order not found.')
    if (!['PENDING', 'CONFIRMED'].includes(order.rows[0].status)) fail(409, 'Only pending or confirmed sales orders can be cancelled.')
    if (order.rows[0].status === 'CONFIRMED') {
      const items = await itemsFor(client, 'sales_order_items', 'sales_order_id', order.rows[0].id)
      await lockProducts(client, items)
      for (const item of items) {
        const update = await client.query(
          `UPDATE products SET reserved_quantity = reserved_quantity - $1 WHERE id = $2 AND reserved_quantity >= $1`,
          [item.quantity, item.productId],
        )
        if (!update.rowCount) fail(409, 'The order reservation is invalid. The order was not cancelled.')
      }
    }
    await client.query(`UPDATE sales_orders SET status = 'CANCELLED' WHERE id = $1`, [order.rows[0].id])
  })
  response.json({ status: 'CANCELLED' })
})

app.post('/api/products', async (request, response) => {
  const { code, name, category, unit, price, physical } = request.body ?? {}
  const normalizedPrice = Number(price)
  const normalizedPhysical = Number(physical)
  if (![code, name, category, unit].every((value) => typeof value === 'string' && value.trim())) fail(400, 'Product code, name, category, and unit are required.')
  if (!isNumericInput(price) || normalizedPrice < 0 || normalizedPrice > 9999999999.99
    || !isNumericInput(physical) || !Number.isSafeInteger(normalizedPhysical)
    || normalizedPhysical < 0 || normalizedPhysical > 2147483647) {
    fail(400, 'Base price must be non-negative and physical quantity must be a non-negative whole number.')
  }
  const result = await pool.query(
    `INSERT INTO products (product_code, product_name, category, unit, base_price, physical_quantity)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [code.trim(), name.trim(), category.trim(), unit.trim(), normalizedPrice, normalizedPhysical],
  )
  response.status(201).json({ id: result.rows[0].id })
})

app.patch('/api/products/:productId/inventory', async (request, response) => {
  if (!isPositiveId(request.params.productId)) fail(400, 'Invalid product ID.')
  const physicalInput = request.body?.physical
  const physical = Number(physicalInput)
  if (!isNumericInput(physicalInput) || !Number.isSafeInteger(physical) || physical < 0 || physical > 2147483647) fail(400, 'Physical quantity must be a non-negative whole number within the supported range.')
  const result = await pool.query(
    `UPDATE products SET physical_quantity = $1
     WHERE id = $2 AND $1 >= reserved_quantity
     RETURNING id`,
    [physical, Number(request.params.productId)],
  )
  if (!result.rowCount) {
    const exists = await pool.query(`SELECT reserved_quantity FROM products WHERE id = $1`, [Number(request.params.productId)])
    if (!exists.rowCount) fail(404, 'Product not found.')
    fail(409, `Physical quantity cannot be less than the ${exists.rows[0].reserved_quantity} units already reserved.`)
  }
  response.json({ physical })
})

app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API endpoint not found.' })
})

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && error.status === 400) {
    response.status(400).json({ error: 'Request body must contain valid JSON.' })
    return
  }
  if (error.code === '23505') {
    response.status(409).json({ error: 'A record with that unique value already exists.' })
    return
  }
  if (['23503', '23514', '22P02', '22001', '22003'].includes(error.code)) {
    response.status(400).json({ error: 'The submitted data is invalid or references a missing record.' })
    return
  }
  if (error instanceof ApiError) {
    response.status(error.status).json({ error: error.message })
    return
  }
  console.error('API request failed:', error)
  response.status(500).json({ error: 'An unexpected server error occurred.' })
})

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required. Copy .env.example to .env and configure PostgreSQL.')
  process.exit(1)
}

const server = app.listen(port, host, () => console.log(`Forgeflow API listening on http://${host}:${port}`))
const shutdown = async () => {
  server.close()
  await pool.end()
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
