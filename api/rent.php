<?php
include 'db.php';

$renter_id = $_POST['renter_id'];
$item_id   = $_POST['item_id'];

if (!$renter_id || !$item_id) {
    die("Missing renter_id or item_id");
}

$rent_date = date("Y-m-d H:i:s");

// Insert into rents table
$stmt = $conn->prepare("INSERT INTO rents (renter_id, item_id, rent_date) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $renter_id, $item_id, $rent_date);

if ($stmt->execute()) {
    // Update item status
    $conn->query("UPDATE items SET status='rented' WHERE id=$item_id");

    echo "Rent successful";
} else {
    echo "Error: " . $conn->error;
}
?>

