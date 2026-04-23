import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Share2, Send, Heart, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-linear-to-b from-indigo-900 to-indigo-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src="/logo.png" alt="inzuHub Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-indigo-200 text-sm leading-relaxed mb-4 font-serif">
              Rwanda's #1 rental platform connecting tenants with trusted
              landlords.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-indigo-200 text-sm">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:support@inzuhub.com"
                  className="hover:text-yellow-400 transition"
                >
                  support@inzuhub.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-indigo-200 text-sm">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+250780924626"
                  className="hover:text-yellow-400 transition"
                >
                  +250 780 924 626
                </a>
              </div>
              <div className="flex items-center gap-3 text-indigo-200 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Kigali, Rwanda</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400 font-serif">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-houses"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  Browse Houses
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  Become a Landlord
                </Link>
              </li>
              <li>
                <a
                  href="#howitworks"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* For Tenants */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400 font-serif">
              For Tenants
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  Search Rentals
                </a>
              </li>
              <li>
                <a
                  href="#howitworks"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  How to Apply
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  Safety Tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* For Landlords */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400 font-serif">
              For Landlords
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/signup"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  List Property
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  Landlord Guide
                </a>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-yellow-400 transition duration-300 text-sm"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-indigo-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <p className="text-indigo-300 text-sm mb-4 md:mb-0">
            &copy; {currentYear} inzuHub. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="bg-indigo-800 hover:bg-yellow-400 hover:text-indigo-900 p-2 rounded-full transition duration-300"
            >
              <Share2 className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-indigo-800 hover:bg-yellow-400 hover:text-indigo-900 p-2 rounded-full transition duration-300"
            >
              <Send className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-indigo-800 hover:bg-yellow-400 hover:text-indigo-900 p-2 rounded-full transition duration-300"
            >
              <Heart className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-indigo-800 hover:bg-yellow-400 hover:text-indigo-900 p-2 rounded-full transition duration-300"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-indigo-300 text-sm mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-yellow-400 transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-yellow-400 transition duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
