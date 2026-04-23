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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";

const testimonials = {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!name) return setLocalError("Full name is required");
    if (!email) return setLocalError("Email is required");
    if (!password) return setLocalError("Password is required");
    if (password.length < 6)
      return setLocalError("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return setLocalError("Passwords do not match");
    if (!termsAccepted)
      return setLocalError("Please accept Terms & Conditions");

    try {
      await signup(name, email, password, role);
      setSignupSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setLocalError(err.response?.data?.message || "Signup failed");
    }
  };

  const displayError = localError || error;

  if (signupSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-indigo-700 to-purple-800">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center text-white">
          <CheckCircle className="w-14 h-14 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-200 p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* LEFT SIDE - SWIPER */}
        <div className="hidden lg:block relative">
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 3000 }}
            effect="fade"
            loop
            className="h-full"
          >
            <SwiperSlide>
              <img
                src="/swiper/img1.png"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/swiper/img4.png"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/swiper/kigali.png"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Testimonial */}
          <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white animate-fade-in">
            <p className="text-sm italic mb-3">{testimonials.signup.text}</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-xs font-bold">
                {testimonials.signup.avatar}
              </div>
              <div>
                <strong>{testimonials.signup.name}</strong>
                <p className="text-xs text-indigo-200">
                  {testimonials.signup.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md"
          >
            <h1 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create Account
            </h1>

            {displayError && (
              <div className="bg-red-50 border border-red-200 p-3 rounded mb-4 flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-700">{displayError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ROLE BUTTONS */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "tenant", label: "Tenant", icon: Home },
                  { value: "landlord", label: "Landlord", icon: Building2 },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={`flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition ${
                      role === value
                        ? "bg-indigo-500 hover:bg-indigo-600 cursor-pointer text-white"
                        : "border border-gray-300 text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* NAME */}
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 py-2 border border-gray-300 focus:ring-2  outline-none focus:ring-indigo-500 rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 py-2 border border-gray-300 focus:ring-2  outline-none focus:ring-indigo-500 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 focus:ring-2  outline-none focus:ring-indigo-500 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full py-2 px-3 border border-gray-300 focus:ring-2  outline-none focus:ring-indigo-500 rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* TERMS */}
              <label className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                Accept Terms & Conditions
              </label>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer py-3 rounded-lg font-semibold"
              >
                {loading ? (
                  <Loader className="animate-spin mx-auto" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-semibold">
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
