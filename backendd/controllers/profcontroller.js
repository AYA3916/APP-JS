const db = require("../config/db");

exports.getExamens = (req, res) => {
  const id = req.query.profId;
  db.query("SELECT * FROM examens WHERE prof_id = ?", [id], (err, rows) => {
    if (err) return res.status(500).send("Erreur");
    res.json(rows);
  });
};

exports.createExamen = (req, res) => {
  const { titre, date, classe, prof_id } = req.body;
  db.query("INSERT INTO examens (titre, date, classe, prof_id) VALUES (?, ?, ?, ?)", [titre, date, classe, prof_id], (err) => {
    if (err) return res.status(500).send("Erreur");
    res.sendStatus(201);
  });
};

exports.updateExamen = (req, res) => {
  const examId = req.params.id;
  const { titre, date, classe, prof_id } = req.body;
  db.query("UPDATE examens SET titre=?, date=?, classe=? WHERE id=? AND prof_id=?", [titre, date, classe, examId, prof_id], (err) => {
    if (err) return res.status(500).send("Erreur");
    res.sendStatus(200);
  });
};

exports.updateSettings = (req, res) => {
  const { nom, email, mdp, id } = req.body;
  db.query("UPDATE profs SET nom=?, email=?, mdp=? WHERE id=?", [nom, email, mdp, id], (err) => {
    if (err) return res.status(500).send("Erreur");
    res.sendStatus(200);
  });
};
