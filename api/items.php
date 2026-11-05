<?php
require 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query('SELECT * FROM items ORDER BY item_id DESC');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $stmt = $pdo->prepare(
        'INSERT INTO items (user_id, category, mode, buy_price, hourly_price, daily_price, weekly_price, description, photos, location, status)
         VALUES (:user_id, :category, :mode, :buy_price, :hourly_price, :daily_price, :weekly_price, :description, :photos, :location, :status)'
    );

    $stmt->execute([
        ':user_id' => $data['user_id'] ?? 1,
        ':category' => $data['category'] ?? '',
        ':mode' => $data['mode'] ?? 'buy',
        ':buy_price' => $data['buy_price'] ?? 0,
        ':hourly_price' => $data['hourly_price'] ?? 0,
        ':daily_price' => $data['daily_price'] ?? 0,
        ':weekly_price' => $data['weekly_price'] ?? 0,
        ':description' => $data['description'] ?? '',
        ':photos' => $data['photos'] ?? '',
        ':location' => $data['location'] ?? 'Community',
        ':status' => 'available'
    ]);

    echo json_encode(['success' => true, 'message' => 'Item added.']);
    exit;
}
