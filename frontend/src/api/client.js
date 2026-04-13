import axios from "axios";

const API_URL = "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth endpoints
export const authAPI = {
  login: (email, password) =>
    apiClient.post("/auth/login", { email, password }),

  signup: (name, email, password, role) =>
    apiClient.post("/auth/register", { name, email, password, role }),

  logout: () => apiClient.post("/auth/logout"),

  getUsers: () => apiClient.get("/auth"),
};

// House endpoints
export const houseAPI = {
  getAllHouses: () => apiClient.get("/house"),

  getHouseById: (id) => apiClient.get(`/house/${id}`),

  createHouse: (houseData) => apiClient.post("/house", houseData),

  updateHouse: (id, houseData) => apiClient.put(`/house/${id}`, houseData),

  deleteHouse: (id) => apiClient.delete(`/house/${id}`),
};

// Favorites endpoints
export const favoritesAPI = {
  getFavorites: () => apiClient.get("/favorites"),

  addFavorite: (houseId) => apiClient.post("/favorites", { houseId }),

  removeFavorite: (houseId) => apiClient.delete(`/favorites/${houseId}`),
};

// Admin endpoints
export const adminAPI = {
  getPendingLandlords: () => apiClient.get("/admin/pending"),

  approveLandlord: (userId) => apiClient.post(`/admin/approve/${userId}`),

  rejectLandlord: (userId) => apiClient.post(`/admin/reject/${userId}`),
};

export default apiClient;
