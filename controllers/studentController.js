const Student = require('../models/studentModel');
const jwt = require('jsonwebtoken');

// Handle student login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student || !(await student.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id, role: 'student', school: student.school }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
      token,
      fields: student.fields,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student's profile with visible fields
exports.getProfile = async (req, res) => {
  const studentId = req.user.id; // From token

  try {
    const student = await Student.findById(studentId).populate('school');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Only return the fields the student has access to
    const studentProfile = {};
    student.fields.forEach(field => {
      studentProfile[field] = student[field];
    });

    res.json(studentProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
