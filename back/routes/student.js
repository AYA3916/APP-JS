const express = require('express');
const router = express.Router();
const {
  listExams,
  getExam,
  submitExam,
  myResults,
} = require('../controllers/studentController');
const { protect, authorizeRoles } = require('../middleware/auth');

// Public route to list exams
router.get('/exams', listExams);
// Public route to get exam by link
router.get('/exams/:link', getExam);

// Protected below
router.use(protect, authorizeRoles('student'));
router.post('/exams/:link/submit', submitExam);
router.get('/results', myResults);

module.exports = router;
