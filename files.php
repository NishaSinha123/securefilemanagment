<?php
session_start();
include "db.php";

if (!isset($_SESSION['user_id'])) {
    die(json_encode(["status" => "error", "message" => "Unauthorized"]));
}

$user_id = $_SESSION['user_id'];
$result = $conn->query("SELECT id, filename FROM files WHERE user_id = $user_id");

$files = [];
while ($row = $result->fetch_assoc()) {
    $files[] = $row;
}

echo json_encode(["status" => "success", "files" => $files]);
?>
