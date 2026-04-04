import User from "../models/user.js";

// GET all pending landlords
export const getPendingLandlords = async (req, res) => {
  try {
    const landlords = await User.find({ role: "landlord", status: "pending" });
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
