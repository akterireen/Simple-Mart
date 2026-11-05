<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "simplemart");

$data = json_decode(file_get_contents("php://input"), true);

$id = (int)$data["id"];
$name = $conn->real_escape_string($data["name"]);
$price = (int)$data["price"];
$category = $conn->real_escape_string($data["category"]);
$description = $conn->real_escape_string($data["description"]);
$image = $conn->real_escape_string($data["image"]);

$sql = "UPDATE products
        SET name='$name', price=$price, category='$category', description='$description', image='$image'
        WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}
