// controllers/subjectController.js
const Subject = require('../models/subjectModel');
const User = require('../models/userModel');


// Create a subject (School Admin)
exports.createSubject = async (req, res) => {
  try {
    const newSubject = new Subject(req.body);
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/// Assign multiple subjects to a student (School Admin)
exports.assignSubjects = async (req, res) => {
  const { studentId, subjectIds } = req.body;

  try {
    // Find the student by their ID and role
    const student = await User.findOne({ _id: studentId, role: 'student' });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find and update each subject
    const updatedSubjects = [];
    for (const subjectId of subjectIds) {
      const subject = await Subject.findById(subjectId);
      if (subject) {
        // Add the student to the subject if not already assigned
        if (!subject.students.includes(studentId)) {
          subject.students.push(studentId);
          await subject.save();
          updatedSubjects.push(subject);
        }
      } else {
        return res.status(404).json({ message: `Subject with ID ${subjectId} not found` });
      }
    }

    res.json({ message: 'Subjects assigned successfully', subjects: updatedSubjects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all subjects assigned to a student (Student)
exports.getStudentSubjects = async (req, res) => {
  const studentId = req.user.id; // Extracted from token

  try {
    const subjects = await Subject.find({ students: studentId });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all subjects (School Admin)
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find(); // Fetch all subjects in the database

    if (!subjects.length) {
      return res.status(404).json({ message: 'No subjects found' });
    }

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a subject (School Admin)
exports.updateSubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const updatedSubject = await Subject.findByIdAndUpdate(subjectId, req.body, { new: true });
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a subject (School Admin)
exports.deleteSubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    await Subject.findByIdAndDelete(subjectId);
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
