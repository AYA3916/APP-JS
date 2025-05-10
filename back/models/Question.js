const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['direct', 'mcq'], required: true },
  options: [String], // for MCQ
  correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
  note: { type: Number, required: true },
  duration: { type: Number, required: true }, // in seconds
});

module.exports = questionSchema; // export as schema to embed
