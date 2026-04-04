import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/user.js";

const createAdmin = async () => {
  try {
    // Connect to DB
    await mongoose.connect("mongodb://127.0.0.1:27017/inzuhub");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(process.env.admin_password, 10);

    // Create admin
    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      status: "approved",
    });

    console.log("Admin created successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();