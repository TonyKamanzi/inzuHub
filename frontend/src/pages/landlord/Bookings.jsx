import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import landlordService from "../../api/landlordService";
import { toast } from "react-toastify";
import LandlordTopbar from "../../components/landlord/Topbar";
import {
  Calendar,
  User,
  Home,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
} from "lucide-react";

export default function Bookings() {
  const { user } = useAuth();
  const notificationContext = useNotification();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await landlordService.getBookings();
      setBookings(data || []);
    } catch (error) {
      toast.error(error.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setUpdating(bookingId);
      const updatedBooking = await landlordService.updateBookingStatus(
        bookingId,
        newStatus,
      );

      // Update local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking,
        ),
      );

      // Trigger notification for tenant
      const booking = bookings.find((b) => b._id === bookingId);
      if (booking) {
        notificationContext.triggerBookingNotification(`booking_${newStatus}`, {
          houseTitle: booking.house?.title,
          tenantName: booking.tenant?.name,
        });
      }

      toast.success(`Booking ${newStatus} successfully`);
    } catch (error) {
      toast.error(error.message || "Failed to update booking");
    } finally {
      setUpdating(null);
    }
  };

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

  if (loading) {
    return (
      <div>
        <LandlordTopbar title="Bookings" />
        <div className="p-8">
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LandlordTopbar title="Bookings" />
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking Requests</h1>
          <p className="text-gray-600 mt-2">
            Manage tenant booking requests for your properties
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
            <p className="text-gray-600">
              {filter === "all"
                ? "You don't have any booking requests yet."
                : `You don't have any ${filter} bookings.`}
            </p>
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

                    {/* Tenant Info */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Tenant Information
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{booking.tenant?.name || "Unknown"}</span>
                        <span className="text-gray-400">
                          ({booking.tenant?.email || "No email"})
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
                        <span className="text-gray-500 text-sm">Message:</span>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-md text-sm mt-1">
                          {booking.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="ml-6">
                    {booking.status === "pending" && (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(booking._id, "approved")
                          }
                          disabled={updating === booking._id}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          {updating === booking._id ? (
                            <span className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Processing...
                            </span>
                          ) : (
                            "Approve"
                          )}
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(booking._id, "rejected")
                          }
                          disabled={updating === booking._id}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                          {updating === booking._id ? (
                            <span className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Processing...
                            </span>
                          ) : (
                            "Reject"
                          )}
                        </button>
                      </div>
                    )}
                    {booking.status === "approved" && (
                      <div className="text-green-600 text-sm font-medium">
                        <CheckCircle className="w-5 h-5 inline-block mr-1" />
                        Approved
                      </div>
                    )}
                    {booking.status === "rejected" && (
                      <div className="text-red-600 text-sm font-medium">
                        <XCircle className="w-5 h-5 inline-block mr-1" />
                        Rejected
                      </div>
                    )}
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
