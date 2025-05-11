const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  filiere: { type: String, required: true },
  semestre: { type: String, required: true },
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [
    {
      type: { type: String, enum: ['directe', 'qcm'], required: true },
      enonce: { type: String, required: true },
      duration: { type: Number, default: 60 },
      points: { type: Number, default: 1 },
      reponse: { type: String }, // Pour les questions directes
      propositions: [ // Pour les QCM
        {
          proposition: { type: String },
          correcte: { type: Boolean }
        }
      ]
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exam', examSchema);