<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Use POST to add an item."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "A valid JSON request is required."]);
    exit;
}

$_POST = [
    "user_id" => $data["user_id"] ?? 1,
    "item_name" => $data["item_name"] ?? $data["name"] ?? "",
    "category" => $data["category"] ?? "",
    "price" => $data["price"] ?? "",
    "rent_price" => $data["rent_price"] ?? "",
    "location" => $data["location"] ?? "",
    "description" => $data["description"] ?? "",
    "image" => $data["image"] ?? ""
];

require __DIR__ . "/add_item.php";
?>
