const Exam = require('../models/Exam');
const Result = require('../models/Result');

exports.getMyExams = async (req, res) => {
  try {
    const exams = await Exam.find({ professorId: req.user._id });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createExam = async (req, res) => {
  try {
    const { title, description, filiere, semester, questions, public: isPublic } = req.body;
    const link = `exam_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const exam = await Exam.create({
      title,
      description,
      filiere,
      semester,
      questions,
      public: isPublic,
      link,
      professorId: req.user._id,
    });
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndUpdate(
      { _id: req.params.examId, professorId: req.user._id },
      req.body,
      { new: true }
    );
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndDelete({ _id: req.params.examId, professorId: req.user._id });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Teacher can view results for a particular exam
exports.getExamResults = async (req, res) => {
  try {
    const results = await Result.find({ examId: req.params.examId }).populate('studentId', 'name email');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
