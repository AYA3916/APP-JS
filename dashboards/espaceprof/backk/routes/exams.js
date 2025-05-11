const express = require('express');
const router = express.Router();
const examController = require('../controller/examcontroller');


router.post('/', examController.createExam);
router.get('/', examController.getExamsByProfessor);
router.delete('/:id', examController.deleteExam);

module.exports = router;