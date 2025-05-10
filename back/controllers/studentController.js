const Exam = require('../models/Exam');
const Result = require('../models/Result');

exports.listExams = async (req, res) => {
  try {
    // list public exams or those assigned
    const exams = await Exam.find({ public: true });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getExam = async (req, res) => {
  try {
    const exam = await Exam.findOne({ link: req.params.link });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit answers and get score
exports.submitExam = async (req, res) => {
  try {
    const exam = await Exam.findOne({ link: req.params.link });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    const { answers } = req.body; // array of { questionIndex, answer }
    let score = 0;
    const answersDetailed = answers.map(({ questionIndex, answer }) => {
      const question = exam.questions[questionIndex];
      const correct = JSON.stringify(question.correctAnswer) === JSON.stringify(answer);
      const earnedNote = correct ? question.note : 0;
      score += earnedNote;
      return { questionIndex, answer, correct, earnedNote };
    });

    const result = await Result.create({
      studentId: req.user._id,
      examId: exam._id,
      score,
      answers: answersDetailed,
    });

    res.status(201).json({ score, resultId: result._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.user._id }).populate('examId', 'title description');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
