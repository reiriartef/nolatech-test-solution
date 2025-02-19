import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import React from "react";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
