<?php
header("Content-Type: application/json");
require "db.php";

$userId = filter_var($_GET["user_id"] ?? null, FILTER_VALIDATE_INT);
if (!$userId || $userId < 1) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "A valid user is required."]);
    exit;
}

try {
    $stmt = $conn->prepare(
        "SELECT br.request_id, br.item_id, i.item_name
         FROM borrow_requests br
         INNER JOIN items i ON i.item_id = br.item_id
         WHERE br.borrower_id = ? AND br.approved = 1 AND br.return_status = 'pending'
         ORDER BY br.request_id DESC"
    );
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    echo json_encode($items);
} catch (mysqli_sql_exception $e) {
    error_log("Borrow history lookup failed: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Borrow history could not be loaded."]);
}
?>
