const StudentRegistration = require('../models/studentRegistrationModel');

exports.createRegistration = async (req, res) => {
    const { name, dob, email, fields, schoolId } = req.body;
  
    try {
      // Ensure schoolId is provided in the body
      if (!schoolId) {
        return res.status(400).json({ message: 'School ID is required' });
      }
  
      // Create a new student registration
      const newRegistration = new StudentRegistration({
        name,
        dob,
        email,
        fields,
        school: schoolId, // Use the schoolId provided in the request body
      });
  
      await newRegistration.save();
      res.status(201).json({ message: 'Student registered successfully', newRegistration });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Update a registration (School Admin)
exports.updateRegistration = async (req, res) => {
  try {
    const updatedRegistration = await StudentRegistration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRegistration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a registration (Superadmin)
exports.deleteRegistration = async (req, res) => {
  try {
    await StudentRegistration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific registration (Superadmin and Student)
exports.getRegistration = async (req, res) => {
  try {
    const registration = await StudentRegistration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
