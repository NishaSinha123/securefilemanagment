<?php
session_start();
include "db.php";

if (!isset($_SESSION['user_id'])) {
    die(json_encode(["status" => "error", "message" => "Unauthorized"]));
}

$user_id = $_SESSION['user_id'];
$file_id = $_POST['file_id'];

$stmt = $conn->prepare("SELECT filepath FROM files WHERE id = ? AND user_id = ?");
$stmt->bind_param("ii", $file_id, $user_id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($filepath);
$stmt->fetch();

if ($filepath && unlink($filepath)) {
    $conn->query("DELETE FROM files WHERE id = $file_id");
    echo json_encode(["status" => "success", "message" => "File deleted"]);
} else {
    echo json_encode(["status" => "error", "message" => "File not found"]);
}
?>
