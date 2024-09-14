const School = require('../models/schoolModel');

// Remove a field from student registration form (Schooladmin only)
exports.removeFieldFromRegistrationForm = async (req, res) => {
  const { fieldToRemove, schoolId } = req.body;
  console.log("req.body:", req.body)
  
  try {
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Remove the specified field from the school's registration form
    school.fields = school.fields.filter(field => field !== fieldToRemove);
    await school.save();

    res.json({ message: 'Field removed successfully from registration form', fields: school.fields });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
