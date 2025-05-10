const express = require('express');
const router = express.Router();
const {
  getMyExams,
  createExam,
  updateExam,
  deleteExam,
  getExamResults,
} = require('../controllers/teacherController');
const { protect, authorizeRoles } = require('../middleware/auth');

router.use(protect, authorizeRoles('teacher'));

router.get('/exams', getMyExams);
router.post('/exams', createExam);
router.put('/exams/:examId', updateExam);
router.delete('/exams/:examId', deleteExam);
router.get('/exams/:examId/results', getExamResults);

module.exports = router;
