import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  AlertCircle,
  Loader,
  CheckCircle,
  Home,
  Building2,
} from "lucide-react";
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

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("tenant");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { signup, loading, error } = useAuth();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Validation
    if (!name) {
      setLocalError("Full name is required");
      return;
    }

    if (!email) {
      setLocalError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setLocalError("Enter a valid email address");
      return;
    }

    if (!password) {
      setLocalError("Password is required");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    if (!confirmPassword) {
      setLocalError("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      setLocalError("Please accept the Terms & Conditions");
      return;
    }

    try {
      await signup(name, email, password, role);
      setSignupSuccess(true);

      // Redirect after delay
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setLocalError(err.response?.data?.message || "Signup failed");
    }
  };

  const displayError = localError || error;

  if (signupSuccess) {
    return (
      <div className="min-h-screen flex bg-linear-to-br from-indigo-900 via-indigo-700 to-purple-800 items-center justify-center p-6 relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <CheckCircle className="w-16 h-16 text-yellow-300 mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3">
            {role === "tenant"
              ? "Welcome to InzuHub!"
              : "Application Submitted!"}
          </h2>
          <p className="text-indigo-100 mb-6">
            {role === "tenant"
              ? "Your account has been created successfully. Get ready to find your perfect home!"
              : "Your landlord application has been submitted for admin review. You'll receive an email once approved."}
          </p>
          <div className="flex items-center justify-center gap-2 text-indigo-200">
            <Loader className="w-4 h-4 animate-spin" />
            <span className="text-sm">Redirecting to login...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-5/12 bg-linear-to-br from-indigo-900 via-indigo-700 to-purple-800 flex-col justify-between p-5 relative overflow-hidden">
        {/* Background grid */}
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
          <div className="">
            <Link to={"/"} className="flex items-center justify-center">
              <img src="/logo.png" alt="logo image" className="h-40 w-40" />
            </Link>
          </div>

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
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex flex-col items-center">
                <strong className="text-white text-lg">2,400+</strong>{" "}
                <span className="text-indigo-300 text-sm">Listed Houses</span>
              </div>
              <div className="flex flex-col items-center">
                <strong className="text-white text-lg">1,800+</strong>{" "}
                <span className="text-indigo-300 text-sm">Happy Tenants</span>
              </div>
              <div className="flex flex-col items-center">
                <strong className="text-white text-lg">650+</strong>{" "}
                <span className="text-indigo-300 text-sm">Landlords</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
          <p className="text-white text-sm italic mb-3">
            {testimonials.signup.text}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white text-xs font-bold">
              {testimonials.signup.avatar}
            </div>
            <div>
              <strong className="text-white text-sm">
                {testimonials.signup.name}
              </strong>
              <p className="text-indigo-300 text-xs">
                {testimonials.signup.role}
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
              <h1 className="text-3xl font-bold text-center">Create Account</h1>
            </div>

            {/* Form */}
            <div className="p-5">
              <form onSubmit={handleSubmit} className="space-y-5">
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

                {/* Role Selection */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    I am looking for:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "tenant", label: "Am Tenant", icon: Home },
                      {
                        value: "landlord",
                        label: "Am Landlord",
                        icon: Building2,
                      },
                    ].map(({ value, label, icon: Icon }) => (
                      <motion.button
                        key={value}
                        type="button"
                        onClick={() => setRole(value)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`py-2 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                          role === value
                            ? "bg-indigo-600 text-white shadow-lg"
                            : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-400"
                        }`}
                        disabled={loading}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Full Name Field */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      disabled={loading}
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
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
                  transition={{ delay: 0.25 }}
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

                {/* Confirm Password Field */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      disabled={loading}
                    />
                  </div>
                </motion.div>

                {/* Admin Notice for Landlords */}
                {role === "landlord" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                  >
                    <p className="text-yellow-800 text-sm">
                      ⚠️ <strong>Admin Approval Required:</strong> Landlord
                      accounts require admin verification. You'll receive an
                      email once your account is approved.
                    </p>
                  </motion.div>
                )}

                {/* Terms Checkbox */}
                <motion.label
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-start gap-3 text-gray-700 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 mt-1 rounded border-gray-300 cursor-pointer group-hover:border-indigo-500 transition accent-indigo-600"
                    disabled={loading}
                  />
                  <span className="text-sm">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </motion.label>

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
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-500">
                  Already have an account?
                </span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-600">
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-700 transition"
                >
                  Sign in here
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
            By signing up, you agree to our Terms & Conditions
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
