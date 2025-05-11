const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// 🔐 SIGN UP Route
router.post("/signup", async (req, res) => {
  const { fullName, email, password, birthday, gender, university, filiere } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("❌ User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
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


const result = await res.text();
alert(result);

if (res.ok) {
  // Redirect based on role
  if (role === "student") {
    window.location.href = "student.html";
  } else if (role === "professor") {
    window.location.href = "prof.html";
  }
}


// 🔓 SIGN IN Route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("❌ Invalid email or password");

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("❌ Invalid email or password");

    res.send("✅ Login successful");
  } catch (err) {
    res.status(500).send("❌ Server error");
  }
});

module.exports = router;
