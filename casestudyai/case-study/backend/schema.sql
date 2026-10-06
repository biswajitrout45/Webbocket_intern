CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  UNIQUE (company_name, contact_person)
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_code TEXT NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  base_price NUMERIC(12, 2) NOT NULL CHECK (base_price >= 0),
  physical_quantity INTEGER NOT NULL DEFAULT 0 CHECK (physical_quantity >= 0),
  reserved_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0 AND reserved_quantity <= physical_quantity)
);

CREATE UNIQUE INDEX IF NOT EXISTS products_product_code_ci_idx ON products (LOWER(product_code));

CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  enquiry_number TEXT NOT NULL UNIQUE,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  enquiry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  required_date DATE NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'QUOTED', 'WON', 'LOST'))
);

CREATE TABLE IF NOT EXISTS enquiry_items (
  id SERIAL PRIMARY KEY,
  enquiry_id INTEGER NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  UNIQUE (enquiry_id, product_id)
);

CREATE TABLE IF NOT EXISTS quotations (
  id SERIAL PRIMARY KEY,
  quotation_number TEXT NOT NULL UNIQUE,
  enquiry_id INTEGER NOT NULL REFERENCES enquiries(id),
  quotation_date DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_until DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SENT', 'ACCEPTED', 'REJECTED'))
);

CREATE TABLE IF NOT EXISTS quotation_items (
  id SERIAL PRIMARY KEY,
  quotation_id INTEGER NOT NULL REFERENCES quotations(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  discount_percent NUMERIC(5, 2) NOT NULL CHECK (discount_percent BETWEEN 0 AND 100),
  gst_percent NUMERIC(5, 2) NOT NULL CHECK (gst_percent BETWEEN 0 AND 100),
  UNIQUE (quotation_id, product_id)
);

CREATE TABLE IF NOT EXISTS sales_orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  quotation_id INTEGER NOT NULL UNIQUE REFERENCES quotations(id),
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'DISPATCHED', 'CANCELLED'))
);

CREATE TABLE IF NOT EXISTS sales_order_items (
  id SERIAL PRIMARY KEY,
  sales_order_id INTEGER NOT NULL REFERENCES sales_orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
  discount_percent NUMERIC(5, 2) NOT NULL CHECK (discount_percent BETWEEN 0 AND 100),
  gst_percent NUMERIC(5, 2) NOT NULL CHECK (gst_percent BETWEEN 0 AND 100),
  UNIQUE (sales_order_id, product_id)
);

CREATE INDEX IF NOT EXISTS enquiries_customer_id_idx ON enquiries(customer_id);
CREATE INDEX IF NOT EXISTS enquiry_items_enquiry_id_idx ON enquiry_items(enquiry_id);
CREATE INDEX IF NOT EXISTS quotations_enquiry_id_idx ON quotations(enquiry_id);
CREATE INDEX IF NOT EXISTS sales_orders_quotation_id_idx ON sales_orders(quotation_id);
