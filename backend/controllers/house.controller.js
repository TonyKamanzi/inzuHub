import House from "../models/house.js";

export const createHouse = async (req, res) => {
  try {
    // console.log("SESSION:", req.session); // 👈 HERE

    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }
    const { title, description, location, price, images, status } = req.body;
    const newHouse = new House({
      title,
      description,
      location,
      price,
      landlord: req.session.user.id,
      images,
      status,
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
    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedHouse) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json({ message: "House updated successfully", house: updatedHouse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteHouse = async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndDelete(req.params.id);
    if (!deletedHouse) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json({ message: "House deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
