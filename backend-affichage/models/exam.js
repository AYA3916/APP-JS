const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  professeurId: { type: String, required: true },
  titre: String,
  description: String,
  filiere: String,
  semestre: String,
  lien: String,
  questions: [
    {
      type: { type: String }, // 'directe' ou 'qcm'
      enonce: String,
      propositions: [String],
      bonneReponse: String,
      note: Number,
      tolerance: Number,
      duree: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
