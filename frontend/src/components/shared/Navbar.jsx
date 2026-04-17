import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  LogOut,
  User,
  Settings,
  Heart,
  Home,
  Calendar,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import NotificationBadge from "./NotificationBadge";

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

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "landlord":
        return "bg-purple-100 text-purple-800";
      case "tenant":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="inzuHub Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 font-semibold">
            <li>
              <Link
                to="/"
                className="hover:text-blue-500 text-gray-700 font-light"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#houses"
                className="hover:text-blue-500 text-gray-700 font-light"
              >
                Browse Houses
              </a>
            </li>

            {isAuthenticated && user?.role === "tenant" && (
              <>
                <li>
                  <Link
                    to="/favorites"
                    className="hover:text-red-500 text-gray-700 font-light"
                  >
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-blue-500 text-gray-700 font-light"
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated && user?.role === "landlord" && (
              <li>
                <Link
                  to="/landlord/dashboard"
                  className="hover:text-purple-500 text-gray-700 font-light"
                >
                  My Properties
                </Link>
              </li>
            )}

            {isAuthenticated &&
              (user?.role === "landlord" || user?.role === "admin") && (
                <li>
                  <Link
                    to="/become-a-landlord"
                    className="hover:text-blue-500 text-gray-700 font-light"
                  >
                    Become a Landlord
                  </Link>
                </li>
              )}
          </ul>

          {/* Desktop Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <NotificationBadge />

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.name}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(
                        user?.role,
                      )}`}
                    >
                      {user?.role}
                    </span>
                  </motion.button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200"
                    >
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-800">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.role}</p>
                      </div>

                      {user?.role === "tenant" && (
                        <>
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>

                          <Link
                            to="/favorites"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                          >
                            <Heart className="w-4 h-4" />
                            My Favorites
                          </Link>

                          <Link
                            to="/tenant/bookings"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                          >
                            <Calendar className="w-4 h-4" />
                            My Bookings
                          </Link>
                        </>
                      )}

                      {user?.role === "landlord" && (
                        <Link
                          to="/landlord/dashboard"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                        >
                          <Home className="w-4 h-4" />
                          My Properties
                        </Link>
                      )}

                      {!["tenant", "landlord"].includes(user?.role) && (
                        <a
                          href="#profile"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </a>
                      )}

                      {user?.role === "admin" && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                        >
                          <Settings className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition border-t border-gray-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-700 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-300 mt-2 py-4 space-y-4"
          >
            <Link
              to="/"
              className="block px-4 text-gray-800 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/houses"
              className="block px-4 text-gray-800 hover:text-blue-600 transition"
            >
              Browse Houses
            </Link>

            {isAuthenticated && user?.role === "tenant" && (
              <>
                <Link
                  to="/favorites"
                  className="block px-4 text-gray-800 hover:text-red-600 transition"
                >
                  My Favorites
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 text-gray-800 hover:text-blue-600 transition"
                >
                  My Profile
                </Link>
              </>
            )}

            {isAuthenticated && user?.role === "landlord" && (
              <Link
                to="/landlord/dashboard"
                className="block px-4 text-gray-800 hover:text-purple-600 transition"
              >
                My Properties
              </Link>
            )}

            {isAuthenticated &&
              (user?.role === "landlord" || user?.role === "admin") && (
                <Link
                  to="/become-a-landlord"
                  className="block px-4 text-gray-800 hover:text-blue-600 transition"
                >
                  Become a Landlord
                </Link>
              )}

            {isAuthenticated ? (
              <div className="px-4 pt-2 space-y-2 border-t border-stone-300">
                <p className="font-semibold text-gray-800">{user?.name}</p>
                <p
                  className={`inline-block text-xs px-2 py-1 rounded-full ${getRoleBadgeColor(
                    user?.role,
                  )}`}
                >
                  {user?.role}
                </p>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 mt-4 border border-red-500 text-red-600 px-4 py-2 rounded justify-center hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 pt-2 space-y-2">
                <Link
                  to="/login"
                  className="block border border-blue-500 text-blue-700 px-4 py-2 rounded text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-green-500 text-white px-4 py-2 rounded text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
}
