import axios from "axios";

const API_URL = "http://localhost:5000/house";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const landlordService = {
  // Stats
  getStats: async () => {
    const response = await api.get("/landlord/stats");
    return response.data;
  },

  // Houses
  getMyHouses: async () => {
    const response = await api.get("/landlord/my-houses");
    return response.data.houses || response.data;
  },

  createHouse: async (houseData) => {
    const response = await api.post("/", houseData);
    return response.data.house || response.data;
  },

  updateHouse: async (id, houseData) => {
    const response = await api.put(`/${id}`, houseData);
    return response.data.house || response.data;
  },

  deleteHouse: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },

  getHouseById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data.house || response.data;
  },
};

export default landlordService;
