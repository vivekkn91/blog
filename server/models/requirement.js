const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema({
  requirementTitle: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  SelectFromPreviousRequirements:{
    type: String,
    required: true,
    default:""
  },
  employmentType: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  desiredCandidateDescription: {
    type: String,    
    default:''


  },
  annualCTC: {
    type: Number,
    default:0
  },
  minSalary: {
    type: Number,
    default:0
  },
  maxSalary: {
    type: Number,
    default:0
  },
  minWorkExperience: {
    type: Number,
    default:0
  },
  maxWorkExperience: {
    type: Number,
    default:0
  },
  keywords: {
    type: [String],
  },
  jobLocations: {
    type: [String],
  },
  visibility: {
    type: String,
    enum: ["Only me", "Everyone"],
    default: "Only me",
  },
  vacancies: {
    type: Number,
    default: 0,
  },
  addToNaukri: {
    type: Boolean,
    default: false,
  },
  educationalQualification: {
    type: String,
    default:''
  },
  
  jobCategorization: {
    industry: {
      type: String,
      // required:true,
      default:""

    },
    functionalArea: {
      type: String,
      default:''

    },
  },

  contactDetails: {
    contactPerson: {
      type: String,
      required:true
    },
    contactPersonPhone: {
      type: String,
      required:true

    },
    companyWebsite: {
      type: String,
      required:true
    },
    companyName: {
      type: String,
      required:true 
    },
    aboutCompany: {
      type: String,
      required:true
    },
  },
});

const Requirement = mongoose.model("Requirement", requirementSchema);

module.exports = Requirement;
