<?php
include 'db.php';

$email = $_POST['email'];
$password = $_POST['password'];

if (!$email || !$password) {
    die("Email and password are required");
}

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "status" => "success",
            "user" => $user
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Incorrect password"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
}
?>
