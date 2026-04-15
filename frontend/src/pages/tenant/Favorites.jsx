import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import favoriteService from "../../services/favoriteService";
import houseService from "../../services/houseService";
import HouseCard from "../../components/tenant/HouseCard";
import Loader, { HouseCardGridSkeleton } from "../../components/tenant/Loader";
import { Heart, LogIn } from "lucide-react";
import { toast } from "react-toastify";

export default function Favorites() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchFavorites();
  }, [user, navigate]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoriteService.getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (houseId) => {
    try {
      // Check if the house is in favorites
      const isFav = favorites.some((house) => house._id === houseId);
      if (isFav) {
        await favoriteService.removeFavorite(houseId);
        setFavorites((prev) => prev.filter((house) => house._id !== houseId));
        toast.success("Removed from favorites");
      } else {
        // This shouldn't happen on favorites page, but handle it anyway
        await favoriteService.addFavorite(houseId);
        const updatedFavorites = await favoriteService.getFavorites();
        setFavorites(updatedFavorites);
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update favorite");
      // Refresh favorites to ensure consistency
      fetchFavorites();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LogIn size={48} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please log in to view favorites
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <HouseCardGridSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Heart size={32} className="fill-current" />
            <h1 className="text-4xl md:text-5xl font-bold">My Favorites</h1>
          </div>
          <p className="text-lg text-indigo-100">
            Properties you've saved for later
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {favorites.length > 0 ? (
          <>
            <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-800">
              You have <strong>{favorites.length}</strong> favorite
              {favorites.length !== 1 ? "s" : ""}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favoriteHouse) => (
                <HouseCard
                  key={favoriteHouse._id}
                  house={favoriteHouse}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Heart size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring properties and add your favorites to see them here
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
