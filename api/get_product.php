<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "simplemart");

$result = $conn->query("SELECT * FROM products ORDER BY id DESC");

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
