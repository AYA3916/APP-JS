const Exam = require('../models/Exam');

// Créer un examen
exports.createExam = async (req, res) => {
  try {
    const { titre, description, filiere, semestre, questions } = req.body;
    
    const newExam = new Exam({
      titre,
      description,
      filiere,
      semestre,
      professeur: req.userId, // ID du prof connecté
      questions
    });

    const savedExam = await newExam.save();
    res.status(201).json({
      examId: savedExam._id,
      message: 'Examen créé avec succès'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer tous les examens d'un professeur
exports.getExamsByProfessor = async (req, res) => {
  try {
    const exams = await Exam.find({ professeur: req.userId })
      .sort({ createdAt: -1 })
      .select('-questions.propositions.correcte'); // Cache les bonnes réponses

    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un examen
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Vérifier que l'examen appartient bien au professeur
    const exam = await Exam.findOneAndDelete({
      _id: id,
      professeur: req.userId
    });

    if (!exam) {
      return res.status(404).json({ message: 'Examen non trouvé' });
    }

    res.json({ message: 'Examen supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};