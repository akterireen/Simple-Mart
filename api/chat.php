<?php
require 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query('SELECT * FROM chat ORDER BY timestamp ASC');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $stmt = $pdo->prepare(
        'INSERT INTO chat (sender_id, receiver_id, message, timestamp) VALUES (:sender_id, :receiver_id, :message, NOW())'
    );

    $stmt->execute([
        ':sender_id' => $data['sender_id'] ?? 1,
        ':receiver_id' => $data['receiver_id'] ?? 2,
        ':message' => $data['message'] ?? ''
    ]);

    echo json_encode(['success' => true, 'message' => 'Chat sent.']);
}
