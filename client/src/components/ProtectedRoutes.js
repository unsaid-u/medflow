import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const { loggedIn } = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes; 