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
  'test-clinician-003',
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
  'test-clinician-004',
  'Dr. Sarah Johnson',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Neurologist',
  'sarah.johnson@medflow.com',
  NULL,
  '+1-555-123-4568',
  '2025-01-13T06:00:00.000Z',
  '2025-01-13T06:00:00.000Z'
); 