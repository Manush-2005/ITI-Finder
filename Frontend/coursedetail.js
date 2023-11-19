const loader = document.querySelector("#preloader");
loader.style.display = "block";

const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("id");

console.log(courseId);

axios.get(`http://localhost:3000/getITIcourse/${courseId}`).then((res) => {
  const reqcourse = res.data.reqcourse;
  console.log(reqcourse);

  document.getElementById("courseName").textContent = reqcourse.name;
  document.getElementById("courseImage").src = reqcourse.imageofcourse;
  document.getElementById("courseDescription").textContent =
    reqcourse.Description;
  document.getElementById("courseSyllabus").textContent = reqcourse.Syllabus;
  document.getElementById("courseQualification").textContent =
    reqcourse.MinimumQualificationEligibility;
  document.getElementById("courseDuration").textContent = reqcourse.Duration;
  document.getElementById("courseType").textContent = reqcourse.TradeType;
  document.getElementById("courseOpportunities").textContent =
    reqcourse.oppurtunities;
  document.getElementById("courseFees").textContent = reqcourse.fees;
  document.getElementById("courseITI").textContent = reqcourse.ITI;
  document.getElementById("courseSalary").textContent =
    reqcourse.SalaryExpecation;

  loader.style.display = "none";
});
