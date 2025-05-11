const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => console.error("Erreur MongoDB:", err));

// Routes
const examRoutes = require('./routes/exams');
app.use('/api/exams', examRoutes);

// Test simple
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend TesTopia !');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
