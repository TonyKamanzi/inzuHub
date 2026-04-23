import { Heart } from "lucide-react";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HouseCard({
  house,
  isFavorite = false,
  onToggleFavorite,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/houses/${house._id}`);

  const handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite?.(house._id);
  };

  // ✅ NEW: Badge logic (SAFE - won't break if fields don't exist)
  const isNew = () => {
    if (!house.createdAt) return false;
    const days =
      (Date.now() - new Date(house.createdAt)) / (1000 * 60 * 60 * 24);
    return days <= 7;
  };

  const isPopular =
    (house.views && house.views > 100) ||
    (house.bookings && house.bookings > 10);

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer
                 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl
                 hover:shadow-indigo-100 hover:border-indigo-200"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-indigo-50">
        <img
          src={house.images?.[0] || "/placeholder-house.jpg"}
          alt={house.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* ✅ NEW: Badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-2 z-10">
          {isNew() && (
            <span className="bg-green-500 text-white text-[10px] px-2 py-1 rounded-full font-semibold shadow">
               New
            </span>
          )}

          {isPopular && (
            <span className="bg-yellow-400 text-gray-900 text-[10px] px-2 py-1 rounded-md font-semibold shadow">
              🔥 Popular
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm
                     border border-white/50 flex items-center justify-center transition hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <h2 className="font-medium text-gray-900 text-sm mb-1 truncate">
          {house.title}
        </h2>

        <p className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
          {house.location}
        </p>

        <p className="font-serif text-base font-semibold text-indigo-600 mb-3">
          {house.price.toLocaleString()} RWF{" "}
          <span className="font-sans text-xs font-normal text-gray-400">
            / month
          </span>
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <FaBed className="w-3 h-3" />
            {house.rooms} beds
          </span>
          <span className="flex items-center gap-1">
            <FaBath className="w-3 h-3" />
            {house.bathrooms} bath
          </span>
          <span className="flex items-center gap-1">
            <FaRulerCombined className="w-3 h-3" />
            {house.area} m²
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-between
                   text-xs font-medium text-indigo-600 group-hover:bg-indigo-50 transition-colors"
      >
        View details
        <span className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </div>
  );
}
