import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import landlordService from "../../api/landlordService";
import { toast } from "react-toastify";
import LandlordTopbar from "../../components/landlord/Topbar";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await landlordService.getStats();
      setStats(data);
    } catch (error) {
      toast.error(error.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LandlordTopbar title="Dashboard" />
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name} 👋</p>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Houses Card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Houses
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalHouses}
                  </p>
                </div>
                <div className="text-4xl text-blue-500 opacity-20">🏠</div>
              </div>
            </div>

            {/* Available Houses Card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Available Houses
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.availableHouses}
                  </p>
                </div>
                <div className="text-4xl text-green-500 opacity-20">✨</div>
              </div>
            </div>

            {/* Rented Houses Card */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Rented Houses
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.rentedHouses}
                  </p>
                </div>
                <div className="text-4xl text-amber-500 opacity-20">👥</div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-8 border border-indigo-200">
            <h3 className="text-xl font-bold text-indigo-900 mb-3">
              Start Adding Houses
            </h3>
            <p className="text-indigo-700 mb-4">
              Begin by creating your first property listing to attract potential
              tenants.
            </p>
            <button
              onClick={() => navigate("/landlord/add-house")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Add My First House
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              View All Properties
            </h3>
            <p className="text-blue-700 mb-4">
              Manage, edit, or remove your properties from one dashboard.
            </p>
            <button
              onClick={() => navigate("/landlord/houses")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              View My Houses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
