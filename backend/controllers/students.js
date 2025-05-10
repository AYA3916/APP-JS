const Result = require('../models/Result');
const Exam = require('../models/Exam');
const User = require('../models/User');

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.params.id }).populate('examId');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
};

exports.getExams = async (req, res) => {
  try {
    const now = new Date();
    const exams = await Exam.find({ date: { $gte: now } });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { settings: req.body }, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
};
