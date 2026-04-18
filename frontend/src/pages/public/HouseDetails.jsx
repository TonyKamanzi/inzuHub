import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { getHouseById } from "../../api/Houseapi";
import {
  ArrowLeft,
  MessageCircle,
  CalendarDays,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import ChatBox from "../../components/shared/ChatBox";
import BookingModal from "../../components/shared/BookingModal";
import { useAuth } from "../../context/AuthContext";

export default function HouseDetails() {
  const [loading, setLoading] = useState(true);
  const [house, setHouse] = useState(null);
  const [openChat, setOpenChat] = useState(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHouse = async () => {
      setLoading(true);
      const data = await getHouseById(id);
      setHouse(data);
      setLoading(false);
    };
    fetchHouse();
  }, [id]);

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setOpenBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400 font-medium">Loading listing…</p>
      </div>
    );
  }

  if (!house) {
    return (
      <p className="text-center mt-16 text-sm text-red-500">House not found.</p>
    );
  }

  const isAvailable = house.status === "available";
  const initials =
    house.landlord?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Success bar */}
      {bookingSuccess && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-xl mb-6">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>
            <strong>Booking submitted!</strong> The landlord will review your
            request.
          </span>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 transition px-4 py-2 rounded-lg mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Go back
      </button>

      {/* Gallery */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-8 h-80">
        <img
          src={house.images?.[0] || "/placeholder-house.jpg"}
          alt={house.title}
          className="w-full h-full object-cover"
        />
        <div className="grid grid-cols-2 gap-2">
          {(house.images || []).slice(1, 5).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`view-${i}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        {/* Left */}
        <div>
          {/* Badges */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide ${
                isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {isAvailable ? "Available" : "Rented"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
            {house.title}
          </h1>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            {house.location}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: <FaBed />, val: house.rooms, label: "Bedrooms" },
              { icon: <FaBath />, val: house.bathrooms, label: "Bathrooms" },
              {
                icon: <FaRulerCombined />,
                val: `${house.area} m²`,
                label: "Area",
              },
            ].map(({ icon, val, label }) => (
              <div
                key={label}
                className="bg-gray-50 rounded-xl p-4 text-center"
              >
                <div className="text-indigo-400 flex justify-center mb-1">
                  {icon}
                </div>
                <div className="text-lg font-semibold text-gray-800">{val}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">
              Description
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {house.description || "No description provided."}
            </p>
          </div>

          {/* Contact */}
          {house.contactaddress && (
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">
                Contact address
              </p>
              <p className="text-sm text-gray-600">{house.contactaddress}</p>
            </div>
          )}

          {/* Landlord */}
          {house.landlord && (
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 capitalize">
                  {house.landlord.name}
                </p>
                <p className="text-xs text-gray-400">Property Owner</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sticky top-4 border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
          <div className="mb-1">
            <span className="text-2xl font-semibold text-gray-900">
              {house.price?.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400 ml-1">RWF / month</span>
          </div>

          <hr className="my-4 border-gray-100" />

          <div className="flex flex-col gap-2 text-sm mb-5">
            {[
              ["Status", isAvailable ? "Available" : "Rented"],
              ["Beds", `${house.rooms} bedrooms`],
              ["Baths", `${house.bathrooms} bathrooms`],
              ["Area", `${house.area} m²`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-gray-400">{k}</span>
                <span className="font-medium text-gray-700">{v}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleBookingClick}
            disabled={!isAvailable}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 disabled:opacity-40 text-white text-sm font-medium py-3 rounded-xl transition mb-2"
          >
            <CalendarDays className="w-4 h-4" />
            {isAvailable ? "Book Now" : "Not Available"}
          </button>

          <button
            onClick={() => setOpenChat(true)}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-sm font-medium py-3 rounded-xl transition text-gray-700"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with Owner
          </button>
        </div>
      </div>

      {openChat && <ChatBox house={house} onClose={() => setOpenChat(false)} />}
      {openBookingModal && (
        <BookingModal
          house={house}
          isOpen={openBookingModal}
          onClose={() => setOpenBookingModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
