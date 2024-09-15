// routes/subjectRoutes.js
const express = require('express');
const { createSubject, getStudentSubjects, updateSubject, deleteSubject, getAllSubjects, assignSubjects } = require('../controllers/subjectController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware('schooladmin'), getAllSubjects);
// Create a subject (School Admin)
router.post('/create', authMiddleware('schooladmin'), createSubject);

// Assign a subject to a student (School Admin)
router.post('/assign', authMiddleware('schooladmin'), assignSubjects);

// Get all subjects for a student (Student)
router.get('/my-subjects', authMiddleware('student'), getStudentSubjects);

// Update a subject (School Admin)
router.put('/update/:subjectId', authMiddleware('schooladmin'), updateSubject);

// Delete a subject (School Admin)
router.delete('/delete/:subjectId', authMiddleware('schooladmin'), deleteSubject);

module.exports = router;
