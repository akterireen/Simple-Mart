<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true) ?? [];
$action = $data['action'] ?? 'login';

$users = [
    [
        'id' => 1,
        'name' => 'Demo User',
        'email' => 'demo@example.com',
        'password' => '123456',
        'community_area' => 'North Block'
    ]
];

if ($action === 'register') {
    $email = $data['email'] ?? '';
    $name = $data['name'] ?? 'New User';
    $password = $data['password'] ?? '';
    $community = $data['community_area'] ?? 'Community';

    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email and password are required.']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Registration successful.',
        'user' => [
            'id' => time(),
            'name' => $name,
            'email' => $email,
            'community_area' => $community
        ]
    ]);
    exit;
}

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

foreach ($users as $user) {
    if ($user['email'] === $email && $user['password'] === $password) {
        echo json_encode([
            'success' => true,
            'message' => 'Login successful.',
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'community_area' => $user['community_area']
            ]
        ]);
        exit;
    }
}

http_response_code(401);
echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
