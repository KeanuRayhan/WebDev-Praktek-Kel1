import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const ProtectedRoute = ({ children, roleRequired }) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser || currentUser.role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
