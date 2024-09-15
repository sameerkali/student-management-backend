const mongoose = require('mongoose');

const studentRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  fields: {
    type: Array,
    default: ['name', 'dob', 'email'], // Default fields for registration
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending', // Initial status
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StudentRegistration = mongoose.model('StudentRegistration', studentRegistrationSchema);

module.exports = StudentRegistration;
