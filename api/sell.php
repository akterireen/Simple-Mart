<?php
require 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query('SELECT * FROM items WHERE status = "available"');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}
