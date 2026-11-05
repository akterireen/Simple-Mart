<?php
header("Content-Type: application/json");
include 'db.php';

$user_id = $_GET['user_id'];

if (!$user_id) {
    die("Missing user_id");
}

$user = $conn->query("SELECT * FROM users WHERE id=$user_id")->fetch_assoc();
$items = $conn->query("SELECT * FROM items WHERE user_id=$user_id");

$list = [];
while ($row = $items->fetch_assoc()) {
    $list[] = $row;
}

echo json_encode([
    "user" => $user,
    "items" => $list
]);
?>