import axios from "axios";

const API_URL = "http://localhost:5000/house/";

export const getHouses = async () => {
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    return response.data.houses;
  } catch (error) {
    console.error("Error fetching houses:", error);
    return [];
  }
};

export const getHouseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`, {
      withCredentials: true,
    });
    return response.data.house;
  } catch (error) {
    console.error("Error fetching house details:", error);
    return null;
  }
}