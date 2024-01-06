const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  employerName: {
    type: String,
    required: true,
  },
  employerDescription: {
    type: String,
    required: true,
  },
  addedOrUpdatedOn: {
    type: String,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Assuming you have a User schema for user authentication
    required: true, 
  },
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
