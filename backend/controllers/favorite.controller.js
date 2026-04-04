import Favorite from "../models/favorite.js";

export const addFavorite = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { houseId } = req.body;

    const favorite = await Favorite.create({
      user: userId,
      house: houseId,
    });

    res.json({ message: "Added to favorites", favorite });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already in favorites" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { houseId } = req.body;

    await Favorite.findOneAndDelete({
      user: userId,
      house: houseId,
    });

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.session.user.id,
    }).populate("house");

    res.json({ favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};