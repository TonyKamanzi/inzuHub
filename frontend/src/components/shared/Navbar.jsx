import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              <Link to="/" className="hover:text-blue-500 text-gray-700 font-light">
                Home
              </Link>
            </li>
            <li>
              <Link to="/houses" className="hover:text-blue-500 text-gray-700 font-light">
                Browse Houses
              </Link>
            </li>
            <li>
              <Link to="/become-a-landlord" className="hover:text-blue-500 text-gray-700 font-light">
                Become a Landlord
              </Link>
            </li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="text-blue-700 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Sign Up
            </Link>
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
          <div className="md:hidden bg-white border-t border-stone-300 mt-2 py-4 space-y-4">
            <Link to="/" className="block px-4 font-sans text-gray-800">
              Home
            </Link>
            <Link to="/houses" className="block px-4 font-sans text-gray-800">
              Browse Houses
            </Link>
            <Link to="/become-a-landlord" className="block px-4 font-sans text-gray-800">
              Become a Landlord
            </Link>

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
          </div>
        )}
      </div>
    </header>
  );
}
