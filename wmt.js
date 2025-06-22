const form = document.getElementById("wasteForm");
const logList = document.getElementById("wasteLogs");
const ctx = document.getElementById("wasteChart").getContext("2d");

let wasteData = {
  Plastic: 0,
  MixedWaste: 0,
  Organic: 0,
  Inorganic: 0,
  EWaste: 0,
  SolidWaste: 0,
  LiquidWaste: 0,
  Other: 0
};

let logs = JSON.parse(localStorage.getItem("simpleWasteLogs") || "[]");
logs.forEach(log => {
  addLogCard(log);
  wasteData.Plastic += log.plastic;
  wasteData.MixedWaste += log.mixedwaste;
  wasteData.Organic += log.organic;
  wasteData.Inorganic += log.inorganic;
  wasteData.EWaste += log.ewaste;
  wasteData.SolidWaste += log.solidwaste;
  wasteData.LiquidWaste += log.liquidwaste;
  wasteData.Other += log.other;
});

let chart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: Object.keys(wasteData),
    datasets: [{
      label: "Waste Data",
      data: Object.values(wasteData),
      backgroundColor: [
        "#17a100",
        "#66bb6a",
        "#a5d6a7",
        "#4caf50",
        "#81c784",
        "#aed581",
        "#dcedc8",
        "#c8e6c9"
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "bottom" }
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const plastic = parseInt(document.getElementById("plastic").value) || 0;
  const mixedwaste = parseInt(document.getElementById("mixed-waste").value) || 0;
  const organic = parseInt(document.getElementById("organic").value) || 0;
  const inorganic = parseInt(document.getElementById("inorganic").value) || 0;
  const ewaste = parseInt(document.getElementById("ewaste").value) || 0;
  const solidwaste = parseInt(document.getElementById("solid-waste").value) || 0;
  const liquidwaste = parseInt(document.getElementById("liquid-waste").value) || 0;
  const other = parseInt(document.getElementById("other").value) || 0;

  if (!date) return;

  const log = { date, plastic, mixedwaste, organic, inorganic, ewaste, solidwaste, liquidwaste, other };
  logs.push(log);
  localStorage.setItem("simpleWasteLogs", JSON.stringify(logs));

  wasteData.Plastic += plastic;
  wasteData.MixedWaste += mixedwaste;
  wasteData.Organic += organic;
  wasteData.Inorganic += inorganic;
  wasteData.EWaste += ewaste;
  wasteData.SolidWaste += solidwaste;
  wasteData.LiquidWaste += liquidwaste;
  wasteData.Other += other;

  chart.data.datasets[0].data = Object.values(wasteData);
  chart.update();

  addLogCard(log);
  form.reset();
});

function addLogCard({ date, plastic, mixedwaste, organic, inorganic, ewaste, solidwaste, liquidwaste, other }) {
  const card = document.createElement("div");
  card.className = "log-card";
  card.innerHTML = `
    <h3>${date}</h3>
    <p>Plastic: ${plastic}g</p>
    <p>Mixed-Waste: ${mixedwaste}g</p>
    <p>Organic: ${organic}g</p>
    <p>Inorganic: ${inorganic}g</p>
    <p>E-Waste: ${ewaste} item(s)</p>
    <p>Solid-Waste: ${solidwaste}g</p>
    <p>Liquid-Waste: ${liquidwaste}ml</p>
    <p>Other: ${other}g</p>
  `;
  logList.prepend(card);
}

const clearBtn = document.getElementById("clearLogsBtn");

clearBtn.addEventListener("click", () => {
  if (!confirm("Are you sure you want to clear all logs?")) return;

  localStorage.removeItem("simpleWasteLogs");
  logList.innerHTML = "";

  for (let key in wasteData) {
    wasteData[key] = 0;
  }

  chart.data.datasets[0].data = Object.values(wasteData);
  chart.update();

  logs = [];
});
