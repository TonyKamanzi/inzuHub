import React from "react";
import LandlordSidebar from "./Sidebar";

export default function LandlordLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <LandlordSidebar />
      <div className="flex-1  w-full">{children}</div>
    </div>
  );
}
