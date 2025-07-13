import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Layout from "./components/Layout";

// lazy load these components
import PatientsListing from "./pages/PatientsListing";
import CliniciansListing from "./pages/CliniciansListing";
import VisitsListing from "./pages/VisitsListing";
import EmptyPage from "./pages/EmptyPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
              <Route index element={<VisitsListing />} />
              <Route path="patients" element={<PatientsListing />} />
              <Route path="clinicians" element={<CliniciansListing />} />
              {/* <Route path="create-visit" element={<CreateVisit />} /> */}
            </Route>
          </Route>

          {/* Redirect root path to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
