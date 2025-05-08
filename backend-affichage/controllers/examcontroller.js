const Exam = require('../models/Exam');

// GET: Afficher les examens d’un professeur
exports.getExamsByProf = async (req, res) => {
  try {
    const { professeurId } = req.params;
    const exams = await Exam.find({ professeurId });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
