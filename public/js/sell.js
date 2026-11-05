document.getElementById("add-item-form").addEventListener("submit", e => {
  e.preventDefault();

  const fd = new FormData(e.target); // includes photo file

  fetch("api/add_item.php", {
    method: "POST",
    body: fd
  })
    .then(r => r.json())
    .then(d => {
      if (d.status === "success") {
        alert("Item added successfully with photo!");
      } else {
        alert("Error: " + d.message);
      }
    });
});
