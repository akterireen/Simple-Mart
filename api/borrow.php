<?php
include 'db.php';

$borrower_id = $_POST['borrower_id'];
$item_id     = $_POST['item_id'];

if (!$borrower_id || !$item_id) {
    die("Missing borrower_id or item_id");
}

$borrow_date = date("Y-m-d H:i:s");

// Insert into borrows table
$stmt = $conn->prepare("INSERT INTO borrows (borrower_id, item_id, borrow_date) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $borrower_id, $item_id, $borrow_date);

if ($stmt->execute()) {
    // Update item status
    $conn->query("UPDATE items SET status='borrowed' WHERE id=$item_id");

    echo "Borrow successful";
} else {
    echo "Error: " . $conn->error;
}
?>
