import React from "react";
import Landing from "./pages/public/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Houses from "./pages/tenant/Houses";
import BecomeLandlord from "./pages/landlord/BecomeLandlord";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import HouseDetails from "./pages/public/HouseDetails";
import AllHouses from "./pages/tenant/AllHouses";
import NotFound from "./pages/public/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        {/* // Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* house routes */}
        <Route path="/houses/:id" element={<HouseDetails />} />
        <Route path="/all-houses" element={<AllHouses />} /> 

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
