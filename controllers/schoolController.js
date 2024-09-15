const School = require('../models/schoolModel');
const User = require('../models/userModel');

// Add a new school (Superadmin only)
exports.addSchool = async (req, res) => {
  const { name, address, fields } = req.body;

  try {
    const newSchool = new School({
      name,
      address,
      fields,
    });

    await newSchool.save();
    res.status(201).json({ message: 'School added successfully', school: newSchool });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all schools
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all getAllStudents 
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.removeFieldFromSchool = async (req, res) => {
  const { schoolId, fieldToRemove } = req.body; // Extract schoolId and fieldToRemove from the request body

  console.log('Field to Remove:', fieldToRemove); // Debugging: Check if the field is received
  console.log('School ID:', schoolId); // Debugging: Check if the schoolId is correct

  try {
    // Check if schoolId is valid
    if (!schoolId) {
      return res.status(400).json({ message: 'School ID is required' });
    }

    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Remove the specified field from the school's fields array
    school.fields = school.fields.filter(field => field !== fieldToRemove);
    await school.save();

    res.json({ message: 'Field removed successfully from school', fields: school.fields });
  } catch (error) {
    console.error('Error:', error); // Debugging: Log any errors
    res.status(500).json({ error: error.message });
  }
};