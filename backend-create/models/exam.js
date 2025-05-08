const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: String, // 'directe' ou 'qcm'
  enonce: String,
  propositions: [String], // pour QCM
  bonneReponse: String,
  note: Number,
  tolerance: Number,
  duree: Number
});

const examSchema = new mongoose.Schema({
  professeurId: String, // identifiant du prof
  titre: String,
  description: String,
  filiere: String,
  semestre: String,
  lien: String,
  questions: [questionSchema]
});

module.exports = mongoose.model('Exam', examSchema);
