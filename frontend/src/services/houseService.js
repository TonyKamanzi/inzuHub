import axios from "axios";

const API_URL = "http://localhost:5000/house";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const houseService = {
  // Get all available houses
  getAllHouses: async () => {
    try {
      const response = await api.get("/");
      return response.data.houses || [];
    } catch (error) {
      console.error("Failed to fetch houses:", error);
      throw error;
    }
  },

  // Get single house details
  getHouseById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data.house || response.data;
    } catch (error) {
      console.error(`Failed to fetch house ${id}:`, error);
      throw error;
    }
  },

  // Search/filter houses
  searchHouses: async (query) => {
    try {
      const response = await api.get("/", { params: query });
      return response.data.houses || [];
    } catch (error) {
      console.error("Failed to search houses:", error);
      throw error;
    }
  },
};

export default houseService;
