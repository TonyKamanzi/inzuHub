import { useEffect, useState } from "react";
import { getHouses } from "../../api/Houseapi";
import HouseCard from "../../components/houses/HouseCard";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import favoriteService from "../../services/favoriteService";
import { toast } from "react-toastify";
import { HouseCardGridSkeleton } from "../../components/tenant/Loader";

export default function Houses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const data = await getHouses();
        setHouses(data);
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
    if (user) fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const data = await favoriteService.getFavorites();
      setFavoriteIds(new Set(data.map((house) => house._id)));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleToggleFavorite = async (houseId) => {
    if (!user) {
      toast.info("Please login to save favorites");
      navigate("/login");
      return;
    }

    try {
      if (favoriteIds.has(houseId)) {
        await favoriteService.removeFavorite(houseId);
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(houseId);
          return next;
        });
        toast.success("Removed from favorites");
      } else {
        await favoriteService.addFavorite(houseId);
        setFavoriteIds((prev) => new Set([...prev, houseId]));
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update favorite");
    }
  };

  if (loading) return <HouseCardGridSkeleton count={6} />;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20" id="houses">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 text-xs font-medium uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Featured Houses
        </span>
        <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
          Explore Available Houses
        </h1>
        <p className="text-gray-400 text-sm font-light">
          Find your perfect home among our curated listings
        </p>
      </div>

      {/* Grid */}
      {houses.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No houses available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
          {houses.slice(0, 12).map((house) => (
            <HouseCard
              key={house._id}
              house={house}
              isFavorite={favoriteIds.has(house._id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <Link
          to="/all-houses"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all hover:-translate-y-0.5 duration-200"
        >
          View All Houses
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
