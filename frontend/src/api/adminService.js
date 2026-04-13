import axios from "axios";

const API_URL = "http://localhost:5000/admin";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const adminService = {
  // Stats
  getStats: async () => {
    const response = await api.get("/stats");
    return response.data;
  },

  // Users
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Landlords
  getPendingLandlords: async () => {
    const response = await api.get("/pending-landlords");
    return response.data;
  },

  approveLandlord: async (id) => {
    const response = await api.put(`/approve-landlord/${id}`);
    return response.data;
  },

  rejectLandlord: async (id) => {
    const response = await api.put(`/reject-landlord/${id}`);
    return response.data;
  },

  // Houses
  getAllHouses: async () => {
    const response = await api.get("/houses");
    return response.data;
  },

  deleteHouse: async (id) => {
    const response = await api.delete(`/houses/${id}`);
    return response.data;
  },
};

export default adminService;
