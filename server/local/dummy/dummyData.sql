INSERT INTO patients (
  id,
  name,
  email,
  profile_image,
  contact,
  address,
  dob
) VALUES
('1a2b3c', 'Alice Johnson', 'alice@example.com', 'https://example.com/profiles/alice.jpg', '+1-555-1234', '123 Elm Street, NY', '1989-06-12'),
('1a2b3c', 'Bob Smith', 'bob@example.com', NULL, '+1-555-5678', '456 Maple Street, CA', '1985-03-21'),
('3c4d5e', 'Carol Davis', 'carol.davis@example.com', 'https://example.com/profiles/carol.jpg', '+1-555-6789', '789 Oak Ave, TX', '1990-11-30'),
('4d5e6f', 'David Thompson', 'david.t@example.com', NULL, '+1-555-2468', '135 Pine Road, FL', '1978-07-19'),
('5e6f7g', 'Eve Williams', 'eve.williams@example.com', 'https://example.com/profiles/eve.jpg', '+1-555-3579', NULL, '1995-02-10'),
('6f7g8h', 'Frank Miller', 'frank.m@example.com', NULL, '+1-555-4680', '456 Birch Lane, WA', '1982-04-18'),
('7g8h9i', 'Grace Lee', 'grace.lee@example.com', 'https://example.com/profiles/grace.jpg', '+1-555-5791', '678 Cedar Blvd, NJ', '1993-01-05'),
('8h9i0j', 'Henry Kim', 'henry.kim@example.com', NULL, '+1-555-6802', NULL, '1986-09-14'),
('9i0j1k', 'Isla Brown', 'isla.b@example.com', 'https://example.com/profiles/isla.jpg', '+1-555-7913', '890 Walnut Dr, IL', '1991-06-26'),
('0j1k2l', 'Jack White', 'jack.white@example.com', NULL, '+1-555-8024', '321 Spruce Way, CO', '1988-12-09'),
('1k2l3m', 'Karen Young', 'karen.y@example.com', 'https://example.com/profiles/karen.jpg', '+1-555-9135', '210 Hickory Rd, MI', '1994-03-22'),
('2l3m4n', 'Leo Martinez', 'leo.m@example.com', NULL, '+1-555-0246', '144 Palm St, AZ', '1980-08-30'),
('3m4n5o', 'Mona Patel', 'mona.patel@example.com', 'https://example.com/profiles/mona.jpg', '+1-555-1357', NULL, '1983-10-11'),
('4n5o6p', 'Noah Scott', 'noah.s@example.com', NULL, '+1-555-2468', '555 Cypress Ave, GA', '1992-05-03'),
('5o6p7q', 'Olivia Green', 'olivia.g@example.com', 'https://example.com/profiles/olivia.jpg', '+1-555-3579', '101 Redwood Pl, OH', '1996-07-17');

---


INSERT INTO clinicians (
  id,
  name,
  password,
  specialty,
  email,
  profile_image,
  contact,
  created_at,
  updated_at
) VALUES
(
  'test-clinician-001',
  'Dr. John Smith',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Cardiologist',
  'john.smith@medflow.com',
  NULL,
  '+1-555-123-4567',
  '2025-01-13T06:00:00.000Z',
  '2025-01-13T06:00:00.000Z'
),
(
  'test-clinician-002',
  'Dr. John Smith',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Cardiologist',
  'john2.smith@medflow.com',
  NULL,
  '+1-555-123-4567',
  '2025-01-13T06:00:00.000Z',
  '2025-01-13T06:00:00.000Z'
);

----

INSERT INTO visits (
  id,
  clinician_id,
  patient_id,
  patient_name,
  visit_type,
  notes,
  created_at,
  updated_at
) VALUES
('visit-001', 'test-clinician-001', '1a2b3c', 'Alice Johnson', 'general', 'Routine check-up', '2025-07-12T09:00:00Z', '2025-07-12T09:00:00Z'),
('visit-002', 'test-clinician-001', '1a2b3c', 'Bob Smith', 'general', 'Discuss test results', '2025-07-12T09:30:00Z', '2025-07-12T09:30:00Z'),
('visit-003', 'test-clinician-001', '3c4d5e', 'Carol Davis', 'general', NULL, '2025-07-12T10:00:00Z', '2025-07-12T10:00:00Z'),
('visit-004', 'test-clinician-002', '1a2b3c', 'Alice Johnson', 'general', 'Follow-up on medication', '2025-07-12T10:30:00Z', '2025-07-12T10:30:00Z'),
('visit-005', 'test-clinician-002', '1a2b3c', 'Bob Smith', 'general', NULL, '2025-07-12T11:00:00Z', '2025-07-12T11:00:00Z'),
('visit-006', 'test-clinician-002', '3c4d5e', 'Carol Davis', 'general', 'Initial consultation', '2025-07-12T11:30:00Z', '2025-07-12T11:30:00Z'),
('visit-007', 'test-clinician-001', '1a2b3c', 'Alice Johnson', 'general', 'Lab review', '2025-07-12T12:00:00Z', '2025-07-12T12:00:00Z'),
('visit-008', 'test-clinician-001', '1a2b3c', 'Bob Smith', 'general', NULL, '2025-07-12T12:30:00Z', '2025-07-12T12:30:00Z'),
('visit-009', 'test-clinician-001', '3c4d5e', 'Carol Davis', 'general', 'Discuss MRI', '2025-07-12T13:00:00Z', '2025-07-12T13:00:00Z'),
('visit-010', 'test-clinician-002', '1a2b3c', 'Alice Johnson', 'general', NULL, '2025-07-12T13:30:00Z', '2025-07-12T13:30:00Z'),
('visit-011', 'test-clinician-002', '1a2b3c', 'Bob Smith', 'general', 'Allergy check', '2025-07-12T14:00:00Z', '2025-07-12T14:00:00Z'),
('visit-012', 'test-clinician-002', '3c4d5e', 'Carol Davis', 'general', NULL, '2025-07-12T14:30:00Z', '2025-07-12T14:30:00Z'),
('visit-013', 'test-clinician-001', '1a2b3c', 'Alice Johnson', 'general', 'Blood pressure follow-up', '2025-07-12T15:00:00Z', '2025-07-12T15:00:00Z'),
('visit-014', 'test-clinician-001', '1a2b3c', 'Bob Smith', 'general', NULL, '2025-07-12T15:30:00Z', '2025-07-12T15:30:00Z'),
('visit-015', 'test-clinician-001', '3c4d5e', 'Carol Davis', 'general', 'Check post-surgery progress', '2025-07-12T16:00:00Z', '2025-07-12T16:00:00Z');
