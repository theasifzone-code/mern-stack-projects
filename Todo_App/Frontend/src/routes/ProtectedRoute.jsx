import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation(); // helps redirect back to previous page

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600 text-lg font-medium">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirects to login & saves previous route for post-login redirect
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
