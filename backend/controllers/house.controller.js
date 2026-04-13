import House from "../models/house.js";

export const createHouse = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }
    const {
      title,
      description,
      location,
      price,
      images,
      status,
      rooms,
      bathrooms,
      area,
      contactaddress,
    } = req.body;
    const newHouse = new House({
      title,
      description,
      location,
      price,
      landlord: req.session.user.id,
      images,
      status,
      rooms,
      bathrooms,
      area,
      contactaddress,
    });
    await newHouse.save();
    res
      .status(201)
      .json({ message: "House created successfully", house: newHouse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all landlord's houses
export const getLandlordHouses = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const landlordId = req.session.user.id;
    const houses = await House.find({ landlord: landlordId }).populate(
      "landlord",
      "name email",
    );

    res.json({ houses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get stats for landlord dashboard
export const getLandlordStats = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const landlordId = req.session.user.id;
    const totalHouses = await House.countDocuments({ landlord: landlordId });
    const availableHouses = await House.countDocuments({
      landlord: landlordId,
      status: "available",
    });
    const rentedHouses = await House.countDocuments({
      landlord: landlordId,
      status: "rented",
    });

    res.json({
      totalHouses,
      availableHouses,
      rentedHouses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getHouses = async (req, res) => {
  try {
    const houses = await House.find().populate("landlord", "name email");
    res.json({ houses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id).populate(
      "landlord",
      "name email",
    );
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json({ house });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateHouse = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    // Verify ownership - ensure both are strings for comparison
    const houseLandlordId = house.landlord.toString();
    const userId = req.session.user.id.toString();
    if (houseLandlordId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can only update your own houses" });
    }

    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json({ message: "House updated successfully", house: updatedHouse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteHouse = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const house = await House.findById(req.params.id);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    // Verify ownership - ensure both are strings for comparison
    const houseLandlordId = house.landlord.toString();
    const userId = req.session.user.id.toString();
    if (houseLandlordId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You can only delete your own houses" });
    }

    await House.findByIdAndDelete(req.params.id);
    res.json({ message: "House deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
