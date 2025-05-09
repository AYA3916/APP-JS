const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    score: { type: Number, required: true },
    answers: [
      {
        questionIndex: Number,
        answer: mongoose.Schema.Types.Mixed,
        correct: Boolean,
        earnedNote: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
