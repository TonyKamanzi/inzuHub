import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import landlordService from "../../api/landlordService";
import { toast } from "react-toastify";
import LandlordTopbar from "../../components/landlord/Topbar";
import { Calendar, Clock, CheckCircle, XCircle, Users } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const notificationContext = useNotification();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousBookingCount, setPreviousBookingCount] = useState(0);

  useEffect(() => {
    fetchStats();
    fetchBookings();
  }, []);

  // Monitor for new bookings and trigger notifications
  useEffect(() => {
    const currentBookingCount = bookings.length;
    const newBookings = bookings.slice(
      0,
      currentBookingCount - previousBookingCount,
    );

    // Trigger notification for each new booking
    newBookings.forEach((booking) => {
      notificationContext.triggerBookingNotification("booking_created", {
        houseTitle: booking.house?.title,
        tenantName: booking.tenant?.name,
        showToast: false, // Don't show toast for auto-triggered notifications
      });
    });

    setPreviousBookingCount(currentBookingCount);
  }, [bookings]);

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

  const fetchBookings = async () => {
    try {
      const data = await landlordService.getBookings();
      setBookings(data || []);
    } catch (error) {
      console.error("Failed to load bookings:", error);
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Houses Card */}
            <div className="bg-white rounded-lg shadow p-6 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
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
            <div className=" rounded-lg shadow p-6 bg-green-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Available Houses
                  </p>
                  <p className="text-3xl font-bold text-green-400 mt-2">
                    {stats.availableHouses}
                  </p>
                </div>
                <div className="text-4xl text-green-500 opacity-20">✨</div>
              </div>
            </div>

            {/* Rented Houses Card */}
            <div className=" rounded-lg shadow p-6 bg-yellow-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Rented Houses
                  </p>
                  <p className="text-3xl font-bold text-yellow-300 mt-2">
                    {stats.rentedHouses}
                  </p>
                </div>
                <div className="text-4xl text-amber-500 opacity-20">👥</div>
              </div>
            </div>

            {/* Pending Bookings Card */}
            <div className="bg-white rounded-lg shadow p-6 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Pending Bookings
                  </p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    {bookings.filter((b) => b.status === "pending").length}
                  </p>
                </div>
                <div className="text-4xl text-orange-500 opacity-20">
                  <Calendar />
                </div>
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

          {/* Recent Bookings */}
          {bookings.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Booking Requests
                </h2>
                <button
                  onClick={() => navigate("/landlord/bookings")}
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  View All Bookings
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {bookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status === "pending" && (
                              <Clock className="w-3 h-3" />
                            )}
                            {booking.status === "approved" && (
                              <CheckCircle className="w-3 h-3" />
                            )}
                            {booking.status === "rejected" && (
                              <XCircle className="w-3 h-3" />
                            )}
                            {booking.status}
                          </span>
                          <span className="text-sm text-gray-600">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="font-medium text-gray-900 mb-1">
                          {booking.house?.title || "House not available"}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {booking.tenant?.name || "Unknown"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {booking.status === "pending" && (
                        <button
                          onClick={() => navigate("/landlord/bookings")}
                          className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
