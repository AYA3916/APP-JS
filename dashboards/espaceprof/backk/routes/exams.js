const express = require('express');
const router = express.Router();
const examController = require('../controller/examcontroller');


// Routes pour les examens
router.post('/', examController.createExam);
router.get('/', examController.getExamsByProfessor);
router.delete('/:id', examController.deleteExam);

module.exports = router;