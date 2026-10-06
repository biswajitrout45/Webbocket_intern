# Forgeflow — Industrial ERP

Forgeflow is an industrial sales and inventory workspace with a React frontend, an Express REST API, and PostgreSQL persistence.

## Features

- Separate Admin and Sales dashboards, switchable from the top bar.
- Customer enquiries with customer details, required dates, notes, and multiple products.
- Quotations with editable product quantities, prices, discounts, GST, validity, and calculated totals.
- Accepted quotation conversion into one traceable sales order.
- Admin order confirmation reserves stock transactionally; dispatch deducts physical stock and releases the reservation.
- Inventory that tracks physical and reserved quantities and calculates available stock.
- Product master with six seeded industrial products and sample enquiry-to-order data.
- PostgreSQL constraints and API-side validation for workflow states, quantities, and unique order conversion.

## Requirements

- Node.js 20.19+ (or 22.12+).
- PostgreSQL 14+.

## Configure and initialize PostgreSQL

Create a database, for example:

```sh
createdb forgeflow
```

Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string. Then install dependencies and initialize the schema/sample data:

```sh
npm install
npm run db:setup
```

The setup script is safe to run again: it creates missing tables and seeds sample records without duplicating them.

## Run locally

In one terminal, start the API:

```sh
npm run server
```

In another terminal, start the Vite frontend:

```sh
npm run dev
```

The Vite development server proxies `/api` requests to the API on port `3001` by default. Set `API_PORT` in `.env` to change the API port, and update the Vite proxy in `vite.config.js` to match. The API binds to `127.0.0.1`; set `API_HOST=0.0.0.0` only when your deployment needs container/network access.

## API

- `GET /api/health` — check API/database connectivity.
- `GET /api/bootstrap` — fetch products, enquiries, quotations, and orders.
- `POST /api/enquiries` — create a customer enquiry.
- `POST /api/quotations` — create a draft quotation.
- `PATCH /api/quotations/:quotationNumber/status` — send, accept, or reject a quotation.
- `POST /api/quotations/:quotationNumber/orders` — convert an accepted quotation to one order.
- `POST /api/orders/:orderNumber/confirm` — reserve all required stock in a transaction.
- `POST /api/orders/:orderNumber/dispatch` — deduct physical stock and release reservations.
- `POST /api/orders/:orderNumber/cancel` — cancel a pending/confirmed order and release its reservation.
- `POST /api/products` — add a product and opening stock.
- `PATCH /api/products/:productId/inventory` — update physical inventory without reducing it below reservations.

## Source layout

- `src/App.jsx` — API-backed application state and page shell.
- `src/api.js` — frontend API client.
- `src/pages/` and `src/components/` — dashboards, workflow screens, and reusable UI.
- `backend/server.js` — Express API and transactional workflow handlers.
- `backend/schema.sql` — PostgreSQL tables, constraints, and indexes.
- `backend/seed.sql` — idempotent sample catalogue and sales pipeline records.
- `backend/setup.js` — schema and sample-data initializer.

## Security and deployment

The Admin/Sales role switch remains a frontend demonstration, not authentication. The API currently has no sign-in, authorization, or tenant isolation, so do not expose it to untrusted networks or use it for sensitive production data without adding authenticated, server-enforced access control. For deployment, serve the built frontend and proxy `/api` to the Express service on the same origin, and provide database credentials through the hosting environment rather than committing `.env`.
