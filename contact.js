document.getElementById("sendBtn").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email.");
    return;
  }
  document.getElementById("name").disabled = true;
  document.getElementById("email").disabled = true;
  document.getElementById("message").disabled = true;
  document.getElementById("sendBtn").disabled = true;
  document.getElementById("loading-message").style.display = "flex";
  emailjs.send("service_e9e08iu", "template_h4fkzec", {
    name: name,
    email: email,
    message: message,
  }).then(function () {
    document.getElementById("loading-message").style.display = "none";
    document.getElementById("success-message").style.display = "flex";
    setTimeout(() => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";

      document.getElementById("name").disabled = false;
      document.getElementById("email").disabled = false;
      document.getElementById("message").disabled = false;
      document.getElementById("sendBtn").disabled = false;

      document.getElementById("success-message").style.display = "none";
    }, 4000);
  }, function (error) {
    document.getElementById("loading-message").style.display = "none";
    alert("Failed to send message. Please try again later.");
    console.error("EmailJS Error:", error);
  });
});
