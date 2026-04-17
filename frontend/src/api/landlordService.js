import axios from "axios";

const HOUSE_API_URL = "http://localhost:5000/house";
const BOOKING_API_URL = "http://localhost:5000/bookings";

const houseApi = axios.create({
  baseURL: HOUSE_API_URL,
  withCredentials: true,
});

const bookingApi = axios.create({
  baseURL: BOOKING_API_URL,
  withCredentials: true,
});

export const landlordService = {
  // Stats
  getStats: async () => {
    const response = await houseApi.get("/landlord/stats");
    return response.data;
  },

  // Houses
  getMyHouses: async () => {
    const response = await houseApi.get("/landlord/my-houses");
    return response.data.houses || response.data;
  },

  createHouse: async (houseData) => {
    const response = await houseApi.post("/", houseData);
    return response.data.house || response.data;
  },

  updateHouse: async (id, houseData) => {
    const response = await houseApi.put(`/${id}`, houseData);
    return response.data.house || response.data;
  },

  deleteHouse: async (id) => {
    const response = await houseApi.delete(`/${id}`);
    return response.data;
  },

  getHouseById: async (id) => {
    const response = await houseApi.get(`/${id}`);
    return response.data.house || response.data;
  },

  // Bookings
  getBookings: async () => {
    const response = await bookingApi.get("/landlord");
    return response.data.bookings || response.data;
  },

  updateBookingStatus: async (bookingId, status) => {
    const response = await bookingApi.put(`/${bookingId}/status`, { status });
    return response.data;
  },
};

export default landlordService;
