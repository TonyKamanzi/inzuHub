import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  LogOut,
  User,
  Settings,
  Heart,
  Home,
  Calendar,
  Bell,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import NotificationBadge from "./NotificationBadge";

const ROLE_BADGE = {
  admin: "bg-red-50 text-red-700",
  landlord: "bg-purple-50 text-purple-700",
  tenant: "bg-green-50 text-green-700",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <header className="bg-white border-b border-gray-100 z-50 w-full fixed">
      <div className="max-w-7xl mx-auto px-5">
        <nav className="flex items-center justify-between h-15">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7  rounded-lg flex items-center justify-center">
              <img src="/logo.png" className=" w-7 h-7 text-white" />
            </div>
            <span className="font-semibold text-gray-900 tracking-tight">
              inzuHub
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "#houses", label: "Browse Houses" },
              ...(isAuthenticated && user?.role === "tenant"
                ? [
                    { to: "/favorites", label: "Favorites" },
                    { to: "/tenant/bookings", label: "My Bookings" },
                  ]
                : []),
              ...(isAuthenticated && user?.role === "landlord"
                ? [{ to: "/landlord/dashboard", label: "My Properties" }]
                : []),
            ].map(({ to, label }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <NotificationBadge />

                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full pl-1.5 pr-3 py-1.5 transition"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                      {initials}
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {user?.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_BADGE[user?.role] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {user?.role}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-400 capitalize">
                            {user?.role}
                          </p>
                        </div>

                        {user?.role === "tenant" && (
                          <>
                            <DropdownItem
                              to="/profile"
                              icon={<User className="w-3.5 h-3.5" />}
                              label="My Profile"
                            />
                            <DropdownItem
                              to="/favorites"
                              icon={<Heart className="w-3.5 h-3.5" />}
                              label="My Favorites"
                            />
                            <DropdownItem
                              to="/tenant/bookings"
                              icon={<Calendar className="w-3.5 h-3.5" />}
                              label="My Bookings"
                            />
                          </>
                        )}
                        {user?.role === "landlord" && (
                          <DropdownItem
                            to="/landlord/dashboard"
                            icon={<Home className="w-3.5 h-3.5" />}
                            label="My Properties"
                          />
                        )}
                        {user?.role === "admin" && (
                          <DropdownItem
                            to="/admin"
                            icon={<Settings className="w-3.5 h-3.5" />}
                            label="Admin Panel"
                          />
                        )}

                        <div className="border-t border-gray-100">
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-white bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 transition"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {[
                { to: "/", label: "Home" },
                { to: "#houses", label: "Browse Houses" },
                ...(isAuthenticated && user?.role === "tenant"
                  ? [
                      { to: "/favorites", label: "Favorites" },
                      { to: "/tenant/bookings", label: "My Bookings" },
                    ]
                  : []),
                ...(isAuthenticated && user?.role === "landlord"
                  ? [{ to: "/landlord/dashboard", label: "My Properties" }]
                  : []),
              ].map(({ to, label }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="px-5 pb-4 border-t border-gray-100 pt-4">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_BADGE[user?.role] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {user?.role}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-1.5 text-sm text-red-600 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="flex-1 text-center text-sm font-medium border border-gray-200 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 text-center text-sm font-medium bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DropdownItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
    >
      <span className="text-gray-400">{icon}</span>
      {label}
    </Link>
  );
}
