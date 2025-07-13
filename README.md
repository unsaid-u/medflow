# Medflow

A comprehensive medical practice management system designed to streamline patient visits, clinician management, and healthcare operations.

## Description

Medflow is a full-stack web application that provides healthcare professionals with an intuitive platform to manage patient visits, track clinician information, and maintain organized medical records. Built with modern technologies, it offers a clean, responsive interface for efficient healthcare practice management.

## Functional Requirements

### Core Features

- **Patient Management**: Create, view, and manage patient records with comprehensive information
- **Clinician Management**: Handle clinician profiles, specialties, and credentials
- **Visit Tracking**: Log and monitor patient visits with detailed notes and visit types
- **User Authentication**: Secure login and registration system for clinicians
- **Dashboard Interface**: Clean, intuitive navigation with real-time data display
- **Data Pagination**: Efficient handling of large datasets with server-side pagination

### Technical Features

- **RESTful API**: Complete backend API with proper validation and error handling
- **Database Management**: SQLite database with Knex.js migrations and Objection.js ORM
- **Real-time Updates**: Dynamic data refresh and real-time interface updates
- **Responsive Design**: Mobile-friendly interface using Material-UI components
- **Security**: Password hashing, input validation, and CORS protection

## Tech Stack

### Backend

- **Node.js** with Express.js framework
- **SQLite** database with Knex.js query builder
- **Objection.js** ORM for data modeling
- **bcryptjs** for password hashing
- **AJV** for request validation
- **CORS** for cross-origin resource sharing

### Frontend

- **React.js** with modern hooks and context API
- **Material-UI** for component library and styling
- **React Router** for navigation and routing
- **Styled Components** for custom styling
- **Axios** for API communication

## Local Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Server Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run database migrations**

   ```bash
   cd server/local
   sh run.migrate.sh
   ```

3. **Add dummy data (for patients)**

   ```bash
   node server/local/dummy/populatePatientsData.js
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3001`

### Client Setup

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   The client will start on `http://localhost:3000`

```
Register a new user (clinician)
Using those creds login
You will be able access the dashboard
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/login` - Clinician login
- `POST /api/v1/auth/register` - Clinician registration (this creates a new Clinician)

### Patients

- `GET /api/v1/patients` - Get all patients (with pagination)
- `GET /api/v1/patients/:id` - Get patient by ID

### Clinicians

- `GET /api/v1/clinicians` - Get all clinicians (with pagination)

### Visits

- `GET /api/v1/visits` - Get all visits (with pagination)
- `POST /api/v1/visits` - Create new visit

## Database Schema

### Patients Table

- `id` (Primary Key)
- `name` (Required)
- `email` (Required, Unique)
- `profile_image` (Optional)
- `contact` (Required)
- `address` (Optional)
- `dob` (Required)
- `created_at`, `updated_at` (Timestamps)

### Clinicians Table

- `id` (Primary Key)
- `name` (Required)
- `password` (Required, Hashed)
- `specialty` (Required)
- `email` (Required, Unique)
- `profile_image` (Optional)
- `contact` (Required)
- `created_at`, `updated_at` (Timestamps)

### Visits Table

- `id` (Primary Key)
- `clinician_id` (Foreign Key)
- `patient_id` (Foreign Key)
- `patient_name` (Required)
- `visit_type` (Optional, Default: "general")
- `notes` (Optional)
- `created_at`, `updated_at` (Timestamps)

## Available Scripts

### Server Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate:up` - Run all pending migrations
- `npm run migrate:down` - Rollback last migration
- `npm run migrate:single` - Run single migration

### Client Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Future Scope

### Planned Features

- **Advanced Authentication**: JWT tokens with refresh mechanism
- **File Upload**: Profile image upload functionality
- **check In/Out**: Check in/out capability for doctors visiting patients
- **Advanced Search**: Full-text search capabilities
- **Admin login**: Admin login for managing clinicians and patients

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

**Utkarsh** - [GitHub](https://github.com/unsaid-u)

## Support

For support and questions, please open an issue on the [GitHub repository](https://github.com/unsaid-u/medflow/issues).
