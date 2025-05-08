const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');

// ➕ Route pour créer un examen
router.post('/create', async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    await newExam.save();
    res.status(201).json({ message: "Examen créé avec succès ✅", exam: newExam });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création ❌", error });
  }
});

module.exports = router;
