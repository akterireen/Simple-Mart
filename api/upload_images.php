<?php
include 'db.php';

if (!isset($_FILES['photos'])) {
    echo json_encode(["status" => "error", "message" => "No file uploaded"]);
    exit;
}

$targetDir = "../uploads/";
@mkdir($targetDir, 0777, true);

$filename = time() . "_" . basename($_FILES["photos"]["name"]);
$targetFile = $targetDir . $filename;

if (move_uploaded_file($_FILES["photos"]["tmp_name"], $targetFile)) {
    echo json_encode([
        "status" => "success",
        "path" => "uploads/" . $filename
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Upload failed"]);
}
?>
