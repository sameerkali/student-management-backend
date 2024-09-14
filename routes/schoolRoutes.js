const express = require('express');
const { addSchool, getAllSchools, removeFieldFromSchool } = require('../controllers/schoolController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a new school (Superadmin only)
router.post('/add', authMiddleware('superadmin'), addSchool);

// Get all schools (Superadmin only)
router.get('/all', authMiddleware('superadmin'), getAllSchools);

// Remove a field from a school (Superadmin only)
router.put('/remove-field', authMiddleware('superadmin'), removeFieldFromSchool);

module.exports = router;
