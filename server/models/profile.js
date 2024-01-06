const mongoose = require("mongoose");

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://auradelhi:auradelhi@cluster0.ynjc4bl.mongodb.net/RMS_Database";
mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    console.log("Connected Database...");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// db.hostInfo()
// console.log(db);

// "mongodb+srv://auradelhi:auradelhi@cluster0.ynjc4bl.mongodb.net/RMS_Database

const profileDetailsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    default: "",
  },
  photo: {
    type: String, // store the image URL here
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: [String],
  },

  currentDesignation: {
    type: String,
    default: "",
  },
  experience: [
    {
      companyName: {
        type: String,
        default: "",
        // required: true,
      },
      position: {
        type: String,
        default: "",
        // required: true,
      },
      startDate: {
        type: Date,
        default: "",
        // required: true,
      },
      endDate: {
        type: Date,
        default: null,
      },
      currentWorking: {
        type: String,
        default: "",
      },
    },
  ],

  workExperience: {
    years: {
      type: String,
      default: "",
    },
    months: {
      type: String,
      default: "",
    },
  },
  currentCompany: {
    type: String,
    default: "",
  },
  currentCTC: {
    lakhs: {
      type: String,
      default: "",
    },
    thousands: {
      type: String,
      default: "",
    },
  },
  currentCity: {
    type: String,
    default: "",
  },
  expectedCTC: {
    lakhs: {
      type: String,
      default: "",
    },
    thousands: {
      type: String,
      default: "",
    },
  },
  preferredCity: {
    type: String,
    default: "",
  },
  functionalArea: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "",
  },
  industry: {
    type: String,
    default: "",
  },
  keySkills: {
    type: [String],
  },
  selectedRequirements: {
    type: [String],
  },
  comment: {
    type: [String],
  },
  candidateStatus: {
    type: [String],
    default: "Applied",
  },
  resume: {
    type: String,
    default: " ",
  },
  rating: {
    type: String,
    default: " ",
  },

  // ..............
  profileSources: {
    type: [Number],
    default: 0,
  },

  projects: [
    {
      projectName: {
        type: String,
        default: " ",
      },
      description: {
        type: String,
        default: " ",
      },
      projectUrl: {
        type: String,
        default: " ",
      },
    },
  ],
  course: {
    type: String,
    default: "",
  },

  noticePeriod: {
    type: String,
    default: "",
  },

  academicsEducation: [
    {
      collegeName: {
        type: String,
        default: " ",
      },
      course: {
        type: String,
        default: " ",
      },
      city: {
        type: String,
        default: " ",
      },
      startDate: {
        type: Date,
        default: null,
      },
      endDate: {
        type: Date,
        default: null,
      },
    },
  ],

  qualification: {
    type: String,
    default: "",
  },

  previousCompany: {
    type: String,
    default: "",
  },
  previousDesignation: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  additionalDetails: {
    resumeProcessedBy: {
      type: String,
      enum: ["Anyone", "Me", "Specific"],
      default: "Anyone",
    },
    starRating: {
      type: Number,
      default: 0,
    },
  },

  affirmativeDetails: {
    category: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    specialAbilities: {
      type: Boolean,
      default: false,
    },
    maritalStatus: {
      type: String,
      default: "",
    },
  },
  address: {
    type: String,
  },
  workAuthorization: {
    usWorkStatus: {
      type: String,
      default: "",
    },
    countries: {
      type: String,
      default: "",
    },
  },
  desiredJobDetails: {
    jobType: {
      type: String,
      default: "",
    },
    employmentStatus: {
      type: String,
      default: "",
    },
  },

  showOnlyWith: {
    verifiedMobile: {
      type: Boolean,
      default: false,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    attachedResume: {
      type: Boolean,
      default: false,
    },
    premiumResume: {
      type: Boolean,
      default: false,
    },
  },
  multipleDocuments: [],
  appliedDate: {
    type: Date,
    default: new Date(),
  },
  lastActive: {
    type: Date,
    default: new Date(),
  },
  joiningDate: {
    type: Date,
    default: null,
  },

  lastModified: {
    type: Date,
    default: new Date(),
  },
});

const Profile = mongoose.model("Profile", profileDetailsSchema);

module.exports = Profile;
