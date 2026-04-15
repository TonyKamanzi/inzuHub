import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import favoriteService from "../../services/favoriteService";
import { User, Mail, MapPin, Heart, LogOut, Clock } from "lucide-react";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchFavoriteCount();
  }, [user, navigate]);

  const fetchFavoriteCount = async () => {
    try {
      const favorites = await favoriteService.getFavorites();
      setFavoriteCount(favorites.length);
    } catch (error) {
      console.error("Error fetching favorite count:", error);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <User size={32} />
            <h1 className="text-4xl md:text-5xl font-bold">My Profile</h1>
          </div>
          <p className="text-lg text-indigo-100">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {userInitial}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {user.name || "User"}
                  </h2>
                  <p className="text-gray-500 capitalize mt-1">{user.role}</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail size={24} className="text-indigo-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Email Address
                    </p>
                    <p className="text-lg text-gray-900">{user.email}</p>
                  </div>
                </div>

                {/* User Role */}
                <div className="flex items-start gap-4">
                  <User size={24} className="text-indigo-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Account Type
                    </p>
                    <p className="text-lg text-gray-900 capitalize">
                      {user.role} Account
                    </p>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-start gap-4">
                  <Clock size={24} className="text-indigo-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Member Since
                    </p>
                    <p className="text-lg text-gray-900">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "Just now"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <LogOut size={20} />
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-6">
            {/* Favorites Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Heart size={32} className="text-red-500 fill-current" />
                <span className="text-4xl font-bold text-gray-900">
                  {favoriteCount}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Favorites
              </h3>
              <p className="text-sm text-gray-600 mb-4">Saved properties</p>
              <button
                onClick={() => navigate("/favorites")}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                View Favorites
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/")}
                  className="w-full text-left px-4 py-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium transition-colors"
                >
                  Browse Properties
                </button>
                <button
                  onClick={() => navigate("/favorites")}
                  className="w-full text-left px-4 py-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium transition-colors"
                >
                  My Favorites
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
