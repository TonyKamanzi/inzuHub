import bcrypt from "bcrypt";
import User from "../models/user.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["tenant", "landlord"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const status = role === "tenant" ? "approved" : "pending";

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      status,
    });

    res.status(201).json({
      message: "Signup successful, pending approval if landlord",
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
        status: newUser.status,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.role === "landlord" && user.status !== "approved") {
      return res
        .status(403)
        .json({ message: "Landlord not approved by admin yet" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      role: user.role,
      status: user.status,
    };

    res.json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


