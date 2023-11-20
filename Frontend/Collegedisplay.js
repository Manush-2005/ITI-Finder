// Assume this data comes from the backend

// const renderinfoiti = require("./Collegedetail");

// async function renderitis() {
//   var ITIS = [];

//   await fetch("http://localhost:3000/getrequiredITI")
//     .then((res) => res.json())
//     .then((data) => (ITIS = ITIS.push(data.allitis)));

// }
// renderitis();

// This function creates a card for a colle to add the cards
// addCards();

const loader = document.querySelector("#preloader");
loader.style.display = "block";

const RENDERITIPAGE = async () => {
  var ITIS = [];
  const getAllITIs = async () => {
    const response = await axios.get("http://localhost:3000/getrequiredITI");
    ITIS = response.data.allitis;
  };

  await getAllITIs();
  console.log(ITIS);

  const city = document.getElementById("city");

  city.addEventListener("change", () => {
    const value = city.value;
    const filteredITIS = ITIS.filter((ITI) => ITI.city === value);
    console.log(filteredITIS);
    renderCards(filteredITIS);
  });

  function renderCards(ITIU) {
    const container = document.getElementById("card-container");
    container.innerHTML = "";
    ITIU.forEach((ITI) => {
      const card = createCard(ITI);
      container.appendChild(card);
    });
  }
  function createCard(ITI) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = ITI.imagePath;
    console.log(ITI.imagePath);
    img.alt = ITI.name + " Image";
    img.className = "card-img";
    card.appendChild(img);

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = ITI.name;
    card.appendChild(title);

    const city = document.createElement("p");
    city.className = "card-text";
    city.textContent = "City: " + ITI.city;
    card.appendChild(city);

    const btn = document.createElement("a");
    // btn.href = "#"; // Replace with the actual link
    btn.className = "btn";
    btn.textContent = "Learn More";
    btn.addEventListener("click", () => {
      const ITIid = ITI._id;
      // window.location.href = `http://localhost:5500/Collegedetail.html?id=${ITI._id}`;
      window.location.href = `http://localhost:5500/Frontend/Collegedetail.html?id=${ITIid}`;
    });
    card.appendChild(btn);

    return card;
  }

  loader.style.display = "none";
};

RENDERITIPAGE();
