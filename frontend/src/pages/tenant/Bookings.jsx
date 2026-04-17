import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import tenantBookingService from "../../services/tenantBookingService";
import { toast } from "react-toastify";
import {
  Calendar,
  User,
  Home,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  MessageCircle,
} from "lucide-react";

export default function Bookings() {
  const { user } = useAuth();
  const notificationContext = useNotification();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await tenantBookingService.getBookings();
      setBookings(data || []);
    } catch (error) {
      toast.error(error.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Monitor booking status changes and trigger notifications
  useEffect(() => {
    const checkForStatusUpdates = async () => {
      try {
        const latestBookings = await tenantBookingService.getBookings();
        if (latestBookings) {
          latestBookings.forEach((latestBooking) => {
            const existingBooking = bookings.find(
              (b) => b._id === latestBooking._id,
            );
            if (
              existingBooking &&
              existingBooking.status !== latestBooking.status
            ) {
              // Status changed, trigger notification
              notificationContext.triggerBookingNotification(
                `booking_${latestBooking.status}`,
                {
                  houseTitle: latestBooking.house?.title,
                  landlordName: latestBooking.landlord?.name,
                  showToast: false, // Don't show toast for status change notifications
                },
              );
            }
          });
        }
      } catch (error) {
        console.error("Error checking for booking updates:", error);
      }
    };

    // Check for updates every 30 seconds
    const interval = setInterval(checkForStatusUpdates, 30000);

    return () => clearInterval(interval);
  }, [bookings, notificationContext]);

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "pending":
        return "Your booking request is under review";
      case "approved":
        return "Congratulations! Your booking has been approved";
      case "rejected":
        return "Unfortunately, your booking was not approved";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-2">
              Track your rental booking requests
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">
            Track your rental booking requests and their status
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <Filter className="w-4 h-4 text-gray-500 ml-2" />
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition capitalize ${
                  filter === status
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {status}
                <span className="ml-2 text-xs">
                  (
                  {status === "all"
                    ? bookings.length
                    : bookings.filter((b) => b.status === status).length}
                  )
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">Calendar</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {filter === "all" ? "" : filter} bookings
            </h3>
            <p className="text-gray-600 mb-4">
              {filter === "all"
                ? "You haven't made any booking requests yet."
                : `You don't have any ${filter} bookings.`}
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  {/* Left Content */}
                  <div className="flex-1">
                    {/* Status Badge */}
                    <div className="mb-3">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}
                      >
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {getStatusMessage(booking.status)}
                      </p>
                    </div>

                    {/* House Info */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {booking.house?.title || "House not available"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        <Home className="w-4 h-4 inline-block mr-1" />
                        {booking.house?.location || "Location not specified"}
                      </p>
                      <p className="text-indigo-600 font-semibold">
                        {booking.house?.price?.toLocaleString() || 0} RWF /
                        month
                      </p>
                    </div>

                    {/* Landlord Info */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Landlord Information
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{booking.landlord?.name || "Unknown"}</span>
                        <span className="text-gray-400">
                          ({booking.landlord?.email || "No email"})
                        </span>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Move-in Date:</span>
                        <p className="font-medium text-gray-900 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Requested:</span>
                        <p className="font-medium text-gray-900">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Message */}
                    {booking.message && (
                      <div className="mt-4">
                        <span className="text-gray-500 text-sm">
                          Your Message:
                        </span>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-md text-sm mt-1">
                          {booking.message}
                        </p>
                      </div>
                    )}

                    {/* Status-specific actions */}
                    {booking.status === "approved" && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-800 text-sm">
                          <CheckCircle className="w-4 h-4 inline-block mr-1" />
                          Your booking has been approved! Contact the landlord
                          for next steps.
                        </p>
                      </div>
                    )}

                    {booking.status === "rejected" && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-800 text-sm">
                          <XCircle className="w-4 h-4 inline-block mr-1" />
                          This booking was not approved. Feel free to browse
                          other properties.
                        </p>
                        <button
                          onClick={() => (window.location.href = "/")}
                          className="mt-2 px-4 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                        >
                          Browse Other Properties
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Side - House Image */}
                  <div className="ml-6">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {booking.house?.images?.[0] ? (
                        <img
                          src={booking.house.images[0]}
                          alt={booking.house.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Home className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
