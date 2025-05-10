const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

router.get('/:id/exams', professorController.getExams);
router.post('/:id/exams', professorController.createExam);
router.put('/:id/exams/:examId', professorController.updateExam);
router.delete('/:id/exams/:examId', professorController.deleteExam);
router.post('/:id/results', professorController.addResult);

module.exports = router;