const loader = document.querySelector("#preloader");
loader.style.display = "block";

const urlParams = new URLSearchParams(window.location.search);
const ITIid = urlParams.get("id");
console.log(ITIid);

async function renderinfoiti(ITIid) {
  var res = await axios.get(
    // "http://localhost:3000/itis/65559672090db99019711289"
    `http://localhost:3000/itis/${ITIid}`
  );

  let reqiti = res.data.itidetail;
  console.log(reqiti.name);
  console.log(ITIid);

  document.getElementById("collegeName").textContent = reqiti.name;
  document.getElementById("address").textContent = reqiti.address;
  document.getElementById("collegeImage").src = reqiti.imagePath;
  document.getElementById("city").textContent = reqiti.city;
  document.getElementById("phone").textContent = reqiti.phone;
  document.getElementById("code").textContent = reqiti.code;
  document.getElementById("applicationInfo").textContent =
    reqiti.Applicationforminfo;
  document.getElementById("counselingProcess").textContent =
    reqiti.CounsellingProcess;
  document.getElementById("board").textContent = reqiti.board;
  document.getElementById("placementCompanies").textContent =
    reqiti.Placementcompanies;
  document.getElementById("establishmentDate").textContent =
    reqiti.Dateofestablishment;
  document.getElementById("facultyList").textContent = reqiti.faculty;
  document.getElementById("courses").textContent = reqiti.courses;
  loader.style.display = "none";
}

// Call the function with the ID
renderinfoiti(ITIid);
