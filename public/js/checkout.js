function checkoutItem(itemId) {
  const fd = new FormData();
  fd.append("item_id", itemId);
  fd.append("order_type", "buy"); // change to borrow/rent if needed

  fetch("api/add_order.php", {
    method: "POST",
    body: fd
  })
    .then(r => r.json())
    .then(d => {
      if (d.status === "success") {
        alert("Order placed successfully!");
      } else {
        alert("Error: " + d.message);
      }
    })
    .catch(err => {
      alert("Network error: " + err);
    });
}
