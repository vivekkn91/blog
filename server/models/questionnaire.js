const mongoose = require("mongoose");

// Schema for individual questions
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  mandatory: {
    type: Boolean,
    default: false,
  },
  answerType: {
    type: String,
    enum: ["Radio", "Checkbox", "Custom List", "Text Area"],
    required: true,
  },
  answers: {
    type: [String],
  },
});

// Schema for the questionnaire
const questionnaireSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shared: {
    type: Boolean,
    default: false,
  },
  useExistingQuestionnaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questionnaire",
  },
  questions: {
    type: [questionSchema], //array of questionSchema
    _id: false,
  },
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;
