const School = require('../models/schoolModel');

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

// Get all schools (Superadmin only)
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a field from a school (Superadmin only)
exports.removeFieldFromSchool = async (req, res) => {
  const { fieldToRemove } = req.body;
  const schoolId = req.user.school; // Assuming superadmin has access to all schools or a specific school

  try {
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Remove the specified field from the school's fields array
    school.fields = school.fields.filter(field => field !== fieldToRemove);
    await school.save();

    res.json({ message: 'Field removed successfully from school', fields: school.fields });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
