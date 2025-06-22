

const form = document.getElementById("wasteReportForm");
const reportGallery = document.getElementById("reportGallery");
const fileInput = document.getElementById("photo");
const fileChosen = document.getElementById("file-chosen");


fileInput.addEventListener("change", () => {
  fileChosen.textContent = fileInput.files.length > 0
    ? fileInput.files[0].name
    : "No file chosen";
});

window.addEventListener("DOMContentLoaded", () => {
  const reports = JSON.parse(localStorage.getItem("wasteReports") || "[]");
  reports.forEach((report) => addReportCard(report));
});


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = document.getElementById("location").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();
  const photoInput = document.getElementById("photo");

  if (!location || !category || !description) return;

  const reader = new FileReader();

  reader.onload = function () {
    const photoURL = photoInput.files[0] ? reader.result : null;

    const report = {
      location,
      category,
      description,
      photo: photoURL,
      timestamp: new Date().toLocaleString(),
    };

    saveReport(report);
    addReportCard(report);
    form.reset();
    fileChosen.textContent = "No file chosen";
  };

  if (photoInput.files[0]) {
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    reader.onload(); 
  }
});

function saveReport(report) {
  const reports = JSON.parse(localStorage.getItem("wasteReports") || "[]");
  reports.push(report);
  localStorage.setItem("wasteReports", JSON.stringify(reports));
}

function deleteReport(toDelete) {
  let reports = JSON.parse(localStorage.getItem("wasteReports") || "[]");

  reports = reports.filter((report) => {
    return !(
      report.location === toDelete.location &&
      report.category === toDelete.category &&
      report.description === toDelete.description &&
      report.timestamp === toDelete.timestamp
    );
  });

  localStorage.setItem("wasteReports", JSON.stringify(reports));
}

function addReportCard({ location, category, description, photo, timestamp }) {
  const card = document.createElement("div");
  card.className = "report-card";

  card.innerHTML = `
    <h3>${location}</h3>
    <p><strong>Category:</strong> ${category}</p>
    <p>${description}</p>
    <p><em>${timestamp}</em></p>
    ${photo ? `<img class="report-photo" src="${photo}" alt="Reported Image" />` : ""}
    <button class="delete-btn">Delete</button>
  `;

  const deleteBtn = card.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteReport({ location, category, description, timestamp });
    card.remove();
  });

  reportGallery.prepend(card);
}
