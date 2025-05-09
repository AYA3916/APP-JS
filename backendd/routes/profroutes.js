const express = require("express");
const router = express.Router();
const profController = require("../controllers/profController");

router.get("/examens", profController.getExamens);
router.post("/examens", profController.createExamen);
router.put("/examens/:id", profController.updateExamen);
router.post("/settings", profController.updateSettings);

module.exports = router;
