const express = require("express");
const router = express.Router();
const etudiantController = require("../controllers/etudiantController");

router.get("/examens", etudiantController.getExamens);
router.get("/resultats", etudiantController.getResultats);
router.post("/settings", etudiantController.updateSettings);

module.exports = router;
