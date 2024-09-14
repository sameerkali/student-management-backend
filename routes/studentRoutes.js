const express = require('express');
const { login, getProfile } = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Student login
router.post('/login', login);

// Get student's profile (Authenticated route)
router.get('/profile', authMiddleware('student'), getProfile);

module.exports = router;
