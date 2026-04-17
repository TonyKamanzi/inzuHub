import axios from "axios";

const API_URL = "http://localhost:5000/bookings";

const createBooking = async (data) => {
  const res = await axios.post(API_URL, data, {
    withCredentials: true,
  });

  return res.data;
};

const bookingService = {
  createBooking,
};

export default bookingService;
