import { IoLocation } from "react-icons/io5";
import { FaBath, FaRulerCombined, FaBed } from "react-icons/fa";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HouseCard({
  house,
  isFavorite = false,
  onToggleFavorite,
}) {
  const navigate = useNavigate();

  const handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onToggleFavorite) {
      onToggleFavorite(house._id);
    }
  };

  const handleCardClick = () => {
    navigate(`/houses/${house._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg transition border-stone-400 hover:scale-105 hover:bg-indigo-50 hover:text-indigo-500  hover:border-indigo-50 hover:shadow-indigo-300 hover:border"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={house.images[0] || "/placeholder-house.jpg"}
          alt={house.title}
          to="/signup"
          loading="lazy"
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* ❤️ Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            className={`w-5 h-5 transition ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{house.title}</h2>

        <p className="text-gray-600 mb-4">
          <IoLocation className="inline-block w-4 h-4 mr-1 text-indigo-500" />
          {house.location}
        </p>

        <p className="text-lg font-bold text-indigo-600 mb-4">
          {house.price.toLocaleString()} RWF /{" "}
          <span className="text-sm font-normal text-gray-500">month</span>
        </p>

        <div className="flex items-center gap-2 text-gray-600">
          <span className="flex items-center gap-1">
            <FaBed className="w-4 h-4" />
            {house.rooms} beds
          </span>

          <span className="flex items-center gap-1">
            <FaBath className="w-4 h-4" />
            {house.bathrooms} Bathrooms
          </span>

          <span className="flex items-center gap-1">
            <FaRulerCombined className="w-4 h-4" />
            {house.area} m²
          </span>
        </div>
      </div>
      <div>
        <button
          onClick={handleCardClick}
          className="bg-indigo-50 text-indigo-700 p-2 rounded-b-lg w-full text-center font-medium hover:bg-indigo-500 hover:text-white transition"
        >
          View details
        </button>
      </div>
    </div>
  );
}
