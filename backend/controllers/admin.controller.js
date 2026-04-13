import User from "../models/user.js";
import House from "../models/house.js";

// GET dashboard stats
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalHouses = await House.countDocuments();
    const pendingLandlords = await User.countDocuments({
      role: "landlord",
      status: "pending",
    });
    const activeLandlords = await User.countDocuments({
      role: "landlord",
      status: "approved",
    });

    res.json({
      totalUsers,
      totalHouses,
      pendingLandlords,
      activeLandlords,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// GET all pending landlords
export const getPendingLandlords = async (req, res) => {
  try {
    const landlords = await User.find({
      role: "landlord",
      status: "pending",
    }).select("-password");
    res.json({ landlords });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Approve landlord
export const approveLandlord = async (req, res) => {
  try {
    const { id } = req.params;
    const landlord = await User.findById(id);

    if (!landlord || landlord.role !== "landlord") {
      return res.status(404).json({ message: "Landlord not found" });
    }

    landlord.status = "approved";
    await landlord.save();

    res.json({ message: "Landlord approved", landlord });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Reject landlord
export const rejectLandlord = async (req, res) => {
  try {
    const { id } = req.params;
    const landlord = await User.findById(id);

    if (!landlord || landlord.role !== "landlord") {
      return res.status(404).json({ message: "Landlord not found" });
    }

    landlord.status = "rejected";
    await landlord.save();

    res.json({ message: "Landlord rejected", landlord });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// GET all houses
export const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find().populate("landlord", "name email");
    res.json({ houses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// DELETE house
export const deleteHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id);

    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    await House.findByIdAndDelete(id);

    res.json({ message: "House deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
