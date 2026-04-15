import axios from "axios";

const API_URL = "http://localhost:5000/favorites";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const favoriteService = {
  // Get all favorite houses
  getFavorites: async () => {
    try {
      console.log("[Favorites] Fetching from:", API_URL);
      const response = await api.get("/");
      console.log("[Favorites] Raw response:", response.data);

      // Extract house data from favorites array
      const favorites = response.data.favorites || response.data || [];
      console.log("[Favorites] Parsed favorites:", favorites);

      // Map to return just the house objects with house ID for easier access
      const transformed = favorites.map((fav) => {
        console.log("[Favorites] Transforming:", fav);
        return {
          ...fav.house,
          favoriteId: fav._id, // Keep favorite record ID for deletion
        };
      });

      console.log("[Favorites] Final transformed:", transformed);
      return transformed;
    } catch (error) {
      console.error("[Favorites] Failed to fetch favorites:", error);
      throw error;
    }
  },

  // Add house to favorites
  addFavorite: async (houseId) => {
    try {
      console.log("[Favorites] Adding to favorites:", houseId);
      const response = await api.post("/", { houseId });
      console.log("[Favorites] Add response:", response.data);
      return response.data;
    } catch (error) {
      console.error(`[Favorites] Failed to add favorite:`, error);
      throw error;
    }
  },

  // Remove house from favorites
  removeFavorite: async (houseId) => {
    try {
      console.log("[Favorites] Removing from favorites:", houseId);
      const response = await api.delete("/", { data: { houseId } });
      console.log("[Favorites] Remove response:", response.data);
      return response.data;
    } catch (error) {
      console.error(`[Favorites] Failed to remove favorite:`, error);
      throw error;
    }
  },
};

export default favoriteService;
