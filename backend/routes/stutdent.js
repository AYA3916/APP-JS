const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/:id/results', studentController.getResults);
router.get('/:id/exams', studentController.getExams);
router.put('/:id/settings', studentController.updateSettings);

module.exports = router;