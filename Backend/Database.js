const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  phoneno: Number,
  password: String,
  city: String,
  percentage: Number,
  board: String,
});

const ITISchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneno: Number,
  city: String,
  Cutoffpercentage: Number,
  board: String,
  knowfor: String,
  email: String,

  courses: [String],
  fees: Number,

  imagePath: String,
});

const ITIDetailSchema = new mongoose.Schema({
  name: String,
  address: String,
  phoneno: Number,
  city: String,
  board: String,
  faculty: String,

  email: String,
  orginalITI: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ITI",
  },

  courses: [String],
  code: String,
  Applicationforminfo: String,
  CounsellingProcess: String,
  Placementcompanies: [String],
  Dateofestablishment: String,
  imagePath: String,
});

const ITIcourses = new mongoose.Schema({
  name: String,
  Syllabus: String,
  MinimumQualificationEligibility: String,
  Duration: String,
  TradeType: String,
  Description: String,
  oppurtunities: [String],
  imageofcourse: String,
  fees: Number,
  SalaryExpecation: String,
  ITI: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ITI",
  },
});

//mongoose model

const ITI = mongoose.model("ITI", ITISchema);

const User = mongoose.model("User", UserSchema);

const ITIDetail = mongoose.model("ITIDetail", ITIDetailSchema);

const ITIcourse = mongoose.model("ITIcourses", ITIcourses);

module.exports = { ITI, User, ITIDetail, ITIcourse };
