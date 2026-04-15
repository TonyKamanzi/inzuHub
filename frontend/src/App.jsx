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
import AdminLayout from "./components/admin/AdminLayout";
import LandlordLayout from "./components/landlord/LandlordLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminLandlords from "./pages/admin/Landlords";
import AdminHouses from "./pages/admin/Houses";

// Landlord Pages
import LandlordDashboard from "./pages/landlord/Dashboard";
import LandlordHouses from "./pages/landlord/Houses";
import AddHouse from "./pages/landlord/AddHouse";
import EditHouse from "./pages/landlord/EditHouse";

// Tenant Pages
import Home from "./pages/tenant/Home";
import Favorites from "./pages/tenant/Favorites";
import Profile from "./pages/tenant/Profile";

export default function App() {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/login",
    "/signup",
    "/admin",
    "/admin/users",
    "/admin/landlords",
    "/admin/houses",
    "/landlord",
    "/landlord/dashboard",
    "/landlord/houses",
    "/landlord/add-house",
    "/landlord/edit-house",
  ];
  const showNavbar = !hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

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
          path="/home"
          element={
            <ProtectedRoute requiredRole="tenant">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute requiredRole="tenant">
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute requiredRole="tenant">
              <Profile />
            </ProtectedRoute>
          }
        />
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
              <LandlordLayout>
                <LandlordDashboard />
              </LandlordLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/landlord/houses"
          element={
            <ProtectedRoute requiredRole="landlord">
              <LandlordLayout>
                <LandlordHouses />
              </LandlordLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/landlord/add-house"
          element={
            <ProtectedRoute requiredRole="landlord">
              <LandlordLayout>
                <AddHouse />
              </LandlordLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/landlord/edit-house/:id"
          element={
            <ProtectedRoute requiredRole="landlord">
              <LandlordLayout>
                <EditHouse />
              </LandlordLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/landlords"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminLandlords />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/houses"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <AdminHouses />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
