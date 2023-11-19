// window.addEventListener("load", function () {
//   const loader = document.querySelector("#preloader");
//   loader.className += " hidden"; // add "hidden" class to loader
// });

const loader = document.querySelector("#preloader");
loader.style.display = "block";
// add "hidden" class to loader

async function getcoursenames() {
  const Engineeringcourses = [];
  const nonEngineeringCourses = [];

  const res = await axios.get("http://localhost:3000/getITIcourse");

  const courses = res.data.allcourses;

  courses.forEach((course) => {
    if (course.TradeType === "Engineering") {
      Engineeringcourses.push(course);
    } else {
      nonEngineeringCourses.push(course);
    }
  });

  console.log(Engineeringcourses);

  const Engineering = document.getElementById("engineeringCourses");
  const nonEngineering = document.getElementById("nonEngineeringCourses");

  Engineeringcourses.forEach((Engcourse) => {
    const courseLink = document.createElement("a");
    courseLink.textContent = Engcourse.name;
    courseLink.href = `http://localhost:5500/Frontend/Coursedetail.html?id=${Engcourse._id}`;

    const listItem = document.createElement("li");
    listItem.appendChild(courseLink);

    Engineering.appendChild(listItem);
  });

  nonEngineeringCourses.forEach((nonEngcourse) => {
    const courseLink = document.createElement("a");
    courseLink.textContent = nonEngcourse.name;
    courseLink.href = `http://localhost:5500/Frontend/Coursedetail.html?id=${nonEngcourse._id}`;

    const listItem = document.createElement("li");
    listItem.appendChild(courseLink);

    nonEngineering.appendChild(listItem);
  });

  loader.style.display = "none";
}

getcoursenames();
