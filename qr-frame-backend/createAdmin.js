// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel"); // adjust if your path differs

const MONGO_URI = "mongodb+srv://pallavi:<YourPassword>@frames.or5zekl.mongodb.net/yourDB?retryWrites=true&w=majority&appName=Frames"; // replace <YourPassword> and yourDB

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ email: "pallaviaddala27@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Palluanu@123", 10);

    const admin = new User({
      name: "Admin Pallavi",
      email: "pallaviaddala27@gmail.com",
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
