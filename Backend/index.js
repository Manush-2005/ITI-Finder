const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const {
  Signupfunction,
  Loginfunction,
  AddITI,
  GetITIs,
  AddITIDetail,
  getitidetails,
  AddITIcourse,
  GETITIcourses,
  getiticourse,
  recommedITI,
} = require("./Controllers");
const formidable = require("express-formidable");
// app.use(formidable());
app.use(cors());
app.use(express.json());

//For  signup
app.post("/signup", Signupfunction);

// For login
app.post("/login", Loginfunction);

// Route to get all ITIs
app.get("/getrequiredITI", GetITIs);

app.get("/getrequiredITI:id", (req, res) => {
  const reqITI = ITI.findOne({ city, percentage, knowfor });

  if (reqITI) {
    res.status(200).send({ message: "REQUIRED ITI", reqITI });
  } else {
    res.status(404).send({ message: "please retry" });
  }
});

// Route to add ITI
app.post("/addITI", formidable(), AddITI);

// app.post("/reqITI", formidable(), reqITI);

app.post("/addITIDetail", formidable(), AddITIDetail);

app.get("/itis/:id", getitidetails);

app.post("/addITIcourse", formidable(), AddITIcourse);

app.get("/getITIcourse", GETITIcourses);

app.get("/getITIcourse/:id", getiticourse);

app.post("/recommedITI", recommedITI);

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://zobime660:manush2005@cluster0.dxrqqdn.mongodb.net/login?retryWrites=true&w=majority"
    )
    .then(console.log("connected to database"));
  console.log("server is started");
});
