<?php
include 'db.php';

$buyer_id = $_POST['buyer_id'];
$item_id  = $_POST['item_id'];

if (!$buyer_id || !$item_id) {
    die("Missing buyer_id or item_id");
}

$order_date = date("Y-m-d H:i:s");

// Insert into orders table
$stmt = $conn->prepare("INSERT INTO orders (buyer_id, item_id, order_date) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $buyer_id, $item_id, $order_date);

if ($stmt->execute()) {
    // Update item status
    $conn->query("UPDATE items SET status='sold' WHERE id=$item_id");

    echo "Buy successful";
} else {
    echo "Error: " . $conn->error;
}
?>
