<?php
header("Content-Type: application/json");
require "db.php";

function respond(int $status, string $message): void
{
    http_response_code($status);
    echo json_encode(["status" => $status < 400 ? "success" : "error", "message" => $message]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond(405, "Use POST to add an item.");
}

$userId = filter_var($_POST["user_id"] ?? null, FILTER_VALIDATE_INT);
$itemName = trim($_POST["item_name"] ?? "");
$category = trim($_POST["category"] ?? "");
$location = trim($_POST["location"] ?? "");
$description = trim($_POST["description"] ?? "");
$image = trim($_POST["image"] ?? "");
$buyPrice = ($_POST["price"] ?? "") === "" ? 0 : filter_var($_POST["price"], FILTER_VALIDATE_INT);
$rentPrice = ($_POST["rent_price"] ?? "") === "" ? 0 : filter_var($_POST["rent_price"], FILTER_VALIDATE_INT);

if (!$userId || $userId < 1 || $itemName === "" || $category === "") {
    respond(400, "Please provide a valid user, item name, and category.");
}

if (mb_strlen($itemName) > 150 || mb_strlen($category) > 50 || mb_strlen($location) > 100) {
    respond(400, "One or more item fields are too long.");
}

if ($buyPrice === false || $rentPrice === false || $buyPrice < 0 || $rentPrice < 0) {
    respond(400, "Prices must be non-negative whole numbers.");
}

if ($buyPrice === 0 && $rentPrice === 0) {
    respond(400, "Enter a purchase price or a rental price.");
}

$mode = $buyPrice > 0 && $rentPrice > 0 ? "both" : ($rentPrice > 0 ? "borrow" : "buy");

try {
    $stmt = $conn->prepare(
        "INSERT INTO items
         (item_name, user_id, category, mode, buy_price, daily_price, description, photos, location, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'available')"
    );
    $stmt->bind_param(
        "sissiisss",
        $itemName,
        $userId,
        $category,
        $mode,
        $buyPrice,
        $rentPrice,
        $description,
        $image,
        $location
    );
    $stmt->execute();

    respond(201, "Item added successfully.");
} catch (mysqli_sql_exception $e) {
    error_log("Item creation failed: " . $e->getMessage());
    respond(500, "The item could not be saved. Please try again.");
}
?>
