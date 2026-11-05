<?php
header("Content-Type: application/json");
include 'db.php';

$user_id = $_GET['user_id'];

$sql = "SELECT rents.*, items.item_name, items.rent_price 
        FROM rents 
        JOIN items ON rents.item_id = items.id
        WHERE rents.renter_id = $user_id";

$result = $conn->query($sql);

$list = [];
while ($row = $result->fetch_assoc()) {
    $list[] = $row;
}

echo json_encode($list);
?>
