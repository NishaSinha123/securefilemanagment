<?php
// $host = "localhost";
// $user = "root";
// $pass = ""; 
// $dbname = "secure_file_manager";

// $conn = new mysqli($host, $user, $pass, $dbname);

// if ($conn->connect_error) {
//     die("Database Connection Failed: " . $conn->connect_error);
// }
?>




<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root"; // Check your XAMPP/WAMP username
$password = ""; // Default is empty for XAMPP
$dbname = "secure_file_manager"; // Change this to your actual DB name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
echo "Database Connected Successfully!";
?>
