const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Backend is working"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
