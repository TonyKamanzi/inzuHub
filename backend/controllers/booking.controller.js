import Booking from "../models/booking.js";
import House from "../models/house.js";
import User from "../models/user.js";

// create booking
export const createBooking = async (req, res) => {
  try {
    const { houseId, moveInDate, message } = req.body;
    const house = await House.findById(houseId);

    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    if (house.status == "rentend") {
      return res.status(400).json({ message: "House already rented" });
    }

    const booking = await Booking.create({
      house: houseId,
      tenant: req.session.user.id,
      landlord: house.landlord,
      date: moveInDate,
      message,
    });
    res.status(202).json({ message: "Booking sent", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get landlord bookings
export const getLandlordBookings = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const bookings = await Booking.find({ landlord: req.session.user.id })
      .populate("house", "title location price images")
      .populate("tenant", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const { status } = req.body;
    const bookingId = req.params.id;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(bookingId).populate("house");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify landlord ownership
    if (booking.landlord.toString() !== req.session.user.id) {
      return res.status(403).json({
        message: "Unauthorized: You can only update your own bookings",
      });
    }

    // Update booking status
    booking.status = status;
    await booking.save();

    // If approved, update house status to rented
    if (status === "approved") {
      await House.findByIdAndUpdate(booking.house._id, { status: "rentend" });
    }

    res
      .status(200)
      .json({ message: `Booking ${status} successfully`, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get tenant bookings
export const getTenantBookings = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    const bookings = await Booking.find({ tenant: req.session.user.id })
      .populate("house", "title location price images")
      .populate("landlord", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get booking
