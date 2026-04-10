import React from "react";
import Landing from "./pages/public/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Houses from "./pages/tenant/Houses";
import BecomeLandlord from "./pages/landlord/BecomeLandlord";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import HouseDetails from "./pages/public/HouseDetails";

export default function App() {
  return (
    <>
      <Routes>
        {/* // Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/become-a-landlord" element={<BecomeLandlord />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* house routes */}
        <Route path="/houses" element={<Houses />} />
        <Route path="/houses/:id" element={<HouseDetails />} />
      </Routes>
    </>
  );
}
