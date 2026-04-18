import { useState } from "react";
import { X, Calendar, MessageSquare } from "lucide-react";
import bookingService from "../../api/bookingapi";

export default function BookingModal({ house, isOpen, onClose, onSuccess }) {
  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const bookingData = {
        houseId: house._id,
        moveInDate,
        message: message || "Interested in this property",
      };
      const response = await bookingService.createBooking(bookingData);
      if (response) {
        onSuccess(response);
        onClose();
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit booking. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError("");
      setMoveInDate("");
      setMessage("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-xl">
        {/* Close */}
        <button
          onClick={handleClose}
          disabled={loading}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition disabled:opacity-40"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">
          Request a booking
        </p>
        <h2 className="text-xl font-semibold text-gray-900 leading-snug mb-1">
          {house.title}
        </h2>
        <p className="text-sm font-medium text-blue-500 mb-5">
          {house.price?.toLocaleString()} RWF / month
        </p>

        <hr className="border-gray-100 mb-5" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Move-in Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Move-in date{" "}
              <span className="text-red-400 normal-case tracking-normal">
                *
              </span>
            </label>
            <input
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              required
              min={new Date().toISOString().split("T")[0]}
              disabled={loading}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 focus:bg-white transition disabled:opacity-50"
            />
          </div>

          {/* Message */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              Message
              <span className="normal-case tracking-normal font-normal text-gray-300 ml-1">
                (optional)
              </span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Tell the landlord why you're interested…"
              disabled={loading}
              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-400 focus:bg-white transition resize-none disabled:opacity-50"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-[1fr_1.5fr] gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="py-2.5 border border-gray-200 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 transition disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !moveInDate}
              className="py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
