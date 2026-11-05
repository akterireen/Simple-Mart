document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.target);

  fetch("api/login.php", { method: "POST", body: fd })
    .then(r => r.json())
    .then(d => {
      if (d.status === "success") {
        alert("Logged in");
        location.href = "sell.html"; // or index.html
      } else {
        alert("Login failed: " + d.message);
      }
    });
});
