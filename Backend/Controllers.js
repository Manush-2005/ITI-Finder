const { User, ITI, ITIDetail, ITIcourse } = require("./Database");

const Signupfunction = async (req, res) => {
  const { name, phoneno, password, city, percentage } = req.body;

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
    });
    await newUser.save();

    res.status(200).json({ message: "User created" });
  }
};

const Loginfunction = async (req, res) => {
  const { phoneno, password } = req.body;
  const isuser = await User.findOne({ phoneno: phoneno, password: password });
  const redirecturl = "/homepage.html";

  if (isuser) {
    res.status(200).json({ message: "User logged in", redirecturl });
  } else {
    res.status(400).json({ message: "I AM THE ONE" });
  }
};

const AddITI = async (req, res) => {
  const {
    name,
    address,
    phoneno,
    city,
    Cutoffpercentage,
    board,
    knowfor,
    email,

    courses,
    fees,

    imagePath,
  } = req.fields;
  const newiti = new ITI({
    name,
    address,
    phoneno,
    city,
    Cutoffpercentage,
    board,
    knowfor,
    email,

    courses,
    fees,

    imagePath,
  });
  await newiti.save();
  res.status(200).json({ message: "ITI added" });
};

const GetITIs = async (req, res) => {
  const allitis = await ITI.find({});
  res.status(200).json({ message: "All ITIs", allitis });
};

const AddITIDetail = async (req, res) => {
  const {
    name,
    address,
    phoneno,
    city,
    board,
    faculty,

    email,
    orginalITI,

    courses,
    code,
    Applicationforminfo,
    CounsellingProcess,
    Placementcompanies,
    Dateofestablishment,
    imagePath,
  } = req.fields;

  const newitidetail = new ITIDetail({
    name,
    address,
    phoneno,
    city,
    board,
    faculty,

    email,
    orginalITI,

    courses,
    code,
    Applicationforminfo,
    CounsellingProcess,
    Placementcompanies,
    Dateofestablishment,
    imagePath,
  });

  await newitidetail.save();
  res.status(200).json({ message: "ITI detail added" });
};

const getitidetails = async (req, res) => {
  try {
    const orginalITI = req.params.id;
    const itidetail = await ITIDetail.findOne({ orginalITI: orginalITI });

    if (itidetail) {
      res.status(200).send({ itidetail });
    } else {
      res.status(404).send("ITI not found");
    }
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

// Routes for courses

const AddITIcourse = async (req, res) => {
  const {
    name,
    Syllabus,
    MinimumQualificationEligibility,
    Duration,
    TradeType,
    Description,
    oppurtunities,
    imageofcourse,
    fees,
    SalaryExpecation,
    ITI,
  } = req.fields;

  if (!name) {
    res.status(400).json({ message: "Please enter name of course" });
  }

  const newcourse = new ITIcourse({
    name,
    Syllabus,
    MinimumQualificationEligibility,
    Duration,
    TradeType,
    Description,
    oppurtunities,
    imageofcourse,
    fees,
    SalaryExpecation,
    ITI,
  });
  await newcourse.save();
  res.status(200).json({ message: "Course added" });
};

const GETITIcourses = async (req, res) => {
  const allcourses = await ITIcourse.find({});
  res.status(200).json({ message: "All courses", allcourses });
};

const getiticourse = async (req, res) => {
  try {
    const id = req.params.id;
    const reqcourse = await ITIcourse.findOne({ _id: id });

    if (reqcourse) {
      res.status(200).send({ message: "REQUIRED COURSE", reqcourse });
    } else {
      res.status(404).send({ message: "please retry" });
    }
  } catch (error) {
    res.status(404).send({ message: "please retry server error" });
  }
};

const recommedITI = async (req, res) => {
  const { reqcity, percentage } = req.body;

  const foundITI = await ITI.find({
    city: reqcity,
    Cutoffpercentage: { $lte: percentage },
  });

  if (foundITI) {
    res.status(200).json({ message: "ITI found", foundITI });
  } else {
    res.status(404).json({ message: "ITI not found" });
  }
};

module.exports = {
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
};
