import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Layout from "./components/Layout";
import PatientsListing from "./pages/PatientsListing";
import CliniciansListing from "./pages/CliniciansListing";

// Dummy Page Components
const Login = () => <h1>Login Page</h1>;
const Register = () => <h1>Register Page</h1>;
const Dashboard = () => <h1>Dashboard</h1>;

const CreateVisit = () => <h1>Create Visit</h1>;

// 3. App Component with Routes
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Nested Routes */}
          <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="patients" element={<PatientsListing />} />
              <Route path="clinicians" element={<CliniciansListing />} />
              <Route path="create-visit" element={<CreateVisit />} />
            </Route>
          </Route>

          {/* Redirect root path to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
