import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Home, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LandlordSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/landlord/dashboard", icon: "📊" },
    { name: "My Houses", path: "/landlord/houses", icon: "🏠" },
    { name: "Add House", path: "/landlord/add-house", icon: "➕" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-indigo-600 text-white rounded-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-linear-to-b from-indigo-900 to-indigo-800 w-64 text-white transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-indigo-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-yellow-300">Inzu</span>Hub
          </h1>
          <p className="text-indigo-300 text-xs mt-1">Landlord Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? "bg-yellow-400 text-indigo-900 font-semibold"
                  : "text-indigo-100 hover:bg-indigo-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main content offset */}
      <div className="lg:ml-64" />
    </>
  );
}
