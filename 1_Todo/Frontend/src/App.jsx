import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DashboardScreen from "./pages/Dashboard/DashboardScreen";
import ApiKeyManagement from "./pages/ApiKey/ApiKeyManagement";
import NotFound from "./pages/NotFound";

// Hooks
import useAuth from "./hooks/useAuth";

// Components
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-bold text-indigo-600">
        Checking Authentication...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Navbar for authenticated users */}
      {isAuthenticated && <Navbar />}

      <main className="container mx-auto px-4 mt-6">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>}
          />
          <Route
            path="/apikeys"
            element={<ProtectedRoute><ApiKeyManagement /></ProtectedRoute>}
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer for authenticated users */}
      {isAuthenticated && <Footer />}
    </BrowserRouter>
  );
}
