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
    respond(405, "Use POST to return an item.");
}

$userId = filter_var($_POST["user_id"] ?? null, FILTER_VALIDATE_INT);
$itemId = filter_var($_POST["item_id"] ?? null, FILTER_VALIDATE_INT);

if (!$userId || !$itemId || $userId < 1 || $itemId < 1) {
    respond(400, "A valid user and item are required.");
}

try {
    $conn->begin_transaction();

    $stmt = $conn->prepare(
        "SELECT request_id FROM borrow_requests
         WHERE borrower_id = ? AND item_id = ? AND approved = 1 AND return_status = 'pending'
         ORDER BY request_id DESC LIMIT 1 FOR UPDATE"
    );
    $stmt->bind_param("ii", $userId, $itemId);
    $stmt->execute();
    $request = $stmt->get_result()->fetch_assoc();

    if (!$request) {
        $conn->rollback();
        respond(404, "No active approved borrow was found for this item.");
    }

    $requestId = (int)$request["request_id"];
    $updateRequest = $conn->prepare(
        "UPDATE borrow_requests SET return_status = 'returned' WHERE request_id = ?"
    );
    $updateRequest->bind_param("i", $requestId);
    $updateRequest->execute();

    $updateItem = $conn->prepare("UPDATE items SET status = 'available' WHERE item_id = ?");
    $updateItem->bind_param("i", $itemId);
    $updateItem->execute();

    $conn->commit();
    respond(200, "Return successful.");
} catch (mysqli_sql_exception $e) {
    $conn->rollback();
    error_log("Item return failed: " . $e->getMessage());
    respond(500, "The item could not be returned. Please try again.");
}
?>
