const map = L.map("map").setView([20.5937, 78.9629], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    map.setView([lat, lng], 14);

    const userMarker = L.marker([lat, lng]).addTo(map);
    userMarker.bindPopup("You are here").openPopup();

    document.getElementById("notice").textContent =
      "Showing collection points near you";

    const collectionPoints = [
      { name: "GreenCycle Center", lat: lat + 0.002, lng: lng + 0.002 },
      { name: "EcoDrop Zone", lat: lat - 0.003, lng: lng + 0.001 },
      { name: "Urban Waste Hub", lat: lat + 0.001, lng: lng - 0.002 },
    ];

    collectionPoints.forEach((point) => {
      const marker = L.marker([point.lat, point.lng]).addTo(map);
      marker.bindPopup(`<b>${point.name}</b>`);
    });
  },
  (error) => {
    document.getElementById("notice").textContent =
      "Location access denied. Showing default map.";
  }
);
