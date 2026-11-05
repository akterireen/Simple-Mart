<?php
header("Content-Type: application/json");
include 'db.php';

$user_id = $_GET['user_id'];

$sql = "SELECT orders.*, items.item_name, items.price 
        FROM orders 
        JOIN items ON orders.item_id = items.id
        WHERE orders.buyer_id = $user_id";

$result = $conn->query($sql);

$list = [];
while ($row = $result->fetch_assoc()) {
    $list[] = $row;
}

echo json_encode($list);
?>
