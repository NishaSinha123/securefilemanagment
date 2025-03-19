<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
include "db.php"; // Ensure this file is correctly included

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST['username']) || !isset($_POST['password'])) {
        echo json_encode(["status" => "error", "message" => "Missing fields"]);
        exit;
    }

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    // Check if fields are empty
    if (empty($username) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Username and Password required"]);
        exit;
    }

    // Debugging - Check if database connection exists
    if (!$conn) {
        echo json_encode(["status" => "error", "message" => "Database connection error"]);
        exit;
    }

    // Prepare SQL statement
    $sql = "SELECT id, password FROM users WHERE username=?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "SQL Prepare Failed: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows > 0) {
        if (password_verify($password, $hashed_password)) {
            $_SESSION["user_id"] = $id;
            $_SESSION["username"] = $username;
            echo json_encode(["status" => "success", "message" => "Login Successful"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid Credentials"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User Not Found"]);
    }

    $stmt->close();
    $conn->close();
}
?>

