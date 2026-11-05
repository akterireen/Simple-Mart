<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "simplemart");

$id = (int)$_GET["id"];

$conn->query("UPDATE products SET status='Approved' WHERE id=$id");

echo json_encode(["status" => "approved"]);
