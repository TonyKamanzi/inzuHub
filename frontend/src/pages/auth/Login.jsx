import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Loader,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const testimonials = {
  login: {
    text: "InzuHub helped me find a beautiful apartment in Kimironko within 3 days. Totally verified, totally safe!",
    name: "Amina Uwase",
    role: "Tenant · Kigali",
    avatar: "AU",
  },
  signup: {
    text: "Listing my property took less than 10 minutes. I had my first inquiry the very same day!",
    name: "Jean-Pierre Nkurunziza",
    role: "Landlord · Gacuriro",
    avatar: "JN",
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    let valid = true;
    if (!email) {
      setLocalError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setLocalError("Enter a valid email address");
      valid = false;
    }

    if (!password) {
      setLocalError("Password is required");
      valid = false;
    }

    if (!valid) return;

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setLocalError(err.response?.data?.message || "Invalid email or password");
    }
  };

  const displayError = localError;

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-5/12 bg-linear-to-br from-indigo-900 via-indigo-700 to-purple-800 flex-col justify-between p-8 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          ></div>
        </div>

        {/* Orbs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10">
          {/* Logo */}
          <Link to={"/"} className="flex items-center justify-center">
            <img src="/logo.png" alt="logo image" className="h-40 w-40" />
          </Link>

          {/* Stats */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">
              Your perfect home
              <br />
              <span className="text-yellow-300">awaits in Rwanda</span>
            </h3>
            <p className="text-indigo-200 mb-6 text-center">
              Browse verified houses, connect with trusted landlords, and move
              in with confidence.
            </p>
            <div className="flex items-center justify-center  text-sm">
              <div className="mr-8 flex flex-col">
                <strong className="text-white text-lg">2,400+</strong>{" "}
                <span className="text-indigo-300 text-sm">Listed Houses</span>
              </div>
              <div className="mr-8 flex flex-col">
                <strong className="text-white text-lg">1,800+</strong>{" "}
                <span className="text-indigo-300 text-sm">Happy Tenants</span>
              </div>
              <div className="mr-8 flex flex-col">
                <strong className="text-white text-lg">650+</strong>{" "}
                <span className="text-indigo-300 text-sm">Landlords</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
          <p className="text-white text-sm italic mb-3">
            {testimonials.login.text}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white text-xs font-bold">
              {testimonials.login.avatar}
            </div>
            <div>
              <strong className="text-white text-sm">
                {testimonials.login.name}
              </strong>
              <p className="text-indigo-300 text-xs">
                {testimonials.login.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 bg-gray-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-indigo-900 via-indigo-700 to-purple-800 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-indigo-200">Sign in to your account</p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Alert */}
                {displayError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <p className="text-red-800 text-sm">{displayError}</p>
                  </motion.div>
                )}

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      disabled={loading}
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                      disabled={loading}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </motion.div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                      disabled={loading}
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-500">New to InzuHub?</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Signup Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-indigo-600 hover:text-indigo-700 transition"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-600 text-sm mt-6"
          >
            By signing in, you agree to our Terms & Conditions
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
