const examSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Exam', examSchema);
