const express = require('express');
const { removeFieldFromRegistrationForm } = require('../controllers/schoolAdminController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Remove a field from student registration form (Schooladmin only)
router.put('/remove-field', authMiddleware('schooladmin'), removeFieldFromRegistrationForm);

module.exports = router;
