INSERT INTO products (product_code, product_name, category, unit, base_price, physical_quantity, reserved_quantity)
VALUES
  ('IND-001', 'Hydraulic Gear Pump', 'Hydraulics', 'pcs', 2450, 420, 86),
  ('IND-002', 'Deep Groove Ball Bearing', 'Bearings', 'pcs', 1380, 260, 42),
  ('IND-003', 'Pneumatic Solenoid Valve', 'Pneumatics', 'pcs', 3875, 310, 110),
  ('IND-004', 'Heavy Duty Coupling', 'Power transmission', 'pcs', 5620, 145, 28),
  ('IND-005', 'Precision Steel Rod', 'Raw materials', 'm', 860, 680, 155),
  ('IND-006', 'Pressure Control Valve', 'Valves', 'pcs', 9240, 98, 21)
ON CONFLICT DO NOTHING;

INSERT INTO customers (company_name, contact_person, mobile, email, city)
VALUES
  ('ABC Engineering Pvt. Ltd.', 'Rahul Mehta', '+91 98765 43210', 'rahul@abcengineering.in', 'Pune'),
  ('Summit Industrial Works', 'Priya Shah', '+91 98220 11440', 'priya@summitworks.in', 'Mumbai'),
  ('Vertex Manufacturing Co.', 'Amit Kulkarni', '+91 97654 33210', 'amit@vertexmfg.in', 'Nashik'),
  ('Northstar Process Systems', 'Neha Rao', '+91 99870 12345', 'neha@northstar.in', 'Bengaluru')
ON CONFLICT (company_name, contact_person) DO NOTHING;

INSERT INTO enquiries (enquiry_number, customer_id, enquiry_date, required_date, notes, status)
SELECT sample.enquiry_number, customers.id, sample.enquiry_date, sample.required_date, sample.notes, sample.status
FROM (VALUES
  ('ENQ-2025-042', 'ABC Engineering Pvt. Ltd.', 'Rahul Mehta', DATE '2025-05-20', DATE '2025-06-18', 'Required for the new assembly line.', 'QUOTED'),
  ('ENQ-2025-041', 'Summit Industrial Works', 'Priya Shah', DATE '2025-05-19', DATE '2025-06-12', 'Please include technical datasheets.', 'NEW'),
  ('ENQ-2025-040', 'Vertex Manufacturing Co.', 'Amit Kulkarni', DATE '2025-05-17', DATE '2025-06-10', 'Repeat order, same specifications.', 'WON'),
  ('ENQ-2025-039', 'Northstar Process Systems', 'Neha Rao', DATE '2025-05-16', DATE '2025-06-24', 'Budget confirmation pending.', 'LOST')
) AS sample(enquiry_number, company_name, contact_person, enquiry_date, required_date, notes, status)
JOIN customers ON customers.company_name = sample.company_name AND customers.contact_person = sample.contact_person
ON CONFLICT (enquiry_number) DO NOTHING;

INSERT INTO enquiry_items (enquiry_id, product_id, quantity)
SELECT enquiries.id, products.id, sample.quantity
FROM (VALUES
  ('ENQ-2025-042', 'IND-001', 100), ('ENQ-2025-042', 'IND-002', 40), ('ENQ-2025-042', 'IND-003', 200),
  ('ENQ-2025-041', 'IND-004', 8), ('ENQ-2025-041', 'IND-006', 4),
  ('ENQ-2025-040', 'IND-005', 120), ('ENQ-2025-039', 'IND-003', 24)
) AS sample(enquiry_number, product_code, quantity)
JOIN enquiries ON enquiries.enquiry_number = sample.enquiry_number
JOIN products ON products.product_code = sample.product_code
ON CONFLICT (enquiry_id, product_id) DO NOTHING;

INSERT INTO quotations (quotation_number, enquiry_id, quotation_date, valid_until, status)
SELECT sample.quotation_number, enquiries.id, sample.quotation_date, sample.valid_until, sample.status
FROM (VALUES
  ('QUO-2025-019', 'ENQ-2025-041', DATE '2025-05-20', DATE '2025-06-20', 'ACCEPTED'),
  ('QUO-2025-018', 'ENQ-2025-042', DATE '2025-05-20', DATE '2025-06-20', 'SENT'),
  ('QUO-2025-017', 'ENQ-2025-040', DATE '2025-05-19', DATE '2025-06-18', 'ACCEPTED'),
  ('QUO-2025-016', 'ENQ-2025-039', DATE '2025-05-17', DATE '2025-06-01', 'REJECTED')
) AS sample(quotation_number, enquiry_number, quotation_date, valid_until, status)
JOIN enquiries ON enquiries.enquiry_number = sample.enquiry_number
ON CONFLICT (quotation_number) DO NOTHING;

INSERT INTO quotation_items (quotation_id, product_id, quantity, unit_price, discount_percent, gst_percent)
SELECT quotations.id, products.id, sample.quantity, sample.unit_price, sample.discount_percent, sample.gst_percent
FROM (VALUES
  ('QUO-2025-019', 'IND-004', 8, 5620, 0, 18), ('QUO-2025-019', 'IND-006', 4, 9240, 0, 18),
  ('QUO-2025-018', 'IND-001', 100, 2450, 5, 18), ('QUO-2025-018', 'IND-002', 40, 1380, 0, 18),
  ('QUO-2025-017', 'IND-005', 120, 860, 2, 18),
  ('QUO-2025-016', 'IND-003', 24, 3875, 0, 18)
) AS sample(quotation_number, product_code, quantity, unit_price, discount_percent, gst_percent)
JOIN quotations ON quotations.quotation_number = sample.quotation_number
JOIN products ON products.product_code = sample.product_code
ON CONFLICT (quotation_id, product_id) DO NOTHING;

INSERT INTO sales_orders (order_number, quotation_id, order_date, status)
SELECT 'SO-2025-009', quotations.id, DATE '2025-05-20', 'PENDING'
FROM quotations
WHERE quotations.quotation_number = 'QUO-2025-017'
ON CONFLICT (order_number) DO NOTHING;

INSERT INTO sales_order_items (sales_order_id, product_id, quantity, unit_price, discount_percent, gst_percent)
SELECT sales_orders.id, quotation_items.product_id, quotation_items.quantity, quotation_items.unit_price, quotation_items.discount_percent, quotation_items.gst_percent
FROM sales_orders
JOIN quotations ON quotations.id = sales_orders.quotation_id
JOIN quotation_items ON quotation_items.quotation_id = quotations.id
WHERE sales_orders.order_number = 'SO-2025-009'
ON CONFLICT (sales_order_id, product_id) DO NOTHING;
