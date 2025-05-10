const mongoose = require('mongoose');
const questionSchema = require('./Question');

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    filiere: String,
    semester: String,
    questions: [questionSchema],
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    public: { type: Boolean, default: true },
    link: { type: String, required: true, unique: true }, // unique access link
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exam', examSchema);
