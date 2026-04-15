import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import houseService from "../../services/houseService";
import favoriteService from "../../services/favoriteService";
import HouseCard from "../../components/tenant/HouseCard";
import SearchBar from "../../components/tenant/SearchBar";
import Loader, { HouseCardGridSkeleton } from "../../components/tenant/Loader";
import { Home as HomeIcon, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useAuth();
  const [houses, setHouses] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    fetchHouses();
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchHouses = async () => {
    try {
      setLoading(true);
      const data = await houseService.getAllHouses();
      setHouses(data);
    } catch (error) {
      console.error("Error fetching houses:", error);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      console.log("[Home] User exists, fetching favorites...");
      const data = await favoriteService.getFavorites();
      console.log("[Home] Got favorites data:", data);
      const ids = new Set(data.map((house) => house._id));
      console.log("[Home] Favorite IDs set to:", Array.from(ids));
      setFavoriteIds(ids);
    } catch (error) {
      console.error("[Home] Error fetching favorites:", error);
    }
  };

  const handleToggleFavorite = async (houseId) => {
    try {
      console.log(
        "[Home] Toggling favorite for house:",
        houseId,
        "Currently favorite:",
        favoriteIds.has(houseId),
      );
      if (favoriteIds.has(houseId)) {
        await favoriteService.removeFavorite(houseId);
        setFavoriteIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(houseId);
          console.log("[Home] Removed, new set:", Array.from(newSet));
          return newSet;
        });
        toast.success("Removed from favorites");
      } else {
        await favoriteService.addFavorite(houseId);
        setFavoriteIds((prev) => {
          const newSet = new Set([...prev, houseId]);
          console.log("[Home] Added, new set:", Array.from(newSet));
          return newSet;
        });
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("[Home] Error toggling favorite:", error);
      toast.error(error.message || "Failed to update favorite");
    }
  };

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      setSearchActive(true);
      // For now, just filter locally. Backend search can be added later
      let filtered = houses;

      if (filters.search) {
        filtered = filtered.filter((h) =>
          h.title.toLowerCase().includes(filters.search.toLowerCase()),
        );
      }

      if (filters.location) {
        filtered = filtered.filter((h) =>
          h.location.toLowerCase().includes(filters.location.toLowerCase()),
        );
      }

      if (filters.minPrice !== undefined) {
        filtered = filtered.filter((h) => h.price >= filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter((h) => h.price <= filters.maxPrice);
      }

      setHouses(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchActive(false);
    await fetchHouses();
  };

  if (loading && houses.length === 0) {
    return <HouseCardGridSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <HomeIcon size={32} />
            <h1 className="text-4xl md:text-5xl font-bold">
              Find Your Perfect Home
            </h1>
          </div>
          <p className="text-lg text-indigo-100">
            Browse amazing properties available for rent in your area
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Search Bar */}
        <div className="mb-8 animate-fade-in">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
        </div>

        {/* Results Count */}
        {searchActive && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>
              Found <strong>{houses.length}</strong> property(ies) matching your
              search
            </span>
          </div>
        )}

        {/* Houses Grid */}
        {houses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house) => (
              <HouseCard
                key={house._id}
                house={house}
                isFavorite={favoriteIds.has(house._id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏚️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {searchActive ? "No properties found" : "No properties available"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchActive
                ? "Try adjusting your search filters"
                : "Check back soon for new listings"}
            </p>
            {searchActive && (
              <button
                onClick={handleClearSearch}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
