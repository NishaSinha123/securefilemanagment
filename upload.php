<?php
session_start();
include "db.php";

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized access!"]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["file"])) {
    $user_id = $_SESSION["user_id"];
    $file_name = basename($_FILES["file"]["name"]);
    $target_dir = "uploads/";
    $target_file = $target_dir . time() . "_" . $file_name;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $sql = "INSERT INTO files (user_id, filename, filepath) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iss", $user_id, $file_name, $target_file);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "File uploaded successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database error"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "File upload failed"]);
    }
}

$conn->close();
?>
