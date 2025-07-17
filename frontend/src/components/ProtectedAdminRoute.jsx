import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedAdminRoute;
