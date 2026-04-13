import React from "react";
import Landing from "./pages/public/Landing";
import { Route, Routes, useLocation } from "react-router-dom";
import Houses from "./pages/tenant/Houses";
import BecomeLandlord from "./pages/landlord/BecomeLandlord";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import HouseDetails from "./pages/public/HouseDetails";
import AllHouses from "./pages/tenant/AllHouses";
import NotFound from "./pages/public/NotFound";
import Navbar from "./components/shared/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* House routes */}
        <Route path="/houses/:id" element={<HouseDetails />} />
        <Route path="/all-houses" element={<AllHouses />} />

        {/* Tenant Routes */}
        <Route
          path="/tenant/houses"
          element={
            <ProtectedRoute requiredRole="tenant">
              <Houses />
            </ProtectedRoute>
          }
        />

        {/* Landlord Routes */}
        <Route
          path="/landlord/dashboard"
          element={
            <ProtectedRoute requiredRole="landlord">
              <BecomeLandlord />
            </ProtectedRoute>
          }
        />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
