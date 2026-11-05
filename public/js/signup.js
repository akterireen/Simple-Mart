document.getElementById("signup-form").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.target);

  fetch("api/signup.php", { method: "POST", body: fd })
    .then(r => r.json())
    .then(d => {
      if (d.status === "success") {
        alert("Signup successful");
        location.href = "login.html";
      } else {
        alert("Error: " + d.message);
      }
    });
});
