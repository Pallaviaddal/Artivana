import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/getUser";

function ProtectedRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
