const mongoose = require('mongoose');
const { string } = require('rtf-parser');



const cvSchema = new mongoose.Schema({
  name: String,
  email:String,
  DOB:String, 
  phoneNumber: [String],
  // companyNames: [String],
  designation: String,
  education: [String],
  experience :[String],
  skills :[String]

  
});

const Cvs = mongoose.model('CV', cvSchema);

module.exports = Cvs;
