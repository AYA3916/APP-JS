const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');

// ➕ Créer un nouvel examen
router.post('/create', async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    await newExam.save();
    res.status(201).json({ message: "Examen enregistré avec succès ✅", exam: newExam });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'examen ❌", error });
  }
});

module.exports = router;
