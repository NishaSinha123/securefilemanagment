<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Secure password

    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Signup Successful!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "User already exists!"]);
    }

    $stmt->close();
    $conn->close();
}
?>
