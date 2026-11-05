<?php
require 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $stmt = $pdo->prepare(
        'INSERT INTO users (name, community_area, phone, rating, profile_photo) VALUES (:name, :community_area, :phone, :rating, :profile_photo)'
    );

    $stmt->execute([
        ':name' => $data['name'] ?? 'Guest',
        ':community_area' => $data['community_area'] ?? 'Community',
        ':phone' => $data['phone'] ?? '',
        ':rating' => $data['rating'] ?? 0,
        ':profile_photo' => $data['profile_photo'] ?? ''
    ]);

    echo json_encode(['success' => true, 'message' => 'User created.']);
}
