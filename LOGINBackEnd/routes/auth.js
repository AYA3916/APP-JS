const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// 🔐 SIGN UP Route
router.post("/signup", async (req, res) => {
  const { fullName, email, password, birthday, gender, university, filiere, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("❌ User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      birthday,
      gender,
      university,
      filiere,
      role
    });

    await newUser.save();
    res.status(201).send("✅ User registered successfully");
  } catch (err) {
    res.status(400).send("❌ Error: " + err.message);
  }
});

// 🔓 SIGN IN Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("❌ Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("❌ Invalid email or password");

    res.status(200).json({ message: "✅ Login successful", role: user.role });
  } catch (err) {
    res.status(500).send("❌ Server error");
  }
});

module.exports = router;
