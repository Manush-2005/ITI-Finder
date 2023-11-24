const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

const SERCET_KEY = "zobime660";

//mongoose schema

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
  websitelink: String,
  admissionon: Boolean,
  courses: [String],
});

//mongoose model

const ITI = mongoose.model("ITI", ITISchema);
const User = mongoose.model("User", UserSchema);

//For  signup
app.post("/signup", async (req, res) => {
  const { name, phoneno, password, city, percentage, board } = req.body;

  const isuser = await User.findOne({ phoneno });

  if (isuser) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const newUser = new User({
      name,
      phoneno,
      password,
      city,
      percentage,
      board,
    });
    await newUser.save();
    const token = jwt.sign({ phoneno }, SERCET_KEY, { expiresIn: "1h" });
    res.status(200).json({ message: "User created", token });
  }
});

// For login
app.post("/login", (req, res) => {
  const { phoneno, password } = req.body;
  const isuser = User.findOne({ phoneno, password });
  const redirecturl = "/homepage.html";

  if (isuser) {
    const token = jwt.sign({ phoneno }, SERCET_KEY, { expiresIn: "1h" });
    res.status(200).json({ message: "User logged in", token, redirecturl });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

app.get("/getrequiredITI", (req, res) => {
  const { city, percentage, knowfor } = req.body;
  const reqITI = ITI.find({ city, percentage, knowfor });

  if (reqITI) {
    res.status(200).send({ message: "REQUIRED ITI", reqITI });
  } else {
    res.status(404).send({ message: "please retry" });
  }
});

app.get("/getrequiredITI:id", (req, res) => {
  const reqITI = ITI.findOne({ city, percentage, knowfor });

  if (reqITI) {
    res.status(200).send({ message: "REQUIRED ITI", reqITI });
  } else {
    res.status(404).send({ message: "please retry" });
  }
});

app.post("/addITI", async (req, res) => {
  const {
    name,
    address,
    phoneno,
    city,
    Cutoffpercentage,
    board,
    knowfor,
    websitelink,
    admissionon,
    courses,
  } = req.body;
  const newiti = new ITI({
    name,
    address,
    phoneno,
    city,
    Cutoffpercentage,
    board,
    knowfor,
    websitelink,
    admissionon,
    courses,
  });
  await newiti.save();
  res.status(200).json({ message: "ITI added" });
});

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/login?retryWrites=true&w=majority"
    )
    .then(console.log("connected to database"));
  console.log("server is started");
});
