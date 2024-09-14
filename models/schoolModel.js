const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
    default: ['name', 'dob', 'email'], // Default fields for each school
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
