import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, DollarSign, Home } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function HouseCard({ house, isFavorite, onToggleFavorite }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      // Redirect to login
      window.location.href = "/login";
      return;
    }
    onToggleFavorite(house._id);
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on the favorite button
    if (e.target.closest("button")) {
      return;
    }
    navigate(`/houses/${house._id}`);
  };

  return (
    <div
      className="group cursor-pointer h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCardClick}
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          {house.images && house.images.length > 0 ? (
            <img
              src={house.images[0]}
              alt={house.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Home size={48} />
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Heart
              size={20}
              className={`transition-colors duration-300 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                house.status === "available" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {house.status === "available" ? "Available" : "Rented"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {house.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
            <MapPin size={16} className="text-indigo-500 flex-shrink-0" />
            <span className="line-clamp-1">{house.location}</span>
          </div>

          {/* House Info */}
          <div className="flex gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
            {house.rooms && (
              <span className="flex items-center gap-1">
                <span className="font-semibold">{house.rooms}</span> Rooms
              </span>
            )}
            {house.bathrooms && (
              <span className="flex items-center gap-1">
                <span className="font-semibold">{house.bathrooms}</span> Bath
              </span>
            )}
            {house.area && (
              <span className="flex items-center gap-1">
                <span className="font-semibold">{house.area}</span> m²
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-indigo-600">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "RWF",
                  maximumFractionDigits: 0,
                }).format(house.price)}
              </span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>
          </div>
        </div>

        {/* View Details CTA */}
        <div className="px-4 pb-4">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
