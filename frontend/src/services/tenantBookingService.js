import axios from "axios";

const API_URL = "http://localhost:5000/bookings";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const tenantBookingService = {
  // Get all tenant bookings
  getBookings: async () => {
    try {
      const response = await api.get("/tenant");
      return response.data.bookings || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch bookings");
    }
  },
};

export default tenantBookingService;
