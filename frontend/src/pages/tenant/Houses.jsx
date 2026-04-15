import { useEffect, useState } from "react";
import { getHouses } from "../../api/Houseapi";
import HouseCard from "../../components/houses/HouseCard";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import favoriteService from "../../services/favoriteService";
import { toast } from "react-toastify";

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    fetchHouses();

    // Fetch favorites if user is logged in
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      console.log("[Houses] Fetching favorites for user:", user?.id);
      const data = await favoriteService.getFavorites();
      console.log("[Houses] Got favorites:", data);
      const ids = new Set(data.map((house) => house._id));
      setFavoriteIds(ids);
    } catch (error) {
      console.error("[Houses] Error fetching favorites:", error);
    }
  };

  const handleToggleFavorite = async (houseId) => {
    if (!user) {
      toast.info("Please login to save favorites");
      navigate("/login");
      return;
    }

    try {
      console.log("[Houses] Toggling favorite:", houseId);
      if (favoriteIds.has(houseId)) {
        await favoriteService.removeFavorite(houseId);
        setFavoriteIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(houseId);
          return newSet;
        });
        toast.success("Removed from favorites");
      } else {
        await favoriteService.addFavorite(houseId);
        setFavoriteIds((prev) => new Set([...prev, houseId]));
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("[Houses] Error toggling favorite:", error);
      toast.error(error.message || "Failed to update favorite");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-indigo-500 text-lg font-medium">Loading houses...</p>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto my-16" id="houses">
      <div
        className="px-4 py-1 md:px-6 md:py-2 md:ml-140 ml-22 rounded-full mb-5
  bg-indigo-50 text-indigo-500 border  p-3 shadow-md  items-center gap-2 w-max flex justify-center text-xl"
      >
        Featured Houses
      </div>
      <h1 className="md:text-4xl text-center font-bold mb-10 tracking-wide text-gray-800">
        Explore Avaiable Houses
      </h1>
      <p className="text-lg text-gray-600 text-center">
        Find your perfect home among our featured listings.
      </p>

      <div>
        {houses.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No houses available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {houses.slice(0, 12).map((house) => (
              <HouseCard
                house={house}
                key={house._id}
                isFavorite={favoriteIds.has(house._id)}
                onToggleFavorite={handleToggleFavorite}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              />
            ))}
          </div>
        )}
        <div>
          <Link
            to="/all-houses"
            className="bg-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-600 transition duration-300 mt-10 block w-max mx-auto"
          >
            View All Houses
          </Link>
        </div>
      </div>
    </div>
  );
}
