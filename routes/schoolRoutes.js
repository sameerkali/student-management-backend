const express = require('express');
const { addSchool, getAllSchools, removeFieldFromSchool } = require('../controllers/schoolController');
const { createRegistration, updateRegistration, deleteRegistration, getRegistration } = require('../controllers/registrationController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a new school (Superadmin only)
router.post('/add', authMiddleware('superadmin'), addSchool);

// Get all schools (Superadmin only)
router.get('/all',  getAllSchools);

// Remove a field from a school (Superadmin only)
router.put('/remove-field', authMiddleware('superadmin'), removeFieldFromSchool);

// Create a student registration (School Admin only)
router.post('/registration', authMiddleware('schooladmin'), createRegistration);

// Update a student registration (School Admin only)
router.put('/registration/:id', authMiddleware('schooladmin'), updateRegistration);

// Delete a student registration (Superadmin only)
router.delete('/registration/:id', authMiddleware('superadmin'), deleteRegistration);

// Get a specific student registration (Superadmin and Student can view)
router.get('/registration/:id', getRegistration);


module.exports = router;
