import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Check if landlord is approved
  if (requiredRole === "landlord" && user?.status !== "approved") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pending Approval
          </h1>
          <p className="text-gray-600 mb-6">
            Your landlord account is awaiting admin approval. You'll be able to
            access your dashboard once approved.
          </p>
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
