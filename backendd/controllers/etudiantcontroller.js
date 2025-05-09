const db = require("../config/db");

exports.getExamens = (req, res) => {
  const id = req.query.etudiantId;
  db.query("SELECT * FROM examens WHERE etudiant_id = ?", [id], (err, rows) => {
    if (err) return res.status(500).send("Erreur");
    res.json(rows);
  });
};

exports.getResultats = (req, res) => {
  const id = req.query.etudiantId;
  db.query("SELECT matiere, note FROM resultats WHERE etudiant_id = ?", [id], (err, rows) => {
    if (err) return res.status(500).send("Erreur");
    res.json(rows);
  });
};

exports.updateSettings = (req, res) => {
  const { nom, email, mdp, id } = req.body;
  db.query("UPDATE etudiants SET nom=?, email=?, mdp=? WHERE id=?", [nom, email, mdp, id], (err) => {
    if (err) return res.status(500).send("Erreur");
    res.sendStatus(200);
  });
};
