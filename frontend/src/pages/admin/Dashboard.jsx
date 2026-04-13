import React, { useState, useEffect } from "react";
import { Users, Zap, Clock, TrendingUp, Home } from "lucide-react";
import { toast } from "react-toastify";
import Topbar from "../../components/admin/Topbar";
import StatCard from "../../components/admin/StatCard";
import adminService from "../../api/adminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHouses: 0,
    pendingLandlords: 0,
    activeLandlords: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Dashboard" />

      <div className="p-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Users}
                label="Total Users"
                value={stats.totalUsers}
                color="blue"
              />
              <StatCard
                icon={Home}
                label="Total Houses"
                value={stats.totalHouses}
                color="green"
              />
              <StatCard
                icon={Clock}
                label="Pending Landlords"
                value={stats.pendingLandlords}
                color="yellow"
              />
              <StatCard
                icon={TrendingUp}
                label="Active Landlords"
                value={stats.activeLandlords}
                color="purple"
              />
            </div>

            {/* Welcome Message */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to InzuHub Admin
              </h2>
              <p className="text-gray-600">
                Use the sidebar to navigate through different sections. You can
                manage users, approve landlords, and view all houses on the
                platform.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
