import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, AlertCircle, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";

const testimonials = {
  login: {
    text: "InzuHub helped me find a beautiful apartment in Kimironko within 3 days. Totally verified, totally safe!",
    name: "Amina Uwase",
    role: "Tenant · Kigali",
    avatar: "AU",
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      const response = await login(email, password);

      if (response.user.role === "admin") navigate("/admin");
      else if (response.user.role === "landlord")
        navigate("/landlord/dashboard");
      else navigate("/");
    } catch (err) {
      setLocalError(err.response?.data?.message || "Invalid email or password");
    }
  };

  const displayError = localError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
      {/* CENTER CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      >
        {/* LEFT - SWIPER */}
        <div className="relative h-64 md:h-full md:flex hidden">
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            effect="fade"
            loop
            className="h-full w-full"
          >
            <SwiperSlide>
              <img
                src="/swiper/img0.png"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/swiper/img1.png"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/swiper/img2.png"
                classNaded-lg
                ded-lgme="w-full h-full object-cover"
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
                src="/swiper/bg.png"
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

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* ⭐ TESTIMONIAL RESTORED */}
          <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
            <p className="text-sm italic mb-3">{testimonials.login.text}</p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-xs font-bold">
                {testimonials.login.avatar}
              </div>

              <div>
                <strong className="text-sm">{testimonials.login.name}</strong>
                <p className="text-xs text-indigo-200">
                  {testimonials.login.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="p-8 flex flex-col justify-center">
          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold  bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent text-center my-3">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-900 tracking-wider">
              to <strong>InzuHub</strong> where you find your find house
              listings and connect with the landlord
            </p>
            <p className="font-bold text-gray-900">
              Connects Landlord and Tenant
            </p>
            <p className="text-gray-500">Sign in to your account</p>
          </div>

          {/* ERROR */}
          {displayError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <p className="text-red-800 text-sm">{displayError}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-gray-500">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg border-gray-300 focus:ring-indigo-600 outline-none focus:ring-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-gray-500">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2.5 border rounded-lg border-gray-300 focus:ring-indigo-600 outline-none focus:ring-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div>
              <Link to="#" className="text-indigo-500 hover:text-indigo-600 underline"> Forgot password?</Link>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-4 h-4 boder border-gray-300"
              />
              <label htmlFor="remeber">Remember me</label>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 text-white tracking-widest cursor-pointer rounded-lg font-semibold"
            >
              {loading ? (
                <Loader className="animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* SIGNUP */}
          <p className="text-center mt-6 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
