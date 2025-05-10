const Exam = require('../models/Exam');
const Result = require('../models/Result');

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ professorId: req.params.id });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
};

exports.createExam = async (req, res) => {
  try {
    const exam = new Exam({ ...req.body, professorId: req.params.id });
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create exam' });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.examId, req.body, { new: true });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update exam' });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.examId);
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete exam' });
  }
};

exports.addResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save result' });
  }
};
