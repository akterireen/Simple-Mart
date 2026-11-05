<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "simplemart");

$id = (int)$_GET["id"];

$conn->query("DELETE FROM products WHERE id=$id");

echo json_encode(["status" => "deleted"]);
